import MetaNetWalletService from '../wallet/MetaNetWalletService'
import BitcoinOSStateManager from '../state/BitcoinOSStateManager'
import { WalletData } from '../wallet/MetaNetWalletService'

export interface AuthUser {
  address: string
  publicKey: string
  displayName?: string
  avatar?: string
  authenticatedAt: number
  sessionExpires: number
  permissions: string[]
  apps: string[]
}

export interface AuthSession {
  sessionId: string
  userId: string
  appId: string
  createdAt: number
  lastActivity: number
  isActive: boolean
}

class BitcoinOSAuth {
  private static instance: BitcoinOSAuth
  private walletService: MetaNetWalletService
  private stateManager: BitcoinOSStateManager
  private currentUser: AuthUser | null = null
  private activeSessions: Map<string, AuthSession> = new Map()
  private sessionTimeout = 24 * 60 * 60 * 1000 // 24 hours
  private refreshInterval: NodeJS.Timeout | null = null

  private constructor() {
    this.walletService = MetaNetWalletService.getInstance()
    this.stateManager = BitcoinOSStateManager.getInstance()
    this.initializeSSO()
  }

  static getInstance(): BitcoinOSAuth {
    if (!BitcoinOSAuth.instance) {
      BitcoinOSAuth.instance = new BitcoinOSAuth()
    }
    return BitcoinOSAuth.instance
  }

  private initializeSSO() {
    if (typeof window === 'undefined') return
    
    // Listen for wallet connection events
    window.addEventListener('walletConnected', (event: Event) => {
      const customEvent = event as CustomEvent<WalletData>
      this.handleWalletConnection(customEvent.detail)
    })

    window.addEventListener('walletDisconnected', () => {
      this.handleWalletDisconnection()
    })

    // Auto-restore session on page load
    this.restoreSession()

    // Set up session refresh
    this.startSessionRefresh()

    // Handle page visibility changes
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          this.refreshCurrentSession()
        }
      })
    }

    // Handle cross-tab communication
    window.addEventListener('storage', (event) => {
      if (event.key === 'bitcoinOS-auth-session' && event.newValue) {
        this.syncSessionAcrossTabs(JSON.parse(event.newValue))
      }
    })
  }

  async authenticateUser(walletData: WalletData): Promise<AuthUser> {
    const now = Date.now()
    
    // Create user profile
    const user: AuthUser = {
      address: walletData.address,
      publicKey: walletData.publicKey,
      displayName: this.generateDisplayName(walletData.address),
      authenticatedAt: now,
      sessionExpires: now + this.sessionTimeout,
      permissions: ['read', 'write', 'transfer', 'mint'],
      apps: [] // Will be populated as user accesses apps
    }

    this.currentUser = user

    // Store in state manager
    this.stateManager.setState('auth-user', user)
    this.stateManager.setState('auth-authenticated', true)
    this.stateManager.setState('auth-session-expires', user.sessionExpires)

    // Store in localStorage for persistence
    localStorage.setItem('bitcoinOS-auth-user', JSON.stringify(user))
    localStorage.setItem('bitcoinOS-auth-session-id', this.generateSessionId())

    // Dispatch authentication event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('userAuthenticated', {
        detail: { user, timestamp: now }
      }))
    }

    console.log('✅ User authenticated via MetaNet SSO:', user.address.slice(0, 12) + '...')
    
    return user
  }

  async signInToApp(appId: string): Promise<AuthSession> {
    if (!this.currentUser) {
      throw new Error('No authenticated user. Please connect MetaNet wallet first.')
    }

    const now = Date.now()
    const sessionId = this.generateSessionId()

    const session: AuthSession = {
      sessionId,
      userId: this.currentUser.address,
      appId,
      createdAt: now,
      lastActivity: now,
      isActive: true
    }

    // Add app to user's app list
    if (!this.currentUser.apps.includes(appId)) {
      this.currentUser.apps.push(appId)
      this.stateManager.setState('auth-user', this.currentUser)
      localStorage.setItem('bitcoinOS-auth-user', JSON.stringify(this.currentUser))
    }

    // Store session
    this.activeSessions.set(sessionId, session)
    this.stateManager.setState(`auth-session-${appId}`, session)

    // Store in localStorage for cross-tab sync
    localStorage.setItem(`bitcoinOS-session-${appId}`, JSON.stringify(session))

    // Dispatch app sign-in event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('appSignIn', {
        detail: { appId, session, user: this.currentUser }
      }))
    }

    console.log(`🔐 Signed into ${appId} via SSO`)
    
    return session
  }

  async signOutFromApp(appId: string): Promise<void> {
    const session = this.getSessionForApp(appId)
    if (session) {
      session.isActive = false
      this.activeSessions.delete(session.sessionId)
      
      // Clear from state and localStorage
      this.stateManager.setState(`auth-session-${appId}`, null)
      localStorage.removeItem(`bitcoinOS-session-${appId}`)

      // Dispatch sign-out event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('appSignOut', {
          detail: { appId, sessionId: session.sessionId }
        }))
      }

      console.log(`🚪 Signed out from ${appId}`)
    }
  }

  async signOutFromAllApps(): Promise<void> {
    const appIds = Array.from(this.activeSessions.values()).map(s => s.appId)
    
    // Sign out from each app
    for (const appId of appIds) {
      await this.signOutFromApp(appId)
    }

    // Clear all sessions
    this.activeSessions.clear()
    this.currentUser = null

    // Clear all auth state
    this.stateManager.setState('auth-user', null)
    this.stateManager.setState('auth-authenticated', false)
    this.stateManager.setState('auth-session-expires', 0)

    // Clear localStorage
    localStorage.removeItem('bitcoinOS-auth-user')
    localStorage.removeItem('bitcoinOS-auth-session-id')

    // Clear all app sessions from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('bitcoinOS-session-')) {
        localStorage.removeItem(key)
      }
    }

    // Disconnect wallet
    await this.walletService.disconnect()

    // Dispatch global sign-out event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('globalSignOut', {
        detail: { timestamp: Date.now() }
      }))
    }

    console.log('🚪 Signed out from all apps and disconnected wallet')
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && Date.now() < (this.currentUser.sessionExpires || 0)
  }

  isSignedInToApp(appId: string): boolean {
    const session = this.getSessionForApp(appId)
    return session?.isActive === true && Date.now() < (this.currentUser?.sessionExpires || 0)
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser
  }

  getSessionForApp(appId: string): AuthSession | null {
    for (const session of this.activeSessions.values()) {
      if (session.appId === appId && session.isActive) {
        return session
      }
    }
    return null
  }

  getAllActiveSessions(): AuthSession[] {
    return Array.from(this.activeSessions.values()).filter(s => s.isActive)
  }

  async refreshCurrentSession(): Promise<void> {
    if (!this.currentUser) return

    const now = Date.now()
    
    // Extend session if still valid
    if (now < this.currentUser.sessionExpires) {
      this.currentUser.sessionExpires = now + this.sessionTimeout
      this.stateManager.setState('auth-user', this.currentUser)
      this.stateManager.setState('auth-session-expires', this.currentUser.sessionExpires)
      localStorage.setItem('bitcoinOS-auth-user', JSON.stringify(this.currentUser))

      // Update all active sessions
      this.activeSessions.forEach(session => {
        if (session.isActive) {
          session.lastActivity = now
          this.stateManager.setState(`auth-session-${session.appId}`, session)
        }
      })
    } else {
      // Session expired
      await this.signOutFromAllApps()
    }
  }

  private handleWalletConnection(walletData: WalletData): void {
    this.authenticateUser(walletData).catch(console.error)
  }

  private handleWalletDisconnection(): void {
    this.signOutFromAllApps().catch(console.error)
  }

  private restoreSession(): void {
    const storedUser = localStorage.getItem('bitcoinOS-auth-user')
    const sessionId = localStorage.getItem('bitcoinOS-auth-session-id')
    
    if (storedUser && sessionId) {
      try {
        const user: AuthUser = JSON.parse(storedUser)
        
        // Check if session is still valid
        if (Date.now() < user.sessionExpires) {
          this.currentUser = user
          this.stateManager.setState('auth-user', user)
          this.stateManager.setState('auth-authenticated', true)
          
          // Restore app sessions
          user.apps.forEach(appId => {
            const sessionData = localStorage.getItem(`bitcoinOS-session-${appId}`)
            if (sessionData) {
              const session: AuthSession = JSON.parse(sessionData)
              if (session.isActive) {
                this.activeSessions.set(session.sessionId, session)
              }
            }
          })

          console.log('🔄 Session restored from localStorage')
          
          // Try to reconnect wallet
          this.walletService.connect().catch(() => {
            console.log('⚠️ Could not auto-reconnect wallet')
          })
        } else {
          // Session expired, clear everything
          this.clearExpiredSession()
        }
      } catch (error) {
        console.error('Error restoring session:', error)
        this.clearExpiredSession()
      }
    }
  }

  private clearExpiredSession(): void {
    localStorage.removeItem('bitcoinOS-auth-user')
    localStorage.removeItem('bitcoinOS-auth-session-id')
    this.currentUser = null
    this.activeSessions.clear()
    this.stateManager.setState('auth-authenticated', false)
  }

  private syncSessionAcrossTabs(sessionData: any): void {
    // Sync authentication state across browser tabs
    if (sessionData.type === 'auth-update') {
      this.currentUser = sessionData.user
      this.stateManager.setState('auth-user', sessionData.user)
    }
  }

  private startSessionRefresh(): void {
    this.refreshInterval = setInterval(() => {
      this.refreshCurrentSession()
    }, 5 * 60 * 1000) // Refresh every 5 minutes
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateDisplayName(address: string): string {
    return `User_${address.slice(0, 6)}...${address.slice(-4)}`
  }
}

export default BitcoinOSAuth
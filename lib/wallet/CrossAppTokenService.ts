import MetaNetWalletService, { BRC100Token } from './MetaNetWalletService'
import BitcoinOSStateManager from '../state/BitcoinOSStateManager'

export interface CrossAppTokenPermission {
  fromAppId: string
  toAppId: string
  tokenId: string
  permissions: string[]
  grantedAt: string
  expiresAt?: string
}

export interface TokenUsageRequest {
  requesterAppId: string
  tokenId: string
  ownerAppId: string
  usageType: 'read' | 'transfer' | 'interact'
  purpose: string
}

class CrossAppTokenService {
  private static instance: CrossAppTokenService
  private walletService: MetaNetWalletService
  private stateManager: BitcoinOSStateManager
  private permissions: Map<string, CrossAppTokenPermission> = new Map()

  private constructor() {
    this.walletService = MetaNetWalletService.getInstance()
    this.stateManager = BitcoinOSStateManager.getInstance()
    this.loadPermissions()
  }

  static getInstance(): CrossAppTokenService {
    if (!CrossAppTokenService.instance) {
      CrossAppTokenService.instance = new CrossAppTokenService()
    }
    return CrossAppTokenService.instance
  }

  private loadPermissions(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cross-app-token-permissions')
      if (stored) {
        try {
          const permissionsArray = JSON.parse(stored)
          permissionsArray.forEach((perm: CrossAppTokenPermission) => {
            this.permissions.set(this.getPermissionKey(perm), perm)
          })
        } catch (error) {
          console.error('Failed to load cross-app permissions:', error)
        }
      }
    }
  }

  private savePermissions(): void {
    if (typeof window !== 'undefined') {
      const permissionsArray = Array.from(this.permissions.values())
      localStorage.setItem('cross-app-token-permissions', JSON.stringify(permissionsArray))
    }
  }

  private getPermissionKey(permission: CrossAppTokenPermission): string {
    return `${permission.fromAppId}->${permission.toAppId}:${permission.tokenId}`
  }

  async discoverAllTokens(): Promise<Map<string, BRC100Token[]>> {
    try {
      return await this.walletService.getAllTokens()
    } catch (error) {
      console.error('Failed to discover tokens:', error)
      return new Map()
    }
  }

  async getTokensAvailableToApp(appId: string): Promise<BRC100Token[]> {
    const allTokens = await this.discoverAllTokens()
    const availableTokens: BRC100Token[] = []

    // Add tokens owned by the app
    const ownTokens = allTokens.get(appId) || []
    availableTokens.push(...ownTokens)

    // Add tokens from other apps with granted permissions
    for (const [otherAppId, tokens] of allTokens.entries()) {
      if (otherAppId === appId) continue

      for (const token of tokens) {
        const permissionKey = `${otherAppId}->${appId}:${token.id}`
        const permission = this.permissions.get(permissionKey)
        
        if (permission && this.isPermissionValid(permission)) {
          availableTokens.push({
            ...token,
            metadata: {
              ...token.metadata,
              crossAppPermission: permission,
              isExternalToken: true,
              sourceApp: otherAppId
            }
          })
        }
      }
    }

    return availableTokens
  }

  async requestTokenAccess(request: TokenUsageRequest): Promise<boolean> {
    // This would normally show a user permission dialog
    // For this demo, we'll auto-grant read permissions
    if (request.usageType === 'read') {
      return this.grantTokenPermission({
        fromAppId: request.ownerAppId,
        toAppId: request.requesterAppId,
        tokenId: request.tokenId,
        permissions: ['read'],
        grantedAt: new Date().toISOString()
      })
    }

    // For transfer and interact, we'd need user approval
    return false
  }

  grantTokenPermission(permission: CrossAppTokenPermission): boolean {
    try {
      const key = this.getPermissionKey(permission)
      this.permissions.set(key, permission)
      this.savePermissions()

      // Dispatch permission granted event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('tokenPermissionGranted', {
          detail: permission
        }))
      }

      console.log(`✅ Token permission granted: ${permission.fromAppId} → ${permission.toAppId}`)
      return true
    } catch (error) {
      console.error('Failed to grant token permission:', error)
      return false
    }
  }

  revokeTokenPermission(fromAppId: string, toAppId: string, tokenId: string): boolean {
    try {
      const key = `${fromAppId}->${toAppId}:${tokenId}`
      const deleted = this.permissions.delete(key)
      
      if (deleted) {
        this.savePermissions()
        
        // Dispatch permission revoked event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('tokenPermissionRevoked', {
            detail: { fromAppId, toAppId, tokenId }
          }))
        }

        console.log(`🔒 Token permission revoked: ${fromAppId} → ${toAppId}`)
      }
      
      return deleted
    } catch (error) {
      console.error('Failed to revoke token permission:', error)
      return false
    }
  }

  private isPermissionValid(permission: CrossAppTokenPermission): boolean {
    if (permission.expiresAt) {
      return new Date(permission.expiresAt) > new Date()
    }
    return true
  }

  getPermissionsForApp(appId: string): CrossAppTokenPermission[] {
    return Array.from(this.permissions.values()).filter(
      perm => perm.fromAppId === appId || perm.toAppId === appId
    )
  }

  async autoGrantReadPermissions(): Promise<void> {
    // Auto-grant read permissions between common app pairs
    const commonPairs = [
      ['bitcoin-music', 'bitcoin-social'],
      ['bitcoin-social', 'bitcoin-music'],
      ['bitcoin-games', 'bitcoin-social'],
      ['bitcoin-marketplace', 'bitcoin-social']
    ]

    const allTokens = await this.discoverAllTokens()

    for (const [fromAppId, toAppId] of commonPairs) {
      const tokens = allTokens.get(fromAppId) || []
      
      for (const token of tokens) {
        const permissionKey = `${fromAppId}->${toAppId}:${token.id}`
        
        if (!this.permissions.has(permissionKey)) {
          this.grantTokenPermission({
            fromAppId,
            toAppId,
            tokenId: token.id,
            permissions: ['read'],
            grantedAt: new Date().toISOString()
          })
        }
      }
    }
  }

  async simulateTokenInteraction(tokenId: string, fromApp: string, toApp: string, action: string): Promise<boolean> {
    try {
      const permissionKey = `${fromApp}->${toApp}:${tokenId}`
      const permission = this.permissions.get(permissionKey)
      
      if (!permission) {
        console.log(`❌ No permission for ${fromApp} → ${toApp} token interaction`)
        return false
      }

      if (!permission.permissions.includes('interact') && action !== 'read') {
        console.log(`❌ Insufficient permissions for ${action} on token ${tokenId}`)
        return false
      }

      // Simulate the interaction
      console.log(`✅ Token interaction: ${action} on ${tokenId} from ${fromApp} to ${toApp}`)
      
      // Dispatch interaction event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('tokenInteraction', {
          detail: { tokenId, fromApp, toApp, action }
        }))
      }

      return true
    } catch (error) {
      console.error('Token interaction failed:', error)
      return false
    }
  }
}

export default CrossAppTokenService
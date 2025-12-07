'use client'

import { useState, useEffect, useCallback } from 'react'
import BitcoinOSAuth from '../lib/auth/BitcoinOSAuth'
import MetaNetWalletService from '../lib/wallet/MetaNetWalletService'
import type { AuthUser, AuthSession } from '../lib/auth/BitcoinOSAuth'
import type { WalletData, BRC100Token } from '../lib/wallet/MetaNetWalletService'

export interface UseBitcoinOSAuthReturn {
  // Authentication state
  user: AuthUser | null
  isAuthenticated: boolean
  isConnecting: boolean
  
  // App session state  
  isSignedInToApp: boolean
  currentSession: AuthSession | null
  
  // Wallet state
  walletData: WalletData | null
  isWalletConnected: boolean
  balance: number
  
  // Token state
  appTokens: BRC100Token[]
  allTokens: Map<string, BRC100Token[]>
  totalTokens: number
  
  // Error state
  error: string | null
  
  // Actions
  connectWallet: () => Promise<void>
  signInToApp: (appId: string) => Promise<void>
  signOutFromApp: (appId: string) => Promise<void>
  signOutFromAllApps: () => Promise<void>
  refreshTokens: () => Promise<void>
  refreshBalance: () => Promise<void>
  createToken: (tokenData: any) => Promise<BRC100Token>
}

export function useBitcoinOSAuth(appId: string): UseBitcoinOSAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentSession, setCurrentSession] = useState<AuthSession | null>(null)
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [balance, setBalance] = useState(0)
  const [appTokens, setAppTokens] = useState<BRC100Token[]>([])
  const [allTokens, setAllTokens] = useState<Map<string, BRC100Token[]>>(new Map())
  const [totalTokens, setTotalTokens] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const auth = BitcoinOSAuth.getInstance()
  const walletService = MetaNetWalletService.getInstance()

  useEffect(() => {
    // Initialize state from existing session
    const existingUser = auth.getCurrentUser()
    const existingWalletData = walletService.getWalletData()
    
    if (existingUser) {
      setUser(existingUser)
      setCurrentSession(auth.getSessionForApp(appId))
    }
    
    if (existingWalletData) {
      setWalletData(existingWalletData)
      setBalance(existingWalletData.balance)
    }

    // Load tokens for this app
    loadAppTokens()

    // Set up event listeners
    const handleUserAuthenticated = (event: Event) => {
      const customEvent = event as CustomEvent
      setUser(customEvent.detail.user)
      setError(null)
    }

    const handleAppSignIn = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.appId === appId) {
        setCurrentSession(customEvent.detail.session)
        setUser(customEvent.detail.user)
        loadAppTokens()
      }
    }

    const handleAppSignOut = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.appId === appId) {
        setCurrentSession(null)
      }
    }

    const handleGlobalSignOut = () => {
      setUser(null)
      setCurrentSession(null)
      setWalletData(null)
      setBalance(0)
      setAppTokens([])
      setAllTokens(new Map())
      setTotalTokens(0)
    }

    const handleWalletConnected = (event: Event) => {
      const customEvent = event as CustomEvent<WalletData>
      setWalletData(customEvent.detail)
      setBalance(customEvent.detail.balance)
      setError(null)
    }

    const handleWalletDisconnected = () => {
      setWalletData(null)
      setBalance(0)
    }

    const handleTokenCreated = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail.appId === appId) {
        setAppTokens(prev => [...prev, customEvent.detail.token])
        setTotalTokens(prev => prev + 1)
      }
    }

    // Add event listeners
    window.addEventListener('userAuthenticated', handleUserAuthenticated)
    window.addEventListener('appSignIn', handleAppSignIn)
    window.addEventListener('appSignOut', handleAppSignOut)
    window.addEventListener('globalSignOut', handleGlobalSignOut)
    window.addEventListener('walletConnected', handleWalletConnected)
    window.addEventListener('walletDisconnected', handleWalletDisconnected)
    window.addEventListener('tokenCreated', handleTokenCreated)

    return () => {
      window.removeEventListener('userAuthenticated', handleUserAuthenticated)
      window.removeEventListener('appSignIn', handleAppSignIn)
      window.removeEventListener('appSignOut', handleAppSignOut)
      window.removeEventListener('globalSignOut', handleGlobalSignOut)
      window.removeEventListener('walletConnected', handleWalletConnected)
      window.removeEventListener('walletDisconnected', handleWalletDisconnected)
      window.removeEventListener('tokenCreated', handleTokenCreated)
    }
  }, [appId])

  const loadAppTokens = async () => {
    try {
      const tokens = await walletService.getTokensForApp(appId)
      setAppTokens(tokens)
      
      const allUserTokens = await walletService.getAllTokens()
      setAllTokens(allUserTokens)
      
      const total = Array.from(allUserTokens.values()).reduce((sum, tokens) => sum + tokens.length, 0)
      setTotalTokens(total)
    } catch (err: any) {
      console.error('Error loading app tokens:', err)
    }
  }

  const connectWallet = useCallback(async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if MetaNet Desktop is available
      const isAvailable = await MetaNetWalletService.checkAvailability()
      if (!isAvailable) {
        throw new Error('MetaNet Desktop is not running. Please start MetaNet Desktop and try again.')
      }

      // Connect wallet (this will trigger authentication automatically)
      await walletService.connect()
      
      // Auto sign-in to current app
      await auth.signInToApp(appId)

    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet')
      console.error('Wallet connection error:', err)
    } finally {
      setIsConnecting(false)
    }
  }, [appId])

  const signInToApp = useCallback(async (targetAppId: string) => {
    try {
      if (!auth.isAuthenticated()) {
        throw new Error('Please connect your wallet first')
      }
      
      await auth.signInToApp(targetAppId)
      
      if (targetAppId === appId) {
        loadAppTokens()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in to app')
    }
  }, [appId])

  const signOutFromApp = useCallback(async (targetAppId: string) => {
    try {
      await auth.signOutFromApp(targetAppId)
    } catch (err: any) {
      setError(err.message || 'Failed to sign out from app')
    }
  }, [])

  const signOutFromAllApps = useCallback(async () => {
    try {
      await auth.signOutFromAllApps()
    } catch (err: any) {
      setError(err.message || 'Failed to sign out from all apps')
    }
  }, [])

  const refreshTokens = useCallback(async () => {
    await loadAppTokens()
  }, [])

  const refreshBalance = useCallback(async () => {
    try {
      const newBalance = await walletService.getBalance()
      setBalance(newBalance)
      
      if (walletData) {
        setWalletData({ ...walletData, balance: newBalance })
      }
    } catch (err: any) {
      setError(err.message || 'Failed to refresh balance')
    }
  }, [walletData])

  const createToken = useCallback(async (tokenData: {
    name: string
    symbol?: string
    tokenType: string
    metadata: Record<string, any>
    supply?: string
    decimals?: number
  }): Promise<BRC100Token> => {
    try {
      if (!auth.isAuthenticated()) {
        throw new Error('Please connect your wallet first')
      }

      const appConfig = {
        appId,
        tokenTypes: [tokenData.tokenType],
        defaultSymbol: tokenData.symbol || appId.toUpperCase(),
        tokenPrefix: appId.replace('bitcoin-', '').toUpperCase()
      }

      const token = await walletService.createBRC100Token(appConfig, tokenData)
      
      // Token creation event will automatically update state
      return token
      
    } catch (err: any) {
      setError(err.message || 'Failed to create token')
      throw err
    }
  }, [appId])

  return {
    // Authentication state
    user,
    isAuthenticated: auth.isAuthenticated(),
    isConnecting,
    
    // App session state
    isSignedInToApp: auth.isSignedInToApp(appId),
    currentSession,
    
    // Wallet state
    walletData,
    isWalletConnected: walletService.isConnected(),
    balance,
    
    // Token state
    appTokens,
    allTokens,
    totalTokens,
    
    // Error state
    error,
    
    // Actions
    connectWallet,
    signInToApp,
    signOutFromApp,
    signOutFromAllApps,
    refreshTokens,
    refreshBalance,
    createToken
  }
}
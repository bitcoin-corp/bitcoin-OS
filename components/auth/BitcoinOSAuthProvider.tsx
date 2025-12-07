'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import BitcoinOSAuth from '../../lib/auth/BitcoinOSAuth'
import MetaNetWalletService from '../../lib/wallet/MetaNetWalletService'
import type { AuthUser } from '../../lib/auth/BitcoinOSAuth'
import type { WalletData } from '../../lib/wallet/MetaNetWalletService'

interface BitcoinOSAuthContextType {
  isSystemAuthenticated: boolean
  currentUser: AuthUser | null
  walletData: WalletData | null
  globalConnectWallet: () => Promise<void>
  globalSignOut: () => Promise<void>
  getSignedInApps: () => string[]
  isConnecting: boolean
  systemError: string | null
}

const BitcoinOSAuthContext = createContext<BitcoinOSAuthContextType | null>(null)

export const useBitcoinOSAuthContext = () => {
  const context = useContext(BitcoinOSAuthContext)
  if (!context) {
    throw new Error('useBitcoinOSAuthContext must be used within a BitcoinOSAuthProvider')
  }
  return context
}

interface BitcoinOSAuthProviderProps {
  children: React.ReactNode
}

export const BitcoinOSAuthProvider: React.FC<BitcoinOSAuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [systemError, setSystemError] = useState<string | null>(null)

  useEffect(() => {
    // Only initialize auth services on the client side
    if (typeof window === 'undefined') return

    const auth = BitcoinOSAuth.getInstance()
    const walletService = MetaNetWalletService.getInstance()
    
    // Initialize system state
    const existingUser = auth.getCurrentUser()
    const existingWalletData = walletService.getWalletData()
    
    if (existingUser) {
      setCurrentUser(existingUser)
    }
    
    if (existingWalletData) {
      setWalletData(existingWalletData)
    }

    // Global event listeners
    const handleUserAuthenticated = (event: CustomEvent) => {
      setCurrentUser(event.detail.user)
      setSystemError(null)
    }

    const handleWalletConnected = (event: CustomEvent<WalletData>) => {
      setWalletData(event.detail)
      setSystemError(null)
    }

    const handleWalletDisconnected = () => {
      setWalletData(null)
    }

    const handleGlobalSignOut = () => {
      setCurrentUser(null)
      setWalletData(null)
      setSystemError(null)
    }

    const handleSystemError = (event: CustomEvent) => {
      setSystemError(event.detail.error)
    }

    // Add listeners
    window.addEventListener('userAuthenticated', handleUserAuthenticated)
    window.addEventListener('walletConnected', handleWalletConnected)
    window.addEventListener('walletDisconnected', handleWalletDisconnected)
    window.addEventListener('globalSignOut', handleGlobalSignOut)
    window.addEventListener('systemError', handleSystemError)

    // Cleanup
    return () => {
      window.removeEventListener('userAuthenticated', handleUserAuthenticated)
      window.removeEventListener('walletConnected', handleWalletConnected)
      window.removeEventListener('walletDisconnected', handleWalletDisconnected)
      window.removeEventListener('globalSignOut', handleGlobalSignOut)
      window.removeEventListener('systemError', handleSystemError)
    }
  }, [])

  const globalConnectWallet = async () => {
    if (typeof window === 'undefined') return
    
    setIsConnecting(true)
    setSystemError(null)

    try {
      const walletService = MetaNetWalletService.getInstance()
      
      // Check MetaNet Desktop availability
      const isAvailable = await MetaNetWalletService.checkAvailability()
      if (!isAvailable) {
        throw new Error('MetaNet Desktop is not running. Please start MetaNet Desktop first.')
      }

      // Connect wallet - this will trigger global authentication
      await walletService.connect()
      
    } catch (error: any) {
      setSystemError(error.message || 'Failed to connect wallet')
      
      // Dispatch system error event
      window.dispatchEvent(new CustomEvent('systemError', {
        detail: { error: error.message }
      }))
      
    } finally {
      setIsConnecting(false)
    }
  }

  const globalSignOut = async () => {
    if (typeof window === 'undefined') return
    
    try {
      const auth = BitcoinOSAuth.getInstance()
      await auth.signOutFromAllApps()
    } catch (error: any) {
      setSystemError(error.message || 'Failed to sign out')
    }
  }

  const getSignedInApps = (): string[] => {
    if (typeof window === 'undefined') return []
    
    const auth = BitcoinOSAuth.getInstance()
    return auth.getAllActiveSessions().map(session => session.appId)
  }

  const contextValue: BitcoinOSAuthContextType = {
    isSystemAuthenticated: typeof window !== 'undefined' ? BitcoinOSAuth.getInstance().isAuthenticated() : false,
    currentUser,
    walletData,
    globalConnectWallet,
    globalSignOut,
    getSignedInApps,
    isConnecting,
    systemError
  }

  return (
    <BitcoinOSAuthContext.Provider value={contextValue}>
      {children}
    </BitcoinOSAuthContext.Provider>
  )
}
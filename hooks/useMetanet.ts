/**
 * React Hook for Metanet Desktop Integration
 * Provides React components with metanet-desktop wallet functionality
 * 
 * Based on metanet-desktop by BSV Blockchain Association
 * Repository: https://github.com/bsv-blockchain/metanet-desktop
 */

import { useState, useEffect, useCallback } from 'react'
import { metanetClient, MetanetWallet, MetanetTransaction } from '@/lib/metanet-client'

export interface UseMetanetResult {
  // Connection status
  isConnected: boolean
  isConnecting: boolean
  
  // Wallet data
  wallet: MetanetWallet | null
  
  // Authentication
  isAuthenticated: boolean
  
  // Methods
  connect: () => Promise<boolean>
  disconnect: () => void
  authenticate: (appId: string, appName: string, permissions: string[]) => Promise<boolean>
  sendTransaction: (recipients: Array<{ address: string; amount: number }>, fee?: number) => Promise<MetanetTransaction | null>
  signMessage: (message: string) => Promise<string | null>
  refreshWallet: () => Promise<void>
}

export function useMetanet(autoConnect = false): UseMetanetResult {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [wallet, setWallet] = useState<MetanetWallet | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Setup event listeners
  useEffect(() => {
    const handleConnected = () => {
      setIsConnected(true)
      setIsConnecting(false)
    }
    
    const handleDisconnected = () => {
      setIsConnected(false)
      setIsConnecting(false)
      setWallet(null)
      setIsAuthenticated(false)
    }
    
    const handleWalletUpdate = (data: any) => {
      if (data.wallet) {
        setWallet(data.wallet)
      }
    }
    
    metanetClient.on('connected', handleConnected)
    metanetClient.on('disconnected', handleDisconnected)
    metanetClient.on('wallet-response', handleWalletUpdate)
    
    // Auto-connect if requested
    if (autoConnect && !isConnected && !isConnecting) {
      connect()
    }
    
    return () => {
      metanetClient.off('connected', handleConnected)
      metanetClient.off('disconnected', handleDisconnected)
      metanetClient.off('wallet-response', handleWalletUpdate)
    }
  }, [autoConnect, isConnected, isConnecting])

  const connect = useCallback(async (): Promise<boolean> => {
    if (isConnecting || isConnected) return isConnected
    
    setIsConnecting(true)
    try {
      const success = await metanetClient.connect()
      if (success) {
        setIsConnected(true)
        // Try to get wallet info
        await refreshWallet()
      }
      return success
    } catch (error) {
      console.error('Failed to connect to metanet-desktop:', error)
      return false
    } finally {
      setIsConnecting(false)
    }
  }, [isConnecting, isConnected])

  const disconnect = useCallback(() => {
    metanetClient.disconnect()
    setIsConnected(false)
    setWallet(null)
    setIsAuthenticated(false)
  }, [])

  const authenticate = useCallback(async (
    appId: string, 
    appName: string, 
    permissions: string[]
  ): Promise<boolean> => {
    if (!isConnected) return false
    
    try {
      const success = await metanetClient.authenticate(appId, appName, permissions)
      setIsAuthenticated(success)
      return success
    } catch (error) {
      console.error('Authentication failed:', error)
      return false
    }
  }, [isConnected])

  const sendTransaction = useCallback(async (
    recipients: Array<{ address: string; amount: number }>,
    fee?: number
  ): Promise<MetanetTransaction | null> => {
    if (!isConnected || !isAuthenticated) return null
    
    try {
      const transaction = await metanetClient.sendTransaction(recipients, fee)
      if (transaction) {
        // Refresh wallet after successful transaction
        await refreshWallet()
      }
      return transaction
    } catch (error) {
      console.error('Transaction failed:', error)
      return null
    }
  }, [isConnected, isAuthenticated])

  const signMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!isConnected || !isAuthenticated) return null
    
    try {
      return await metanetClient.signMessage(message)
    } catch (error) {
      console.error('Message signing failed:', error)
      return null
    }
  }, [isConnected, isAuthenticated])

  const refreshWallet = useCallback(async (): Promise<void> => {
    if (!isConnected) return
    
    try {
      const walletInfo = await metanetClient.getWallet()
      setWallet(walletInfo)
    } catch (error) {
      console.error('Failed to refresh wallet:', error)
    }
  }, [isConnected])

  return {
    isConnected,
    isConnecting,
    wallet,
    isAuthenticated,
    connect,
    disconnect,
    authenticate,
    sendTransaction,
    signMessage,
    refreshWallet
  }
}

// Helper hook for specific app authentication
export function useMetanetApp(
  appId: string,
  appName: string,
  permissions: string[] = ['wallet:read', 'wallet:write'],
  autoConnect = true
) {
  const metanet = useMetanet(autoConnect)
  const [appAuthenticated, setAppAuthenticated] = useState(false)

  useEffect(() => {
    if (metanet.isConnected && !appAuthenticated && !metanet.isAuthenticated) {
      metanet.authenticate(appId, appName, permissions)
        .then(setAppAuthenticated)
        .catch(console.error)
    }
  }, [metanet.isConnected, appAuthenticated, metanet.isAuthenticated, appId, appName, permissions, metanet])

  return {
    ...metanet,
    appAuthenticated
  }
}
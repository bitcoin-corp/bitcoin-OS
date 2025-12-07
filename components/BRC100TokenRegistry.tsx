'use client'

import React, { useState, useEffect } from 'react'
import MetaNetWalletService, { BRC100Token, AppTokenConfig } from '@/lib/wallet/MetaNetWalletService'

interface BRC100TokenRegistryProps {
  appId: string
  onTokenCreated?: (token: BRC100Token) => void
}

export default function BRC100TokenRegistry({ appId, onTokenCreated }: BRC100TokenRegistryProps) {
  const [walletService] = useState(() => MetaNetWalletService.getInstance())
  const [isConnected, setIsConnected] = useState(false)
  const [tokens, setTokens] = useState<BRC100Token[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [newTokenData, setNewTokenData] = useState({
    name: '',
    symbol: '',
    tokenType: '',
    metadata: {}
  })

  useEffect(() => {
    const checkConnection = () => {
      setIsConnected(walletService.isConnected())
      if (walletService.isConnected()) {
        loadTokens()
      }
    }

    // Listen for wallet connection events
    const handleWalletConnected = () => {
      setIsConnected(true)
      loadTokens()
    }

    const handleWalletDisconnected = () => {
      setIsConnected(false)
      setTokens([])
    }

    const handleTokenCreated = (event: CustomEvent) => {
      if (event.detail.appId === appId) {
        setTokens(prev => [...prev, event.detail.token])
        if (onTokenCreated) {
          onTokenCreated(event.detail.token)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('walletConnected', handleWalletConnected)
      window.addEventListener('walletDisconnected', handleWalletDisconnected)
      window.addEventListener('tokenCreated', handleTokenCreated as EventListener)
    }

    checkConnection()

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('walletConnected', handleWalletConnected)
        window.removeEventListener('walletDisconnected', handleWalletDisconnected)
        window.removeEventListener('tokenCreated', handleTokenCreated as EventListener)
      }
    }
  }, [appId, onTokenCreated])

  const loadTokens = async () => {
    try {
      const appTokens = await walletService.getTokensForApp(appId)
      setTokens(appTokens)
    } catch (error) {
      console.error('Failed to load tokens:', error)
    }
  }

  const createToken = async () => {
    if (!isConnected || !newTokenData.name || !newTokenData.tokenType) {
      return
    }

    setIsCreating(true)
    try {
      const appConfig: AppTokenConfig = {
        appId,
        tokenTypes: [newTokenData.tokenType],
        defaultSymbol: newTokenData.symbol || `${appId.toUpperCase()}`,
        tokenPrefix: `${appId}-`
      }

      const token = await walletService.createBRC100Token(appConfig, {
        name: newTokenData.name,
        symbol: newTokenData.symbol,
        tokenType: newTokenData.tokenType,
        metadata: {
          description: `Token created for ${appId}`,
          ...newTokenData.metadata
        }
      })

      console.log('✅ BRC100 Token created:', token)

      // Reset form
      setNewTokenData({
        name: '',
        symbol: '',
        tokenType: '',
        metadata: {}
      })
    } catch (error) {
      console.error('❌ Failed to create BRC100 token:', error)
    } finally {
      setIsCreating(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-2">BRC100 Token Registry</h3>
        <p className="text-gray-400">Connect your MetaNet wallet to manage BRC100 tokens</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">BRC100 Token Registry</h3>
      <p className="text-gray-400 mb-4">App: {appId}</p>

      {/* Create Token Form */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-medium text-white mb-4">Create New Token</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
            <input
              type="text"
              value={newTokenData.name}
              onChange={(e) => setNewTokenData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="My Token"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
            <input
              type="text"
              value={newTokenData.symbol}
              onChange={(e) => setNewTokenData(prev => ({ ...prev, symbol: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="MTK"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Type</label>
            <select
              value={newTokenData.tokenType}
              onChange={(e) => setNewTokenData(prev => ({ ...prev, tokenType: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select type...</option>
              <option value="utility">Utility Token</option>
              <option value="governance">Governance Token</option>
              <option value="reward">Reward Token</option>
              <option value="nft">NFT</option>
              <option value="custom">Custom Token</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={createToken}
              disabled={isCreating || !newTokenData.name || !newTokenData.tokenType}
              className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
            >
              {isCreating ? 'Creating...' : 'Create Token'}
            </button>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div>
        <h4 className="text-lg font-medium text-white mb-4">Existing Tokens ({tokens.length})</h4>
        {tokens.length === 0 ? (
          <p className="text-gray-400">No tokens created yet</p>
        ) : (
          <div className="space-y-3">
            {tokens.map((token) => (
              <div key={token.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="text-white font-medium">{token.name}</h5>
                    <p className="text-gray-400 text-sm">{token.symbol} • {token.tokenType}</p>
                    <p className="text-gray-500 text-xs mt-1">Supply: {token.supply}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-xs text-gray-400">{new Date(token.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500">Token ID: {token.id.substring(0, 16)}...</p>
                  <p className="text-xs text-gray-500">TX ID: {token.txid.substring(0, 16)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
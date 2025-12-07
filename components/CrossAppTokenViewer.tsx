'use client'

import React, { useState, useEffect } from 'react'
import CrossAppTokenService, { CrossAppTokenPermission } from '@/lib/wallet/CrossAppTokenService'
import { BRC100Token } from '@/lib/wallet/MetaNetWalletService'

interface CrossAppTokenViewerProps {
  currentAppId: string
}

export default function CrossAppTokenViewer({ currentAppId }: CrossAppTokenViewerProps) {
  const [tokenService] = useState(() => CrossAppTokenService.getInstance())
  const [availableTokens, setAvailableTokens] = useState<BRC100Token[]>([])
  const [allTokens, setAllTokens] = useState<Map<string, BRC100Token[]>>(new Map())
  const [permissions, setPermissions] = useState<CrossAppTokenPermission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()

    const handleTokenCreated = () => loadData()
    const handlePermissionGranted = () => loadData()
    const handlePermissionRevoked = () => loadData()

    if (typeof window !== 'undefined') {
      window.addEventListener('tokenCreated', handleTokenCreated)
      window.addEventListener('tokenPermissionGranted', handlePermissionGranted)
      window.addEventListener('tokenPermissionRevoked', handlePermissionRevoked)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('tokenCreated', handleTokenCreated)
        window.removeEventListener('tokenPermissionGranted', handlePermissionGranted)
        window.removeEventListener('tokenPermissionRevoked', handlePermissionRevoked)
      }
    }
  }, [currentAppId])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [available, all, perms] = await Promise.all([
        tokenService.getTokensAvailableToApp(currentAppId),
        tokenService.discoverAllTokens(),
        Promise.resolve(tokenService.getPermissionsForApp(currentAppId))
      ])

      setAvailableTokens(available)
      setAllTokens(all)
      setPermissions(perms)

      // Auto-grant read permissions for demo
      await tokenService.autoGrantReadPermissions()
    } catch (error) {
      console.error('Failed to load token data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const requestAccess = async (tokenId: string, ownerAppId: string) => {
    const success = await tokenService.requestTokenAccess({
      requesterAppId: currentAppId,
      tokenId,
      ownerAppId,
      usageType: 'read',
      purpose: 'Cross-app integration'
    })

    if (success) {
      await loadData()
    }
  }

  const simulateInteraction = async (token: BRC100Token, action: string) => {
    const sourceApp = token.metadata?.sourceApp || token.appId
    const success = await tokenService.simulateTokenInteraction(
      token.id,
      sourceApp,
      currentAppId,
      action
    )

    if (success) {
      console.log(`✅ Successfully performed ${action} on token ${token.name}`)
    }
  }

  const revokeAccess = (permission: CrossAppTokenPermission) => {
    tokenService.revokeTokenPermission(
      permission.fromAppId,
      permission.toAppId,
      permission.tokenId
    )
    loadData()
  }

  if (isLoading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const ownTokens = availableTokens.filter(t => t.appId === currentAppId)
  const externalTokens = availableTokens.filter(t => t.metadata?.isExternalToken)

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Cross-App Token Access ({currentAppId})
      </h3>

      {/* Own Tokens */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-3">Your Tokens ({ownTokens.length})</h4>
        {ownTokens.length === 0 ? (
          <p className="text-gray-400">No tokens created yet</p>
        ) : (
          <div className="space-y-2">
            {ownTokens.map((token) => (
              <div key={token.id} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{token.name}</span>
                    <span className="text-gray-400 ml-2">({token.symbol})</span>
                  </div>
                  <span className="text-green-400 text-sm">Owner</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* External Tokens */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-3">
          External Tokens Available ({externalTokens.length})
        </h4>
        {externalTokens.length === 0 ? (
          <p className="text-gray-400">No external tokens available</p>
        ) : (
          <div className="space-y-2">
            {externalTokens.map((token) => (
              <div key={token.id} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium">{token.name}</span>
                    <span className="text-gray-400 ml-2">({token.symbol})</span>
                    <span className="text-blue-400 ml-2 text-sm">
                      from {token.metadata?.sourceApp}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => simulateInteraction(token, 'read')}
                      className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => simulateInteraction(token, 'interact')}
                      className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded"
                    >
                      Use
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Tokens Discovery */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-white mb-3">Discover All Tokens</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {Array.from(allTokens.entries()).map(([appId, tokens]) => (
            <div key={appId} className="bg-gray-800 rounded-lg p-3">
              <h5 className="text-white font-medium mb-2">{appId} ({tokens.length})</h5>
              <div className="space-y-1">
                {tokens.map((token) => {
                  const hasAccess = availableTokens.some(t => t.id === token.id)
                  return (
                    <div key={token.id} className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-300 text-sm">{token.name}</span>
                        <span className="text-gray-500 ml-2 text-xs">({token.tokenType})</span>
                      </div>
                      {!hasAccess && appId !== currentAppId && (
                        <button
                          onClick={() => requestAccess(token.id, appId)}
                          className="px-2 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded"
                        >
                          Request Access
                        </button>
                      )}
                      {hasAccess && appId !== currentAppId && (
                        <span className="text-green-400 text-xs">Accessible</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h4 className="text-lg font-medium text-white mb-3">
          Active Permissions ({permissions.length})
        </h4>
        {permissions.length === 0 ? (
          <p className="text-gray-400">No active permissions</p>
        ) : (
          <div className="space-y-2">
            {permissions.map((perm, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white text-sm">
                      {perm.fromAppId} → {perm.toAppId}
                    </span>
                    <span className="text-gray-400 ml-2 text-xs">
                      [{perm.permissions.join(', ')}]
                    </span>
                  </div>
                  {perm.fromAppId === currentAppId && (
                    <button
                      onClick={() => revokeAccess(perm)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import React, { useState } from 'react'
import { useBitcoinOSAuth } from '../../hooks/useBitcoinOSAuth'
import { useBitcoinOSAuthContext } from './BitcoinOSAuthProvider'

interface BitcoinOSWalletWidgetProps {
  appId: string
  showBalance?: boolean
  showTokenCount?: boolean
  showAppList?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  variant?: 'compact' | 'full'
  className?: string
}

export const BitcoinOSWalletWidget: React.FC<BitcoinOSWalletWidgetProps> = ({
  appId,
  showBalance = true,
  showTokenCount = true,
  showAppList = false,
  position = 'top-right',
  variant = 'compact',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  
  const {
    user,
    isAuthenticated,
    isSignedInToApp,
    isWalletConnected,
    balance,
    totalTokens,
    error,
    connectWallet,
    signInToApp,
    signOutFromApp
  } = useBitcoinOSAuth(appId)
  
  const { 
    getSignedInApps, 
    globalSignOut,
    isConnecting 
  } = useBitcoinOSAuthContext()

  const formatBalance = (sats: number) => {
    if (sats >= 100000000) {
      return `${(sats / 100000000).toFixed(2)} BSV`
    }
    return `${sats.toLocaleString()} sats`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'inline': ''
  }

  const handleConnect = async () => {
    await connectWallet()
  }

  const handleSignInToApp = async () => {
    await signInToApp(appId)
  }

  const handleSignOutFromApp = async () => {
    await signOutFromApp(appId)
  }

  // Not connected state
  if (!isAuthenticated || !isWalletConnected) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isConnecting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Connect MetaNet
              </>
            )}
          </button>
          {error && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 text-xs rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Connected but not signed into this app
  if (!isSignedInToApp) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
          <div className="text-sm text-gray-600 mb-2">
            Connected as {user?.displayName}
          </div>
          <button
            onClick={handleSignInToApp}
            className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Sign in to {appId}
          </button>
        </div>
      </div>
    )
  }

  // Compact view
  if (variant === 'compact' && !isExpanded) {
    return (
      <div className={`${positionClasses[position]} ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.displayName?.slice(-2)}
          </div>
          <div className="text-sm">
            <div className="font-medium">{formatAddress(user?.address || '')}</div>
            {showBalance && (
              <div className="text-xs text-gray-500">{formatBalance(balance)}</div>
            )}
          </div>
        </button>
      </div>
    )
  }

  // Full/expanded view
  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg min-w-[280px]">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.displayName?.slice(-2)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{user?.displayName}</div>
                <div className="text-xs text-gray-500">{formatAddress(user?.address || '')}</div>
              </div>
            </div>
            {variant === 'compact' && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 space-y-3">
          {showBalance && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Balance</span>
              <span className="font-medium">{formatBalance(balance)}</span>
            </div>
          )}
          
          {showTokenCount && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tokens</span>
              <span className="font-medium">{totalTokens}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current App</span>
            <span className="font-medium text-green-600">✓ {appId}</span>
          </div>
          
          {showAppList && (
            <div className="pt-2 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Active Sessions</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {getSignedInApps().map(app => (
                  <div key={app} className="flex items-center justify-between text-xs">
                    <span className="text-gray-700">{app}</span>
                    {app !== appId && (
                      <button
                        onClick={() => signOutFromApp(app)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Sign out
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleSignOutFromApp}
            className="w-full px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors text-sm"
          >
            Sign out from {appId}
          </button>
          
          <button
            onClick={globalSignOut}
            className="w-full px-3 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors text-sm"
          >
            Sign out from all apps
          </button>
        </div>
      </div>
    </div>
  )
}

export default BitcoinOSWalletWidget
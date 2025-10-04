/**
 * Metanet Desktop Status Component
 * Shows connection status and wallet info from metanet-desktop
 * 
 * Integrates with metanet-desktop by BSV Blockchain Association
 * Repository: https://github.com/bsv-blockchain/metanet-desktop
 */

'use client'

import { useState } from 'react'
import { Wallet, Wifi, WifiOff, Loader2, Shield, AlertCircle } from 'lucide-react'
import { useMetanet } from '@/hooks/useMetanet'

interface MetanetStatusProps {
  className?: string
  showBalance?: boolean
  showAddress?: boolean
  compact?: boolean
}

export default function MetanetStatus({ 
  className = '',
  showBalance = true,
  showAddress = false,
  compact = false
}: MetanetStatusProps) {
  const [showDetails, setShowDetails] = useState(false)
  const { isConnected, isConnecting, wallet, isAuthenticated, connect, disconnect } = useMetanet()

  const formatAddress = (address: string) => {
    if (address.length <= 12) return address
    return `${address.slice(0, 6)}...${address.slice(-6)}`
  }

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
    }).format(balance)
  }

  if (compact) {
    return (
      <button
        onClick={() => setShowDetails(!showDetails)}
        className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/10 ${className}`}
        title={isConnected ? 'Metanet Desktop Connected' : 'Metanet Desktop Disconnected'}
      >
        {isConnecting ? (
          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
        ) : isConnected ? (
          <Wallet className="w-4 h-4 text-green-400" />
        ) : (
          <WifiOff className="w-4 h-4 text-gray-400" />
        )}
        
        {isConnected && wallet && showBalance && (
          <span className="text-xs text-white font-mono">
            {formatBalance(wallet.balance || 0)} BSV
          </span>
        )}

        {showDetails && isConnected && wallet && (
          <div className="absolute top-full left-0 mt-2 p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-50 min-w-64">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Metanet Wallet</span>
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">Connected</span>
                </div>
              </div>
              
              {wallet.address && (
                <div>
                  <div className="text-xs text-gray-400 mb-1">Address</div>
                  <div className="text-xs font-mono text-white bg-gray-700 px-2 py-1 rounded">
                    {formatAddress(wallet.address)}
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-gray-400 mb-1">Balance</div>
                <div className="text-sm font-mono text-white">
                  {formatBalance(wallet.balance || 0)} BSV
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-400 mb-1">Network</div>
                <div className="text-xs text-white capitalize">{wallet.network}</div>
              </div>
              
              {isAuthenticated && (
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <Shield className="w-3 h-3" />
                  <span>Authenticated</span>
                </div>
              )}
            </div>
          </div>
        )}
      </button>
    )
  }

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">Metanet Desktop</span>
        </div>
        
        <div className="flex items-center gap-2">
          {isConnecting ? (
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
          ) : isConnected ? (
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <WifiOff className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400">Disconnected</span>
            </div>
          )}
        </div>
      </div>

      {!isConnected && !isConnecting && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <AlertCircle className="w-4 h-4" />
            <span>Metanet Desktop not detected</span>
          </div>
          <button
            onClick={connect}
            className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            Connect to Metanet Desktop
          </button>
          <div className="text-xs text-gray-500 space-y-1">
            <p>To use Bitcoin features, install Metanet Desktop:</p>
            <p>• Download from github.com/bsv-blockchain/metanet-desktop</p>
            <p>• Ensure it's running on port 3321</p>
          </div>
        </div>
      )}

      {isConnected && wallet && (
        <div className="space-y-3">
          {showBalance && (
            <div>
              <div className="text-xs text-gray-400 mb-1">Balance</div>
              <div className="text-lg font-mono text-white">
                {formatBalance(wallet.balance || 0)} BSV
              </div>
            </div>
          )}
          
          {showAddress && wallet.address && (
            <div>
              <div className="text-xs text-gray-400 mb-1">Address</div>
              <div className="text-sm font-mono text-white bg-gray-700 px-3 py-2 rounded-lg break-all">
                {wallet.address}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Network</span>
            <span className="text-white capitalize">{wallet.network}</span>
          </div>
          
          {isAuthenticated && (
            <div className="flex items-center gap-2 text-xs text-green-400">
              <Shield className="w-3 h-3" />
              <span>Authenticated for Bitcoin OS</span>
            </div>
          )}
          
          <button
            onClick={disconnect}
            className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
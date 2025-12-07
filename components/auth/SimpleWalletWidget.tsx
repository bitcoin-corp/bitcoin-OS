'use client'

import React, { useState, useEffect } from 'react'

interface SimpleWalletWidgetProps {
  className?: string
}

export default function SimpleWalletWidget({ className = '' }: SimpleWalletWidgetProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleConnect = async () => {
    setIsConnecting(true)
    setError(null)
    
    try {
      // Test MetaNet Desktop connection with correct API
      const response = await fetch('http://localhost:3321/getPublicKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:2050'
        },
        body: JSON.stringify({ identityKey: true })
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.publicKey) {
          setIsConnected(true)
          console.log('✅ MetaNet Desktop connected - Public Key:', data.publicKey)
        } else {
          throw new Error('Invalid response from MetaNet Desktop')
        }
      } else {
        throw new Error('MetaNet Desktop not available')
      }
    } catch (err: any) {
      setError('MetaNet Desktop not running. Please start MetaNet Desktop.')
      console.error('Connection failed:', err)
    } finally {
      setIsConnecting(false)
    }
  }
  
  const handleDisconnect = () => {
    setIsConnected(false)
    setError(null)
  }
  
  if (!isConnected) {
    return (
      <div className={`fixed top-4 right-4 z-50 ${className}`}>
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
  
  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            BSV
          </div>
          <div>
            <div className="font-medium text-gray-900">MetaNet Connected</div>
            <div className="text-xs text-gray-500">Ready for Bitcoin-OS</div>
          </div>
          <button
            onClick={handleDisconnect}
            className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200"
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  )
}
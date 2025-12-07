'use client'

import React from 'react'
import BRC100TokenRegistry from '@/components/BRC100TokenRegistry'
import CrossAppTokenViewer from '@/components/CrossAppTokenViewer'

export default function TestTokensPage() {
  const handleTokenCreated = (token: any) => {
    console.log('Token created event received:', token)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">BRC100 Token Registry & Cross-App Integration</h1>
          <p className="text-gray-400">
            Test the BRC100 token creation and cross-app discovery system for Bitcoin-OS apps.
          </p>
        </div>

        {/* Token Creation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BRC100TokenRegistry
            appId="bitcoin-music"
            onTokenCreated={handleTokenCreated}
          />
          <BRC100TokenRegistry
            appId="bitcoin-social"
            onTokenCreated={handleTokenCreated}
          />
        </div>

        {/* Cross-App Token Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CrossAppTokenViewer currentAppId="bitcoin-music" />
          <CrossAppTokenViewer currentAppId="bitcoin-social" />
        </div>

        {/* Additional Apps Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BRC100TokenRegistry
            appId="bitcoin-games"
            onTokenCreated={handleTokenCreated}
          />
          <CrossAppTokenViewer currentAppId="bitcoin-games" />
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Cross-App Token Economy</h3>
          <p className="text-gray-400 mb-4">
            The Bitcoin-OS token system enables seamless asset interoperability:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">🎵 Music Tokens</h4>
              <p className="text-gray-400 text-sm">Album releases, concert tickets, fan rewards</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">👥 Social Tokens</h4>
              <p className="text-gray-400 text-sm">Community membership, reputation, governance</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">🎮 Game Tokens</h4>
              <p className="text-gray-400 text-sm">In-game items, achievements, rewards</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-400 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Token Creation</h4>
              <ol className="text-gray-300 space-y-1 text-sm">
                <li>1. Connect MetaNet wallet</li>
                <li>2. Create tokens for any app</li>
                <li>3. Tokens are minted on BSV blockchain</li>
                <li>4. Automatically discoverable by other apps</li>
              </ol>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Cross-App Usage</h4>
              <ol className="text-gray-300 space-y-1 text-sm">
                <li>1. Apps auto-discover available tokens</li>
                <li>2. Request access permissions</li>
                <li>3. Use tokens across app boundaries</li>
                <li>4. Enable new economic models</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
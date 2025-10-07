'use client'

import { useState } from 'react'
import { X, Wallet, Key, Mail, Globe } from 'lucide-react'

interface HandCashLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (handle: string, method?: string) => void
}

export default function HandCashLoginModal({ isOpen, onClose, onLogin }: HandCashLoginModalProps) {
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [activeTab, setActiveTab] = useState<'handcash' | 'keypair' | 'email' | 'metanet'>('handcash')

  if (!isOpen) return null

  const handleConnect = async (method: string, identifier: string) => {
    if (!identifier.trim()) return
    
    setIsConnecting(true)
    
    try {
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      onLogin(identifier, method)
      onClose()
    } catch (error) {
      console.error(`${method} connection failed:`, error)
    } finally {
      setIsConnecting(false)
    }
  }

  const connectWithHandCash = () => {
    // Open HandCash app or website for connection
    window.open('https://handcash.io', '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Modal - positioned without backdrop */}
      <div 
        className="relative bg-gray-900/95 border border-gray-600 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl backdrop-blur-md pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Connect Your Wallet</h2>
          <p className="text-gray-400 text-sm">Choose your preferred wallet connection method</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
          {[
            { id: 'handcash', label: 'HandCash', icon: Wallet },
            { id: 'keypair', label: 'Key Pair', icon: Key },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'metanet', label: 'MetaNet', icon: Globe }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="space-y-4">
          {activeTab === 'handcash' && (
            <>
              <div>
                <label htmlFor="handle" className="block text-sm font-medium text-gray-300 mb-2">
                  HandCash Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    id="handle"
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="your-handle"
                    className="w-full pl-8 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleConnect('handcash', handle)}
                    disabled={isConnecting}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleConnect('handcash', handle)}
                  disabled={!handle.trim() || isConnecting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isConnecting ? 'Connecting...' : 'Connect with HandCash'}
                </button>
                <button
                  onClick={connectWithHandCash}
                  className="w-full bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700 border border-gray-600 transition-colors text-sm"
                >
                  Open HandCash App
                </button>
              </div>
            </>
          )}

          {activeTab === 'keypair' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Import Private Key or Generate New
                </label>
                <textarea
                  placeholder="Paste your private key here or leave empty to generate new"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
              <button
                onClick={() => handleConnect('keypair', 'generated-key')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Import/Generate Key Pair
              </button>
            </>
          )}

          {activeTab === 'email' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleConnect('email', email)}
                />
              </div>
              <button
                onClick={() => handleConnect('email', email)}
                disabled={!email.trim() || isConnecting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isConnecting ? 'Creating Wallet...' : 'Sign Up with Email'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                We'll create a secure wallet for you
              </p>
            </>
          )}

          {activeTab === 'metanet' && (
            <>
              <div className="text-center py-4">
                <Globe className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Connect with MetaNet Desktop BRC100 Wallet</p>
              </div>
              <button
                onClick={() => handleConnect('metanet', 'metanet-wallet')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Connect MetaNet Wallet
              </button>
              <p className="text-xs text-gray-500 text-center">
                Requires MetaNet Desktop application
              </p>
            </>
          )}
        </div>

        {/* Skip option */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-gray-300 text-sm py-2 transition-colors"
          >
            Continue without wallet
          </button>
          <p className="text-xs text-gray-500 text-center mt-1">
            You can connect a wallet later to unlock Bitcoin features
          </p>
        </div>
      </div>
    </div>
  )
}
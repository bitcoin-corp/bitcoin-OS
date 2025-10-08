'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Wallet, Key, Mail, Globe, Move, Shield, Award, Zap } from 'lucide-react'
import { brc100Wallet, BRC100Identity } from '@/lib/brc100'
import { yoursWallet, YoursWalletAPI } from '@/lib/yours-wallet'

interface HandCashLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (handle: string, method?: string) => void
}

export default function HandCashLoginModal({ isOpen, onClose, onLogin }: HandCashLoginModalProps) {
  const [handle, setHandle] = useState('')
  const [email, setEmail] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [brc100Identity, setBrc100Identity] = useState<BRC100Identity | null>(null)
  const [yoursWalletAvailable, setYoursWalletAvailable] = useState(false)
  const [activeTab, setActiveTab] = useState<'handcash' | 'centbee' | 'yours' | 'bitcoin-wallet' | 'metanet' | 'keypair' | 'email' | 'rock-wallet'>('handcash')
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startMousePos = useRef({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startMousePos.current.x
      const deltaY = e.clientY - startMousePos.current.y
      setPosition({
        x: startPos.current.x + deltaX,
        y: startPos.current.y + deltaY
      })
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Check Yours Wallet availability
  useEffect(() => {
    const checkYoursWallet = async () => {
      const available = await yoursWallet.isAvailable()
      setYoursWalletAvailable(available)
    }
    checkYoursWallet()
  }, [])

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  if (!isOpen) return null

  const handleConnect = async (method: string, identifier: string) => {
    if (!identifier.trim()) return
    
    setIsConnecting(true)
    
    try {
      // Handle Yours Wallet connection
      if (method === 'yours') {
        try {
          const connection = await yoursWallet.connect()
          if (connection.isConnected && connection.address) {
            // Create BRC100 identity for Yours Wallet
            const identity = await brc100Wallet.createIdentity({ backup: true })
            setBrc100Identity(identity)
            
            // Create certificate with Yours Wallet info
            await brc100Wallet.createCertificate({
              type: 'yours-wallet',
              method: 'yours',
              address: connection.address,
              publicKey: connection.publicKey,
              createdAt: new Date().toISOString(),
              device: navigator.userAgent
            })
            
            console.log('Yours Wallet connected:', connection)
            onLogin(connection.address, method)
          } else {
            throw new Error('Failed to connect to Yours Wallet')
          }
        } catch (error) {
          console.error('Yours Wallet connection failed:', error)
          throw error
        }
      }
      // Handle BRC100 identity creation for compatible methods
      else if (['metanet', 'bitcoin-wallet', 'keypair'].includes(method)) {
        const identity = await brc100Wallet.createIdentity({ backup: true })
        setBrc100Identity(identity)
        
        // Create default identity certificate
        await brc100Wallet.createCertificate({
          type: 'identity',
          method: method,
          createdAt: new Date().toISOString(),
          device: navigator.userAgent
        })
        
        console.log('BRC100 Identity created:', identity)
        onLogin(identity.address, method)
      } else {
        // Standard wallet connection
        await new Promise(resolve => setTimeout(resolve, 1500))
        onLogin(identifier, method)
      }
      
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      setIsDragging(true)
      startPos.current = { x: position.x, y: position.y }
      startMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Modal - positioned and draggable */}
      <div 
        ref={dragRef}
        className="absolute bg-gray-900/95 border border-gray-600 rounded-2xl p-6 w-full max-w-lg shadow-2xl backdrop-blur-md pointer-events-auto"
        style={{
          left: `calc(60% + ${position.x}px)`,
          top: `calc(15% + ${position.y}px)`,
          width: '450px',
          minHeight: '580px',
          cursor: isDragging ? 'grabbing' : 'default'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Drag Handle */}
        <div 
          className="flex items-center justify-center py-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Connect Your Wallet</h2>
          <p className="text-gray-400 text-sm">Choose your preferred wallet connection method</p>
        </div>

        {/* Wallet Options - Organized Layout */}
        <div className="space-y-2 mb-6">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'handcash', label: 'HandCash', icon: Wallet, color: 'bg-green-600 hover:bg-green-700' },
              { id: 'centbee', label: 'CentBee', icon: Wallet, color: 'bg-yellow-600 hover:bg-yellow-700' },
              { id: 'yours', label: 'Yours', icon: Wallet, color: 'bg-blue-600 hover:bg-blue-700' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === id
                    ? `${color} text-white`
                    : 'bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'rock-wallet', label: 'Rock Wallet', icon: Wallet, color: 'bg-gray-600 hover:bg-gray-700' },
              { id: 'metanet', label: 'MetaNet', icon: Globe, color: 'bg-teal-600 hover:bg-teal-700' },
              { id: 'keypair', label: 'Key Pair', icon: Key, color: 'bg-purple-600 hover:bg-purple-700' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === id
                    ? `${color} text-white`
                    : 'bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
          
          {/* Third Row - Full Width Options */}
          <div className="w-full space-y-2">
            <button
              onClick={() => setActiveTab('bitcoin-wallet')}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-all w-full ${
                activeTab === 'bitcoin-wallet'
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Bitcoin OS Wallet</span>
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-sm font-medium transition-all w-full ${
                activeTab === 'email'
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Sign up with Email</span>
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-4">
          {activeTab === 'handcash' && (
            <>
              <button
                onClick={() => handleConnect('handcash', 'handcash-wallet')}
                disabled={isConnecting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isConnecting ? 'Connecting...' : 'Connect with HandCash'}
              </button>
            </>
          )}

          {activeTab === 'keypair' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Import Private Key or Generate New BRC100 Identity
                </label>
                <textarea
                  placeholder="Paste your private key here or leave empty to generate new BRC100 identity"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="bg-gray-800 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">BRC100 Key Features</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• ECDSA/Schnorr signature support</li>
                    <li>• Identity certificate generation</li>
                    <li>• Secure backup & restore</li>
                    <li>• App permission management</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleConnect('keypair', 'generated-key')}
                disabled={isConnecting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Creating BRC100 Identity...' : 'Import/Generate BRC100 Key Pair'}
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

          {activeTab === 'centbee' && (
            <>
              <div className="text-center py-4">
                <Wallet className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Connect with CentBee Wallet</p>
              </div>
              <button
                onClick={() => handleConnect('centbee', 'centbee-wallet')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Connect CentBee Wallet
              </button>
              <button
                onClick={() => window.open('https://centbee.com', '_blank')}
                className="w-full bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700 border border-gray-600 transition-colors text-sm mt-2"
              >
                Download CentBee App
              </button>
            </>
          )}

          {activeTab === 'yours' && (
            <>
              <div className="text-center py-4">
                <Wallet className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Connect with Yours Wallet</p>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-gray-300">1Sat Ordinals Support</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Non-custodial BSV wallet</li>
                    <li>• 1Sat Ordinals management</li>
                    <li>• Open source & audited</li>
                    <li>• Browser extension</li>
                  </ul>
                </div>
                {!yoursWalletAvailable && (
                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-4">
                    <p className="text-xs text-yellow-400 text-center">
                      Yours Wallet extension not detected
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleConnect('yours', 'yours-wallet')}
                disabled={!yoursWalletAvailable || isConnecting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Connecting to Yours Wallet...' : 
                 yoursWalletAvailable ? 'Connect Yours Wallet' : 'Install Yours Wallet'}
              </button>
              <button
                onClick={() => window.open(yoursWalletAvailable ? 'https://yours.org' : YoursWalletAPI.getInstallUrl(), '_blank')}
                className="w-full bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700 border border-gray-600 transition-colors text-sm mt-2"
              >
                {yoursWalletAvailable ? 'Visit Yours.org' : 'Install Yours Wallet Extension'}
              </button>
            </>
          )}

          {activeTab === 'bitcoin-wallet' && (
            <>
              <div className="text-center py-4">
                <Wallet className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Use Bitcoin OS Native Wallet</p>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-gray-300">Native Integration</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Built-in BRC100 support</li>
                    <li>• Seamless app integration</li>
                    <li>• Local key management</li>
                    <li>• Instant authentication</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleConnect('bitcoin-wallet', 'bitcoin-os-wallet')}
                disabled={isConnecting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Creating BRC100 Wallet...' : 'Create Bitcoin OS Wallet'}
              </button>
            </>
          )}

          {activeTab === 'metanet' && (
            <>
              <div className="text-center py-4">
                <Globe className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Connect with MetaNet Desktop BRC100 Wallet</p>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-teal-400" />
                    <span className="text-sm font-medium text-gray-300">BRC100 Features</span>
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Cryptographic identity certificates</li>
                    <li>• Secure message signing</li>
                    <li>• Transaction authorization</li>
                    <li>• Cross-app authentication</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleConnect('metanet', 'metanet-wallet')}
                disabled={isConnecting}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Creating BRC100 Identity...' : 'Connect MetaNet Wallet'}
              </button>
              <p className="text-xs text-gray-500 text-center">
                Creates BRC100 compatible identity
              </p>
            </>
          )}

          {activeTab === 'rock-wallet' && (
            <>
              <div className="text-center py-4">
                <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400 mb-4">Connect with Rock Wallet</p>
              </div>
              <button
                onClick={() => handleConnect('rock-wallet', 'rock-wallet')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Connect Rock Wallet
              </button>
              <button
                onClick={() => window.open('https://rockwallet.com', '_blank')}
                className="w-full bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700 border border-gray-600 transition-colors text-sm mt-2"
              >
                Download Rock Wallet App
              </button>
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
/**
 * Metanet Wallet Demo Component
 * Demonstrates Bitcoin OS integration with metanet-desktop
 * 
 * Features:
 * - Connect to metanet-desktop wallet
 * - Display wallet information
 * - Send BSV transactions
 * - Sign messages
 */

'use client'

import { useState } from 'react'
import { Send, MessageSquare, Wallet, Loader2, CheckCircle, AlertCircle, Copy } from 'lucide-react'
import { useMetanetApp } from '@/hooks/useMetanet'

export default function MetanetWalletDemo() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [txResult, setTxResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const {
    isConnected,
    isConnecting,
    wallet,
    appAuthenticated,
    connect,
    sendTransaction,
    signMessage
  } = useMetanetApp(
    'bitcoin-os-wallet-demo',
    'Bitcoin OS Wallet Demo',
    ['wallet:read', 'wallet:write', 'wallet:sign']
  )

  const handleSendTransaction = async () => {
    if (!recipient || !amount || !appAuthenticated) return

    setLoading(true)
    setTxResult(null)

    try {
      const result = await sendTransaction([
        { address: recipient, amount: parseFloat(amount) }
      ])

      if (result) {
        setTxResult({
          success: true,
          txid: result.txid,
          amount: result.amount,
          fee: result.fee
        })
        setRecipient('')
        setAmount('')
      } else {
        setTxResult({
          success: false,
          error: 'Transaction failed'
        })
      }
    } catch (error: any) {
      setTxResult({
        success: false,
        error: error.message || 'Transaction failed'
      })
    }

    setLoading(false)
  }

  const handleSignMessage = async () => {
    if (!message || !appAuthenticated) return

    setLoading(true)
    setSignature('')

    try {
      const result = await signMessage(message)
      if (result) {
        setSignature(result)
      }
    } catch (error) {
      console.error('Message signing failed:', error)
    }

    setLoading(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const formatAddress = (address: string) => {
    if (address.length <= 16) return address
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Metanet Wallet Demo</h1>
        <p className="text-gray-400">Bitcoin OS integration with metanet-desktop</p>
      </div>

      {/* Connection Status */}
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Connection Status</h2>
          {isConnecting ? (
            <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
          ) : isConnected ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400" />
          )}
        </div>

        {!isConnected && !isConnecting && (
          <div className="space-y-4">
            <p className="text-gray-400">Metanet Desktop not connected</p>
            <button
              onClick={connect}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Connect to Metanet Desktop
            </button>
            <div className="text-sm text-gray-500 space-y-1">
              <p>To use this demo:</p>
              <p>1. Install Metanet Desktop from GitHub</p>
              <p>2. Ensure it's running on localhost:3321</p>
              <p>3. Click "Connect" above</p>
            </div>
          </div>
        )}

        {isConnected && !appAuthenticated && (
          <div className="text-center">
            <p className="text-yellow-400">Waiting for app authentication...</p>
            <p className="text-sm text-gray-400 mt-2">
              Please approve Bitcoin OS Wallet Demo in Metanet Desktop
            </p>
          </div>
        )}

        {isConnected && appAuthenticated && wallet && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Connected and Authenticated</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-400">Balance</div>
                <div className="text-lg font-mono text-white">
                  {wallet.balance?.toFixed(8) || '0.00000000'} BSV
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400">Network</div>
                <div className="text-white capitalize">{wallet.network}</div>
              </div>
            </div>

            {wallet.address && (
              <div>
                <div className="text-sm text-gray-400 mb-1">Address</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-mono text-white bg-gray-700 px-3 py-1 rounded flex-1 break-all">
                    {wallet.address}
                  </div>
                  <button
                    onClick={() => copyToClipboard(wallet.address!)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Copy address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Send Transaction */}
      {isConnected && appAuthenticated && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send BSV
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter BSV address..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (BSV)</label>
              <input
                type="number"
                step="0.00000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00000000"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSendTransaction}
              disabled={!recipient || !amount || loading}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? 'Sending...' : 'Send Transaction'}
            </button>

            {txResult && (
              <div className={`p-3 rounded-lg ${txResult.success ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'}`}>
                {txResult.success ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Transaction Sent!</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="text-gray-400">TXID: </span>
                        <span className="font-mono text-white break-all">{txResult.txid}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Amount: </span>
                        <span className="text-white">{txResult.amount} BSV</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Fee: </span>
                        <span className="text-white">{txResult.fee} BSV</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>{txResult.error}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sign Message */}
      {isConnected && appAuthenticated && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Sign Message
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Message to Sign</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message to sign..."
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSignMessage}
              disabled={!message || loading}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageSquare className="w-4 h-4" />
              )}
              {loading ? 'Signing...' : 'Sign Message'}
            </button>

            {signature && (
              <div className="p-3 bg-purple-900/50 border border-purple-700 rounded-lg">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Message Signed!</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-mono text-white bg-gray-700 px-3 py-2 rounded flex-1 break-all">
                    {signature}
                  </div>
                  <button
                    onClick={() => copyToClipboard(signature)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Copy signature"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  )
}
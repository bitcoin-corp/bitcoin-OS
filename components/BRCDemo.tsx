/**
 * BRC Standards Demo Component
 * Demonstrates Bitcoin OS integration with BRC specifications
 * 
 * Features:
 * - BRC-1 Transaction Creation
 * - BRC-103 Identity Certificates
 * - Standardized BSV blockchain interactions
 */

'use client'

import { useState } from 'react'
import { 
  Send, 
  FileText, 
  Shield, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  Database,
  Zap,
  User
} from 'lucide-react'
import { brcClient, BRCTransactionRequest, BRCTransactionResponse } from '@/lib/brc-client'

export default function BRCDemo() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Payment transaction state
  const [paymentAddress, setPaymentAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')
  const [paymentAmount, setPaymentAmount] = useState('100000') // 100k satoshis = 0.001 BSV

  // Data transaction state
  const [dataContent, setDataContent] = useState('Hello BSV Blockchain!')

  // Identity certificate state
  const [identitySubject, setIdentitySubject] = useState('bitcoin-os-user@example.com')

  // Transaction status state
  const [statusTxid, setStatusTxid] = useState('')

  const handlePaymentTransaction = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await brcClient.createPayment(
        paymentAddress,
        parseInt(paymentAmount),
        `Bitcoin OS Payment - ${new Date().toLocaleString()}`
      )
      setResult({
        type: 'payment',
        data: response
      })
    } catch (err: any) {
      setError(err.message || 'Payment transaction failed')
    }

    setLoading(false)
  }

  const handleDataTransaction = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await brcClient.createDataTransaction(
        dataContent,
        `Bitcoin OS Data Transaction - ${new Date().toLocaleString()}`
      )
      setResult({
        type: 'data',
        data: response
      })
    } catch (err: any) {
      setError(err.message || 'Data transaction failed')
    }

    setLoading(false)
  }

  const handleIdentityLookup = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const certificate = await brcClient.getIdentityCertificate(identitySubject)
      setResult({
        type: 'identity',
        data: certificate
      })
    } catch (err: any) {
      setError(err.message || 'Identity lookup failed')
    }

    setLoading(false)
  }

  const handleTransactionStatus = async () => {
    if (!statusTxid.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const status = await brcClient.getTransactionStatus(statusTxid)
      setResult({
        type: 'status',
        data: status
      })
    } catch (err: any) {
      setError(err.message || 'Transaction status lookup failed')
    }

    setLoading(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">BRC Standards Demo</h1>
        <p className="text-gray-400">Bitcoin OS integration with BSV BRC specifications</p>
        <div className="mt-4 flex justify-center space-x-4 text-sm">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full">BRC-1 Transactions</span>
          <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full">BRC-103 Identity</span>
          <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full">BSV Standards</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BRC-1 Payment Transaction */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-green-400" />
            BRC-1 Payment
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Recipient Address</label>
              <input
                type="text"
                value={paymentAddress}
                onChange={(e) => setPaymentAddress(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount (satoshis)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handlePaymentTransaction}
              disabled={loading || !paymentAddress || !paymentAmount}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Create Payment Transaction
            </button>
          </div>
        </div>

        {/* BRC-1 Data Transaction */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            BRC-1 Data Storage
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Data Content</label>
              <textarea
                value={dataContent}
                onChange={(e) => setDataContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleDataTransaction}
              disabled={loading || !dataContent}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              Create Data Transaction
            </button>
          </div>
        </div>

        {/* BRC-103 Identity Certificate */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-400" />
            BRC-103 Identity
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subject Identifier</label>
              <input
                type="text"
                value={identitySubject}
                onChange={(e) => setIdentitySubject(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={handleIdentityLookup}
              disabled={loading || !identitySubject}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
              Lookup Identity Certificate
            </button>
          </div>
        </div>

        {/* Transaction Status */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Transaction Status
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Transaction ID</label>
              <input
                type="text"
                value={statusTxid}
                onChange={(e) => setStatusTxid(e.target.value)}
                placeholder="Enter TXID to check status..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <button
              onClick={handleTransactionStatus}
              disabled={loading || !statusTxid.trim()}
              className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Check Transaction Status
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {(result || error) && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            {error ? (
              <>
                <AlertCircle className="w-5 h-5 text-red-400" />
                Error
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                Result
              </>
            )}
          </h3>

          {error && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {result.type === 'payment' && (
                <div className="space-y-3">
                  <div className="text-sm text-green-400 font-medium">Payment Transaction Created</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Transaction ID</div>
                      <div className="font-mono text-white bg-gray-700 p-2 rounded break-all">
                        {result.data.txid}
                        <button 
                          onClick={() => copyToClipboard(result.data.txid)}
                          className="ml-2 text-gray-400 hover:text-white"
                        >
                          <Copy className="w-3 h-3 inline" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Inputs</div>
                      <div className="text-white">{result.data.inputs?.length || 0} inputs</div>
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'data' && (
                <div className="space-y-3">
                  <div className="text-sm text-blue-400 font-medium">Data Transaction Created</div>
                  <div className="text-sm">
                    <div className="text-gray-400">Transaction ID</div>
                    <div className="font-mono text-white bg-gray-700 p-2 rounded break-all">
                      {result.data.txid}
                      <button 
                        onClick={() => copyToClipboard(result.data.txid)}
                        className="ml-2 text-gray-400 hover:text-white"
                      >
                        <Copy className="w-3 h-3 inline" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'identity' && (
                <div className="space-y-3">
                  <div className="text-sm text-purple-400 font-medium">
                    {result.data ? 'Identity Certificate Found' : 'No Certificate Found'}
                  </div>
                  {result.data && (
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-400">Subject</div>
                          <div className="text-white">{result.data.subject}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Type</div>
                          <div className="text-white">{result.data.type}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Valid From</div>
                          <div className="text-white">{result.data.validFrom}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Valid To</div>
                          <div className="text-white">{result.data.validTo}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {result.type === 'status' && (
                <div className="space-y-3">
                  <div className="text-sm text-yellow-400 font-medium">Transaction Status</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Confirmed</div>
                      <div className={`font-medium ${result.data.confirmed ? 'text-green-400' : 'text-yellow-400'}`}>
                        {result.data.confirmed ? 'Yes' : 'Pending'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Confirmations</div>
                      <div className="text-white">{result.data.confirmations}</div>
                    </div>
                    {result.data.blockHeight && (
                      <div>
                        <div className="text-gray-400">Block Height</div>
                        <div className="text-white">{result.data.blockHeight}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* BRC Information */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">About BRC Standards</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <strong className="text-blue-400">BRC-1 Transaction Creation:</strong> Standardized method for applications to request Bitcoin transaction creation with arbitrary output scripts.
          </div>
          <div>
            <strong className="text-purple-400">BRC-103 Identity Certificates:</strong> Verifiable identity system for privacy-preserving authentication and selective disclosure.
          </div>
          <div>
            <strong className="text-green-400">BSV Integration:</strong> Bitcoin OS implements these standards for seamless wallet-to-application communication.
          </div>
        </div>
      </div>
    </div>
  )
}
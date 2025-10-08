/**
 * Client-side BRC100 Wallet API Interface
 * Provides easy access to wallet functionality for Bitcoin OS apps
 */

import { BRC100Identity, IdentityCertificate, SignatureRequest, SignatureResponse, TransactionRequest, TransactionResponse, Permission, Ordinal, OrdinalsRequest, InscriptionRequest } from './brc100'

export class WalletClient {
  private baseUrl: string
  private sessionToken: string | null = null

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
    this.loadSession()
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    }

    if (this.sessionToken) {
      headers['Authorization'] = `Bearer ${this.sessionToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || 'API request failed')
    }

    return data
  }

  private saveSession(token: string) {
    this.sessionToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('wallet-session', token)
    }
  }

  private loadSession() {
    if (typeof window !== 'undefined') {
      this.sessionToken = localStorage.getItem('wallet-session')
    }
  }

  private clearSession() {
    this.sessionToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wallet-session')
    }
  }

  // Authentication Methods
  async authenticate(): Promise<{ identity: BRC100Identity, sessionToken: string }> {
    // Step 1: Get challenge
    const challengeResponse = await this.request('/auth', {
      method: 'POST',
      body: JSON.stringify({ action: 'challenge' })
    })

    const { challenge, timestamp } = challengeResponse

    // Step 2: Sign challenge with wallet
    const identity = await this.getIdentity()
    if (!identity) {
      throw new Error('No identity available for authentication')
    }

    const messageToSign = `${challenge}:${timestamp}:${window.location.origin}`
    const signatureResponse = await this.signMessage({
      message: messageToSign,
      encoding: 'utf8',
      algorithm: 'ecdsa'
    })

    // Step 3: Verify signature and get session
    const verifyResponse = await this.request('/auth', {
      method: 'POST',
      body: JSON.stringify({
        action: 'verify',
        signature: signatureResponse.signature,
        publicKey: signatureResponse.publicKey,
        challenge,
        timestamp
      })
    })

    this.saveSession(verifyResponse.sessionToken)
    return {
      identity: verifyResponse.identity,
      sessionToken: verifyResponse.sessionToken
    }
  }

  async logout(): Promise<void> {
    if (this.sessionToken) {
      try {
        await this.request('/auth', {
          method: 'POST',
          body: JSON.stringify({
            action: 'logout',
            sessionToken: this.sessionToken
          })
        })
      } catch (error) {
        console.warn('Logout request failed:', error)
      }
    }
    this.clearSession()
  }

  async verifySession(): Promise<boolean> {
    if (!this.sessionToken) return false

    try {
      const response = await this.request('/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'session',
          sessionToken: this.sessionToken
        })
      })
      return response.valid
    } catch (error) {
      this.clearSession()
      return false
    }
  }

  // Wallet Methods
  async getIdentity(): Promise<BRC100Identity | null> {
    const response = await this.request('/wallet?action=identity')
    return response.identity
  }

  async createIdentity(options?: { backup?: boolean }): Promise<BRC100Identity> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create_identity',
        options
      })
    })
    return response.identity
  }

  async getBalance(): Promise<number> {
    const response = await this.request('/wallet?action=balance')
    return response.balance
  }

  async getAddress(): Promise<string> {
    const response = await this.request('/wallet?action=address')
    return response.address
  }

  async signMessage(request: SignatureRequest): Promise<SignatureResponse> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'sign_message',
        request
      })
    })
    return response.signature
  }

  // Certificate Methods
  async getCertificates(): Promise<IdentityCertificate[]> {
    const response = await this.request('/wallet?action=certificates')
    return response.certificates
  }

  async createCertificate(data: any): Promise<IdentityCertificate> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create_certificate',
        data
      })
    })
    return response.certificate
  }

  async verifyCertificate(certificate: IdentityCertificate): Promise<boolean> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'verify_certificate',
        certificate
      })
    })
    return response.isValid
  }

  // Transaction Methods
  async createTransaction(request: TransactionRequest): Promise<TransactionResponse> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create_transaction',
        request
      })
    })
    return response.transaction
  }

  async signTransaction(rawTx: string): Promise<string> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'sign_transaction',
        rawTx
      })
    })
    return response.signedTx
  }

  async broadcastTransaction(rawTx: string): Promise<string> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'broadcast_transaction',
        rawTx
      })
    })
    return response.txid
  }

  // Permission Methods
  async requestPermissions(permissions: Permission[]): Promise<boolean> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'request_permissions',
        permissions
      })
    })
    return response.granted
  }

  async getPermissions(origin?: string): Promise<Permission[]> {
    const url = origin ? `/wallet?action=permissions&origin=${encodeURIComponent(origin)}` : '/wallet?action=permissions'
    const response = await this.request(url)
    return response.permissions
  }

  async revokePermissions(origin: string): Promise<void> {
    await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'revoke_permissions',
        origin
      })
    })
  }

  // Backup & Restore
  async backup(): Promise<string> {
    const response = await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'backup'
      })
    })
    return response.backup
  }

  async restore(backup: string): Promise<void> {
    await this.request('/wallet', {
      method: 'POST',
      body: JSON.stringify({
        action: 'restore',
        backup
      })
    })
  }
}

// Global wallet client instance
export const walletClient = new WalletClient()

// Helper function for easy app integration
export async function connectWallet(): Promise<BRC100Identity> {
  const identity = await walletClient.getIdentity()
  if (identity) {
    return identity
  }

  // If no identity, try to authenticate or create one
  try {
    const { identity: authIdentity } = await walletClient.authenticate()
    return authIdentity
  } catch (error) {
    // If authentication fails, create new identity
    return await walletClient.createIdentity({ backup: true })
  }
}

// Helper function to check if wallet is connected
export async function isWalletConnected(): Promise<boolean> {
  try {
    const identity = await walletClient.getIdentity()
    return !!identity
  } catch (error) {
    return false
  }
}
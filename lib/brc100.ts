/**
 * BRC100 Wallet Interface for Bitcoin OS
 * Based on BSV Desktop/Metanet Desktop specifications
 */

export interface BRC100Identity {
  id: string
  address: string
  publicKey: string
  certificates: IdentityCertificate[]
  createdAt: Date
}

export interface IdentityCertificate {
  id: string
  type: string
  issuer: string
  subject: string
  validFrom: Date
  validTo: Date
  signature: string
  data: any
}

export interface WalletAuthRequest {
  origin: string
  requestId: string
  permissions: Permission[]
  challenge: string
}

export interface Permission {
  type: 'sign' | 'identity' | 'transaction' | 'certificate'
  description: string
  required: boolean
}

export interface SignatureRequest {
  message: string
  encoding?: 'utf8' | 'hex' | 'base64'
  algorithm?: 'ecdsa' | 'schnorr'
}

export interface SignatureResponse {
  signature: string
  publicKey: string
  algorithm: string
  messageHash: string
}

export interface TransactionRequest {
  outputs: TransactionOutput[]
  feeRate?: number
  note?: string
}

export interface TransactionOutput {
  address: string
  amount: number
  script?: string
}

export interface Ordinal {
  txid: string
  vout: number
  outpoint: string
  origin: string
  height: number
  idx: number
  data?: any
  mediaType?: string
  content?: string
}

export interface OrdinalsRequest {
  limit?: number
  offset?: number
  filter?: 'all' | 'images' | 'text' | 'json'
}

export interface InscriptionRequest {
  data: any
  mediaType: string
  recipient?: string
  fee?: number
}

export interface TransactionResponse {
  txid: string
  rawTx: string
  fee: number
  inputs: any[]
  outputs: any[]
}

export interface BRC100WalletInterface {
  // Identity & Authentication
  getIdentity(): Promise<BRC100Identity | null>
  createIdentity(options?: { backup?: boolean }): Promise<BRC100Identity>
  signMessage(request: SignatureRequest): Promise<SignatureResponse>
  
  // Certificate Management
  getCertificates(): Promise<IdentityCertificate[]>
  createCertificate(data: any): Promise<IdentityCertificate>
  verifyCertificate(cert: IdentityCertificate): Promise<boolean>
  
  // Transaction Operations
  createTransaction(request: TransactionRequest): Promise<TransactionResponse>
  signTransaction(rawTx: string): Promise<string>
  broadcastTransaction(rawTx: string): Promise<string>
  
  // Wallet Management
  getBalance(): Promise<number>
  getAddress(): Promise<string>
  backup(): Promise<string>
  restore(backup: string): Promise<void>
  
  // Ordinals & Inscriptions
  getOrdinals(request?: OrdinalsRequest): Promise<Ordinal[]>
  transferOrdinal(ordinal: string, to: string): Promise<string>
  inscribe(request: InscriptionRequest): Promise<string>
  
  // App Integration
  requestPermissions(permissions: Permission[]): Promise<boolean>
  revokePermissions(origin: string): Promise<void>
  getPermissions(origin?: string): Promise<Permission[]>
}

export class MockBRC100Wallet implements BRC100WalletInterface {
  private identity: BRC100Identity | null = null
  private permissions: Map<string, Permission[]> = new Map()

  async getIdentity(): Promise<BRC100Identity | null> {
    return this.identity
  }

  async createIdentity(options?: { backup?: boolean }): Promise<BRC100Identity> {
    // Mock implementation - in real app this would generate actual keys
    const mockIdentity: BRC100Identity = {
      id: `brc100-${Date.now()}`,
      address: `1${Math.random().toString(36).substring(2, 26)}`,
      publicKey: `02${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      certificates: [],
      createdAt: new Date()
    }
    
    this.identity = mockIdentity
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('brc100-identity', JSON.stringify(mockIdentity))
    }
    
    return mockIdentity
  }

  async signMessage(request: SignatureRequest): Promise<SignatureResponse> {
    if (!this.identity) {
      throw new Error('No identity available. Create identity first.')
    }

    // Mock signature - in real implementation would use actual cryptography
    const mockSignature = `304402${Array(60).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    
    return {
      signature: mockSignature,
      publicKey: this.identity.publicKey,
      algorithm: request.algorithm || 'ecdsa',
      messageHash: Buffer.from(request.message).toString('hex')
    }
  }

  async getCertificates(): Promise<IdentityCertificate[]> {
    return this.identity?.certificates || []
  }

  async createCertificate(data: any): Promise<IdentityCertificate> {
    const cert: IdentityCertificate = {
      id: `cert-${Date.now()}`,
      type: 'identity',
      issuer: this.identity?.address || 'self',
      subject: this.identity?.address || 'unknown',
      validFrom: new Date(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      signature: `mock-signature-${Date.now()}`,
      data
    }

    if (this.identity) {
      this.identity.certificates.push(cert)
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('brc100-identity', JSON.stringify(this.identity))
      }
    }

    return cert
  }

  async verifyCertificate(cert: IdentityCertificate): Promise<boolean> {
    // Mock verification - always returns true for demo
    return true
  }

  async createTransaction(request: TransactionRequest): Promise<TransactionResponse> {
    // Mock transaction creation
    return {
      txid: `${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      rawTx: `mock-raw-tx-${Date.now()}`,
      fee: request.feeRate || 1000,
      inputs: [],
      outputs: request.outputs
    }
  }

  async signTransaction(rawTx: string): Promise<string> {
    return `signed-${rawTx}`
  }

  async broadcastTransaction(rawTx: string): Promise<string> {
    return `broadcast-${Date.now()}`
  }

  async getBalance(): Promise<number> {
    // Mock balance
    return Math.floor(Math.random() * 1000000) / 100 // Random balance in satoshis
  }

  async getAddress(): Promise<string> {
    return this.identity?.address || ''
  }

  async backup(): Promise<string> {
    if (!this.identity) {
      throw new Error('No identity to backup')
    }
    return JSON.stringify(this.identity)
  }

  async restore(backup: string): Promise<void> {
    try {
      this.identity = JSON.parse(backup)
      if (typeof window !== 'undefined') {
        localStorage.setItem('brc100-identity', backup)
      }
    } catch (error) {
      throw new Error('Invalid backup data')
    }
  }

  async requestPermissions(permissions: Permission[]): Promise<boolean> {
    // Mock permission grant - in real app would show user dialog
    const origin = window.location.origin
    this.permissions.set(origin, permissions)
    return true
  }

  async revokePermissions(origin: string): Promise<void> {
    this.permissions.delete(origin)
  }

  async getPermissions(origin?: string): Promise<Permission[]> {
    const targetOrigin = origin || window.location.origin
    return this.permissions.get(targetOrigin) || []
  }

  // Ordinals & Inscriptions Implementation
  async getOrdinals(request?: OrdinalsRequest): Promise<Ordinal[]> {
    // Mock ordinals data - in real implementation would fetch from BSV network
    const mockOrdinals: Ordinal[] = [
      {
        txid: `${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        vout: 0,
        outpoint: 'mock-outpoint-1',
        origin: 'mock-origin-1',
        height: 800000 + Math.floor(Math.random() * 10000),
        idx: 1,
        data: { type: 'image', name: 'Sample NFT #1' },
        mediaType: 'image/png',
        content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      },
      {
        txid: `${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        vout: 0,
        outpoint: 'mock-outpoint-2',
        origin: 'mock-origin-2',
        height: 800000 + Math.floor(Math.random() * 10000),
        idx: 2,
        data: { type: 'text', message: 'Hello 1Sat Ordinals!' },
        mediaType: 'text/plain',
        content: 'Hello 1Sat Ordinals!'
      }
    ]

    const limit = request?.limit || 10
    const offset = request?.offset || 0
    const filter = request?.filter || 'all'

    let filtered = mockOrdinals
    if (filter !== 'all') {
      filtered = mockOrdinals.filter(ordinal => {
        switch (filter) {
          case 'images': return ordinal.mediaType?.startsWith('image/')
          case 'text': return ordinal.mediaType?.startsWith('text/')
          case 'json': return ordinal.mediaType === 'application/json'
          default: return true
        }
      })
    }

    return filtered.slice(offset, offset + limit)
  }

  async transferOrdinal(ordinal: string, to: string): Promise<string> {
    // Mock ordinal transfer
    const txid = `${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    console.log(`Mock transfer ordinal ${ordinal} to ${to}, txid: ${txid}`)
    return txid
  }

  async inscribe(request: InscriptionRequest): Promise<string> {
    // Mock inscription creation
    const txid = `${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    console.log(`Mock inscription created:`, request, `txid: ${txid}`)
    return txid
  }
}

// Global wallet instance
export const brc100Wallet = new MockBRC100Wallet()

// Initialize identity from localStorage on load
if (typeof window !== 'undefined') {
  const savedIdentity = localStorage.getItem('brc100-identity')
  if (savedIdentity) {
    try {
      const identity = JSON.parse(savedIdentity)
      brc100Wallet['identity'] = identity
    } catch (error) {
      console.error('Failed to load BRC100 identity:', error)
    }
  }
}
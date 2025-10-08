/**
 * Yours Wallet Integration for Bitcoin OS
 * Provides interface to Yours Wallet browser extension
 */

export interface YoursWalletConnection {
  isReady: boolean
  isConnected: boolean
  address?: string
  publicKey?: string
  balance?: number
}

export interface YoursOrdinal {
  txid: string
  vout: number
  outpoint: string
  origin: string
  height: number
  idx: number
  lock: string
  spend: string
  data: any
}

export interface YoursPayment {
  to: string
  amount: number
  currency?: 'BSV' | 'USD'
}

export interface YoursSignMessageRequest {
  message: string
  encoding?: 'utf8' | 'hex' | 'base64'
}

export interface YoursSignMessageResponse {
  address: string
  pubkey: string
  sig: string
  message: string
  algorithm: string
}

export class YoursWalletAPI {
  private wallet: any = null

  constructor() {
    this.initializeWallet()
  }

  private async initializeWallet() {
    if (typeof window !== 'undefined') {
      // Wait for Yours Wallet to be available
      const checkWallet = () => {
        if ((window as any).yours) {
          this.wallet = (window as any).yours
          return true
        }
        return false
      }

      if (!checkWallet()) {
        // Wait up to 5 seconds for wallet to load
        for (let i = 0; i < 50; i++) {
          await new Promise(resolve => setTimeout(resolve, 100))
          if (checkWallet()) break
        }
      }
    }
  }

  async isAvailable(): Promise<boolean> {
    await this.initializeWallet()
    return !!this.wallet
  }

  async connect(): Promise<YoursWalletConnection> {
    if (!this.wallet) {
      throw new Error('Yours Wallet not available. Please install the Yours Wallet browser extension.')
    }

    try {
      const response = await this.wallet.connect()
      
      return {
        isReady: true,
        isConnected: response.connected || true,
        address: response.address,
        publicKey: response.pubkey || response.publicKey,
        balance: response.balance
      }
    } catch (error) {
      console.error('Yours Wallet connection failed:', error)
      throw new Error('Failed to connect to Yours Wallet')
    }
  }

  async disconnect(): Promise<void> {
    if (this.wallet && this.wallet.disconnect) {
      await this.wallet.disconnect()
    }
  }

  async getAddress(): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    const response = await this.wallet.getAddress()
    return response.address || response
  }

  async getBalance(): Promise<number> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    const response = await this.wallet.getBalance()
    return response.balance || response
  }

  async getPublicKey(): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    const response = await this.wallet.getPublicKey()
    return response.pubkey || response.publicKey || response
  }

  async signMessage(request: YoursSignMessageRequest): Promise<YoursSignMessageResponse> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    try {
      const response = await this.wallet.signMessage({
        message: request.message,
        encoding: request.encoding || 'utf8'
      })

      return {
        address: response.address,
        pubkey: response.pubkey || response.publicKey,
        sig: response.sig || response.signature,
        message: response.message || request.message,
        algorithm: response.algorithm || 'ecdsa'
      }
    } catch (error) {
      console.error('Message signing failed:', error)
      throw new Error('Failed to sign message with Yours Wallet')
    }
  }

  async send(payment: YoursPayment): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    try {
      const response = await this.wallet.send({
        to: payment.to,
        amount: payment.amount,
        currency: payment.currency || 'BSV'
      })

      return response.txid || response.txId || response
    } catch (error) {
      console.error('Payment failed:', error)
      throw new Error('Failed to send payment via Yours Wallet')
    }
  }

  async getOrdinals(): Promise<YoursOrdinal[]> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    try {
      const response = await this.wallet.getOrdinals()
      return Array.isArray(response) ? response : response.ordinals || []
    } catch (error) {
      console.error('Failed to get ordinals:', error)
      return []
    }
  }

  async transferOrdinal(ordinal: string, to: string): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    try {
      const response = await this.wallet.transferOrdinal({
        ordinal,
        to
      })

      return response.txid || response.txId || response
    } catch (error) {
      console.error('Ordinal transfer failed:', error)
      throw new Error('Failed to transfer ordinal via Yours Wallet')
    }
  }

  async inscribe(data: any, mediaType?: string): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not connected')
    }

    try {
      const response = await this.wallet.inscribe({
        data,
        mediaType: mediaType || 'text/plain'
      })

      return response.txid || response.txId || response
    } catch (error) {
      console.error('Inscription failed:', error)
      throw new Error('Failed to inscribe data via Yours Wallet')
    }
  }

  // Helper method to check if Yours Wallet extension is installed
  static isInstalled(): boolean {
    return typeof window !== 'undefined' && !!(window as any).yours
  }

  // Helper method to get installation URL
  static getInstallUrl(): string {
    return 'https://chromewebstore.google.com/detail/yours-wallet/mlbnicldlpdimbjdcncnklfempedeipj'
  }
}

// Global instance
export const yoursWallet = new YoursWalletAPI()

// Helper functions for easy integration
export async function connectYoursWallet(): Promise<YoursWalletConnection> {
  return await yoursWallet.connect()
}

export async function isYoursWalletAvailable(): Promise<boolean> {
  return await yoursWallet.isAvailable()
}
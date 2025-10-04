/**
 * Metanet Desktop Integration Client
 * Provides connection to metanet-desktop wallet via JSON-API over TCP/3321
 * 
 * Based on metanet-desktop by BSV Blockchain Association
 * Repository: https://github.com/bsv-blockchain/metanet-desktop
 * License: Open BSV License
 */

export interface MetanetWallet {
  isConnected: boolean
  address?: string
  balance?: number
  network: 'mainnet' | 'testnet'
}

export interface MetanetApp {
  id: string
  name: string
  permissions: string[]
  authenticated: boolean
}

export interface MetanetTransaction {
  txid: string
  amount: number
  fee: number
  recipients: Array<{
    address: string
    amount: number
  }>
}

export class MetanetDesktopClient {
  private static instance: MetanetDesktopClient
  private isConnected = false
  private listeners: Map<string, ((data: any) => void)[]> = new Map()
  
  // Metanet Desktop runs on localhost:3321 by default (JSON-API over HTTP)
  private readonly METANET_API_URL = 'http://localhost:3321'
  
  private constructor() {}
  
  static getInstance(): MetanetDesktopClient {
    if (!MetanetDesktopClient.instance) {
      MetanetDesktopClient.instance = new MetanetDesktopClient()
    }
    return MetanetDesktopClient.instance
  }
  
  /**
   * Connect to metanet-desktop wallet
   */
  async connect(): Promise<boolean> {
    try {
      // Test connection by making a health check request
      const response = await fetch(`${this.METANET_API_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      if (response.ok) {
        this.isConnected = true
        this.emit('connected', { connected: true })
        return true
      } else {
        this.isConnected = false
        return false
      }
    } catch (error) {
      console.error('Failed to connect to metanet-desktop:', error)
      this.isConnected = false
      return false
    }
  }
  
  /**
   * Disconnect from metanet-desktop
   */
  disconnect(): void {
    this.isConnected = false
    this.emit('disconnected', { connected: false })
  }
  
  /**
   * Check if connected to metanet-desktop
   */
  getConnectionStatus(): boolean {
    return this.isConnected
  }
  
  /**
   * Send HTTP request to metanet-desktop
   */
  private async apiRequest(endpoint: string, data?: any): Promise<any> {
    if (!this.isConnected) {
      throw new Error('Not connected to metanet-desktop')
    }
    
    try {
      const response = await fetch(`${this.METANET_API_URL}${endpoint}`, {
        method: data ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(30000) // 30 second timeout
      })
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Metanet API request failed:', error)
      throw error
    }
  }
  
  /**
   * Get wallet information
   */
  async getWallet(): Promise<MetanetWallet | null> {
    try {
      const response = await this.apiRequest('/wallet')
      return {
        isConnected: true,
        address: response.address,
        balance: response.balance,
        network: response.network || 'mainnet'
      }
    } catch (error) {
      console.error('Failed to get wallet info:', error)
      return null
    }
  }
  
  /**
   * Authenticate app with metanet-desktop
   */
  async authenticate(appId: string, appName: string, permissions: string[]): Promise<boolean> {
    try {
      const response = await this.apiRequest('/auth', {
        appId,
        appName,
        permissions
      })
      return response.success === true
    } catch (error) {
      console.error('Authentication failed:', error)
      return false
    }
  }
  
  /**
   * Send BSV transaction
   */
  async sendTransaction(
    recipients: Array<{ address: string; amount: number }>,
    fee?: number
  ): Promise<MetanetTransaction | null> {
    try {
      const response = await this.apiRequest('/transaction', {
        recipients,
        fee
      })
      
      if (response.success) {
        return {
          txid: response.txid,
          amount: response.amount,
          fee: response.fee,
          recipients: recipients
        }
      }
      return null
    } catch (error) {
      console.error('Transaction failed:', error)
      return null
    }
  }
  
  /**
   * Sign message with wallet
   */
  async signMessage(message: string): Promise<string | null> {
    try {
      const response = await this.apiRequest('/sign', {
        message
      })
      return response.success ? response.signature : null
    } catch (error) {
      console.error('Message signing failed:', error)
      return null
    }
  }
  
  /**
   * Event listener system
   */
  on(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }
  
  off(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(callback)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }
  
  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data))
    }
  }
}

import { MetanetFallbackClient } from './metanet-fallback'

// Adaptive client that uses fallback when metanet-desktop is unavailable
class AdaptiveMetanetClient {
  private realClient = MetanetDesktopClient.getInstance()
  private fallbackClient = new MetanetFallbackClient()
  private usingFallback = false

  async connect(): Promise<boolean> {
    // Try real client first
    try {
      const connected = await this.realClient.connect()
      if (connected) {
        this.usingFallback = false
        return true
      }
    } catch (error) {
      console.log('Metanet Desktop not available, using demo mode')
    }

    // Fall back to mock client
    this.usingFallback = true
    return await this.fallbackClient.connect()
  }

  disconnect(): void {
    if (this.usingFallback) {
      this.fallbackClient.disconnect()
    } else {
      this.realClient.disconnect()
    }
  }

  getConnectionStatus(): boolean {
    return this.usingFallback 
      ? this.fallbackClient.getConnectionStatus()
      : this.realClient.getConnectionStatus()
  }

  async getWallet(): Promise<MetanetWallet | null> {
    return this.usingFallback
      ? await this.fallbackClient.getWallet()
      : await this.realClient.getWallet()
  }

  async authenticate(appId: string, appName: string, permissions: string[]): Promise<boolean> {
    return this.usingFallback
      ? await this.fallbackClient.authenticate(appId, appName, permissions)
      : await this.realClient.authenticate(appId, appName, permissions)
  }

  async sendTransaction(
    recipients: Array<{ address: string; amount: number }>,
    fee?: number
  ): Promise<MetanetTransaction | null> {
    return this.usingFallback
      ? await this.fallbackClient.sendTransaction(recipients, fee)
      : await this.realClient.sendTransaction(recipients, fee)
  }

  async signMessage(message: string): Promise<string | null> {
    return this.usingFallback
      ? await this.fallbackClient.signMessage(message)
      : await this.realClient.signMessage(message)
  }

  on(event: string, callback: (data: any) => void): void {
    this.realClient.on(event, callback)
    this.fallbackClient.on(event, callback)
  }

  off(event: string, callback: (data: any) => void): void {
    this.realClient.off(event, callback)
    this.fallbackClient.off(event, callback)
  }

  isUsingFallback(): boolean {
    return this.usingFallback
  }
}

// Export singleton instance
export const metanetClient = new AdaptiveMetanetClient()

// Helper function to check if metanet-desktop is available
export async function isMetanetDesktopAvailable(): Promise<boolean> {
  try {
    const connected = await metanetClient.connect()
    return connected && !metanetClient.isUsingFallback()
  } catch {
    return false
  }
}
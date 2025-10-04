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
  private socket: WebSocket | null = null
  private isConnected = false
  private listeners: Map<string, ((data: any) => void)[]> = new Map()
  
  // Metanet Desktop runs on localhost:3321 by default
  private readonly METANET_WS_URL = 'ws://localhost:3321'
  
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
    return new Promise((resolve) => {
      try {
        this.socket = new WebSocket(this.METANET_WS_URL)
        
        this.socket.onopen = () => {
          this.isConnected = true
          this.emit('connected', { connected: true })
          resolve(true)
        }
        
        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.emit('message', data)
            
            // Handle specific message types
            if (data.type) {
              this.emit(data.type, data)
            }
          } catch (error) {
            console.error('Failed to parse metanet message:', error)
          }
        }
        
        this.socket.onclose = () => {
          this.isConnected = false
          this.emit('disconnected', { connected: false })
        }
        
        this.socket.onerror = (error) => {
          console.error('Metanet connection error:', error)
          this.isConnected = false
          resolve(false)
        }
        
        // Timeout after 5 seconds
        setTimeout(() => {
          if (!this.isConnected) {
            resolve(false)
          }
        }, 5000)
        
      } catch (error) {
        console.error('Failed to connect to metanet-desktop:', error)
        resolve(false)
      }
    })
  }
  
  /**
   * Disconnect from metanet-desktop
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
    this.isConnected = false
  }
  
  /**
   * Check if connected to metanet-desktop
   */
  getConnectionStatus(): boolean {
    return this.isConnected
  }
  
  /**
   * Send message to metanet-desktop
   */
  private send(message: any): void {
    if (this.socket && this.isConnected) {
      this.socket.send(JSON.stringify(message))
    }
  }
  
  /**
   * Get wallet information
   */
  async getWallet(): Promise<MetanetWallet | null> {
    return new Promise((resolve) => {
      if (!this.isConnected) {
        resolve(null)
        return
      }
      
      const requestId = Date.now().toString()
      
      const timeout = setTimeout(() => {
        this.off('wallet-response', handler)
        resolve(null)
      }, 5000)
      
      const handler = (data: any) => {
        if (data.requestId === requestId) {
          clearTimeout(timeout)
          this.off('wallet-response', handler)
          resolve(data.wallet)
        }
      }
      
      this.on('wallet-response', handler)
      this.send({
        type: 'get-wallet',
        requestId
      })
    })
  }
  
  /**
   * Authenticate app with metanet-desktop
   */
  async authenticate(appId: string, appName: string, permissions: string[]): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isConnected) {
        resolve(false)
        return
      }
      
      const requestId = Date.now().toString()
      
      const timeout = setTimeout(() => {
        this.off('auth-response', handler)
        resolve(false)
      }, 30000) // 30 second timeout for user interaction
      
      const handler = (data: any) => {
        if (data.requestId === requestId) {
          clearTimeout(timeout)
          this.off('auth-response', handler)
          resolve(data.success === true)
        }
      }
      
      this.on('auth-response', handler)
      this.send({
        type: 'authenticate',
        requestId,
        appId,
        appName,
        permissions
      })
    })
  }
  
  /**
   * Send BSV transaction
   */
  async sendTransaction(
    recipients: Array<{ address: string; amount: number }>,
    fee?: number
  ): Promise<MetanetTransaction | null> {
    return new Promise((resolve) => {
      if (!this.isConnected) {
        resolve(null)
        return
      }
      
      const requestId = Date.now().toString()
      
      const timeout = setTimeout(() => {
        this.off('transaction-response', handler)
        resolve(null)
      }, 60000) // 60 second timeout
      
      const handler = (data: any) => {
        if (data.requestId === requestId) {
          clearTimeout(timeout)
          this.off('transaction-response', handler)
          resolve(data.success ? data.transaction : null)
        }
      }
      
      this.on('transaction-response', handler)
      this.send({
        type: 'send-transaction',
        requestId,
        recipients,
        fee
      })
    })
  }
  
  /**
   * Sign message with wallet
   */
  async signMessage(message: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (!this.isConnected) {
        resolve(null)
        return
      }
      
      const requestId = Date.now().toString()
      
      const timeout = setTimeout(() => {
        this.off('sign-response', handler)
        resolve(null)
      }, 30000)
      
      const handler = (data: any) => {
        if (data.requestId === requestId) {
          clearTimeout(timeout)
          this.off('sign-response', handler)
          resolve(data.success ? data.signature : null)
        }
      }
      
      this.on('sign-response', handler)
      this.send({
        type: 'sign-message',
        requestId,
        message
      })
    })
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

// Export singleton instance
export const metanetClient = MetanetDesktopClient.getInstance()

// Helper function to check if metanet-desktop is available
export async function isMetanetDesktopAvailable(): Promise<boolean> {
  try {
    return await metanetClient.connect()
  } catch {
    return false
  }
}
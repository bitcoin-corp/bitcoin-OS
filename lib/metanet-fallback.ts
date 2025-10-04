/**
 * Metanet Fallback Client
 * Provides mock functionality when metanet-desktop is not available
 * Shows integration capabilities without requiring actual wallet
 */

import { MetanetWallet, MetanetTransaction } from './metanet-client'

export class MetanetFallbackClient {
  private isConnected = false
  private mockWallet: MetanetWallet = {
    isConnected: false,
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Genesis block address
    balance: 0.00123456,
    network: 'testnet'
  }

  async connect(): Promise<boolean> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.isConnected = true
    this.mockWallet.isConnected = true
    return true
  }

  disconnect(): void {
    this.isConnected = false
    this.mockWallet.isConnected = false
  }

  getConnectionStatus(): boolean {
    return this.isConnected
  }

  async getWallet(): Promise<MetanetWallet | null> {
    if (!this.isConnected) return null
    return { ...this.mockWallet }
  }

  async authenticate(appId: string, appName: string, permissions: string[]): Promise<boolean> {
    if (!this.isConnected) return false
    // Simulate user approval delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    return true
  }

  async sendTransaction(
    recipients: Array<{ address: string; amount: number }>,
    fee?: number
  ): Promise<MetanetTransaction | null> {
    if (!this.isConnected) return null
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const totalAmount = recipients.reduce((sum, r) => sum + r.amount, 0)
    const transactionFee = fee || 0.00001
    
    // Simulate transaction
    const transaction: MetanetTransaction = {
      txid: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      amount: totalAmount,
      fee: transactionFee,
      recipients
    }
    
    // Update mock balance
    this.mockWallet.balance -= (totalAmount + transactionFee)
    
    return transaction
  }

  async signMessage(message: string): Promise<string | null> {
    if (!this.isConnected) return null
    
    // Simulate signing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Return mock signature
    return 'H1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12'
  }

  // Event system (simplified)
  on(event: string, callback: (data: any) => void): void {
    // Mock implementation
  }

  off(event: string, callback: (data: any) => void): void {
    // Mock implementation
  }

  private emit(event: string, data: any): void {
    // Mock implementation
  }
}
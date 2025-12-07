/**
 * BRC-100 Wallet Module
 * Export the complete wallet implementation
 */

export * from './types'
export * from './interface'
export { BRC100Wallet } from './wallet-implementation'
export { BKDS } from './bkds'

// Create singleton instance for the app
import { BRC100Wallet } from './wallet-implementation'

let walletInstance: BRC100Wallet | null = null

export function getBRC100Wallet(): BRC100Wallet {
  if (!walletInstance) {
    walletInstance = new BRC100Wallet()
  }
  return walletInstance
}

// Export a function to initialize with a specific private key
export function initializeBRC100Wallet(masterPrivateKey?: Uint8Array): BRC100Wallet {
  walletInstance = new BRC100Wallet(masterPrivateKey)
  return walletInstance
}
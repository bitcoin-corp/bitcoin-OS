/**
 * KVStore Service
 * Unified storage service using Babbage KVStore with BRC-100 integration
 */

import { getBRC100Wallet } from '../wallet/brc100'

interface KVStoreConfig {
  appName: string
  encryptData?: boolean
}

export class KVStoreService {
  private wallet = getBRC100Wallet()
  private appName: string
  private encryptData: boolean
  
  // Fallback to localStorage for development
  private useLocalStorage = typeof window !== 'undefined' && !window.babbage
  
  constructor(config: KVStoreConfig) {
    this.appName = config.appName
    this.encryptData = config.encryptData ?? true
  }
  
  /**
   * Save data to KVStore or localStorage
   */
  async save(key: string, data: any): Promise<void> {
    const fullKey = `${this.appName}:${key}`
    const serialized = JSON.stringify(data)
    
    if (this.useLocalStorage) {
      // Development fallback
      localStorage.setItem(fullKey, serialized)
      return
    }
    
    try {
      // Encrypt if enabled
      let dataToStore = serialized
      if (this.encryptData) {
        const encrypted = await this.wallet.encrypt({
          plaintext: Array.from(new TextEncoder().encode(serialized)),
          protocolID: [0, `${this.appName} storage`],
          keyID: key,
          counterparty: 'self'
        }, this.appName)
        
        if ('ciphertext' in encrypted) {
          dataToStore = Buffer.from(encrypted.ciphertext).toString('base64')
        }
      }
      
      // Store using Babbage KVStore when available
      if (window.babbage?.kvstore) {
        await window.babbage.kvstore.set(fullKey, dataToStore)
      } else {
        // Fallback to wallet basket storage
        await this.wallet.internalizeAction({
          tx: [], // Simplified - would create actual transaction
          outputs: [{
            outputIndex: 0,
            protocol: 'basket insertion' as const,
            insertionRemittance: {
              basket: `${this.appName} storage`,
              customInstructions: dataToStore,
              tags: [key]
            }
          }],
          description: `Save ${key}`,
          labels: ['kvstore', this.appName]
        }, this.appName)
      }
    } catch (error) {
      console.error('KVStore save failed:', error)
      // Fallback to localStorage
      localStorage.setItem(fullKey, serialized)
    }
  }
  
  /**
   * Load data from KVStore or localStorage
   */
  async load(key: string): Promise<any> {
    const fullKey = `${this.appName}:${key}`
    
    if (this.useLocalStorage) {
      const data = localStorage.getItem(fullKey)
      return data ? JSON.parse(data) : null
    }
    
    try {
      let storedData: string | null = null
      
      // Load from Babbage KVStore when available
      if (window.babbage?.kvstore) {
        storedData = await window.babbage.kvstore.get(fullKey)
      } else {
        // Fallback to wallet basket storage
        const outputs = await this.wallet.listOutputs({
          basket: `${this.appName} storage`,
          tags: [key],
          includeCustomInstructions: true
        }, this.appName)
        
        if ('outputs' in outputs && outputs.outputs.length > 0) {
          storedData = outputs.outputs[0].customInstructions || null
        }
      }
      
      if (!storedData) return null
      
      // Decrypt if needed
      if (this.encryptData) {
        try {
          const decrypted = await this.wallet.decrypt({
            ciphertext: Array.from(Buffer.from(storedData, 'base64')),
            protocolID: [0, `${this.appName} storage`],
            keyID: key,
            counterparty: 'self'
          }, this.appName)
          
          if ('plaintext' in decrypted) {
            storedData = new TextDecoder().decode(new Uint8Array(decrypted.plaintext))
          }
        } catch {
          // Data might not be encrypted
        }
      }
      
      return JSON.parse(storedData)
    } catch (error) {
      console.error('KVStore load failed:', error)
      // Fallback to localStorage
      const data = localStorage.getItem(fullKey)
      return data ? JSON.parse(data) : null
    }
  }
  
  /**
   * Delete data from KVStore or localStorage
   */
  async delete(key: string): Promise<void> {
    const fullKey = `${this.appName}:${key}`
    
    if (this.useLocalStorage) {
      localStorage.removeItem(fullKey)
      return
    }
    
    try {
      if (window.babbage?.kvstore) {
        await window.babbage.kvstore.delete(fullKey)
      } else {
        // For basket storage, we'd relinquish the output
        const outputs = await this.wallet.listOutputs({
          basket: `${this.appName} storage`,
          tags: [key]
        }, this.appName)
        
        if ('outputs' in outputs && outputs.outputs.length > 0) {
          await this.wallet.relinquishOutput({
            basket: `${this.appName} storage`,
            output: outputs.outputs[0].outpoint
          }, this.appName)
        }
      }
    } catch (error) {
      console.error('KVStore delete failed:', error)
      localStorage.removeItem(fullKey)
    }
  }
  
  /**
   * List all keys for this app
   */
  async listKeys(): Promise<string[]> {
    if (this.useLocalStorage) {
      const keys: string[] = []
      const prefix = `${this.appName}:`
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(prefix)) {
          keys.push(key.substring(prefix.length))
        }
      }
      return keys
    }
    
    try {
      if (window.babbage?.kvstore) {
        // This would need Babbage KVStore to support listing
        return []
      } else {
        const outputs = await this.wallet.listOutputs({
          basket: `${this.appName} storage`,
          includeTags: true
        }, this.appName)
        
        if ('outputs' in outputs) {
          return outputs.outputs
            .map((o: any) => o.tags?.[0])
            .filter((tag: any): tag is string => !!tag)
        }
      }
      return []
    } catch (error) {
      console.error('KVStore list failed:', error)
      return []
    }
  }
}

// Extend window interface for Babbage
declare global {
  interface Window {
    babbage?: {
      kvstore?: {
        set: (key: string, value: string) => Promise<void>
        get: (key: string) => Promise<string | null>
        delete: (key: string) => Promise<void>
      }
    }
  }
}

// Factory function for creating app-specific storage
export function createAppStorage(appName: string): KVStoreService {
  return new KVStoreService({ appName })
}
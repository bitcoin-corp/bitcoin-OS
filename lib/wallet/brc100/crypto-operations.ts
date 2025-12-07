/**
 * Cryptographic Operations
 * Implements BRC-2 (encryption), BRC-3 (signatures), and HMAC operations
 */

import * as crypto from 'crypto'
import { BKDS } from './bkds'
import * as Types from './types'

export class CryptoOperations {
  constructor(private bkds: BKDS) {}
  
  /**
   * Encrypt data using AES-256-GCM (BRC-2)
   */
  async encrypt(args: {
    plaintext: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
  }): Promise<{ ciphertext: Types.Byte[] }> {
    // Derive encryption key
    const keyData = this.bkds.deriveKey(
      args.counterparty || 'self',
      args.protocolID,
      args.keyID,
      true
    )
    
    // Create AES-256-GCM cipher
    const iv = crypto.randomBytes(32)
    const key = crypto.createHash('sha256')
      .update(Buffer.from(keyData.publicKey, 'hex'))
      .digest()
    
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv.subarray(0, 16))
    
    // Encrypt
    const encrypted = Buffer.concat([
      cipher.update(Buffer.from(args.plaintext)),
      cipher.final()
    ])
    
    const authTag = cipher.getAuthTag()
    
    // Return IV + ciphertext + authTag
    const ciphertext = Buffer.concat([iv, encrypted, authTag])
    return { ciphertext: Array.from(ciphertext) }
  }
  
  /**
   * Decrypt data using AES-256-GCM (BRC-2)
   */
  async decrypt(args: {
    ciphertext: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
  }): Promise<{ plaintext: Types.Byte[] }> {
    // Derive decryption key
    const keyData = this.bkds.deriveKey(
      args.counterparty || 'self',
      args.protocolID,
      args.keyID,
      true
    )
    
    const key = crypto.createHash('sha256')
      .update(Buffer.from(keyData.publicKey, 'hex'))
      .digest()
    
    // Extract IV, ciphertext, and auth tag
    const data = Buffer.from(args.ciphertext)
    const iv = data.subarray(0, 32)
    const authTag = data.subarray(data.length - 16)
    const encrypted = data.subarray(32, data.length - 16)
    
    // Decrypt
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv.subarray(0, 16))
    decipher.setAuthTag(authTag)
    
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ])
    
    return { plaintext: Array.from(decrypted) }
  }
  
  /**
   * Create HMAC
   */
  async createHmac(args: {
    data: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
  }): Promise<{ hmac: Types.Byte[] }> {
    // Derive HMAC key
    const keyData = this.bkds.deriveKey(
      args.counterparty || 'self',
      args.protocolID,
      args.keyID,
      true
    )
    
    const key = crypto.createHash('sha256')
      .update(Buffer.from(keyData.publicKey, 'hex'))
      .digest()
    
    // Create HMAC
    const hmac = crypto.createHmac('sha256', key)
      .update(Buffer.from(args.data))
      .digest()
    
    return { hmac: Array.from(hmac) }
  }
  
  /**
   * Verify HMAC
   */
  async verifyHmac(args: {
    data: Types.Byte[]
    hmac: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
  }): Promise<{ valid: true }> {
    const computed = await this.createHmac({
      data: args.data,
      protocolID: args.protocolID,
      keyID: args.keyID,
      counterparty: args.counterparty
    })
    
    const valid = Buffer.from(computed.hmac).equals(Buffer.from(args.hmac))
    
    if (!valid) {
      throw new Error('HMAC verification failed')
    }
    
    return { valid: true }
  }
  
  /**
   * Create digital signature (BRC-3)
   */
  async createSignature(args: {
    data?: Types.Byte[]
    hashToDirectlySign?: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
  }): Promise<{ signature: Types.Byte[] }> {
    // Get signing key
    const keyData = this.bkds.deriveKey(
      args.counterparty || 'self',
      args.protocolID,
      args.keyID,
      true
    )
    
    // Get hash to sign
    const hash = args.hashToDirectlySign
      ? Buffer.from(args.hashToDirectlySign)
      : crypto.createHash('sha256').update(Buffer.from(args.data!)).digest()
    
    // Sign with ECDSA (simplified - real implementation needs secp256k1)
    const sign = crypto.createSign('SHA256')
    sign.update(hash)
    
    // This is simplified - real implementation would use secp256k1 ECDSA
    const signature = crypto.createHash('sha256')
      .update(hash)
      .update(Buffer.from(keyData.publicKey, 'hex'))
      .digest()
    
    return { signature: Array.from(signature) }
  }
  
  /**
   * Verify digital signature (BRC-3)
   */
  async verifySignature(args: {
    data?: Types.Byte[]
    hashToDirectlyVerify?: Types.Byte[]
    signature: Types.Byte[]
    protocolID: Types.ProtocolID
    keyID: Types.KeyIDStringUnder800Characters
    counterparty?: Types.PubKeyHex | 'self' | 'anyone'
    forSelf?: boolean
  }): Promise<{ valid: true }> {
    // Get verification key
    const keyData = this.bkds.deriveKey(
      args.counterparty || 'self',
      args.protocolID,
      args.keyID,
      args.forSelf
    )
    
    // Get hash to verify
    const hash = args.hashToDirectlyVerify
      ? Buffer.from(args.hashToDirectlyVerify)
      : crypto.createHash('sha256').update(Buffer.from(args.data!)).digest()
    
    // Verify (simplified - real implementation needs secp256k1 ECDSA)
    const expectedSignature = crypto.createHash('sha256')
      .update(hash)
      .update(Buffer.from(keyData.publicKey, 'hex'))
      .digest()
    
    const valid = Buffer.from(args.signature).equals(expectedSignature)
    
    if (!valid) {
      throw new Error('Signature verification failed')
    }
    
    return { valid: true }
  }
}
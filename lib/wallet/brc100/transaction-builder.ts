/**
 * Transaction Builder
 * Creates and manages Bitcoin transactions with BEEF format support
 */

import * as Types from './types'
import * as crypto from 'crypto'

interface StoredTransaction {
  reference: string
  tx: Types.AtomicBEEF
  status: Types.ActionStatus
  description: string
  labels: string[]
  createdAt: string
}

export class TransactionBuilder {
  private transactions: Map<string, StoredTransaction> = new Map()
  private pendingTransactions: Map<string, any> = new Map()
  
  /**
   * Create a new transaction
   */
  async createTransaction(args: {
    inputs: Types.TransactionInput[]
    outputs: Types.TransactionOutput[]
    inputBEEF?: Types.BEEF
    lockTime: number
    version: number
    labels: string[]
    options: Types.CreateActionOptions
  }): Promise<any> {
    // Generate transaction structure
    const tx = this.buildTransactionStructure(args)
    
    // Check if all inputs have unlocking scripts
    const needsSigning = args.inputs.some(input => !input.unlockingScript)
    
    if (needsSigning || !args.options.signAndProcess) {
      // Return signable transaction
      const reference = this.generateReference()
      this.pendingTransactions.set(reference, tx)
      
      return {
        signableTransaction: {
          tx: this.serializeToBEEF(tx),
          reference
        }
      }
    }
    
    // Process immediately
    const txid = this.calculateTXID(tx)
    const beef = this.serializeToBEEF(tx)
    
    // Store transaction
    this.transactions.set(txid, {
      reference: this.generateReference(),
      tx: beef,
      status: args.options.noSend ? 'nosend' : 'sending',
      description: 'Transaction',
      labels: args.labels,
      createdAt: new Date().toISOString()
    })
    
    if (args.options.returnTXIDOnly) {
      return { txid }
    }
    
    return { txid, tx: beef }
  }
  
  /**
   * Sign a pending transaction
   */
  async signTransaction(
    reference: string,
    spends: Record<number, { unlockingScript: string; sequenceNumber?: number }>,
    options?: any
  ): Promise<any> {
    const pending = this.pendingTransactions.get(reference)
    if (!pending) {
      throw new Error('Transaction not found')
    }
    
    // Apply unlocking scripts
    for (const [index, spend] of Object.entries(spends)) {
      const inputIndex = parseInt(index)
      if (pending.inputs[inputIndex]) {
        pending.inputs[inputIndex].unlockingScript = spend.unlockingScript
        if (spend.sequenceNumber !== undefined) {
          pending.inputs[inputIndex].sequenceNumber = spend.sequenceNumber
        }
      }
    }
    
    // Calculate TXID and serialize
    const txid = this.calculateTXID(pending)
    const beef = this.serializeToBEEF(pending)
    
    // Store and clean up
    this.transactions.set(txid, {
      reference,
      tx: beef,
      status: options?.noSend ? 'nosend' : 'sending',
      description: 'Signed Transaction',
      labels: [],
      createdAt: new Date().toISOString()
    })
    
    this.pendingTransactions.delete(reference)
    
    if (options?.returnTXIDOnly) {
      return { txid }
    }
    
    return { txid, tx: beef }
  }
  
  /**
   * Abort a pending transaction
   */
  async abortTransaction(reference: string): Promise<void> {
    if (!this.pendingTransactions.has(reference)) {
      throw new Error('Transaction not found')
    }
    this.pendingTransactions.delete(reference)
  }
  
  /**
   * List stored transactions
   */
  async listTransactions(args: {
    labels: string[]
    labelQueryMode?: 'any' | 'all'
    limit?: number
    offset?: number
  }): Promise<any> {
    let filtered = Array.from(this.transactions.entries())
    
    // Filter by labels
    if (args.labels.length > 0) {
      filtered = filtered.filter(([txid, tx]) => {
        if (args.labelQueryMode === 'all') {
          return args.labels.every(label => tx.labels.includes(label))
        } else {
          return args.labels.some(label => tx.labels.includes(label))
        }
      })
    }
    
    // Pagination
    const offset = args.offset || 0
    const limit = args.limit || 10
    const paginated = filtered.slice(offset, offset + limit)
    
    return {
      totalActions: filtered.length,
      actions: paginated.map(([txid, tx]) => ({
        txid,
        satoshis: 0, // Would calculate from outputs
        status: tx.status,
        isOutgoing: true,
        description: tx.description,
        labels: tx.labels,
        version: 1,
        lockTime: 0
      }))
    }
  }
  
  private buildTransactionStructure(args: any): any {
    return {
      version: args.version,
      lockTime: args.lockTime,
      inputs: args.inputs.map((input: any) => ({
        outpoint: this.parseOutpoint(input.outpoint),
        unlockingScript: input.unlockingScript || '',
        sequenceNumber: input.sequenceNumber || 0xffffffff,
        inputDescription: input.inputDescription
      })),
      outputs: args.outputs.map((output: any) => ({
        satoshis: output.satoshis,
        lockingScript: output.lockingScript,
        outputDescription: output.outputDescription
      }))
    }
  }
  
  private parseOutpoint(outpoint: string): { txid: string; outputIndex: number } {
    const [txid, index] = outpoint.split('.')
    return { txid, outputIndex: parseInt(index) }
  }
  
  private calculateTXID(tx: any): string {
    // Simplified - real implementation would serialize and double-SHA256
    const data = JSON.stringify(tx)
    return crypto.createHash('sha256').update(data).digest('hex')
  }
  
  private serializeToBEEF(tx: any): Types.AtomicBEEF {
    // Simplified - real implementation would follow BRC-62/BRC-95
    const json = JSON.stringify(tx)
    return Array.from(Buffer.from(json, 'utf8'))
  }
  
  private generateReference(): string {
    return crypto.randomBytes(16).toString('base64')
  }
}
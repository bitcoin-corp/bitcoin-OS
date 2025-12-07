/**
 * Output Basket Manager
 * Implements BRC-46 output tracking and management
 */

import * as Types from './types'

interface StoredOutput {
  outpoint: Types.OutpointString
  satoshis: Types.SatoshiValue
  lockingScript: Types.HexString
  customInstructions?: string
  tags: Types.OutputTagStringUnder300Characters[]
  spendable: boolean
  addedAt: string
}

export class OutputBasketManager {
  private baskets: Map<string, StoredOutput[]> = new Map()
  
  /**
   * Add an output to a basket
   */
  async addOutput(
    basket: Types.BasketStringUnder300Characters,
    output: Omit<StoredOutput, 'spendable' | 'addedAt'>
  ): Promise<void> {
    this.validateBasketName(basket)
    
    if (!this.baskets.has(basket)) {
      this.baskets.set(basket, [])
    }
    
    const outputs = this.baskets.get(basket)!
    outputs.push({
      ...output,
      spendable: true,
      addedAt: new Date().toISOString()
    })
  }
  
  /**
   * Remove an output from a basket
   */
  async removeOutput(
    basket: Types.BasketStringUnder300Characters,
    outpoint: Types.OutpointString
  ): Promise<void> {
    const outputs = this.baskets.get(basket)
    if (!outputs) {
      throw new Error(`Basket ${basket} not found`)
    }
    
    const index = outputs.findIndex(o => o.outpoint === outpoint)
    if (index === -1) {
      throw new Error(`Output ${outpoint} not found in basket ${basket}`)
    }
    
    outputs.splice(index, 1)
  }
  
  /**
   * List outputs in a basket
   */
  async listOutputs(args: {
    basket: Types.BasketStringUnder300Characters
    tags?: Types.OutputTagStringUnder300Characters[]
    tagQueryMode?: 'all' | 'any'
    includeCustomInstructions?: boolean
    includeTags?: boolean
    limit?: number
    offset?: number
  }): Promise<{
    totalOutputs: number
    outputs: Array<{
      outpoint: Types.OutpointString
      satoshis: Types.SatoshiValue
      lockingScript?: Types.HexString
      spendable: true
      customInstructions?: string
      tags?: Types.OutputTagStringUnder300Characters[]
    }>
  }> {
    const outputs = this.baskets.get(args.basket) || []
    
    // Filter by tags if specified
    let filtered = outputs
    if (args.tags && args.tags.length > 0) {
      filtered = outputs.filter(output => {
        if (args.tagQueryMode === 'all') {
          return args.tags!.every(tag => output.tags.includes(tag))
        } else {
          return args.tags!.some(tag => output.tags.includes(tag))
        }
      })
    }
    
    // Apply pagination
    const offset = args.offset || 0
    const limit = args.limit || 10
    const paginated = filtered.slice(offset, offset + limit)
    
    // Format response
    return {
      totalOutputs: filtered.length,
      outputs: paginated.map(output => ({
        outpoint: output.outpoint,
        satoshis: output.satoshis,
        lockingScript: output.lockingScript,
        spendable: true as const,
        customInstructions: args.includeCustomInstructions ? output.customInstructions : undefined,
        tags: args.includeTags ? output.tags : undefined
      }))
    }
  }
  
  /**
   * Get outputs from basket for spending
   */
  async getSpendableOutputs(
    basket: Types.BasketStringUnder300Characters,
    amount: Types.SatoshiValue
  ): Promise<StoredOutput[]> {
    const outputs = this.baskets.get(basket) || []
    const spendable = outputs.filter(o => o.spendable)
    
    // Simple coin selection - just take enough outputs to cover amount
    const selected: StoredOutput[] = []
    let total = 0
    
    for (const output of spendable) {
      selected.push(output)
      total += output.satoshis
      if (total >= amount) break
    }
    
    if (total < amount) {
      throw new Error(`Insufficient funds in basket ${basket}`)
    }
    
    return selected
  }
  
  /**
   * Mark outputs as spent
   */
  async markAsSpent(outpoints: Types.OutpointString[]): Promise<void> {
    for (const [basket, outputs] of this.baskets) {
      for (const output of outputs) {
        if (outpoints.includes(output.outpoint)) {
          output.spendable = false
        }
      }
    }
  }
  
  /**
   * Validate basket name according to BRC-99
   */
  private validateBasketName(name: string): void {
    if (name.length < 5 || name.length > 300) {
      throw new Error('Basket name must be 5-300 characters')
    }
    
    if (!/^[a-z0-9 ]+$/.test(name)) {
      throw new Error('Basket name must only contain lowercase letters, numbers, and spaces')
    }
    
    if (name.endsWith(' basket')) {
      throw new Error('Basket name must not end with " basket"')
    }
    
    if (/  /.test(name)) {
      throw new Error('Basket name must not contain consecutive spaces')
    }
    
    if (name.startsWith('admin') || name === 'default' || name.startsWith('p ')) {
      throw new Error('Reserved basket name')
    }
  }
}
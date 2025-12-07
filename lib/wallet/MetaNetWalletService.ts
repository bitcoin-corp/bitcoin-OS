import { WalletClient, PushDrop, Utils, Hash, Transaction } from '@bsv/sdk'
import BitcoinOSStateManager from '../state/BitcoinOSStateManager'

export interface BRC100Token {
  id: string
  name: string
  symbol: string
  decimals: number
  supply: string
  owner: string
  appId: string
  tokenType: string
  metadata: Record<string, any>
  txid: string
  createdAt: string
}

export interface WalletData {
  mnemonic: string
  privateKey: string
  publicKey: string
  address: string
  balance: number
  isConnected: boolean
}

export interface AppTokenConfig {
  appId: string
  tokenTypes: string[]
  defaultSymbol: string
  tokenPrefix: string
}

class MetaNetWalletService {
  private static instance: MetaNetWalletService
  private client: WalletClient | null = null
  private pushdrop: PushDrop | null = null
  private stateManager: BitcoinOSStateManager
  private walletData: WalletData | null = null
  private tokens: Map<string, BRC100Token[]> = new Map()
  
  private constructor() {
    this.stateManager = BitcoinOSStateManager.getInstance()
    this.initializeEventListeners()
  }

  static getInstance(): MetaNetWalletService {
    if (!MetaNetWalletService.instance) {
      MetaNetWalletService.instance = new MetaNetWalletService()
    }
    return MetaNetWalletService.instance
  }

  private initializeEventListeners() {
    if (typeof window === 'undefined') return
    
    window.addEventListener('metanet-disconnect', () => {
      this.disconnect()
    })
    
    window.addEventListener('beforeunload', () => {
      if (this.walletData?.isConnected) {
        this.stateManager.setState('wallet-last-connected', Date.now())
      }
    })
  }

  async connect(config?: { host?: string; port?: number }): Promise<WalletData> {
    try {
      const host = config?.host || 'localhost'
      const port = config?.port || 3321
      const baseUrl = `http://${host}:${port}`
      
      // Test connection with direct API call
      const testResponse = await fetch(`${baseUrl}/getPublicKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2050'
        },
        body: JSON.stringify({ identityKey: true })
      })
      
      if (!testResponse.ok) {
        throw new Error('Failed to connect to MetaNet Desktop')
      }
      
      const testData = await testResponse.json()
      if (!testData.publicKey) {
        throw new Error('Invalid response from MetaNet Desktop')
      }
      
      // Initialize clients for BSV SDK operations
      this.client = new WalletClient('auto', host, port)
      this.pushdrop = new PushDrop(this.client)
      
      // Get keys using the working API
      const identityKey = testData.publicKey
      const addressResponse = await fetch(`${baseUrl}/getPublicKey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2050'
        },
        body: JSON.stringify({ 
          identityKey: false, 
          protocolID: 'bitcoin-os',
          keyID: 'address-0' 
        })
      })
      
      let addressKey = identityKey // fallback to identity key
      if (addressResponse.ok) {
        const addressData = await addressResponse.json()
        if (addressData.publicKey) {
          addressKey = addressData.publicKey
        }
      }
      
      const balance = await this.getBalance()
      
      this.walletData = {
        mnemonic: '',
        privateKey: '',
        publicKey: identityKey,
        address: addressKey,
        balance,
        isConnected: true
      }
      
      // Store connection state globally
      this.stateManager.setState('wallet-connected', true)
      this.stateManager.setState('wallet-address', addressKey)
      this.stateManager.setState('wallet-public-key', identityKey)
      this.stateManager.setState('wallet-balance', balance)
      this.stateManager.setState('wallet-connected-at', Date.now())
      
      // Dispatch global wallet connection event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('walletConnected', {
          detail: this.walletData
        }))
      }
      
      // Load existing tokens for this wallet
      await this.loadUserTokens()
      
      console.log('✅ MetaNet Wallet connected to Bitcoin-OS')
      
      return this.walletData
      
    } catch (error) {
      console.error('❌ MetaNet Wallet connection failed:', error)
      throw new Error('MetaNet Desktop connection failed. Please ensure it is running.')
    }
  }

  async disconnect(): Promise<void> {
    this.client = null
    this.pushdrop = null
    this.walletData = null
    this.tokens.clear()
    
    // Clear connection state
    this.stateManager.setState('wallet-connected', false)
    this.stateManager.setState('wallet-address', null)
    this.stateManager.setState('wallet-public-key', null)
    this.stateManager.setState('wallet-balance', 0)
    
    // Dispatch global disconnection event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('walletDisconnected'))
    }
    
    console.log('🔌 MetaNet Wallet disconnected from Bitcoin-OS')
  }

  async getBalance(): Promise<number> {
    if (!this.client) throw new Error('Wallet not connected')
    
    try {
      const balance = await this.client.getBalance()
      const totalBalance = balance.confirmed + balance.unconfirmed
      
      // Update global balance state
      this.stateManager.setState('wallet-balance', totalBalance)
      
      return totalBalance
    } catch (error) {
      console.error('Error fetching balance:', error)
      
      // Fallback: try to get balance from actions list
      try {
        const response = await fetch('http://localhost:3321/listActions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2050'
          },
          body: JSON.stringify({})
        })
        
        if (response.ok) {
          const data = await response.json()
          // Calculate balance from transaction history
          let calculatedBalance = 0
          data.actions?.forEach((action: any) => {
            if (action.satoshis) {
              calculatedBalance += action.satoshis
            }
          })
          
          this.stateManager.setState('wallet-balance', calculatedBalance)
          return calculatedBalance
        }
      } catch (fallbackError) {
        console.error('Fallback balance retrieval failed:', fallbackError)
      }
      
      return 0
    }
  }

  async createBRC100Token(
    appConfig: AppTokenConfig,
    tokenData: {
      name: string
      symbol?: string
      tokenType: string
      metadata: Record<string, any>
      supply?: string
      decimals?: number
    }
  ): Promise<BRC100Token> {
    if (!this.client || !this.pushdrop || !this.walletData) {
      throw new Error('Wallet not connected')
    }

    const tokenId = Utils.toHex(
      Hash.sha256(Utils.toArray(
        JSON.stringify({
          appId: appConfig.appId,
          name: tokenData.name,
          owner: this.walletData.address,
          timestamp: Date.now()
        }),
        'utf8'
      ))
    )

    const brc100Metadata = {
      protocol: 'BRC100',
      operation: 'mint',
      tokenId,
      tokenType: tokenData.tokenType,
      name: tokenData.name,
      symbol: tokenData.symbol || appConfig.defaultSymbol,
      decimals: tokenData.decimals || 0,
      supply: tokenData.supply || '1',
      appId: appConfig.appId,
      metadata: {
        ...tokenData.metadata,
        appId: appConfig.appId,
        tokenPrefix: appConfig.tokenPrefix,
        createdAt: new Date().toISOString(),
        creator: this.walletData.address
      }
    }

    const lockingScript = await this.pushdrop.lock(
      [
        Utils.toArray('BRC100', 'utf8'),
        Utils.toArray(appConfig.appId, 'utf8'),
        Utils.toArray(JSON.stringify(brc100Metadata), 'utf8')
      ],
      ['BRC100', appConfig.appId, tokenData.tokenType],
      '1',
      'owner',
      true
    )

    const { tx } = await this.client.createAction({
      outputs: [
        {
          lockingScript: lockingScript.toHex(),
          satoshis: 1,
          outputDescription: `${appConfig.appId} - ${tokenData.tokenType}`,
          basket: `${appConfig.appId}-tokens`
        }
      ],
      description: `Mint ${tokenData.tokenType} token for ${appConfig.appId}`,
      options: {
        acceptDelayedBroadcast: false,
        randomizeOutputs: false
      }
    })

    if (!tx) throw new Error('Failed to create BRC100 token transaction')

    const transaction = Transaction.fromAtomicBEEF(tx)
    const txid = transaction.id('hex')

    const token: BRC100Token = {
      id: tokenId,
      name: brc100Metadata.name,
      symbol: brc100Metadata.symbol,
      decimals: brc100Metadata.decimals,
      supply: brc100Metadata.supply,
      owner: this.walletData.address,
      appId: appConfig.appId,
      tokenType: tokenData.tokenType,
      metadata: brc100Metadata.metadata,
      txid,
      createdAt: brc100Metadata.metadata.createdAt
    }

    // Store token locally
    this.addTokenToCache(appConfig.appId, token)
    
    // Dispatch token creation event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tokenCreated', {
        detail: { appId: appConfig.appId, token }
      }))
    }

    return token
  }

  async getTokensForApp(appId: string): Promise<BRC100Token[]> {
    if (!this.tokens.has(appId)) {
      await this.loadTokensForApp(appId)
    }
    return this.tokens.get(appId) || []
  }

  async getAllTokens(): Promise<Map<string, BRC100Token[]>> {
    await this.loadUserTokens()
    return new Map(this.tokens)
  }

  private async loadTokensForApp(appId: string): Promise<void> {
    if (!this.client) return

    try {
      const actions = await this.client.listActions({
        labels: ['BRC100', appId],
        includeMetadata: true
      })

      const appTokens = actions
        .filter((action: any) => 
          action.metadata?.protocol === 'BRC100' &&
          action.metadata?.appId === appId
        )
        .map((action: any) => ({
          id: action.metadata.tokenId,
          name: action.metadata.name,
          symbol: action.metadata.symbol,
          decimals: action.metadata.decimals,
          supply: action.metadata.supply,
          owner: action.metadata.metadata.creator,
          appId: action.metadata.appId,
          tokenType: action.metadata.tokenType,
          metadata: action.metadata.metadata,
          txid: action.txid,
          createdAt: action.metadata.metadata.createdAt
        }))

      this.tokens.set(appId, appTokens)
      
    } catch (error) {
      console.error(`Error loading tokens for ${appId}:`, error)
      this.tokens.set(appId, [])
    }
  }

  private async loadUserTokens(): Promise<void> {
    if (!this.client) return

    try {
      const actions = await this.client.listActions({
        labels: ['BRC100'],
        includeMetadata: true
      })

      const tokensByApp = new Map<string, BRC100Token[]>()

      actions
        .filter((action: any) => action.metadata?.protocol === 'BRC100')
        .forEach((action: any) => {
          const appId = action.metadata.appId
          if (!tokensByApp.has(appId)) {
            tokensByApp.set(appId, [])
          }

          const token: BRC100Token = {
            id: action.metadata.tokenId,
            name: action.metadata.name,
            symbol: action.metadata.symbol,
            decimals: action.metadata.decimals,
            supply: action.metadata.supply,
            owner: action.metadata.metadata.creator,
            appId: action.metadata.appId,
            tokenType: action.metadata.tokenType,
            metadata: action.metadata.metadata,
            txid: action.txid,
            createdAt: action.metadata.metadata.createdAt
          }

          tokensByApp.get(appId)!.push(token)
        })

      this.tokens = tokensByApp
      
      // Update global token count state
      const totalTokens = Array.from(tokensByApp.values()).reduce((sum, tokens) => sum + tokens.length, 0)
      this.stateManager.setState('wallet-total-tokens', totalTokens)
      
    } catch (error) {
      console.error('Error loading user tokens:', error)
    }
  }

  private addTokenToCache(appId: string, token: BRC100Token): void {
    if (!this.tokens.has(appId)) {
      this.tokens.set(appId, [])
    }
    this.tokens.get(appId)!.push(token)
    
    // Update global token count
    const totalTokens = Array.from(this.tokens.values()).reduce((sum, tokens) => sum + tokens.length, 0)
    this.stateManager.setState('wallet-total-tokens', totalTokens)
  }

  async transferToken(
    tokenId: string,
    recipientAddress: string,
    appId: string
  ): Promise<string> {
    if (!this.client || !this.walletData) {
      throw new Error('Wallet not connected')
    }

    const transferMetadata = {
      protocol: 'BRC100',
      operation: 'transfer',
      tokenId,
      from: this.walletData.address,
      to: recipientAddress,
      appId,
      timestamp: new Date().toISOString()
    }

    const { tx } = await this.client.createAction({
      outputs: [
        {
          script: `OP_FALSE OP_RETURN ${Buffer.from(JSON.stringify(transferMetadata)).toString('hex')}`,
          satoshis: 0,
          outputDescription: 'BRC100 Token Transfer'
        },
        {
          address: recipientAddress,
          satoshis: 1000,
          outputDescription: 'Token Recipient'
        }
      ],
      description: `Transfer ${appId} token ${tokenId}`,
      options: {
        acceptDelayedBroadcast: false
      }
    })

    if (!tx) throw new Error('Failed to create transfer transaction')

    const transaction = Transaction.fromAtomicBEEF(tx)
    const txid = transaction.id('hex')
    
    // Dispatch transfer event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tokenTransferred', {
        detail: { tokenId, recipientAddress, appId, txid }
      }))
    }

    return txid
  }

  async signMessage(message: string): Promise<string> {
    if (!this.client) throw new Error('Wallet not connected')

    const signature = await this.client.createSignature({
      data: Utils.toArray(message, 'utf8')
    })

    return signature
  }

  isConnected(): boolean {
    return this.walletData?.isConnected || false
  }

  getWalletData(): WalletData | null {
    return this.walletData
  }

  static async checkAvailability(): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:3321/getPublicKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:2050'
        },
        body: JSON.stringify({ identityKey: true })
      })
      
      if (response.ok) {
        const data = await response.json()
        return !!data.publicKey
      }
      return false
    } catch {
      return false
    }
  }
}

export default MetaNetWalletService
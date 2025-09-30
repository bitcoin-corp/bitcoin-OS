export interface TokenProtocol {
  name: string;
  id: string;
  description: string;
  maxSupply?: number;
  divisibility: number;
}

export interface TokenizedSpreadsheet {
  spreadsheetId: string;
  spreadsheetTitle: string;
  tokenId: string;
  protocol: TokenProtocol;
  totalShares: number;
  availableShares: number;
  pricePerShare: number; // in satoshis
  owners: TokenOwner[];
  createdAt: number;
  marketCap: number;
  cellCount: number;
  lastModified: number;
}

export interface TokenOwner {
  address: string;
  handle?: string;
  shares: number;
  percentage: number;
  acquiredAt: number;
  purchasePrice: number;
}

export interface TokenTransaction {
  id: string;
  spreadsheetId: string;
  from: string;
  to: string;
  shares: number;
  price: number;
  timestamp: number;
  txId?: string;
}

// BSV Token Protocols
export const TOKEN_PROTOCOLS: TokenProtocol[] = [
  {
    name: 'Ordinals',
    id: 'ordinals',
    description: 'Bitcoin Ordinals - Inscribe data directly on satoshis',
    divisibility: 0,
    maxSupply: 1000000
  },
  {
    name: 'STAS',
    id: 'stas',
    description: 'Satoshi Token Allocation System - Native BSV tokens',
    divisibility: 8,
    maxSupply: 21000000
  },
  {
    name: 'Run',
    id: 'run',
    description: 'Run Protocol - Interactive tokens and smart contracts',
    divisibility: 8,
    maxSupply: 100000000
  },
  {
    name: '1Sat Ordinals',
    id: '1sat',
    description: '1Sat Ordinals - One satoshi per token',
    divisibility: 0,
    maxSupply: 21000000
  }
];

export class TokenizationService {
  private tokenizedSpreadsheets: Map<string, TokenizedSpreadsheet> = new Map();
  private transactions: TokenTransaction[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const saved = localStorage.getItem('tokenized_spreadsheets');
    if (saved) {
      try {
        const sheets = JSON.parse(saved);
        this.tokenizedSpreadsheets = new Map(sheets);
      } catch (error) {
        console.error('Failed to load tokenized spreadsheets:', error);
      }
    }

    const savedTx = localStorage.getItem('token_transactions');
    if (savedTx) {
      try {
        this.transactions = JSON.parse(savedTx);
      } catch (error) {
        console.error('Failed to load transactions:', error);
      }
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(
      'tokenized_spreadsheets',
      JSON.stringify(Array.from(this.tokenizedSpreadsheets.entries()))
    );
    localStorage.setItem('token_transactions', JSON.stringify(this.transactions));
  }

  async tokenizeSpreadsheet(
    spreadsheetId: string,
    spreadsheetTitle: string,
    cellCount: number,
    protocol: TokenProtocol,
    totalShares: number,
    pricePerShare: number,
    creatorAddress: string,
    creatorHandle?: string
  ): Promise<TokenizedSpreadsheet> {
    // Check if spreadsheet is already tokenized
    if (this.tokenizedSpreadsheets.has(spreadsheetId)) {
      throw new Error('Spreadsheet is already tokenized');
    }

    // Validate shares against protocol limits
    if (protocol.maxSupply && totalShares > protocol.maxSupply) {
      throw new Error(`Total shares exceed protocol maximum of ${protocol.maxSupply}`);
    }

    const tokenId = `${protocol.id}_${spreadsheetId}_${Date.now()}`;
    
    const tokenizedSheet: TokenizedSpreadsheet = {
      spreadsheetId,
      spreadsheetTitle,
      tokenId,
      protocol,
      totalShares,
      availableShares: totalShares,
      pricePerShare,
      owners: [{
        address: creatorAddress,
        handle: creatorHandle,
        shares: totalShares,
        percentage: 100,
        acquiredAt: Date.now(),
        purchasePrice: 0 // Creator gets initial shares for free
      }],
      createdAt: Date.now(),
      marketCap: totalShares * pricePerShare,
      cellCount,
      lastModified: Date.now()
    };

    this.tokenizedSpreadsheets.set(spreadsheetId, tokenizedSheet);
    this.saveToLocalStorage();

    return tokenizedSheet;
  }

  async buyShares(
    spreadsheetId: string,
    buyerAddress: string,
    buyerHandle: string | undefined,
    sharesToBuy: number
  ): Promise<TokenTransaction> {
    const tokenSheet = this.tokenizedSpreadsheets.get(spreadsheetId);
    if (!tokenSheet) {
      throw new Error('Spreadsheet is not tokenized');
    }

    if (sharesToBuy > tokenSheet.availableShares) {
      throw new Error(`Only ${tokenSheet.availableShares} shares available`);
    }

    const totalCost = sharesToBuy * tokenSheet.pricePerShare;

    // Find the current owner(s) with shares to sell
    const seller = tokenSheet.owners.find(owner => owner.shares >= sharesToBuy);
    if (!seller) {
      throw new Error('No single seller has enough shares');
    }

    // Create transaction
    const transaction: TokenTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      spreadsheetId,
      from: seller.address,
      to: buyerAddress,
      shares: sharesToBuy,
      price: totalCost,
      timestamp: Date.now()
    };

    // Update seller's shares
    seller.shares -= sharesToBuy;
    seller.percentage = (seller.shares / tokenSheet.totalShares) * 100;

    // Add or update buyer
    let buyer = tokenSheet.owners.find(o => o.address === buyerAddress);
    if (buyer) {
      buyer.shares += sharesToBuy;
      buyer.percentage = (buyer.shares / tokenSheet.totalShares) * 100;
    } else {
      tokenSheet.owners.push({
        address: buyerAddress,
        handle: buyerHandle,
        shares: sharesToBuy,
        percentage: (sharesToBuy / tokenSheet.totalShares) * 100,
        acquiredAt: Date.now(),
        purchasePrice: tokenSheet.pricePerShare
      });
    }

    // Remove owners with 0 shares
    tokenSheet.owners = tokenSheet.owners.filter(o => o.shares > 0);

    // Update available shares
    tokenSheet.availableShares -= sharesToBuy;

    // Update market cap
    tokenSheet.marketCap = tokenSheet.totalShares * tokenSheet.pricePerShare;

    // Save transaction
    this.transactions.push(transaction);
    this.saveToLocalStorage();

    return transaction;
  }

  async sellShares(
    spreadsheetId: string,
    sellerAddress: string,
    sharesToSell: number,
    newPricePerShare?: number
  ): Promise<void> {
    const tokenSheet = this.tokenizedSpreadsheets.get(spreadsheetId);
    if (!tokenSheet) {
      throw new Error('Spreadsheet is not tokenized');
    }

    const seller = tokenSheet.owners.find(o => o.address === sellerAddress);
    if (!seller || seller.shares < sharesToSell) {
      throw new Error('Insufficient shares to sell');
    }

    // Make shares available for purchase
    tokenSheet.availableShares += sharesToSell;

    // Update price if provided
    if (newPricePerShare !== undefined) {
      tokenSheet.pricePerShare = newPricePerShare;
      tokenSheet.marketCap = tokenSheet.totalShares * newPricePerShare;
    }

    this.saveToLocalStorage();
  }

  getTokenizedSpreadsheet(spreadsheetId: string): TokenizedSpreadsheet | undefined {
    return this.tokenizedSpreadsheets.get(spreadsheetId);
  }

  getAllTokenizedSpreadsheets(): TokenizedSpreadsheet[] {
    return Array.from(this.tokenizedSpreadsheets.values());
  }

  getSpreadsheetTransactions(spreadsheetId: string): TokenTransaction[] {
    return this.transactions.filter(tx => tx.spreadsheetId === spreadsheetId);
  }

  getOwnershipPercentage(spreadsheetId: string, address: string): number {
    const tokenSheet = this.tokenizedSpreadsheets.get(spreadsheetId);
    if (!tokenSheet) return 0;

    const owner = tokenSheet.owners.find(o => o.address === address);
    return owner ? owner.percentage : 0;
  }

  calculateTokenValue(spreadsheetId: string): {
    marketCap: number;
    pricePerShare: number;
    totalVolume: number;
  } {
    const tokenSheet = this.tokenizedSpreadsheets.get(spreadsheetId);
    if (!tokenSheet) {
      return { marketCap: 0, pricePerShare: 0, totalVolume: 0 };
    }

    const transactions = this.getSpreadsheetTransactions(spreadsheetId);
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.price, 0);

    return {
      marketCap: tokenSheet.marketCap,
      pricePerShare: tokenSheet.pricePerShare,
      totalVolume
    };
  }

  // Format satoshis to BSV
  formatBSV(satoshis: number): string {
    const bsv = satoshis / 100000000;
    return `${bsv.toFixed(8)} BSV`;
  }

  // Format shares with proper units
  formatShares(shares: number, protocol: TokenProtocol): string {
    if (protocol.divisibility === 0) {
      return `${shares.toLocaleString()} shares`;
    }
    return `${(shares / Math.pow(10, protocol.divisibility)).toFixed(protocol.divisibility)} tokens`;
  }
}

export default TokenizationService;
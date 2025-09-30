// Storage Options for Blockchain Spreadsheets
// Adapted from Bitcoin Writer project

export interface StorageOption {
  id: string;
  name: string;
  description: string;
  baseRatePerCell: number; // in satoshis per cell
  features: string[];
  icon: string;
}

export interface SpreadsheetPricingBreakdown {
  cellCount: number;
  nonEmptyCells: number;
  dataSize: number; // in bytes
  baseCostSatoshis: number;
  serviceFee: number; // Our 2x markup
  totalCostSatoshis: number;
  totalCostUSD: number;
  costPerCell: number;
}

// Storage options available for spreadsheets
export const SPREADSHEET_STORAGE_OPTIONS: StorageOption[] = [
  {
    id: 'standard_blockchain',
    name: 'Standard Blockchain',
    description: 'Store spreadsheet data directly on Bitcoin blockchain',
    baseRatePerCell: 1, // satoshis per cell
    features: [
      'Permanent storage',
      'Public visibility',
      'Fast confirmation',
      'Best for public data'
    ],
    icon: '📊'
  },
  {
    id: 'encrypted_storage',
    name: 'Encrypted Storage',
    description: 'End-to-end encrypted spreadsheet storage',
    baseRatePerCell: 1.5, // satoshis per cell
    features: [
      'End-to-end encryption',
      'Private by default',
      'Recoverable with key',
      'Best for sensitive data'
    ],
    icon: '🔐'
  },
  {
    id: 'compressed_data',
    name: 'Compressed Data',
    description: 'Compressed storage for large spreadsheets',
    baseRatePerCell: 0.7, // satoshis per cell
    features: [
      'Data compression',
      'Lower costs',
      'Optimized for size',
      'Best for large sheets'
    ],
    icon: '🗜️'
  },
  {
    id: 'versioned_storage',
    name: 'Versioned Storage',
    description: 'Version-controlled spreadsheet with history',
    baseRatePerCell: 2, // satoshis per cell
    features: [
      'Version history',
      'Change tracking',
      'Rollback capability',
      'Collaborative features'
    ],
    icon: '📝'
  }
];

// Constants for pricing calculations
const SATOSHIS_PER_BITCOIN = 100_000_000;
const SERVICE_MULTIPLIER = 2; // We charge 2x the base cost
const CENTS_PER_CELL = 0.0000001; // 1/1,000,000th of a penny per cell = $0.0000001
const BYTES_PER_CELL = 50; // Rough estimate for spreadsheet cell data

// Get current Bitcoin price (mock - in production, fetch from API)
export const getBitcoinPriceUSD = async (): Promise<number> => {
  // TODO: Fetch from a real API like CoinGecko
  // For now, return a mock value
  return 50000; // $50,000 per BTC
};

// Calculate the size of spreadsheet data in bytes
export const calculateSpreadsheetSize = (cells: { [key: string]: any }): number => {
  const jsonData = JSON.stringify(cells);
  const blob = new Blob([jsonData]);
  return blob.size;
};

// Calculate pricing for a spreadsheet
export const calculateSpreadsheetPricing = async (
  cells: { [key: string]: any },
  storageOption: StorageOption,
  btcPriceUSD?: number
): Promise<SpreadsheetPricingBreakdown> => {
  const cellEntries = Object.entries(cells);
  const cellCount = cellEntries.length;
  const nonEmptyCells = cellEntries.filter(([_, cell]) => cell.value && cell.value.trim() !== '').length;
  const dataSize = calculateSpreadsheetSize(cells);
  
  // Calculate base cost in USD (1/1,000,000th of a penny per cell = $0.0000001)
  const baseCostUSD = nonEmptyCells * CENTS_PER_CELL;
  
  // Apply our service fee (2x markup)
  const totalCostUSD = baseCostUSD * SERVICE_MULTIPLIER;
  const serviceFeeCostUSD = totalCostUSD - baseCostUSD;
  
  // Convert to satoshis for display
  const btcPrice = btcPriceUSD || await getBitcoinPriceUSD();
  const totalCostBTC = totalCostUSD / btcPrice;
  const totalCostSatoshis = totalCostBTC * SATOSHIS_PER_BITCOIN;
  const baseCostSatoshis = (baseCostUSD / btcPrice) * SATOSHIS_PER_BITCOIN;
  const serviceFee = (serviceFeeCostUSD / btcPrice) * SATOSHIS_PER_BITCOIN;
  
  // Calculate cost per cell
  const costPerCell = nonEmptyCells > 0 ? totalCostUSD / nonEmptyCells : 0;
  
  return {
    cellCount,
    nonEmptyCells,
    dataSize,
    baseCostSatoshis: Math.round(baseCostSatoshis),
    serviceFee: Math.round(serviceFee),
    totalCostSatoshis: Math.round(totalCostSatoshis),
    totalCostUSD,
    costPerCell
  };
};

// Format satoshis to a readable string
export const formatSatoshis = (satoshis: number): string => {
  if (satoshis < 1000) {
    return `${satoshis} sats`;
  } else if (satoshis < 1_000_000) {
    return `${(satoshis / 1000).toFixed(2)}k sats`;
  } else {
    return `${(satoshis / 1_000_000).toFixed(4)} BTC`;
  }
};

// Format USD price
export const formatUSD = (usd: number): string => {
  if (usd === 0) {
    return '$0.00';
  } else if (usd < 0.01) {
    // Show full precision for small amounts
    return `$${usd.toFixed(8)}`;
  } else if (usd < 1) {
    return `$${usd.toFixed(4)}`;
  } else {
    return `$${usd.toFixed(2)}`;
  }
};

// Estimate transaction confirmation time
export const estimateConfirmationTime = (satoshisPerByte: number): string => {
  if (satoshisPerByte >= 2) {
    return '~10 minutes';
  } else if (satoshisPerByte >= 1) {
    return '~30 minutes';
  } else if (satoshisPerByte >= 0.5) {
    return '~1 hour';
  } else {
    return '~2-6 hours';
  }
};

// Get a fun fact about the cost
export const getCostComparison = (usdCost: number): string => {
  if (usdCost === 0) {
    return "Free! Start creating! 📊";
  } else if (usdCost < 0.00001) {
    return "Practically free! 🎁";
  } else if (usdCost < 0.0001) {
    return "Less than a dust particle! ✨";
  } else if (usdCost < 0.001) {
    return "Cheaper than a grain of sand! 🏖️";
  } else if (usdCost < 0.01) {
    return "Less than a penny! 🪙";
  } else if (usdCost < 0.10) {
    return "Cheaper than a gumball! 🍬";
  } else if (usdCost < 0.50) {
    return "Less than a postage stamp! 📮";
  } else if (usdCost < 1.00) {
    return "Less than a coffee! ☕";
  } else if (usdCost < 5.00) {
    return "About a fancy coffee! ☕";
  } else {
    return "Worth it for permanent storage! 💎";
  }
};
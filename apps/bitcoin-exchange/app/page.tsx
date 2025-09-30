'use client'

import { BitcoinOSProvider } from '@bitcoin-os/bridge'
import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw, 
  DollarSign,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Filter
} from 'lucide-react'

interface NFTListing {
  id: string
  name: string
  container: string
  shares: number
  price: number
  dividendYield: number
  volume24h: number
  change24h: number
  locked: boolean
}

interface Order {
  id: string
  type: 'buy' | 'sell'
  price: number
  amount: number
  total: number
}

interface Trade {
  id: string
  time: Date
  price: number
  amount: number
  type: 'buy' | 'sell'
}

export default function BitcoinExchange() {
  const [activeTab, setActiveTab] = useState<'spot' | 'nfts' | 'shares'>('nfts')
  const [selectedAsset, setSelectedAsset] = useState<NFTListing | null>(null)
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState<'all' | 'under100' | 'under1000' | 'over1000'>('all')

  const config = {
    context: {
      appName: 'Bitcoin Exchange',
      exchangeUrl: 'https://bitcoin-exchange.vercel.app',
      branding: {
        name: 'Bitcoin Exchange',
        color: '#ffa500'
      }
    },
    showDevSidebar: false,
    showDock: true,
    showPocBar: true
  }

  // Mock data for NFT/FT listings
  const [nftListings] = useState<NFTListing[]>([
    {
      id: '1',
      name: 'BitcoinWhitepaper.pdf',
      container: 'docs.nft',
      shares: 1000000,
      price: 0.00012,
      dividendYield: 8.5,
      volume24h: 45230,
      change24h: 12.5,
      locked: false
    },
    {
      id: '2',
      name: 'SatoshiEmails.zip',
      container: 'archive.nft',
      shares: 500000,
      price: 0.00089,
      dividendYield: 12.3,
      volume24h: 123400,
      change24h: -3.2,
      locked: false
    },
    {
      id: '3',
      name: 'BlockchainCourse.mp4',
      container: 'education.nft',
      shares: 2000000,
      price: 0.00034,
      dividendYield: 6.7,
      volume24h: 78900,
      change24h: 5.8,
      locked: true
    },
    {
      id: '4',
      name: 'Genesis.block',
      container: 'history.nft',
      shares: 100000,
      price: 0.00999,
      dividendYield: 15.2,
      volume24h: 234500,
      change24h: 22.1,
      locked: false
    }
  ])

  // Mock order book data
  const [orderBook] = useState<{ bids: Order[], asks: Order[] }>({
    bids: [
      { id: '1', type: 'buy', price: 0.00088, amount: 1200, total: 1.056 },
      { id: '2', type: 'buy', price: 0.00087, amount: 2500, total: 2.175 },
      { id: '3', type: 'buy', price: 0.00086, amount: 3300, total: 2.838 },
    ],
    asks: [
      { id: '4', type: 'sell', price: 0.00090, amount: 1500, total: 1.35 },
      { id: '5', type: 'sell', price: 0.00091, amount: 2200, total: 2.002 },
      { id: '6', type: 'sell', price: 0.00092, amount: 2800, total: 2.576 },
    ]
  })

  // Mock recent trades
  const [recentTrades] = useState<Trade[]>([
    { id: '1', time: new Date(), price: 0.00089, amount: 500, type: 'buy' },
    { id: '2', time: new Date(), price: 0.00088, amount: 750, type: 'sell' },
    { id: '3', time: new Date(), price: 0.00089, amount: 1200, type: 'buy' },
  ])

  const filteredListings = nftListings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.container.toLowerCase().includes(searchQuery.toLowerCase())
    
    let matchesPrice = true
    if (priceFilter === 'under100') matchesPrice = listing.price < 0.001
    else if (priceFilter === 'under1000') matchesPrice = listing.price < 0.01
    else if (priceFilter === 'over1000') matchesPrice = listing.price >= 0.01

    return matchesSearch && matchesPrice
  })

  useEffect(() => {
    if (filteredListings.length > 0 && !selectedAsset) {
      setSelectedAsset(filteredListings[0])
    }
  }, [filteredListings, selectedAsset])

  return (
    <BitcoinOSProvider config={config}>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-2xl font-light">
                  Bitcoin <span className="text-[#ffa500]">Exchange</span>
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('spot')}
                    className={`px-4 py-2 rounded ${activeTab === 'spot' ? 'bg-[#ffa500]/20 text-[#ffa500]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Spot Trading
                  </button>
                  <button
                    onClick={() => setActiveTab('nfts')}
                    className={`px-4 py-2 rounded ${activeTab === 'nfts' ? 'bg-[#ffa500]/20 text-[#ffa500]' : 'text-gray-400 hover:text-white'}`}
                  >
                    NFT/FT Market
                  </button>
                  <button
                    onClick={() => setActiveTab('shares')}
                    className={`px-4 py-2 rounded ${activeTab === 'shares' ? 'bg-[#ffa500]/20 text-[#ffa500]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Token Shares
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-gray-400">BSV/USD:</span>
                  <span className="text-green-500">$51.23</span>
                </div>
                <button className="px-4 py-2 bg-[#ffa500] text-black rounded font-medium hover:bg-[#ffb833]">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Asset List */}
            <div className="col-span-4 bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-light">NFT/FT Assets</h2>
                <RefreshCw className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
              </div>
              
              {/* Search and Filter */}
              <div className="mb-4 space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded focus:border-[#ffa500] outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded text-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="under100">Under 100 sats</option>
                    <option value="under1000">Under 1000 sats</option>
                    <option value="over1000">Over 1000 sats</option>
                  </select>
                </div>
              </div>

              {/* Asset List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => setSelectedAsset(listing)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedAsset?.id === listing.id 
                        ? 'bg-[#ffa500]/10 border-[#ffa500]' 
                        : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{listing.name}</div>
                        <div className="text-xs text-gray-500">{listing.container}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {listing.shares.toLocaleString()} shares
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{listing.price.toFixed(5)} BSV</div>
                        <div className={`text-xs flex items-center justify-end gap-1 ${
                          listing.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {listing.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(listing.change24h)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Panel */}
            <div className="col-span-5 space-y-6">
              {/* Chart Area */}
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 h-[300px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-light">
                    {selectedAsset ? selectedAsset.name : 'Select an asset'}
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-900 border border-gray-800 rounded hover:border-gray-700">1H</button>
                    <button className="px-2 py-1 text-xs bg-[#ffa500]/20 border border-[#ffa500] rounded text-[#ffa500]">24H</button>
                    <button className="px-2 py-1 text-xs bg-gray-900 border border-gray-800 rounded hover:border-gray-700">7D</button>
                    <button className="px-2 py-1 text-xs bg-gray-900 border border-gray-800 rounded hover:border-gray-700">1M</button>
                  </div>
                </div>
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  <BarChart3 className="w-12 h-12 opacity-20" />
                </div>
              </div>

              {/* Order Form */}
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setOrderType('buy')}
                    className={`flex-1 py-2 rounded font-medium ${
                      orderType === 'buy' 
                        ? 'bg-green-500/20 text-green-500 border border-green-500' 
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOrderType('sell')}
                    className={`flex-1 py-2 rounded font-medium ${
                      orderType === 'sell' 
                        ? 'bg-red-500/20 text-red-500 border border-red-500' 
                        : 'bg-gray-900 text-gray-400 border border-gray-800'
                    }`}
                  >
                    Sell
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Price (BSV)</label>
                    <input
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded focus:border-[#ffa500] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Amount (Shares)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded focus:border-[#ffa500] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Total (BSV)</label>
                    <input
                      type="number"
                      step="0.00001"
                      placeholder="0.00000"
                      disabled
                      className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded opacity-50"
                    />
                  </div>
                  <button className={`w-full py-3 rounded font-medium ${
                    orderType === 'buy' 
                      ? 'bg-green-500 text-black hover:bg-green-400' 
                      : 'bg-red-500 text-white hover:bg-red-400'
                  }`}>
                    {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedAsset?.name || 'Asset'}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Book & Trades */}
            <div className="col-span-3 space-y-6">
              {/* Order Book */}
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-light mb-3">Order Book</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-xs text-gray-400 pb-2 border-b border-gray-800">
                    <div>Price</div>
                    <div className="text-right">Amount</div>
                    <div className="text-right">Total</div>
                  </div>
                  
                  {/* Asks */}
                  <div className="space-y-1">
                    {[...orderBook.asks].reverse().map((order) => (
                      <div key={order.id} className="grid grid-cols-3 text-xs">
                        <div className="text-red-500">{order.price.toFixed(5)}</div>
                        <div className="text-right text-gray-400">{order.amount}</div>
                        <div className="text-right text-gray-400">{order.total.toFixed(3)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Current Price */}
                  <div className="py-2 border-y border-gray-800">
                    <div className="text-center text-lg font-medium text-[#ffa500]">
                      {selectedAsset?.price.toFixed(5) || '0.00000'} BSV
                    </div>
                  </div>

                  {/* Bids */}
                  <div className="space-y-1">
                    {orderBook.bids.map((order) => (
                      <div key={order.id} className="grid grid-cols-3 text-xs">
                        <div className="text-green-500">{order.price.toFixed(5)}</div>
                        <div className="text-right text-gray-400">{order.amount}</div>
                        <div className="text-right text-gray-400">{order.total.toFixed(3)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                <h3 className="text-sm font-light mb-3">Recent Trades</h3>
                <div className="space-y-1">
                  <div className="grid grid-cols-3 text-xs text-gray-400 pb-2 border-b border-gray-800">
                    <div>Time</div>
                    <div className="text-right">Price</div>
                    <div className="text-right">Amount</div>
                  </div>
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="grid grid-cols-3 text-xs">
                      <div className="text-gray-500">
                        {trade.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className={`text-right ${trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.price.toFixed(5)}
                      </div>
                      <div className="text-right text-gray-400">{trade.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BitcoinOSProvider>
  )
}
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Cpu, 
  HardDrive, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Server, 
  Wifi, 
  Database,
  Activity,
  Clock,
  Users,
  Eye,
  Gauge,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  Settings
} from 'lucide-react'

interface ComputeOrder {
  id: string
  type: 'GPU' | 'CPU' | 'Storage' | 'Bandwidth' | 'RAM'
  provider: string
  specs: string
  pricePerHour: number
  side: 'buy' | 'sell'
  quantity: number
  timestamp: Date
  status: 'active' | 'filled' | 'cancelled'
}

interface MarketData {
  type: string
  price: number
  change24h: number
  volume24h: number
  trades24h: number
  highestBid: number
  lowestAsk: number
}

function ExchangeContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'trade' | 'orders' | 'analytics'>('trade')
  const [selectedMarket, setSelectedMarket] = useState<'GPU' | 'CPU' | 'Storage' | 'Bandwidth' | 'RAM'>('GPU')
  const [isLive, setIsLive] = useState(true)
  const [orders, setOrders] = useState<ComputeOrder[]>([])
  
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab === 'trade' || tab === 'orders' || tab === 'analytics') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Mock market data with live updates
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({
    GPU: { type: 'GPU', price: 2.45, change24h: 12.5, volume24h: 1250, trades24h: 450, highestBid: 2.44, lowestAsk: 2.46 },
    CPU: { type: 'CPU', price: 0.85, change24h: -3.2, volume24h: 890, trades24h: 320, highestBid: 0.84, lowestAsk: 0.86 },
    Storage: { type: 'Storage', price: 0.12, change24h: 8.7, volume24h: 2100, trades24h: 680, highestBid: 0.11, lowestAsk: 0.13 },
    Bandwidth: { type: 'Bandwidth', price: 4.20, change24h: 15.8, volume24h: 560, trades24h: 180, highestBid: 4.18, lowestAsk: 4.22 },
    RAM: { type: 'RAM', price: 1.15, change24h: -1.5, volume24h: 780, trades24h: 290, highestBid: 1.14, lowestAsk: 1.16 }
  })

  // Simulate live price updates
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      setMarketData(prev => {
        const newData = { ...prev }
        Object.keys(newData).forEach(key => {
          const change = (Math.random() - 0.5) * 0.1
          newData[key].price = Math.max(0.01, newData[key].price + change)
          newData[key].change24h += (Math.random() - 0.5) * 2
        })
        return newData
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isLive])

  const getMarketIcon = (type: string) => {
    switch (type) {
      case 'GPU':
      case 'CPU':
        return <Cpu className="w-5 h-5" />
      case 'Storage':
        return <HardDrive className="w-5 h-5" />
      case 'RAM':
        return <Database className="w-5 h-5" />
      case 'Bandwidth':
        return <Wifi className="w-5 h-5" />
      default:
        return <Server className="w-5 h-5" />
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(3)}`
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="h-full overflow-auto bg-black text-white">
      {/* Header with live indicator */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Compute Exchange
              </h1>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-sm text-gray-400">{isLive ? 'Live' : 'Paused'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm">{isLive ? 'Pause' : 'Resume'}</span>
              </button>
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Market Selection */}
        <div className="w-80 border-r border-gray-800 bg-gray-900/30">
          <div className="p-4 border-b border-gray-800">
            <h3 className="font-bold text-lg mb-4">Markets</h3>
            <div className="space-y-2">
              {Object.values(marketData).map((market) => (
                <button
                  key={market.type}
                  onClick={() => setSelectedMarket(market.type as any)}
                  className={`w-full p-3 rounded-lg transition-all text-left ${
                    selectedMarket === market.type
                      ? 'bg-orange-500/20 border border-orange-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getMarketIcon(market.type)}
                      <span className="font-medium">{market.type}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      market.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {market.change24h >= 0 ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      <span className="text-xs">{formatChange(market.change24h)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono">{formatPrice(market.price)}/hr</span>
                    <span className="text-gray-400">{market.trades24h} trades</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Global Stats */}
          <div className="p-4">
            <h4 className="font-medium mb-3 text-gray-300">Global Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Total Volume</span>
                </div>
                <span className="font-mono text-sm">$47.2K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Active Traders</span>
                </div>
                <span className="font-mono text-sm">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Network Load</span>
                </div>
                <span className="font-mono text-sm">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Avg. Response</span>
                </div>
                <span className="font-mono text-sm">12ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-800 bg-gray-900/30">
            {[
              { id: 'trade', label: 'Trade', icon: TrendingUp },
              { id: 'orders', label: 'Orders', icon: Clock },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-orange-500 text-orange-500 bg-orange-500/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6">
            {activeTab === 'trade' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Order Book */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold">Order Book - {selectedMarket}</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-400 mb-3">
                      <span>Price ($bOS/hr)</span>
                      <span className="text-right">Size (hrs)</span>
                      <span className="text-right">Total</span>
                    </div>
                    
                    {/* Sell Orders (Red) */}
                    <div className="space-y-1 mb-4">
                      {[...Array(8)].map((_, i) => {
                        const price = marketData[selectedMarket].lowestAsk + (i * 0.01)
                        const size = Math.floor(Math.random() * 100) + 10
                        return (
                          <div key={i} className="grid grid-cols-3 gap-4 text-sm hover:bg-red-500/10 p-1 rounded cursor-pointer">
                            <span className="text-red-400 font-mono">{formatPrice(price)}</span>
                            <span className="text-right font-mono">{size}</span>
                            <span className="text-right font-mono text-gray-400">{formatPrice(price * size)}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Spread */}
                    <div className="py-2 mb-4 text-center border-y border-gray-800">
                      <span className="text-sm text-gray-400">
                        Spread: {formatPrice(marketData[selectedMarket].lowestAsk - marketData[selectedMarket].highestBid)}
                      </span>
                    </div>

                    {/* Buy Orders (Green) */}
                    <div className="space-y-1">
                      {[...Array(8)].map((_, i) => {
                        const price = marketData[selectedMarket].highestBid - (i * 0.01)
                        const size = Math.floor(Math.random() * 100) + 10
                        return (
                          <div key={i} className="grid grid-cols-3 gap-4 text-sm hover:bg-green-500/10 p-1 rounded cursor-pointer">
                            <span className="text-green-400 font-mono">{formatPrice(price)}</span>
                            <span className="text-right font-mono">{size}</span>
                            <span className="text-right font-mono text-gray-400">{formatPrice(price * size)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Trading Interface */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold">Place Order</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button className="py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                        BUY {selectedMarket}
                      </button>
                      <button className="py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                        SELL {selectedMarket}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Price ($bOS/hr)</label>
                        <input 
                          type="number" 
                          step="0.001"
                          defaultValue={marketData[selectedMarket].price.toFixed(3)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Quantity (hours)</label>
                        <input 
                          type="number" 
                          placeholder="0"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Total ($bOS)</label>
                        <input 
                          type="number" 
                          placeholder="0.000"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
                        Place Order
                      </button>
                    </div>

                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Available Balance:</span>
                        <span className="font-mono">1,247.89 $bOS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-bold">My Orders</h3>
                </div>
                <div className="p-4">
                  <div className="text-center text-gray-400 py-8">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No active orders</p>
                    <p className="text-sm">Place an order to see it here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4">Price Chart</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Interactive price chart</p>
                      <p className="text-sm">Real-time {selectedMarket} pricing</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4">Market Analytics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h High:</span>
                      <span className="font-mono">{formatPrice(marketData[selectedMarket].price * 1.15)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Low:</span>
                      <span className="font-mono">{formatPrice(marketData[selectedMarket].price * 0.85)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Volume:</span>
                      <span className="font-mono">{marketData[selectedMarket].volume24h} $bOS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap:</span>
                      <span className="font-mono">$2.4M</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ExchangePage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white">Loading Exchange...</p>
        </div>
      </div>
    }>
      <ExchangeContent />
    </Suspense>
  )
}
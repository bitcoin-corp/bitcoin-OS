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
  Settings,
  Zap as Lightning,
  Globe,
  Shield,
  Sparkles,
  Flame,
  Target,
  Layers,
  Monitor,
  Rocket
} from 'lucide-react'

interface ComputeOrder {
  id: string
  type: 'AI_GPU' | 'Gaming_GPU' | 'CPU_Cores' | 'Quantum_Sim' | 'Edge_Compute' | 'Storage_TB' | 'Bandwidth_Gbps' | 'RAM_DDR5'
  provider: string
  specs: string
  pricePerHour: number
  side: 'buy' | 'sell'
  quantity: number
  timestamp: Date
  status: 'active' | 'filled' | 'cancelled'
  tier: 'premium' | 'standard' | 'budget'
}

interface MarketData {
  type: string
  name: string
  price: number
  change24h: number
  volume24h: number
  trades24h: number
  highestBid: number
  lowestAsk: number
  marketCap: number
  tier: 'premium' | 'standard' | 'budget'
  icon: string
  description: string
}

function ExchangeContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'trade' | 'orders' | 'analytics'>('trade')
  const [selectedMarket, setSelectedMarket] = useState<'AI_GPU' | 'Gaming_GPU' | 'CPU_Cores' | 'Quantum_Sim' | 'Edge_Compute' | 'Storage_TB' | 'Bandwidth_Gbps' | 'RAM_DDR5'>('AI_GPU')
  const [isLive, setIsLive] = useState(true)
  const [orders, setOrders] = useState<ComputeOrder[]>([])
  
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab === 'trade' || tab === 'orders' || tab === 'analytics') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Premium compute market data with live updates
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({
    AI_GPU: { 
      type: 'AI_GPU', 
      name: 'AI Training GPUs', 
      price: 24.50, 
      change24h: 18.7, 
      volume24h: 12750, 
      trades24h: 1450, 
      highestBid: 24.44, 
      lowestAsk: 24.56,
      marketCap: 2400000,
      tier: 'premium',
      icon: 'Sparkles',
      description: 'H100, A100, V100 clusters for AI/ML training'
    },
    Gaming_GPU: { 
      type: 'Gaming_GPU', 
      name: 'Gaming GPUs', 
      price: 8.45, 
      change24h: -2.1, 
      volume24h: 8900, 
      trades24h: 920, 
      highestBid: 8.42, 
      lowestAsk: 8.48,
      marketCap: 890000,
      tier: 'standard',
      icon: 'Monitor',
      description: 'RTX 4090, RTX 4080 for gaming/streaming'
    },
    CPU_Cores: { 
      type: 'CPU_Cores', 
      name: 'CPU Cores', 
      price: 1.25, 
      change24h: 5.3, 
      volume24h: 21000, 
      trades24h: 2680, 
      highestBid: 1.24, 
      lowestAsk: 1.26,
      marketCap: 125000,
      tier: 'budget',
      icon: 'Cpu',
      description: 'Intel Xeon, AMD EPYC core-hours'
    },
    Quantum_Sim: { 
      type: 'Quantum_Sim', 
      name: 'Quantum Simulation', 
      price: 125.00, 
      change24h: 45.8, 
      volume24h: 2560, 
      trades24h: 89, 
      highestBid: 124.50, 
      lowestAsk: 125.50,
      marketCap: 5600000,
      tier: 'premium',
      icon: 'Zap',
      description: 'Quantum circuit simulation on classical hardware'
    },
    Edge_Compute: { 
      type: 'Edge_Compute', 
      name: 'Edge Computing', 
      price: 3.20, 
      change24h: 12.4, 
      volume24h: 5600, 
      trades24h: 780, 
      highestBid: 3.18, 
      lowestAsk: 3.22,
      marketCap: 320000,
      tier: 'standard',
      icon: 'Globe',
      description: 'Distributed edge nodes worldwide'
    },
    Storage_TB: { 
      type: 'Storage_TB', 
      name: 'Storage (TB)', 
      price: 0.45, 
      change24h: -1.2, 
      volume24h: 15600, 
      trades24h: 1980, 
      highestBid: 0.44, 
      lowestAsk: 0.46,
      marketCap: 45000,
      tier: 'budget',
      icon: 'HardDrive',
      description: 'NVMe SSD, HDD storage capacity'
    },
    Bandwidth_Gbps: { 
      type: 'Bandwidth_Gbps', 
      name: 'Network Bandwidth', 
      price: 12.80, 
      change24h: 8.9, 
      volume24h: 3400, 
      trades24h: 450, 
      highestBid: 12.75, 
      lowestAsk: 12.85,
      marketCap: 680000,
      tier: 'standard',
      icon: 'Wifi',
      description: 'High-speed network connectivity'
    },
    RAM_DDR5: { 
      type: 'RAM_DDR5', 
      name: 'DDR5 Memory', 
      price: 2.15, 
      change24h: 3.7, 
      volume24h: 7800, 
      trades24h: 1190, 
      highestBid: 2.14, 
      lowestAsk: 2.16,
      marketCap: 215000,
      tier: 'standard',
      icon: 'Database',
      description: 'Latest DDR5 RAM modules'
    }
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

  const getMarketIcon = (iconName: string, tier: string) => {
    const iconClass = `w-5 h-5 ${
      tier === 'premium' ? 'text-yellow-400' : 
      tier === 'standard' ? 'text-blue-400' : 
      'text-gray-400'
    }`
    
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={iconClass} />
      case 'Monitor':
        return <Monitor className={iconClass} />
      case 'Cpu':
        return <Cpu className={iconClass} />
      case 'Zap':
        return <Zap className={iconClass} />
      case 'Globe':
        return <Globe className={iconClass} />
      case 'HardDrive':
        return <HardDrive className={iconClass} />
      case 'Wifi':
        return <Wifi className={iconClass} />
      case 'Database':
        return <Database className={iconClass} />
      default:
        return <Server className={iconClass} />
    }
  }

  const formatPrice = (price: number) => `$${price.toFixed(3)}`
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Futuristic Header */}
      <div className="relative border-b border-orange-500/20 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <Lightning className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                    bEX
                  </h1>
                  <p className="text-sm text-gray-400 font-mono">Bitcoin Compute Exchange</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="text-sm font-medium text-green-400">{isLive ? 'LIVE TRADING' : 'MARKET CLOSED'}</span>
                  <div className="w-px h-4 bg-green-500/30" />
                  <span className="text-xs text-green-300 font-mono">1,247 traders</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Global Volume</div>
                  <div className="text-lg font-bold text-orange-400 font-mono">₿OS 47.2K</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Network Load</div>
                  <div className="text-lg font-bold text-blue-400 font-mono">68%</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-300"
              >
                {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm font-medium">{isLive ? 'Pause Feed' : 'Resume Feed'}</span>
              </button>
              
              <button 
                type="button"
                className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg transition-all duration-300 hover:border-orange-500/50"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Enhanced Sidebar - Market Selection */}
        <div className="w-96 border-r border-orange-500/20 bg-gradient-to-b from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-sm">
          <div className="p-6 border-b border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <Flame className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Live Markets
              </h3>
            </div>
            
            <div className="space-y-3">
              {Object.values(marketData).map((market) => (
                <button
                  key={market.type}
                  type="button"
                  onClick={() => setSelectedMarket(market.type as any)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 text-left group border ${
                    selectedMarket === market.type
                      ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/50 shadow-lg shadow-orange-500/20'
                      : 'bg-gray-800/30 hover:bg-gray-700/40 border-gray-700/50 hover:border-orange-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        market.tier === 'premium' ? 'bg-yellow-500/20' :
                        market.tier === 'standard' ? 'bg-blue-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        {getMarketIcon(market.icon, market.tier)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                          {market.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {market.description}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      market.change24h >= 0 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                    }`}>
                      {market.change24h >= 0 ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      {formatChange(market.change24h)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold font-mono text-white">
                        {formatPrice(market.price)}<span className="text-sm text-gray-400">/hr</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Vol: ₿OS {(market.volume24h / 1000).toFixed(1)}K
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{market.trades24h} trades</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        market.tier === 'premium' ? 'text-yellow-400 bg-yellow-500/20' :
                        market.tier === 'standard' ? 'text-blue-400 bg-blue-500/20' :
                        'text-gray-400 bg-gray-500/20'
                      }`}>
                        {market.tier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Global Stats */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-orange-400">Network Status</h4>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-300">Total Volume</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-orange-400">₿OS 847K</span>
                </div>
                <div className="text-xs text-gray-500">+24.5% from yesterday</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Active Nodes</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-blue-400">12,847</span>
                </div>
                <div className="text-xs text-gray-500">Across 67 countries</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-300">Network Load</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-green-400">68%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lightning className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Avg Response</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-yellow-400">8ms</span>
                </div>
                <div className="text-xs text-gray-500">Ultra-low latency</div>
              </div>
            </div>
            
            {/* Market Health Indicator */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Market Health: EXCELLENT</span>
              </div>
              <div className="text-xs text-gray-400">All systems operational • High liquidity • Fast execution</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Tabs */}
          <div className="flex border-b border-orange-500/20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
            {[
              { id: 'trade', label: 'Live Trading', icon: TrendingUp, color: 'orange' },
              { id: 'orders', label: 'Order Book', icon: Layers, color: 'blue' },
              { id: 'analytics', label: 'Market Data', icon: BarChart3, color: 'purple' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-3 px-8 py-5 border-b-2 transition-all duration-300 group relative ${
                  activeTab === id
                    ? `border-${color}-500 text-${color}-400 bg-${color}-500/10 shadow-lg`
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/30 hover:border-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  activeTab === id ? `text-${color}-400` : ''
                }`} />
                <span className="font-medium">{label}</span>
                {activeTab === id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-t-lg" />
                )}
              </button>
            ))}
            
            {/* Real-time indicator */}
            <div className="ml-auto flex items-center gap-3 px-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-green-400">REAL-TIME</span>
              </div>
              <div className="text-xs text-gray-500">
                Last update: {new Date().toLocaleTimeString()}
              </div>
            </div>
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
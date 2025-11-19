'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  FileText, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  Settings,
  Zap as Lightning,
  Shield,
  Target,
  Layers,
  Briefcase,
  Building,
  Globe,
  Cpu,
  Database,
  Network,
  Handshake,
  Server,
  Wifi,
  Eye,
  Gauge,
  Flame,
  Rocket,
  Radio,
  Satellite
} from 'lucide-react'

interface BOSacContract {
  id: string
  type: string
  name: string
  parties: string[]
  value: number
  duration: string
  price: number
  change24h: number
  volume24h: number
  trades24h: number
  status: 'active' | 'pending' | 'executed' | 'expired'
  tier: 'enterprise' | 'institutional' | 'corporate'
  icon: string
  description: string
  region: string
  tps: number
}

interface LiveTransaction {
  id: string
  type: string
  value: number
  parties: string[]
  timestamp: Date
  status: 'executing' | 'completed' | 'settling'
}

function ExchangeContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'trade' | 'global' | 'analytics'>('global')
  const [selectedContract, setSelectedContract] = useState<string>('supply_chain_mega')
  const [isLive, setIsLive] = useState(true)
  const [globalTPS, setGlobalTPS] = useState(3247891)
  const [liveTransactions, setLiveTransactions] = useState<LiveTransaction[]>([])
  
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab === 'trade' || tab === 'global' || tab === 'analytics') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Massive scale bOSacs contract data
  const [contractData, setContractData] = useState<Record<string, BOSacContract>>({
    supply_chain_mega: { 
      id: 'bOSac_SC_001',
      type: 'supply_chain_mega', 
      name: 'Global Supply Chain Network', 
      parties: ['Amazon', 'Walmart', 'FedEx', 'UPS', 'Maersk', 'DHL'],
      value: 2400000000, // $2.4B
      duration: '365 days',
      price: 15847.50, 
      change24h: 18.7, 
      volume24h: 487000000, 
      trades24h: 12847, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Network',
      description: 'AI-optimized global logistics coordination across 67 countries',
      region: 'Global',
      tps: 847291
    },
    ai_compute_consortium: { 
      id: 'bOSac_AI_002',
      type: 'ai_compute_consortium', 
      name: 'AI Compute Consortium', 
      parties: ['OpenAI', 'Google', 'Microsoft', 'Meta', 'NVIDIA', 'Tesla'],
      value: 8900000000, // $8.9B
      duration: '180 days',
      price: 89247.25, 
      change24h: 24.3, 
      volume24h: 1200000000, 
      trades24h: 23941, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'Distributed AI training across 247 data centers globally',
      region: 'Global',
      tps: 1247891
    },
    finance_settlement: { 
      id: 'bOSac_FIN_003',
      type: 'finance_settlement', 
      name: 'Cross-Border Settlement Network', 
      parties: ['JPMorgan', 'SWIFT', 'Bank of America', 'HSBC', 'Deutsche Bank'],
      value: 15600000000, // $15.6B
      duration: '90 days',
      price: 234567.80, 
      change24h: 12.8, 
      volume24h: 2890000000, 
      trades24h: 45782, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Building',
      description: 'Instant cross-border payments and settlements',
      region: 'Global',
      tps: 2847291
    },
    energy_grid: { 
      id: 'bOSac_ENG_004',
      type: 'energy_grid', 
      name: 'Smart Energy Grid Protocol', 
      parties: ['Tesla', 'Shell', 'Exxon', 'BP', 'Chevron', 'TotalEnergies'],
      value: 6700000000, // $6.7B
      duration: '275 days',
      price: 67834.90, 
      change24h: 31.5, 
      volume24h: 890000000, 
      trades24h: 18934, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Lightning',
      description: 'Real-time energy trading and grid optimization',
      region: 'Global',
      tps: 567891
    },
    healthcare_data: { 
      id: 'bOSac_MED_005',
      type: 'healthcare_data', 
      name: 'Global Healthcare Data Exchange', 
      parties: ['Pfizer', 'Johnson & Johnson', 'Moderna', 'Roche', 'Novartis'],
      value: 4300000000, // $4.3B
      duration: '540 days',
      price: 43567.45, 
      change24h: 8.9, 
      volume24h: 234000000, 
      trades24h: 8947, 
      status: 'active',
      tier: 'institutional',
      icon: 'Database',
      description: 'Secure medical data sharing with privacy guarantees',
      region: 'Global',
      tps: 287491
    },
    satellite_network: { 
      id: 'bOSac_SAT_006',
      type: 'satellite_network', 
      name: 'Satellite Internet Coordination', 
      parties: ['SpaceX', 'Amazon', 'OneWeb', 'Telesat', 'Boeing'],
      value: 12800000000, // $12.8B
      duration: '730 days',
      price: 128745.60, 
      change24h: 45.7, 
      volume24h: 567000000, 
      trades24h: 15678, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Satellite',
      description: 'Global satellite internet constellation management',
      region: 'Orbital',
      tps: 967891
    },
    manufacturing_alliance: { 
      id: 'bOSac_MFG_007',
      type: 'manufacturing_alliance', 
      name: 'Advanced Manufacturing Alliance', 
      parties: ['Boeing', 'Airbus', 'General Electric', 'Siemens', 'Caterpillar'],
      value: 9400000000, // $9.4B
      duration: '456 days',
      price: 94673.20, 
      change24h: 19.2, 
      volume24h: 1450000000, 
      trades24h: 28741, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Briefcase',
      description: 'Automated manufacturing and supply coordination',
      region: 'Global',
      tps: 847293
    },
    sovereign_treasury: { 
      id: 'bOSac_GOV_008',
      type: 'sovereign_treasury', 
      name: 'Sovereign Treasury Management', 
      parties: ['Federal Reserve', 'ECB', 'Bank of Japan', 'Bank of England', 'PBOC'],
      value: 45600000000, // $45.6B
      duration: '1095 days',
      price: 456789.10, 
      change24h: 6.4, 
      volume24h: 8900000000, 
      trades24h: 67834, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Shield',
      description: 'Central bank digital currency coordination',
      region: 'Global',
      tps: 3847291
    }
  })

  // Simulate massive real-time activity
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      // Update global TPS
      setGlobalTPS(prev => {
        const variation = (Math.random() - 0.5) * 200000
        return Math.max(2000000, prev + variation)
      })
      
      // Update contract prices with realistic enterprise volatility
      setContractData(prev => {
        const newData = { ...prev }
        Object.keys(newData).forEach(key => {
          const change = (Math.random() - 0.5) * 1000 // Larger price movements for enterprise contracts
          newData[key].price = Math.max(1000, newData[key].price + change)
          newData[key].change24h += (Math.random() - 0.5) * 2
          newData[key].tps = Math.floor(Math.random() * 1000000) + 500000
        })
        return newData
      })
      
      // Generate live transactions
      const newTransaction: LiveTransaction = {
        id: `tx_${Date.now()}`,
        type: Object.keys(contractData)[Math.floor(Math.random() * Object.keys(contractData).length)],
        value: Math.floor(Math.random() * 10000000) + 1000000, // $1M - $10M
        parties: ['Enterprise Corp', 'Global Industries', 'Tech Solutions'],
        timestamp: new Date(),
        status: 'executing'
      }
      
      setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
    }, 150) // Very frequent updates for high-frequency feel
    
    return () => clearInterval(interval)
  }, [isLive])

  const getContractIcon = (iconName: string, tier: string) => {
    const iconClass = `w-5 h-5 ${
      tier === 'enterprise' ? 'text-yellow-400' : 
      tier === 'institutional' ? 'text-blue-400' : 
      'text-gray-400'
    }`
    
    switch (iconName) {
      case 'Network': return <Network className={iconClass} />
      case 'Cpu': return <Cpu className={iconClass} />
      case 'Building': return <Building className={iconClass} />
      case 'Lightning': return <Lightning className={iconClass} />
      case 'Database': return <Database className={iconClass} />
      case 'Satellite': return <Satellite className={iconClass} />
      case 'Briefcase': return <Briefcase className={iconClass} />
      case 'Shield': return <Shield className={iconClass} />
      default: return <FileText className={iconClass} />
    }
  }

  const formatPrice = (price: number) => `₿OS ${price.toLocaleString()}`
  const formatValue = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    return `$${value.toLocaleString()}`
  }
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Massive Scale Header */}
      <div className="relative border-b border-orange-500/20 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-orange-500/5 animate-pulse" />
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-black animate-pulse" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-600 bg-clip-text text-transparent">
                    bOSacs Global Exchange
                  </h1>
                  <p className="text-sm text-gray-400 font-mono">Enterprise Bitcoin OS Atomic Contracts • Global Scale</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                  <span className="text-sm font-bold text-red-400">LIVE HIGH-FREQUENCY</span>
                  <div className="w-px h-4 bg-red-500/50" />
                  <span className="text-xs text-red-300 font-mono">{globalTPS.toLocaleString()} TPS</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Global TVL</div>
                  <div className="text-lg font-bold text-orange-400 font-mono">$147.8B</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">24h Volume</div>
                  <div className="text-lg font-bold text-red-400 font-mono">$52.9B</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Active Enterprises</div>
                  <div className="text-lg font-bold text-yellow-400 font-mono">8,247</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded">
                <Radio className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400">STREAMING</span>
              </div>
              
              <button
                type="button"
                onClick={() => setIsLive(!isLive)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-300"
              >
                {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-sm font-medium">{isLive ? 'Pause Feed' : 'Resume Feed'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Enterprise Contract Sidebar */}
        <div className="w-96 border-r border-orange-500/20 bg-gradient-to-b from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-sm overflow-auto">
          <div className="p-6 border-b border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Flame className="w-4 h-4 text-black animate-pulse" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Enterprise Contracts
              </h3>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-auto">
              {Object.values(contractData).map((contract) => (
                <button
                  key={contract.type}
                  type="button"
                  onClick={() => setSelectedContract(contract.type)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 text-left group border ${
                    selectedContract === contract.type
                      ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50 shadow-lg shadow-red-500/20'
                      : 'bg-gray-800/30 hover:bg-gray-700/40 border-gray-700/50 hover:border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-500/20">
                        {getContractIcon(contract.icon, contract.tier)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-red-400 transition-colors text-sm">
                          {contract.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {contract.parties.length} enterprises • {contract.region}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                      contract.change24h >= 0 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                    }`}>
                      {contract.change24h >= 0 ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      {formatChange(contract.change24h)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-bold font-mono text-white">
                        {formatPrice(contract.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        TVL: {formatValue(contract.value)}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{contract.trades24h.toLocaleString()} trades</div>
                      <div className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
                        {contract.tier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">{contract.description}</div>
                      <div className="text-xs font-mono text-orange-400">
                        {contract.tps.toLocaleString()} TPS
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Transaction Feed */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-red-500 animate-pulse" />
              <h4 className="font-semibold text-red-400">Live Transactions</h4>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-auto">
              {liveTransactions.map((tx, i) => (
                <div key={tx.id} className="bg-gray-800/50 rounded p-3 border-l-2 border-green-500 animate-pulse">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-xs font-mono text-green-400">
                      {tx.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tx.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {formatValue(tx.value)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {tx.parties[0]} → {tx.parties[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Network Status */}
          <div className="p-6 border-t border-gray-700/50">
            <div className="space-y-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Global Network</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-blue-400">{globalTPS.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">Transactions Per Second</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-300">Data Centers</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-purple-400">1,847</span>
                </div>
                <div className="text-xs text-gray-500">Active nodes globally</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lightning className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Settlement</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-yellow-400">0.89s</span>
                </div>
                <div className="text-xs text-gray-500">Average finality time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-red-500/20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
            {[
              { id: 'global', label: 'Global Network', icon: Globe, color: 'red' },
              { id: 'trade', label: 'Enterprise Trading', icon: TrendingUp, color: 'orange' },
              { id: 'analytics', label: 'Network Analytics', icon: BarChart3, color: 'yellow' }
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
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-t-lg" />
                )}
              </button>
            ))}
            
            <div className="ml-auto flex items-center gap-3 px-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                <span className="text-xs font-mono text-red-400">HIGH-FREQUENCY</span>
              </div>
              <div className="text-xs text-gray-500">
                {new Date().toLocaleTimeString()} UTC
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'global' && (
              <div className="space-y-6">
                {/* Global Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-lg p-6 border border-red-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Rocket className="w-8 h-8 text-red-400" />
                      <div>
                        <div className="text-2xl font-bold font-mono">${(52.9).toFixed(1)}B</div>
                        <div className="text-sm text-gray-400">24h Volume</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm">+24.7% from yesterday</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Building className="w-8 h-8 text-blue-400" />
                      <div>
                        <div className="text-2xl font-bold font-mono">8,247</div>
                        <div className="text-sm text-gray-400">Active Enterprises</div>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-sm">Fortune 500 companies</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 rounded-lg p-6 border border-green-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightning className="w-8 h-8 text-green-400" />
                      <div>
                        <div className="text-2xl font-bold font-mono">{globalTPS.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">TPS Global</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm">Real-time processing</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-8 h-8 text-yellow-400" />
                      <div>
                        <div className="text-2xl font-bold font-mono">$147.8B</div>
                        <div className="text-sm text-gray-400">Total Value Locked</div>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-sm">Enterprise capital</div>
                  </div>
                </div>

                {/* Global Activity Map */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-blue-400" />
                    Global Network Activity
                  </h3>
                  <div className="h-96 flex items-center justify-center text-gray-400 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-700/30">
                    <div className="text-center">
                      <Activity className="w-16 h-16 mx-auto mb-4 text-blue-400 animate-pulse" />
                      <p className="text-lg font-semibold">Live Global Network Visualization</p>
                      <p className="text-sm">Real-time contract execution across 67 countries</p>
                      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                        <div>Americas: 1,247,891 TPS</div>
                        <div>EMEA: 998,745 TPS</div>
                        <div>APAC: 1,001,255 TPS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trade' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Enterprise Contract Details */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-lg">{contractData[selectedContract].name}</h3>
                    <div className="text-sm text-gray-400">Enterprise-Grade bOSac Contract</div>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Contract ID</label>
                      <div className="font-mono text-sm text-orange-400">{contractData[selectedContract].id}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Enterprise Parties</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {contractData[selectedContract].parties.map((party, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                            {party}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400">Duration</label>
                        <div className="font-mono text-lg">{contractData[selectedContract].duration}</div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Region</label>
                        <div className="font-mono text-lg">{contractData[selectedContract].region}</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Total Value Locked</label>
                      <div className="font-mono text-2xl font-bold text-yellow-400">{formatValue(contractData[selectedContract].value)}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Processing Capacity</label>
                      <div className="font-mono text-lg text-green-400">{contractData[selectedContract].tps.toLocaleString()} TPS</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Description</label>
                      <div className="text-sm leading-relaxed">{contractData[selectedContract].description}</div>
                    </div>
                  </div>
                </div>

                {/* Enterprise Trading Interface */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold text-lg">Enterprise Contract Rights</h3>
                    <div className="text-sm text-gray-400">High-Value Institutional Trading</div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button className="py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg font-bold text-lg transition-colors">
                        ACQUIRE RIGHTS
                      </button>
                      <button className="py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg font-bold text-lg transition-colors">
                        DIVEST RIGHTS
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Unit Price (₿OS per basis point)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          defaultValue={contractData[selectedContract].price.toFixed(2)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Basis Points (0.01%)</label>
                        <input 
                          type="number" 
                          placeholder="100"
                          min="1"
                          max="10000"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-lg"
                        />
                        <div className="text-xs text-gray-500 mt-1">Minimum: 100 basis points (1%)</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Total Investment (₿OS)</label>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 font-mono text-lg"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-bold text-lg transition-colors">
                        EXECUTE ENTERPRISE TRADE
                      </button>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Available Balance:</span>
                          <span className="font-mono text-lg">847,291.47 ₿OS</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Enterprise Trading Fee:</span>
                          <span className="font-mono">0.01%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Settlement Time:</span>
                          <span className="font-mono text-green-400">0.89s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4 text-xl">Network Performance Analytics</h3>
                  <div className="h-80 flex items-center justify-center text-gray-400 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-700/30">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
                      <p className="text-lg font-semibold">Enterprise Performance Dashboard</p>
                      <p className="text-sm">Real-time analytics for {contractData[selectedContract].name}</p>
                      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-purple-900/20 p-3 rounded">
                          <div className="text-purple-300 font-bold">Throughput</div>
                          <div>{contractData[selectedContract].tps.toLocaleString()} TPS</div>
                        </div>
                        <div className="bg-blue-900/20 p-3 rounded">
                          <div className="text-blue-300 font-bold">Efficiency</div>
                          <div>99.97%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4 text-xl">Enterprise Contract Metrics</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Current Valuation:</span>
                      <span className="font-mono text-xl font-bold">{formatPrice(contractData[selectedContract].price)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">24h Performance:</span>
                      <span className={`font-mono text-xl font-bold ${contractData[selectedContract].change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatChange(contractData[selectedContract].change24h)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Trading Volume:</span>
                      <span className="font-mono text-xl">{formatValue(contractData[selectedContract].volume24h)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Total Value:</span>
                      <span className="font-mono text-xl font-bold text-yellow-400">{formatValue(contractData[selectedContract].value)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Execution Rate:</span>
                      <span className="font-mono text-xl font-bold text-green-400">99.97%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-400">Network Uptime:</span>
                      <span className="font-mono text-xl font-bold text-green-400">99.999%</span>
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Global bOSacs Exchange...</p>
          <p className="text-gray-400 text-sm">Connecting to enterprise network...</p>
        </div>
      </div>
    }>
      <ExchangeContent />
    </Suspense>
  )
}
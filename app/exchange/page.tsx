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
  Handshake
} from 'lucide-react'

interface BOSacContract {
  id: string
  type: 'resource_allocation' | 'partnership' | 'supply_chain' | 'project_coordination' | 'data_sharing' | 'compute_lease' | 'talent_exchange' | 'governance'
  name: string
  parties: string[]
  value: number
  duration: string
  price: number
  change24h: number
  volume24h: number
  trades24h: number
  status: 'active' | 'pending' | 'executed' | 'expired'
  tier: 'enterprise' | 'standard' | 'micro'
  icon: string
  description: string
}

interface MarketOrder {
  id: string
  contractType: string
  side: 'buy' | 'sell'
  price: number
  quantity: number
  timestamp: Date
  status: 'active' | 'filled' | 'cancelled'
}

function ExchangeContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'trade' | 'orders' | 'analytics'>('trade')
  const [selectedContract, setSelectedContract] = useState<string>('resource_allocation')
  const [isLive, setIsLive] = useState(true)
  const [orders, setOrders] = useState<MarketOrder[]>([])
  
  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab === 'trade' || tab === 'orders' || tab === 'analytics') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // bOSacs market data with live updates
  const [contractData, setContractData] = useState<Record<string, BOSacContract>>({
    resource_allocation: { 
      id: 'bOSac_001',
      type: 'resource_allocation', 
      name: 'GPU Resource Allocation', 
      parties: ['TechCorp', 'CloudProvider'],
      value: 50000,
      duration: '30 days',
      price: 125.50, 
      change24h: 12.3, 
      volume24h: 2850, 
      trades24h: 45, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'AI training resource allocation contract'
    },
    partnership: { 
      id: 'bOSac_002',
      type: 'partnership', 
      name: 'Liquid Partnership Agreement', 
      parties: ['StartupA', 'InvestorB', 'TechExpert'],
      value: 25000,
      duration: '90 days',
      price: 85.75, 
      change24h: -3.2, 
      volume24h: 1200, 
      trades24h: 23, 
      status: 'active',
      tier: 'standard',
      icon: 'Handshake',
      description: 'Dynamic profit-sharing partnership'
    },
    supply_chain: { 
      id: 'bOSac_003',
      type: 'supply_chain', 
      name: 'Supply Chain Optimization', 
      parties: ['Manufacturer', 'Supplier1', 'Logistics'],
      value: 75000,
      duration: '60 days',
      price: 95.25, 
      change24h: 8.7, 
      volume24h: 3400, 
      trades24h: 67, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Network',
      description: 'Automated supply chain coordination'
    },
    project_coordination: { 
      id: 'bOSac_004',
      type: 'project_coordination', 
      name: 'Project Management Contract', 
      parties: ['DevTeam', 'ProjectLead', 'QATeam'],
      value: 15000,
      duration: '45 days',
      price: 45.80, 
      change24h: 15.4, 
      volume24h: 890, 
      trades24h: 18, 
      status: 'active',
      tier: 'standard',
      icon: 'Briefcase',
      description: 'Agile project coordination with automatic task allocation'
    },
    data_sharing: { 
      id: 'bOSac_005',
      type: 'data_sharing', 
      name: 'Data Collaboration Agreement', 
      parties: ['DataProvider', 'Analytics', 'Researcher'],
      value: 32000,
      duration: '120 days',
      price: 65.40, 
      change24h: 5.1, 
      volume24h: 1560, 
      trades24h: 31, 
      status: 'active',
      tier: 'standard',
      icon: 'Database',
      description: 'Secure data sharing with privacy guarantees'
    },
    compute_lease: { 
      id: 'bOSac_006',
      type: 'compute_lease', 
      name: 'Compute Resource Lease', 
      parties: ['CloudProvider', 'AICompany'],
      value: 8000,
      duration: '7 days',
      price: 22.35, 
      change24h: -1.8, 
      volume24h: 2100, 
      trades24h: 89, 
      status: 'active',
      tier: 'micro',
      icon: 'Globe',
      description: 'Short-term compute resource leasing'
    },
    talent_exchange: { 
      id: 'bOSac_007',
      type: 'talent_exchange', 
      name: 'Talent Exchange Network', 
      parties: ['TalentPool', 'Company1', 'Company2'],
      value: 40000,
      duration: '180 days',
      price: 110.90, 
      change24h: 22.6, 
      volume24h: 780, 
      trades24h: 12, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Users',
      description: 'Dynamic talent allocation and skill sharing'
    },
    governance: { 
      id: 'bOSac_008',
      type: 'governance', 
      name: 'Governance Framework', 
      parties: ['Community', 'Council', 'Validators'],
      value: 100000,
      duration: '365 days',
      price: 200.25, 
      change24h: 7.9, 
      volume24h: 450, 
      trades24h: 8, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Building',
      description: 'Decentralized governance coordination'
    }
  })

  // Simulate live price updates
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      setContractData(prev => {
        const newData = { ...prev }
        Object.keys(newData).forEach(key => {
          const change = (Math.random() - 0.5) * 2
          newData[key].price = Math.max(1, newData[key].price + change)
          newData[key].change24h += (Math.random() - 0.5) * 1
        })
        return newData
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isLive])

  const getContractIcon = (iconName: string, tier: string) => {
    const iconClass = `w-5 h-5 ${
      tier === 'enterprise' ? 'text-yellow-400' : 
      tier === 'standard' ? 'text-blue-400' : 
      'text-gray-400'
    }`
    
    switch (iconName) {
      case 'Cpu':
        return <Cpu className={iconClass} />
      case 'Handshake':
        return <Handshake className={iconClass} />
      case 'Network':
        return <Network className={iconClass} />
      case 'Briefcase':
        return <Briefcase className={iconClass} />
      case 'Database':
        return <Database className={iconClass} />
      case 'Globe':
        return <Globe className={iconClass} />
      case 'Users':
        return <Users className={iconClass} />
      case 'Building':
        return <Building className={iconClass} />
      default:
        return <FileText className={iconClass} />
    }
  }

  const formatPrice = (price: number) => `₿OS ${price.toFixed(2)}`
  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise':
        return 'text-yellow-400 bg-yellow-500/20'
      case 'standard':
        return 'text-blue-400 bg-blue-500/20'
      case 'micro':
        return 'text-gray-400 bg-gray-500/20'
      default:
        return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Enhanced Header */}
      <div className="relative border-b border-orange-500/20 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5" />
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600 bg-clip-text text-transparent">
                    bOSacs Exchange
                  </h1>
                  <p className="text-sm text-gray-400 font-mono">Bitcoin OS Atomic Contracts Trading</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="text-sm font-medium text-green-400">{isLive ? 'LIVE TRADING' : 'MARKET CLOSED'}</span>
                  <div className="w-px h-4 bg-green-500/30" />
                  <span className="text-xs text-green-300 font-mono">347 active contracts</span>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">Total Value Locked</div>
                  <div className="text-lg font-bold text-orange-400 font-mono">₿OS 2.4M</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">24h Volume</div>
                  <div className="text-lg font-bold text-blue-400 font-mono">₿OS 125K</div>
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
        {/* Contract Selection Sidebar */}
        <div className="w-96 border-r border-orange-500/20 bg-gradient-to-b from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-sm">
          <div className="p-6 border-b border-orange-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                <FileText className="w-4 h-4 text-black" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Active bOSacs
              </h3>
            </div>
            
            <div className="space-y-3">
              {Object.values(contractData).map((contract) => (
                <button
                  key={contract.type}
                  type="button"
                  onClick={() => setSelectedContract(contract.type)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 text-left group border ${
                    selectedContract === contract.type
                      ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/50 shadow-lg shadow-orange-500/20'
                      : 'bg-gray-800/30 hover:bg-gray-700/40 border-gray-700/50 hover:border-orange-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        contract.tier === 'enterprise' ? 'bg-yellow-500/20' :
                        contract.tier === 'standard' ? 'bg-blue-500/20' :
                        'bg-gray-500/20'
                      }`}>
                        {getContractIcon(contract.icon, contract.tier)}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                          {contract.name}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {contract.parties.length} parties • {contract.duration}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      contract.change24h >= 0 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                    }`}>
                      {contract.change24h >= 0 ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
                      {formatChange(contract.change24h)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold font-mono text-white">
                        {formatPrice(contract.price)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Value: ₿OS {(contract.value / 1000).toFixed(0)}K
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{contract.trades24h} trades</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${getTierColor(contract.tier)}`}>
                        {contract.tier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <div className="text-xs text-gray-400">{contract.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Market Statistics */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-orange-500" />
              <h4 className="font-semibold text-orange-400">Market Overview</h4>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-300">Active Contracts</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-orange-400">347</span>
                </div>
                <div className="text-xs text-gray-500">+12 new today</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Active Parties</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-blue-400">1,247</span>
                </div>
                <div className="text-xs text-gray-500">Across all contract types</div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lightning className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Avg Settlement</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-yellow-400">2.3s</span>
                </div>
                <div className="text-xs text-gray-500">Instant Bitcoin settlement</div>
              </div>
            </div>
            
            {/* System Status */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">System Status: OPERATIONAL</span>
              </div>
              <div className="text-xs text-gray-400">All contract types active • Real-time execution</div>
            </div>
          </div>
        </div>

        {/* Main Trading Interface */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-orange-500/20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
            {[
              { id: 'trade', label: 'Contract Trading', icon: TrendingUp, color: 'orange' },
              { id: 'orders', label: 'My Contracts', icon: Layers, color: 'blue' },
              { id: 'analytics', label: 'Market Analytics', icon: BarChart3, color: 'purple' }
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
                {/* Contract Details */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold">Contract Details - {contractData[selectedContract].name}</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Contract ID</label>
                      <div className="font-mono text-sm">{contractData[selectedContract].id}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Parties</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {contractData[selectedContract].parties.map((party, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {party}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Duration</label>
                      <div className="font-mono text-sm">{contractData[selectedContract].duration}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Total Value</label>
                      <div className="font-mono text-lg font-bold">₿OS {contractData[selectedContract].value.toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Description</label>
                      <div className="text-sm">{contractData[selectedContract].description}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Contract Tier</label>
                      <div className={`inline-block px-2 py-1 rounded text-xs ${getTierColor(contractData[selectedContract].tier)}`}>
                        {contractData[selectedContract].tier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trading Interface */}
                <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="p-4 border-b border-gray-800">
                    <h3 className="font-bold">Trade Contract Rights</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button className="py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors">
                        BUY RIGHTS
                      </button>
                      <button className="py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
                        SELL RIGHTS
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Price (₿OS per %)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          defaultValue={contractData[selectedContract].price.toFixed(2)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Percentage (%)</label>
                        <input 
                          type="number" 
                          placeholder="0"
                          max="100"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Total Cost (₿OS)</label>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 font-mono"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
                        Execute Trade
                      </button>
                    </div>

                    <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Available Balance:</span>
                        <span className="font-mono">2,847.23 ₿OS</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Trading Fee:</span>
                        <span className="font-mono">0.1%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-gray-900/50 rounded-lg border border-gray-800">
                <div className="p-4 border-b border-gray-800">
                  <h3 className="font-bold">My Contract Positions</h3>
                </div>
                <div className="p-4">
                  <div className="text-center text-gray-400 py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No active contract positions</p>
                    <p className="text-sm">Trade contract rights to see positions here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4">Contract Performance</h3>
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Performance analytics</p>
                      <p className="text-sm">Track {contractData[selectedContract].name} metrics</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                  <h3 className="font-bold mb-4">Contract Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Price:</span>
                      <span className="font-mono">{formatPrice(contractData[selectedContract].price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Change:</span>
                      <span className={`font-mono ${contractData[selectedContract].change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatChange(contractData[selectedContract].change24h)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">24h Volume:</span>
                      <span className="font-mono">₿OS {contractData[selectedContract].volume24h}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value:</span>
                      <span className="font-mono">₿OS {contractData[selectedContract].value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Execution Rate:</span>
                      <span className="font-mono text-green-400">99.8%</span>
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
          <p className="text-white">Loading bOSacs Exchange...</p>
        </div>
      </div>
    }>
      <ExchangeContent />
    </Suspense>
  )
}
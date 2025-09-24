'use client'

import { useState, useEffect } from 'react'
import { Bitcoin, TrendingUp, TrendingDown, Activity, DollarSign, Users, Lock, Zap, ArrowUpRight, ArrowDownRight, BarChart3, PieChart } from 'lucide-react'
import TopMenuBar from '@/components/TopMenuBar'
import OSTaskbar from '@/components/OSTaskbar'
import DevSidebar from '@/components/DevSidebar'

interface TokenMetric {
  label: string
  value: string
  change: number
  icon: any
}

export default function TokenPage() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [price, setPrice] = useState(0.00042)
  const [priceChange, setPriceChange] = useState(15.34)

  useEffect(() => {
    // Simulate price updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.00001
      setPrice(prev => Math.max(0, prev + change))
      setPriceChange((Math.random() - 0.4) * 10) // Bias towards positive
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Keyboard shortcut for dev sidebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setShowDevSidebar(!showDevSidebar)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDevSidebar])

  const openApp = (appName: string) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName])
    }
    setActiveWindow(appName)
  }

  const metrics: TokenMetric[] = [
    { label: 'Market Cap', value: '$420K', change: 15.34, icon: DollarSign },
    { label: '24h Volume', value: '$12.5K', change: 42.1, icon: Activity },
    { label: 'Holders', value: '1,337', change: 8.5, icon: Users },
    { label: 'Apps Integrated', value: '11', change: 10.0, icon: Zap },
    { label: 'Total Supply', value: '1B $bOS', change: 0, icon: Lock },
    { label: 'Circulating', value: '100M', change: 0, icon: BarChart3 },
  ]

  const holdings = [
    { name: 'Development Fund', amount: '200M $bOS', value: '$84K', percentage: 20 },
    { name: 'Community Treasury', amount: '150M $bOS', value: '$63K', percentage: 15 },
    { name: 'App Developers', amount: '100M $bOS', value: '$42K', percentage: 10 },
    { name: 'Early Contributors', amount: '50M $bOS', value: '$21K', percentage: 5 },
    { name: 'Liquidity Pool', amount: '100M $bOS', value: '$42K', percentage: 10 },
  ]

  return (
    <div className="h-screen flex flex-col relative bg-black">
      <TopMenuBar onOpenApp={openApp} />
      
      <div className="flex-1 flex relative overflow-hidden pb-14">
        {showDevSidebar && <DevSidebar />}
        
        <div className={`flex-1 transition-all duration-300 overflow-auto ${showDevSidebar ? 'md:ml-64' : ''}`}>
          <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-bitcoin-orange">$bOS</span>
                <span className="text-white ml-2">Token</span>
              </h1>
              <p className="text-gray-400">The Bitcoin OS ecosystem token</p>
            </div>

            {/* Price Display */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-bitcoin-orange/20 rounded-full flex items-center justify-center">
                      <span className="text-bitcoin-orange text-xl font-bold">bOS</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Bitcoin OS Token</h2>
                      <span className="text-gray-500 text-sm">$bOS</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-white">
                      ${price.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 })}
                    </span>
                    <div className={`flex items-center gap-1 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceChange >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      <span className="font-medium">{Math.abs(priceChange).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1">Launch Price</div>
                  <div className="text-xl font-bold text-white">$0.00001</div>
                  <div className="text-sm text-gray-500">Jan 1, 2025</div>
                </div>
              </div>

              {/* Price Chart Placeholder */}
              <div className="mt-6 h-64 bg-black/30 rounded-lg border border-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500">Price Chart</p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <div key={metric.label} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                      <Icon className="w-4 h-4 text-bitcoin-orange" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    {metric.change !== 0 && (
                      <div className={`flex items-center gap-1 text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{Math.abs(metric.change)}%</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Holdings Table */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white">Token Distribution</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Allocation</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">Amount</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">Value</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">% of Supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding, index) => (
                      <tr key={index} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-bitcoin-orange/10 rounded-full flex items-center justify-center">
                              <span className="text-bitcoin-orange text-xs font-bold">bOS</span>
                            </div>
                            <span className="text-white font-medium">{holding.name}</span>
                          </div>
                        </td>
                        <td className="text-right px-6 py-4 text-gray-300">{holding.amount}</td>
                        <td className="text-right px-6 py-4 text-white font-medium">{holding.value}</td>
                        <td className="text-right px-6 py-4">
                          <span className="text-sm text-gray-400">{holding.percentage}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ecosystem Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-bitcoin-orange mb-2">
                  <Zap className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-sm text-gray-400">Daily Transactions</div>
                <div className="text-xl font-bold text-white">2,450</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-bitcoin-orange mb-2">
                  <Lock className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-sm text-gray-400">Staking APY</div>
                <div className="text-xl font-bold text-white">42.0%</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-bitcoin-orange mb-2">
                  <Users className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-sm text-gray-400">Active Users</div>
                <div className="text-xl font-bold text-white">1,337</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-bitcoin-orange mb-2">
                  <Activity className="w-6 h-6 mx-auto" />
                </div>
                <div className="text-sm text-gray-400">Apps in Ecosystem</div>
                <div className="text-xl font-bold text-white">11</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <OSTaskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
      />
    </div>
  )
}
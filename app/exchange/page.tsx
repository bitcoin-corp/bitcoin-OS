'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Cpu, HardDrive, Zap, DollarSign, TrendingUp, Server, Wifi, Database } from 'lucide-react'

interface ComputeResource {
  id: string
  type: 'GPU' | 'CPU' | 'Storage' | 'Bandwidth' | 'RAM'
  provider: string
  specs: string
  pricePerHour: number
  availability: 'Available' | 'In Use' | 'Maintenance'
  location: string
}

function ExchangeContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'my-resources'>('buy')
  
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'buy' || tab === 'sell' || tab === 'my-resources') {
      setActiveTab(tab)
    }
  }, [searchParams])
  
  const mockResources: ComputeResource[] = [
    {
      id: '1',
      type: 'GPU',
      provider: 'NVIDIA Corp',
      specs: 'RTX 4090 24GB VRAM',
      pricePerHour: 2.5,
      availability: 'Available',
      location: 'US-East'
    },
    {
      id: '2',
      type: 'GPU',
      provider: 'DataCenter Alpha',
      specs: 'H100 80GB HBM3',
      pricePerHour: 8.0,
      availability: 'Available',
      location: 'EU-West'
    },
    {
      id: '3',
      type: 'CPU',
      provider: 'HomeUser_42',
      specs: 'AMD Ryzen 9 7950X (16 cores)',
      pricePerHour: 0.8,
      availability: 'Available',
      location: 'US-West'
    },
    {
      id: '4',
      type: 'Storage',
      provider: 'CloudVault Inc',
      specs: '10TB NVMe SSD Array',
      pricePerHour: 0.15,
      availability: 'Available',
      location: 'Asia-Pacific'
    },
    {
      id: '5',
      type: 'RAM',
      provider: 'MegaServer Ltd',
      specs: '512GB DDR5-4800',
      pricePerHour: 1.2,
      availability: 'In Use',
      location: 'US-Central'
    },
    {
      id: '6',
      type: 'Bandwidth',
      provider: 'NetSpeed Pro',
      specs: '100Gbps Dedicated Line',
      pricePerHour: 5.0,
      availability: 'Available',
      location: 'Global'
    }
  ]

  const getResourceIcon = (type: ComputeResource['type']) => {
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

  const getStatusColor = (availability: ComputeResource['availability']) => {
    switch (availability) {
      case 'Available':
        return 'text-green-500'
      case 'In Use':
        return 'text-yellow-500'
      case 'Maintenance':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Bitcoin OS Computational Exchange
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Trade computational resources powered by $bOS tokens. Buy GPU time, sell excess bandwidth, 
            rent storage, or offer your computing power to the global marketplace.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Active Resources</span>
              </div>
              <div className="text-2xl font-bold">1,247</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">$bOS Price</span>
              </div>
              <div className="text-2xl font-bold">$0.0042</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-400">Total Compute</span>
              </div>
              <div className="text-2xl font-bold">847 PFLOPS</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Providers</span>
              </div>
              <div className="text-2xl font-bold">2,891</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'buy'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Buy Resources
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'sell'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Sell Resources
          </button>
          <button
            onClick={() => setActiveTab('my-resources')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'my-resources'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            My Resources
          </button>
        </div>

        {/* Content */}
        {activeTab === 'buy' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Computational Resources</h2>
            <div className="grid gap-4">
              {mockResources.map((resource) => (
                <div key={resource.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-orange-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-700 rounded-lg">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{resource.specs}</h3>
                        <p className="text-gray-400">Provider: {resource.provider}</p>
                        <p className="text-gray-400">Location: {resource.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-500">
                        ${resource.pricePerHour}/hr
                      </div>
                      <div className={`text-sm ${getStatusColor(resource.availability)}`}>
                        {resource.availability}
                      </div>
                      <button 
                        className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={resource.availability !== 'Available'}
                      >
                        {resource.availability === 'Available' ? 'Rent Now' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sell' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Sell Your Computational Resources</h2>
            <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">List Your Resources</h3>
              <p className="text-gray-300 mb-6">
                Have excess GPU power, storage, bandwidth, or compute capacity? 
                Turn your idle resources into $bOS tokens by joining our global marketplace.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Resource Type</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2">
                    <option>GPU Computing</option>
                    <option>CPU Processing</option>
                    <option>Storage Space</option>
                    <option>Network Bandwidth</option>
                    <option>RAM Memory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price per Hour ($bOS)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resource Specifications</label>
                  <input 
                    type="text" 
                    placeholder="e.g., RTX 4090 24GB, 100TB SSD"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Availability Hours</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 24/7, Weekends only"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-medium transition-all">
                List Resource
              </button>
            </div>
          </div>
        )}

        {activeTab === 'my-resources' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Resources & Earnings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Active Listings</h3>
                <p className="text-gray-400 mb-4">Resources currently available for rent</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <span>RTX 4080 16GB</span>
                    <span className="text-green-500">$2.1/hr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <span>500GB NVMe Storage</span>
                    <span className="text-green-500">$0.05/hr</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Earnings Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">This Week</span>
                      <span className="font-bold">847.3 $bOS</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '68%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Total Earned</span>
                      <span className="font-bold">12,847.9 $bOS</span>
                    </div>
                    <div className="text-sm text-gray-500">≈ $53.96 USD</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExchangePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExchangeContent />
    </Suspense>
  )
}
'use client'

import { motion } from 'framer-motion'
import { 
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function StatusPage() {
  const [uptime, setUptime] = useState('99.98%')
  
  const services = [
    { name: 'Bitcoin OS Core', status: 'operational', latency: '12ms', uptime: '99.99%', icon: Server },
    { name: 'Token Service ($bOS)', status: 'operational', latency: '8ms', uptime: '99.98%', icon: Database },
    { name: 'Exchange Platform', status: 'operational', latency: '15ms', uptime: '99.97%', icon: Activity },
    { name: 'Developer API', status: 'operational', latency: '10ms', uptime: '99.99%', icon: Globe },
    { name: 'MAIP Protocol', status: 'experimental', latency: '25ms', uptime: '98.50%', icon: Cpu },
    { name: 'Storage Network', status: 'operational', latency: '18ms', uptime: '99.95%', icon: HardDrive },
    { name: 'P2P Network', status: 'operational', latency: '20ms', uptime: '99.96%', icon: Wifi }
  ]

  const incidents = [
    { date: '2025-11-18', type: 'resolved', title: 'Exchange API slowdown', duration: '15 min' },
    { date: '2025-11-15', type: 'resolved', title: 'Token service maintenance', duration: '30 min' },
    { date: '2025-11-10', type: 'resolved', title: 'Network upgrade', duration: '2 hours' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-bitcoin-600/10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <header className="px-6 py-8 border-b border-bitcoin-800/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-10 h-10 text-green-500" />
                    <h1 className="text-3xl font-bold text-white">System Status</h1>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Real-time status of Bitcoin OS services and infrastructure
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-2xl font-bold text-white">All Systems Operational</span>
                  </div>
                  <p className="text-gray-400">Overall Uptime: {uptime}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Services Grid */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Service Status</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gray-800/30 border rounded-xl p-6 ${
                      service.status === 'operational' ? 'border-green-800/30' :
                      service.status === 'experimental' ? 'border-yellow-800/30' :
                      'border-red-800/30'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <service.icon className="w-6 h-6 text-gray-400" />
                        <h3 className="font-semibold text-white">{service.name}</h3>
                      </div>
                      {service.status === 'operational' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {service.status === 'experimental' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                      {service.status === 'down' && <XCircle className="w-5 h-5 text-red-500" />}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Status</span>
                        <span className={`text-sm font-medium ${
                          service.status === 'operational' ? 'text-green-400' :
                          service.status === 'experimental' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Latency</span>
                        <span className="text-white text-sm">{service.latency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400 text-sm">Uptime</span>
                        <span className="text-white text-sm">{service.uptime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Incidents */}
          <section className="px-6 py-12 bg-black/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Recent Incidents</h2>
              
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/30 border border-bitcoin-800/30 rounded-lg p-4 flex items-center gap-4"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">{incident.title}</p>
                      <p className="text-gray-400 text-sm">
                        {incident.date} • Duration: {incident.duration}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                      Resolved
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Metrics */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Performance Metrics</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gray-800/30 rounded-lg p-6 border border-bitcoin-800/30">
                  <div className="text-3xl font-bold text-green-500 mb-2">99.98%</div>
                  <div className="text-gray-400">Average Uptime</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-bitcoin-800/30">
                  <div className="text-3xl font-bold text-blue-500 mb-2">14ms</div>
                  <div className="text-gray-400">Avg Response Time</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-bitcoin-800/30">
                  <div className="text-3xl font-bold text-purple-500 mb-2">1.2M</div>
                  <div className="text-gray-400">API Calls Today</div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-6 border border-bitcoin-800/30">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">0</div>
                  <div className="text-gray-400">Active Incidents</div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
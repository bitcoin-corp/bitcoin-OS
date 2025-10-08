'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Bitcoin, ExternalLink, Code, FileText, Users, GitBranch, Coins, Shield, Zap, Network, Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ContractsPage() {
  const router = useRouter()
  const isMobile = useIsMobile()

  const contracts = [
    {
      name: 'Core Operating System',
      description: 'Base OS kernel, process management, and system services',
      status: 'In Development',
      priority: 'Critical',
      complexity: 'High',
      estimated: '6-12 months',
      icon: Shield,
      color: '#ff6b35',
      technologies: ['Rust', 'WebAssembly', 'Bitcoin Script'],
      deliverables: [
        'Multi-process architecture',
        'Bitcoin SV blockchain integration',
        'Secure sandboxing system',
        'Native BSV transaction handling'
      ]
    },
    {
      name: 'Application Framework',
      description: 'SDK and runtime environment for Bitcoin OS applications',
      status: 'Planning',
      priority: 'Critical',
      complexity: 'High',
      estimated: '4-8 months',
      icon: Code,
      color: '#10b981',
      technologies: ['TypeScript', 'React', 'Bitcoin SV APIs'],
      deliverables: [
        'Developer SDK',
        'App lifecycle management',
        'Inter-app communication protocols',
        'Native Bitcoin wallet integration'
      ]
    },
    {
      name: 'Decentralized Storage Layer',
      description: 'Distributed file system using Bitcoin SV blockchain',
      status: 'Research',
      priority: 'High',
      complexity: 'Very High',
      estimated: '8-12 months',
      icon: Network,
      color: '#3b82f6',
      technologies: ['IPFS', 'Bitcoin SV', 'Merkle Trees'],
      deliverables: [
        'Blockchain storage protocols',
        'Distributed file indexing',
        'Content addressing system',
        'Redundancy and recovery mechanisms'
      ]
    },
    {
      name: 'Identity & Security System',
      description: 'Bitcoin-based identity management and authentication',
      status: 'Design',
      priority: 'High',
      complexity: 'High',
      estimated: '3-6 months',
      icon: Users,
      color: '#8b5cf6',
      technologies: ['Bitcoin Script', 'Elliptic Curves', 'Zero-Knowledge Proofs'],
      deliverables: [
        'Self-sovereign identity protocols',
        'Multi-signature authentication',
        'Privacy-preserving verification',
        'Biometric integration options'
      ]
    },
    {
      name: 'Native Bitcoin Wallet',
      description: 'Integrated wallet with advanced Bitcoin SV features',
      status: 'Beta',
      priority: 'Critical',
      complexity: 'Medium',
      estimated: '2-4 months',
      icon: Bitcoin,
      color: '#ffd700',
      technologies: ['Bitcoin SV', 'WebRTC', 'Hardware Security Modules'],
      deliverables: [
        'Multi-key wallet architecture',
        'Smart contract integration',
        'Hardware wallet support'
      ]
    },
    {
      name: 'App Marketplace',
      description: 'Decentralized application store and distribution platform',
      status: 'Planning',
      priority: 'Medium',
      complexity: 'Medium',
      estimated: '3-6 months',
      icon: Globe,
      color: '#f59e0b',
      technologies: ['Smart Contracts', 'IPFS', 'Reputation Systems'],
      deliverables: [
        'Decentralized app discovery',
        'Automatic updates system',
        'Developer revenue sharing',
        'Quality assurance protocols'
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'beta': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'in development': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'design': return 'text-purple-400 bg-purple-400/10 border-purple-400/20'
      case 'planning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
      case 'research': return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  if (isMobile) {
    return (
      <div className="h-full overflow-auto bg-gradient-to-b from-gray-900 to-black">
        
        {/* Mobile Header */}
        <div className="bg-black/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-black" />
            </div>
            <h1 className="text-xl font-bold text-white">Contracts</h1>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 pb-20">
          <div className="space-y-4">
            {contracts.map((contract, index) => {
              const Icon = contract.icon
              return (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: contract.color + '20', border: `1px solid ${contract.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: contract.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1 text-sm">{contract.name}</h3>
                      <p className="text-gray-400 text-xs mb-2">{contract.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded border ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                        <span className={getPriorityColor(contract.priority)}>
                          {contract.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-gray-900 to-black p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={() => router.push('/')}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">Development Contracts</h1>
                    <p className="text-gray-400">Bitcoin Operating System Core Components</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-bitcoin-orange" />
                  About Bitcoin OS Development
                </h2>
                <p className="text-gray-300 mb-4">
                  Bitcoin Operating System is a revolutionary decentralized operating system built on the Bitcoin SV blockchain. 
                  Our development contracts define the core components needed to create a fully functional, secure, and scalable 
                  operating system that leverages the power of Bitcoin's unlimited block size and programmable money capabilities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Security-First Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Bitcoin SV Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Decentralized By Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contracts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {contracts.map((contract, index) => {
                const Icon = contract.icon
                return (
                  <div key={index} className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/60 transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: contract.color + '20', border: `2px solid ${contract.color}40` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: contract.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2">{contract.name}</h3>
                        <p className="text-gray-400 mb-3">{contract.description}</p>
                        
                        {/* Status and Priority */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500 text-sm">Priority:</span>
                            <span className={`text-sm font-medium ${getPriorityColor(contract.priority)}`}>
                              {contract.priority}
                            </span>
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {contract.technologies.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Deliverables */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Key Deliverables</h4>
                          <ul className="space-y-1">
                            {contract.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <div className="w-1 h-1 bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-400">{deliverable}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Estimated Timeline:</span>
                          <span className="text-gray-300 font-medium">{contract.estimated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-bitcoin-orange/20 to-orange-500/20 border border-bitcoin-orange/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-bitcoin-orange rounded-xl flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Ready to Contribute?</h3>
                  <p className="text-gray-300 mb-4">
                    Join our development community and help build the future of decentralized computing. 
                    These contracts represent opportunities for developers, researchers, and organizations 
                    to contribute to the Bitcoin OS ecosystem.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://github.com/bitcoin-apps-suite/bitcoin-OS" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-bitcoin-orange text-black font-medium rounded-lg hover:bg-orange-500 transition-colors flex items-center gap-2"
                    >
                      View on GitHub
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors">
                      Contact Development Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}
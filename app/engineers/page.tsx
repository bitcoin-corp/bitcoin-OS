'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Database,
  Cpu,
  Network,
  Shield,
  Layers,
  GitBranch,
  Zap,
  Server,
  Code,
  Terminal,
  FileCode,
  Package,
  Cloud,
  Lock,
  Activity,
  BarChart3,
  Gauge,
  HardDrive,
  Wifi,
  Globe,
  Braces,
  Bug,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Wrench
} from 'lucide-react'

type TabType = 'architecture' | 'protocols' | 'implementation' | 'security' | 'performance'

export default function EngineersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('architecture')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const tabs = [
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'protocols', label: 'Protocol Specs', icon: GitBranch },
    { id: 'implementation', label: 'Implementation', icon: Code },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Gauge }
  ]

  const architectureSpecs = {
    overview: {
      title: 'Bitcoin OS Architecture',
      description: 'Distributed operating system built on Bitcoin SV blockchain',
      layers: [
        {
          name: 'Application Layer',
          components: ['Bitcoin Apps', 'Smart Contracts', 'User Interfaces'],
          protocols: ['HTTP/HTTPS', 'WebSocket', 'GraphQL', 'REST']
        },
        {
          name: 'Service Layer',
          components: ['Compute Exchange', 'Token Service', 'Identity Service'],
          protocols: ['$bOS Protocol', 'MAIP', 'BOSac Contracts']
        },
        {
          name: 'Consensus Layer',
          components: ['Transaction Processing', 'Block Validation', 'State Management'],
          protocols: ['Bitcoin Script', 'Merkle Trees', 'UTXO Model']
        },
        {
          name: 'Network Layer',
          components: ['P2P Network', 'TeraNode', 'SPV Nodes'],
          protocols: ['TCP/IP', 'UDP', 'libp2p']
        },
        {
          name: 'Storage Layer',
          components: ['Distributed Storage', 'IPFS', 'On-chain Data'],
          protocols: ['IPFS', 'BitTorrent', 'Metanet']
        }
      ]
    },
    components: [
      {
        name: 'TeraNode Integration',
        type: 'Infrastructure',
        description: 'Enterprise-grade Bitcoin node capable of 1M+ TPS',
        specs: {
          throughput: '1,000,000+ TPS',
          blockSize: 'Unbounded',
          latency: '< 2 seconds',
          scalability: 'Horizontal scaling',
          requirements: '64GB RAM minimum, NVMe SSD'
        }
      },
      {
        name: 'Compute Exchange',
        type: 'Core Service',
        description: 'Decentralized marketplace for computational resources',
        specs: {
          resources: ['GPU', 'CPU', 'Memory', 'Storage', 'Network'],
          contracts: 'BOSac (Bitcoin OS Atomic Contracts)',
          pricing: 'Dynamic Coasian pricing model',
          settlement: 'Atomic swaps via Bitcoin Script'
        }
      },
      {
        name: '$bOS Token System',
        type: 'Economic Layer',
        description: 'Native utility token for resource allocation',
        specs: {
          standard: 'BSV-20 compatible',
          supply: '1,000,000,000 $bOS',
          distribution: 'Mining rewards + staking',
          utility: 'Compute resource payments'
        }
      }
    ]
  }

  const protocolSpecs = {
    bosac: {
      name: 'BOSac Protocol',
      version: '1.0.0',
      description: 'Bitcoin OS Atomic Contracts for resource trading',
      features: [
        'Atomic execution without intermediaries',
        'Multi-party contracts',
        'Time-locked conditions',
        'Escrow capabilities',
        'Programmable resource allocation'
      ],
      implementation: `
// BOSac Contract Example
interface BOSacContract {
  id: string;
  parties: Address[];
  resources: ResourceRequest[];
  payment: PaymentTerms;
  conditions: ContractConditions;
  signatures: Signature[];
  
  execute(): Promise<ExecutionResult>;
  verify(): boolean;
  cancel(): Promise<void>;
}

class ResourceContract implements BOSacContract {
  async execute() {
    // Validate all conditions
    if (!this.verify()) {
      throw new Error('Contract validation failed');
    }
    
    // Lock resources
    await this.lockResources();
    
    // Execute atomic swap
    const tx = await this.createTransaction();
    await tx.broadcast();
    
    // Release resources to buyer
    await this.transferResources();
    
    return { success: true, txId: tx.id };
  }
}
      `
    },
    networking: {
      name: 'P2P Network Protocol',
      version: '2.0.0',
      description: 'Peer-to-peer communication protocol for Bitcoin OS nodes',
      features: [
        'NAT traversal',
        'End-to-end encryption',
        'DHT-based discovery',
        'Multi-path routing',
        'DDoS protection'
      ],
      specifications: {
        transport: 'TCP/UDP hybrid',
        encryption: 'TLS 1.3 + libsodium',
        discovery: 'Kademlia DHT',
        messageFormat: 'Protocol Buffers',
        maxPeers: 256
      }
    }
  }

  const implementationGuides = {
    gettingStarted: {
      title: 'Bitcoin OS Development Setup',
      requirements: [
        'Node.js 18+ or Rust 1.70+',
        'Bitcoin SV Node (TeraNode recommended)',
        'Docker & Kubernetes',
        'Min 16GB RAM, 500GB SSD'
      ],
      installation: `
# Clone Bitcoin OS Core
git clone https://github.com/bitcoin-os/core
cd bitcoin-os-core

# Install dependencies
npm install

# Configure environment
cp .env.example .env
nano .env

# Run development node
npm run dev:node

# Deploy smart contracts
npm run deploy:contracts
      `
    },
    apis: [
      {
        name: 'Resource API',
        endpoint: '/api/v1/resources',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        authentication: 'Bearer token (JWT)',
        rateLimit: '1000 req/min'
      },
      {
        name: 'Contract API',
        endpoint: '/api/v1/contracts',
        methods: ['GET', 'POST'],
        authentication: 'Bitcoin signature',
        rateLimit: '100 req/min'
      },
      {
        name: 'Token API',
        endpoint: '/api/v1/tokens',
        methods: ['GET', 'POST', 'PATCH'],
        authentication: 'OAuth 2.0',
        rateLimit: '500 req/min'
      }
    ]
  }

  const securitySpecs = {
    encryption: {
      title: 'Encryption Standards',
      algorithms: [
        'ECDSA secp256k1 for signatures',
        'AES-256-GCM for data encryption',
        'SHA-256 for hashing',
        'Argon2id for key derivation'
      ]
    },
    authentication: {
      title: 'Authentication Methods',
      methods: [
        'Bitcoin address-based auth',
        'Multi-signature validation',
        'Hardware wallet integration',
        'Biometric options (mobile)'
      ]
    },
    auditing: {
      title: 'Security Auditing',
      practices: [
        'Automated vulnerability scanning',
        'Smart contract formal verification',
        'Penetration testing quarterly',
        'Code review requirements'
      ]
    }
  }

  const performanceMetrics = {
    benchmarks: [
      { metric: 'Transaction Throughput', target: '1M+ TPS', current: '850K TPS', status: 'optimizing' },
      { metric: 'Block Propagation', target: '< 1 second', current: '0.8 seconds', status: 'achieved' },
      { metric: 'Smart Contract Execution', target: '< 100ms', current: '75ms', status: 'achieved' },
      { metric: 'Resource Allocation', target: '< 500ms', current: '420ms', status: 'achieved' },
      { metric: 'Network Latency', target: '< 50ms', current: '45ms', status: 'achieved' }
    ],
    optimization: {
      techniques: [
        'Parallel transaction processing',
        'UTXO set caching',
        'Memory pool optimization',
        'Zero-copy networking',
        'JIT compilation for scripts'
      ]
    }
  }

  const renderArchitecture = () => (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">{architectureSpecs.overview.title}</h3>
        <p className="text-gray-300 mb-6">{architectureSpecs.overview.description}</p>
        
        {/* Architecture Layers */}
        <div className="space-y-4">
          {architectureSpecs.overview.layers.map((layer, index) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{layer.name}</h4>
                <Layers className="w-5 h-5 text-bitcoin-500" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm text-gray-400 mb-2">Components</h5>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map(comp => (
                      <span key={comp} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm text-gray-400 mb-2">Protocols</h5>
                  <div className="flex flex-wrap gap-2">
                    {layer.protocols.map(proto => (
                      <span key={proto} className="px-2 py-1 bg-bitcoin-500/20 rounded text-xs text-bitcoin-400">
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Components */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {architectureSpecs.components.map((component, index) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-bitcoin-500/10 rounded-lg">
                {component.type === 'Infrastructure' ? <Server className="w-6 h-6 text-bitcoin-500" /> :
                 component.type === 'Core Service' ? <Cpu className="w-6 h-6 text-bitcoin-500" /> :
                 <Database className="w-6 h-6 text-bitcoin-500" />}
              </div>
              <div>
                <h4 className="font-semibold text-white">{component.name}</h4>
                <span className="text-xs text-gray-400">{component.type}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4">{component.description}</p>
            <div className="space-y-2">
              {Object.entries(component.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="text-white text-right">{
                    typeof value === 'string' ? value : 
                    Array.isArray(value) ? value.join(', ') : 
                    JSON.stringify(value)
                  }</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderProtocols = () => (
    <div className="space-y-6">
      {/* BOSac Protocol */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{protocolSpecs.bosac.name}</h3>
            <span className="text-sm text-gray-400">Version {protocolSpecs.bosac.version}</span>
          </div>
          <Package className="w-8 h-8 text-bitcoin-500" />
        </div>
        <p className="text-gray-300 mb-4">{protocolSpecs.bosac.description}</p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">Features</h4>
          <div className="space-y-2">
            {protocolSpecs.bosac.features.map(feature => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Implementation Example</h4>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono">
              <code>{protocolSpecs.bosac.implementation}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Network Protocol */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{protocolSpecs.networking.name}</h3>
            <span className="text-sm text-gray-400">Version {protocolSpecs.networking.version}</span>
          </div>
          <Network className="w-8 h-8 text-bitcoin-500" />
        </div>
        <p className="text-gray-300 mb-6">{protocolSpecs.networking.description}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-3">Features</h4>
            <div className="space-y-2">
              {protocolSpecs.networking.features.map(feature => (
                <div key={feature} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-bitcoin-500" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Specifications</h4>
            <div className="space-y-2">
              {Object.entries(protocolSpecs.networking.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="text-white font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderImplementation = () => (
    <div className="space-y-6">
      {/* Getting Started */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">{implementationGuides.gettingStarted.title}</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">System Requirements</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {implementationGuides.gettingStarted.requirements.map(req => (
              <div key={req} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-300 text-sm">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Installation</h4>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono">
              <code>{implementationGuides.gettingStarted.installation}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">API Reference</h3>
        <div className="space-y-4">
          {implementationGuides.apis.map(api => (
            <div key={api.name} className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{api.name}</h4>
                <code className="text-sm text-bitcoin-400 bg-gray-900 px-2 py-1 rounded">
                  {api.endpoint}
                </code>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Methods:</span>
                  <div className="flex gap-1 mt-1">
                    {api.methods.map(method => (
                      <span key={method} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-white">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Auth:</span>
                  <div className="text-white mt-1">{api.authentication}</div>
                </div>
                <div>
                  <span className="text-gray-400">Rate Limit:</span>
                  <div className="text-white mt-1">{api.rateLimit}</div>
                </div>
                <div>
                  <a href="#" className="flex items-center gap-1 text-bitcoin-400 hover:text-bitcoin-300 mt-5">
                    <BookOpen className="w-4 h-4" />
                    <span>Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSecurity = () => (
    <div className="space-y-6">
      {Object.values(securitySpecs).map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-bitcoin-500" />
            <h3 className="text-xl font-bold text-white">{section.title}</h3>
          </div>
          <div className="space-y-3">
            {(() => {
              const items = 'algorithms' in section ? section.algorithms :
                           'methods' in section ? section.methods :
                           'practices' in section ? section.practices : [];
              return items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ));
            })()}
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Benchmarks */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Performance Benchmarks</h3>
        <div className="space-y-3">
          {performanceMetrics.benchmarks.map(benchmark => (
            <div key={benchmark.metric} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-bitcoin-500" />
                <span className="text-white font-medium">{benchmark.metric}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Target</div>
                  <div className="text-white font-mono">{benchmark.target}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Current</div>
                  <div className="text-white font-mono">{benchmark.current}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  benchmark.status === 'achieved' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {benchmark.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Techniques */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Optimization Techniques</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {performanceMetrics.optimization.techniques.map(technique => (
            <div key={technique} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-300">{technique}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'architecture': return renderArchitecture()
      case 'protocols': return renderProtocols()
      case 'implementation': return renderImplementation()
      case 'security': return renderSecurity()
      case 'performance': return renderPerformance()
      default: return null
    }
  }

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-bitcoin-950 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-10 h-10 text-bitcoin-500" />
            <h1 className="text-4xl font-bold text-white">Engineers Specification</h1>
          </div>
          <p className="text-gray-300 text-lg">
            Complete technical documentation for Bitcoin OS development. Architecture, protocols, and implementation guides.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-bitcoin-500 text-white'
                  : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </motion.div>
    </div>
  )
}
'use client'

import { useState, useEffect, Suspense } from 'react'
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
  resourceType: 'GPU' | 'CPU' | 'Memory' | 'Storage' | 'Network' | 'Hybrid'
  utilizationRate: number
  resourceSupply: number
  resourceDemand: number
  aiOptimizationScore: number
  liquidity?: number
  circulation?: number
}

interface ResourceMetrics {
  type: 'GPU' | 'CPU' | 'Memory' | 'Storage' | 'Network'
  price: number
  priceChange24h: number
  supply: number
  demand: number
  utilizationRate: number
  scarcityIndex: number
  contracts: number
  aiEfficiency: number
}

interface RevenueMetrics {
  totalFees24h: number
  holderDividends: number
  distributionRate: number
  nextDistribution: Date
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
  const [selectedContract, setSelectedContract] = useState<string>('ai_training_gpu')
  const [isLive, setIsLive] = useState(true)
  const [globalTPS, setGlobalTPS] = useState(3247891)
  const [liveTransactions, setLiveTransactions] = useState<LiveTransaction[]>([])
  const [resourceMetrics, setResourceMetrics] = useState<Record<string, ResourceMetrics>>({})
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics>({
    totalFees24h: 529000000, // $529M
    holderDividends: 529000000 * 0.75, // 75% to holders
    distributionRate: 0.01, // 1% fee
    nextDistribution: new Date(Date.now() + 3600000) // 1 hour
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  

  // Initialize expanded resource metrics
  useEffect(() => {
    setResourceMetrics({
      // Primary Resources
      GPU: { type: 'GPU', price: 12847.50, priceChange24h: 24.7, supply: 2847291, demand: 3456789, utilizationRate: 0.847, scarcityIndex: 1.21, contracts: 12847, aiEfficiency: 0.987 },
      CPU: { type: 'CPU', price: 4567.25, priceChange24h: 12.3, supply: 8945672, demand: 7234567, utilizationRate: 0.745, scarcityIndex: 0.81, contracts: 8934, aiEfficiency: 0.954 },
      Memory: { type: 'Memory', price: 2847.80, priceChange24h: 18.9, supply: 12847291, demand: 15647382, utilizationRate: 0.923, scarcityIndex: 1.18, contracts: 15672, aiEfficiency: 0.972 },
      Storage: { type: 'Storage', price: 1234.45, priceChange24h: 8.4, supply: 45672891, demand: 42847392, utilizationRate: 0.678, scarcityIndex: 0.94, contracts: 28471, aiEfficiency: 0.941 },
      Network: { type: 'Network', price: 6789.15, priceChange24h: 31.2, supply: 5647291, demand: 8947382, utilizationRate: 0.845, scarcityIndex: 1.58, contracts: 9847, aiEfficiency: 0.995 },
      
      // Specialized Resources
      'GPU-H100': { type: 'GPU', price: 45629.80, priceChange24h: 67.4, supply: 284729, demand: 1456789, utilizationRate: 0.987, scarcityIndex: 5.12, contracts: 4729, aiEfficiency: 0.999 },
      'CPU-ARM': { type: 'CPU', price: 8934.15, priceChange24h: 28.7, supply: 3456789, demand: 4567891, utilizationRate: 0.823, scarcityIndex: 1.32, contracts: 12847, aiEfficiency: 0.976 },
      'Memory-HBM': { type: 'Memory', price: 18947.50, priceChange24h: 45.2, supply: 1847291, demand: 4567382, utilizationRate: 0.954, scarcityIndex: 2.47, contracts: 5672, aiEfficiency: 0.989 },
      'Storage-NVMe': { type: 'Storage', price: 3847.90, priceChange24h: 15.6, supply: 15672891, demand: 18947382, utilizationRate: 0.756, scarcityIndex: 1.21, contracts: 18471, aiEfficiency: 0.965 },
      'Network-5G': { type: 'Network', price: 12847.25, priceChange24h: 52.8, supply: 2847291, demand: 6947382, utilizationRate: 0.912, scarcityIndex: 2.44, contracts: 7847, aiEfficiency: 0.993 },
      
      // Enterprise Resources
      'Quantum-QPU': { type: 'CPU', price: 247891.30, priceChange24h: 124.7, supply: 8472, demand: 284729, utilizationRate: 0.999, scarcityIndex: 33.61, contracts: 847, aiEfficiency: 1.000 },
      'Edge-Computing': { type: 'Network', price: 7834.60, priceChange24h: 22.4, supply: 8947291, demand: 12847382, utilizationRate: 0.734, scarcityIndex: 1.44, contracts: 24817, aiEfficiency: 0.954 },
      'Neuromorphic': { type: 'CPU', price: 89472.80, priceChange24h: 89.3, supply: 47291, demand: 284729, utilizationRate: 0.945, scarcityIndex: 6.02, contracts: 1247, aiEfficiency: 0.998 },
      'Photonic': { type: 'Network', price: 34829.40, priceChange24h: 78.6, supply: 128472, demand: 847291, utilizationRate: 0.892, scarcityIndex: 6.59, contracts: 2847, aiEfficiency: 0.997 },
      'DNA-Storage': { type: 'Storage', price: 128947.70, priceChange24h: 156.2, supply: 2847, demand: 84729, utilizationRate: 0.978, scarcityIndex: 29.75, contracts: 184, aiEfficiency: 0.999 }
    })
  }, [])

  // Dynamic resource-based bOSacs contract data
  const [contractData, setContractData] = useState<Record<string, BOSacContract>>({
    ai_training_gpu: { 
      id: 'bOSac_GPU_001',
      type: 'ai_training_gpu', 
      name: '$bVideo AI Training Cluster', 
      parties: ['OpenAI', 'Meta', 'Google', 'Anthropic', 'xAI', 'Mistral'],
      value: 8900000000, // $8.9B
      duration: '180 days',
      price: 89247.50, 
      change24h: 34.7, 
      volume24h: 2400000000, 
      trades24h: 45872, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'High-demand GPU clusters for AI video generation causing GPU scarcity',
      region: 'Global',
      tps: 2847291,
      resourceType: 'GPU',
      utilizationRate: 0.947,
      resourceSupply: 2847291,
      resourceDemand: 4567382,
      aiOptimizationScore: 0.987
    },
    cloud_cpu_compute: { 
      id: 'bOSac_CPU_002',
      type: 'cloud_cpu_compute', 
      name: '$bCompute CPU Federation', 
      parties: ['AWS', 'Google Cloud', 'Azure', 'Oracle', 'IBM', 'Alibaba'],
      value: 6700000000, // $6.7B
      duration: '180 days',
      price: 45627.25, 
      change24h: 12.3, 
      volume24h: 890000000, 
      trades24h: 18934, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Server',
      description: 'Distributed CPU workloads with balanced supply and moderate demand',
      region: 'Global',
      tps: 1247891,
      resourceType: 'CPU',
      utilizationRate: 0.745,
      resourceSupply: 8945672,
      resourceDemand: 7234567,
      aiOptimizationScore: 0.954
    },
    memory_intensive_ai: { 
      id: 'bOSac_MEM_003',
      type: 'memory_intensive_ai', 
      name: '$bAI Memory Consortium', 
      parties: ['Tesla', 'Palantir', 'DataBricks', 'Scale AI', 'Hugging Face'],
      value: 12600000000, // $12.6B
      duration: '90 days',
      price: 127834.80, 
      change24h: 18.9, 
      volume24h: 1890000000, 
      trades24h: 25782, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Database',
      description: 'High-memory AI workloads causing memory scarcity - prices rising',
      region: 'Global',
      tps: 1547291,
      resourceType: 'Memory',
      utilizationRate: 0.923,
      resourceSupply: 12847291,
      resourceDemand: 15647382,
      aiOptimizationScore: 0.972
    },
    distributed_storage: { 
      id: 'bOSac_STO_004',
      type: 'distributed_storage', 
      name: '$bStorage Global Network', 
      parties: ['Filecoin', 'Storj', 'AWS S3', 'Google Drive', 'Dropbox', 'IPFS'],
      value: 4300000000, // $4.3B
      duration: '275 days',
      price: 28734.90, 
      change24h: 8.4, 
      volume24h: 560000000, 
      trades24h: 28471, 
      status: 'active',
      tier: 'institutional',
      icon: 'Database',
      description: 'Abundant storage capacity with low utilization - cheap pricing',
      region: 'Global',
      tps: 567891,
      resourceType: 'Storage',
      utilizationRate: 0.678,
      resourceSupply: 45672891,
      resourceDemand: 42847392,
      aiOptimizationScore: 0.941
    },
    network_bandwidth: { 
      id: 'bOSac_NET_005',
      type: 'network_bandwidth', 
      name: '$bNetwork Global Bandwidth', 
      parties: ['Cloudflare', 'Akamai', 'AWS CloudFront', 'Fastly', 'KeyCDN'],
      value: 9800000000, // $9.8B
      duration: '540 days',
      price: 67834.45, 
      change24h: 31.2, 
      volume24h: 1234000000, 
      trades24h: 19847, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Network',
      description: 'High-demand network capacity for streaming and edge computing',
      region: 'Global',
      tps: 987491,
      resourceType: 'Network',
      utilizationRate: 0.845,
      resourceSupply: 5647291,
      resourceDemand: 8947382,
      aiOptimizationScore: 0.995
    },
    hybrid_ai_cluster: { 
      id: 'bOSac_HYB_006',
      type: 'hybrid_ai_cluster', 
      name: '$bAI Hybrid Processing', 
      parties: ['NVIDIA', 'AMD', 'Intel', 'Qualcomm', 'Apple', 'Google'],
      value: 15800000000, // $15.8B
      duration: '730 days',
      price: 158745.60, 
      change24h: 42.7, 
      volume24h: 2567000000, 
      trades24h: 35678, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'Mixed GPU/CPU/Memory workloads for complex AI training',
      region: 'Global',
      tps: 1967891,
      resourceType: 'Hybrid',
      utilizationRate: 0.892,
      resourceSupply: 8947382,
      resourceDemand: 12847391,
      aiOptimizationScore: 0.981
    },
    quantum_compute: { 
      id: 'bOSac_QUA_007',
      type: 'quantum_compute', 
      name: '$bQuantum Computing Pool', 
      parties: ['IBM', 'Google', 'IonQ', 'Rigetti', 'D-Wave', 'Microsoft'],
      value: 18400000000, // $18.4B
      duration: '456 days',
      price: 184673.20, 
      change24h: 67.2, 
      volume24h: 3450000000, 
      trades24h: 8741, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Lightning',
      description: 'Extremely scarce quantum computing resources - premium pricing',
      region: 'Global',
      tps: 247293,
      resourceType: 'CPU',
      utilizationRate: 0.987,
      resourceSupply: 847291,
      resourceDemand: 4567382,
      aiOptimizationScore: 0.999
    },
    edge_computing: { 
      id: 'bOSac_EDG_008',
      type: 'edge_computing', 
      name: '$bEdge Global Network', 
      parties: ['Cloudflare', 'AWS Wavelength', 'Azure Edge', 'Google Edge', 'Fastly'],
      value: 7800000000, // $7.8B
      duration: '365 days',
      price: 78456.10, 
      change24h: 15.4, 
      volume24h: 1890000000, 
      trades24h: 47834, 
      status: 'active',
      tier: 'enterprise',
      icon: 'Wifi',
      description: 'Edge computing resources for low-latency applications',
      region: 'Global',
      tps: 2847291,
      resourceType: 'Network',
      utilizationRate: 0.756,
      resourceSupply: 12847391,
      resourceDemand: 11234567,
      aiOptimizationScore: 0.967
    },
    
    // Specialized GPU Contracts
    h100_ai_training: {
      id: 'bOSac_H100_009',
      type: 'h100_ai_training',
      name: '$bH100 Ultra Performance',
      parties: ['OpenAI', 'Anthropic', 'DeepMind', 'xAI', 'Cohere', 'Stability'],
      value: 24700000000, // $24.7B
      duration: '90 days',
      price: 456789.30,
      change24h: 67.4,
      volume24h: 4890000000,
      trades24h: 12847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'H100 GPU clusters - extremely scarce, premium AI training',
      region: 'Global',
      tps: 847291,
      resourceType: 'GPU',
      utilizationRate: 0.987,
      resourceSupply: 284729,
      resourceDemand: 1456789,
      aiOptimizationScore: 0.999
    },
    
    arm_mobile_compute: {
      id: 'bOSac_ARM_010',
      type: 'arm_mobile_compute',
      name: '$bARM Mobile Federation',
      parties: ['Apple', 'Qualcomm', 'Samsung', 'MediaTek', 'ARM Holdings'],
      value: 8900000000, // $8.9B
      duration: '270 days',
      price: 89347.15,
      change24h: 28.7,
      volume24h: 1560000000,
      trades24h: 28471,
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'ARM-based mobile and edge processing power',
      region: 'Global',
      tps: 1247891,
      resourceType: 'CPU',
      utilizationRate: 0.823,
      resourceSupply: 3456789,
      resourceDemand: 4567891,
      aiOptimizationScore: 0.976
    },
    
    hbm_memory_consortium: {
      id: 'bOSac_HBM_011',
      type: 'hbm_memory_consortium',
      name: '$bHBM Ultra-Fast Memory',
      parties: ['Samsung', 'SK Hynix', 'Micron', 'NVIDIA', 'AMD'],
      value: 15600000000, // $15.6B
      duration: '180 days',
      price: 189475.50,
      change24h: 45.2,
      volume24h: 2890000000,
      trades24h: 15672,
      status: 'active',
      tier: 'enterprise',
      icon: 'Database',
      description: 'High-bandwidth memory for AI workloads - massive demand',
      region: 'Global',
      tps: 1547291,
      resourceType: 'Memory',
      utilizationRate: 0.954,
      resourceSupply: 1847291,
      resourceDemand: 4567382,
      aiOptimizationScore: 0.989
    },
    
    nvme_ultra_storage: {
      id: 'bOSac_NVME_012',
      type: 'nvme_ultra_storage',
      name: '$bNVMe Ultra-Speed Storage',
      parties: ['Western Digital', 'Seagate', 'Samsung', 'Intel', 'Kioxia'],
      value: 6700000000, // $6.7B
      duration: '450 days',
      price: 38479.90,
      change24h: 15.6,
      volume24h: 890000000,
      trades24h: 34817,
      status: 'active',
      tier: 'institutional',
      icon: 'Database',
      description: 'Ultra-fast NVMe storage for real-time data processing',
      region: 'Global',
      tps: 1147291,
      resourceType: 'Storage',
      utilizationRate: 0.756,
      resourceSupply: 15672891,
      resourceDemand: 18947382,
      aiOptimizationScore: 0.965
    },
    
    fiveg_network_edge: {
      id: 'bOSac_5G_013',
      type: 'fiveg_network_edge',
      name: '$b5G Edge Network',
      parties: ['Verizon', 'T-Mobile', 'AT&T', 'Ericsson', 'Nokia', 'Huawei'],
      value: 12800000000, // $12.8B
      duration: '365 days',
      price: 128472.25,
      change24h: 52.8,
      volume24h: 2340000000,
      trades24h: 18947,
      status: 'active',
      tier: 'enterprise',
      icon: 'Radio',
      description: '5G network capacity for ultra-low latency applications',
      region: 'Global',
      tps: 1847291,
      resourceType: 'Network',
      utilizationRate: 0.912,
      resourceSupply: 2847291,
      resourceDemand: 6947382,
      aiOptimizationScore: 0.993
    },
    
    // Ultra-Premium Resources
    quantum_supremacy: {
      id: 'bOSac_QSU_014',
      type: 'quantum_supremacy',
      name: '$bQuantum Supremacy Pool',
      parties: ['IBM Quantum', 'Google Quantum', 'IonQ', 'Rigetti', 'PsiQuantum'],
      value: 47800000000, // $47.8B
      duration: '730 days',
      price: 2478913.30,
      change24h: 124.7,
      volume24h: 12890000000,
      trades24h: 1847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Lightning',
      description: 'Fault-tolerant quantum computing - ultimate scarcity',
      region: 'Global',
      tps: 84729,
      resourceType: 'CPU',
      utilizationRate: 0.999,
      resourceSupply: 8472,
      resourceDemand: 284729,
      aiOptimizationScore: 1.000
    },
    
    neuromorphic_processing: {
      id: 'bOSac_NEU_015',
      type: 'neuromorphic_processing',
      name: '$bNeuromorphic Brain Chips',
      parties: ['Intel Loihi', 'IBM TrueNorth', 'BrainChip', 'SynSense', 'Innatera'],
      value: 18900000000, // $18.9B
      duration: '540 days',
      price: 894728.80,
      change24h: 89.3,
      volume24h: 3450000000,
      trades24h: 2847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Activity',
      description: 'Brain-inspired computing for ultra-efficient AI',
      region: 'Global',
      tps: 347291,
      resourceType: 'CPU',
      utilizationRate: 0.945,
      resourceSupply: 47291,
      resourceDemand: 284729,
      aiOptimizationScore: 0.998
    },
    
    photonic_networking: {
      id: 'bOSac_PHO_016',
      type: 'photonic_networking',
      name: '$bPhotonic Light Networks',
      parties: ['Lightmatter', 'Xanadu', 'PsiQuantum', 'Optera', 'Ayar Labs'],
      value: 23400000000, // $23.4B
      duration: '456 days',
      price: 348294.40,
      change24h: 78.6,
      volume24h: 5670000000,
      trades24h: 4817,
      status: 'active',
      tier: 'enterprise',
      icon: 'Lightning',
      description: 'Light-speed photonic computing and networking',
      region: 'Global',
      tps: 2847291,
      resourceType: 'Network',
      utilizationRate: 0.892,
      resourceSupply: 128472,
      resourceDemand: 847291,
      aiOptimizationScore: 0.997
    },
    
    dna_storage_bio: {
      id: 'bOSac_DNA_017',
      type: 'dna_storage_bio',
      name: '$bDNA Biological Storage',
      parties: ['Microsoft', 'Twist Bioscience', 'Catalog', 'DNA Script', 'Iridia'],
      value: 34800000000, // $34.8B
      duration: '1095 days',
      price: 1289477.70,
      change24h: 156.2,
      volume24h: 8900000000,
      trades24h: 847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Database',
      description: 'DNA-based data storage - ultimate density and longevity',
      region: 'Global',
      tps: 28472,
      resourceType: 'Storage',
      utilizationRate: 0.978,
      resourceSupply: 2847,
      resourceDemand: 84729,
      aiOptimizationScore: 0.999
    },
    
    // Emerging Technologies
    carbon_nanotube_compute: {
      id: 'bOSac_CNT_018',
      type: 'carbon_nanotube_compute',
      name: '$bCarbon Nanotube Processors',
      parties: ['IBM Research', 'MIT', 'Stanford', 'Carbon Electronics', 'Nantero'],
      value: 12400000000, // $12.4B
      duration: '630 days',
      price: 567892.40,
      change24h: 112.8,
      volume24h: 2340000000,
      trades24h: 1847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Cpu',
      description: 'Next-gen carbon nanotube processors - beyond silicon',
      region: 'Global',
      tps: 847291,
      resourceType: 'CPU',
      utilizationRate: 0.967,
      resourceSupply: 18472,
      resourceDemand: 147291,
      aiOptimizationScore: 0.996
    },
    
    space_compute_satellite: {
      id: 'bOSac_SPC_019',
      type: 'space_compute_satellite',
      name: '$bSpace Computing Constellation',
      parties: ['SpaceX', 'Amazon Kuiper', 'OneWeb', 'Planet Labs', 'Relativity'],
      value: 18700000000, // $18.7B
      duration: '1825 days',
      price: 234789.60,
      change24h: 67.4,
      volume24h: 4560000000,
      trades24h: 12847,
      status: 'active',
      tier: 'enterprise',
      icon: 'Satellite',
      description: 'Space-based computing free from terrestrial constraints',
      region: 'Orbital',
      tps: 1247891,
      resourceType: 'Hybrid',
      utilizationRate: 0.834,
      resourceSupply: 284729,
      resourceDemand: 847291,
      aiOptimizationScore: 0.987
    },
    
    blockchain_asic_mining: {
      id: 'bOSac_ASC_020',
      type: 'blockchain_asic_mining',
      name: '$bASIC Blockchain Processors',
      parties: ['Bitmain', 'MicroBT', 'Canaan', 'Ebang', 'Innosilicon'],
      value: 9800000000, // $9.8B
      duration: '275 days',
      price: 128947.80,
      change24h: 34.7,
      volume24h: 1890000000,
      trades24h: 28471,
      status: 'active',
      tier: 'institutional',
      icon: 'Cpu',
      description: 'Specialized ASIC processors for blockchain operations',
      region: 'Global',
      tps: 3847291,
      resourceType: 'CPU',
      utilizationRate: 0.789,
      resourceSupply: 1847291,
      resourceDemand: 2234567,
      aiOptimizationScore: 0.923
    },

    // New BOSac Contracts
    space_exploration_compute: {
      id: 'bOSac_SPC_031',
      type: 'space_exploration_compute',
      name: '$bSpace Mission Control',
      parties: ['NASA', 'SpaceX', 'Blue Origin', 'ESA', 'Roscosmos', 'JAXA'],
      value: 29400000000,
      duration: '1095 days',
      price: 294567.80,
      change24h: 45.6,
      volume24h: 8900000000,
      trades24h: 23456,
      liquidity: 18700000000,
      circulation: 456789,
      status: 'active',
      tier: 'enterprise',
      icon: 'Rocket',
      description: 'Deep space mission computing and satellite constellation management',
      region: 'Global',
      tps: 1567892,
      resourceType: 'CPU',
      utilizationRate: 0.834,
      resourceSupply: 3456789,
      resourceDemand: 4567890,
      aiOptimizationScore: 0.978
    },

    genomics_sequencing: {
      id: 'bOSac_GEN_032',
      type: 'genomics_sequencing',
      name: '$bGenome Analytics Platform',
      parties: ['Illumina', '23andMe', 'AncestryDNA', 'BGI Genomics', 'Thermo Fisher', 'Oxford Nanopore'],
      value: 18900000000,
      duration: '456 days',
      price: 189234.50,
      change24h: 12.8,
      volume24h: 4567000000,
      trades24h: 67890,
      liquidity: 12300000000,
      circulation: 345678,
      status: 'active',
      tier: 'institutional',
      icon: 'Database',
      description: 'Large-scale genomic data processing and personalized medicine',
      region: 'Global',
      tps: 2345678,
      resourceType: 'Memory',
      utilizationRate: 0.756,
      resourceSupply: 5678901,
      resourceDemand: 4567890,
      aiOptimizationScore: 0.945
    },

    renewable_energy_grid: {
      id: 'bOSac_REN_033',
      type: 'renewable_energy_grid',
      name: '$bGreen Energy Optimization',
      parties: ['Tesla Energy', 'Enphase', 'SolarEdge', 'Vestas', 'GE Renewable', 'Siemens Gamesa'],
      value: 23700000000,
      duration: '730 days',
      price: 237456.70,
      change24h: 28.4,
      volume24h: 6780000000,
      trades24h: 45678,
      liquidity: 15600000000,
      circulation: 567890,
      status: 'active',
      tier: 'enterprise',
      icon: 'Zap',
      description: 'Smart grid optimization and renewable energy forecasting',
      region: 'Global',
      tps: 1789456,
      resourceType: 'Network',
      utilizationRate: 0.812,
      resourceSupply: 7890123,
      resourceDemand: 8901234,
      aiOptimizationScore: 0.967
    },

    cybersecurity_defense: {
      id: 'bOSac_CYB_034',
      type: 'cybersecurity_defense',
      name: '$bCyberShield AI Defense',
      parties: ['CrowdStrike', 'Palo Alto Networks', 'Fortinet', 'Check Point', 'Cisco Security', 'Microsoft Security'],
      value: 34500000000,
      duration: '365 days',
      price: 345789.20,
      change24h: 67.3,
      volume24h: 12400000000,
      trades24h: 78901,
      liquidity: 23400000000,
      circulation: 678901,
      status: 'active',
      tier: 'enterprise',
      icon: 'Shield',
      description: 'Real-time threat detection and automated incident response',
      region: 'Global',
      tps: 3456789,
      resourceType: 'GPU',
      utilizationRate: 0.945,
      resourceSupply: 2345678,
      resourceDemand: 8901234,
      aiOptimizationScore: 0.993
    },

    virtual_reality_metaverse: {
      id: 'bOSac_VR_035',
      type: 'virtual_reality_metaverse',
      name: '$bMetaverse Rendering Engine',
      parties: ['Meta', 'Unity', 'Epic Games', 'Roblox', 'NVIDIA Omniverse', 'Microsoft Mixed Reality'],
      value: 41200000000,
      duration: '540 days',
      price: 412678.90,
      change24h: 89.7,
      volume24h: 15600000000,
      trades24h: 123456,
      liquidity: 28900000000,
      circulation: 789012,
      status: 'active',
      tier: 'enterprise',
      icon: 'Eye',
      description: 'Immersive metaverse experiences and real-time ray tracing',
      region: 'Global',
      tps: 4567890,
      resourceType: 'GPU',
      utilizationRate: 0.976,
      resourceSupply: 1789012,
      resourceDemand: 12345678,
      aiOptimizationScore: 0.998
    },

    smart_city_iot: {
      id: 'bOSac_IOT_036',
      type: 'smart_city_iot',
      name: '$bSmart City Infrastructure',
      parties: ['IBM', 'Cisco', 'Intel', 'Amazon IoT', 'Google Cloud IoT', 'Microsoft Azure IoT'],
      value: 16800000000,
      duration: '1095 days',
      price: 168456.30,
      change24h: 15.2,
      volume24h: 3450000000,
      trades24h: 56789,
      liquidity: 11200000000,
      circulation: 234567,
      status: 'active',
      tier: 'institutional',
      icon: 'Building',
      description: 'Smart city sensors, traffic optimization, and urban analytics',
      region: 'Global',
      tps: 5678901,
      resourceType: 'Network',
      utilizationRate: 0.689,
      resourceSupply: 12345678,
      resourceDemand: 8901234,
      aiOptimizationScore: 0.934
    },

    language_translation_ai: {
      id: 'bOSac_LNG_037',
      type: 'language_translation_ai',
      name: '$bUniversal Translator',
      parties: ['Google Translate', 'Microsoft Translator', 'DeepL', 'Amazon Translate', 'IBM Watson Language', 'Meta AI'],
      value: 12500000000,
      duration: '275 days',
      price: 125789.40,
      change24h: 23.6,
      volume24h: 2890000000,
      trades24h: 78901,
      liquidity: 8900000000,
      circulation: 345678,
      status: 'active',
      tier: 'institutional',
      icon: 'Globe',
      description: 'Real-time multilingual translation and cross-cultural communication',
      region: 'Global',
      tps: 6789012,
      resourceType: 'CPU',
      utilizationRate: 0.723,
      resourceSupply: 8901234,
      resourceDemand: 6789012,
      aiOptimizationScore: 0.912
    },

    agriculture_optimization: {
      id: 'bOSac_AGR_038',
      type: 'agriculture_optimization',
      name: '$bPrecision Farming AI',
      parties: ['John Deere', 'CNH Industrial', 'AGCO', 'Climate Corporation', 'Trimble Agriculture', 'Raven Industries'],
      value: 8900000000,
      duration: '365 days',
      price: 89456.70,
      change24h: 7.8,
      volume24h: 1890000000,
      trades24h: 34567,
      liquidity: 5600000000,
      circulation: 189012,
      status: 'active',
      tier: 'corporate',
      icon: 'Gauge',
      description: 'Crop monitoring, yield optimization, and sustainable farming practices',
      region: 'Global',
      tps: 1234567,
      resourceType: 'Hybrid',
      utilizationRate: 0.634,
      resourceSupply: 6789012,
      resourceDemand: 4567890,
      aiOptimizationScore: 0.887
    },

    synthetic_biology: {
      id: 'bOSac_BIO_039',
      type: 'synthetic_biology',
      name: '$bBioEngineering Platform',
      parties: ['Ginkgo Bioworks', 'Zymergen', 'Twist Bioscience', 'Synthetic Genomics', 'Modern Meadow', 'Perfect Day'],
      value: 14700000000,
      duration: '456 days',
      price: 147890.50,
      change24h: 34.2,
      volume24h: 3450000000,
      trades24h: 56789,
      liquidity: 9800000000,
      circulation: 278901,
      status: 'active',
      tier: 'institutional',
      icon: 'Flame',
      description: 'Synthetic biology design and bioengineering simulations',
      region: 'Global',
      tps: 2789012,
      resourceType: 'CPU',
      utilizationRate: 0.789,
      resourceSupply: 4567890,
      resourceDemand: 5678901,
      aiOptimizationScore: 0.956
    },

    satellite_constellation: {
      id: 'bOSac_SAT_040',
      type: 'satellite_constellation',
      name: '$bGlobal Satellite Network',
      parties: ['Starlink', 'OneWeb', 'Amazon Kuiper', 'Planet Labs', 'Maxar Technologies', 'BlackSky'],
      value: 37800000000,
      duration: '1825 days',
      price: 378901.60,
      change24h: 56.4,
      volume24h: 11200000000,
      trades24h: 89012,
      liquidity: 25600000000,
      circulation: 567890,
      status: 'active',
      tier: 'enterprise',
      icon: 'Satellite',
      description: 'Global satellite internet and Earth observation data processing',
      region: 'Global',
      tps: 8901234,
      resourceType: 'Network',
      utilizationRate: 0.892,
      resourceSupply: 3456789,
      resourceDemand: 9876543,
      aiOptimizationScore: 0.987
    }
  })

  // Simulate AI-driven resource optimization and pricing
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      // Update global TPS
      setGlobalTPS(prev => {
        const variation = (Math.random() - 0.5) * 200000
        return Math.max(2000000, prev + variation)
      })
      
      // Update resource metrics with supply/demand dynamics
      setResourceMetrics(prev => {
        const newData = { ...prev }
        Object.keys(newData).forEach(resourceType => {
          const resource = newData[resourceType]
          // Simulate AI optimization adjusting supply/demand
          const demandVariation = (Math.random() - 0.5) * 1000000
          const supplyVariation = (Math.random() - 0.5) * 500000
          
          resource.demand = Math.max(1000000, resource.demand + demandVariation)
          resource.supply = Math.max(1000000, resource.supply + supplyVariation)
          resource.utilizationRate = Math.min(0.99, resource.demand / (resource.supply * 1.2))
          resource.scarcityIndex = resource.demand / resource.supply
          
          // Price adjusts based on scarcity (Coasian economics)
          const scarcityMultiplier = 1 + (resource.scarcityIndex - 1) * 0.5
          const priceChange = (resource.scarcityIndex - 1) * 1000 + (Math.random() - 0.5) * 500
          resource.price = Math.max(100, resource.price + priceChange)
          resource.priceChange24h += (Math.random() - 0.5) * 5
          
          // AI efficiency improves with utilization optimization
          resource.aiEfficiency = Math.min(0.999, resource.aiEfficiency + (Math.random() - 0.5) * 0.001)
        })
        return newData
      })
      
      // Update contract prices based on their resource utilization
      setContractData(prev => {
        const newData = { ...prev }
        Object.keys(newData).forEach(key => {
          const contract = newData[key]
          const resourcePrice = resourceMetrics[contract.resourceType]?.price || 10000
          const scarcityIndex = resourceMetrics[contract.resourceType]?.scarcityIndex || 1
          
          // Contract price influenced by resource scarcity
          const priceAdjustment = (scarcityIndex - 1) * 5000 + (Math.random() - 0.5) * 2000
          contract.price = Math.max(1000, contract.price + priceAdjustment)
          contract.change24h += (Math.random() - 0.5) * 3
          contract.tps = Math.floor(Math.random() * 1000000) + 500000
          
          // Update utilization based on demand
          contract.utilizationRate = Math.min(0.99, contract.utilizationRate + (Math.random() - 0.5) * 0.02)
        })
        return newData
      })
      
      // Update revenue metrics (1% fees to $bOS holders)
      setRevenueMetrics(prev => {
        const totalVolume = Object.values(contractData).reduce((sum, contract) => sum + contract.volume24h, 0)
        const fees = totalVolume * prev.distributionRate
        return {
          ...prev,
          totalFees24h: fees,
          holderDividends: fees * 0.75 // 75% to holders, 25% for operations
        }
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
  }, [isLive, resourceMetrics, contractData])

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
    <Suspense fallback={<div>Loading...</div>}>
    <div className="h-full overflow-auto bg-gray-950 text-white">
      {/* Professional Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-800 border border-gray-700 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-gray-300" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    bOS Atomic Contracts Exchange
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-800 border border-gray-700">
                  <div className="w-2 h-2 bg-green-500" />
                  <span className="text-xs font-medium text-gray-300">LIVE</span>
                  <span className="text-xs text-gray-400 font-mono">{globalTPS.toLocaleString()} TPS</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">TVL</span>
                  <span className="text-sm font-bold text-white font-mono">$412.7B</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">24h Fees</span>
                  <span className="text-sm font-bold text-white font-mono">${(revenueMetrics.holderDividends/1000000).toFixed(1)}M</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">Contracts</span>
                  <span className="text-sm font-bold text-white font-mono">{Object.keys(contractData).length}</span>
                </div>
                
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-800 border border-gray-700">
                  <div className="w-2 h-2 bg-green-500" />
                  <span className="text-xs font-mono text-gray-400">STREAMING</span>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              {isLive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isLive ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Contract Sidebar */}
        <div className="w-96 border-r border-gray-800 bg-gray-900 overflow-auto">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-gray-800 border border-gray-700 flex items-center justify-center">
                <FileText className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Active Contracts
              </h3>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-auto">
              {Object.values(contractData).map((contract) => (
                <button
                  key={contract.type}
                  type="button"
                  onClick={() => setSelectedContract(contract.type)}
                  className={`w-full p-3 text-left group border transition-colors ${
                    selectedContract === contract.type
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-gray-900 hover:bg-gray-800 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1 bg-gray-800 border border-gray-700">
                        {getContractIcon(contract.icon, contract.tier)}
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">
                          {contract.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {contract.parties.length} parties • {contract.region}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 bg-gray-800 border border-gray-700 text-xs font-mono ${
                      contract.change24h >= 0 ? 'text-green-400' : 'text-red-400'
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
                      <div className="text-xs text-gray-600">
                        TVL: {formatValue(contract.value)}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{contract.trades24h.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 bg-gray-800 border border-gray-700 px-1">
                        {contract.tier.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">{contract.description}</div>
                      <div className="text-xs font-mono text-gray-400">
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
              <Activity className="w-5 h-5 text-red-500 " />
              <h4 className="font-semibold text-red-400">Live Transactions</h4>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-auto">
              {liveTransactions.map((tx, i) => (
                <div key={tx.id} className="bg-gray-800/50 rounded p-3 border-l-2 border-green-500 ">
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
              <div className="bg-gray-800/30 p-3 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-300">Global Network</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-blue-400">{globalTPS.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500">Transactions Per Second</div>
              </div>
              
              <div className="bg-gray-800/30 p-3 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-300">Data Centers</span>
                  </div>
                  <span className="font-mono text-lg font-bold text-purple-400">1,847</span>
                </div>
                <div className="text-xs text-gray-500">Active nodes globally</div>
              </div>
              
              <div className="bg-gray-800/30 p-3 border border-gray-700/50">
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
          <div className="flex border-b border-gray-800 bg-gray-900">
            {[
              { id: 'resources', label: 'Resource Markets', icon: Gauge, color: 'blue' }
            ].map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => {}}
                className="flex items-center gap-3 px-6 py-3 border-b-2 border-white text-white bg-gray-800"
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            
            <div className="ml-auto flex items-center gap-3 px-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
                <span className="text-xs font-mono text-red-400">HIGH-FREQUENCY</span>
              </div>
              <div className="text-xs text-gray-500">
                {isClient ? new Date().toLocaleTimeString() : '--:--:--'} UTC
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
                {/* Primary Resources Table */}
                <div className="bg-gray-900 border border-gray-800">
                  <div className="border-b border-gray-800 p-3">
                    <h3 className="text-lg font-bold text-white">Primary Resources</h3>
                  </div>
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-3 border-b border-gray-800 bg-gray-800 text-xs font-mono text-gray-400 uppercase">
                    <div className="col-span-2">Resource</div>
                    <div>Price ₿</div>
                    <div>24h Change</div>
                    <div>Volume 24h</div>
                    <div>Liquidity</div>
                    <div>Dividend Yield</div>
                    <div>Supply</div>
                    <div>Utilization</div>
                    <div>Scarcity</div>
                    <div>Contracts</div>
                    <div>AI Score</div>
                  </div>
                  
                  {/* Table Content */}
                  <div>
                    {Object.values(resourceMetrics).slice(0, 5).map((resource, index) => {
                      const scarcityLevel = resource.scarcityIndex > 1.2 ? 'high' : resource.scarcityIndex > 1.1 ? 'medium' : 'low'
                      const volume24h = resource.price * resource.demand * 0.1
                      const liquidity = resource.supply * resource.price * 0.05
                      const dividendYield = resource.scarcityIndex * 2.5
                      
                      return (
                        <div key={`${resource.type}-${index}`} className={`grid grid-cols-12 gap-4 p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors text-sm ${
                          scarcityLevel === 'high' ? 'border-l-2 border-l-red-600' :
                          scarcityLevel === 'medium' ? 'border-l-2 border-l-yellow-600' :
                          'border-l-2 border-l-green-600'
                        }`}>
                          <div className="col-span-2 flex items-center gap-2">
                            {resource.type === 'GPU' && <Cpu className="w-4 h-4 text-gray-400" />}
                            {resource.type === 'CPU' && <Server className="w-4 h-4 text-gray-400" />}
                            {resource.type === 'Memory' && <Database className="w-4 h-4 text-gray-400" />}
                            {resource.type === 'Storage' && <Database className="w-4 h-4 text-gray-400" />}
                            {resource.type === 'Network' && <Network className="w-4 h-4 text-gray-400" />}
                            <div>
                              <div className="font-medium text-white">{resource.type}</div>
                              <div className={`text-xs font-mono ${
                                scarcityLevel === 'high' ? 'text-red-400' :
                                scarcityLevel === 'medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }`}>
                                {scarcityLevel === 'high' ? 'HIGH DEMAND' :
                                 scarcityLevel === 'medium' ? 'MODERATE' :
                                 'ABUNDANT'}
                              </div>
                            </div>
                          </div>
                          <div className="font-mono text-white">{resource.price.toLocaleString()}</div>
                          <div className={`font-mono ${
                            resource.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {resource.priceChange24h >= 0 ? '+' : ''}{resource.priceChange24h.toFixed(1)}%
                          </div>
                          <div className="font-mono text-gray-300">${(volume24h/1000000).toFixed(1)}M</div>
                          <div className="font-mono text-gray-300">${(liquidity/1000000).toFixed(1)}M</div>
                          <div className="font-mono text-blue-400">{dividendYield.toFixed(2)}%</div>
                          <div className="font-mono text-gray-400">{(resource.supply/1000000).toFixed(1)}M</div>
                          <div className="font-mono text-purple-400">{(resource.utilizationRate * 100).toFixed(1)}%</div>
                          <div className={`font-mono font-bold ${
                            resource.scarcityIndex > 1.2 ? 'text-red-400' :
                            resource.scarcityIndex > 1.1 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {resource.scarcityIndex.toFixed(2)}x
                          </div>
                          <div className="font-mono text-gray-400">{resource.contracts.toLocaleString()}</div>
                          <div className="font-mono text-cyan-400">{(resource.aiEfficiency * 100).toFixed(1)}%</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Specialized Resources Table */}
                <div className="bg-gray-900 border border-gray-800 mt-6">
                  <div className="border-b border-gray-800 p-3">
                    <h3 className="text-lg font-bold text-white">Specialized Resources</h3>
                  </div>
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-3 border-b border-gray-800 bg-gray-800 text-xs font-mono text-gray-400 uppercase">
                    <div className="col-span-2">Resource</div>
                    <div>Price ₿</div>
                    <div>24h Change</div>
                    <div>Volume 24h</div>
                    <div>Liquidity</div>
                    <div>Dividend Yield</div>
                    <div>Supply</div>
                    <div>Utilization</div>
                    <div>Scarcity</div>
                    <div>Contracts</div>
                    <div>AI Score</div>
                  </div>
                  {Object.values(resourceMetrics).slice(5, 10).map((resource, index) => {
                    const scarcityLevel = resource.scarcityIndex > 5 ? 'ultra' : resource.scarcityIndex > 2 ? 'high' : 'medium'
                    const volume24h = resource.price * resource.demand * 0.08
                    const liquidity = resource.supply * resource.price * 0.03
                    const dividendYield = resource.scarcityIndex * 3.2
                    
                    return (
                      <div key={resource.type} className={`grid grid-cols-12 gap-4 p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors text-sm ${
                        scarcityLevel === 'ultra' ? 'border-l-2 border-l-purple-600' :
                        scarcityLevel === 'high' ? 'border-l-2 border-l-red-600' :
                        'border-l-2 border-l-orange-600'
                      }`}>
                        <div className="col-span-2 flex items-center gap-2">
                          <Lightning className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-white">{resource.type.replace('-', ' ').toUpperCase()}</div>
                            <div className={`text-xs font-mono ${
                              scarcityLevel === 'ultra' ? 'text-purple-400' :
                              scarcityLevel === 'high' ? 'text-red-400' :
                              'text-orange-400'
                            }`}>
                              {scarcityLevel === 'ultra' ? 'ULTRA RARE' :
                               scarcityLevel === 'high' ? 'HIGH DEMAND' :
                               'SPECIALIZED'}
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-white">{resource.price.toLocaleString()}</div>
                        <div className={`font-mono ${
                          resource.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {resource.priceChange24h >= 0 ? '+' : ''}{resource.priceChange24h.toFixed(1)}%
                        </div>
                        <div className="font-mono text-gray-300">${(volume24h/1000000).toFixed(1)}M</div>
                        <div className="font-mono text-gray-300">${(liquidity/1000000).toFixed(1)}M</div>
                        <div className="font-mono text-blue-400">{dividendYield.toFixed(2)}%</div>
                        <div className="font-mono text-gray-400">{(resource.supply/1000).toFixed(0)}K</div>
                        <div className="font-mono text-purple-400">{(resource.utilizationRate * 100).toFixed(1)}%</div>
                        <div className={`font-mono font-bold ${
                          resource.scarcityIndex > 5 ? 'text-purple-400' :
                          resource.scarcityIndex > 2 ? 'text-red-400' :
                          'text-orange-400'
                        }`}>
                          {resource.scarcityIndex.toFixed(2)}x
                        </div>
                        <div className="font-mono text-gray-400">{resource.contracts.toLocaleString()}</div>
                        <div className="font-mono text-cyan-400">{(resource.aiEfficiency * 100).toFixed(1)}%</div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Ultra-Premium Resources Table */}
                <div className="bg-gray-900 border border-gray-800 mt-6">
                  <div className="border-b border-gray-800 p-3">
                    <h3 className="text-lg font-bold text-white">Ultra-Premium Resources</h3>
                  </div>
                  
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 p-3 border-b border-gray-800 bg-gray-800 text-xs font-mono text-gray-400 uppercase">
                    <div className="col-span-2">Resource</div>
                    <div>Price ₿</div>
                    <div>24h Change</div>
                    <div>Volume 24h</div>
                    <div>Liquidity</div>
                    <div>Dividend Yield</div>
                    <div>Supply</div>
                    <div>Utilization</div>
                    <div>Scarcity</div>
                    <div>Contracts</div>
                    <div>AI Score</div>
                  </div>
                  {Object.values(resourceMetrics).slice(10).map((resource, index) => {
                    const scarcityLevel = resource.scarcityIndex > 10 ? 'legendary' : resource.scarcityIndex > 5 ? 'ultra' : 'premium'
                    const volume24h = resource.price * resource.demand * 0.05
                    const liquidity = resource.supply * resource.price * 0.02
                    const dividendYield = resource.scarcityIndex * 4.8
                    
                    return (
                      <div key={resource.type} className={`grid grid-cols-12 gap-4 p-3 border-b border-gray-800 hover:bg-gray-800 transition-colors text-sm ${
                        scarcityLevel === 'legendary' ? 'border-l-2 border-l-yellow-500 bg-yellow-500/5' :
                        scarcityLevel === 'ultra' ? 'border-l-2 border-l-purple-600' :
                        'border-l-2 border-l-blue-600'
                      }`}>
                        <div className="col-span-2 flex items-center gap-2">
                          <Flame className={`w-4 h-4 ${
                            scarcityLevel === 'legendary' ? 'text-yellow-400' :
                            scarcityLevel === 'ultra' ? 'text-purple-400' :
                            'text-blue-400'
                          }`} />
                          <div>
                            <div className="font-medium text-white">{resource.type.replace('-', ' ').toUpperCase()}</div>
                            <div className={`text-xs font-mono ${
                              scarcityLevel === 'legendary' ? 'text-yellow-400' :
                              scarcityLevel === 'ultra' ? 'text-purple-400' :
                              'text-blue-400'
                            }`}>
                              {scarcityLevel === 'legendary' ? 'LEGENDARY' :
                               scarcityLevel === 'ultra' ? 'ULTRA RARE' :
                               'PREMIUM'}
                            </div>
                          </div>
                        </div>
                        <div className="font-mono text-white">{resource.price.toLocaleString()}</div>
                        <div className={`font-mono ${
                          resource.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {resource.priceChange24h >= 0 ? '+' : ''}{resource.priceChange24h.toFixed(1)}%
                        </div>
                        <div className="font-mono text-gray-300">${(volume24h/1000000).toFixed(1)}M</div>
                        <div className="font-mono text-gray-300">${(liquidity/1000000).toFixed(1)}M</div>
                        <div className="font-mono text-blue-400">{dividendYield.toFixed(2)}%</div>
                        <div className="font-mono text-gray-400">{(resource.supply/1000).toFixed(0)}K</div>
                        <div className="font-mono text-purple-400">{(resource.utilizationRate * 100).toFixed(1)}%</div>
                        <div className={`font-mono font-bold ${
                          resource.scarcityIndex > 10 ? 'text-yellow-400' :
                          resource.scarcityIndex > 5 ? 'text-purple-400' :
                          'text-blue-400'
                        }`}>
                          {resource.scarcityIndex.toFixed(2)}x
                        </div>
                        <div className="font-mono text-gray-400">{resource.contracts.toLocaleString()}</div>
                        <div className="font-mono text-cyan-400">{(resource.aiEfficiency * 100).toFixed(1)}%</div>
                      </div>
                    )
                  })}
                </div>

                {/* $bOS Revenue Distribution */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg border border-green-700/30 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">$bOS Revenue Distribution</h3>
                    <div className="text-sm text-green-300 bg-green-500/20 px-3 py-1 rounded-full">
                      1% Transaction Fee Model
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="bg-black/30 p-3 border border-green-700/30">
                      <div className="text-sm text-gray-400 mb-1">24h Total Fees</div>
                      <div className="text-2xl font-bold font-mono text-green-400">
                        ${(revenueMetrics.totalFees24h/1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-green-300 mt-1">1% of all transactions</div>
                    </div>
                    
                    <div className="bg-black/30 p-3 border border-emerald-700/30">
                      <div className="text-sm text-gray-400 mb-1">Shareholder Dividends</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">
                        ${(revenueMetrics.holderDividends/1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-emerald-300 mt-1">75% to $bOS holders</div>
                    </div>
                    
                    <div className="bg-black/30 p-3 border border-blue-700/30">
                      <div className="text-sm text-gray-400 mb-1">Operations Fund</div>
                      <div className="text-2xl font-bold font-mono text-blue-400">
                        ${((revenueMetrics.totalFees24h - revenueMetrics.holderDividends)/1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-blue-300 mt-1">25% for development</div>
                    </div>
                    
                    <div className="bg-black/30 p-3 border border-purple-700/30">
                      <div className="text-sm text-gray-400 mb-1">Next Distribution</div>
                      <div className="text-lg font-bold font-mono text-purple-400">
                        {isClient ? revenueMetrics.nextDistribution.toLocaleTimeString() : '--:--:--'}
                      </div>
                      <div className="text-xs text-purple-300 mt-1">Automated hourly</div>
                    </div>
                  </div>
                </div>
                
                {/* Coasian Load Balancing */}
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-700/30 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-purple-400 " />
                    </div>
                    <h3 className="text-xl font-bold text-purple-400">AI Coasian Load Balancing</h3>
                    <div className="text-sm text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                      Real-time Optimization
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Resource Allocation</h4>
                      {Object.values(resourceMetrics).map(resource => (
                        <div key={resource.type} className="flex items-center justify-between p-3 bg-black/30 rounded border border-gray-700/30">
                          <span className="text-sm text-gray-300">{resource.type}</span>
                          <div className="flex items-center gap-3">
                            <div className={`w-16 h-2 rounded-full bg-gray-700 overflow-hidden`}>
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  resource.utilizationRate > 0.9 ? 'bg-red-400' :
                                  resource.utilizationRate > 0.8 ? 'bg-yellow-400' :
                                  'bg-green-400'
                                }`}
                                style={{ width: `${Math.min(100, resource.utilizationRate * 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-gray-400 w-10">
                              {(resource.utilizationRate * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Price Optimization</h4>
                      <div className="space-y-3">
                        <div className="p-4 bg-black/30 rounded border border-gray-700/30 text-center">
                          <div className="text-sm text-gray-400">AI Adjustment Speed</div>
                          <div className="text-2xl font-bold font-mono text-cyan-400">150ms</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded border border-gray-700/30 text-center">
                          <div className="text-sm text-gray-400">Price Accuracy</div>
                          <div className="text-2xl font-bold font-mono text-green-400">99.7%</div>
                        </div>
                        <div className="p-4 bg-black/30 rounded border border-gray-700/30 text-center">
                          <div className="text-sm text-gray-400">Market Efficiency</div>
                          <div className="text-2xl font-bold font-mono text-blue-400">97.8%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white">Contract Impact</h4>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">$bVideo → GPU scarcity → Price ↑</div>
                        <div className="text-sm text-gray-400">$bStorage → Abundant supply → Price ↓</div>
                        <div className="text-sm text-gray-400">$bAI → Memory demand → Price ↑</div>
                        <div className="text-sm text-gray-400">$bNetwork → Edge computing → Price ↑</div>
                      </div>
                      <div className="mt-4 p-3 bg-cyan-900/20 rounded border border-cyan-700/30">
                        <div className="text-xs text-cyan-300">Theory of the Firm optimization</div>
                        <div className="text-sm font-semibold text-cyan-400">Coasian transaction cost minimization</div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  )
}

export default function ExchangePage() {
  return <ExchangeContent />
}

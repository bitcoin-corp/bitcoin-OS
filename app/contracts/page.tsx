'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Terminal,
  GitBranch,
  GitPullRequest,
  GitCommit,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Users,
  Calendar,
  Activity,
  TrendingUp,
  Package,
  Code,
  Server,
  Cpu,
  Database,
  Shield,
  Zap,
  Award,
  Star,
  MessageCircle,
  FileText,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react'

type ContractStatus = 'active' | 'pending' | 'review' | 'completed' | 'disputed'
type ContractFilter = 'all' | ContractStatus

interface DeveloperContract {
  id: string
  title: string
  type: 'core' | 'app' | 'infrastructure' | 'protocol' | 'integration'
  developer: {
    name: string
    handle: string
    rating: number
    completedProjects: number
    avatar?: string
  }
  client: string
  status: ContractStatus
  budget: number
  spent: number
  startDate: string
  deadline: string
  progress: number
  milestones: {
    completed: number
    total: number
  }
  commits: number
  pullRequests: number
  issues: {
    open: number
    closed: number
  }
  lastActivity: string
  technologies: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export default function ContractsPage() {
  const [filter, setFilter] = useState<ContractFilter>('all')
  const [sortBy, setSortBy] = useState<'deadline' | 'budget' | 'progress'>('deadline')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock data for active contracts
  const contracts: DeveloperContract[] = [
    {
      id: 'CTR-001',
      title: 'Bitcoin OS Core Payment Module',
      type: 'core',
      developer: {
        name: 'Alex Chen',
        handle: '@alexdev',
        rating: 4.9,
        completedProjects: 47
      },
      client: 'Bitcoin Corporation',
      status: 'active',
      budget: 150000,
      spent: 87000,
      startDate: '2025-10-01',
      deadline: '2025-12-31',
      progress: 58,
      milestones: { completed: 3, total: 5 },
      commits: 247,
      pullRequests: 18,
      issues: { open: 7, closed: 23 },
      lastActivity: '2 hours ago',
      technologies: ['C++', 'Rust', 'Bitcoin Script'],
      priority: 'critical'
    },
    {
      id: 'CTR-002',
      title: 'TeraNode Integration Layer',
      type: 'infrastructure',
      developer: {
        name: 'Sarah Mitchell',
        handle: '@sarahm',
        rating: 4.8,
        completedProjects: 34
      },
      client: 'Bitcoin OS Foundation',
      status: 'active',
      budget: 280000,
      spent: 142000,
      startDate: '2025-09-15',
      deadline: '2026-03-15',
      progress: 51,
      milestones: { completed: 4, total: 8 },
      commits: 512,
      pullRequests: 42,
      issues: { open: 12, closed: 67 },
      lastActivity: '5 minutes ago',
      technologies: ['Go', 'Docker', 'Kubernetes'],
      priority: 'high'
    },
    {
      id: 'CTR-003',
      title: 'Bitcoin Wallet App',
      type: 'app',
      developer: {
        name: 'Team Phoenix',
        handle: '@phoenix',
        rating: 4.7,
        completedProjects: 23
      },
      client: 'Private Client',
      status: 'active',
      budget: 95000,
      spent: 38000,
      startDate: '2025-10-15',
      deadline: '2026-01-15',
      progress: 40,
      milestones: { completed: 2, total: 6 },
      commits: 156,
      pullRequests: 12,
      issues: { open: 4, closed: 18 },
      lastActivity: '1 day ago',
      technologies: ['React', 'TypeScript', 'Next.js'],
      priority: 'medium'
    },
    {
      id: 'CTR-004',
      title: 'Smart Contract Compiler',
      type: 'protocol',
      developer: {
        name: 'Marcus Wei',
        handle: '@mwei',
        rating: 5.0,
        completedProjects: 62
      },
      client: 'Bitcoin Corporation',
      status: 'review',
      budget: 320000,
      spent: 298000,
      startDate: '2025-06-01',
      deadline: '2025-11-30',
      progress: 93,
      milestones: { completed: 9, total: 10 },
      commits: 892,
      pullRequests: 78,
      issues: { open: 2, closed: 145 },
      lastActivity: '3 hours ago',
      technologies: ['Rust', 'WASM', 'Bitcoin Script'],
      priority: 'high'
    },
    {
      id: 'CTR-005',
      title: 'P2P Network Optimization',
      type: 'infrastructure',
      developer: {
        name: 'Dev Collective',
        handle: '@devcol',
        rating: 4.6,
        completedProjects: 18
      },
      client: 'Network Partners',
      status: 'pending',
      budget: 75000,
      spent: 0,
      startDate: '2025-12-01',
      deadline: '2026-02-01',
      progress: 0,
      milestones: { completed: 0, total: 4 },
      commits: 0,
      pullRequests: 0,
      issues: { open: 0, closed: 0 },
      lastActivity: 'Not started',
      technologies: ['C++', 'P2P', 'Cryptography'],
      priority: 'low'
    },
    {
      id: 'CTR-006',
      title: 'Zero-Knowledge Proof Library',
      type: 'protocol',
      developer: {
        name: 'CryptoLabs',
        handle: '@cryptolabs',
        rating: 4.9,
        completedProjects: 41
      },
      client: 'Research Grant',
      status: 'active',
      budget: 450000,
      spent: 167000,
      startDate: '2025-08-01',
      deadline: '2026-08-01',
      progress: 37,
      milestones: { completed: 3, total: 12 },
      commits: 324,
      pullRequests: 29,
      issues: { open: 18, closed: 42 },
      lastActivity: '30 minutes ago',
      technologies: ['Rust', 'ZK-SNARKs', 'Cryptography'],
      priority: 'high'
    },
    {
      id: 'CTR-007',
      title: 'Exchange API Integration',
      type: 'integration',
      developer: {
        name: 'Lisa Park',
        handle: '@lisap',
        rating: 4.8,
        completedProjects: 29
      },
      client: 'Exchange Partners',
      status: 'completed',
      budget: 65000,
      spent: 65000,
      startDate: '2025-07-01',
      deadline: '2025-10-01',
      progress: 100,
      milestones: { completed: 5, total: 5 },
      commits: 189,
      pullRequests: 23,
      issues: { open: 0, closed: 34 },
      lastActivity: '1 week ago',
      technologies: ['Node.js', 'GraphQL', 'REST APIs'],
      priority: 'medium'
    },
    {
      id: 'CTR-008',
      title: 'Consensus Algorithm Research',
      type: 'protocol',
      developer: {
        name: 'Dr. James Wilson',
        handle: '@drwilson',
        rating: 5.0,
        completedProjects: 15
      },
      client: 'Academic Partnership',
      status: 'active',
      budget: 180000,
      spent: 72000,
      startDate: '2025-09-01',
      deadline: '2026-03-01',
      progress: 40,
      milestones: { completed: 2, total: 6 },
      commits: 98,
      pullRequests: 8,
      issues: { open: 3, closed: 12 },
      lastActivity: '12 hours ago',
      technologies: ['Research', 'Mathematics', 'Algorithms'],
      priority: 'medium'
    }
  ]

  const filteredContracts = filter === 'all' 
    ? contracts 
    : contracts.filter(c => c.status === filter)

  const sortedContracts = [...filteredContracts].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    } else if (sortBy === 'budget') {
      return b.budget - a.budget
    } else {
      return b.progress - a.progress
    }
  })

  const getStatusColor = (status: ContractStatus) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/30'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30'
      case 'review': return 'text-blue-400 bg-blue-400/10 border-blue-400/30'
      case 'completed': return 'text-gray-400 bg-gray-400/10 border-gray-400/30'
      case 'disputed': return 'text-red-400 bg-red-400/10 border-red-400/30'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500'
      case 'high': return 'text-orange-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'core': return Cpu
      case 'app': return Package
      case 'infrastructure': return Server
      case 'protocol': return Shield
      case 'integration': return GitBranch
      default: return Code
    }
  }

  // Calculate totals
  const totals = {
    contracts: sortedContracts.length,
    totalBudget: sortedContracts.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: sortedContracts.reduce((sum, c) => sum + c.spent, 0),
    activeContracts: contracts.filter(c => c.status === 'active').length,
    avgProgress: Math.round(contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.progress, 0) / contracts.filter(c => c.status === 'active').length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-10 h-10 text-bitcoin-500" />
                <h1 className="text-4xl font-bold text-white">Developer Contracts</h1>
              </div>
              <p className="text-gray-300 text-lg">
                Manage and monitor active development contracts for Bitcoin OS and Bitcoin Apps
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-bitcoin-500 hover:bg-bitcoin-600 rounded-lg text-white font-medium transition-all flex items-center gap-2"
              onClick={() => window.location.href = '/developer/offer'}
            >
              <GitPullRequest className="w-5 h-5" />
              New Contract
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-bitcoin-500" />
                <span className="text-gray-400 text-sm">Total Contracts</span>
              </div>
              <div className="text-2xl font-bold text-white">{totals.contracts}</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-gray-400 text-sm">Active</span>
              </div>
              <div className="text-2xl font-bold text-white">{totals.activeContracts}</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-bitcoin-500" />
                <span className="text-gray-400 text-sm">Total Budget</span>
              </div>
              <div className="text-2xl font-bold text-white">${(totals.totalBudget/1000).toFixed(0)}K</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-gray-400 text-sm">Spent</span>
              </div>
              <div className="text-2xl font-bold text-white">${(totals.totalSpent/1000).toFixed(0)}K</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400 text-sm">Avg Progress</span>
              </div>
              <div className="text-2xl font-bold text-white">{totals.avgProgress}%</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-bitcoin-500 text-white' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'active' 
                    ? 'bg-bitcoin-500 text-white' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'pending' 
                    ? 'bg-bitcoin-500 text-white' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('review')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'review' 
                    ? 'bg-bitcoin-500 text-white' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                Review
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'completed' 
                    ? 'bg-bitcoin-500 text-white' 
                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                Completed
              </button>
            </div>

            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg text-white focus:border-bitcoin-500 focus:outline-none"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="budget">Sort by Budget</option>
                <option value="progress">Sort by Progress</option>
              </select>

              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-bitcoin-500 text-white' : 'bg-gray-800/30 text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-bitcoin-500 text-white' : 'bg-gray-800/30 text-gray-400'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contracts Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedContracts.map((contract, index) => {
            const TypeIcon = getTypeIcon(contract.type)
            const progressPercentage = contract.progress
            const budgetUsed = (contract.spent / contract.budget) * 100
            const daysLeft = Math.ceil((new Date(contract.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
            
            return (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-gray-900/50 backdrop-blur-sm border border-bitcoin-800/30 rounded-xl overflow-hidden hover:border-bitcoin-600/50 transition-all ${
                  viewMode === 'list' ? 'p-6' : 'flex flex-col'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-bitcoin-500/10 rounded-lg">
                            <TypeIcon className="w-6 h-6 text-bitcoin-500" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">{contract.id}</div>
                            <h3 className="font-semibold text-white">{contract.title}</h3>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-gray-800 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${contract.developer.name}&background=random`} 
                            alt={contract.developer.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-300">{contract.developer.name}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-400">{contract.developer.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                          <span className={`text-xs ${getPriorityColor(contract.priority)}`}>
                            {contract.priority}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{progressPercentage}%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-bitcoin-500 to-bitcoin-400 transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">Budget Used</span>
                            <span className="text-white">${(contract.spent/1000).toFixed(0)}K / ${(contract.budget/1000).toFixed(0)}K</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                budgetUsed > 80 ? 'bg-red-500' : budgetUsed > 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${budgetUsed}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400">Milestones</span>
                            <div className="text-white font-medium">{contract.milestones.completed}/{contract.milestones.total}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Deadline</span>
                            <div className={`font-medium ${daysLeft < 7 ? 'text-red-400' : daysLeft < 30 ? 'text-yellow-400' : 'text-white'}`}>
                              {daysLeft > 0 ? `${daysLeft} days` : 'Overdue'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <GitCommit className="w-3 h-3" />
                          <span>{contract.commits}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <GitPullRequest className="w-3 h-3" />
                          <span>{contract.pullRequests}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <AlertCircle className="w-3 h-3" />
                          <span>{contract.issues.open}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
                          <Clock className="w-3 h-3" />
                          <span>{contract.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* List View */
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-bitcoin-500/10 rounded-lg">
                      <TypeIcon className="w-8 h-8 text-bitcoin-500" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-white">{contract.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contract.status)}`}>
                          {contract.status}
                        </span>
                        <span className={`text-xs ${getPriorityColor(contract.priority)}`}>
                          {contract.priority}
                        </span>
                        <span className="text-xs text-gray-400">{contract.id}</span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{contract.developer.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>${(contract.budget/1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">{progressPercentage}%</div>
                      <div className="text-xs text-gray-400">Complete</div>
                    </div>

                    <div className="flex gap-3">
                      <button className="p-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
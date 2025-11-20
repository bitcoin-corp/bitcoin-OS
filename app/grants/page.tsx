'use client'

import { motion } from 'framer-motion'
import { 
  Flower2,
  DollarSign,
  Users,
  Target,
  Trophy,
  Zap,
  Code,
  Package,
  Globe,
  ChevronRight,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { useState } from 'react'

export default function GrantsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const grantCategories = [
    { id: 'all', name: 'All Grants', count: 12 },
    { id: 'infrastructure', name: 'Infrastructure', count: 4 },
    { id: 'applications', name: 'Applications', count: 3 },
    { id: 'research', name: 'Research', count: 2 },
    { id: 'community', name: 'Community', count: 3 }
  ]

  const activeGrants = [
    {
      title: 'TeraNode Integration',
      amount: '50,000 $bOS',
      category: 'infrastructure',
      description: 'Integrate TeraNode scaling into Bitcoin OS core infrastructure',
      deadline: '2025 Q1',
      applicants: 3,
      status: 'open'
    },
    {
      title: 'Decentralized Storage Layer',
      amount: '30,000 $bOS',
      category: 'infrastructure',
      description: 'Build distributed storage solution for Bitcoin OS apps',
      deadline: '2025 Q1',
      applicants: 5,
      status: 'open'
    },
    {
      title: 'Bitcoin Social App',
      amount: '20,000 $bOS',
      category: 'applications',
      description: 'Create decentralized social networking app on Bitcoin OS',
      deadline: '2025 Q2',
      applicants: 8,
      status: 'open'
    },
    {
      title: 'Smart Contract Templates',
      amount: '15,000 $bOS',
      category: 'research',
      description: 'Develop reusable smart contract templates for common use cases',
      deadline: '2025 Q1',
      applicants: 2,
      status: 'open'
    },
    {
      title: 'Developer Documentation',
      amount: '10,000 $bOS',
      category: 'community',
      description: 'Comprehensive documentation and tutorials for Bitcoin OS',
      deadline: '2025 Q1',
      applicants: 4,
      status: 'in-progress'
    }
  ]

  const filteredGrants = selectedCategory === 'all' 
    ? activeGrants 
    : activeGrants.filter(grant => grant.category === selectedCategory)

  const stats = {
    totalFunding: '1,000,000 $bOS',
    activeGrants: 12,
    completedGrants: 28,
    totalApplicants: 156
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-bitcoin-950">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500/10 via-transparent to-bitcoin-600/10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <header className="px-6 py-8 border-b border-bitcoin-800/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Flower2 className="w-10 h-10 text-bitcoin-500" />
                <h1 className="text-3xl font-bold text-white">Bitcoin OS Grants Program</h1>
              </div>
              <p className="text-gray-300 text-lg max-w-3xl">
                Funding innovation on Bitcoin OS. Apply for grants to build infrastructure, applications, and tools that advance the ecosystem.
              </p>
            </div>
          </header>

          {/* Stats Section */}
          <section className="px-6 py-8 border-b border-bitcoin-800/30">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-bitcoin-500" />
                    <span className="text-gray-400">Total Funding</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.totalFunding}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Active Grants</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.activeGrants}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-400">Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.completedGrants}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-400">Applicants</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.totalApplicants}</div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="px-6 py-6 border-b border-bitcoin-800/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-3 flex-wrap">
                {grantCategories.map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-bitcoin-500 text-white'
                        : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Active Grants */}
          <section className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Active Grant Opportunities</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrants.map((grant, index) => (
                  <motion.div
                    key={grant.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6 hover:border-bitcoin-600/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{grant.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            grant.status === 'open' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {grant.status === 'open' ? 'Open' : 'In Progress'}
                          </span>
                          <span className="text-xs text-gray-400">{grant.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{grant.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Grant Amount</span>
                        <span className="text-bitcoin-400 font-semibold">{grant.amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Deadline</span>
                        <span className="text-white">{grant.deadline}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Applicants</span>
                        <span className="text-white">{grant.applicants}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-bitcoin-500/20 hover:bg-bitcoin-500/30 border border-bitcoin-500 rounded-lg text-bitcoin-400 font-medium transition-all flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Apply for Grant CTA */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 bg-gradient-to-br from-bitcoin-500/20 to-bitcoin-600/20 border border-bitcoin-500/30 rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Have an Idea?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  We're always looking for innovative projects to fund. If you have an idea that can advance the Bitcoin OS ecosystem, we want to hear from you.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-bitcoin-500 hover:bg-bitcoin-600 rounded-lg text-white font-semibold transition-all"
                >
                  Submit Grant Proposal
                </motion.button>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
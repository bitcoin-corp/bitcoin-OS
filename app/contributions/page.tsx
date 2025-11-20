'use client'

import { motion } from 'framer-motion'
import { 
  Users,
  Github,
  Code,
  GitPullRequest,
  Star,
  Trophy,
  Award,
  ChevronRight,
  Activity,
  Calendar,
  GitCommit
} from 'lucide-react'

export default function ContributionsPage() {
  const topContributors = [
    {
      name: 'Richard Boase',
      username: 'rboase',
      avatar: 'https://github.com/rboase.png',
      commits: 1250,
      prs: 89,
      issues: 156,
      role: 'Core Developer'
    },
    {
      name: 'Sarah Chen',
      username: 'sarahc',
      avatar: 'https://github.com/github.png',
      commits: 842,
      prs: 67,
      issues: 98,
      role: 'Core Developer'
    },
    {
      name: 'Alex Thompson',
      username: 'alexth',
      avatar: 'https://github.com/github.png',
      commits: 523,
      prs: 45,
      issues: 72,
      role: 'Contributor'
    },
    {
      name: 'Maria Garcia',
      username: 'mgarcia',
      avatar: 'https://github.com/github.png',
      commits: 412,
      prs: 38,
      issues: 65,
      role: 'Contributor'
    },
    {
      name: 'David Kim',
      username: 'dkim',
      avatar: 'https://github.com/github.png',
      commits: 387,
      prs: 32,
      issues: 54,
      role: 'Contributor'
    },
    {
      name: 'Emma Wilson',
      username: 'ewilson',
      avatar: 'https://github.com/github.png',
      commits: 298,
      prs: 28,
      issues: 41,
      role: 'Contributor'
    }
  ]

  const recentActivity = [
    {
      type: 'pr',
      title: 'Add TeraNode scaling support',
      author: 'rboase',
      time: '2 hours ago',
      status: 'merged'
    },
    {
      type: 'commit',
      title: 'Fix memory leak in exchange module',
      author: 'sarahc',
      time: '4 hours ago',
      status: 'committed'
    },
    {
      type: 'issue',
      title: 'Improve documentation for MAIP',
      author: 'alexth',
      time: '6 hours ago',
      status: 'open'
    },
    {
      type: 'pr',
      title: 'Update DevSidebar with new features',
      author: 'mgarcia',
      time: '1 day ago',
      status: 'reviewing'
    }
  ]

  const stats = {
    totalContributors: 127,
    activeThisMonth: 42,
    totalCommits: 8956,
    openIssues: 34
  }

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
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-10 h-10 text-green-500" />
                <h1 className="text-3xl font-bold text-white">Contributors</h1>
              </div>
              <p className="text-gray-300 text-lg max-w-3xl">
                The amazing developers building Bitcoin OS. Join our community and help shape the future of decentralized computing.
              </p>
            </div>
          </header>

          {/* Stats */}
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
                    <Users className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Total Contributors</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.totalContributors}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-400">Active This Month</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.activeThisMonth}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GitCommit className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-400">Total Commits</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.totalCommits.toLocaleString()}</div>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-800/30 rounded-lg p-4 border border-bitcoin-800/30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <GitPullRequest className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-400">Open Issues</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stats.openIssues}</div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Top Contributors */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Top Contributors</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.username}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                    className="bg-gray-800/30 border border-bitcoin-800/30 rounded-xl p-6 hover:border-green-600/50 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={contributor.avatar} 
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{contributor.name}</h3>
                        <p className="text-gray-400 text-sm">@{contributor.username}</p>
                        <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          {contributor.role}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">{contributor.commits}</div>
                        <div className="text-xs text-gray-400">Commits</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{contributor.prs}</div>
                        <div className="text-xs text-gray-400">PRs</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">{contributor.issues}</div>
                        <div className="text-xs text-gray-400">Issues</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="px-6 py-12 bg-black/30">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-800/30 border border-bitcoin-800/30 rounded-lg p-4 flex items-center gap-4"
                  >
                    {activity.type === 'pr' && <GitPullRequest className="w-5 h-5 text-green-500" />}
                    {activity.type === 'commit' && <GitCommit className="w-5 h-5 text-blue-500" />}
                    {activity.type === 'issue' && <Github className="w-5 h-5 text-yellow-500" />}
                    
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">
                        by @{activity.author} • {activity.time}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      activity.status === 'merged' ? 'bg-green-500/20 text-green-400' :
                      activity.status === 'committed' ? 'bg-blue-500/20 text-blue-400' :
                      activity.status === 'open' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-green-500/20 to-bitcoin-600/20 border border-green-500/30 rounded-xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Become a Contributor</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join our open-source community and help build the future of decentralized computing on Bitcoin.
                </p>
                <motion.a
                  href="https://github.com/bitcoin-apps-suite/bitcoin-OS"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition-all"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                  <ChevronRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Users, Clock, Bitcoin, Activity, CheckCircle2, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react'

interface Contract {
  id: string
  title: string
  status: 'available' | 'claimed' | 'in_progress' | 'submitted' | 'completed'
  reward: string
  assignee?: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  timeRemaining?: string
}

export default function ContractsBar() {
  const [mounted, setMounted] = useState(false)
  const [activeContracts, setActiveContracts] = useState<Contract[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Sample contract data - this would come from your actual contract system
  const contractsData: Contract[] = [
    {
      id: '1',
      title: 'Document Persistence Bug Fix',
      status: 'in_progress',
      reward: '3,000 BWRITER',
      assignee: 'alice_dev',
      priority: 'Critical',
      timeRemaining: '2 days'
    },
    {
      id: '2',
      title: 'Implement Google Drive OAuth',
      status: 'available',
      reward: '5,000 BWRITER',
      priority: 'High'
    },
    {
      id: '3',
      title: 'Replace deprecated execCommand',
      status: 'claimed',
      reward: '4,000 BWRITER',
      assignee: 'bob_coder',
      priority: 'High',
      timeRemaining: '5 days'
    },
    {
      id: '4',
      title: 'Implement Autosave Functionality',
      status: 'completed',
      reward: '2,500 BWRITER',
      assignee: 'charlie_dev',
      priority: 'Medium'
    }
  ]

  useEffect(() => {
    setMounted(true)
    setActiveContracts(contractsData)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeContracts.length)
    }, 4000) // Rotate every 4 seconds

    return () => clearInterval(interval)
  }, [activeContracts.length])

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/10'
      case 'claimed': return 'text-yellow-400 bg-yellow-400/10'
      case 'in_progress': return 'text-blue-400 bg-blue-400/10'
      case 'submitted': return 'text-purple-400 bg-purple-400/10'
      case 'completed': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getPriorityColor = (priority: Contract['priority']) => {
    switch (priority) {
      case 'Critical': return 'text-red-400 border-red-400/30'
      case 'High': return 'text-orange-400 border-orange-400/30'
      case 'Medium': return 'text-yellow-400 border-yellow-400/30'
      case 'Low': return 'text-green-400 border-green-400/30'
      default: return 'text-gray-400 border-gray-400/30'
    }
  }

  const getStatusIcon = (status: Contract['status']) => {
    switch (status) {
      case 'available': return <FileText className="w-3 h-3" />
      case 'claimed': return <Clock className="w-3 h-3" />
      case 'in_progress': return <Activity className="w-3 h-3" />
      case 'submitted': return <AlertTriangle className="w-3 h-3" />
      case 'completed': return <CheckCircle2 className="w-3 h-3" />
      default: return <FileText className="w-3 h-3" />
    }
  }

  const totalContracts = activeContracts.length
  const availableContracts = activeContracts.filter(c => c.status === 'available').length
  const inProgressContracts = activeContracts.filter(c => c.status === 'in_progress' || c.status === 'claimed').length

  if (!mounted || activeContracts.length === 0) {
    return null
  }

  const currentContract = activeContracts[currentIndex]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ 
        y: isCollapsed ? 80 : 0 
      }}
      transition={{ 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }}
      className="fixed bottom-0 right-6 z-50 w-96"
    >
      {/* Sliding Contracts Bar */}
      <motion.div 
        className="bg-gray-900/95 backdrop-blur-xl border-t border-l border-r border-gray-700/50 rounded-t-2xl shadow-2xl overflow-hidden"
        animate={{
          height: isCollapsed ? 60 : isExpanded ? 400 : 120
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 250
        }}
      >
        {/* Header Bar - Always Visible */}
        <motion.div 
          className="flex items-center justify-between p-4 border-b border-gray-800/50 cursor-pointer bg-gray-800/30"
          onClick={() => {
            if (isCollapsed) {
              setIsCollapsed(false)
            } else {
              setIsExpanded(!isExpanded)
            }
          }}
          whileHover={{ backgroundColor: 'rgba(75, 85, 99, 0.4)' }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FileText className="w-5 h-5 text-orange-400" />
            </motion.div>
            <div>
              <h3 className="text-sm font-bold text-white">Contracts</h3>
              <div className="text-xs text-gray-400">
                {totalContracts} active • {availableContracts} available
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            />
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsCollapsed(!isCollapsed)
              }}
              className="text-gray-400 hover:text-white p-1 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* Contract Preview - Collapsed View */}
        <AnimatePresence>
          {!isCollapsed && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <motion.div 
                key={currentContract.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="flex items-center gap-3"
                onDoubleClick={() => window.location.href = '/contracts'}
              >
                <motion.div 
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getPriorityColor(currentContract.priority)}`}
                  animate={{ 
                    backgroundColor: currentContract.status === 'in_progress' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(75, 85, 99, 0.1)' 
                  }}
                >
                  <motion.div
                    animate={{ rotate: currentContract.status === 'in_progress' ? 360 : 0 }}
                    transition={{ duration: 2, repeat: currentContract.status === 'in_progress' ? Infinity : 0, ease: 'linear' }}
                  >
                    {getStatusIcon(currentContract.status)}
                  </motion.div>
                  <span className="text-xs font-medium capitalize text-white">
                    {currentContract.status.replace('_', ' ')}
                  </span>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{currentContract.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <Bitcoin className="w-3 h-3 text-orange-400" />
                    <span>{currentContract.reward}</span>
                    {currentContract.assignee && (
                      <>
                        <span>•</span>
                        <span>@{currentContract.assignee}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded View */}
        <AnimatePresence>
          {!isCollapsed && isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-4 space-y-4 overflow-hidden"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{totalContracts}</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
                <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-400">{availableContracts}</div>
                  <div className="text-xs text-gray-400">Available</div>
                </div>
                <div className="bg-blue-400/10 border border-blue-400/20 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-400">{inProgressContracts}</div>
                  <div className="text-xs text-gray-400">Active</div>
                </div>
              </div>

              {/* Contract List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {activeContracts.map((contract, index) => (
                  <motion.div
                    key={contract.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      index === currentIndex 
                        ? 'bg-orange-400/10 border-orange-400/30' 
                        : 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${getStatusColor(contract.status)}`}>
                        {getStatusIcon(contract.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm truncate">{contract.title}</div>
                        <div className="text-xs text-gray-400">{contract.reward}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button 
                onClick={() => window.location.href = '/contracts'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-medium py-2 px-4 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Contracts
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
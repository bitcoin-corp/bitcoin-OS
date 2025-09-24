'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Plus, Trash2, Clock, Calendar, Tag, Filter } from 'lucide-react'
import TopMenuBar from '@/components/TopMenuBar'
import OSTaskbar from '@/components/OSTaskbar'
import DevSidebar from '@/components/DevSidebar'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  tags: string[]
  createdAt: string
}

export default function TasksPage() {
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Create $bOS Token Contract',
      description: 'Deploy the main $bOS token contract on BSV with minting, burning, and transfer capabilities',
      completed: false,
      priority: 'high',
      dueDate: '2025-02-01',
      tags: ['contract', 'token', 'bsv'],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'App Registry Smart Contract',
      description: 'Build contract for registering and managing Bitcoin OS applications on-chain',
      completed: false,
      priority: 'high',
      dueDate: '2025-02-05',
      tags: ['contract', 'registry', 'apps'],
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'User Profile NFT Contract',
      description: 'Create NFT contract for user profiles and authentication across the ecosystem',
      completed: false,
      priority: 'high',
      tags: ['contract', 'nft', 'identity'],
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'File Storage Payment Contract',
      description: 'Implement pay-per-storage contract for Bitcoin Drive using BSV micropayments',
      completed: false,
      priority: 'medium',
      dueDate: '2025-02-10',
      tags: ['contract', 'storage', 'payments'],
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Music Streaming Royalty Contract',
      description: 'Smart contract for automatic royalty distribution to artists on Bitcoin Music',
      completed: false,
      priority: 'medium',
      tags: ['contract', 'music', 'royalties'],
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      title: 'Developer Reward Pool Contract',
      description: 'Create contract for distributing $bOS rewards to app developers based on usage',
      completed: false,
      priority: 'medium',
      tags: ['contract', 'incentives', 'developers'],
      createdAt: new Date().toISOString()
    },
    {
      id: '7',
      title: 'Decentralized Governance Contract',
      description: 'DAO contract for $bOS holders to vote on ecosystem proposals',
      completed: false,
      priority: 'low',
      tags: ['contract', 'dao', 'governance'],
      createdAt: new Date().toISOString()
    },
    {
      id: '8',
      title: 'Cross-App Data Sharing Contract',
      description: 'Enable secure data sharing between Bitcoin OS apps with user consent',
      completed: false,
      priority: 'medium',
      tags: ['contract', 'interop', 'data'],
      createdAt: new Date().toISOString()
    },
    {
      id: '9',
      title: 'Staking Rewards Contract',
      description: 'Implement $bOS staking mechanism with automated reward distribution',
      completed: true,
      priority: 'high',
      tags: ['contract', 'staking', 'defi'],
      createdAt: new Date().toISOString()
    },
    {
      id: '10',
      title: 'App Licensing Contract',
      description: 'Smart contract for premium app features and subscription management',
      completed: false,
      priority: 'low',
      tags: ['contract', 'licensing', 'monetization'],
      createdAt: new Date().toISOString()
    }
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

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

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: '',
        completed: false,
        priority: 'medium',
        tags: [],
        createdAt: new Date().toISOString()
      }
      setTasks([newTask, ...tasks])
      setNewTaskTitle('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active' && task.completed) return false
    if (filter === 'completed' && !task.completed) return false
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/30'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/30'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30'
    }
  }

  return (
    <div className="h-screen flex flex-col relative bg-black">
      <TopMenuBar onOpenApp={openApp} />
      
      <div className="flex-1 flex relative overflow-hidden pb-14">
        {showDevSidebar && <DevSidebar />}
        
        <div className={`flex-1 transition-all duration-300 overflow-auto ${showDevSidebar ? 'md:ml-64' : ''}`}>
          <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-bitcoin-orange">Contract</span>
            <span className="text-white ml-2">Tasks</span>
          </h1>
          <p className="text-gray-400">Smart contracts needed to build Bitcoin OS on BSV</p>
        </div>

        {/* Add Task */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-bitcoin-orange"
            />
            <button
              onClick={addTask}
              className="bg-bitcoin-orange text-black px-4 py-2 rounded-lg hover:bg-bitcoin-orange/90 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Status:</span>
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      filter === f 
                        ? 'bg-bitcoin-orange text-black' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Priority:</span>
              <div className="flex gap-2">
                {(['all', 'high', 'medium', 'low'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      priorityFilter === p 
                        ? 'bg-bitcoin-orange text-black' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-500">No tasks found</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task.id}
                className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 transition-all hover:bg-gray-900/70 ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 text-bitcoin-orange" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600 hover:text-bitcoin-orange transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-bitcoin-orange">{tasks.length}</div>
            <div className="text-sm text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {tasks.filter(t => t.completed).length}
            </div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {tasks.filter(t => !t.completed).length}
            </div>
            <div className="text-sm text-gray-400">Active</div>
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
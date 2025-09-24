'use client'

import { useState, useEffect } from 'react'
import { 
  Code, 
  GitBranch, 
  Bug, 
  FileText, 
  Terminal, 
  Package,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity,
  Shield,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react'

export default function DevSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const devItems = [
    { icon: Terminal, label: 'Terminal', path: '/terminal' },
    { icon: Code, label: 'Code Editor', path: '/editor' },
    { icon: GitBranch, label: 'Git Manager', path: '/git' },
    { icon: Bug, label: 'Debug Console', path: '/debug' },
    { icon: Package, label: 'Package Manager', path: '/packages' },
    { icon: FileText, label: 'Logs', path: '/logs' },
  ]

  const systemItems = [
    { icon: Activity, label: 'System Monitor', path: '/monitor' },
    { icon: Cpu, label: 'Process Manager', path: '/processes' },
    { icon: HardDrive, label: 'Storage', path: '/storage' },
    { icon: Database, label: 'Blockchain Node', path: '/node' },
    { icon: Shield, label: 'Security', path: '/security' },
  ]

  const stats = {
    cpu: '12%',
    memory: '4.2 GB',
    storage: '128 GB',
    blockchain: 'Synced',
    network: 'Connected'
  }

  return (
    <div className={`fixed left-0 top-8 bottom-12 ${isCollapsed ? 'w-16' : 'w-64'} bg-gray-900 border-r border-gray-800 transition-all duration-300 z-40 flex flex-col`}>
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-bitcoin-orange" />
            <span className="font-semibold">Developer</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-800 rounded"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
          {!isCollapsed && <div className="text-xs text-gray-500 px-2 py-1">DEVELOPMENT</div>}
          {devItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded transition-colors"
                title={isCollapsed ? item.label : undefined}
                onClick={() => setActiveSection(item.path)}
              >
                <Icon className="w-4 h-4 text-gray-400" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            )
          })}
        </div>

        <div className="mb-4">
          {!isCollapsed && <div className="text-xs text-gray-500 px-2 py-1">SYSTEM</div>}
          {systemItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded transition-colors"
                title={isCollapsed ? item.label : undefined}
                onClick={() => setActiveSection(item.path)}
              >
                <Icon className="w-4 h-4 text-gray-400" />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-xs text-gray-500 mb-2">SYSTEM STATUS</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">CPU</span>
              <span className="text-green-500">{stats.cpu}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Memory</span>
              <span className="text-yellow-500">{stats.memory}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Storage</span>
              <span className="text-blue-500">{stats.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Blockchain</span>
              <span className="text-green-500">{stats.blockchain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network</span>
              <span className="text-green-500">{stats.network}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
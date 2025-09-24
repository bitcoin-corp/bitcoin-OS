'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  FileCode,
  Users,
  FileText,
  Coins,
  Github,
  GitPullRequest,
  ExternalLink,
  BookOpen,
  History,
  CheckCircle,
  ListTodo,
  Briefcase
} from 'lucide-react'

export default function DevSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [issueCount, setIssueCount] = useState<number | null>(null)

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-OS/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : null)
      } catch (error) {
        console.error('Error fetching issues:', error)
      }
    }
    fetchIssues()
  }, [])

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devSidebarCollapsed')
    if (saved) {
      setIsCollapsed(JSON.parse(saved))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('devSidebarCollapsed', JSON.stringify(newState))
  }

  const menuItems = [
    { path: '/contracts', icon: Briefcase, label: 'Contracts' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/contributors', icon: Users, label: 'Contributors' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: Coins, label: '$bOS Token' },
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS', icon: Github, label: 'Repository', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/issues', icon: FileCode, label: 'Issues', badge: issueCount, external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/pulls', icon: GitPullRequest, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/api', icon: FileText, label: 'API Reference' },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status' },
  ]

  const stats = {
    supply: '1,000,000,000,000',
    distributed: '12,456,789',
    contributors: '42',
    openTasks: issueCount || 0
  }

  return (
    <div className={`fixed left-0 top-[64px] bottom-14 ${isCollapsed ? 'w-16' : 'w-[260px]'} bg-gray-900 border-r border-gray-800 transition-all duration-300 z-40 flex flex-col`}>
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-bitcoin-orange" />
            <span className="font-semibold text-white">Developer Hub</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="my-2 border-t border-gray-800" />
            }

            const Icon = item.icon
            const isActive = pathname === item.path
            const isExternal = item.external

            const linkContent = (
              <>
                <Icon className={`w-4 h-4 ${isActive ? 'text-bitcoin-orange' : 'text-gray-400'}`} />
                {!isCollapsed && (
                  <>
                    <span className={`flex-1 text-sm ${isActive ? 'text-white font-medium' : 'text-gray-300'}`}>
                      {item.label}
                    </span>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className="bg-bitcoin-orange text-black text-xs px-1.5 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                    {isExternal && <ExternalLink className="w-3 h-3 text-gray-500" />}
                  </>
                )}
              </>
            )

            if (isExternal) {
              return (
                <a
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
                    isActive ? 'bg-gray-800' : ''
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  {linkContent}
                </a>
              )
            }

            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-gray-800 ${
                  isActive ? 'bg-gray-800' : ''
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {linkContent}
              </a>
            )
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <>
          <div className="p-4 border-t border-gray-800">
            <div className="text-xs text-gray-500 mb-3">PROJECT STATS</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Supply</span>
                <span className="text-bitcoin-orange font-mono">{stats.supply}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Distributed</span>
                <span className="text-green-500">{stats.distributed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contributors</span>
                <span className="text-blue-500">{stats.contributors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Open Tasks</span>
                <span className="text-yellow-500">{stats.openTasks}</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-800">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">Start Contributing</p>
              <a
                href="/tasks"
                className="block w-full py-2 px-3 bg-gradient-to-r from-bitcoin-orange to-orange-500 text-black text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                View Tasks
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
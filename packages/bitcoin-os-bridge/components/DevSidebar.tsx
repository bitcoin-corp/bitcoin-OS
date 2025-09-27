'use client'

import { useState, useEffect } from 'react'
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
  Briefcase,
  Terminal,
  Package,
  Download,
  Upload,
  Lock,
  Unlock,
  Activity,
  Clock
} from 'lucide-react'
import type { AppContext } from '../types'
import './DevSidebar.css'

interface DevSidebarProps {
  context: AppContext
  githubRepo?: string
  statsOverride?: Record<string, string | number>
  customMenuItems?: Array<{
    path?: string
    icon?: any
    label?: string
    badge?: string
    divider?: boolean
    section?: string
    external?: boolean
  }>
}

export default function DevSidebar({ 
  context,
  githubRepo = 'https://github.com/bitcoin-apps-suite/bitcoin-OS',
  statsOverride = {},
  customMenuItems = []
}: DevSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })
  const [issueCount, setIssueCount] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString())
    }
  }, [isCollapsed])

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const repoPath = githubRepo.replace('https://github.com/', '')
        const response = await fetch(`https://api.github.com/repos/${repoPath}/issues?state=open`)
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : 0)
      } catch (error) {
        console.error('Error fetching issues:', error)
        setIssueCount(0)
      }
    }
    fetchIssues()
  }, [githubRepo])

  const { appName, exchangeUrl } = context

  const defaultMenuItems: Array<{
    path?: string
    icon?: any
    label?: string
    badge?: string
    divider?: boolean
    section?: string
    external?: boolean
  }> = [
    // Core Features
    { path: '/token', icon: Coins, label: '$bOS Token', badge: 'NEW' },
    { path: '/contracts', icon: Terminal, label: 'Smart Contracts', badge: 'BETA' },
    ...(exchangeUrl ? [{ path: exchangeUrl, icon: Download, label: 'Exchange' }] : []),
    
    // System Operations
    { divider: true },
    { section: 'SYSTEM' },
    { path: '/tasks', icon: ListTodo, label: 'Task Manager' },
    { path: '/contributors', icon: Users, label: 'Contributors', badge: '42' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    
    // Development
    { divider: true },
    { section: 'DEVELOPMENT' },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: githubRepo, icon: Github, label: 'GitHub Repository', external: true },
    { path: `${githubRepo}/issues`, icon: FileCode, label: 'Issues', badge: issueCount > 0 ? String(issueCount) : '0', external: true },
    { path: `${githubRepo}/pulls`, icon: GitPullRequest, label: 'Pull Requests', external: true },
    
    // System Status
    { divider: true },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'System Status', badge: 'OK' }
  ]

  const menuItems = [...defaultMenuItems, ...customMenuItems]

  const defaultStats = {
    totalSupply: '1,000,000,000,000',
    distributed: '12,456,789',
    contributors: '42',
    openTasks: issueCount || 0,
    networkNodes: '150+'
  }

  const stats = { ...defaultStats, ...statsOverride }

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Monitor className="dev-sidebar-logo" />
            <span>Developer Hub</span>
          </div>
        )}
        <button 
          className="dev-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="dev-sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />
          }

          if (item.section) {
            return !isCollapsed ? (
              <div key={index} className="dev-sidebar-section">
                {item.section}
              </div>
            ) : null
          }

          const Icon = item.icon
          const isActive = typeof window !== 'undefined' && window.location.pathname === item.path

          if (item.external) {
            return (
              <a
                key={`${item.path}-${index}`}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            )
          }

          return (
            <a
              key={`${item.path}-${index}`}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </a>
          )
        })}
      </nav>

      {/* Stats section */}
      {!isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>{appName} Stats</h4>
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="dev-stat">
              <span className="dev-stat-label">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              <span className="dev-stat-value">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Join Development</p>
            <a 
              href={githubRepo}
              target="_blank" 
              rel="noopener noreferrer"
              className="dev-sidebar-cta-button"
            >
              Start Contributing
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
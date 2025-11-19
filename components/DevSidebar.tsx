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
  GitBranch,
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
  Cpu,
  Server,
  Zap
} from 'lucide-react'
import './DevSidebar.css'

export default function DevSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)
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
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-OS/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : 0)
      } catch (error) {
        console.error('Error fetching issues:', error)
        setIssueCount(0)
      }
    }
    fetchIssues()
  }, [])

  const menuItems: Array<{
    path?: string
    icon?: any
    label?: string
    badge?: string
    divider?: boolean
    section?: string
    external?: boolean
  }> = [
    // Token & Core at top
    { path: '/token', icon: Coins, label: '$bOS' },
    { path: '/exchange', icon: Zap, label: 'Compute Exchange' },
    { path: '/contracts', icon: Terminal, label: 'Contracts' },
    { path: '/issues-hub', icon: GitBranch, label: 'Issues Hub', badge: issueCount > 0 ? issueCount.toString() : undefined },
    
    // HPC & Computational Resources
    { divider: true },
    { section: 'COMPUTE MARKETPLACE' },
    { path: '/exchange?tab=buy', icon: Cpu, label: 'Ask for Resources' },
    { path: '/exchange?tab=sell', icon: Server, label: 'Offer Resources' },
    { path: '/exchange?tab=my-resources', icon: Activity, label: 'My Resources' },
    
  ]


  return (
    <>
      {/* Floating toggle when collapsed */}
      {isCollapsed && (
        <button 
          className="dev-sidebar-floating-toggle"
          onClick={() => setIsCollapsed(false)}
          aria-label="Expand contracts bar"
        >
          <ChevronRight size={20} />
        </button>
      )}
      
      <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="dev-sidebar-header">
          {!isCollapsed && (
            <div className="dev-sidebar-title">
              <Monitor className="dev-sidebar-logo" />
              <span>Contracts Bar</span>
            </div>
          )}
          {!isCollapsed && (
            <button 
              className="dev-sidebar-toggle"
              onClick={() => setIsCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={20} />
            </button>
          )}
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
          const isActive = pathname === item.path

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


    </div>
    </>
  )
}
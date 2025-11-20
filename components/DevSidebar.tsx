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
  Zap,
  DollarSign,
  Flower2,
  Wrench,
  Database,
  Bug
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
    // Token & Core at top - KEEP THESE UNCHANGED
    { path: '/token', icon: Coins, label: '$bOS', badge: 'NEW' },
    { path: '/exchange', icon: Zap, label: 'Compute Exchange' },
    { path: '/grants', icon: Flower2, label: 'GRANTS' },
    { path: '/maip', icon: Users, label: 'MAIP', badge: 'EXPERIMENTAL' },
    
    // Developers Section
    { divider: true },
    { section: 'DEVELOPERS' },
    { path: '/developer/offer', icon: FileCode, label: 'Create Dev Offer' },
    { path: '/contracts', icon: Terminal, label: 'Contracts' },
    { path: '/issues-hub', icon: GitBranch, label: 'Issues Hub', badge: issueCount > 0 ? issueCount.toString() : undefined },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/issues', icon: Bug, label: 'Issues', external: true, badge: issueCount > 0 ? issueCount.toString() : undefined },
    { path: '/contributions', icon: Users, label: 'Contributors', badge: '10+' },
    { path: '/engineers', icon: Database, label: 'Engineers Spec', badge: 'TECH' },
    
    // Compute Marketplace
    { divider: true },
    { section: 'COMPUTE MARKETPLACE' },
    { path: '/exchange?tab=buy', icon: Cpu, label: 'Ask for Resources' },
    { path: '/exchange?tab=sell', icon: Server, label: 'Offer Resources' },
    { path: '/enterprise', icon: Wrench, label: 'Enterprise Solutions' },
    
    // System & Apps
    { divider: true },
    { section: 'APPS & ECOSYSTEM' },
    { path: '/apps/offer', icon: Package, label: 'Create App Offer' },
    { path: '/apps/marketplace', icon: Activity, label: 'App Marketplace', badge: '35+' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    
    // System
    { divider: true },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS', icon: Github, label: 'GitHub', external: true },
    { path: '/changelog', icon: FileText, label: 'Changelog' },
    { path: '/status', icon: Activity, label: 'Status', badge: 'OK' }
  ]


  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Monitor className="dev-sidebar-logo" />
            <span>Contracts Bar</span>
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
  )
}
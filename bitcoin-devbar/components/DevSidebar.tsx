'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code, 
  GitBranch, 
  Bug, 
  FileText, 
  DollarSign, 
  Users, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
  Terminal,
  Activity,
  TrendingUp,
} from 'lucide-react';
import './DevSidebar.css';

interface DevSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
  appName?: string;
  githubRepo?: string;
  tokenSymbol?: string;
  tokenStats?: {
    totalTokens: string;
    distributed: string;
    contributors: string;
    openTasks: string;
  };
  menuItems?: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }>;
}

const DevSidebar: React.FC<DevSidebarProps> = ({ 
  onCollapsedChange,
  appName = 'Bitcoin Identity',
  githubRepo = 'bitcoin-apps-suite/bitcoin-identity',
  tokenSymbol = '$BID',
  tokenStats = {
    totalTokens: '1,000,000,000',
    distributed: '0',
    contributors: '1',
    openTasks: '0'
  },
  menuItems
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Always start with server-safe default
  const [mounted, setMounted] = useState(false);
  const [issueCount, setIssueCount] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    // Set mounted to true and load collapsed state from localStorage
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setIsCollapsed(saved !== null ? saved === 'true' : true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString());
    }
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  useEffect(() => {
    // Fetch GitHub issue count
    fetch(`https://api.github.com/repos/${githubRepo}/issues?state=open`)
      .then(res => res.json())
      .then(issues => setIssueCount(Array.isArray(issues) ? issues.length : 0))
      .catch(() => setIssueCount(0));
  }, [githubRepo]);

  const defaultMenuItems: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }> = [
    { path: '/exchange', icon: TrendingUp, label: 'Exchange', badge: 'NEW' },
    { path: '/contracts', icon: FileText, label: 'Contracts', badge: '3' },
    { path: '/tasks', icon: Terminal, label: 'Tasks', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/contributors', icon: Users, label: 'Contributors', badge: '1' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: DollarSign, label: tokenSymbol, badge: 'NEW' },
    { divider: true },
    { path: `https://github.com/${githubRepo}`, icon: GitBranch, label: 'GitHub', external: true },
    { path: `https://github.com/${githubRepo}/issues`, icon: Bug, label: 'Issues', external: true, badge: issueCount > 0 ? String(issueCount) : undefined },
    { path: `https://github.com/${githubRepo}/pulls`, icon: Code, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: '/changelog', icon: FileText, label: 'Changelog' },
    { path: '/status', icon: Activity, label: 'Status', badge: '🟢' }
  ];

  const finalMenuItems = menuItems || defaultMenuItems;

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {mounted && !isCollapsed && (
          <div className="dev-sidebar-title">
            <Zap className="dev-sidebar-logo" />
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
        {finalMenuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />;
          }

          const Icon = item.icon;
          const isActive = pathname === item.path;

          if (item.external) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {mounted && !isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              {mounted && !isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {mounted && !isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>Token Stats</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Supply</span>
            <span className="dev-stat-value">{tokenStats.totalTokens}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Distributed</span>
            <span className="dev-stat-value">{tokenStats.distributed}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Contributors</span>
            <span className="dev-stat-value">{tokenStats.contributors}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Open Tasks</span>
            <span className="dev-stat-value">{tokenStats.openTasks}</span>
          </div>
        </div>
      )}

      {mounted && !isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Start Contributing</p>
            <Link href="/tasks" className="dev-sidebar-cta-button">
              View Tasks
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevSidebar;
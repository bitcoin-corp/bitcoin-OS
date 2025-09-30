import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Flower2,
  Wrench
} from 'lucide-react';
import './DevSidebar.css';

interface DevSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const DevSidebar: React.FC<DevSidebarProps> = ({ onCollapsedChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('devSidebarCollapsed');
    // Default to collapsed if no preference is saved
    return saved !== null ? saved === 'true' : true;
  });
  const [issueCount, setIssueCount] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('devSidebarCollapsed', isCollapsed.toString());
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  useEffect(() => {
    // Fetch GitHub issue count
    fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-writer/issues?state=open')
      .then(res => res.json())
      .then(issues => setIssueCount(Array.isArray(issues) ? issues.length : 0))
      .catch(() => setIssueCount(0));
  }, []);

  const menuItems: Array<{
    path?: string;
    icon?: any;
    label?: string;
    badge?: string;
    divider?: boolean;
    section?: string;
    external?: boolean;
  }> = [
    // Token & Grants at top
    { path: '/token', icon: DollarSign, label: '$BWRITER', badge: 'NEW' },
    { path: '/grants', icon: Flower2, label: 'GRANTS' },
    { path: '/maip', icon: Users, label: 'MAIP', badge: 'EXPERIMENTAL' },
    
    // Authors Section
    { divider: true },
    { section: 'AUTHORS' },
    { path: '/author/offer', icon: FileText, label: 'Create Writing Offer' },
    { path: '/publisher/offers', icon: Package, label: 'Find Publishers', badge: '6' },
    { path: '/docs', icon: BookOpen, label: 'Writing Guides' },
    
    // Publishers Section
    { divider: true },
    { section: 'PUBLISHERS' },
    { path: '/publisher/offer', icon: DollarSign, label: 'Commission Work' },
    { path: '/author/offers', icon: Users, label: 'Find Talent', badge: '12' },
    { path: '/enterprise', icon: Wrench, label: 'Custom Platform' },
    
    // Developers Section
    { divider: true },
    { section: 'DEVELOPERS' },
    { path: '/developer/offer', icon: Zap, label: 'Create Service Offer' },
    { path: '/contracts', icon: Terminal, label: 'Find Work', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/contributions', icon: Users, label: 'Contributors', badge: '2' },
    
    // System
    { divider: true },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-writer', icon: GitBranch, label: 'GitHub', external: true },
    { path: '/changelog', icon: FileText, label: 'Changelog' },
    { path: '/status', icon: Activity, label: 'Status', badge: 'OK' }
  ];

  const stats = {
    totalTokens: '1,000,000,000',
    distributed: '650,000',
    contributors: '2',
    openTasks: '30+'
  };

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <Zap className="dev-sidebar-logo" />
            <span>Contracts Hub</span>
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
            return <div key={index} className="dev-sidebar-divider" />;
          }

          if (item.section) {
            return !isCollapsed ? (
              <div key={index} className="dev-sidebar-section">
                {item.section}
              </div>
            ) : null;
          }

          const Icon = item.icon;
          const isActive = location.pathname === item.path;

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
            );
          }

          return (
            <Link
              key={`${item.path}-${index}`}
              to={item.path || '/'}
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
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DevSidebar;
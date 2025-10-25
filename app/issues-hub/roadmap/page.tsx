'use client'

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  GitBranch,
  Zap,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  Coins,
  Code,
  Database,
  Network,
  Shield,
  Users,
  Rocket,
  AlertTriangle
} from 'lucide-react';
import '../issues-hub.css';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedWeeks: number;
  dependencies?: string[];
  category: 'infrastructure' | 'contracts' | 'integration' | 'apps';
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'planned';
  items: RoadmapItem[];
}

const phases: Phase[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: Core Infrastructure',
    subtitle: 'Deploy the foundation for atomic contracts and BSV integration',
    duration: '12-16 weeks',
    status: 'in-progress',
    items: [
      {
        id: 'bsv-contracts',
        title: 'Deploy BSV Smart Contracts',
        description: 'Implement and deploy all core smart contracts: TokenFactory, DeveloperContract, AtomicSwap, Treasury',
        status: 'in-progress',
        priority: 'critical',
        estimatedWeeks: 4,
        category: 'contracts'
      },
      {
        id: 'token-economy',
        title: 'Launch Multi-Token Economy',
        description: 'Deploy $bCorp, $bOS, and all app tokens ($bMusic, $bWriter, etc.) with working exchange rates',
        status: 'planned',
        priority: 'critical',
        estimatedWeeks: 3,
        dependencies: ['bsv-contracts'],
        category: 'contracts'
      },
      {
        id: 'git-bitcoin-bridge',
        title: 'Build Git-on-Bitcoin Bridge',
        description: 'Create hybrid system that anchors git commits to BSV while maintaining compatibility with existing tools',
        status: 'planned',
        priority: 'high',
        estimatedWeeks: 6,
        category: 'infrastructure'
      },
      {
        id: 'bsv-wallet-os',
        title: 'BSV Wallet Integration in OS',
        description: 'Add BSV wallet functionality to Bitcoin OS taskbar and system tray',
        status: 'planned',
        priority: 'high',
        estimatedWeeks: 3,
        dependencies: ['token-economy'],
        category: 'infrastructure'
      }
    ]
  },
  {
    id: 'phase-2',
    title: 'Phase 2: GitHub Integration',
    subtitle: 'Automate token distribution through smart contract GitHub Actions',
    duration: '6-8 weeks',
    status: 'planned',
    items: [
      {
        id: 'github-oracle',
        title: 'Build GitHub Oracle Contract',
        description: 'Smart contract that verifies GitHub PR merges and calculates token rewards based on contribution metrics',
        status: 'planned',
        priority: 'critical',
        estimatedWeeks: 3,
        dependencies: ['bsv-contracts'],
        category: 'contracts'
      },
      {
        id: 'github-actions-deployment',
        title: 'Deploy Smart Contract GitHub Actions',
        description: 'Implement GitHub Actions across all repositories that automatically trigger token payments on PR merge',
        status: 'planned',
        priority: 'high',
        estimatedWeeks: 2,
        dependencies: ['github-oracle'],
        category: 'integration'
      },
      {
        id: 'contribution-dashboard',
        title: 'Contribution Tracking Dashboard',
        description: 'Build web interface showing all contributions, token earnings, and swap capabilities',
        status: 'planned',
        priority: 'medium',
        estimatedWeeks: 3,
        dependencies: ['github-actions-deployment'],
        category: 'apps'
      }
    ]
  },
  {
    id: 'phase-3',
    title: 'Phase 3: bApps Integration',
    subtitle: 'Integrate smart contracts directly into all Bitcoin applications',
    duration: '10-12 weeks',
    status: 'planned',
    items: [
      {
        id: 'app-contract-integration',
        title: 'Smart Contract Integration in Apps',
        description: 'Add BSV smart contract interaction capabilities to all 30+ Bitcoin applications',
        status: 'planned',
        priority: 'high',
        estimatedWeeks: 8,
        dependencies: ['bsv-wallet-os'],
        category: 'apps'
      },
      {
        id: 'cross-app-tokens',
        title: 'Cross-App Token Features',
        description: 'Enable token transfers, swaps, and shared balances between apps through the OS',
        status: 'planned',
        priority: 'medium',
        estimatedWeeks: 4,
        dependencies: ['app-contract-integration'],
        category: 'integration'
      },
      {
        id: 'revenue-sharing',
        title: 'Revenue Sharing Contracts',
        description: 'Implement automatic revenue distribution for content creators and contributors',
        status: 'planned',
        priority: 'medium',
        estimatedWeeks: 3,
        dependencies: ['cross-app-tokens'],
        category: 'contracts'
      }
    ]
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Advanced Features',
    subtitle: 'DeFi features, governance, and ecosystem expansion',
    duration: '8-10 weeks',
    status: 'planned',
    items: [
      {
        id: 'dao-governance',
        title: 'DAO Governance System',
        description: 'Deploy decentralized governance allowing token holders to vote on ecosystem changes',
        status: 'planned',
        priority: 'medium',
        estimatedWeeks: 4,
        dependencies: ['revenue-sharing'],
        category: 'contracts'
      },
      {
        id: 'staking-yield',
        title: 'Staking and Yield Generation',
        description: 'Implement token staking mechanisms and yield farming opportunities',
        status: 'planned',
        priority: 'low',
        estimatedWeeks: 3,
        dependencies: ['dao-governance'],
        category: 'contracts'
      },
      {
        id: 'cross-chain-bridges',
        title: 'Cross-Chain Bridges',
        description: 'Build bridges to other blockchain networks for expanded ecosystem reach',
        status: 'planned',
        priority: 'low',
        estimatedWeeks: 5,
        dependencies: ['staking-yield'],
        category: 'infrastructure'
      }
    ]
  }
];

const statusIcons = {
  completed: <CheckCircle2 className="status-icon completed" size={16} />,
  'in-progress': <Clock className="status-icon in-progress" size={16} />,
  planned: <Circle className="status-icon planned" size={16} />
};

const priorityColors = {
  critical: 'priority-critical',
  high: 'priority-high', 
  medium: 'priority-medium',
  low: 'priority-low'
};

const categoryIcons = {
  infrastructure: <Network size={16} />,
  contracts: <Code size={16} />,
  integration: <GitBranch size={16} />,
  apps: <Zap size={16} />
};

export default function RoadmapPage() {
  const totalWeeks = phases.reduce((sum, phase) => 
    sum + phase.items.reduce((phaseSum, item) => phaseSum + item.estimatedWeeks, 0), 0
  );

  return (
    <div className="issues-hub-page">
      <div className="issues-hub-container">
        {/* Header */}
        <div className="hub-header">
          <div className="header-content">
            <div className="header-title">
              <Link href="/issues-hub" className="back-link">
                <ArrowLeft size={24} />
              </Link>
              <Target size={32} className="header-icon" />
              <h1>Bitcoin OS Roadmap</h1>
            </div>
            <p className="header-description">
              Strategic implementation plan for atomic contracts, git-on-bitcoin integration, and the multi-token economy
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="roadmap-overview">
          <div className="overview-cards">
            <div className="overview-card">
              <Calendar className="overview-icon" size={24} />
              <div>
                <h3>{totalWeeks} Weeks</h3>
                <p>Total estimated duration</p>
              </div>
            </div>
            
            <div className="overview-card">
              <Rocket className="overview-icon" size={24} />
              <div>
                <h3>4 Phases</h3>
                <p>Major development phases</p>
              </div>
            </div>
            
            <div className="overview-card">
              <Coins className="overview-icon" size={24} />
              <div>
                <h3>30+ Tokens</h3>
                <p>Multi-token ecosystem</p>
              </div>
            </div>
            
            <div className="overview-card">
              <Users className="overview-icon" size={24} />
              <div>
                <h3>∞ Contributors</h3>
                <p>Automated reward system</p>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Gap Warning */}
        <div className="critical-notice">
          <AlertTriangle className="notice-icon" size={20} />
          <div className="notice-content">
            <h3>Current Implementation Gap</h3>
            <p>
              While we have excellent documentation and UI components, we need approximately 
              <strong> 6 months of intensive development</strong> to bridge the gap between 
              our current web applications and a true atomic contract development environment.
            </p>
          </div>
        </div>

        {/* Phases */}
        {phases.map((phase, phaseIndex) => (
          <div key={phase.id} className={`phase-section phase-${phase.status}`}>
            <div className="phase-header">
              <div className="phase-title">
                <div className="phase-number">{phaseIndex + 1}</div>
                <div>
                  <h2>{phase.title}</h2>
                  <p className="phase-subtitle">{phase.subtitle}</p>
                </div>
              </div>
              <div className="phase-meta">
                {statusIcons[phase.status]}
                <span className="phase-duration">{phase.duration}</span>
              </div>
            </div>

            <div className="phase-items">
              {phase.items.map((item, itemIndex) => (
                <div key={item.id} className={`roadmap-item item-${item.status}`}>
                  <div className="item-header">
                    <div className="item-title">
                      {statusIcons[item.status]}
                      <h3>{item.title}</h3>
                      <div className="item-badges">
                        <span className={`priority-badge ${priorityColors[item.priority]}`}>
                          {item.priority}
                        </span>
                        <span className="category-badge">
                          {categoryIcons[item.category]}
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="item-estimate">
                      <Clock size={14} />
                      <span>{item.estimatedWeeks}w</span>
                    </div>
                  </div>
                  
                  <p className="item-description">{item.description}</p>
                  
                  {item.dependencies && (
                    <div className="item-dependencies">
                      <span className="dep-label">Depends on:</span>
                      {item.dependencies.map(dep => (
                        <span key={dep} className="dependency-tag">{dep}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Key Challenges */}
        <div className="challenges-section">
          <h2>Key Technical Challenges</h2>
          <div className="challenges-grid">
            <div className="challenge-card">
              <GitBranch className="challenge-icon" size={24} />
              <h3>Git-on-Bitcoin Implementation</h3>
              <p>
                Translating traditional git operations to BSV transactions while maintaining 
                compatibility with existing development tools and workflows.
              </p>
            </div>
            
            <div className="challenge-card">
              <Shield className="challenge-icon" size={24} />
              <h3>Smart Contract Security</h3>
              <p>
                Ensuring robust security for automated token distribution and preventing 
                abuse of the contribution reward system.
              </p>
            </div>
            
            <div className="challenge-card">
              <Database className="challenge-icon" size={24} />
              <h3>Scalability & Performance</h3>
              <p>
                Managing 30+ applications with real-time token operations while maintaining 
                fast user experience and low transaction costs.
              </p>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="success-metrics">
          <h2>Success Metrics</h2>
          <div className="metrics-list">
            <div className="metric-item">
              <CheckCircle2 className="metric-icon" size={16} />
              <span>Automatic token distribution on every PR merge</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 className="metric-icon" size={16} />
              <span>Cross-app token swaps with &lt;1 second confirmation</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 className="metric-icon" size={16} />
              <span>100+ active contributors earning tokens monthly</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 className="metric-icon" size={16} />
              <span>All 30+ apps integrated with smart contracts</span>
            </div>
            <div className="metric-item">
              <CheckCircle2 className="metric-icon" size={16} />
              <span>Governance proposals voted on by token holders</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="roadmap-footer">
          <div className="footer-actions">
            <Link href="/issues-hub" className="action-btn secondary">
              <ArrowLeft size={18} />
              Back to Issues Hub
            </Link>
            <a 
              href="https://github.com/bitcoin-corp/bitcoin-OS/discussions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              <Users size={18} />
              Discuss Roadmap
            </a>
          </div>
          <p className="footer-note">
            This roadmap is a living document. Timeline estimates may change based on 
            community feedback, technical discoveries, and resource availability.
          </p>
        </div>
      </div>
    </div>
  );
}
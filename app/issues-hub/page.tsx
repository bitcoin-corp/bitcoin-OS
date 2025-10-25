'use client'

import React from 'react';
import Link from 'next/link';
import { 
  GitBranch, 
  ExternalLink, 
  Bug,
  Zap,
  AlertCircle,
  CheckCircle2,
  GitPullRequest,
  Package,
  Scale
} from 'lucide-react';
import './issues-hub.css';

// Main products - 2x2 grid
const mainProducts = [
  { name: 'Bitcoin OS', repo: 'bitcoin-OS', icon: '🖥️', org: 'bitcoin-corp', description: 'Core operating system' },
  { name: 'Bitcoin Wallet', repo: 'bitcoin-wallet', icon: '👛', org: 'bitcoin-apps-suite', description: 'Digital wallet solution' },
  { name: 'Bitcoin Exchange', repo: 'bitcoin-exchange', icon: '💱', org: 'bitcoin-apps-suite', description: 'Trading platform' },
  { name: 'Bitcoin Apps Suite', repo: 'bitcoin-apps-suite', icon: '🏢', org: 'bitcoin-apps-suite', description: 'Application ecosystem' }
];

// Regular apps with React framework marked
const bitcoinApps = [
  { name: 'Bitcoin 3D', repo: 'bitcoin-3d', icon: '🎮' },
  { name: 'Bitcoin AI', repo: 'bitcoin-ai', icon: '🤖' },
  { name: 'Bitcoin App', repo: 'bitcoin-app', icon: '📱' },
  { name: 'Bitcoin Art', repo: 'bitcoin-art', icon: '🎨' },
  { name: 'Bitcoin Books', repo: 'bitcoin-books', icon: '📚', isReact: true },
  { name: 'Bitcoin Browser', repo: 'bitcoin-browser', icon: '🌐' },
  { name: 'Bitcoin Calendar', repo: 'bitcoin-calendar', icon: '📅' },
  { name: 'Bitcoin Chat', repo: 'bitcoin-chat', icon: '💬' },
  { name: 'Bitcoin CMS', repo: 'bitcoin-cms', icon: '📝' },
  { name: 'Bitcoin Code', repo: 'bitcoin-code', icon: '💻' },
  { name: 'Bitcoin CRM', repo: 'bitcoin-crm', icon: '👥' },
  { name: 'Bitcoin DNS', repo: 'bitcoin-dns', icon: '🌍' },
  { name: 'Bitcoin Drive', repo: 'bitcoin-drive', icon: '💾' },
  { name: 'Bitcoin Education', repo: 'bitcoin-education', icon: '🎓', isReact: true },
  { name: 'Bitcoin Email', repo: 'bitcoin-email', icon: '✉️' },
  { name: 'Bitcoin Gaming', repo: 'bitcoin-gaming', icon: '🎯' },
  { name: 'Bitcoin Identity', repo: 'bitcoin-identity', icon: '🆔' },
  { name: 'Bitcoin Jobs', repo: 'bitcoin-jobs', icon: '💼' },
  { name: 'Bitcoin Maps', repo: 'bitcoin-maps', icon: '🗺️' },
  { name: 'Bitcoin Marketing', repo: 'bitcoin-marketing', icon: '📣' },
  { name: 'Bitcoin Music', repo: 'bitcoin-music', icon: '🎵' },
  { name: 'Bitcoin Paint', repo: 'bitcoin-paint', icon: '🖌️' },
  { name: 'Bitcoin Photos', repo: 'bitcoin-photos', icon: '📸' },
  { name: 'Bitcoin Radio', repo: 'bitcoin-radio', icon: '📻' },
  { name: 'Bitcoin Search', repo: 'bitcoin-search', icon: '🔍' },
  { name: 'Bitcoin Shares', repo: 'bitcoin-shares', icon: '📊' },
  { name: 'Bitcoin Social', repo: 'bitcoin-social', icon: '👫', isReact: true },
  { name: 'Bitcoin Spreadsheets', repo: 'bitcoin-spreadsheets', icon: '📈', isReact: true },
  { name: 'Bitcoin Twitter', repo: 'bitcoin-twitter', icon: '🐦' },
  { name: 'Bitcoin Video', repo: 'bitcoin-video', icon: '🎬' },
  { name: 'Bitcoin Writer', repo: 'bitcoin-writer', icon: '✍️' }
];

export default function IssuesHubPage() {
  return (
    <div className="issues-hub-page">
      <div className="issues-hub-container">
        {/* Header */}
        <div className="hub-header">
          <div className="header-content">
            <div className="header-title">
              <GitBranch size={32} className="header-icon" />
              <h1>Bitcoin OS Issues Hub</h1>
            </div>
            <p className="header-description">
              Central management dashboard for all Bitcoin OS ecosystem issues and development tasks
            </p>
          </div>
        </div>

        {/* Bitcoin Contracts Section - Foundation */}
        <div className="contracts-section">
          <div className="section-header">
            <h2>Smart Contract Foundation</h2>
            <span className="badge primary">Infrastructure</span>
          </div>
          
          <div className="contracts-card">
            <div className="repo-info">
              <span className="app-icon">📜</span>
              <div className="repo-details">
                <h3>Bitcoin Contracts</h3>
                <p>BSV smart contracts powering the entire ecosystem</p>
              </div>
            </div>
            
            <div className="repo-actions">
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-contracts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn secondary"
              >
                <GitBranch size={18} />
                Repository
                <ExternalLink size={14} />
              </a>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-contracts/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                <Bug size={18} />
                View Issues
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Main Products Grid - 2x2 */}
        <div className="main-products-section">
          <div className="section-header">
            <h2>Main Products</h2>
            <span className="badge primary">Bitcoin Corporation</span>
          </div>
          
          <div className="products-grid">
            {mainProducts.map((product) => (
              <div key={product.repo} className="product-card">
                <div className="product-header">
                  <span className="product-icon">{product.icon}</span>
                  <h3>{product.name}</h3>
                </div>
                <p className="product-description">{product.description}</p>
                
                <div className="product-actions">
                  <a 
                    href={`https://github.com/${product.org}/${product.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link repo"
                    title="View Repository"
                  >
                    <GitBranch size={16} />
                    Repository
                  </a>
                  
                  <a 
                    href={`https://github.com/${product.org}/${product.repo}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link issues"
                    title="View Issues"
                  >
                    <Bug size={16} />
                    Issues
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bitcoin Apps Section */}
        <div className="apps-section">
          <div className="section-header">
            <h2>Bitcoin Applications</h2>
            <span className="badge">30 Applications</span>
          </div>
          
          <div className="apps-table">
            <div className="table-header">
              <div className="col-app">Application</div>
              <div className="col-actions">Actions</div>
            </div>
            
            {bitcoinApps.map((app) => (
              <div key={app.repo} className={`app-row ${app.isReact ? 'react-app' : ''}`}>
                <div className="app-info">
                  <span className="app-icon">{app.icon}</span>
                  <span className="app-name">
                    {app.name}
                    {app.isReact && <span className="react-badge">React - Migration Needed</span>}
                  </span>
                </div>
                
                <div className="app-actions">
                  <a 
                    href={`https://github.com/bitcoin-apps-suite/${app.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link repo"
                    title="View Repository"
                  >
                    <GitBranch size={16} />
                    Repository
                    <ExternalLink size={12} />
                  </a>
                  
                  <a 
                    href={`https://github.com/bitcoin-apps-suite/${app.repo}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-link issues"
                    title="View Issues"
                  >
                    <Bug size={16} />
                    Issues
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            <div className="action-card">
              <AlertCircle size={20} className="icon warning" />
              <div>
                <h4>Report a Bug</h4>
                <p>Found an issue? Report it to the appropriate repository</p>
              </div>
            </div>
            
            <div className="action-card">
              <Zap size={20} className="icon feature" />
              <div>
                <h4>Request Feature</h4>
                <p>Have an idea? Submit a feature request</p>
              </div>
            </div>
            
            <div className="action-card">
              <CheckCircle2 size={20} className="icon success" />
              <div>
                <h4>Contribute</h4>
                <p>Help us build by contributing to open issues</p>
              </div>
            </div>
            
            <Link href="/licensing-strategy" className="action-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Scale size={20} className="icon primary" />
              <div>
                <h4>Licensing Strategy</h4>
                <p>Understand our AGPL licensing and CLA requirements</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="hub-footer">
          <p>
            View all repositories at{' '}
            <a 
              href="https://github.com/orgs/bitcoin-apps-suite/repositories" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Bitcoin Apps Suite Organization
              <ExternalLink size={14} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
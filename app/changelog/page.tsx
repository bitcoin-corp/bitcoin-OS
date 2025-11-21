'use client'

import { motion } from 'framer-motion'
import { FileText, Zap, Bug, Shield, Package, Sparkles, GitCommit, Calendar, ArrowUp, CheckCircle, AlertCircle, Info } from 'lucide-react'
import './styles.css'

export default function ChangelogPage() {
  const releases = [
    {
      version: 'v2.5.0',
      date: '2024-01-15',
      type: 'major',
      title: 'Developer Contracting System',
      description: 'Major update introducing the complete developer contracting ecosystem',
      changes: {
        features: [
          'New developer offer creation system',
          'Smart contract deployment for dev agreements',
          'Integrated payment processing with $bOS tokens',
          'Real-time contract status tracking',
          'Developer reputation system'
        ],
        improvements: [
          'Enhanced API response times by 40%',
          'Optimized compute resource allocation',
          'Better error handling in contract execution',
          'Improved mobile responsiveness'
        ],
        fixes: [
          'Fixed memory leak in compute instances',
          'Resolved wallet balance sync issues',
          'Corrected timezone handling in contracts'
        ]
      }
    },
    {
      version: 'v2.4.0',
      date: '2024-01-08',
      type: 'minor',
      title: 'Compute Exchange Launch',
      description: 'Introducing the decentralized compute resource marketplace',
      changes: {
        features: [
          'Compute resource marketplace',
          'BOSac (Bitcoin OS Atomic Contracts) integration',
          'Resource bidding system',
          'Enterprise solutions portal'
        ],
        improvements: [
          'Faster node synchronization',
          'Reduced latency in API calls',
          'Enhanced security protocols'
        ],
        fixes: [
          'Fixed UI glitches in dark mode',
          'Resolved API rate limiting issues'
        ]
      }
    },
    {
      version: 'v2.3.2',
      date: '2024-01-02',
      type: 'patch',
      title: 'Security & Performance Update',
      description: 'Critical security patches and performance optimizations',
      changes: {
        features: [],
        improvements: [
          'Strengthened authentication system',
          'Optimized database queries',
          'Reduced bundle size by 25%'
        ],
        fixes: [
          'Patched XSS vulnerability in user inputs',
          'Fixed race condition in transaction processing',
          'Resolved WebSocket connection drops'
        ]
      }
    },
    {
      version: 'v2.3.0',
      date: '2023-12-20',
      type: 'minor',
      title: 'App Marketplace Beta',
      description: 'Beta launch of the Bitcoin OS app marketplace',
      changes: {
        features: [
          'App submission and review system',
          'Developer dashboard',
          'App analytics and metrics',
          'Revenue sharing implementation'
        ],
        improvements: [
          'Better app discovery algorithms',
          'Streamlined deployment process',
          'Enhanced documentation'
        ],
        fixes: [
          'Fixed app icon rendering issues',
          'Corrected payment distribution calculations'
        ]
      }
    },
    {
      version: 'v2.2.0',
      date: '2023-12-10',
      type: 'minor',
      title: 'Token System Upgrade',
      description: 'Major upgrade to the $bOS token ecosystem',
      changes: {
        features: [
          'Token staking mechanism',
          'Governance voting system',
          'Reward distribution automation',
          'Multi-sig wallet support'
        ],
        improvements: [
          'Gas optimization for token transfers',
          'Better token metrics tracking',
          'Enhanced wallet UI'
        ],
        fixes: [
          'Fixed decimal precision in token calculations',
          'Resolved token balance display issues'
        ]
      }
    }
  ]

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'major': return Sparkles
      case 'minor': return Package
      case 'patch': return Shield
      default: return GitCommit
    }
  }

  const getTypeBadgeClass = (type: string) => {
    switch(type) {
      case 'major': return 'badge-major'
      case 'minor': return 'badge-minor'
      case 'patch': return 'badge-patch'
      default: return ''
    }
  }

  return (
    <div className="changelog-page">
      <div className="changelog-header">
        <motion.div 
          className="header-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FileText className="header-icon" />
          <h1 className="header-title">Changelog</h1>
          <p className="header-subtitle">
            Track the evolution of Bitcoin OS
          </p>
          
          <div className="version-info">
            <div className="current-version">
              <span className="version-label">Current Version</span>
              <span className="version-number">v2.5.0</span>
            </div>
            <div className="release-cycle">
              <span className="cycle-label">Release Cycle</span>
              <span className="cycle-value">Weekly</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="changelog-container">
        <div className="changelog-timeline">
          {releases.map((release, index) => {
            const TypeIcon = getTypeIcon(release.type)
            
            return (
              <motion.div 
                key={release.version}
                className="release-entry"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="release-marker">
                  <TypeIcon className="marker-icon" />
                  <div className="timeline-line" />
                </div>
                
                <div className="release-content">
                  <div className="release-header">
                    <div className="release-meta">
                      <h2 className="release-version">{release.version}</h2>
                      <span className={`release-badge ${getTypeBadgeClass(release.type)}`}>
                        {release.type}
                      </span>
                    </div>
                    <div className="release-date">
                      <Calendar size={14} />
                      {release.date}
                    </div>
                  </div>
                  
                  <h3 className="release-title">{release.title}</h3>
                  <p className="release-description">{release.description}</p>
                  
                  <div className="release-changes">
                    {release.changes.features.length > 0 && (
                      <div className="change-section">
                        <h4 className="change-title">
                          <Zap className="change-icon features" />
                          New Features
                        </h4>
                        <ul className="change-list">
                          {release.changes.features.map((feature, i) => (
                            <li key={i}>
                              <CheckCircle className="list-icon" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {release.changes.improvements.length > 0 && (
                      <div className="change-section">
                        <h4 className="change-title">
                          <ArrowUp className="change-icon improvements" />
                          Improvements
                        </h4>
                        <ul className="change-list">
                          {release.changes.improvements.map((improvement, i) => (
                            <li key={i}>
                              <Info className="list-icon" />
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {release.changes.fixes.length > 0 && (
                      <div className="change-section">
                        <h4 className="change-title">
                          <Bug className="change-icon fixes" />
                          Bug Fixes
                        </h4>
                        <ul className="change-list">
                          {release.changes.fixes.map((fix, i) => (
                            <li key={i}>
                              <AlertCircle className="list-icon" />
                              <span>{fix}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <div className="changelog-footer">
          <p>For more detailed information about each release, visit our <a href="https://github.com/bitcoin-apps-suite/bitcoin-OS/releases" target="_blank" rel="noopener noreferrer">GitHub Releases</a> page.</p>
        </div>
      </div>
    </div>
  )
}
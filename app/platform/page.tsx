'use client'

import React from 'react';
import './platform.css';

export default function PlatformPage() {
  return (
    <div className="platform-page">
      <div className="platform-container">
        {/* Hero Section */}
        <section className="platform-hero">
          <h1><span style={{color: '#ffffff'}}>Bitcoin</span> <span style={{color: '#f7931a'}}>OS</span></h1>
          <p className="platform-tagline">
            A Distributed Operating System for the Decentralized Web
          </p>
          <div className="platform-badge">DISTRIBUTED COMPUTING</div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2>The Bitcoin OS Vision</h2>
          <div className="philosophy-content">
            <p>
              Bitcoin OS is a <strong>distributed operating system</strong> that transforms how applications run 
              and resources are allocated in the decentralized web. Built on Bitcoin's foundation, it enables 
              seamless execution of bApps (Bitcoin Apps) while creating a marketplace for computing resources.
            </p>
            <p>
              Our platform tokenizes computing resources—CPU, memory, storage, and bandwidth—allowing users to 
              buy, sell, and trade these resources in a global, permissionless marketplace. This creates a 
              truly decentralized cloud computing ecosystem.
            </p>
            <div className="philosophy-points">
              <div className="point">
                <h3>Distributed Architecture</h3>
                <p>Run bApps across a global network of nodes</p>
              </div>
              <div className="point">
                <h3>Resource Tokenization</h3>
                <p>Buy and sell computing power as tradeable tokens</p>
              </div>
              <div className="point">
                <h3>Native Bitcoin Integration</h3>
                <p>Built on BSV for scalability and micropayments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="architecture-section">
          <h2>System Architecture</h2>
          <div className="model-card">
            <h3>Core Components</h3>
            <ul>
              <li>
                <strong>bApp Runtime:</strong> Sandboxed execution environment for Bitcoin applications 
                with native blockchain integration and resource metering
              </li>
              <li>
                <strong>Resource Manager:</strong> Dynamic allocation and scheduling of computing resources 
                across the distributed network
              </li>
              <li>
                <strong>Token Exchange:</strong> Real-time marketplace for tokenized computing resources 
                with automatic price discovery
              </li>
              <li>
                <strong>Consensus Layer:</strong> Distributed agreement on resource allocation, app state, 
                and transaction settlement
              </li>
            </ul>
          </div>

          <div className="model-card">
            <h3>bApps Ecosystem</h3>
            <ul>
              <li>
                <strong>Native Applications:</strong> Full suite of productivity, creative, and business 
                applications running natively on Bitcoin OS
              </li>
              <li>
                <strong>Developer Tools:</strong> Comprehensive SDK, APIs, and frameworks for building 
                distributed applications
              </li>
              <li>
                <strong>Interoperability:</strong> Seamless integration between bApps, shared state, 
                and cross-app transactions
              </li>
              <li>
                <strong>Progressive Web Apps:</strong> Web-first architecture ensuring universal access 
                from any device with a browser
              </li>
            </ul>
          </div>
        </section>

        {/* Resource Economy Section */}
        <section className="business-section">
          <h2>The Resource Economy</h2>
          <div className="business-content">
            <p className="intro">
              Bitcoin OS creates a new economic model where computing resources become liquid, tradeable 
              assets. Users can monetize idle resources or purchase additional capacity on-demand.
            </p>

            <div className="business-model">
              <h3>Resource Types</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>CPU Tokens</h4>
                  <p>Processing power for computation</p>
                  <p className="price">Dynamic pricing</p>
                </div>
                <div className="stream featured">
                  <h4>Memory Tokens</h4>
                  <p>RAM for active application state</p>
                  <p className="price">Per GB-hour</p>
                </div>
                <div className="stream">
                  <h4>Storage Tokens</h4>
                  <p>Persistent data storage</p>
                  <p className="price">Per TB-month</p>
                </div>
              </div>
              
              <h3 style={{marginTop: '40px'}}>Market Dynamics</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Supply Side</h4>
                  <p>Node operators provide resources</p>
                  <p className="price">Earn tokens</p>
                </div>
                <div className="stream featured">
                  <h4>Exchange Layer</h4>
                  <p>Automated market making</p>
                  <p className="price">0.5% fee</p>
                </div>
                <div className="stream">
                  <h4>Demand Side</h4>
                  <p>bApp users consume resources</p>
                  <p className="price">Pay tokens</p>
                </div>
              </div>
            </div>

            <div className="value-flow">
              <h3>Economic Flow</h3>
              <div className="flow-diagram">
                <div className="flow-item">
                  <span>Users run bApps</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Resources consumed & metered</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Tokens transferred to providers</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Exchange fees to $bOS holders</span>
                </div>
              </div>
              <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>
                The resource exchange enables efficient allocation of computing power while creating 
                sustainable economics for the entire ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="contribute-section">
          <h2>Key Features</h2>
          <div className="contribute-steps">
            <div className="step">
              <div className="step-number">∞</div>
              <h3>Infinite Scalability</h3>
              <p>Add nodes to increase network capacity without limits</p>
            </div>
            <div className="step">
              <div className="step-number">⚡</div>
              <h3>Instant Micropayments</h3>
              <p>Pay for resources per-second with BSV microtransactions</p>
            </div>
            <div className="step">
              <div className="step-number">🔒</div>
              <h3>Cryptographic Security</h3>
              <p>End-to-end encryption and blockchain-verified execution</p>
            </div>
            <div className="step">
              <div className="step-number">🌍</div>
              <h3>Global Access</h3>
              <p>Access your OS and apps from anywhere, on any device</p>
            </div>
          </div>

          <div className="contribution-examples">
            <h3>Current bApps</h3>
            <ul>
              <li>✅ Bitcoin Writer - Document creation & collaboration</li>
              <li>✅ Bitcoin Drive - Distributed file storage</li>
              <li>✅ Bitcoin Calendar - Scheduling & time management</li>
              <li>✅ Bitcoin Email - Encrypted communications</li>
              <li>✅ Bitcoin Spreadsheets - Data analysis & computation</li>
              <li>✅ Bitcoin Music - Audio streaming & creation</li>
            </ul>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2>Network Statistics</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Active Nodes</h3>
              <p className="stat-value">1</p>
              <p className="stat-label">Network participants</p>
            </div>
            <div className="stat">
              <h3>bApps</h3>
              <p className="stat-value">30+</p>
              <p className="stat-label">Available applications</p>
            </div>
            <div className="stat">
              <h3>Resources</h3>
              <p className="stat-value">∞</p>
              <p className="stat-label">Scalable capacity</p>
            </div>
            <div className="stat">
              <h3>Network</h3>
              <p className="stat-value">BSV</p>
              <p className="stat-label">Blockchain</p>
            </div>
          </div>
        </section>

        {/* Technical Section */}
        <section className="legal-section">
          <h2>Technical Foundation</h2>
          <div className="legal-content">
            <p>
              <strong>Bitcoin Script VM:</strong> Bitcoin OS leverages the Bitcoin Script virtual machine 
              for secure, deterministic computation. Smart contracts handle resource allocation, payment 
              routing, and state management.
            </p>
            <p>
              <strong>IPFS Integration:</strong> Distributed storage layer using IPFS for content-addressed 
              data, ensuring redundancy and availability across the network.
            </p>
            <p>
              <strong>WebAssembly Runtime:</strong> bApps compile to WASM for portable, sandboxed execution 
              across heterogeneous node infrastructure with near-native performance.
            </p>
            <p>
              <strong>Lightning Network:</strong> Payment channels enable instant micropayments for resource 
              consumption without blockchain congestion.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Join the Distributed Revolution</h2>
          <div className="cta-buttons">
            <a 
              href="/docs" 
              className="cta-btn primary"
            >
              Read Documentation
            </a>
            <a 
              href="/token" 
              className="cta-btn secondary"
            >
              Learn About $bOS Token
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
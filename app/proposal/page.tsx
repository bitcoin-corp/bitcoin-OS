'use client'

import React from 'react';
import './proposal.css';
import Footer from '@/components/Footer';

export default function ProposalPage() {
  return (
    <div className="proposal-page">
      <div className="proposal-container">
        {/* Hero Section */}
        <section className="proposal-hero">
          <div className="hero-badge">BUSINESS PROPOSAL</div>
          <h1><span style={{color: '#ffffff'}}>Bitcoin OS</span> <span style={{color: '#f7931a'}}>Compute Marketplace</span></h1>
          <p className="proposal-tagline">
            A Decentralized GPU & Computing Resource Exchange
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">90%</span>
              <span className="stat-label">Cost Savings vs AWS</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$2.5B</span>
              <span className="stat-label">GPU Market Size</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100K+</span>
              <span className="stat-label">Idle GPUs Globally</span>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="summary-section">
          <h2>Executive Summary</h2>
          <div className="summary-content">
            <p className="lead">
              Bitcoin OS Compute Marketplace revolutionizes distributed computing by creating a 
              <strong> tokenized marketplace</strong> for GPU and CPU resources, inspired by the success 
              of platforms like Vast.ai but enhanced with blockchain-based ownership and instant micropayments.
            </p>
            <div className="summary-grid">
              <div className="summary-card">
                <h3>The Problem</h3>
                <ul>
                  <li>Cloud GPU costs are prohibitively expensive ($3-8/hour on AWS)</li>
                  <li>Millions of consumer GPUs sit idle 95% of the time</li>
                  <li>AI/ML developers need affordable compute for training</li>
                  <li>No efficient market for small-scale resource providers</li>
                </ul>
              </div>
              <div className="summary-card">
                <h3>Our Solution</h3>
                <ul>
                  <li>Tokenized compute resources tradeable on-chain</li>
                  <li>Instant BSV micropayments per second of usage</li>
                  <li>Smart contracts for automated resource allocation</li>
                  <li>$bOS token dividends from marketplace fees</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="market-section">
          <h2>Market Opportunity</h2>
          <div className="market-content">
            <div className="market-stats">
              <div className="big-stat">
                <h3>Cloud Computing Market</h3>
                <p className="stat-huge">$600B</p>
                <p className="stat-desc">Expected by 2025</p>
              </div>
              <div className="big-stat">
                <h3>GPU Cloud Revenue</h3>
                <p className="stat-huge">$45B</p>
                <p className="stat-desc">Annual market size</p>
              </div>
              <div className="big-stat">
                <h3>AI Training Costs</h3>
                <p className="stat-huge">$100M+</p>
                <p className="stat-desc">Per large model</p>
              </div>
            </div>
            
            <div className="market-analysis">
              <h3>Target Markets</h3>
              <div className="market-grid">
                <div className="market-segment">
                  <h4>AI/ML Developers</h4>
                  <p>Training models, inference, research</p>
                  <span className="market-size">$15B market</span>
                </div>
                <div className="market-segment">
                  <h4>3D Rendering</h4>
                  <p>Animation studios, architects, designers</p>
                  <span className="market-size">$8B market</span>
                </div>
                <div className="market-segment">
                  <h4>Scientific Computing</h4>
                  <p>Research institutions, simulations</p>
                  <span className="market-size">$12B market</span>
                </div>
                <div className="market-segment">
                  <h4>Crypto Mining</h4>
                  <p>Proof-of-work, validator nodes</p>
                  <span className="market-size">$20B market</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Model */}
        <section className="model-section">
          <h2>Revenue Model</h2>
          <div className="model-content">
            <div className="revenue-breakdown">
              <h3>Transaction Fees</h3>
              <div className="fee-structure">
                <div className="fee-tier">
                  <div className="fee-header">
                    <h4>Spot Market</h4>
                    <span className="fee-rate">1.5%</span>
                  </div>
                  <p>Instant GPU/CPU rental, pay per second</p>
                  <p className="fee-example">Example: $0.50/hr GPU = $0.0075/hr fee</p>
                </div>
                <div className="fee-tier featured">
                  <div className="fee-header">
                    <h4>Reserved Instances</h4>
                    <span className="fee-rate">2.5%</span>
                  </div>
                  <p>Guaranteed resources for extended periods</p>
                  <p className="fee-example">Example: $500/month = $12.50/month fee</p>
                </div>
                <div className="fee-tier">
                  <div className="fee-header">
                    <h4>Resource Tokens</h4>
                    <span className="fee-rate">0.5%</span>
                  </div>
                  <p>Secondary market trading of compute tokens</p>
                  <p className="fee-example">Example: $1000 trade = $5 fee</p>
                </div>
              </div>
            </div>

            <div className="revenue-projection">
              <h3>Revenue Projections</h3>
              <div className="projection-table">
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Active GPUs</th>
                      <th>Monthly Volume</th>
                      <th>Revenue (2% avg)</th>
                      <th>$bOS Dividends (70%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Year 1</td>
                      <td>1,000</td>
                      <td>$500K</td>
                      <td>$10K</td>
                      <td>$7K</td>
                    </tr>
                    <tr>
                      <td>Year 2</td>
                      <td>10,000</td>
                      <td>$5M</td>
                      <td>$100K</td>
                      <td>$70K</td>
                    </tr>
                    <tr className="highlight">
                      <td>Year 3</td>
                      <td>50,000</td>
                      <td>$25M</td>
                      <td>$500K</td>
                      <td>$350K</td>
                    </tr>
                    <tr>
                      <td>Year 4</td>
                      <td>200,000</td>
                      <td>$100M</td>
                      <td>$2M</td>
                      <td>$1.4M</td>
                    </tr>
                    <tr>
                      <td>Year 5</td>
                      <td>500,000</td>
                      <td>$250M</td>
                      <td>$5M</td>
                      <td>$3.5M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenization Model */}
        <section className="token-section">
          <h2>Tokenization Strategy</h2>
          <div className="token-content">
            <div className="token-types">
              <h3>Three-Token System</h3>
              <div className="token-grid">
                <div className="token-card">
                  <div className="token-icon">💎</div>
                  <h4>$bOS Governance Token</h4>
                  <ul>
                    <li>Receives 70% of platform fees as dividends</li>
                    <li>Voting rights on protocol parameters</li>
                    <li>Staking rewards 12-20% APY</li>
                    <li>Total supply: 100M tokens</li>
                  </ul>
                </div>
                <div className="token-card">
                  <div className="token-icon">⚡</div>
                  <h4>GPU Resource Tokens</h4>
                  <ul>
                    <li>1 token = 1 GPU-hour of compute</li>
                    <li>Minted when providers stake GPUs</li>
                    <li>Burned when compute is consumed</li>
                    <li>Tradeable on secondary markets</li>
                  </ul>
                </div>
                <div className="token-card">
                  <div className="token-icon">💾</div>
                  <h4>Storage Tokens</h4>
                  <ul>
                    <li>1 token = 1 TB-month of storage</li>
                    <li>Backed by actual storage capacity</li>
                    <li>Instant settlement via BSV</li>
                    <li>Redeemable for actual storage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="token-flow">
              <h3>Economic Flow</h3>
              <div className="flow-chart">
                <div className="flow-step">
                  <span className="step-num">1</span>
                  <div className="step-content">
                    <h5>Providers List Resources</h5>
                    <p>GPU owners tokenize idle compute power</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <span className="step-num">2</span>
                  <div className="step-content">
                    <h5>Users Purchase Tokens</h5>
                    <p>Buy compute tokens with BSV or fiat</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <span className="step-num">3</span>
                  <div className="step-content">
                    <h5>Smart Contract Execution</h5>
                    <p>Automated resource allocation & payment</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <span className="step-num">4</span>
                  <div className="step-content">
                    <h5>Fee Distribution</h5>
                    <p>Platform fees paid to $bOS holders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Analysis */}
        <section className="competitive-section">
          <h2>Competitive Advantage</h2>
          <div className="competitive-content">
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight">Bitcoin OS</th>
                    <th>Vast.ai</th>
                    <th>AWS</th>
                    <th>Akash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tokenized Resources</td>
                    <td className="highlight">✅ Yes</td>
                    <td>❌ No</td>
                    <td>❌ No</td>
                    <td>✅ Yes</td>
                  </tr>
                  <tr>
                    <td>Instant Micropayments</td>
                    <td className="highlight">✅ BSV</td>
                    <td>❌ No</td>
                    <td>❌ No</td>
                    <td>⚠️ Slow</td>
                  </tr>
                  <tr>
                    <td>Revenue Sharing</td>
                    <td className="highlight">✅ 70% to holders</td>
                    <td>❌ No</td>
                    <td>❌ No</td>
                    <td>⚠️ Limited</td>
                  </tr>
                  <tr>
                    <td>Consumer GPU Support</td>
                    <td className="highlight">✅ Yes</td>
                    <td>✅ Yes</td>
                    <td>❌ No</td>
                    <td>✅ Yes</td>
                  </tr>
                  <tr>
                    <td>Average Cost/Hour</td>
                    <td className="highlight">$0.30</td>
                    <td>$0.50</td>
                    <td>$3.50</td>
                    <td>$0.40</td>
                  </tr>
                  <tr>
                    <td>Settlement Time</td>
                    <td className="highlight">Instant</td>
                    <td>Daily</td>
                    <td>Monthly</td>
                    <td>15 min</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="advantages">
              <h3>Key Differentiators</h3>
              <div className="advantage-grid">
                <div className="advantage">
                  <h4>🚀 Instant Settlement</h4>
                  <p>BSV enables per-second micropayments with zero confirmation time</p>
                </div>
                <div className="advantage">
                  <h4>💰 Token Dividends</h4>
                  <p>$bOS holders earn 70% of all platform fees automatically</p>
                </div>
                <div className="advantage">
                  <h4>🔄 Liquid Markets</h4>
                  <p>Resource tokens tradeable 24/7 on secondary markets</p>
                </div>
                <div className="advantage">
                  <h4>🌍 Global Access</h4>
                  <p>No KYC required for providers or basic users</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="roadmap-section">
          <h2>Implementation Roadmap</h2>
          <div className="roadmap-content">
            <div className="roadmap-timeline">
              <div className="roadmap-phase">
                <div className="phase-header">
                  <span className="phase-number">Phase 1</span>
                  <span className="phase-time">Q1 2025</span>
                </div>
                <h3>MVP Launch</h3>
                <ul>
                  <li>Basic GPU marketplace</li>
                  <li>BSV payment integration</li>
                  <li>Docker container support</li>
                  <li>100 beta providers</li>
                </ul>
              </div>
              
              <div className="roadmap-phase">
                <div className="phase-header">
                  <span className="phase-number">Phase 2</span>
                  <span className="phase-time">Q2 2025</span>
                </div>
                <h3>Token Launch</h3>
                <ul>
                  <li>$bOS token generation event</li>
                  <li>GPU resource token minting</li>
                  <li>Staking mechanisms</li>
                  <li>1,000 active GPUs</li>
                </ul>
              </div>
              
              <div className="roadmap-phase">
                <div className="phase-header">
                  <span className="phase-number">Phase 3</span>
                  <span className="phase-time">Q3 2025</span>
                </div>
                <h3>Scale & Expand</h3>
                <ul>
                  <li>Secondary token markets</li>
                  <li>Enterprise partnerships</li>
                  <li>API for developers</li>
                  <li>10,000 active GPUs</li>
                </ul>
              </div>
              
              <div className="roadmap-phase">
                <div className="phase-header">
                  <span className="phase-number">Phase 4</span>
                  <span className="phase-time">Q4 2025</span>
                </div>
                <h3>Full Ecosystem</h3>
                <ul>
                  <li>Storage token launch</li>
                  <li>Cross-chain bridges</li>
                  <li>DAO governance</li>
                  <li>50,000 active GPUs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Ask */}
        <section className="investment-section">
          <h2>Investment Opportunity</h2>
          <div className="investment-content">
            <div className="investment-ask">
              <h3>Seed Round</h3>
              <div className="ask-details">
                <div className="ask-item">
                  <span className="ask-label">Raising</span>
                  <span className="ask-value">$2.5M</span>
                </div>
                <div className="ask-item">
                  <span className="ask-label">Valuation</span>
                  <span className="ask-value">$10M</span>
                </div>
                <div className="ask-item">
                  <span className="ask-label">Token Allocation</span>
                  <span className="ask-value">25M $bOS (25%)</span>
                </div>
              </div>
            </div>

            <div className="use-of-funds">
              <h3>Use of Funds</h3>
              <div className="funds-breakdown">
                <div className="fund-item">
                  <div className="fund-bar" style={{width: '40%'}}>
                    <span>Development (40%)</span>
                  </div>
                  <span className="fund-amount">$1M</span>
                </div>
                <div className="fund-item">
                  <div className="fund-bar" style={{width: '25%'}}>
                    <span>Marketing (25%)</span>
                  </div>
                  <span className="fund-amount">$625K</span>
                </div>
                <div className="fund-item">
                  <div className="fund-bar" style={{width: '20%'}}>
                    <span>Operations (20%)</span>
                  </div>
                  <span className="fund-amount">$500K</span>
                </div>
                <div className="fund-item">
                  <div className="fund-bar" style={{width: '15%'}}>
                    <span>Legal & Compliance (15%)</span>
                  </div>
                  <span className="fund-amount">$375K</span>
                </div>
              </div>
            </div>

            <div className="roi-projection">
              <h3>Projected Returns</h3>
              <div className="roi-metrics">
                <div className="roi-item">
                  <h4>Year 3 Revenue</h4>
                  <p className="roi-value">$6M ARR</p>
                  <p className="roi-detail">$350K monthly dividends</p>
                </div>
                <div className="roi-item">
                  <h4>Year 5 Valuation</h4>
                  <p className="roi-value">$250M</p>
                  <p className="roi-detail">25x return potential</p>
                </div>
                <div className="roi-item">
                  <h4>Token Price Target</h4>
                  <p className="roi-value">$2.50</p>
                  <p className="roi-detail">From $0.10 launch</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Team & Advisors</h2>
          <div className="team-content">
            <p className="team-intro">
              The Bitcoin Corporation LTD brings together experts in blockchain, distributed systems, 
              and marketplace dynamics to build the future of decentralized computing.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <h4>Executive Team</h4>
                <p>Blockchain & distributed systems experts with successful exits</p>
              </div>
              <div className="team-member">
                <h4>Technical Team</h4>
                <p>Engineers from AWS, Google Cloud, and major GPU compute platforms</p>
              </div>
              <div className="team-member">
                <h4>Advisory Board</h4>
                <p>Leaders from Vast.ai, RunPod, and cloud computing industry</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Join the Compute Revolution</h2>
          <p className="cta-subtitle">
            Be part of the decentralized future of computing
          </p>
          <div className="cta-buttons">
            <a href="/token" className="cta-btn primary">
              Learn About $bOS Token
            </a>
            <a href="mailto:invest@bitcoinos.com" className="cta-btn secondary">
              Contact for Investment
            </a>
            <a href="https://github.com/bitcoin-corp/bitcoin-OS" target="_blank" rel="noopener noreferrer" className="cta-btn tertiary">
              View Technical Docs
            </a>
          </div>
          <div className="contact-info">
            <p>The Bitcoin Corporation LTD</p>
            <p>Registered in England and Wales • Company No. 16735102</p>
            <p>Email: <a href="mailto:hello@bitcoinos.com">hello@bitcoinos.com</a></p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
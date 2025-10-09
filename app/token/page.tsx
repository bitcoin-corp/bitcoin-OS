'use client'

import React from 'react';
import './token.css';
import Footer from '@/components/Footer';

export default function TokenPage() {
  return (
    <div className="token-page">
      <div className="token-container">
        {/* Hero Section */}
        <section className="token-hero">
          <h1><span style={{color: '#ffffff'}}>The</span> <span style={{color: '#f7931a'}}>$bOS</span> <span style={{color: '#ffffff'}}>Token</span></h1>
          <p className="token-tagline">
            Tokenized computing resources meet sustainable economics
          </p>
          <div className="token-badge">$bOS</div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <h2>The $bOS Token Model</h2>
          <div className="philosophy-content">
            <p>
              The $bOS token is the <strong>economic foundation</strong> of Bitcoin OS, representing 
              ownership in the distributed computing marketplace. Token holders receive dividends from 
              the revenue generated through resource exchange fees.
            </p>
            <p>
              As users buy and sell tokenized computing resources—CPU, memory, storage, and bandwidth—the 
              platform collects exchange fees. These fees are distributed to $bOS holders, creating a 
              sustainable economic model that rewards participation in the ecosystem.
            </p>
            <div className="philosophy-points">
              <div className="point">
                <h3>Revenue Sharing</h3>
                <p>Earn dividends from platform exchange fees</p>
              </div>
              <div className="point">
                <h3>Governance Rights</h3>
                <p>Vote on protocol upgrades and fee structures</p>
              </div>
              <div className="point">
                <h3>Liquidity Mining</h3>
                <p>Earn rewards for providing market liquidity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Token Economics Section */}
        <section className="token-model-section">
          <h2>Token Economics</h2>
          <div className="model-card">
            <h3>Revenue Sources</h3>
            <ul>
              <li>
                <strong>Resource Exchange Fees:</strong> 0.5% fee on all tokenized computing resource 
                trades, including CPU, memory, storage, and bandwidth transactions
              </li>
              <li>
                <strong>bApp Marketplace:</strong> 2.5% fee on premium bApp purchases and in-app 
                transactions within the Bitcoin OS ecosystem
              </li>
              <li>
                <strong>Cross-Chain Bridge:</strong> 1% fee for bridging assets between BSV and other 
                blockchain networks
              </li>
              <li>
                <strong>Enterprise Services:</strong> Premium support, SLA guarantees, and custom 
                deployment services for institutional clients
              </li>
            </ul>
          </div>

          <div className="model-card">
            <h3>Distribution Model</h3>
            <ul>
              <li>
                <strong>Dividend Distribution:</strong> 70% of platform revenues distributed quarterly 
                to $bOS token holders proportional to their holdings
              </li>
              <li>
                <strong>Development Fund:</strong> 20% allocated to ongoing development, security audits, 
                and ecosystem growth initiatives
              </li>
              <li>
                <strong>Treasury Reserve:</strong> 10% held in reserve for market stability and 
                strategic opportunities
              </li>
              <li>
                <strong>Staking Rewards:</strong> Additional tokens earned by staking $bOS to provide 
                network security and governance participation
              </li>
            </ul>
          </div>
        </section>

        {/* Resource Market Section */}
        <section className="business-section">
          <h2>The Resource Exchange</h2>
          <div className="business-content">
            <p className="intro">
              Bitcoin OS creates a global marketplace for computing resources, where $bOS token holders 
              capture value from every transaction. The exchange enables efficient price discovery and 
              instant settlement.
            </p>

            <div className="business-model">
              <h3>Exchange Mechanics</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Spot Market</h4>
                  <p>Instant resource trading</p>
                  <p className="price">0.5% fee</p>
                </div>
                <div className="stream featured">
                  <h4>Futures Market</h4>
                  <p>Lock in future capacity</p>
                  <p className="price">0.3% fee</p>
                </div>
                <div className="stream">
                  <h4>Options Market</h4>
                  <p>Hedge resource costs</p>
                  <p className="price">0.8% fee</p>
                </div>
              </div>
              
              <h3 style={{marginTop: '40px'}}>Resource Categories</h3>
              <div className="revenue-streams">
                <div className="stream">
                  <h4>Compute (CPU)</h4>
                  <p>Processing power tokens</p>
                  <p className="price">Per GHz-hour</p>
                </div>
                <div className="stream featured">
                  <h4>Memory (RAM)</h4>
                  <p>Active memory tokens</p>
                  <p className="price">Per GB-hour</p>
                </div>
                <div className="stream">
                  <h4>Storage (SSD)</h4>
                  <p>Persistent storage tokens</p>
                  <p className="price">Per TB-month</p>
                </div>
              </div>
            </div>

            <div className="value-flow">
              <h3>Fee Distribution Flow</h3>
              <div className="flow-diagram">
                <div className="flow-item">
                  <span>Users trade computing resources</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Exchange collects 0.5% fee</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Fees accumulate in treasury</span>
                  <span className="arrow">→</span>
                </div>
                <div className="flow-item">
                  <span>Quarterly dividends to $bOS holders</span>
                </div>
              </div>
              <p style={{textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)'}}>
                The more resources traded on the platform, the greater the dividend yield for token holders, 
                creating aligned incentives across the ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Staking Section */}
        <section className="contribute-section">
          <h2>$bOS Staking Program</h2>
          <div className="contribute-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Stake Tokens</h3>
              <p>Lock $bOS tokens in smart contract</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Earn Rewards</h3>
              <p>Receive staking APY plus fee share</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Governance Power</h3>
              <p>Vote on protocol parameters</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Compound Returns</h3>
              <p>Auto-compound for maximum yield</p>
            </div>
          </div>

          <div className="contribution-examples">
            <h3>Staking Benefits</h3>
            <ul>
              <li>✅ 12-20% APY base staking rewards</li>
              <li>✅ Additional share of exchange fees</li>
              <li>✅ Governance voting rights</li>
              <li>✅ Priority access to new features</li>
              <li>✅ Reduced trading fees on exchange</li>
              <li>✅ Airdrops from partner projects</li>
            </ul>
          </div>
        </section>

        {/* Token Stats Section */}
        <section className="stats-section">
          <h2>Token Metrics</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3>Total Supply</h3>
              <p className="stat-value">100,000,000</p>
              <p className="stat-label">$bOS tokens</p>
            </div>
            <div className="stat">
              <h3>Circulating</h3>
              <p className="stat-value">0</p>
              <p className="stat-label">In circulation</p>
            </div>
            <div className="stat">
              <h3>Staked</h3>
              <p className="stat-value">0%</p>
              <p className="stat-label">Of supply</p>
            </div>
            <div className="stat">
              <h3>Network</h3>
              <p className="stat-value">BSV</p>
              <p className="stat-label">Blockchain</p>
            </div>
          </div>
        </section>

        {/* Allocation Section */}
        <section className="legal-section">
          <h2>Token Allocation</h2>
          <div className="legal-content">
            <p>
              <strong>Community (40%):</strong> Reserved for community rewards, airdrops, liquidity mining, 
              and ecosystem incentives. Distributed over 4 years to ensure long-term alignment.
            </p>
            <p>
              <strong>Team & Advisors (20%):</strong> Allocated to founding team and advisors with 2-year 
              vesting schedule and 6-month cliff to ensure commitment.
            </p>
            <p>
              <strong>Development Fund (20%):</strong> Reserved for ongoing development, security audits, 
              and infrastructure costs. Released quarterly based on milestones.
            </p>
            <p>
              <strong>Public Sale (15%):</strong> Available for public purchase through regulated token 
              sale events and exchange listings.
            </p>
            <p>
              <strong>Strategic Partners (5%):</strong> Reserved for strategic partnerships, exchange 
              listings, and market makers to ensure liquidity.
            </p>
          </div>
        </section>

        {/* Legal Notice Section */}
        <section className="legal-section">
          <h2>Legal & Regulatory Notice</h2>
          <div className="legal-content">
            <p>
              <strong>Security Considerations:</strong> The $bOS token is designed as a utility token 
              for the Bitcoin OS ecosystem. However, the dividend distribution mechanism may subject 
              it to securities regulations in certain jurisdictions.
            </p>
            <p>
              <strong>Regulatory Compliance:</strong> We are committed to working with regulators to 
              ensure compliance with applicable laws. Token holders should consult their own legal 
              and tax advisors.
            </p>
            <p>
              <strong>Risk Disclosure:</strong> Cryptocurrency investments carry significant risks. 
              The value of $bOS tokens may fluctuate dramatically. Past performance does not guarantee 
              future results.
            </p>
            <p>
              By acquiring $bOS tokens, you acknowledge understanding these risks and agree to conduct 
              your own due diligence. This is not investment advice or a solicitation to purchase tokens.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Join the Computing Revolution</h2>
          <div className="cta-buttons">
            <a 
              href="https://github.com/bitcoin-corp/bitcoin-OS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-btn primary"
            >
              <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              View on GitHub
            </a>
            <a 
              href="/platform" 
              className="cta-btn secondary"
            >
              Learn About Bitcoin OS
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
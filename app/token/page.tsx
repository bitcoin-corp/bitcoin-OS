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
            Token plans are paused pending legal review
          </p>
          <div className="token-badge">$bOS</div>
        </section>

        {/* Status Notice */}
        <section className="legal-section">
          <h2>Current Status</h2>
          <div className="legal-content">
            <p>
              <strong>Plans paused.</strong> All plans for a $bOS token are on hold while they are
              reviewed by legal advisers. No $bOS tokens have been issued, none are in circulation,
              and none are being offered for sale.
            </p>
            <p>
              <strong>No offer.</strong> Nothing on this site is an offer to sell, or a solicitation to
              buy, tokens, shares or any other investment. No dividends, revenue share, staking rewards
              or other returns are offered or promised.
            </p>
            <p>
              <strong>Do not send funds.</strong> Bitcoin OS does not accept deposits or payments for
              tokens. If anyone asks you to send money to buy $bOS, it is not us.
            </p>
            <p>
              Any future token design will be published here once the review is complete.
            </p>
          </div>
        </section>

        {/* What Bitcoin OS is */}
        <section className="philosophy-section">
          <h2>About Bitcoin OS</h2>
          <div className="philosophy-content">
            <p>
              Bitcoin OS is an open-source, browser-based desktop that brings Bitcoin apps (bApps) together
              in one place. The code is public on GitHub, and you can use it without holding any token.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Explore Bitcoin OS</h2>
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

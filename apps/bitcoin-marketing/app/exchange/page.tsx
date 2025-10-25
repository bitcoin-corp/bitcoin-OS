'use client';

import React from 'react';
import './exchange.css';

const ExchangePage: React.FC = () => {
  return (
    <div className="app-wrapper">
      {/* App Header */}
      <div className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" rx="40" fill="url(#gradient)"/>
                <path d="M50 150 Q80 40 150 50 Q120 80 100 120 L90 130 Q70 140 50 150 Z" fill="#2D3748" stroke="#2D3748" strokeWidth="2"/>
                <path d="M70 100 Q90 80 110 90" stroke="#2D3748" strokeWidth="1.5" fill="none"/>
                <path d="M80 120 Q95 105 115 110" stroke="#2D3748" strokeWidth="1.5" fill="none"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#B91C1C", stopOpacity:1}} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">Bitcoin</span>
            <span className="logo-marketing">Marketing</span>
          </div>
          <p className="header-tagline">Blockchain-powered marketing campaigns with $bMarketing</p>
        </div>
      </div>
      
      <div style={{
        marginLeft: '20px',
        marginRight: '20px',
        padding: '1rem 2rem',
        paddingTop: '1rem'
      }}
      className="exchange-main-container">

        {/* Exchange View Container */}
        <div className="exchange-page-container">
          <div className="marketing-exchange">
            <div className="exchange-hero">
              <h1>Marketing Campaign Exchange</h1>
              <p>Trade marketing assets, campaign shares, and $bMarketing tokens</p>
            </div>
            
            <div className="exchange-features">
              <div className="feature-card">
                <h3>Campaign Trading</h3>
                <p>Buy and sell shares in marketing campaigns</p>
              </div>
              
              <div className="feature-card">
                <h3>Asset Marketplace</h3>
                <p>Trade marketing assets and creative content</p>
              </div>
              
              <div className="feature-card">
                <h3>Token Exchange</h3>
                <p>Exchange $bMarketing tokens with other users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangePage;
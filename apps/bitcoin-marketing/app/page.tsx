/**
 * Bitcoin Marketing - A blockchain-based marketing platform
 * Copyright (C) 2025 The Bitcoin Corporation LTD
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * For commercial licensing options, please contact The Bitcoin Corporation LTD.
 */

'use client';

import { useState } from 'react';
import LoadingDoor from '../components/LoadingDoor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Door Animation - overlays content */}
      {isLoading && <LoadingDoor onComplete={() => setIsLoading(false)} />}
      
      {/* Main app content - visible immediately, revealed by sliding door */}
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
        
        <div className="main-container">
          <div className="marketing-dashboard">
            <div className="hero-section">
              <h1 className="hero-title">Bitcoin Marketing Platform</h1>
              <p className="hero-subtitle">
                Launch decentralized marketing campaigns, track performance on-chain, and earn $bMarketing tokens
              </p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h3>Campaign Management</h3>
                  <p>Create and manage blockchain-based marketing campaigns with transparent tracking</p>
                </div>
                
                <div className="feature-card">
                  <h3>Token Rewards</h3>
                  <p>Earn $bMarketing tokens for successful campaigns and engagement metrics</p>
                </div>
                
                <div className="feature-card">
                  <h3>Analytics Dashboard</h3>
                  <p>Real-time analytics and performance metrics stored on the Bitcoin blockchain</p>
                </div>
                
                <div className="feature-card">
                  <h3>Decentralized Advertising</h3>
                  <p>Create transparent, blockchain-verified advertising campaigns</p>
                </div>
              </div>
              
              <div className="cta-section">
                <button className="cta-button primary">
                  Launch Campaign
                </button>
                <button className="cta-button secondary">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
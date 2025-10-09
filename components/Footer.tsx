// Open BSV License version 5
// Copyright © 2025 The Bitcoin Corporation LTD
// Registered in England and Wales • Company No. 16735102
// This software can only be used on BSV blockchains

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="bitcoin-symbol">₿</span>
            <span className="app-name">OS</span>
          </div>
          <p className="footer-tagline">
            Distributed Operating System for the Decentralized Web
          </p>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li><a href="/platform">About Bitcoin OS</a></li>
            <li><a href="/docs">Documentation</a></li>
            <li><a href="/token">$bOS Token</a></li>
            <li><a href="/exchange">Resource Exchange</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><a href="https://github.com/bitcoin-corp/bitcoin-OS" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://x.com/Bitcoin_OS_X" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            <li><a href="https://discord.com/invite/bitcoinapps" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="/apps/bitcoin-jobs">Jobs</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>bApps</h4>
          <ul>
            <li><a href="/apps/bitcoin-writer">Bitcoin Writer</a></li>
            <li><a href="/apps/bitcoin-drive">Bitcoin Drive</a></li>
            <li><a href="/apps/bitcoin-calendar">Bitcoin Calendar</a></li>
            <li><a href="/apps/bitcoin-email">Bitcoin Email</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© 2025 The Bitcoin Corporation LTD</p>
          <p>Registered in England and Wales • Company No. 16735102</p>
          <p>Licensed under <a href="/LICENSE" target="_blank" rel="noopener noreferrer">Open BSV License v5</a></p>
          <p>Built on Bitcoin SV blockchain</p>
          <p className="footer-links">
            <a href="/terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
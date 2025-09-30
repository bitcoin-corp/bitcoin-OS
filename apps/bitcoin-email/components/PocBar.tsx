'use client';

import React from 'react';
import Link from 'next/link';

interface PocBarProps {
  color?: string;
}

export default function PocBar({ color = '#ff3333' }: PocBarProps) {
  return (
    <>
      <div 
        className="poc-banner"
        style={{
          position: 'fixed',
          top: 0, // At the top
          left: 0,
          right: 0,
          height: '48px',
          background: 'linear-gradient(135deg, #dc2626, #ef4444)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Space between left and right content
          zIndex: 99999,
          fontSize: '14px',
          fontWeight: '400',
          color: '#1a1a1a',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          padding: '12px 24px',
          boxSizing: 'border-box',
        }}
      >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#1a1a1a', flex: 1 }}>
          <span style={{ fontSize: '14px', fontWeight: '400', lineHeight: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
            <strong>PROOF OF CONCEPT:</strong> This is a demonstration version of Bitcoin Email. Production version coming soon!
          </span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
        <Link 
          href="/docs" 
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '600',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
          Docs
        </Link>
        
        <span style={{ color: '#666', margin: '0 4px', opacity: 0.5 }}>•</span>
        
        <Link 
          href="/token" 
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '700',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          ₿Mail
        </Link>
        
        <span style={{ color: '#666', margin: '0 4px', opacity: 0.5 }}>•</span>
        
        <Link 
          href="/contributions" 
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '600',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          Tasks
        </Link>
        
        <span style={{ color: '#666', margin: '0 4px', opacity: 0.5 }}>•</span>
        
        <a 
          href="https://github.com/bitcoin-apps-suite/bitcoin-email"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '600',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
        
        <span style={{ color: '#666', margin: '0 4px', opacity: 0.5 }}>•</span>
        
        <a 
          href="https://x.com/bitcoin_email"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '600',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          Twitter
        </a>
        
        <span style={{ color: '#666', margin: '0 4px', opacity: 0.5 }}>•</span>
        
        <a 
          href="https://discord.gg/xBB8r8dj"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: '#1a1a1a', 
            textDecoration: 'none',
            fontWeight: '600',
            margin: '0 8px',
            transition: 'all 0.2s ease',
            borderBottom: '1px solid transparent',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #1a1a1a'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
        >
          <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
          </svg>
          Discord
        </a>
      </div>
    </div>
    
    {/* Mobile styles for PocBar */}
    <style jsx>{`
      @media (max-width: 768px) {
        .poc-banner {
          height: auto !important;
          min-height: 48px !important;
          padding: 8px 12px !important;
          font-size: 12px !important;
          top: 0 !important; /* At the top on mobile */
        }
        
        .poc-banner > div:first-child {
          flex-wrap: wrap !important;
        }
        
        .poc-banner > div:last-child {
          display: none !important; /* Hide links on small mobile */
        }
      }
      
      @media (min-width: 481px) and (max-width: 768px) {
        .poc-banner > div:last-child {
          display: flex !important; /* Show links on tablets */
          flex-wrap: wrap !important;
          margin-top: 8px !important;
          width: 100% !important;
          justify-content: center !important;
        }
        
        .poc-banner > div:last-child a {
          margin: 2px 4px !important;
        }
        
        .poc-banner > div:last-child span[style*="opacity: 0.5"] {
          display: none !important; /* Hide bullet separators on mobile */
        }
      }
    `}</style>
    </>
  );
}
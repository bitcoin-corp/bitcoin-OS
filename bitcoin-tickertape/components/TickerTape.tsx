'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export interface TickerData {
  ticker: string;
  price: number;
  change24h: number;
  volume: number;
}

export interface TickerTapeProps {
  color?: string;
  data?: TickerData[];
  showNavigation?: boolean;
  navigationLinks?: Array<{
    href: string;
    label: string;
    external?: boolean;
    highlight?: boolean;
  }>;
}

const defaultTickerData: TickerData[] = [
  { ticker: '$bDNS', price: 125.50, change24h: 8.7, volume: 2450000 },
  { ticker: '$bKO', price: 250.00, change24h: 5.2, volume: 125000 },
  { ticker: '$bGOOGL', price: 400.00, change24h: -2.1, volume: 287000 },
  { ticker: '$bMSFT', price: 400.00, change24h: 3.7, volume: 156000 },
  { ticker: '$bTSLA', price: 315.00, change24h: -1.5, volume: 89000 },
  { ticker: '$bAMZN', price: 400.00, change24h: 2.8, volume: 198000 },
  { ticker: '$bNFLX', price: 300.00, change24h: -0.8, volume: 67000 },
  { ticker: '$bAPPL', price: 175.00, change24h: 4.2, volume: 312000 },
];

const defaultNavigationLinks = [
  { href: '/exchange', label: 'Exchange', highlight: true },
  { href: '/token', label: 'Token' },
  { href: 'https://github.com/bitcoin-corp', label: 'GitHub', external: true },
];

export default function TickerTape({ 
  color = 'linear-gradient(90deg, #A855F7 0%, #3B82F6 100%)',
  data = defaultTickerData,
  showNavigation = true,
  navigationLinks = defaultNavigationLinks
}: TickerTapeProps) {
  const [tickerData, setTickerData] = useState<TickerData[]>(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tickerData.length]);

  // Update ticker data when prop changes
  useEffect(() => {
    setTickerData(data);
  }, [data]);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`;
    return volume.toString();
  };

  return (
    <div 
      className="bitcoin-tickertape"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '40px',
        background: color,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999,
        fontSize: '13px',
        fontWeight: '500',
        color: 'white',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        padding: '0 12px',
      }}
    >
      {/* Live Ticker Display */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity className="w-3 h-3" style={{ color: '#10B981' }} />
          <span style={{ fontWeight: '600', color: '#10B981' }}>LIVE</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', overflow: 'hidden' }}>
          {/* Scrolling ticker items */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            animation: 'bitcoin-ticker-scroll 30s linear infinite',
            whiteSpace: 'nowrap'
          }}>
            {[...tickerData, ...tickerData].map((token, index) => (
              <div key={`${token.ticker}-${index}`} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                minWidth: 'fit-content'
              }}>
                <span style={{ fontWeight: '600' }}>{token.ticker}</span>
                <span>{formatPrice(token.price)}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {token.change24h > 0 ? (
                    <TrendingUp className="w-3 h-3" style={{ color: '#10B981' }} />
                  ) : (
                    <TrendingDown className="w-3 h-3" style={{ color: '#EF4444' }} />
                  )}
                  <span style={{ 
                    color: token.change24h > 0 ? '#10B981' : '#EF4444',
                    fontSize: '12px'
                  }}>
                    {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                  </span>
                </div>
                <span style={{ color: '#A1A1AA', fontSize: '11px' }}>
                  Vol: {formatVolume(token.volume)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      {showNavigation && (
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
          {navigationLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                opacity: 0.9,
                fontWeight: '400',
                padding: link.highlight ? '4px 8px' : '4px',
                borderRadius: link.highlight ? '4px' : '0',
                background: link.highlight ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (link.highlight) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (link.highlight) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes bitcoin-ticker-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
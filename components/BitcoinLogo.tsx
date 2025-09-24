'use client'

interface BitcoinLogoProps {
  className?: string
  size?: number
}

export default function BitcoinLogo({ className = '', size = 96 }: BitcoinLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="currentColor" />
      
      {/* Inner black background */}
      <circle cx="50" cy="50" r="44" fill="black" />
      
      {/* Bitcoin B with straight lines and square edges */}
      <g fill="currentColor">
        {/* Vertical bar */}
        <rect x="30" y="20" width="10" height="60" />
        
        {/* Top horizontal extensions */}
        <rect x="35" y="20" width="8" height="8" />
        <rect x="35" y="72" width="8" height="8" />
        
        {/* Top B section */}
        <rect x="40" y="25" width="25" height="8" />
        <rect x="57" y="33" width="8" height="9" />
        <rect x="40" y="42" width="25" height="8" />
        
        {/* Bottom B section */}
        <rect x="40" y="50" width="25" height="8" />
        <rect x="57" y="58" width="8" height="9" />
        <rect x="40" y="67" width="25" height="8" />
      </g>
    </svg>
  )
}

// BSV-style B with straight lines and thick bars
export function BitcoinBOnly({ className = '', size = 96 }: BitcoinLogoProps) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 50 60"
      className={className}
      fill="currentColor"
    >
      {/* Bitcoin B with straight lines and square edges - BSV style */}
      <g fill="currentColor">
        {/* Main vertical bar - thicker */}
        <rect x="8" y="8" width="8" height="44" />
        
        {/* Top and bottom extensions (angled lines) */}
        <rect x="13" y="3" width="6" height="10" />
        <rect x="13" y="47" width="6" height="10" />
        
        {/* Upper B curve */}
        <rect x="16" y="12" width="26" height="7" />
        <rect x="35" y="19" width="7" height="6" />
        <rect x="16" y="25" width="26" height="7" />
        
        {/* Lower B curve - slightly larger */}
        <rect x="16" y="28" width="28" height="7" />
        <rect x="37" y="35" width="7" height="6" />
        <rect x="16" y="41" width="28" height="7" />
      </g>
    </svg>
  )
}
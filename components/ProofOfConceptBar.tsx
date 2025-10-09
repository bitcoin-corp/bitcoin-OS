'use client'

import { AlertTriangle } from 'lucide-react'
import './ProofOfConceptBar.css'

export default function ProofOfConceptBar() {
  return (
    <div className="poc-bar">
      <div className="poc-content">
        {/* Navigation Links */}
        <div className="poc-nav">
          <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 600, fontSize: '13px', marginRight: '12px' }}>
            Bitcoin OS
          </span>
          <span className="poc-separator">•</span>
          {/* Platform Link */}
          <a href="/platform" className="poc-link">
            <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            Platform
          </a>

          <span className="poc-separator">•</span>

          {/* Docs Link */}
          <a href="/docs" className="poc-link">
            <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            Docs
          </a>

          <span className="poc-separator">•</span>

          {/* $bOS Token Link */}
          <a href="/token" className="poc-link poc-token">
            $bOS
          </a>

          <span className="poc-separator">•</span>

          {/* Jobs Link */}
          <a href="/apps/bitcoin-jobs" className="poc-link">
            <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.13 22.19l-1.63-3.83c-.11-.27-.4-.46-.7-.46h-1.6c-.3 0-.59.19-.7.46l-1.63 3.83c-.14.33.05.71.4.71h5.46c.35 0 .54-.38.4-.71zM5.64 12.5l-1.39 3.84c-.14.33.05.71.4.71h2.95c.3 0 .59-.19.7-.46l1.63-3.83c.14-.33-.05-.71-.4-.71H5.64zM18.36 12.5h-3.89c-.35 0-.54.38-.4.71l1.63 3.83c.11.27.4.46.7.46h2.95c.35 0 .54-.38.4-.71l-1.39-3.84zM12 2L8.5 8.5h7L12 2z"/>
            </svg>
            Jobs
          </a>
          
          <span className="poc-separator">•</span>
          
          {/* GitHub Link */}
          <a
            href="https://github.com/bitcoin-apps-suite/bitcoin-OS"
            target="_blank"
            rel="noopener noreferrer"
            className="poc-link"
          >
            <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>

          <span className="poc-separator">•</span>
          
          {/* X Link */}
          <a
            href="https://x.com/Bitcoin_OS_X"
            target="_blank"
            rel="noopener noreferrer"
            className="poc-link"
          >
            <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            X
          </a>

          <span className="poc-separator">•</span>
          
          {/* Discord Link */}
          <a
            href="https://discord.com/invite/bitcoinapps"
            target="_blank"
            rel="noopener noreferrer"
            className="poc-link"
          >
            <svg height="14" width="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
            </svg>
            Discord
          </a>
        </div>
      </div>
    </div>
  )
}
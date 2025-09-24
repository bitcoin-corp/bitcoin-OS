'use client'

import { useEffect, useRef } from 'react'
import { X, Home, ArrowLeft } from 'lucide-react'

interface MobileAppLoaderProps {
  appName: string
  appUrl: string
  onClose: () => void
  onBack?: () => void
}

export default function MobileAppLoader({ 
  appName, 
  appUrl, 
  onClose,
  onBack
}: MobileAppLoaderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(appUrl).origin) return
      
      // Handle messages from the app
      if (event.data.type === 'app-ready') {
        // Send initial theme/config to app
        iframeRef.current?.contentWindow?.postMessage({
          type: 'os-config',
          theme: 'dark',
          appName: appName,
          isMobile: true
        }, appUrl)
      }
      
      if (event.data.type === 'navigate-home') {
        onClose()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [appUrl, appName, onClose])

  // Prevent scroll on mobile when app is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Mobile Header */}
      <div className="h-14 bg-gradient-to-r from-gray-900 to-black flex items-center justify-between px-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-bitcoin-orange rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">B</span>
          </div>
          <span className="font-medium truncate text-white">{appName}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <iframe
        ref={iframeRef}
        src={appUrl}
        className="flex-1 w-full border-0"
        allow="clipboard-write; clipboard-read"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  )
}
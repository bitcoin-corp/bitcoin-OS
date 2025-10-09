'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import HandCashLoginModal from '@/components/HandCashLoginModal'
import SystemPreferences from '@/components/SystemPreferences'
import { useIsMobile } from '@/hooks/useIsMobile'

interface BitcoinOSLayoutProps {
  children: ReactNode
  showBackground?: boolean
}

export default function BitcoinOSLayout({ children, showBackground = false }: BitcoinOSLayoutProps) {
  const [showDevSidebar, setShowDevSidebar] = useState(true) // Visible but collapsed by default
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSystemPreferences, setShowSystemPreferences] = useState(false)
  const [userHandle, setUserHandle] = useState<string | null>(null)
  const [isBootingOrBios, setIsBootingOrBios] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Detect if we're on the homepage and check for BIOS/boot elements
  useEffect(() => {
    if (pathname === '/') {
      // Check if BIOS or boot screen elements are present
      const checkBootState = () => {
        const hasBiosScreen = document.querySelector('.bg-black.text-green-400.font-mono')
        const hasBootScreen = document.querySelector('.h-screen.bg-black.flex.flex-col.items-center.justify-center')
        setIsBootingOrBios(!!(hasBiosScreen || hasBootScreen))
      }
      
      // Check immediately and set up observer
      checkBootState()
      
      const observer = new MutationObserver(checkBootState)
      observer.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true,
        attributeFilter: ['class']
      })
      
      return () => observer.disconnect()
    } else {
      setIsBootingOrBios(false)
    }
  }, [pathname])

  // Don't show global UI components during BIOS/boot on homepage ONLY
  const shouldShowGlobalUI = pathname !== '/' || !isBootingOrBios

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setShowDevSidebar(!showDevSidebar)
      }
      if (e.metaKey && e.key === ',') {
        e.preventDefault()
        setShowSystemPreferences(!showSystemPreferences)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDevSidebar, showSystemPreferences])

  const openApp = (appName: string) => {
    // Handle System Preferences specially
    if (appName === 'Settings' || appName === 'System Preferences') {
      setShowSystemPreferences(true)
      return
    }
    // For other apps, just log for now
    console.log('Opening app:', appName)
  }

  return (
    <div className="h-screen flex flex-col relative bg-black">
      {/* Only show these on desktop when not during BIOS/boot */}
      {!isMobile && shouldShowGlobalUI && (
        <>
          <ProofOfConceptBar />
          <TopMenuBar 
            onOpenApp={openApp} 
            onOpenWalletModal={() => setShowLoginModal(true)}
            isConnected={!!userHandle}
          />
        </>
      )}
      
      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background for desktop pages */}
        {showBackground && !isMobile && shouldShowGlobalUI && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 background-cycle">
            {/* Optional: Add video background or static background */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        )}
        
        {/* Page content */}
        <div className={`relative z-10 h-full ${showDevSidebar && !isMobile && shouldShowGlobalUI ? 'pl-[60px]' : ''} ${!isMobile && shouldShowGlobalUI ? 'pt-0' : ''}`}>
          {children}
        </div>
        
        {/* Only show Dev Sidebar and Dock on desktop when not during BIOS/boot */}
        {!isMobile && shouldShowGlobalUI && (
          <>
            {showDevSidebar && <DevSidebar />}
            <Dock />
          </>
        )}
      </div>
      
      {/* Login Modal */}
      <HandCashLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(handle, method) => {
          setUserHandle(handle)
          setShowLoginModal(false)
          console.log(`Connected with ${method}: ${handle}`)
        }}
      />
      
      {/* System Preferences Modal */}
      <SystemPreferences
        isOpen={showSystemPreferences}
        onClose={() => setShowSystemPreferences(false)}
      />
      
      {/* Modal backdrop */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowLoginModal(false)}
        />
      )}
    </div>
  )
}
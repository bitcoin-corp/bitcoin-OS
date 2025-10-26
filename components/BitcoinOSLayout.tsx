'use client'

import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import MinimalDock from '@/components/MinimalDock'
import HandCashLoginModal from '@/components/HandCashLoginModal'
import SystemPreferencesAdvanced from '@/components/SystemPreferencesAdvanced'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getCurrentThemeConfig, applyTheme } from '@/lib/advanced-themes'

interface BitcoinOSLayoutProps {
  children: ReactNode
  showBackground?: boolean
}

export default function BitcoinOSLayout({ children, showBackground = false }: BitcoinOSLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  
  const [showDevSidebar, setShowDevSidebar] = useState(true) // Visible but collapsed by default
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSystemPreferences, setShowSystemPreferences] = useState(false)
  const [userHandle, setUserHandle] = useState<string | null>(null)
  const [isBootingOrBios, setIsBootingOrBios] = useState(pathname === '/')
  const [dockStyle, setDockStyle] = useState<string>('minimal')

  // Initialize theme and dock style on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeConfig = getCurrentThemeConfig()
      applyTheme(themeConfig)
      setDockStyle(localStorage.getItem('dockStyle') || 'minimal')
    }
  }, [])

  // Detect if we're on the homepage and check for BIOS/boot elements
  useEffect(() => {
    if (pathname === '/') {
      // Check if BIOS or boot screen elements are present
      const checkBootState = () => {
        // Look for BIOS screen
        const hasBiosScreen = document.querySelector('[data-component="bios-screen"]') || 
                              document.querySelector('.text-green-400.font-mono')
        
        // Look for boot screen 
        const hasBootScreen = document.querySelector('[data-component="boot-screen"]') ||
                              document.querySelector('.text-yellow-400.text-8xl.font-bold.animate-pulse')
        
        const isBooting = !!(hasBiosScreen || hasBootScreen)
        setIsBootingOrBios(isBooting)
      }
      
      // Initial check with delay to ensure DOM is ready
      setTimeout(checkBootState, 0)
      
      const observer = new MutationObserver(() => {
        // Add small delay to avoid rapid checking
        setTimeout(checkBootState, 10)
      })
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

  // Keyboard shortcuts and dock style listener
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
    
    const handleDockStyleChange = (event: any) => {
      setDockStyle(event.detail)
    }
    
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('dockStyleChanged', handleDockStyleChange)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('dockStyleChanged', handleDockStyleChange)
    }
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
    <div className="h-screen flex flex-col relative bg-black" data-bitcoin-os="true">
      {/* Only show these on desktop when not during BIOS/boot */}
      {!isMobile && shouldShowGlobalUI && (
        <>
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
        
        {/* Only show Dev Sidebar on desktop when not during BIOS/boot */}
        {!isMobile && shouldShowGlobalUI && (
          <>
            {showDevSidebar && <DevSidebar />}
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
      <SystemPreferencesAdvanced
        isOpen={showSystemPreferences}
        onClose={() => setShowSystemPreferences(false)}
      />
      
      {/* Dock - always show on desktop when not during BIOS/boot */}
      {!isMobile && shouldShowGlobalUI && (
        <>
          {dockStyle === 'minimal' ? (
            <MinimalDock />
          ) : (
            <Dock />
          )}
        </>
      )}

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
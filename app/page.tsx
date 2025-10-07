'use client'

import { useState, useEffect } from 'react'
import { Bitcoin } from 'lucide-react'
import { getAppIcon } from '@/lib/app-icons'
import DraggableDesktop from '@/components/DraggableDesktop'
import OSTaskbar from '@/components/OSTaskbar'
import TopMenuBar from '@/components/TopMenuBar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import DevSidebar from '@/components/DevSidebar'
import Dock from '@/components/Dock'
import Window from '@/components/Window'
import BootScreen from '@/components/BootScreen'
import BiosScreen from '@/components/BiosScreen'
import PlaceholderWindow from '@/components/PlaceholderWindow'
import OptimizedAppLoader from '@/components/OptimizedAppLoader'
import MobileAppLoader from '@/components/MobileAppLoader'
import MobileAppDrawer from '@/components/MobileAppDrawer'
import MobileTaskbar from '@/components/MobileTaskbar'
import HandCashLoginModal from '@/components/HandCashLoginModal'
import { bitcoinApps, getAppByName } from '@/lib/apps.config'
import { useIsMobile } from '@/hooks/useIsMobile'

interface OpenApp {
  id: string
  name: string
  url: string
  isMinimized: boolean
}

export default function BitcoinOS() {
  const [showBios, setShowBios] = useState(true)
  const [isBooting, setIsBooting] = useState(true)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [openApps, setOpenApps] = useState<OpenApp[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [placeholderApp, setPlaceholderApp] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [userHandle, setUserHandle] = useState<string | null>(null)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [pendingAudio, setPendingAudio] = useState<HTMLAudioElement | null>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const isMobile = useIsMobile()
  
  const placeholderApps = ['Bitcoin Shares', 'Browser', 'Terminal', 'Settings']

  // Preload video during boot sequence
  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/b-OS-pro2.mp4'
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    
    const handleCanPlay = () => {
      setIsVideoReady(true)
    }
    
    video.addEventListener('canplaythrough', handleCanPlay)
    video.load()
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true)
      // Play startup sound immediately on user interaction
      const audio = new Audio('/startup4.wav')
      audio.play().catch(err => {
        console.log('Audio playback failed:', err)
      })
    }
  }

  const handleBiosComplete = () => {
    setShowBios(false)
  }

  useEffect(() => {
    // Boot screen completes after 3 seconds, don't wait for video
    if (!showBios) {
      const bootTimer = setTimeout(() => {
        setIsBooting(false)
        // Show login modal immediately when desktop loads
        setTimeout(() => {
          setShowLoginModal(true)
        }, 500)
      }, 3000)
      
      return () => clearTimeout(bootTimer)
    }
  }, [showBios])

  // Handle user interaction to play pending audio
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true)
        // Play pending audio if available
        if (pendingAudio) {
          pendingAudio.play().catch(err => {
            console.log('Audio playback failed:', err)
          })
          setPendingAudio(null)
        }
      }
    }

    // Listen for any user interaction
    const events = ['click', 'keydown', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [hasUserInteracted, pendingAudio])

  useEffect(() => {
    // Keyboard shortcut for dev sidebar
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'd') {
        e.preventDefault()
        setShowDevSidebar(!showDevSidebar)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showDevSidebar])

  const openApp = (appName: string) => {
    // Check if it's a placeholder app
    if (placeholderApps.includes(appName)) {
      setPlaceholderApp(appName)
      return
    }
    
    // Check if it's a Bitcoin app
    const app = getAppByName(appName)
    if (app) {
      if (isMobile) {
        // On mobile, only one app at a time
        setActiveApp(app.id)
      } else {
        // Check app mode preference (default to fullscreen)
        const appMode = typeof window !== 'undefined' 
          ? localStorage.getItem('appMode') || 'fullscreen'
          : 'fullscreen'
        
        if (appMode === 'fullscreen' && app.url) {
          // Open in fullscreen mode (navigate to URL)
          window.location.href = app.url
          return
        }
        
        // Windowed mode - Desktop behavior
        const existingApp = openApps.find(a => a.id === app.id)
        if (existingApp) {
          // Just focus it
          setActiveWindow(app.id)
          // Un-minimize if minimized
          setOpenApps(openApps.map(a => 
            a.id === app.id ? { ...a, isMinimized: false } : a
          ))
        } else {
          // Open new app
          setOpenApps([...openApps, {
            id: app.id,
            name: app.name,
            url: app.url,
            isMinimized: false
          }])
          setActiveWindow(app.id)
        }
      }
    } else if (!openWindows.includes(appName)) {
      // Legacy window handling
      setOpenWindows([...openWindows, appName])
      setActiveWindow(appName)
    } else {
      setActiveWindow(appName)
    }
  }

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter(a => a.id !== appId))
    if (activeWindow === appId) {
      setActiveWindow(null)
    }
  }

  const minimizeApp = (appId: string) => {
    setOpenApps(openApps.map(a => 
      a.id === appId ? { ...a, isMinimized: true } : a
    ))
    if (activeWindow === appId) {
      setActiveWindow(null)
    }
  }

  const closeWindow = (appName: string) => {
    setOpenWindows(openWindows.filter(w => w !== appName))
    if (activeWindow === appName) {
      setActiveWindow(null)
    }
  }

  if (showBios) {
    return <BiosScreen onComplete={handleBiosComplete} onUserInteraction={handleUserInteraction} />
  }

  if (isBooting) {
    return <BootScreen />
  }

  // Mobile Layout
  if (isMobile) {
    const currentApp = activeApp ? bitcoinApps.find(a => a.id === activeApp) : null
    
    return (
      <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black bitcoin-mesh">
        {/* Mobile app in fullscreen */}
        {currentApp ? (
          <MobileAppLoader
            appName={currentApp.name}
            appUrl={currentApp.url}
            onClose={() => setActiveApp(null)}
          />
        ) : (
          <>
            {/* Mobile Home Screen */}
            <div className="flex-1 overflow-auto pb-20">
              {/* Header */}
              <div className="bg-black/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-bitcoin-orange rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold text-xl">B</span>
                  </div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-bitcoin-orange">Bitcoin</span>
                    <span className="text-white ml-1">OS</span>
                  </h1>
                </div>
              </div>
              
              {/* App Grid */}
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  {bitcoinApps.map((app) => {
                    const { icon: Icon, color } = getAppIcon(app.id)
                    return (
                      <button
                        key={app.id}
                        onClick={() => {
                          if (app.isExternal) {
                            window.open(app.url, '_blank')
                          } else {
                            openApp(app.name)
                          }
                        }}
                        className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 active:bg-white/10 rounded-2xl transition-all"
                      >
                        {app.id === 'bapps-store' ? (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-orange-500/40">
                            <img 
                              src="/bapps-icon.jpg" 
                              alt="Bitcoin Apps Store" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ 
                              backgroundColor: color + '20',
                              border: `2px solid ${color}40`
                            }}
                          >
                            <Icon className="w-8 h-8" style={{ color }} />
                          </div>
                        )}
                        <span className="text-xs text-center text-gray-200 font-medium">
                          {app.name.replace('Bitcoin ', '').replace('BAPPS ', '')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Mobile App Drawer */}
            <MobileAppDrawer onOpenApp={openApp} />
          </>
        )}
      </div>
    )
  }

  // Desktop Layout
  return (
    <div className="h-screen flex flex-col relative bg-black">
      <ProofOfConceptBar />
      <TopMenuBar onOpenApp={openApp} />
      
      <div className="flex-1 relative overflow-hidden">
        <DraggableDesktop isVideoReady={isVideoReady} showDevSidebar={showDevSidebar && !isMobile} />
        <Dock />
        {showDevSidebar && !isMobile && <DevSidebar />}
        
        {openWindows.map((appName) => (
          <Window
            key={appName}
            title={appName}
            isActive={activeWindow === appName}
            onClose={() => closeWindow(appName)}
            onFocus={() => setActiveWindow(appName)}
          >
            <div className="p-4">
              <p>Welcome to {appName} on Bitcoin OS!</p>
            </div>
          </Window>
        ))}
        
        {/* Apps now open in new tabs/windows - no embedded windows needed */}
        
        {placeholderApp && (
          <PlaceholderWindow
            appName={placeholderApp}
            onClose={() => setPlaceholderApp(null)}
          />
        )}
      </div>
      
      {/* HandCash Login Modal */}
      <HandCashLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={(handle, method) => {
          setUserHandle(handle)
          setShowLoginModal(false)
          console.log(`Connected with ${method}: ${handle}`)
        }}
      />
      
      {/* Clickable area to dismiss modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowLoginModal(false)}
        />
      )}
    </div>
  )
}
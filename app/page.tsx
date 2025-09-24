'use client'

import { useState, useEffect } from 'react'
import { Bitcoin } from 'lucide-react'
import { getAppIcon } from '@/lib/app-icons'
import Desktop from '@/components/Desktop'
import OSTaskbar from '@/components/OSTaskbar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Window from '@/components/Window'
import BootScreen from '@/components/BootScreen'
import PlaceholderWindow from '@/components/PlaceholderWindow'
import OptimizedAppLoader from '@/components/OptimizedAppLoader'
import MobileAppLoader from '@/components/MobileAppLoader'
import MobileAppDrawer from '@/components/MobileAppDrawer'
import MobileTaskbar from '@/components/MobileTaskbar'
import ProofOfConceptBar from '@/components/ProofOfConceptBar'
import { bitcoinApps, getAppByName } from '@/lib/apps.config'
import { useIsMobile } from '@/hooks/useIsMobile'

interface OpenApp {
  id: string
  name: string
  url: string
  isMinimized: boolean
}

export default function BitcoinOS() {
  const [isBooting, setIsBooting] = useState(true)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [openApps, setOpenApps] = useState<OpenApp[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [placeholderApp, setPlaceholderApp] = useState<string | null>(null)
  const isMobile = useIsMobile()
  
  const placeholderApps = ['Bitcoin Shares', 'Browser', 'Terminal', 'Settings']

  useEffect(() => {
    // Simulate boot process
    setTimeout(() => {
      setIsBooting(false)
    }, 3000)
  }, [])

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
        // Desktop behavior
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

  if (isBooting) {
    return <BootScreen />
  }

  // Mobile Layout
  if (isMobile) {
    const currentApp = activeApp ? bitcoinApps.find(a => a.id === activeApp) : null
    
    return (
      <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black bitcoin-mesh">
        <ProofOfConceptBar />
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
      
      <div className="flex-1 flex relative overflow-hidden pb-14">
        {showDevSidebar && !isMobile && <DevSidebar />}
        
        <div className={`flex-1 transition-all duration-300 ${showDevSidebar && !isMobile ? 'md:ml-64' : ''}`}>
          <Desktop onOpenApp={openApp} />
          
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
      </div>
      
      <OSTaskbar 
        openWindows={[...openWindows, ...openApps.filter(a => !a.isMinimized).map(a => a.name)]}
        activeWindow={activeWindow ? (openApps.find(a => a.id === activeWindow)?.name || activeWindow) : null}
        onWindowClick={(name) => {
          // Check if it's an app
          const app = openApps.find(a => a.name === name)
          if (app) {
            setActiveWindow(app.id)
            setOpenApps(openApps.map(a => 
              a.id === app.id ? { ...a, isMinimized: false } : a
            ))
          } else {
            setActiveWindow(name)
          }
        }}
      />
    </div>
  )
}
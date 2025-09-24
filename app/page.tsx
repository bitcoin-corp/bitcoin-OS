'use client'

import { useState, useEffect } from 'react'
import Desktop from '@/components/Desktop'
import OSTaskbar from '@/components/OSTaskbar'
import TopMenuBar from '@/components/TopMenuBar'
import DevSidebar from '@/components/DevSidebar'
import Window from '@/components/Window'
import BootScreen from '@/components/BootScreen'
import PlaceholderWindow from '@/components/PlaceholderWindow'

export default function BitcoinOS() {
  const [isBooting, setIsBooting] = useState(true)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [showDevSidebar, setShowDevSidebar] = useState(true)
  const [placeholderApp, setPlaceholderApp] = useState<string | null>(null)
  
  const placeholderApps = ['Bitcoin Shares', 'Bitcoin Jobs', 'Browser', 'Terminal', 'Settings']

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
    } else if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName])
      setActiveWindow(appName)
    } else {
      setActiveWindow(appName)
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

  return (
    <div className="h-screen flex flex-col relative bg-black">
      <TopMenuBar />
      
      <div className="flex-1 flex relative">
        {showDevSidebar && <DevSidebar />}
        
        <div className={`flex-1 transition-all duration-300 ${showDevSidebar ? 'ml-64' : ''}`}>
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
          
          {placeholderApp && (
            <PlaceholderWindow
              appName={placeholderApp}
              onClose={() => setPlaceholderApp(null)}
            />
          )}
        </div>
      </div>
      
      <OSTaskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
      />
    </div>
  )
}
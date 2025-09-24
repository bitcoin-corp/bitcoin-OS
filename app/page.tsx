'use client'

import { useState, useEffect } from 'react'
import Desktop from '@/components/Desktop'
import Taskbar from '@/components/Taskbar'
import Window from '@/components/Window'
import BootScreen from '@/components/BootScreen'

export default function BitcoinOS() {
  const [isBooting, setIsBooting] = useState(true)
  const [openWindows, setOpenWindows] = useState<string[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  useEffect(() => {
    // Simulate boot process
    setTimeout(() => {
      setIsBooting(false)
    }, 3000)
  }, [])

  const openApp = (appName: string) => {
    if (!openWindows.includes(appName)) {
      setOpenWindows([...openWindows, appName])
    }
    setActiveWindow(appName)
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
    <div className="h-screen flex flex-col relative">
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
      
      <Taskbar 
        openWindows={openWindows}
        activeWindow={activeWindow}
        onWindowClick={setActiveWindow}
      />
    </div>
  )
}
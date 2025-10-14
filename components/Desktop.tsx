'use client'

import { useState, useEffect } from 'react'
import { Wallet, Mail, Music, FileText, HardDrive, Globe, Terminal, Settings, Calendar, Search, LineChart, Briefcase, Table, Share2, Store, ShoppingBag, TriangleAlert, Box, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Desktop3D from './Desktop3D'
import Dock from './Dock'
import MinimalDock from './MinimalDock'
import TickerSidebar from './TickerSidebar'

interface DesktopProps {
  onOpenApp: (appName: string) => void
}

const desktopApps = [
  { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', chromeAppId: null, external: true, isImage: true },
  { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', chromeAppId: 'bitcoin-writer' },
  { name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app', chromeAppId: 'bitcoin-spreadsheet' },
  { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', chromeAppId: 'bitcoin-drive' },
  { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', chromeAppId: 'bitcoin-email' },
  { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', chromeAppId: 'bitcoin-music' },
  { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', chromeAppId: 'bitcoin-wallet' },
  { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-gray-500', url: 'https://bitcoin-jobs.vercel.app', chromeAppId: 'bitcoin-jobs', disabled: true },
  { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app', chromeAppId: 'bitcoin-calendar', external: true },
  { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-gray-500', url: 'https://bitcoin-exchange.vercel.app', chromeAppId: 'bitcoin-exchange' },
  { name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', chromeAppId: 'bitcoin-search', external: true, disabled: true },
  { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', chromeAppId: 'bitcoin-shares', external: true, disabled: true },
  { name: 'Browser', icon: Globe, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
  { name: 'Terminal', icon: Terminal, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
  { name: 'Settings', icon: Settings, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
]

export default function Desktop({ onOpenApp }: DesktopProps) {
  const [is3DMode, setIs3DMode] = useState(false)
  const [dockStyle, setDockStyle] = useState<string>('minimal')

  // Initialize dock style and listen for changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDockStyle(localStorage.getItem('dockStyle') || 'minimal')
    }

    const handleDockStyleChange = (event: any) => {
      setDockStyle(event.detail)
    }

    window.addEventListener('dockStyleChanged', handleDockStyleChange)

    return () => {
      window.removeEventListener('dockStyleChanged', handleDockStyleChange)
    }
  }, [])

  // Function to launch app
  const launchApp = (app: typeof desktopApps[0]) => {
    // Don't launch if app is disabled
    if ((app as any).disabled) return
    
    // Open apps in the same window (full screen)
    if (app.url) {
      window.location.href = app.url
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* 3D Mode Toggle Button - Commented out for now */}
      {/* <button
        onClick={() => setIs3DMode(!is3DMode)}
        className="absolute top-4 right-4 z-50 bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/50 text-orange-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
      >
        <Box className="w-4 h-4" />
        {is3DMode ? '2D View' : '3D View'}
      </button> */}

      {is3DMode ? (
        <Desktop3D onAppClick={(appName) => {
          const app = desktopApps.find(a => a.name === appName)
          if (app) launchApp(app)
        }} />
      ) : (
        <div className="flex-1 p-8 grid grid-cols-8 gap-4 content-start" style={{ marginRight: '300px' }}>
          {desktopApps.map((app) => {
            const Icon = app.icon
            return (
              <div
                key={app.name}
                className={`desktop-icon ${(app as any).disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDoubleClick={() => launchApp(app)}
              >
                {app.id === 'bapps-store' ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img 
                      src="/bapps-icon.jpg" 
                      alt="Bitcoin Apps Store" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <Icon className={`w-12 h-12 ${app.color}`} />
                )}
                <span className="text-xs mt-2 text-center">{app.name}</span>
              </div>
            )
          })}
        </div>
      )}
      
      {/* Floating Dock */}
      {dockStyle === 'minimal' ? <MinimalDock /> : <Dock />}
      
      {/* Ticker Sidebar */}
      <TickerSidebar />
    </div>
  )
}
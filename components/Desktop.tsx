'use client'

import { Wallet, Mail, Music, FileText, HardDrive, Globe, Terminal, Settings, Calendar, Search, LineChart, Briefcase, Table, Share2, Store, ShoppingBag, TriangleAlert } from 'lucide-react'
import Image from 'next/image'

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
  { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-gray-500', url: 'https://bitcoin-calendar.vercel.app', chromeAppId: 'bitcoin-calendar', external: true, disabled: true },
  { name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', chromeAppId: 'bitcoin-search', external: true, disabled: true },
  { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', chromeAppId: 'bitcoin-shares', external: true, disabled: true },
  { name: 'Browser', icon: Globe, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
  { name: 'Terminal', icon: Terminal, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
  { name: 'Settings', icon: Settings, color: 'text-gray-500', url: null, chromeAppId: null, disabled: true },
]

export default function Desktop({ onOpenApp }: DesktopProps) {
  // Function to launch app
  const launchApp = (app: typeof desktopApps[0]) => {
    // Don't launch if app is disabled
    if ((app as any).disabled) return
    
    if (app.external && app.url) {
      // Open in new window - Chrome will use app mode if PWA is installed
      window.open(app.url, '_blank', 'noreferrer')
    } else {
      onOpenApp(app.name)
    }
  }

  return (
    <div className="flex-1 p-8 grid grid-cols-8 gap-4 content-start">
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
              <div className="relative">
                <Icon className={`w-12 h-12 ${app.color}`} />
                {app.name === 'Bitcoin Wallet' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                    <TriangleAlert className="w-3 h-3 text-black" />
                  </div>
                )}
              </div>
            )}
            <span className="text-xs mt-2 text-center">{app.name}</span>
          </div>
        )
      })}
    </div>
  )
}
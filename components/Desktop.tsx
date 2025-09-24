'use client'

import { Wallet, Mail, Music, FileText, HardDrive, Globe, Terminal, Settings, Calendar, Search, LineChart, Briefcase, Table, Share2, Store, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

interface DesktopProps {
  onOpenApp: (appName: string) => void
}

const desktopApps = [
  { id: 'bapps-store', name: 'BAPPS Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', chromeAppId: null, external: true, isImage: true },
  { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', chromeAppId: 'bitcoin-wallet', external: true },
  { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', chromeAppId: 'bitcoin-email', external: true },
  { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', chromeAppId: 'bitcoin-music', external: true },
  { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', chromeAppId: 'bitcoin-writer', external: true },
  { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', chromeAppId: 'bitcoin-drive', external: true },
  { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-yellow-500', url: 'https://bitcoin-calendar.vercel.app', chromeAppId: 'bitcoin-calendar', external: true },
  { name: 'Bitcoin Search', icon: Search, color: 'text-pink-500', url: 'https://bitcoin-search.vercel.app', chromeAppId: 'bitcoin-search', external: true },
  { name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-emerald-500', url: 'https://bitcoin-spreadsheet.vercel.app', chromeAppId: 'bitcoin-spreadsheet', external: true },
  { name: 'Bitcoin Shares', icon: Share2, color: 'text-rose-500', url: 'https://bitcoin-shares.vercel.app', chromeAppId: 'bitcoin-shares', external: true },
  { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-cyan-500', url: 'https://bitcoin-jobs.vercel.app', chromeAppId: 'bitcoin-jobs', external: true },
  { name: 'Browser', icon: Globe, color: 'text-cyan-500', url: null, chromeAppId: null },
  { name: 'Terminal', icon: Terminal, color: 'text-gray-400', url: null, chromeAppId: null },
  { name: 'Settings', icon: Settings, color: 'text-gray-500', url: null, chromeAppId: null },
]

export default function Desktop({ onOpenApp }: DesktopProps) {
  // Function to launch app
  const launchApp = (app: typeof desktopApps[0]) => {
    if (app.external && app.url) {
      window.open(app.url, '_blank')
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
            className="desktop-icon"
            onDoubleClick={() => launchApp(app)}
          >
            {app.id === 'bapps-store' ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img 
                  src="/bapps-icon.jpg" 
                  alt="BAPPS Store" 
                  className="w-full h-full object-cover"
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
  )
}
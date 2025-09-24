'use client'

import { Wallet, Mail, Music, FileText, HardDrive, Globe, Terminal, Settings } from 'lucide-react'

interface DesktopProps {
  onOpenApp: (appName: string) => void
}

const desktopApps = [
  { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-bitcoin-orange' },
  { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500' },
  { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500' },
  { name: 'Bitcoin Writer', icon: FileText, color: 'text-blue-500' },
  { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500' },
  { name: 'Browser', icon: Globe, color: 'text-cyan-500' },
  { name: 'Terminal', icon: Terminal, color: 'text-gray-400' },
  { name: 'Settings', icon: Settings, color: 'text-gray-500' },
]

export default function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="flex-1 p-8 grid grid-cols-8 gap-4 content-start">
      {desktopApps.map((app) => {
        const Icon = app.icon
        return (
          <div
            key={app.name}
            className="desktop-icon"
            onDoubleClick={() => onOpenApp(app.name)}
          >
            <Icon className={`w-12 h-12 ${app.color}`} />
            <span className="text-xs mt-2 text-center">{app.name}</span>
          </div>
        )
      })}
    </div>
  )
}
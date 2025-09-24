'use client'

import { useState, useRef, useEffect } from 'react'
import { Bitcoin, Info } from 'lucide-react'

interface MenuItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  external?: boolean
}

interface TopMenuBarProps {
  onOpenApp?: (appName: string) => void
}

interface Menu {
  label: string
  items: MenuItem[]
}

export default function TopMenuBar({ onOpenApp }: TopMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBitcoinApps, setShowBitcoinApps] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = [
    { name: 'Bitcoin Wallet', color: '#f7931a', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', color: '#ef4444', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', color: '#3b82f6', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Spreadsheet', color: '#10b981', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Calendar', color: '#eab308', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Search', color: '#ec4899', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: 'https://bitcoin-shares.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#f59e0b', url: 'https://bitcoin-jobs.vercel.app' },
  ]

  const menus: Menu[] = [
    {
      label: 'Bitcoin OS',
      items: [
        { label: 'About Bitcoin OS', action: () => console.log('About') },
        { label: 'System Preferences', shortcut: '⌘,' },
        { divider: true },
        { label: 'Lock Screen', shortcut: '⌘L' },
        { label: 'Log Out', action: () => console.log('Log Out') },
        { label: 'Shut Down', action: () => console.log('Shut Down') },
      ]
    },
    {
      label: 'File',
      items: [
        { label: 'New Window', shortcut: '⌘N' },
        { label: 'New Folder', shortcut: '⇧⌘N' },
        { divider: true },
        { label: 'Open', shortcut: '⌘O' },
        { label: 'Save', shortcut: '⌘S' },
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⇧⌘Z' },
        { divider: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Show Desktop', action: () => console.log('Show Desktop') },
        { label: 'Show All Windows', action: () => console.log('Show All') },
        { divider: true },
        { label: 'Toggle Developer Sidebar', shortcut: '⌘D' },
        { label: 'Toggle Full Screen', shortcut: '⌃⌘F' },
      ]
    },
    {
      label: 'Apps',
      items: bitcoinApps.map(app => ({
        label: app.name,
        action: () => {
          if (onOpenApp) {
            onOpenApp(app.name)
          } else {
            window.open(app.url, '_blank')
          }
        }
      }))
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M' },
        { label: 'Maximize' },
        { divider: true },
        { label: 'Bring All to Front' },
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin OS Help' },
        { label: 'Keyboard Shortcuts' },
        { divider: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/issues' },
      ]
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setShowBitcoinApps(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="h-8 md:h-8 bg-gray-900 border-b border-gray-800 flex items-center text-sm hidden md:flex" ref={menuRef}>
      <div className="flex items-center" style={{ paddingLeft: '16px' }}>
        <button
          onClick={() => {
            setShowBitcoinApps(!showBitcoinApps)
            setActiveMenu(null)
          }}
          className="p-1 hover:bg-gray-800 rounded mr-2"
        >
          <span className="text-yellow-400 font-bold text-base">₿</span>
        </button>

        {showBitcoinApps && (
          <div className="absolute top-8 left-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 p-2 min-w-[200px]">
            <div className="text-xs text-gray-400 px-2 py-1">Bitcoin Apps</div>
            {bitcoinApps.map((app) => (
              <button
                key={app.name}
                className="w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-800 rounded text-left"
                onClick={() => {
                  if (onOpenApp) {
                    onOpenApp(app.name)
                  } else {
                    // Fallback to external link
                    window.open(app.url, '_blank')
                  }
                  setShowBitcoinApps(false)
                }}
              >
                <span className="font-bold text-sm" style={{ color: app.color }}>₿</span>
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        )}

        {menus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              className={`px-3 py-1 hover:bg-gray-800 rounded ${activeMenu === menu.label ? 'bg-gray-800' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            >
              {menu.label}
            </button>
          
          {activeMenu === menu.label && (
            <div className="absolute top-8 left-0 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
              {menu.items.map((item, index) => (
                item.divider ? (
                  <div key={index} className="border-t border-gray-700 my-1" />
                ) : (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-1 hover:bg-gray-800 flex justify-between items-center"
                    onClick={() => {
                      if (item.href) {
                        if (item.external) {
                          window.open(item.href, '_blank')
                        } else {
                          window.location.href = item.href
                        }
                      } else {
                        item.action?.()
                      }
                      setActiveMenu(null)
                    }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span className="text-xs text-gray-500">{item.shortcut}</span>
                    )}
                  </button>
                )
              ))}
            </div>
          )}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-4 px-2">
        <span className="text-gray-400">Bitcoin OS v1.0</span>
      </div>
    </div>
  )
}
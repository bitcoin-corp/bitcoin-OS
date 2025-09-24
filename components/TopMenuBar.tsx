'use client'

import { useState, useRef, useEffect } from 'react'
import { Bitcoin, Info } from 'lucide-react'

interface MenuItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
}

interface Menu {
  label: string
  items: MenuItem[]
}

export default function TopMenuBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBitcoinApps, setShowBitcoinApps] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = [
    { name: 'Bitcoin Wallet', color: '#f7931a', url: '/apps/wallet' },
    { name: 'Bitcoin Email', color: '#ef4444', url: '/apps/email' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: '/apps/music' },
    { name: 'Bitcoin Writer', color: '#3b82f6', url: '/apps/writer' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: '/apps/drive' },
    { name: 'Bitcoin Calendar', color: '#eab308', url: '/apps/calendar' },
    { name: 'Bitcoin Search', color: '#ec4899', url: '/apps/search' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: '/apps/shares' },
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
        href: app.url
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
    <div className="h-8 bg-gray-900 border-b border-gray-800 flex items-center px-2 text-sm" ref={menuRef}>
      <button
        onClick={() => {
          setShowBitcoinApps(!showBitcoinApps)
          setActiveMenu(null)
        }}
        className="p-1 hover:bg-gray-800 rounded mr-2"
      >
        <Bitcoin className="w-4 h-4 text-bitcoin-orange" />
      </button>

      {showBitcoinApps && (
        <div className="absolute top-8 left-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 p-2 min-w-[200px]">
          <div className="text-xs text-gray-400 px-2 py-1">Bitcoin Apps</div>
          {bitcoinApps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-800 rounded"
              onClick={() => setShowBitcoinApps(false)}
            >
              <Bitcoin className="w-3 h-3" style={{ color: app.color }} />
              <span>{app.name}</span>
            </a>
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
                      item.action?.()
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

      <div className="ml-auto flex items-center gap-4 px-2">
        <span className="text-gray-400">Bitcoin OS v1.0</span>
      </div>
    </div>
  )
}
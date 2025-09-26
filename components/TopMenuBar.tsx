'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, BookOpen, FileText, ExternalLink } from 'lucide-react'
import './TopMenuBar.css'

interface MenuItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  icon?: string
  external?: boolean
}

interface Menu {
  label: string
  items: MenuItem[]
}

interface TopMenuBarProps {
  onOpenApp?: (appName: string) => void
}

export default function TopMenuBar({ onOpenApp }: TopMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = [
    { name: 'Bitcoin Wallet', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Spreadsheet', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Calendar', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Search', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Shares', url: 'https://bitcoin-shares.vercel.app' },
    { name: 'Bitcoin Jobs', url: 'https://bitcoin-jobs.vercel.app' },
  ]

  const menus: Menu[] = [
    {
      label: 'Bitcoin OS',
      items: [
        { 
          label: 'About Bitcoin OS', 
          action: () => alert('Bitcoin OS v1.0\n\nThe Operating System for Bitcoin\n\n© 2025 The Bitcoin Corporation LTD\nRegistered in England and Wales • Company No. 16735102') 
        },
        { divider: true },
        { 
          label: 'System Preferences', 
          shortcut: '⌘,',
          action: () => window.location.href = '/settings'
        },
        { divider: true },
        { 
          label: 'Lock Screen', 
          shortcut: '⌘L',
          action: () => console.log('Lock Screen')
        },
        { 
          label: 'Log Out', 
          action: () => console.log('Log Out')
        },
        { 
          label: 'Shut Down', 
          action: () => console.log('Shut Down')
        },
      ]
    },
    {
      label: 'BApps',
      items: bitcoinApps.map(app => ({
        label: app.name,
        action: () => {
          window.open(app.url, app.name.replace(/\s+/g, '_'), 'width=1200,height=800,toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes')
        },
        external: true
      }))
    },
    {
      label: 'File',
      items: [
        { 
          label: 'New Window', 
          shortcut: '⌘N',
          action: () => console.log('New Window')
        },
        { 
          label: 'New Folder', 
          shortcut: '⇧⌘N',
          action: () => console.log('New Folder')
        },
        { divider: true },
        { 
          label: 'Open', 
          shortcut: '⌘O',
          action: () => console.log('Open')
        },
        { 
          label: 'Save', 
          shortcut: '⌘S',
          action: () => console.log('Save')
        },
        { divider: true },
        { 
          label: 'Close Window', 
          shortcut: '⌘W',
          action: () => console.log('Close')
        }
      ]
    },
    {
      label: 'Edit',
      items: [
        { 
          label: 'Undo', 
          shortcut: '⌘Z',
          action: () => document.execCommand('undo')
        },
        { 
          label: 'Redo', 
          shortcut: '⇧⌘Z',
          action: () => document.execCommand('redo')
        },
        { divider: true },
        { 
          label: 'Cut', 
          shortcut: '⌘X',
          action: () => document.execCommand('cut')
        },
        { 
          label: 'Copy', 
          shortcut: '⌘C',
          action: () => document.execCommand('copy')
        },
        { 
          label: 'Paste', 
          shortcut: '⌘V',
          action: () => document.execCommand('paste')
        },
        { divider: true },
        { 
          label: 'Select All', 
          shortcut: '⌘A',
          action: () => document.execCommand('selectAll')
        },
        { 
          label: 'Find...', 
          shortcut: '⌘F',
          action: () => console.log('Find')
        }
      ]
    },
    {
      label: 'View',
      items: [
        { 
          label: 'Show Desktop', 
          action: () => window.location.href = '/'
        },
        { 
          label: 'Show All Windows', 
          action: () => console.log('Show All Windows')
        },
        { divider: true },
        { 
          label: 'Toggle Developer Sidebar', 
          shortcut: '⌘D',
          action: () => {
            const event = new KeyboardEvent('keydown', { metaKey: true, key: 'd' })
            document.dispatchEvent(event)
          }
        },
        { 
          label: 'Enter Full Screen', 
          shortcut: '⌃⌘F',
          action: () => document.documentElement.requestFullscreen()
        },
        { divider: true },
        { 
          label: 'Actual Size', 
          shortcut: '⌘0',
          action: () => (document.body.style as any).zoom = '100%'
        },
        { 
          label: 'Zoom In', 
          shortcut: '⌘+',
          action: () => (document.body.style as any).zoom = '110%'
        },
        { 
          label: 'Zoom Out', 
          shortcut: '⌘-',
          action: () => (document.body.style as any).zoom = '90%'
        }
      ]
    },
    {
      label: 'Window',
      items: [
        { 
          label: 'Minimize', 
          shortcut: '⌘M',
          action: () => console.log('Minimize')
        },
        { 
          label: 'Zoom', 
          action: () => console.log('Zoom')
        },
        { divider: true },
        { 
          label: 'Bring All to Front', 
          action: () => console.log('Bring All to Front')
        },
        { divider: true },
        { 
          label: 'Documentation', 
          action: () => window.location.href = '/docs'
        },
        { 
          label: 'Tasks', 
          action: () => window.location.href = '/tasks'
        },
        { 
          label: 'Contracts', 
          action: () => window.location.href = '/contracts'
        },
        { 
          label: 'Token', 
          action: () => window.location.href = '/token'
        }
      ]
    },
    {
      label: 'Help',
      items: [
        { 
          label: 'Bitcoin OS Help', 
          shortcut: '⌘?',
          action: () => alert('Bitcoin OS v1.0\n\nThe Operating System for Bitcoin')
        },
        { divider: true },
        { 
          label: 'Documentation', 
          action: () => window.location.href = '/docs'
        },
        { 
          label: 'GitHub Repository', 
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-OS',
          external: true
        },
        { divider: true },
        { 
          label: 'Report an Issue', 
          href: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/issues',
          external: true
        }
      ]
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div ref={menuRef} className="bitcoin-os-taskbar">
      {/* Bitcoin Logo */}
      <div 
        className="taskbar-logo"
        onDoubleClick={() => window.location.href = '/'}
        title="Double-click to go home"
      >
        <span className="bitcoin-symbol">₿</span>
      </div>

      {/* Menu Items */}
      <div className="taskbar-menus">
        {menus.map((menu) => (
          <div key={menu.label} className="menu-container">
            <button
              className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            >
              {menu.label}
            </button>

            {/* Dropdown Menu */}
            {activeMenu === menu.label && (
              <div className="dropdown-menu">
                {menu.items.map((item, index) => (
                  item.divider ? (
                    <div key={index} className="menu-divider" />
                  ) : item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="menu-item"
                      onClick={() => setActiveMenu(null)}
                    >
                      <span className="menu-item-content">
                        {item.icon && <span className="menu-icon">{item.icon}</span>}
                        <span className="menu-label">{item.label}</span>
                      </span>
                      {item.shortcut && (
                        <span className="menu-shortcut">{item.shortcut}</span>
                      )}
                    </a>
                  ) : (
                    <button
                      key={index}
                      className="menu-item"
                      onClick={() => {
                        item.action?.()
                        setActiveMenu(null)
                      }}
                    >
                      <span className="menu-item-content">
                        {item.icon && <span className="menu-icon">{item.icon}</span>}
                        <span className="menu-label">{item.label}</span>
                      </span>
                      {item.shortcut && (
                        <span className="menu-shortcut">{item.shortcut}</span>
                      )}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right side - Status */}
      <div className="taskbar-status">
        <a 
          href="https://github.com/bitcoin-apps-suite/bitcoin-OS" 
          target="_blank" 
          rel="noopener noreferrer"
          className="taskbar-link"
          title="GitHub"
        >
          <Github className="taskbar-link-icon" />
        </a>
        <a 
          href="/docs" 
          className="taskbar-link"
          title="Documentation"
        >
          <BookOpen className="taskbar-link-icon" />
        </a>
      </div>
    </div>
  )
}
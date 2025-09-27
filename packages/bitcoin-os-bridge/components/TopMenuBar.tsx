'use client'

import { useState, useRef, useEffect } from 'react'
import { Github, BookOpen, FileText, ExternalLink } from 'lucide-react'
import { createDefaultMenus, getBitcoinApps } from '../utils'
import type { AppContext, Menu } from '../types'
import './TopMenuBar.css'

interface TopMenuBarProps {
  context: AppContext
  onOpenApp?: (appName: string) => void
  showBAppsMenu?: boolean
  githubUrl?: string
  docsUrl?: string
}

interface MenuItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  icon?: string
  external?: boolean
}

export default function TopMenuBar({ 
  context,
  onOpenApp,
  showBAppsMenu = true,
  githubUrl = 'https://github.com/bitcoin-apps-suite/bitcoin-OS',
  docsUrl = '/docs'
}: TopMenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBAppsMenuState, setShowBAppsMenuState] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const bitcoinApps = getBitcoinApps()
  const menus = createDefaultMenus(context)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setShowBAppsMenuState(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setShowBAppsMenuState(false)
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
      {/* Bitcoin Logo with BApps Menu */}
      {showBAppsMenu && (
        <div style={{ position: 'relative' }}>
          <button 
            className={`taskbar-logo ${showBAppsMenuState ? 'menu-open' : ''}`}
            onClick={() => {
              setShowBAppsMenuState(!showBAppsMenuState)
              setActiveMenu(null)
            }}
            onDoubleClick={() => window.open('https://bitcoin-os.vercel.app', '_blank')}
            title="Click for apps • Double-click to go to Bitcoin OS"
            style={{ 
              background: showBAppsMenuState ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0 12px',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              transition: 'background 0.15s ease'
            }}
          >
            <span className="bitcoin-symbol">₿</span>
          </button>
          
          {/* BApps Dropdown */}
          {showBAppsMenuState && (
            <div style={{
              position: 'absolute',
              top: '28px',
              left: 0,
              minWidth: '220px',
              background: '#1a1a1a',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
              padding: '8px 0',
              zIndex: 1000
            }}>
              <div style={{
                padding: '8px 16px',
                fontSize: '12px',
                color: '#d946ef',
                fontWeight: '600',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '4px'
              }}>
                Bitcoin Apps
              </div>
              
              {bitcoinApps.map((app) => (
                <a
                  key={app.name}
                  href={app.url}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    color: '#ffffff',
                    background: 'transparent',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    if (app.url === '#') {
                      e.preventDefault()
                    } else {
                      e.preventDefault()
                      window.open(app.url, '_blank')
                    }
                    setShowBAppsMenuState(false)
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span 
                    style={{ 
                      color: app.color,
                      marginRight: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    ₿
                  </span>
                  <span>
                    {app.name}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

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
          href={githubUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="taskbar-link"
          title="GitHub"
        >
          <Github className="taskbar-link-icon" />
        </a>
        <a 
          href={docsUrl}
          className="taskbar-link"
          title="Documentation"
        >
          <BookOpen className="taskbar-link-icon" />
        </a>
      </div>
    </div>
  )
}
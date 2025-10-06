'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  User, 
  LogOut, 
  Settings, 
  Home,
  FileText,
  Save,
  FolderOpen,
  Share2,
  HelpCircle,
  Info,
  Bitcoin
} from 'lucide-react';

interface DropdownItem {
  label?: string;
  action?: () => void;
  href?: string;
  divider?: boolean;
  shortcut?: string;
  icon?: React.ComponentType<{ size?: number }>;
  external?: boolean;
}

interface DropdownMenu {
  label: string;
  items: DropdownItem[];
}

interface StandardTaskbarProps {
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  isAuthenticated?: boolean;
  currentUser?: any;
  onLogout?: () => void;
  customMenus?: DropdownMenu[];
  showUserMenu?: boolean;
}

export default function StandardTaskbar({
  appName,
  primaryColor,
  secondaryColor,
  isAuthenticated = false,
  currentUser = null,
  onLogout,
  customMenus = [],
  showUserMenu = true
}: StandardTaskbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate text color based on background brightness
  const getTextColor = (bgColor: string): string => {
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  };

  const textColor = getTextColor(primaryColor);
  const backgroundColor = `linear-gradient(90deg, ${primaryColor}15 0%, ${secondaryColor}15 100%)`;

  // Default menus that appear in all apps
  const defaultMenus: DropdownMenu[] = [
    {
      label: appName,
      items: [
        { 
          label: 'Home', 
          href: '/',
          icon: Home,
          shortcut: '⌘H'
        },
        { 
          label: 'About', 
          href: '/about',
          icon: Info
        },
        { divider: true },
        { 
          label: 'Settings', 
          href: '/settings',
          icon: Settings,
          shortcut: '⌘,'
        }
      ]
    },
    {
      label: 'File',
      items: [
        { 
          label: 'New', 
          shortcut: '⌘N',
          icon: FileText
        },
        { 
          label: 'Open', 
          shortcut: '⌘O',
          icon: FolderOpen
        },
        { 
          label: 'Save', 
          shortcut: '⌘S',
          icon: Save
        },
        { divider: true },
        { 
          label: 'Share', 
          shortcut: '⌘⇧S',
          icon: Share2
        }
      ]
    },
    {
      label: 'Help',
      items: [
        { 
          label: 'Documentation', 
          href: '/docs',
          icon: HelpCircle
        },
        { 
          label: 'Support', 
          href: 'https://support.bitcoinos.com',
          external: true,
          icon: HelpCircle
        },
        { divider: true },
        { 
          label: 'Bitcoin OS', 
          href: 'https://bitcoinos.com',
          external: true,
          icon: Bitcoin
        }
      ]
    }
  ];

  // Combine default menus with custom menus
  const allMenus = [...defaultMenus, ...customMenus];

  const userMenu: DropdownMenu = {
    label: currentUser?.name || 'Account',
    items: [
      { 
        label: 'Profile', 
        href: '/profile',
        icon: User
      },
      { 
        label: 'Settings', 
        href: '/account/settings',
        icon: Settings
      },
      { divider: true },
      { 
        label: 'Sign Out', 
        action: onLogout,
        icon: LogOut,
        shortcut: '⌘⇧Q'
      }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (item.action) {
      item.action();
    }
    setActiveMenu(null);
  };

  return (
    <div 
      ref={menuRef}
      style={{
        position: 'fixed',
        top: '40px', // Below PoC bar
        left: 0,
        right: 0,
        height: '32px',
        background: backgroundColor,
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${primaryColor}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9998,
        fontSize: '13px',
        fontWeight: '500',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Desktop Menu */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          height: '100%'
        }}
        className="hidden md:flex"
      >
        {allMenus.map((menu) => (
          <div key={menu.label} style={{ position: 'relative' }}>
            <button
              onClick={() => handleMenuClick(menu.label)}
              style={{
                background: 'none',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                height: '32px',
                transition: 'background-color 0.2s ease',
                backgroundColor: activeMenu === menu.label ? `${primaryColor}20` : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== menu.label) {
                  e.currentTarget.style.backgroundColor = `${primaryColor}10`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== menu.label) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {menu.label}
              <ChevronDown size={12} />
            </button>

            {activeMenu === menu.label && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  minWidth: '200px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${primaryColor}30`,
                  borderRadius: '8px',
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2)`,
                  padding: '8px 0',
                  zIndex: 10000
                }}
              >
                {menu.items.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.divider ? (
                      <div
                        style={{
                          height: '1px',
                          background: `${primaryColor}20`,
                          margin: '4px 12px'
                        }}
                      />
                    ) : (
                      <div>
                        {item.href ? (
                          item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 16px',
                                color: '#333',
                                textDecoration: 'none',
                                fontSize: '13px',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {item.icon && <item.icon size={14} />}
                                {item.label}
                              </div>
                              {item.shortcut && (
                                <span style={{ 
                                  fontSize: '11px', 
                                  color: '#666',
                                  fontFamily: 'monospace'
                                }}>
                                  {item.shortcut}
                                </span>
                              )}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 16px',
                                color: '#333',
                                textDecoration: 'none',
                                fontSize: '13px',
                                transition: 'background-color 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                              onClick={() => setActiveMenu(null)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {item.icon && <item.icon size={14} />}
                                {item.label}
                              </div>
                              {item.shortcut && (
                                <span style={{ 
                                  fontSize: '11px', 
                                  color: '#666',
                                  fontFamily: 'monospace'
                                }}>
                                  {item.shortcut}
                                </span>
                              )}
                            </Link>
                          )
                        ) : (
                          <button
                            onClick={() => handleItemClick(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: '8px 16px',
                              background: 'none',
                              border: 'none',
                              color: '#333',
                              fontSize: '13px',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.icon && <item.icon size={14} />}
                              {item.label}
                            </div>
                            {item.shortcut && (
                              <span style={{ 
                                fontSize: '11px', 
                                color: '#666',
                                fontFamily: 'monospace'
                              }}>
                                {item.shortcut}
                              </span>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Menu */}
      {showUserMenu && isAuthenticated && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => handleMenuClick('user')}
            style={{
              background: 'none',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '32px',
              transition: 'background-color 0.2s ease',
              backgroundColor: activeMenu === 'user' ? `${primaryColor}20` : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (activeMenu !== 'user') {
                e.currentTarget.style.backgroundColor = `${primaryColor}10`;
              }
            }}
            onMouseLeave={(e) => {
              if (activeMenu !== 'user') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <User size={14} />
            {currentUser?.name || 'Account'}
            <ChevronDown size={12} />
          </button>

          {activeMenu === 'user' && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                minWidth: '180px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${primaryColor}30`,
                borderRadius: '8px',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2)`,
                padding: '8px 0',
                zIndex: 10000
              }}
            >
              {userMenu.items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.divider ? (
                    <div
                      style={{
                        height: '1px',
                        background: `${primaryColor}20`,
                        margin: '4px 12px'
                      }}
                    />
                  ) : (
                    <div>
                      {item.href ? (
                        <Link
                          href={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 16px',
                            color: '#333',
                            textDecoration: 'none',
                            fontSize: '13px',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => setActiveMenu(null)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {item.icon && <item.icon size={14} />}
                            {item.label}
                          </div>
                          {item.shortcut && (
                            <span style={{ 
                              fontSize: '11px', 
                              color: '#666',
                              fontFamily: 'monospace'
                            }}>
                              {item.shortcut}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleItemClick(item)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 16px',
                            background: 'none',
                            border: 'none',
                            color: '#333',
                            fontSize: '13px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {item.icon && <item.icon size={14} />}
                            {item.label}
                          </div>
                          {item.shortcut && (
                            <span style={{ 
                              fontSize: '11px', 
                              color: '#666',
                              fontFamily: 'monospace'
                            }}>
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
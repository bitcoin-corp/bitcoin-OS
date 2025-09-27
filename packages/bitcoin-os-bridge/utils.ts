// Utility functions for Bitcoin OS
import type { AppContext, Menu, MenuItem } from './types'

export function createDefaultMenus(context: AppContext): Menu[] {
  const { appName, exchangeUrl, customMenuItems = [] } = context

  const baseMenus: Menu[] = [
    {
      label: 'Bitcoin OS',
      items: [
        { 
          label: 'About Bitcoin OS', 
          action: () => alert('Bitcoin OS v1.0\\n\\nThe Operating System for Bitcoin\\n\\n© 2025 The Bitcoin Corporation LTD\\nRegistered in England and Wales • Company No. 16735102') 
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
      label: 'File',
      items: [
        { 
          label: 'New Document', 
          shortcut: '⌘N',
          action: () => console.log('New Document')
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
          action: () => window.close()
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
          label: 'Show Bitcoin OS Desktop', 
          action: () => window.open('https://bitcoin-os.vercel.app', '_blank')
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
          action: () => window.open('/docs', '_blank')
        },
        { 
          label: 'Tasks', 
          action: () => window.open('/tasks', '_blank')
        },
        { 
          label: 'Contracts', 
          action: () => window.open('/contracts', '_blank')
        },
        { 
          label: 'Token', 
          action: () => window.open('/token', '_blank')
        },
        ...(exchangeUrl ? [
          { divider: true },
          { 
            label: 'Exchange', 
            action: () => window.open(exchangeUrl, '_blank')
          }
        ] : [])
      ]
    },
    {
      label: 'Help',
      items: [
        { 
          label: `${appName} Help`, 
          shortcut: '⌘?',
          action: () => alert(`${appName}\n\nBuilt with Bitcoin OS\n\nThe Operating System for Bitcoin`)
        },
        { divider: true },
        { 
          label: 'Documentation', 
          action: () => window.open('/docs', '_blank')
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

  // Merge with custom menu items
  return [...baseMenus, ...customMenuItems]
}

export function getBitcoinApps(): any[] {
  return [
    { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
    { name: 'Bitcoin Calendar', color: '#d946ef', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Chat', color: '#ff6500', url: '#' },
    { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
    { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Email', color: '#06b6d4', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#6b7280', url: '#' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
    { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Search', color: '#6b7280', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: 'https://bitcoin-shares.vercel.app' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', color: '#65a30d', url: '#' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
  ]
}
// Example: Updated Bitcoin OS main page using the bridge system
import React, { useState, useEffect } from 'react'
import { BitcoinOSProvider } from '@bitcoin-os/bridge'
import DraggableDesktop from '@/components/DraggableDesktop'
import BootScreen from '@/components/BootScreen'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function BitcoinOSUpdated() {
  const [isBooting, setIsBooting] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 1000)
  }, [])

  const bitcoinOSConfig = {
    context: {
      appName: 'Bitcoin OS',
      exchangeUrl: 'https://bitcoin-exchange.vercel.app', // Main Bitcoin OS exchange
      customMenuItems: [
        // Add any Bitcoin OS specific menu items here
        {
          label: 'Bitcoin OS',
          items: [
            { 
              label: 'Install as App', 
              action: () => {
                // PWA installation logic
                console.log('Install PWA')
              }
            },
            { 
              label: 'Share Desktop', 
              action: () => {
                navigator.share?.({
                  title: 'Bitcoin OS',
                  text: 'Check out Bitcoin OS - The Operating System for Bitcoin',
                  url: 'https://bitcoin-os.vercel.app'
                })
              }
            }
          ]
        }
      ],
      branding: {
        name: 'Bitcoin OS',
        color: '#d946ef' // Main Bitcoin OS purple
      }
    },
    showDevSidebar: true,
    showDock: true,
    showPocBar: true,
    onAppOpen: (appName: string) => {
      // Bitcoin OS main app opening logic
      console.log('Opening from Bitcoin OS:', appName)
      
      // Handle different app modes (fullscreen vs windowed)
      const appMode = localStorage.getItem('appMode') || 'fullscreen'
      
      if (appMode === 'fullscreen') {
        // Navigate to app
        const app = bitcoinApps.find(a => a.name === appName)
        if (app?.url) {
          window.location.href = app.url
        }
      } else {
        // Open in windowed mode (existing Bitcoin OS logic)
        console.log('Opening in window:', appName)
      }
    }
  }

  const bitcoinApps = [
    { name: 'Bitcoin Writer', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Email', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', url: 'https://bitcoin-music.vercel.app' },
    // ... other apps
  ]

  if (isBooting) {
    return <BootScreen />
  }

  if (isMobile) {
    return (
      <BitcoinOSProvider config={bitcoinOSConfig}>
        {/* Mobile Bitcoin OS Layout */}
        <div className="flex-1 overflow-auto pb-20">
          <div className="bg-black/50 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-bitcoin-orange rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">B</span>
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-bitcoin-orange">Bitcoin</span>
                <span className="text-white ml-1">OS</span>
              </h1>
            </div>
          </div>
          
          {/* Mobile app grid would go here */}
          <div className="p-4">
            <h2 className="text-white text-lg mb-4">Bitcoin Applications</h2>
            {/* App grid implementation */}
          </div>
        </div>
      </BitcoinOSProvider>
    )
  }

  // Desktop Bitcoin OS Layout
  return (
    <BitcoinOSProvider config={bitcoinOSConfig}>
      {/* Desktop content - DraggableDesktop component */}
      <DraggableDesktop />
      
      {/* Any additional Bitcoin OS specific content */}
      <div className="absolute top-20 right-8 z-10">
        <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button 
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
              onClick={() => window.open('/settings', '_blank')}
            >
              System Preferences
            </button>
            <button 
              className="w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
              onClick={() => window.open('/docs', '_blank')}
            >
              Documentation
            </button>
          </div>
        </div>
      </div>
    </BitcoinOSProvider>
  )
}

/*
BENEFITS OF THIS APPROACH:

1. **Simplified Bitcoin OS Code**:
   - No longer need to maintain TopMenuBar, DevSidebar, Dock, ProofOfConceptBar in main codebase
   - Focus on core Bitcoin OS functionality (desktop, windows, etc.)
   - Clean separation between OS chrome and OS functionality

2. **Automatic Updates**:
   - Update @bitcoin-os/bridge package to push updates to all Bitcoin apps
   - Bug fixes and improvements propagate automatically
   - Consistent UI/UX across the entire Bitcoin ecosystem

3. **Local Customization**:
   - Each app (including Bitcoin OS itself) can customize menu items
   - App-specific exchange links and branding
   - Custom themes while maintaining visual consistency

4. **Developer Experience**:
   - New Bitcoin apps can be built quickly with full OS integration
   - TypeScript support with proper types
   - Comprehensive documentation and examples

5. **Maintenance**:
   - Single source of truth for OS components
   - Easier testing and quality assurance
   - Consistent behavior across all apps

MIGRATION STEPS:

1. Install @bitcoin-os/bridge in main Bitcoin OS project
2. Replace existing component imports with bridge imports
3. Wrap Bitcoin OS content in BitcoinOSProvider
4. Remove old component files from main project
5. Test all functionality works the same
6. Deploy updated Bitcoin OS
7. Other Bitcoin apps can now use the bridge for instant OS integration

BACKWARD COMPATIBILITY:

- Existing Bitcoin apps continue to work unchanged
- Gradual migration possible - apps can adopt bridge when ready
- Bridge components are designed to match current Bitcoin OS exactly
*/
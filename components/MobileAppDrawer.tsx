'use client'

import { useState } from 'react'
import { Bitcoin, X, ChevronUp } from 'lucide-react'
import { bitcoinApps } from '@/lib/apps.config'
import { getAppIcon } from '@/lib/app-icons'

interface MobileAppDrawerProps {
  onOpenApp: (appName: string) => void
}

export default function MobileAppDrawer({ onOpenApp }: MobileAppDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Function to launch app
  const launchApp = (app: typeof bitcoinApps[0]) => {
    if (app.isExternal) {
      window.open(app.url, '_blank')
    } else {
      onOpenApp(app.name)
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* App Drawer Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-bitcoin-orange to-yellow-500 text-black p-4 rounded-full shadow-2xl z-40 md:hidden"
      >
        <ChevronUp className="w-6 h-6 font-bold" />
      </button>

      {/* App Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* App Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-black rounded-t-3xl transform transition-transform duration-300 z-50 md:hidden border-t-2 border-gray-800 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Drawer Handle */}
        <div className="flex justify-center py-3">
          <div className="w-16 h-1.5 bg-bitcoin-orange/50 rounded-full" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bitcoin-orange rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">B</span>
            </div>
            <span className="text-lg font-semibold">
              <span className="text-bitcoin-orange">Bitcoin</span>
              <span className="text-white ml-1">Apps</span>
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-4 gap-3 px-4 pb-8 overflow-y-auto">
          {bitcoinApps.map((app) => {
            const { icon: Icon, color } = getAppIcon(app.id)
            return (
              <button
                key={app.id}
                onClick={() => launchApp(app)}
                className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 active:bg-white/10 rounded-xl transition-all"
              >
                {app.id === 'bapps-store' ? (
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-orange-500/40">
                    <img 
                      src="/bapps-icon.jpg" 
                      alt="BAPPS Store" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ 
                      backgroundColor: color + '20',
                      border: `1px solid ${color}40`
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                )}
                <span className="text-xs text-center text-gray-300 line-clamp-2">
                  {app.name.replace('Bitcoin ', '').replace('BAPPS ', '')}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
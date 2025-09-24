'use client'

import { Bitcoin, Home, ArrowLeft, Grid } from 'lucide-react'

interface MobileTaskbarProps {
  openApps: string[]
  activeApp: string | null
  onHome: () => void
  onBack?: () => void
  onShowApps: () => void
}

export default function MobileTaskbar({ 
  openApps,
  activeApp,
  onHome,
  onBack,
  onShowApps
}: MobileTaskbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gray-900 border-t border-gray-800 flex items-center justify-around px-4 z-30 md:hidden">
      {/* Back Button */}
      {onBack && openApps.length > 0 && (
        <button
          onClick={onBack}
          className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Home Button */}
      <button
        onClick={onHome}
        className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Home className="w-5 h-5" />
      </button>

      {/* Bitcoin OS Logo */}
      <button
        className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
        onClick={onShowApps}
      >
        <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
      </button>

      {/* Recent Apps */}
      <button
        onClick={onShowApps}
        className="p-3 hover:bg-gray-800 rounded-lg transition-colors relative"
      >
        <Grid className="w-5 h-5" />
        {openApps.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-bitcoin-orange rounded-full" />
        )}
      </button>
    </div>
  )
}
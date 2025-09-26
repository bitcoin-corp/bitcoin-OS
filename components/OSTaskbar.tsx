'use client'

import { Bitcoin, Clock, Wifi, Battery, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
  onWindowClick: (window: string) => void
}

export default function Taskbar({ openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  return (
    <div className="taskbar fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 hidden md:flex z-40">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
        </button>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        {/* Open Windows */}
        <div className="flex space-x-1">
          {openWindows.map((window) => (
            <button
              key={window}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                activeWindow === window 
                  ? 'bg-bitcoin-orange text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => onWindowClick(window)}
            >
              {window}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm">
        <Wifi className="w-4 h-4 text-green-500" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4 text-green-500" />
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{mounted ? currentTime.toLocaleTimeString() : '12:00:00 AM'}</span>
        </div>
      </div>
    </div>
  )
}
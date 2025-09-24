'use client'

import { Bitcoin, Grid, Clock, Wifi, Battery, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
  onWindowClick: (window: string) => void
}

export default function Taskbar({ openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="taskbar h-12 flex items-center justify-between px-4 hidden md:flex">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
        </button>
        
        <div className="border-l border-gray-700 h-6 mx-2" />
        
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
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}
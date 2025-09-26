'use client'

import { useState, useCallback } from 'react'
import { Rnd } from 'react-rnd'
import { X, Minus, Square, ExternalLink } from 'lucide-react'

interface Window {
  id: string
  app: {
    id: string
    name: string
    icon: any
    color: string
    url?: string
  }
}

interface WindowManagerProps {
  windows: Window[]
  onClose: (windowId: string) => void
}

function AppWindow({ window, onClose, onFocus, zIndex, isActive }: {
  window: Window
  onClose: () => void
  onFocus: () => void
  zIndex: number
  isActive: boolean
}) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [prevBounds, setPrevBounds] = useState({ x: 100, y: 100, width: 800, height: 600 })
  const Icon = window.app.icon

  const handleMaximize = () => {
    if (!isMaximized) {
      setPrevBounds({ x: 100, y: 100, width: 800, height: 600 })
      setIsMaximized(true)
    } else {
      setIsMaximized(false)
    }
  }

  if (isMinimized) return null

  return (
    <Rnd
      default={{
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 100,
        width: 800,
        height: 600
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-header"
      style={{ 
        zIndex,
        display: isMinimized ? 'none' : 'flex'
      }}
      size={isMaximized ? { width: '100%', height: '100%' } : undefined}
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      onMouseDown={onFocus}
    >
      <div className={`window-container flex flex-col w-full h-full bg-gray-900/95 backdrop-blur-xl rounded-lg overflow-hidden ${isActive ? 'ring-2 ring-purple-500' : 'ring-1 ring-gray-700'}`}>
        {/* Window Header */}
        <div className="window-header flex items-center justify-between h-10 px-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 cursor-move">
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${window.app.color}`} />
            <span className="text-sm font-medium text-white select-none">{window.app.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Minimize"
            >
              <Minus className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={handleMaximize}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Square className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-600 rounded transition-colors"
              title="Close"
            >
              <X className="w-3 h-3 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-hidden bg-white">
          {window.app.url ? (
            <iframe
              src={window.app.url}
              className="w-full h-full border-0"
              title={window.app.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900 to-purple-900/20">
              <Icon className={`w-24 h-24 ${window.app.color} mb-4`} />
              <h2 className="text-2xl font-bold text-white mb-2">{window.app.name}</h2>
              <p className="text-gray-400">This app is not yet available</p>
            </div>
          )}
        </div>

        {/* Window Footer (optional status bar) */}
        <div className="h-6 px-4 bg-gray-900 border-t border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500">Ready</span>
          {window.app.url && (
            <a 
              href={window.app.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-purple-400 flex items-center gap-1"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </Rnd>
  )
}

export default function WindowManager({ windows, onClose }: WindowManagerProps) {
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [windowZIndexes, setWindowZIndexes] = useState<Record<string, number>>({})
  const [nextZIndex, setNextZIndex] = useState(1000)

  const handleFocus = useCallback((windowId: string) => {
    setActiveWindowId(windowId)
    setWindowZIndexes(prev => ({
      ...prev,
      [windowId]: nextZIndex
    }))
    setNextZIndex(prev => prev + 1)
  }, [nextZIndex])

  return (
    <>
      {windows.map((window) => (
        <AppWindow
          key={window.id}
          window={window}
          onClose={() => onClose(window.id)}
          onFocus={() => handleFocus(window.id)}
          zIndex={windowZIndexes[window.id] || 1000}
          isActive={activeWindowId === window.id}
        />
      ))}
    </>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Minus, Square, Maximize2 } from 'lucide-react'

interface AppLoaderProps {
  appName: string
  appUrl: string
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
}

export default function AppLoader({ 
  appName, 
  appUrl, 
  isActive, 
  onClose, 
  onFocus,
  onMinimize 
}: AppLoaderProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 1024, height: 768 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== new URL(appUrl).origin) return
      
      // Handle messages from the app
      if (event.data.type === 'app-ready') {
        // Send initial theme/config to app
        iframeRef.current?.contentWindow?.postMessage({
          type: 'os-config',
          theme: 'dark',
          appName: appName
        }, appUrl)
      }
      
      if (event.data.type === 'navigate-home') {
        onClose()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [appUrl, appName, onClose])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('window-header')) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
      onFocus()
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: Math.max(32, e.clientY - dragStart.y) // Keep below top menu
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, isMaximized])

  const toggleMaximize = () => {
    if (!isMaximized) {
      setSize({ width: window.innerWidth, height: window.innerHeight - 80 })
      setPosition({ x: 0, y: 32 })
    } else {
      setSize({ width: 1024, height: 768 })
      setPosition({ x: 100, y: 100 })
    }
    setIsMaximized(!isMaximized)
    setIsMinimized(false)
  }

  const minimize = () => {
    setIsMinimized(true)
    onMinimize()
  }

  if (isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-900 rounded-lg shadow-2xl overflow-hidden ${
        isActive ? 'z-40' : 'z-30'
      } ${isDragging ? 'select-none' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div 
        className="window-header h-10 bg-gray-800 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium select-none">{appName}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={minimize}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            {isMaximized ? <Maximize2 className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <iframe
        ref={iframeRef}
        src={appUrl}
        className="w-full h-[calc(100%-40px)] border-0"
        allow="clipboard-write; clipboard-read"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  )
}
'use client'

import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { X, Minus, Square, Maximize2 } from 'lucide-react'

interface OptimizedAppLoaderProps {
  appName: string
  appUrl: string
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
}

// App content loader with prefetching
const AppContent = ({ url, appName }: { url: string; appName: string }) => {
  const [content, setContent] = useState<React.ReactNode>(null)
  
  useEffect(() => {
    // For now, we'll show an embedded view
    // In production, this would dynamically import the app's module
    setContent(
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{appName}</h2>
          <p className="text-gray-600 mb-4">App modules loading system coming soon</p>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-bitcoin-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    )
  }, [url, appName])
  
  return <>{content}</>
}

export default function OptimizedAppLoader({ 
  appName, 
  appUrl, 
  isActive, 
  onClose, 
  onFocus,
  onMinimize 
}: OptimizedAppLoaderProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [size, setSize] = useState({ width: 1024, height: 768 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  // Prefetch app resources on mount
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = appUrl
    document.head.appendChild(link)
    
    return () => {
      document.head.removeChild(link)
    }
  }, [appUrl])

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
        // Use requestAnimationFrame for smooth dragging
        requestAnimationFrame(() => {
          setPosition({
            x: e.clientX - dragStart.x,
            y: Math.max(32, e.clientY - dragStart.y)
          })
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
        transform: 'translateZ(0)', // GPU acceleration
        willChange: isDragging ? 'transform' : 'auto',
        contain: 'layout style paint',
        transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onClick={onFocus}
    >
      {/* Window Header */}
      <div 
        className="window-header h-10 bg-gray-800 flex items-center justify-between px-4 cursor-move"
        onMouseDown={handleMouseDown}
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span className="text-sm font-medium select-none">{appName}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={minimize}
            className="p-1 hover:bg-gray-700 rounded transition-colors transform hover:scale-110"
            style={{ transition: 'all 0.15s ease' }}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMaximize}
            className="p-1 hover:bg-gray-700 rounded transition-colors transform hover:scale-110"
            style={{ transition: 'all 0.15s ease' }}
          >
            {isMaximized ? <Maximize2 className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition-colors transform hover:scale-110"
            style={{ transition: 'all 0.15s ease' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* App Content */}
      <div className="w-full h-[calc(100%-40px)] overflow-hidden bg-white">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-orange"></div>
          </div>
        }>
          <AppContent url={appUrl} appName={appName} />
        </Suspense>
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
          }}
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.2) 50%)'
          }}
        />
      )}
    </div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'

interface WindowProps {
  title: string
  children: React.ReactNode
  isActive: boolean
  onClose: () => void
  onFocus: () => void
}

export default function Window({ title, children, isActive, onClose, onFocus }: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 50 })
  const [size, setSize] = useState({ width: 600, height: 400 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number }>({ startX: 0, startY: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    setIsDragging(true)
    dragRef.current = {
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    }
    onFocus()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragRef.current.startX,
      y: e.clientY - dragRef.current.startY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)' }
    : { 
        top: position.y, 
        left: position.x, 
        width: size.width, 
        height: size.height 
      }

  return (
    <div
      className={`window absolute ${isActive ? 'z-30' : 'z-20'}`}
      style={windowStyle}
      onClick={onFocus}
    >
      <div 
        className="window-header cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <span className="font-semibold">{title}</span>
        <div className="window-controls">
          <button className="window-control bg-yellow-500 hover:bg-yellow-600" onClick={() => {}}>
            <span className="sr-only">Minimize</span>
          </button>
          <button className="window-control bg-green-500 hover:bg-green-600" onClick={toggleMaximize}>
            <span className="sr-only">Maximize</span>
          </button>
          <button className="window-control bg-red-500 hover:bg-red-600" onClick={onClose}>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
      <div className="bg-gray-950 rounded-b-lg overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>
    </div>
  )
}
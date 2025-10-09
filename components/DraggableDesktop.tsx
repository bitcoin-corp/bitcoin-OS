'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, TrendingUp, Building2, Shield, Trash2, Video, GraduationCap, Code, Paintbrush, Sparkles, Zap, BookOpen, Globe, Box, Camera, MapPin, MessageCircle, Users, Gamepad2, Grid3X3, UserCheck } from 'lucide-react'
import { getThemedIcon, getCurrentTheme } from '@/lib/icon-themes'
import WindowManager from './WindowManager'

interface DraggableDesktopProps {
  isVideoReady?: boolean
  showDevSidebar?: boolean
}

interface DesktopIcon {
  id: string
  name: string
  icon: any
  color: string
  url?: string
  disabled?: boolean
  position: { x: number; y: number } // Now represents pixel coordinates
}

// Desktop icon component with drag functionality
function DraggableIcon({ 
  app, 
  onDoubleClick, 
  isSelected, 
  onSelect,
  iconTheme
}: { 
  app: DesktopIcon; 
  onDoubleClick: () => void;
  isSelected: boolean;
  onSelect: (id: string, event: React.MouseEvent) => void;
  iconTheme: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id })

  const style = {
    position: 'absolute' as const,
    left: app.position.x,
    top: app.position.y,
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Disable transition during drag for better precision
    opacity: isDragging ? 0.5 : app.disabled ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  // Get themed icon
  const Icon = getThemedIcon(app.id, iconTheme)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`desktop-icon-draggable ${app.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onDoubleClick={!app.disabled ? onDoubleClick : undefined}
      onClick={(e) => onSelect(app.id, e)}
    >
      <div className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all select-none ${
        isSelected 
          ? 'bg-blue-500/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20' 
          : 'hover:bg-white/10'
      }`}>
        {app.id === 'senseii' ? (
          <svg className={`w-12 h-12 ${app.color} drop-shadow-2xl`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {/* Torii gate design */}
            <path d="M3 5h18" />
            <path d="M5 5v14" />
            <path d="M19 5v14" />
            <path d="M3 9h18" />
            <path d="M9 5v4" />
            <path d="M15 5v4" />
            <path d="M12 5v14" />
          </svg>
        ) : app.id === 'cashboard' ? (
          <svg className={`w-12 h-12 ${app.color} drop-shadow-2xl`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            {/* C in circle logo */}
            <circle cx="12" cy="12" r="10" />
            <path d="M15 8.5C14.315 7.574 13.243 7 12 7c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
          </svg>
        ) : app.id === 'bapps-store-right' ? (
          <svg className={`w-12 h-12 ${app.color} drop-shadow-2xl`} viewBox="0 0 24 24" fill="currentColor">
            {/* Bitcoin B logo */}
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <text x="12" y="17" fontSize="14" fontWeight="bold" fill="black" textAnchor="middle">B</text>
          </svg>
        ) : (
          <Icon 
            className={`w-12 h-12 ${app.color} drop-shadow-2xl`} 
            strokeWidth={1.5}
          />
        )}
        <span className="text-sm text-white text-center font-medium drop-shadow-lg max-w-[100px] break-words leading-tight">
          {app.name}
        </span>
      </div>
    </div>
  )
}

export default function DraggableDesktop({ isVideoReady, showDevSidebar = false }: DraggableDesktopProps = {}) {
  const [trashedItems, setTrashedItems] = useState<DesktopIcon[]>([])
  const [showTrashWindow, setShowTrashWindow] = useState(false)
  const [selectedIcons, setSelectedIcons] = useState<string[]>([])
  const [iconTheme, setIconTheme] = useState<string>('lucide')
  const [selectionBox, setSelectionBox] = useState<{
    startX: number
    startY: number
    currentX: number
    currentY: number
    isSelecting: boolean
  }>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isSelecting: false
  })
  
  // Default desktop app positions (used for initial layout)
  const defaultAppPositions: DesktopIcon[] = [
    { id: 'wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', position: { x: 50, y: 50 } },
    { id: 'email', name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', position: { x: 180, y: 50 } },
    { id: 'music', name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', position: { x: 310, y: 50 } },
    { id: 'writer', name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', position: { x: 50, y: 180 } },
    { id: 'drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', position: { x: 180, y: 180 } },
    { id: 'calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app', position: { x: 310, y: 180 } },
    { id: 'exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-emerald-500', url: 'https://bitcoin-exchange-iota.vercel.app', position: { x: 440, y: 180 } },
    { id: 'spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app', position: { x: 50, y: 310 } },
    { id: 'search', name: 'Bitcoin Search', icon: Search, color: 'text-blue-600', url: 'https://bitcoin-search.vercel.app', position: { x: 180, y: 310 } },
    { id: 'identity', name: 'Bitcoin Identity', icon: UserCheck, color: 'text-blue-500', url: 'https://bitcoin-identity.vercel.app/', position: { x: 310, y: 310 } },
    { id: 'jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-cyan-400', url: 'https://bitcoin-jobs.vercel.app/', position: { x: 440, y: 310 } },
    { id: 'video', name: 'Bitcoin Video', icon: Video, color: 'text-green-500', url: 'https://bitcoin-video-nine.vercel.app', position: { x: 50, y: 440 } },
    { id: 'education', name: 'Bitcoin Education', icon: GraduationCap, color: 'text-blue-500', url: 'https://bitcoin-education-theta.vercel.app', position: { x: 180, y: 440 } },
    { id: 'code', name: 'Bitcoin Code', icon: Code, color: 'text-indigo-500', url: 'https://bitcoin-code.vercel.app', position: { x: 310, y: 440 } },
    { id: 'paint', name: 'Bitcoin Paint', icon: Paintbrush, color: 'text-red-500', url: 'https://bitcoin-paint.vercel.app/', position: { x: 50, y: 570 } },
    { id: 'domains', name: 'Bitcoin Domains', icon: Globe, color: 'text-cyan-400', url: 'https://bitcoin-dns.vercel.app', position: { x: 180, y: 570 } },
    { id: '3d', name: 'Bitcoin 3D', icon: Box, color: 'text-pink-500', url: 'https://bitcoin-3d.vercel.app', position: { x: 310, y: 570 } },
    { id: 'photos', name: 'Bitcoin Photos', icon: Camera, color: 'text-blue-400', url: 'https://bitcoin-photos.vercel.app', position: { x: 440, y: 570 } },
    { id: 'maps', name: 'Bitcoin Maps', icon: MapPin, color: 'text-green-500', url: 'https://bitcoin-maps.vercel.app', position: { x: 50, y: 700 } },
    { id: 'chat', name: 'Bitcoin Chat', icon: MessageCircle, color: 'text-blue-400', url: 'https://bitcoin-chat.vercel.app', position: { x: 180, y: 700 } },
    { id: 'social', name: 'Bitcoin Social', icon: Users, color: 'text-pink-400', url: 'https://bitcoin-social.vercel.app', position: { x: 310, y: 700 } },
    { id: 'games', name: 'Bitcoin Games', icon: Gamepad2, color: 'text-purple-400', url: 'https://bitcoin-gaming.vercel.app', position: { x: 440, y: 700 } },
    { id: 'books', name: 'Bitcoin Books', icon: BookOpen, color: 'text-amber-500', url: 'https://bitcoin-books-bay.vercel.app', position: { x: 570, y: 50 } },
  ]

  // Snap to grid settings
  const GRID_SIZE = 20 // Snap grid size in pixels
  const SNAP_THRESHOLD = 10 // Pixels within which to snap
  
  // Helper function to snap position to grid
  const snapToGrid = (position: { x: number; y: number }) => {
    return {
      x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
      y: Math.round(position.y / GRID_SIZE) * GRID_SIZE
    }
  }
  
  // Desktop apps with positions loaded from localStorage or defaults
  const [desktopApps, setDesktopApps] = useState<DesktopIcon[]>(defaultAppPositions)

  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<Array<{ id: string; app: DesktopIcon }>>([])

  // Load saved positions from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPositions = localStorage.getItem('bitcoinOS-desktop-positions')
      if (savedPositions) {
        try {
          const positions = JSON.parse(savedPositions)
          // Merge saved positions with default apps
          const updatedApps = defaultAppPositions.map(app => {
            const savedApp = positions.find((p: any) => p.id === app.id)
            return savedApp ? { ...app, position: savedApp.position } : app
          })
          setDesktopApps(updatedApps)
        } catch (error) {
          console.error('Failed to load desktop positions:', error)
        }
      }
      
      // Set initial theme
      setIconTheme(getCurrentTheme())
      
      // Listen for theme changes
      const handleThemeChange = (event: any) => {
        setIconTheme(event.detail)
      }
      
      // Listen for tidy desktop event
      const handleTidyDesktop = () => {
        tidyDesktop()
      }
      
      window.addEventListener('iconThemeChanged', handleThemeChange)
      window.addEventListener('tidyDesktop', handleTidyDesktop)
      
      return () => {
        window.removeEventListener('iconThemeChanged', handleThemeChange)
        window.removeEventListener('tidyDesktop', handleTidyDesktop)
      }
    }
  }, [])

  // Function to tidy desktop icons into a neat grid
  const tidyDesktop = () => {
    const GRID_SPACING = 130 // Space between icons
    const START_X = 50 // Starting X position
    const START_Y = 50 // Starting Y position
    const COLUMNS = 4 // Number of columns in the grid
    
    const tidiedApps = desktopApps.map((app, index) => {
      const row = Math.floor(index / COLUMNS)
      const col = index % COLUMNS
      return {
        ...app,
        position: {
          x: START_X + (col * GRID_SPACING),
          y: START_Y + (row * GRID_SPACING)
        }
      }
    })
    
    setDesktopApps(tidiedApps)
    
    // Save tidied positions to localStorage
    const positionsToSave = tidiedApps.map(app => ({
      id: app.id,
      position: app.position
    }))
    localStorage.setItem('bitcoinOS-desktop-positions', JSON.stringify(positionsToSave))
  }

  // Save positions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const positionsToSave = desktopApps.map(app => ({
        id: app.id,
        position: app.position
      }))
      localStorage.setItem('bitcoinOS-desktop-positions', JSON.stringify(positionsToSave))
    }
  }, [desktopApps])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
        delay: 100,
        tolerance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event

    if (delta.x !== 0 || delta.y !== 0) {
      setDesktopApps((items) => {
        return items.map((item) => {
          // If this icon is selected and being dragged, move all selected icons
          if (selectedIcons.includes(item.id) && selectedIcons.includes(active.id as string)) {
            const newX = item.position.x + delta.x
            const newY = item.position.y + delta.y
            
            // Get viewport dimensions (accounting for sidebar)
            const maxX = window.innerWidth - (showDevSidebar ? 260 : 0) - 120 // Icon width + padding
            const maxY = window.innerHeight - 150 // Icon height + dock space
            
            const boundedX = Math.max(0, Math.min(maxX, newX))
            const boundedY = Math.max(80, Math.min(maxY, newY))
            const snappedPosition = snapToGrid({ x: boundedX, y: boundedY })
            
            return {
              ...item,
              position: snappedPosition
            }
          }
          // If only this icon is being dragged (not part of selection)
          else if (item.id === active.id) {
            const newX = item.position.x + delta.x
            const newY = item.position.y + delta.y
            
            // Get viewport dimensions (accounting for sidebar)
            const maxX = window.innerWidth - (showDevSidebar ? 260 : 0) - 120 // Icon width + padding
            const maxY = window.innerHeight - 150 // Icon height + dock space
            
            const boundedX = Math.max(0, Math.min(maxX, newX))
            const boundedY = Math.max(80, Math.min(maxY, newY))
            const snappedPosition = snapToGrid({ x: boundedX, y: boundedY })
            
            return {
              ...item,
              position: snappedPosition
            }
          }
          return item
        })
      })
    }

    setActiveId(null)
  }

  // Handle icon selection
  const handleIconSelect = (iconId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    
    if (event.ctrlKey || event.metaKey) {
      // Multi-select with Ctrl/Cmd
      setSelectedIcons(prev => 
        prev.includes(iconId) 
          ? prev.filter(id => id !== iconId)
          : [...prev, iconId]
      )
    } else {
      // Single select
      setSelectedIcons([iconId])
    }
  }

  // Handle desktop click (clear selection)
  const handleDesktopClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setSelectedIcons([])
    }
  }

  // Handle selection box
  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !event.ctrlKey && !event.metaKey) {
      const rect = event.currentTarget.getBoundingClientRect()
      const startX = event.clientX - rect.left
      const startY = event.clientY - rect.top
      
      setSelectionBox({
        startX,
        startY,
        currentX: startX,
        currentY: startY,
        isSelecting: true
      })
      setSelectedIcons([])
    }
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    if (selectionBox.isSelecting) {
      const rect = event.currentTarget.getBoundingClientRect()
      const currentX = event.clientX - rect.left
      const currentY = event.clientY - rect.top
      
      setSelectionBox(prev => ({
        ...prev,
        currentX,
        currentY
      }))

      // Check which icons are in the selection box
      const minX = Math.min(selectionBox.startX, currentX)
      const maxX = Math.max(selectionBox.startX, currentX)
      const minY = Math.min(selectionBox.startY, currentY)
      const maxY = Math.max(selectionBox.startY, currentY)

      const selectedIds = desktopApps
        .filter(app => {
          // More accurate icon dimensions (icon + text area)
          const iconLeft = app.position.x
          const iconRight = app.position.x + 100 // Icon width + padding
          const iconTop = app.position.y
          const iconBottom = app.position.y + 120 // Icon height + text + padding
          
          // Check if selection box overlaps with icon bounds
          return !(iconRight < minX || iconLeft > maxX || iconBottom < minY || iconTop > maxY)
        })
        .map(app => app.id)

      setSelectedIcons(selectedIds)
    }
  }

  const handleMouseUp = () => {
    setSelectionBox(prev => ({ ...prev, isSelecting: false }))
  }

  // Reset desktop icons to default positions
  const resetDesktopPositions = () => {
    setDesktopApps(defaultAppPositions)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bitcoinOS-desktop-positions')
    }
  }

  // Keyboard shortcut for resetting positions (Cmd/Ctrl + R + R - double R)
  useEffect(() => {
    let resetKeyCount = 0
    let resetTimeout: NodeJS.Timeout

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'r') {
        event.preventDefault()
        resetKeyCount++
        
        if (resetKeyCount === 2) {
          resetDesktopPositions()
          console.log('Desktop positions reset to defaults')
          resetKeyCount = 0
        }
        
        // Reset count after 1 second
        clearTimeout(resetTimeout)
        resetTimeout = setTimeout(() => {
          resetKeyCount = 0
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(resetTimeout)
    }
  }, [])

  const openApp = useCallback((app: DesktopIcon) => {
    if (app.disabled) return
    
    // Check app mode preference (default to fullscreen)
    const appMode = typeof window !== 'undefined' 
      ? localStorage.getItem('appMode') || 'fullscreen'
      : 'fullscreen'
    
    if (appMode === 'fullscreen' && app.url) {
      // Open in fullscreen mode (navigate to URL)
      window.location.href = app.url
      return
    }
    
    // Windowed mode - check if window is already open
    const existingWindow = openWindows.find(w => w.id === app.id)
    if (existingWindow) {
      // Bring to front (handled by WindowManager)
      return
    }

    // Open new window
    setOpenWindows(prev => [...prev, { id: `${app.id}-${Date.now()}`, app }])
  }, [openWindows])

  const closeWindow = useCallback((windowId: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId))
  }, [])

  const activeApp = activeId ? desktopApps.find(app => app.id === activeId) : null

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 background-cycle transition-all duration-500 ease-in-out">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        style={{ filter: 'brightness(0.3)' }}
        onLoadedData={() => {
          // Video is ready to play
          console.log('Video loaded and ready')
        }}
        onTimeUpdate={(e) => {
          const video = e.target as HTMLVideoElement;
          const duration = video.duration;
          const currentTime = video.currentTime;
          
          // Start fading when 50% through the video  
          if (duration && currentTime / duration > 0.5) {
            const fadeProgress = (currentTime / duration - 0.5) / 0.5; // 0 to 1 over last 50%
            video.style.opacity = (1 - fadeProgress).toString();
          }
        }}
        onEnded={(e) => {
          const video = e.target as HTMLVideoElement;
          video.style.opacity = '0';
        }}
      >
        <source src="/b-OS-pro2.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay to ensure content visibility */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Desktop Icons */}
      <div 
        className={`absolute inset-0 pt-20 pb-8 pr-8 z-20 transition-all duration-500 ease-in-out opacity-0 animate-fadeInUp ${showDevSidebar ? 'pl-[260px]' : 'pl-4'}`}
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        onClick={handleDesktopClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={desktopApps}>
            <div className="relative w-full h-full">
              {desktopApps.map((app) => (
                <DraggableIcon
                  key={app.id}
                  app={app}
                  onDoubleClick={() => openApp(app)}
                  isSelected={selectedIcons.includes(app.id)}
                  onSelect={handleIconSelect}
                  iconTheme={iconTheme}
                />
              ))}
              
              {/* Selection Box */}
              {selectionBox.isSelecting && (
                <div
                  className="absolute border-2 border-blue-400 bg-blue-400/10 pointer-events-none"
                  style={{
                    left: Math.min(selectionBox.startX, selectionBox.currentX),
                    top: Math.min(selectionBox.startY, selectionBox.currentY),
                    width: Math.abs(selectionBox.currentX - selectionBox.startX),
                    height: Math.abs(selectionBox.currentY - selectionBox.startY),
                  }}
                />
              )}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeApp ? (
              <div className="opacity-80">
                {selectedIcons.includes(activeApp.id) && selectedIcons.length > 1 ? (
                  // Show multiple icons when dragging a selection
                  <div className="relative">
                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10">
                      {activeApp.id === 'senseii' ? (
                        <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M3 5h18" />
                          <path d="M5 5v14" />
                          <path d="M19 5v14" />
                          <path d="M3 9h18" />
                          <path d="M9 5v4" />
                          <path d="M15 5v4" />
                          <path d="M12 5v14" />
                        </svg>
                      ) : activeApp.id === 'cashboard' ? (
                        <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="12" cy="12" r="10" />
                          <path d="M15 8.5C14.315 7.574 13.243 7 12 7c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
                        </svg>
                      ) : activeApp.id === 'bapps-store-right' ? (
                        <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10" fill="currentColor" />
                          <text x="12" y="17" fontSize="14" fontWeight="bold" fill="black" textAnchor="middle">B</text>
                        </svg>
                      ) : (
                        <activeApp.icon className={`w-12 h-12 ${activeApp.color}`} />
                      )}
                      <span className="text-sm text-white text-center font-medium">
                        {activeApp.name}
                      </span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                      {selectedIcons.length}
                    </div>
                  </div>
                ) : (
                  // Show single icon when dragging one item
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10">
                    {activeApp.id === 'senseii' ? (
                      <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path d="M3 5h18" />
                        <path d="M5 5v14" />
                        <path d="M19 5v14" />
                        <path d="M3 9h18" />
                        <path d="M9 5v4" />
                        <path d="M15 5v4" />
                        <path d="M12 5v14" />
                      </svg>
                    ) : activeApp.id === 'cashboard' ? (
                      <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M15 8.5C14.315 7.574 13.243 7 12 7c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
                      </svg>
                    ) : activeApp.id === 'bapps-store-right' ? (
                      <svg className={`w-12 h-12 ${activeApp.color}`} viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="currentColor" />
                        <text x="12" y="17" fontSize="14" fontWeight="bold" fill="black" textAnchor="middle">B</text>
                      </svg>
                    ) : (
                      <activeApp.icon className={`w-12 h-12 ${activeApp.color}`} />
                    )}
                    <span className="text-sm text-white text-center font-medium">
                      {activeApp.name}
                    </span>
                  </div>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Window Manager for opened apps */}
      <WindowManager windows={openWindows} onClose={closeWindow} />
      
      {/* Bitcoin Corp, Trust and NPG - Top Right (small, vertical) */}
      <div className="absolute right-8 top-20 flex flex-col gap-4 z-20">
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/'}
          title="Bitcoin Corporation"
        >
          <Building2 className="w-10 h-10 text-bitcoin-orange drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-xs text-white text-center font-medium drop-shadow-md">Corp</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/trust'}
          title="Trust"
        >
          <Shield className="w-10 h-10 text-blue-500 drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-xs text-white text-center font-medium drop-shadow-md">Trust</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.open('https://www.bitcoinapps.store/', '_blank')}
          title="Bitcoin Apps Store"
        >
          <Store className="w-8 h-8 text-orange-500 drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-xs text-white text-center font-medium drop-shadow-md">BAPPS</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.open('https://www.cashboard.website/', '_blank')}
          title="Cashboard"
        >
          <svg className="w-8 h-8 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="10" />
            <path d="M15.5 9.5C14.815 8.574 13.743 8 12.5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
          </svg>
          <span className="text-xs text-white text-center font-medium drop-shadow-md">CashBoard</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.open('https://senseii-zeta.vercel.app/', '_blank')}
          title="Senseii"
        >
          <svg className="w-8 h-8 text-red-500 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 5h18" />
            <path d="M6 5v14" />
            <path d="M18 5v14" />
            <path d="M3 9h18" />
          </svg>
          <span className="text-xs text-white text-center font-medium drop-shadow-md">Senseii</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => window.open('https://www.ninjapunkgirls.website', '_blank')}
          title="Ninja Punk Girls"
        >
          <Sparkles className="w-8 h-8 text-pink-500 drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-xs text-white text-center font-medium drop-shadow-md">NPG</span>
        </button>
      </div>
      
      {/* Trash Basket - Bottom Right (interactive) */}
      <div className="absolute bottom-8 right-8 z-20">
        <div 
          className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer select-none"
          title={`Trash (${trashedItems.length} items)`}
          onDoubleClick={() => setShowTrashWindow(true)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            // Handle drop to trash
            if (activeId) {
              const itemToTrash = desktopApps.find(app => app.id === activeId)
              if (itemToTrash) {
                setTrashedItems([...trashedItems, itemToTrash])
                setDesktopApps(desktopApps.filter(app => app.id !== activeId))
              }
            }
          }}
        >
          <Trash2 
            className={`w-12 h-12 ${trashedItems.length > 0 ? 'text-gray-300' : 'text-gray-400'} drop-shadow-2xl`} 
            strokeWidth={1.5}
          />
          <span className="text-sm text-white text-center font-medium drop-shadow-lg">
            Trash
          </span>
        </div>
      </div>
      
      {/* Trash Window - macOS Style Filesystem */}
      {showTrashWindow && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900/95 rounded-xl shadow-2xl border border-gray-600 backdrop-blur-lg w-[600px] h-[500px] flex flex-col overflow-hidden">
            {/* Window Title Bar */}
            <div className="flex items-center justify-between bg-gray-800/80 px-4 py-3 border-b border-gray-600">
              <div className="flex items-center gap-3">
                {/* macOS Window Controls */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowTrashWindow(false)}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    title="Close"
                  />
                  <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors" title="Minimize" />
                  <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" title="Maximize" />
                </div>
                <Trash2 className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">Trash</span>
                <span className="text-gray-400 text-sm">({trashedItems.length} items)</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded" title="View Options">
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-gray-800/60 px-4 py-2 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-700">
                  ← Back
                </button>
                <button className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-700">
                  → Forward
                </button>
                <span className="text-gray-400 text-sm">Bitcoin OS / Trash</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setTrashedItems([])}
                  disabled={trashedItems.length === 0}
                  className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Empty Trash
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-auto">
              {trashedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Trash2 className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium">Trash is empty</p>
                  <p className="text-sm">Drag items here to delete them</p>
                </div>
              ) : (
                <div className="p-4">
                  {/* List Header */}
                  <div className="grid grid-cols-12 gap-4 text-xs text-gray-400 font-medium mb-2 px-2 py-1 border-b border-gray-700">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-2">Action</div>
                  </div>
                  
                  {/* File Items */}
                  <div className="space-y-1">
                    {trashedItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div 
                          key={item.id} 
                          className="grid grid-cols-12 gap-4 items-center p-2 rounded hover:bg-gray-800/50 transition-colors group"
                        >
                          <div className="col-span-6 flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-white text-sm truncate">{item.name}</span>
                          </div>
                          <div className="col-span-2 text-gray-400 text-sm">Application</div>
                          <div className="col-span-2 text-gray-400 text-sm">--</div>
                          <div className="col-span-2">
                            <button 
                              onClick={() => {
                                setDesktopApps([...desktopApps, item])
                                setTrashedItems(trashedItems.filter(t => t.id !== item.id))
                              }}
                              className="text-blue-400 hover:text-blue-300 text-sm px-2 py-1 rounded hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Restore
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="bg-gray-800/60 px-4 py-2 border-t border-gray-700 text-xs text-gray-400 flex justify-between">
              <span>{trashedItems.length} items</span>
              <span>{trashedItems.length > 0 ? 'Click items to restore' : 'Drag apps here to delete'}</span>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
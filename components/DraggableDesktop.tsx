'use client'

import { useState, useCallback } from 'react'
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, TrendingUp, Building2, Shield, Trash2, Video, GraduationCap, Code, Paintbrush, Sparkles, Zap, BookOpen, Globe, Box, Camera, MapPin, MessageCircle, Users, Gamepad2 } from 'lucide-react'
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
  position: { x: number; y: number }
}

// Desktop icon component with drag functionality
function DraggableIcon({ app, onDoubleClick }: { app: DesktopIcon; onDoubleClick: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: app.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : app.disabled ? 0.5 : 1,
  }

  const Icon = app.icon

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`desktop-icon-draggable ${app.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onDoubleClick={!app.disabled ? onDoubleClick : undefined}
    >
      <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/10 transition-all select-none">
        <Icon 
          className={`w-12 h-12 ${app.color} drop-shadow-2xl`} 
          strokeWidth={1.5}
        />
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
  
  // Desktop apps with positions
  const [desktopApps, setDesktopApps] = useState<DesktopIcon[]>([
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', position: { x: 0, y: 2 } },
    { id: 'wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', position: { x: 1, y: 2 } },
    { id: 'email', name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', position: { x: 2, y: 2 } },
    { id: 'music', name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', position: { x: 3, y: 2 } },
    { id: 'writer', name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', position: { x: 0, y: 3 } },
    { id: 'drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', position: { x: 1, y: 3 } },
    { id: 'calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app', position: { x: 2, y: 3 } },
    { id: 'exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-emerald-500', url: 'https://bitcoin-exchange-iota.vercel.app', position: { x: 3, y: 3 } },
    { id: 'spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app', position: { x: 0, y: 4 } },
    { id: 'search', name: 'Bitcoin Search', icon: Search, color: 'text-blue-600', url: 'https://bitcoin-search.vercel.app', position: { x: 1, y: 4 } },
    { id: 'shares', name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true, position: { x: 2, y: 4 } },
    { id: 'jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-cyan-400', url: 'https://bitcoin-jobs.vercel.app/', position: { x: 3, y: 4 } },
    { id: 'video', name: 'Bitcoin Video', icon: Video, color: 'text-green-500', url: 'https://bitcoin-video-nine.vercel.app', position: { x: 0, y: 5 } },
    { id: 'education', name: 'Bitcoin Education', icon: GraduationCap, color: 'text-blue-500', url: 'https://bitcoin-education-theta.vercel.app', position: { x: 1, y: 5 } },
    { id: 'code', name: 'Bitcoin Code', icon: Code, color: 'text-indigo-500', url: 'https://bitcoin-code.vercel.app', position: { x: 2, y: 5 } },
    { id: 'paint', name: 'Bitcoin Paint', icon: Paintbrush, color: 'text-red-500', url: 'https://bitcoin-paint.vercel.app/', position: { x: 0, y: 6 } },
    { id: 'domains', name: 'Bitcoin Domains', icon: Globe, color: 'text-cyan-400', url: 'https://bitcoin-dns.vercel.app', position: { x: 1, y: 6 } },
    { id: '3d', name: 'Bitcoin 3D', icon: Box, color: 'text-pink-500', url: 'https://bitcoin-3d.vercel.app', position: { x: 2, y: 6 } },
    { id: 'photos', name: 'Bitcoin Photos', icon: Camera, color: 'text-blue-400', url: 'https://bitcoin-photos.vercel.app', position: { x: 3, y: 6 } },
    { id: 'maps', name: 'Bitcoin Maps', icon: MapPin, color: 'text-green-500', url: 'https://bitcoin-maps.vercel.app', position: { x: 0, y: 7 } },
    { id: 'chat', name: 'Bitcoin Chat', icon: MessageCircle, color: 'text-blue-400', url: 'https://bitcoin-chat.vercel.app', position: { x: 1, y: 7 } },
    { id: 'social', name: 'Bitcoin Social', icon: Users, color: 'text-pink-400', url: 'https://bitcoin-social.vercel.app', position: { x: 2, y: 7 } },
    { id: 'games', name: 'Bitcoin Games', icon: Gamepad2, color: 'text-purple-400', url: 'https://bitcoin-gaming.vercel.app', position: { x: 3, y: 7 } },
    { id: 'books', name: 'Bitcoin Books', icon: BookOpen, color: 'text-amber-500', url: 'https://bitcoin-books-bay.vercel.app', position: { x: 0, y: 8 } },
  ])

  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWindows, setOpenWindows] = useState<Array<{ id: string; app: DesktopIcon }>>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
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
    const { active, over } = event

    if (active.id !== over?.id) {
      setDesktopApps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex)
        }
        return items
      })
    }

    setActiveId(null)
  }

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
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 background-cycle">
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
          
          // Start fading when 90% through the video
          if (duration && currentTime / duration > 0.9) {
            const fadeProgress = (currentTime / duration - 0.9) / 0.1; // 0 to 1 over last 10%
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
      <div className={`absolute inset-0 py-8 pr-8 z-20 transition-all duration-300 ${showDevSidebar ? 'pl-[260px]' : 'pl-4'}`}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={desktopApps} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-6 gap-6 auto-rows-min max-w-3xl">
              {desktopApps.map((app) => (
                <DraggableIcon
                  key={app.id}
                  app={app}
                  onDoubleClick={() => openApp(app)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeApp ? (
              <div className="opacity-80">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/10">
                  <activeApp.icon className={`w-12 h-12 ${activeApp.color}`} />
                  <span className="text-sm text-white text-center font-medium">
                    {activeApp.name}
                  </span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Window Manager for opened apps */}
      <WindowManager windows={openWindows} onClose={closeWindow} />
      
      {/* Bitcoin Corp, Trust and NPG - Top Right (small, vertical) */}
      <div className="absolute right-8 top-8 flex flex-col gap-4 z-20">
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
          onClick={() => window.location.href = 'https://bsvassociation.org/'}
          title="BSV Association"
        >
          <svg className="w-10 h-10 text-blue-500 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2 L22 20 L2 20 Z"/>
          </svg>
          <span className="text-xs text-white text-center font-medium drop-shadow-md">Ass</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
          onClick={() => setShowTrashWindow(true)}
          title="Bitcoin Dojo"
        >
          <svg className="w-10 h-10 text-red-500 drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 6 L21 6"/>
            <path d="M4 9 L20 9"/>
            <path d="M7 9 L7 18"/>
            <path d="M17 9 L17 18"/>
          </svg>
          <span className="text-xs text-white text-center font-medium drop-shadow-md">Dojo</span>
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
      <div className="absolute bottom-24 right-8 z-20">
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
            className={`w-16 h-16 ${trashedItems.length > 0 ? 'text-gray-300' : 'text-gray-400'} drop-shadow-2xl`} 
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
    </div>
  )
}
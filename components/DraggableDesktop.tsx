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
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, TrendingUp, Building2, Shield, Trash2, Video, GraduationCap } from 'lucide-react'
import WindowManager from './WindowManager'

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
        {app.id === 'ninja-punk-girls' ? (
          <div className="w-16 h-16 rounded-xl shadow-2xl overflow-hidden">
            <img 
              src="/npg-logo.svg" 
              alt="Ninja Punk Girls" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <Icon 
            className={`w-16 h-16 ${app.color} drop-shadow-2xl`} 
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

export default function DraggableDesktop() {
  const [trashedItems, setTrashedItems] = useState<DesktopIcon[]>([])
  const [showTrashWindow, setShowTrashWindow] = useState(false)
  
  // Desktop apps with positions
  const [desktopApps, setDesktopApps] = useState<DesktopIcon[]>([
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', position: { x: 0, y: 0 } },
    { id: 'wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', position: { x: 1, y: 0 } },
    { id: 'email', name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', position: { x: 2, y: 0 } },
    { id: 'music', name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', position: { x: 3, y: 0 } },
    { id: 'writer', name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', position: { x: 0, y: 1 } },
    { id: 'drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', position: { x: 1, y: 1 } },
    { id: 'calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app', position: { x: 2, y: 1 } },
    { id: 'exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-emerald-500', url: 'https://bitcoin-exchange-iota.vercel.app', position: { x: 3, y: 1 } },
    { id: 'spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app', position: { x: 0, y: 2 } },
    { id: 'search', name: 'Bitcoin Search', icon: Search, color: 'text-blue-600', url: 'https://bitcoin-search.vercel.app', position: { x: 1, y: 2 } },
    { id: 'shares', name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true, position: { x: 2, y: 2 } },
    { id: 'jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-cyan-400', url: 'https://bitcoin-jobs.vercel.app/', position: { x: 3, y: 2 } },
    { id: 'video', name: 'Bitcoin Video', icon: Video, color: 'text-green-500', url: 'https://bitcoin-video-nine.vercel.app', position: { x: 0, y: 3 } },
    { id: 'education', name: 'Bitcoin Education', icon: GraduationCap, color: 'text-blue-500', url: 'https://bitcoin-education-theta.vercel.app', position: { x: 1, y: 3 } },
    { id: 'ninja-punk-girls', name: 'Ninja Punk Girls', icon: Store, color: 'text-pink-500', url: 'https://www.ninjapunkgirls.website', position: { x: 2, y: 3 } },
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
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Desktop Icons */}
      <div className="absolute inset-0 p-8 pl-80">
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
                  {activeApp.id === 'ninja-punk-girls' ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="/npg-logo.svg" alt="Ninja Punk Girls" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <activeApp.icon className={`w-16 h-16 ${activeApp.color}`} />
                  )}
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
      
      {/* Bitcoin Corp and Trust - Right Side (small, vertical) */}
      <div className="absolute right-8 top-1/3 flex flex-col gap-4">
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
      </div>
      
      {/* Trash Basket - Bottom Right (interactive) */}
      <div className="absolute bottom-8 right-8">
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
      
      {/* Trash Window */}
      {showTrashWindow && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-96 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Trash ({trashedItems.length} items)</h2>
              <button 
                onClick={() => setShowTrashWindow(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {trashedItems.length === 0 ? (
              <p className="text-gray-400">Trash is empty</p>
            ) : (
              <div className="space-y-2">
                {trashedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-700 p-2 rounded">
                    <span className="text-white">{item.name}</span>
                    <button 
                      onClick={() => {
                        setDesktopApps([...desktopApps, item])
                        setTrashedItems(trashedItems.filter(t => t.id !== item.id))
                      }}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Restore
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => setTrashedItems([])}
                  className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                  Empty Trash
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
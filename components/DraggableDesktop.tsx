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
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, TrendingUp } from 'lucide-react'
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
        {app.id === 'bapps-store' ? (
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/bapps-icon.jpg" 
              alt="Bitcoin Apps Store" 
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
  // Desktop apps with positions
  const [desktopApps, setDesktopApps] = useState<DesktopIcon[]>([
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', position: { x: 0, y: 0 } },
    { id: 'wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app', position: { x: 1, y: 0 } },
    { id: 'email', name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app', position: { x: 2, y: 0 } },
    { id: 'music', name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app', position: { x: 3, y: 0 } },
    { id: 'writer', name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app', position: { x: 0, y: 1 } },
    { id: 'drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app', position: { x: 1, y: 1 } },
    { id: 'calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app', position: { x: 2, y: 1 } },
    { id: 'exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-gray-500', url: 'https://bitcoin-exchange.vercel.app', position: { x: 3, y: 1 } },
    { id: 'spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'text-sky-400', url: 'https://bitcoin-spreadsheet.vercel.app', position: { x: 0, y: 2 } },
    { id: 'search', name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', disabled: true, position: { x: 1, y: 2 } },
    { id: 'shares', name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true, position: { x: 2, y: 2 } },
    { id: 'jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-gray-500', url: 'https://bitcoin-jobs.vercel.app', disabled: true, position: { x: 3, y: 2 } },
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
                  {activeApp.id === 'bapps-store' ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src="/bapps-icon.jpg" alt="Bitcoin Apps Store" className="w-full h-full object-cover" />
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
    </div>
  )
}
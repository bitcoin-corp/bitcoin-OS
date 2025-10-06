import React, { useCallback, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { BitcoinApp } from '../types';
import { useOSStore } from '../stores/osStore';
import { DockItem } from './DockItem';

interface DockProps {
  className?: string;
  position?: 'bottom' | 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  autoHide?: boolean;
  openAppsInWindows?: boolean; // Whether to open apps in windows instead of external tabs
}

export const Dock: React.FC<DockProps> = ({
  className,
  position = 'bottom',
  size = 'medium',
  autoHide = false,
  openAppsInWindows = false,
}) => {
  const { 
    dock, 
    windows,
    openWindow,
    focusWindow,
    minimizeWindow,
    addNotification,
  } = useOSStore();

  // Dragging state
  const dockRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [customPosition, setCustomPosition] = useState<{ x: number; y: number } | null>(null);

  // Check if there are any maximized windows
  const hasMaximizedWindow = windows.some(w => w.isMaximized && !w.isMinimized);
  
  // Auto-hide dock behavior for maximized windows (unless detached/floating)
  const shouldShowDock = dock.isVisible && (customPosition !== null || !hasMaximizedWindow || !autoHide);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drag if clicking on the dock background, not on app icons
    if ((e.target as HTMLElement).closest('[data-dock-item]')) return;
    
    setIsDragging(true);
    const rect = dockRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    e.preventDefault();
  }, []);

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep dock within viewport bounds
      const maxX = globalThis.window.innerWidth - (dockRef.current?.offsetWidth || 0);
      const maxY = globalThis.window.innerHeight - (dockRef.current?.offsetHeight || 0);
      
      const clampedPosition = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      };
      
      setCustomPosition(clampedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Show notification when dock is first detached
      if (customPosition !== null && !isDragging) {
        addNotification({
          title: 'Dock Detached',
          message: 'Dock is now floating! Double-click to anchor back to bottom.',
          type: 'info',
          duration: 4000,
        });
      }
    };

    // Handle double-click to dock back to bottom
    const handleDoubleClick = () => {
      if (customPosition !== null) {
        setCustomPosition(null);
        addNotification({
          title: 'Dock Anchored',
          message: 'Dock has been anchored back to the bottom',
          type: 'info',
          duration: 2000,
        });
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    if (dockRef.current) {
      dockRef.current.addEventListener('dblclick', handleDoubleClick);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (dockRef.current) {
        dockRef.current.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [isDragging, dragOffset, customPosition, addNotification]);

  const handleAppClick = useCallback((app: BitcoinApp) => {
    // Check if app already has a window open
    const existingWindow = windows.find(w => w.appId === app.id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        // Restore minimized window
        minimizeWindow(existingWindow.id);
      } else if (existingWindow.isFocused) {
        // Minimize if already focused
        minimizeWindow(existingWindow.id);
      } else {
        // Focus existing window
        focusWindow(existingWindow.id);
      }
    } else {
      // Determine how to open the app
      if (app.url && app.url !== '#') {
        if (openAppsInWindows) {
          // Open app in window with embedded iframe
          openWindow(app.id, app.name, (
            <div className="flex-1 w-full h-full">
              <iframe 
                src={app.url}
                className="w-full h-full border-0"
                title={app.name}
              />
            </div>
          ));
          addNotification({
            title: 'App Opened',
            message: `${app.name} is now running in a window`,
            type: 'success',
            duration: 2000,
          });
        } else {
          // Open externally in new tab
          openWindow(app.id, app.name, undefined, { openExternal: true });
          addNotification({
            title: 'App Launched',
            message: `${app.name} is opening in a new tab...`,
            type: 'info',
            duration: 2000,
          });
        }
      } else {
        // For demo/placeholder apps, open in window
        openWindow(app.id, app.name, (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">{app.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{app.name}</h2>
              <p className="text-gray-600 mb-6">{app.description}</p>
              {app.requiresSubscription && (
                <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg inline-block">
                  Requires Bitcoin OS Pro subscription
                </div>
              )}
              {!app.requiresSubscription && app.url === '#' && (
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block">
                  Demo app - Coming soon!
                </div>
              )}
            </div>
          </div>
        ));
        addNotification({
          title: 'App Opened',
          message: `${app.name} window created`,
          type: 'info',
          duration: 2000,
        });
      }
    }
  }, [windows, openWindow, focusWindow, minimizeWindow, addNotification]);

  const getAppState = useCallback((app: BitcoinApp) => {
    const window = windows.find(w => w.appId === app.id);
    if (!window) return 'closed';
    if (window.isMinimized) return 'minimized';
    if (window.isFocused) return 'focused';
    return 'open';
  }, [windows]);

  const sizeClasses = {
    small: 'h-12',
    medium: 'h-16',
    large: 'h-20',
  };

  const getPositionClasses = () => {
    if (customPosition !== null) {
      // When detached, use absolute positioning
      return 'flex-row';
    }
    
    // When anchored, use fixed positioning
    const positionClasses = {
      bottom: 'bottom-4 left-1/2 transform -translate-x-1/2 flex-row',
      left: 'left-2 top-1/2 transform -translate-y-1/2 flex-col',
      right: 'right-2 top-1/2 transform -translate-y-1/2 flex-col',
    };
    return positionClasses[position];
  };

  if (!shouldShowDock) {
    console.log('Dock hidden:', { shouldShowDock, hasMaximizedWindow, autoHide, isVisible: dock.isVisible });
    return null;
  }
  
  console.log('Dock rendering:', { position, customPosition, apps: dock.apps.length });

  return (
    <motion.div
      ref={dockRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={cn(
        customPosition !== null ? 'absolute z-50' : 'fixed z-50',
        'flex items-center space-x-1 space-y-1',
        'bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30',
        'shadow-2xl p-2',
        isDragging ? 'cursor-grabbing shadow-3xl ring-2 ring-blue-400/50' : 'cursor-grab',
        getPositionClasses(),
        sizeClasses[size],
        className
      )}
      style={customPosition !== null ? {
        left: customPosition.x,
        top: customPosition.y,
        transform: 'none'
      } : {}}
      onMouseDown={handleMouseDown}
    >
      <AnimatePresence>
        {dock.apps.map((app, index) => (
          <DockItem
            key={app.id}
            app={app}
            state={getAppState(app)}
            onClick={() => handleAppClick(app)}
            index={index}
            size={size}
          />
        ))}
      </AnimatePresence>

      {/* Dock divider */}
      {dock.apps.length > 0 && (
        <div className={cn(
          'bg-white/30 rounded-full',
          position === 'bottom' ? 'w-px h-8' : 'h-px w-8'
        )} />
      )}

      {/* Floating indicator */}
      {customPosition !== null && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg" 
             title="Dock is floating - double-click to anchor" />
      )}

      {/* Add more apps button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex items-center justify-center bg-white/20 rounded-xl',
          'hover:bg-white/30 transition-colors border border-white/20',
          sizeClasses[size],
          position === 'bottom' ? 'w-12' : 'h-12 w-full'
        )}
        onClick={() => addNotification({
          title: 'App Store',
          message: 'App Store coming soon!',
          type: 'info',
          duration: 3000,
        })}
      >
        <span className="text-white text-xl">+</span>
      </motion.button>
    </motion.div>
  );
};
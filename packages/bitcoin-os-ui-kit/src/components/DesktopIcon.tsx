import React, { useCallback, useRef } from 'react';
import { cn } from '../utils/cn';
import { DesktopIcon as DesktopIconType, ContextMenuItem } from '../types';
import { useOSStore } from '../stores/osStore';

interface DesktopIconProps {
  icon: DesktopIconType;
  onDoubleClick?: (icon: DesktopIconType) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  onDoubleClick 
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const { 
    selectDesktopIcon, 
    moveDesktopIcon, 
    openWindow,
    openContextMenu,
    removeDesktopIcon,
    addNotification,
  } = useOSStore();

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    selectDesktopIcon(icon.id, e.metaKey || e.ctrlKey);
  }, [icon.id, selectDesktopIcon]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onDoubleClick) {
      onDoubleClick(icon);
    } else {
      // Default behavior: open the app
      openWindow(icon.appId, icon.name);
      addNotification({
        title: 'App Launched',
        message: `${icon.name} is opening...`,
        type: 'info',
        duration: 2000,
      });
    }
  }, [icon, onDoubleClick, openWindow, addNotification]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const contextMenuItems: ContextMenuItem[] = [
      {
        id: 'open',
        label: 'Open',
        icon: 'external-link',
        action: () => {
          openWindow(icon.appId, icon.name);
          addNotification({
            title: 'App Launched',
            message: `${icon.name} is opening...`,
            type: 'info',
            duration: 2000,
          });
        },
      },
      { id: 'sep1', label: '', separator: true },
      {
        id: 'get-info',
        label: 'Get Info',
        icon: 'info',
        shortcut: '⌘I',
        action: () => {
          addNotification({
            title: 'App Info',
            message: `${icon.name} - Version 1.0.0`,
            type: 'info',
            duration: 3000,
          });
        },
      },
      {
        id: 'rename',
        label: 'Rename',
        icon: 'edit',
        action: () => {
          addNotification({
            title: 'Rename',
            message: 'Renaming feature coming soon!',
            type: 'info',
            duration: 3000,
          });
        },
      },
      { id: 'sep2', label: '', separator: true },
      {
        id: 'move-to-trash',
        label: 'Remove from Desktop',
        icon: 'trash-2',
        action: () => {
          removeDesktopIcon(icon.id);
          addNotification({
            title: 'Icon Removed',
            message: `${icon.name} removed from desktop`,
            type: 'success',
            duration: 2000,
          });
        },
      },
    ];

    openContextMenu({ x: e.clientX, y: e.clientY }, contextMenuItems);
  }, [icon, openWindow, openContextMenu, removeDesktopIcon, addNotification]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', icon.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [icon.id]);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = e.currentTarget.parentElement?.getBoundingClientRect();
    
    if (containerRect) {
      const newPosition = {
        x: e.clientX - containerRect.left - rect.width / 2,
        y: e.clientY - containerRect.top - rect.height / 2,
      };
      
      // Ensure icon stays within desktop bounds
      newPosition.x = Math.max(0, Math.min(newPosition.x, containerRect.width - rect.width));
      newPosition.y = Math.max(0, Math.min(newPosition.y, containerRect.height - rect.height));
      
      moveDesktopIcon(icon.id, newPosition);
    }
  }, [icon.id, moveDesktopIcon]);

  return (
    <div
      ref={dragRef}
      className={cn(
        'absolute cursor-pointer select-none transition-all duration-200',
        'flex flex-col items-center space-y-1 p-2 rounded-lg',
        'hover:bg-white/10 active:scale-95',
        icon.isSelected && 'bg-blue-500/20 ring-2 ring-blue-400'
      )}
      style={{
        left: icon.position.x,
        top: icon.position.y,
      }}
      draggable
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Icon Image/Emoji */}
      <div className="w-12 h-12 flex items-center justify-center text-3xl bg-white/20 rounded-lg backdrop-blur-sm border border-white/30">
        {icon.icon.startsWith('http') || icon.icon.startsWith('/') ? (
          <img 
            src={icon.icon} 
            alt={icon.name}
            className="w-8 h-8 object-contain"
            draggable={false}
          />
        ) : (
          <span>{icon.icon}</span>
        )}
      </div>
      
      {/* Icon Label */}
      <span className={cn(
        'text-xs font-medium text-white text-center max-w-16',
        'text-shadow-sm truncate leading-tight',
        'drop-shadow-md'
      )}>
        {icon.name}
      </span>
    </div>
  );
};
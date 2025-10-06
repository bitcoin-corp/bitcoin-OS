import React, { useRef, useCallback } from 'react';
import { useOSStore } from '../stores/osStore';
import { cn } from '../utils/cn';
import { DesktopIcon } from './DesktopIcon';
import { ContextMenu } from './ContextMenu';
import { ContextMenuItem } from '../types';

interface DesktopProps {
  className?: string;
  wallpaper?: string;
  onDoubleClick?: () => void;
  children?: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = ({
  className,
  wallpaper = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  onDoubleClick,
  children,
}) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const { 
    desktopIcons, 
    contextMenu,
    clearDesktopSelection, 
    openContextMenu, 
    closeContextMenu,
    openSettings,
    addNotification,
  } = useOSStore();

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      clearDesktopSelection();
      closeContextMenu();
    }
  }, [clearDesktopSelection, closeContextMenu]);

  const handleDesktopDoubleClick = useCallback((e: React.MouseEvent) => {
    if (e.target === desktopRef.current) {
      onDoubleClick?.();
    }
  }, [onDoubleClick]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    
    if (e.target === desktopRef.current) {
      const contextMenuItems: ContextMenuItem[] = [
        {
          id: 'new-folder',
          label: 'New Folder',
          icon: 'folder-plus',
          action: () => {
            addNotification({
              title: 'New Folder',
              message: 'Folder creation coming soon!',
              type: 'info',
              duration: 3000,
            });
          },
        },
        { id: 'sep1', label: '', separator: true },
        {
          id: 'paste',
          label: 'Paste',
          icon: 'clipboard',
          shortcut: '⌘V',
          disabled: true,
        },
        { id: 'sep2', label: '', separator: true },
        {
          id: 'sort-by',
          label: 'Sort by',
          icon: 'arrow-up-down',
          submenu: [
            { id: 'sort-name', label: 'Name', action: () => {} },
            { id: 'sort-date', label: 'Date modified', action: () => {} },
            { id: 'sort-size', label: 'Size', action: () => {} },
            { id: 'sort-type', label: 'Type', action: () => {} },
          ],
        },
        {
          id: 'view-options',
          label: 'View Options',
          icon: 'settings',
          action: () => openSettings('desktop'),
        },
        { id: 'sep3', label: '', separator: true },
        {
          id: 'change-wallpaper',
          label: 'Change Wallpaper',
          icon: 'image',
          action: () => openSettings('appearance'),
        },
        {
          id: 'system-preferences',
          label: 'System Preferences',
          icon: 'cog',
          action: () => openSettings('general'),
        },
      ];

      openContextMenu({ x: e.clientX, y: e.clientY }, contextMenuItems);
    }
  }, [openContextMenu, openSettings, addNotification]);

  return (
    <div
      ref={desktopRef}
      className={cn(
        'relative w-full h-full overflow-hidden select-none',
        'bg-cover bg-center bg-no-repeat',
        className
      )}
      style={{
        backgroundImage: wallpaper.startsWith('http') || wallpaper.startsWith('/') 
          ? `url(${wallpaper})` 
          : wallpaper,
      }}
      onClick={handleDesktopClick}
      onDoubleClick={handleDesktopDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
        />
      ))}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          isOpen={contextMenu.isOpen}
          position={contextMenu.position}
          items={contextMenu.items}
          onClose={closeContextMenu}
        />
      )}

      {/* Additional Children (Windows, etc.) */}
      {children}
    </div>
  );
};
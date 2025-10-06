import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { ContextMenuItem } from '../types';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  items,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = position.x;
      let y = position.y;

      // Adjust position if menu would go off-screen
      if (x + rect.width > viewportWidth) {
        x = viewportWidth - rect.width - 10;
      }
      if (y + rect.height > viewportHeight) {
        y = viewportHeight - rect.height - 10;
      }

      menu.style.left = `${Math.max(10, x)}px`;
      menu.style.top = `${Math.max(10, y)}px`;
    }
  }, [isOpen, position]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled && item.action) {
      item.action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed z-50 min-w-48 py-2',
        'bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50',
        'animate-in fade-in-0 zoom-in-95 duration-200'
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {items.map((item) => {
        if (item.separator) {
          return (
            <div
              key={item.id}
              className="h-px bg-gray-200 mx-2 my-1"
            />
          );
        }

        return (
          <div
            key={item.id}
            className={cn(
              'relative px-3 py-2 mx-1 rounded cursor-pointer transition-colors',
              'flex items-center space-x-3 text-sm',
              item.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700',
              item.submenu && 'pr-8'
            )}
            onClick={() => handleItemClick(item)}
          >
            {/* Icon */}
            {item.icon && (
              <div className="w-4 h-4 flex items-center justify-center">
                {/* For now using text, but in real implementation would use Lucide icons */}
                <span className="text-xs">🔷</span>
              </div>
            )}

            {/* Label */}
            <span className="flex-1">{item.label}</span>

            {/* Shortcut */}
            {item.shortcut && (
              <span className="text-xs text-gray-400 ml-auto">
                {item.shortcut}
              </span>
            )}

            {/* Submenu indicator */}
            {item.submenu && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <span className="text-xs text-gray-400">▶</span>
              </div>
            )}

            {/* Submenu (simplified - in real implementation would be positioned properly) */}
            {item.submenu && (
              <div className="hidden group-hover:block absolute left-full top-0 ml-1">
                {/* Submenu implementation would go here */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
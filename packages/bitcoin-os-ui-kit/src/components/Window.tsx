import React, { useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { OSWindow } from '../types';
import { useOSStore } from '../stores/osStore';

interface WindowProps {
  window: OSWindow;
  children?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window, children }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [tempPosition, setTempPosition] = useState({ x: 0, y: 0 });
  
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useOSStore();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!window.isFocused) {
      focusWindow(window.id);
    }
    
    // Start dragging if clicking on title bar
    if ((e.target as HTMLElement).closest('.window-drag-handle')) {
      setIsDragging(true);
      const rect = windowRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  }, [window.id, window.isFocused, focusWindow]);

  const handleClose = useCallback(() => {
    closeWindow(window.id);
  }, [window.id, closeWindow]);

  const handleMinimize = useCallback(() => {
    minimizeWindow(window.id);
  }, [window.id, minimizeWindow]);

  const handleMaximize = useCallback(() => {
    maximizeWindow(window.id);
  }, [window.id, maximizeWindow]);

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || window.isMaximized) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep window within viewport bounds
      const maxX = globalThis.window.innerWidth - window.size.width;
      const maxY = globalThis.window.innerHeight - window.size.height;
      
      const clampedPosition = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      };
      
      // Use temp position for smooth dragging without constant state updates
      setTempPosition(clampedPosition);
    };

    const handleMouseUp = () => {
      if (isDragging && tempPosition.x !== 0 && tempPosition.y !== 0) {
        // Only update store when drag ends
        moveWindow(window.id, tempPosition);
      }
      setIsDragging(false);
      setTempPosition({ x: 0, y: 0 });
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, window.isMaximized, window.size, moveWindow, tempPosition]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!window.isFocused) return;

      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'w':
            e.preventDefault();
            handleClose();
            break;
          case 'm':
            e.preventDefault();
            handleMinimize();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [window.isFocused, handleClose, handleMinimize]);

  if (window.isMinimized) {
    return null;
  }

  const windowContent = (
    <div
      ref={windowRef}
      className={cn(
        'absolute bg-white rounded-lg shadow-2xl border border-gray-200',
        'flex flex-col overflow-hidden transition-all duration-200',
        window.isFocused 
          ? 'ring-2 ring-blue-400/50 shadow-blue-500/20' 
          : 'shadow-gray-900/20',
        window.isMaximized && 'rounded-none border-0'
      )}
      style={{
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? '100vh' : window.size.height,
        left: window.isMaximized ? 0 : (isDragging && tempPosition.x !== 0 ? tempPosition.x : window.position.x),
        top: window.isMaximized ? 0 : (isDragging && tempPosition.y !== 0 ? tempPosition.y : window.position.y),
        zIndex: window.zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Title Bar */}
      <div className={cn(
        'window-drag-handle flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200',
        'select-none',
        window.isMaximized ? 'cursor-default' : 'cursor-move'
      )}>
        {/* Window Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            title="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
            title="Maximize"
          />
        </div>

        {/* Window Title */}
        <div className="flex-1 text-center pointer-events-none">
          <h3 className="text-sm font-medium text-gray-700 truncate">
            {window.title}
          </h3>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-20" />
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-white">
        {children || window.content || (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <p>Bitcoin OS App Window</p>
              <p className="text-sm mt-2">App ID: {window.appId}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (window.isMaximized) {
    return windowContent;
  }

  return windowContent;
};
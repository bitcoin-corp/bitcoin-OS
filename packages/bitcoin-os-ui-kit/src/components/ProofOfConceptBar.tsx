import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { useOSStore } from '../stores/osStore';

interface ProofOfConceptBarProps {
  className?: string;
  autoHide?: boolean;
}

export const ProofOfConceptBar: React.FC<ProofOfConceptBarProps> = ({
  className,
  autoHide = false,
}) => {
  const { windows, openSettings, addNotification } = useOSStore();

  // Check if there are any maximized windows
  const hasMaximizedWindow = windows.some(w => w.isMaximized && !w.isMinimized);
  
  // Auto-hide behavior for maximized windows
  const shouldShow = !hasMaximizedWindow || !autoHide;

  if (!shouldShow) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-30',
        'bg-gray-900/80 backdrop-blur-md border-b border-gray-700',
        'h-8 flex items-center justify-between px-4',
        'text-white text-xs',
        className
      )}
    >
      {/* Left side - Bitcoin OS branding */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <span className="text-orange-400">₿</span>
          <span className="font-medium">Bitcoin OS</span>
        </div>
        <span className="text-gray-400">|</span>
        <span className="text-gray-400">Proof of Concept</span>
      </div>

      {/* Center - Current status */}
      <div className="flex items-center space-x-4 text-gray-300">
        <span>Windows: {windows.length}</span>
        <span>•</span>
        <span>UI Kit: v1.1.0</span>
        <span>•</span>
        <span>Branch: test-ui-kit-integration</span>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => openSettings('general')}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
        >
          Settings
        </button>
        <button
          onClick={() => addNotification({
            title: 'PoC Mode',
            message: 'This is a proof of concept environment for testing Bitcoin OS UI Kit',
            type: 'info',
            duration: 4000,
          })}
          className="px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors"
        >
          Info
        </button>
      </div>
    </motion.div>
  );
};
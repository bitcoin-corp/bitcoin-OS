import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { useOSStore } from '../stores/osStore';
import { SettingsSidebar } from './SettingsSidebar';
import { SettingsPanel } from './SettingsPanel';

interface SettingsProps {
  className?: string;
}

export const Settings: React.FC<SettingsProps> = ({ className }) => {
  const { settings, closeSettings } = useOSStore();

  if (!settings.isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSettings}
      >
        <motion.div
          className={cn(
            'w-full max-w-5xl h-full max-h-[80vh] bg-white rounded-xl shadow-2xl',
            'flex overflow-hidden',
            className
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Settings Header */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-6 z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">⚙️</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Bitcoin OS Settings</h1>
            </div>
            
            <button
              onClick={closeSettings}
              className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
            >
              <span className="text-white text-sm">×</span>
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex w-full pt-16">
            {/* Sidebar */}
            <SettingsSidebar />
            
            {/* Main Panel */}
            <SettingsPanel />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
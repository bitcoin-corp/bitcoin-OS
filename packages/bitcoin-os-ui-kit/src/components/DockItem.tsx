import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { BitcoinApp } from '../types';

interface DockItemProps {
  app: BitcoinApp;
  state: 'closed' | 'open' | 'focused' | 'minimized';
  onClick: () => void;
  index: number;
  size?: 'small' | 'medium' | 'large';
}

export const DockItem: React.FC<DockItemProps> = ({
  app,
  state,
  onClick,
  index,
  size = 'medium',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  const iconSizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  };

  const getIndicatorColor = () => {
    switch (state) {
      case 'focused':
        return 'bg-blue-500';
      case 'open':
        return 'bg-gray-500';
      case 'minimized':
        return 'bg-yellow-500';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* App Icon */}
      <motion.button
        data-dock-item="true"
        className={cn(
          'relative flex items-center justify-center rounded-xl',
          'bg-white/20 hover:bg-white/30 transition-all duration-200',
          'border border-white/20 hover:border-white/40',
          'cursor-pointer select-none',
          sizeClasses[size],
          state === 'focused' && 'ring-2 ring-blue-400/50'
        )}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {/* App Icon Image/Emoji */}
        <div className={cn(
          'flex items-center justify-center',
          iconSizeClasses[size]
        )}>
          {app.icon.startsWith('http') || app.icon.startsWith('/') ? (
            <img 
              src={app.icon} 
              alt={app.name}
              className={cn('object-contain', iconSizeClasses[size])}
              draggable={false}
            />
          ) : (
            <span 
              className="text-white text-lg"
              style={{ 
                fontSize: size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px' 
              }}
            >
              {app.icon}
            </span>
          )}
        </div>

        {/* Subscription required indicator */}
        {app.requiresSubscription && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border border-white">
            <span className="text-white text-xs">💎</span>
          </div>
        )}
      </motion.button>

      {/* App State Indicator */}
      {state !== 'closed' && (
        <motion.div
          className={cn(
            'w-1 h-1 rounded-full mt-1',
            getIndicatorColor()
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          className={cn(
            'absolute -top-12 left-1/2 transform -translate-x-1/2',
            'px-3 py-1 bg-gray-900/90 text-white text-xs rounded-lg',
            'backdrop-blur-sm border border-gray-700',
            'whitespace-nowrap z-50'
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {app.name}
          {app.requiresSubscription && (
            <span className="text-orange-400 ml-1">Pro</span>
          )}
          
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
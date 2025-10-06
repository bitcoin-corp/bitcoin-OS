import React from 'react';
import { cn } from '../utils/cn';
import { useOSStore } from '../stores/osStore';

interface SettingsCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const settingsCategories: SettingsCategory[] = [
  {
    id: 'general',
    name: 'General',
    icon: '⚙️',
    description: 'Basic system preferences',
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: '🎨',
    description: 'Theme, wallpaper, and visual settings',
  },
  {
    id: 'desktop',
    name: 'Desktop & Dock',
    icon: '🖥️',
    description: 'Desktop icons and dock preferences',
  },
  {
    id: 'account',
    name: 'Account',
    icon: '👤',
    description: 'User profile and authentication',
  },
  {
    id: 'subscription',
    name: 'Subscription',
    icon: '💎',
    description: 'Bitcoin OS Pro features and billing',
  },
  {
    id: 'apps',
    name: 'Applications',
    icon: '📱',
    description: 'App permissions and access control',
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: '💰',
    description: 'BSV wallet and blockchain settings',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: '🔔',
    description: 'Alert and notification preferences',
  },
  {
    id: 'privacy',
    name: 'Privacy & Security',
    icon: '🔒',
    description: 'Security and privacy controls',
  },
  {
    id: 'developer',
    name: 'Developer',
    icon: '👨‍💻',
    description: 'Development tools and API settings',
  },
  {
    id: 'about',
    name: 'About',
    icon: 'ℹ️',
    description: 'System information and updates',
  },
];

export const SettingsSidebar: React.FC = () => {
  const { settings, setActiveSettingsPanel } = useOSStore();

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-1">
        {settingsCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveSettingsPanel(category.id)}
            className={cn(
              'w-full text-left p-3 rounded-lg transition-colors',
              'flex items-start space-x-3 hover:bg-white/80',
              settings.activePanel === category.id
                ? 'bg-blue-50 border border-blue-200 text-blue-900'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{category.icon}</span>
            <div className="min-w-0">
              <h3 className={cn(
                'font-medium text-sm',
                settings.activePanel === category.id ? 'text-blue-900' : 'text-gray-900'
              )}>
                {category.name}
              </h3>
              <p className={cn(
                'text-xs mt-0.5 leading-tight',
                settings.activePanel === category.id ? 'text-blue-700' : 'text-gray-500'
              )}>
                {category.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
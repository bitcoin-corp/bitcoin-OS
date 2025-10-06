'use client';

import React, { useEffect } from 'react';
import { 
  Desktop, 
  Dock, 
  WindowManager, 
  Settings,
  ProofOfConceptBar,
  useOSStore,
  type BitcoinApp,
  type DesktopIcon
} from '@bitcoin-os/ui-kit';

// Real Bitcoin Apps - matching the live implementation
const bitcoinApps: BitcoinApp[] = [
  {
    id: 'bapps-store',
    name: 'Bitcoin Apps Store',
    description: 'Bitcoin Apps Store',
    icon: '🏪',
    url: 'https://www.bitcoinapps.store/',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read'],
    category: 'store',
    color: '#ff6b35',
  },
  {
    id: 'bitcoin-wallet',
    name: 'Bitcoin Wallet',
    description: 'Manage your Bitcoin',
    icon: '💰',
    url: 'https://bitcoin-wallet-sable.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'finance',
    color: '#ffd700',
  },
  {
    id: 'bitcoin-email',
    name: 'Bitcoin Email',
    description: 'Email with Bitcoin integration',
    icon: '📧',
    url: 'https://bitcoin-email.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'communication',
    color: '#ef4444',
  },
  {
    id: 'bitcoin-music',
    name: 'Bitcoin Music',
    description: 'Stream and support artists with Bitcoin',
    icon: '🎵',
    url: 'https://bitcoin-music.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'entertainment',
    color: '#8b5cf6',
  },
  {
    id: 'bitcoin-writer',
    name: 'Bitcoin Writer',
    description: 'Write and publish with Bitcoin',
    icon: '✍️',
    url: 'https://bitcoin-writer.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'productivity',
    color: '#ff9500',
  },
  {
    id: 'bitcoin-code',
    name: 'Bitcoin Code',
    description: 'Code development environment',
    icon: '💻',
    url: 'https://bitcoin-code.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'development',
    color: '#0ea5e9',
  },
  {
    id: 'bitcoin-drive',
    name: 'Bitcoin Drive',
    description: 'Decentralized file storage',
    icon: '💾',
    url: 'https://bitcoin-drive.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'storage',
    color: '#22c55e',
  },
  {
    id: 'bitcoin-calendar',
    name: 'Bitcoin Calendar',
    description: 'Schedule and manage events',
    icon: '📅',
    url: 'https://bitcoin-calendar.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'productivity',
    color: '#d946ef',
  },
  {
    id: 'bitcoin-exchange',
    name: 'Bitcoin Exchange',
    description: 'Trade Bitcoin and other assets',
    icon: '📈',
    url: 'https://bitcoin-exchange.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'finance',
    color: '#10b981',
  },
  {
    id: 'bitcoin-search',
    name: 'Bitcoin Search',
    description: 'Search the Bitcoin ecosystem',
    icon: '🔍',
    url: 'https://bitcoin-search.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read'],
    category: 'utility',
    color: '#6b7280',
  },
  {
    id: 'bitcoin-spreadsheet',
    name: 'Bitcoin Spreadsheet',
    description: 'Spreadsheets with Bitcoin integration',
    icon: '📊',
    url: 'https://bitcoin-spreadsheet.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'productivity',
    color: '#3b82f6',
  },
  {
    id: 'bitcoin-video',
    name: 'Bitcoin Video',
    description: 'Video creation and streaming',
    icon: '🎬',
    url: 'https://bitcoin-video-nine.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'entertainment',
    color: '#65a30d',
  },
  {
    id: 'bitcoin-photos',
    name: 'Bitcoin Photos',
    description: 'Photo management and sharing',
    icon: '📷',
    url: 'https://bitcoin-photos.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'media',
    color: '#ec4899',
  },
  {
    id: 'bitcoin-jobs',
    name: 'Bitcoin Jobs',
    description: 'Find jobs in the Bitcoin ecosystem',
    icon: '💼',
    url: 'https://bitcoin-jobs.vercel.app',
    version: '1.0.0',
    isActive: true,
    requiresSubscription: false,
    permissions: ['read', 'write'],
    category: 'utility',
    color: '#40e0d0',
  }
];

export default function TestOSPage() {
  const { 
    addToDock, 
    addDesktopIcon, 
    openWindow,
    addNotification,
    dock 
  } = useOSStore();

  // Initialize the OS with real Bitcoin apps
  useEffect(() => {
    // Only run on client side to avoid hydration mismatches
    if (typeof window === 'undefined') return;
    
    // Add all Bitcoin apps to dock
    bitcoinApps.forEach(app => {
      addToDock(app);
    });

    // Add main apps as desktop icons
    const desktopIcons: DesktopIcon[] = [
      {
        id: 'desktop-store',
        appId: 'bapps-store',
        name: 'Bitcoin Apps Store',
        icon: '🏪',
        position: { x: 50, y: 50 },
        isSelected: false,
      },
      {
        id: 'desktop-wallet',
        appId: 'bitcoin-wallet',
        name: 'Bitcoin Wallet',
        icon: '💰',
        position: { x: 50, y: 150 },
        isSelected: false,
      },
      {
        id: 'desktop-writer',
        appId: 'bitcoin-writer',
        name: 'Bitcoin Writer',
        icon: '✍️',
        position: { x: 50, y: 250 },
        isSelected: false,
      },
      {
        id: 'desktop-email',
        appId: 'bitcoin-email',
        name: 'Bitcoin Email',
        icon: '📧',
        position: { x: 180, y: 50 },
        isSelected: false,
      },
      {
        id: 'desktop-code',
        appId: 'bitcoin-code',
        name: 'Bitcoin Code',
        icon: '💻',
        position: { x: 180, y: 150 },
        isSelected: false,
      },
    ];

    desktopIcons.forEach(icon => {
      addDesktopIcon(icon);
    });

    // Show welcome notification
    addNotification({
      title: 'Welcome to Bitcoin OS!',
      message: 'Your Bitcoin-native operating system is ready. Click dock apps to open them in new tabs or windows.',
      type: 'success',
      duration: 6000,
    });

    // Open a welcome window (delayed to ensure hydration is complete)
    setTimeout(() => {
      openWindow('welcome', 'Welcome to Bitcoin OS', (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">₿</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Bitcoin OS!</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            This is your Bitcoin-native operating system with {bitcoinApps.length} apps ready to use:
          </p>
          <div className="text-left space-y-2 max-w-lg mx-auto">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Click dock apps to open Bitcoin Writer, Wallet, Email, Music & more</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Double-click desktop icons to launch apps</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Right-click for context menus</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Open Settings to customize your experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm">Drag windows around and maximize them</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-orange-500">⚡</span>
              <span className="text-sm font-medium">Visit Bitcoin Apps Store to discover more apps</span>
            </div>
          </div>
          <button 
            className="mt-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => {
              addNotification({
                title: 'Pro Tip',
                message: 'Try opening Bitcoin Writer or the Apps Store from the dock!',
                type: 'info',
                duration: 4000,
              });
            }}
          >
            Explore Apps
          </button>
        </div>
      ));
    }, 1000);
  }, [addToDock, addDesktopIcon, openWindow, addNotification]);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Proof of Concept Bar - shows at top unless window is maximized */}
      <ProofOfConceptBar autoHide={false} />

      {/* Desktop Environment */}
      <div className="absolute inset-0 pt-8">
        <Desktop 
          wallpaper="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          onDoubleClick={() => {
            addNotification({
              title: 'Desktop',
              message: 'You double-clicked the desktop!',
              type: 'info',
              duration: 2000,
            });
          }}
        >
          {/* Windows are rendered here */}
          <WindowManager />
        </Desktop>
      </div>

      {/* Dock - auto-hides when windows are maximized */}
      <Dock 
        position="bottom"
        size="medium"
        autoHide={false}
      />

      {/* Settings Modal */}
      <Settings />

      {/* Enhanced Test Info Overlay */}
      <div className="absolute top-12 right-4 bg-black/20 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20">
        <h3 className="font-bold text-sm mb-2">🧪 Bitcoin OS Test Environment</h3>
        <div className="text-xs space-y-1">
          <div>Bitcoin Apps: {dock.apps.length}</div>
          <div>Branch: test-os-with-real-apps</div>
          <div>UI Kit: @bitcoin-os/ui-kit@1.3.0 (Detachable Dock)</div>
          <div className="pt-2 mt-2 border-t border-white/20">
            <div className="font-semibold mb-1">🔧 Live Features:</div>
            <div>• Real Bitcoin apps in dock</div>
            <div>• Apps open in new tabs (like live site)</div>
            <div>• Smooth window dragging</div>
            <div>• Detachable dock - drag to float!</div>
            <div>• Double-click dock to anchor back</div>
            <div>• Desktop icons & settings panel</div>
          </div>
        </div>
      </div>
    </div>
  );
}
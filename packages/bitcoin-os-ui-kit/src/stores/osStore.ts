import { create } from 'zustand';
import { OSState, OSWindow, BitcoinApp, DesktopIcon, OSNotification, ContextMenuItem } from '../types';

interface OSStore extends OSState {
  // Window Management
  openWindow: (appId: string, title?: string, content?: React.ReactNode, options?: { preventDuplicates?: boolean; openExternal?: boolean }) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, position: { x: number; y: number }) => void;
  resizeWindow: (windowId: string, size: { width: number; height: number }) => void;
  
  // Desktop Management
  addDesktopIcon: (icon: DesktopIcon) => void;
  removeDesktopIcon: (iconId: string) => void;
  moveDesktopIcon: (iconId: string, position: { x: number; y: number }) => void;
  selectDesktopIcon: (iconId: string, multiSelect?: boolean) => void;
  clearDesktopSelection: () => void;
  
  // Notification Management
  addNotification: (notification: Omit<OSNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  
  // Context Menu Management
  openContextMenu: (position: { x: number; y: number }, items: ContextMenuItem[]) => void;
  closeContextMenu: () => void;
  
  // Dock Management
  addToDock: (app: BitcoinApp) => void;
  removeFromDock: (appId: string) => void;
  toggleDockVisibility: () => void;
  setDockPosition: (position: 'bottom' | 'left' | 'right') => void;
  
  // Settings Management
  openSettings: (panel?: string) => void;
  closeSettings: () => void;
  setActiveSettingsPanel: (panel: string) => void;
  
  // Taskbar Management
  toggleTaskbarVisibility: () => void;
  toggleAppsMenu: () => void;
}

export const useOSStore = create<OSStore>((set, get) => ({
  // Initial State
  windows: [],
  activeWindowId: null,
  desktopIcons: [],
  notifications: [],
  contextMenu: null,
  dock: {
    apps: [],
    isVisible: true,
    position: 'bottom',
  },
  taskbar: {
    isVisible: true,
    showAppsMenu: false,
  },
  settings: {
    isOpen: false,
    activePanel: 'general',
  },

  // Window Management
  openWindow: (appId, title = 'New Window', content, options = {}) => {
    const { preventDuplicates = true, openExternal = false } = options;
    
    // Handle external app opening
    if (openExternal) {
      // Find the app URL and open in new tab
      const app = get().dock.apps.find(app => app.id === appId);
      if (app?.url && app.url !== '#') {
        window.open(app.url, '_blank');
        return;
      }
    }

    // Check for existing window if preventing duplicates
    if (preventDuplicates) {
      const existingWindow = get().windows.find(w => w.appId === appId);
      if (existingWindow) {
        if (existingWindow.isMinimized) {
          get().minimizeWindow(existingWindow.id); // This will un-minimize
        } else {
          get().focusWindow(existingWindow.id);
        }
        return;
      }
    }

    const newWindow: OSWindow = {
      id: `window-${appId}-${Date.now()}`,
      title,
      appId,
      isMinimized: false,
      isMaximized: false,
      isFocused: true,
      position: { x: 100 + get().windows.length * 30, y: 100 + get().windows.length * 30 },
      size: { width: 800, height: 600 },
      zIndex: Math.max(...get().windows.map(w => w.zIndex), 0) + 1,
      content,
    };

    set(state => ({
      windows: state.windows.map(w => ({ ...w, isFocused: false })).concat(newWindow),
      activeWindowId: newWindow.id,
    }));
  },

  closeWindow: (windowId) => {
    set(state => {
      const remainingWindows = state.windows.filter(w => w.id !== windowId);
      const newActiveWindow = remainingWindows.find(w => w.isFocused) || remainingWindows[remainingWindows.length - 1];
      
      return {
        windows: remainingWindows,
        activeWindowId: newActiveWindow?.id || null,
      };
    });
  },

  minimizeWindow: (windowId) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === windowId ? { ...w, isMinimized: !w.isMinimized, isFocused: false } : w
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (windowId) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (windowId) => {
    set(state => {
      const targetWindow = state.windows.find(w => w.id === windowId);
      if (!targetWindow) return state;

      const maxZ = Math.max(...state.windows.map(w => w.zIndex));
      
      return {
        windows: state.windows.map(w => ({
          ...w,
          isFocused: w.id === windowId,
          zIndex: w.id === windowId ? maxZ + 1 : w.zIndex,
          isMinimized: w.id === windowId ? false : w.isMinimized,
        })),
        activeWindowId: windowId,
      };
    });
  },

  moveWindow: (windowId, position) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === windowId ? { ...w, position } : w
      ),
    }));
  },

  resizeWindow: (windowId, size) => {
    set(state => ({
      windows: state.windows.map(w => 
        w.id === windowId ? { ...w, size } : w
      ),
    }));
  },

  // Desktop Management
  addDesktopIcon: (icon) => {
    set(state => ({
      desktopIcons: [...state.desktopIcons, icon],
    }));
  },

  removeDesktopIcon: (iconId) => {
    set(state => ({
      desktopIcons: state.desktopIcons.filter(icon => icon.id !== iconId),
    }));
  },

  moveDesktopIcon: (iconId, position) => {
    set(state => ({
      desktopIcons: state.desktopIcons.map(icon => 
        icon.id === iconId ? { ...icon, position } : icon
      ),
    }));
  },

  selectDesktopIcon: (iconId, multiSelect = false) => {
    set(state => ({
      desktopIcons: state.desktopIcons.map(icon => ({
        ...icon,
        isSelected: multiSelect 
          ? (icon.id === iconId ? !icon.isSelected : icon.isSelected)
          : icon.id === iconId,
      })),
    }));
  },

  clearDesktopSelection: () => {
    set(state => ({
      desktopIcons: state.desktopIcons.map(icon => ({ ...icon, isSelected: false })),
    }));
  },

  // Notification Management
  addNotification: (notification) => {
    const newNotification: OSNotification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: new Date(),
    };

    set(state => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, notification.duration);
    }
  },

  removeNotification: (notificationId) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== notificationId),
    }));
  },

  clearAllNotifications: () => {
    set({ notifications: [] });
  },

  // Context Menu Management
  openContextMenu: (position, items) => {
    set({
      contextMenu: { isOpen: true, position, items },
    });
  },

  closeContextMenu: () => {
    set({ contextMenu: null });
  },

  // Dock Management
  addToDock: (app) => {
    set(state => {
      const exists = state.dock.apps.some(a => a.id === app.id);
      if (exists) return state;
      
      return {
        dock: {
          ...state.dock,
          apps: [...state.dock.apps, app],
        },
      };
    });
  },

  removeFromDock: (appId) => {
    set(state => ({
      dock: {
        ...state.dock,
        apps: state.dock.apps.filter(app => app.id !== appId),
      },
    }));
  },

  toggleDockVisibility: () => {
    set(state => ({
      dock: {
        ...state.dock,
        isVisible: !state.dock.isVisible,
      },
    }));
  },

  setDockPosition: (position) => {
    set(state => ({
      dock: {
        ...state.dock,
        position,
      },
    }));
  },

  // Settings Management
  openSettings: (panel = 'general') => {
    set({
      settings: {
        isOpen: true,
        activePanel: panel,
      },
    });
  },

  closeSettings: () => {
    set(state => ({
      settings: {
        ...state.settings,
        isOpen: false,
      },
    }));
  },

  setActiveSettingsPanel: (panel) => {
    set(state => ({
      settings: {
        ...state.settings,
        activePanel: panel,
      },
    }));
  },

  // Taskbar Management
  toggleTaskbarVisibility: () => {
    set(state => ({
      taskbar: {
        ...state.taskbar,
        isVisible: !state.taskbar.isVisible,
      },
    }));
  },

  toggleAppsMenu: () => {
    set(state => ({
      taskbar: {
        ...state.taskbar,
        showAppsMenu: !state.taskbar.showAppsMenu,
      },
    }));
  },
}));
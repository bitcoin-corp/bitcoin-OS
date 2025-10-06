import { ReactNode } from 'react';

// Core Bitcoin OS Types
export interface BitcoinOSTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    bitcoin: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontFamily: string;
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    lineHeights: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

// User & Authentication Types
export interface BitcoinOSUser {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  walletAddress?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface BitcoinOSAuth {
  user: BitcoinOSUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  subscriptions: string[];
  permissions: AppPermissions;
  wallet?: BSVWallet;
}

export interface AppPermissions {
  [appId: string]: {
    read: boolean;
    write: boolean;
    admin: boolean;
  };
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  currency: 'USD' | 'BSV';
  features: string[];
  appAccess: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  tierId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export interface BSVWallet {
  address: string;
  balance: number;
  publicKey: string;
  sign: (message: string) => Promise<string>;
  sendTransaction: (to: string, amount: number) => Promise<string>;
}

// Settings & Preferences
export interface BitcoinOSSettings {
  theme: BitcoinOSTheme;
  preferences: UserPreferences;
  subscription: UserSubscription;
  notifications: NotificationSettings;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  dateFormat: string;
  currency: 'USD' | 'BSV';
  autoSave: boolean;
  darkMode: boolean;
  animations: boolean;
  wallpaper: string;
  dockPosition: 'bottom' | 'left' | 'right';
  dockSize: 'small' | 'medium' | 'large';
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  desktop: boolean;
  transactionAlerts: boolean;
  subscriptionAlerts: boolean;
}

// Component Base Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  theme?: Partial<BitcoinOSTheme>;
}

// Application Types
export interface BitcoinApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  version: string;
  isActive: boolean;
  requiresSubscription: boolean;
  permissions: string[];
  category: 'productivity' | 'entertainment' | 'development' | 'finance' | 'social';
  color?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  url: string;
  isExternal?: boolean;
  children?: NavigationItem[];
}

// Window Management Types
export interface OSWindow {
  id: string;
  title: string;
  appId: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  content?: ReactNode;
}

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

// Desktop Types
export interface DesktopIcon {
  id: string;
  appId: string;
  name: string;
  icon: string;
  position: { x: number; y: number };
  isSelected: boolean;
}

export interface DesktopSettings {
  wallpaper: string;
  iconSize: 'small' | 'medium' | 'large';
  gridSnap: boolean;
  showGrid: boolean;
}

// Notification Types
export interface OSNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  actions?: NotificationAction[];
  timestamp: Date;
}

export interface NotificationAction {
  label: string;
  action: () => void;
  primary?: boolean;
}

// Context Menu Types
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  action?: () => void;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
}

// Revenue & Blockchain Types
export interface RevenueShare {
  appId: string;
  userId: string;
  amount: number;
  currency: 'BSV';
  transactionId: string;
  timestamp: Date;
  type: 'platform_fee' | 'dividend';
}

export interface DocumentUTXO {
  id: string;
  title: string;
  content: string;
  hash: string;
  previousHash?: string;
  ordinalNumber: number;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  tokenAllocation: number;
  revenueShare: number;
}

// OS State Management Types
export interface OSState {
  windows: OSWindow[];
  activeWindowId: string | null;
  desktopIcons: DesktopIcon[];
  notifications: OSNotification[];
  contextMenu: {
    isOpen: boolean;
    position: { x: number; y: number };
    items: ContextMenuItem[];
  } | null;
  dock: {
    apps: BitcoinApp[];
    isVisible: boolean;
    position: 'bottom' | 'left' | 'right';
  };
  taskbar: {
    isVisible: boolean;
    showAppsMenu: boolean;
  };
  settings: {
    isOpen: boolean;
    activePanel: string;
  };
}
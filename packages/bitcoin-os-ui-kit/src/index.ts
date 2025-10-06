// Core Types
export * from './types';

// Utilities
export { cn } from './utils/cn';
export { 
  defaultTheme, 
  lightTheme, 
  darkTheme, 
  mergeTheme, 
  generateCSSVariables, 
  applyTheme 
} from './utils/theme';

// Store
export { useOSStore } from './stores/osStore';

// Core OS Components
export { Desktop } from './components/Desktop';
export { DesktopIcon } from './components/DesktopIcon';
export { Dock } from './components/Dock';
export { DockItem } from './components/DockItem';
export { Window } from './components/Window';
export { WindowManager } from './components/WindowManager';
export { ContextMenu } from './components/ContextMenu';
export { Settings } from './components/Settings';
export { SettingsSidebar } from './components/SettingsSidebar';
export { SettingsPanel } from './components/SettingsPanel';
export { ProofOfConceptBar } from './components/ProofOfConceptBar';

// Settings Components
export { SettingsSection } from './components/settings/SettingsSection';
export { SettingsItem } from './components/settings/SettingsItem';
export { GeneralSettings } from './components/settings/GeneralSettings';
export { AppearanceSettings } from './components/settings/AppearanceSettings';
export { DesktopSettings } from './components/settings/DesktopSettings';
export { AccountSettings } from './components/settings/AccountSettings';
export { SubscriptionSettings } from './components/settings/SubscriptionSettings';
export { AppSettings } from './components/settings/AppSettings';
export { WalletSettings } from './components/settings/WalletSettings';
export { NotificationSettings } from './components/settings/NotificationSettings';
export { PrivacySettings } from './components/settings/PrivacySettings';
export { DeveloperSettings } from './components/settings/DeveloperSettings';
export { AboutSettings } from './components/settings/AboutSettings';
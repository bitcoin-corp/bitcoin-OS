// Main exports
export { default as DockManager } from './components/DockManager';
export { default as Dock } from './components/Dock';
export { default as MinimalDock } from './components/MinimalDock';

// Icon system exports
export { getThemedIcon, getCurrentTheme } from './lib/icon-themes';
export type { IconMapping } from './lib/icon-themes';

// CSS imports (automatically included when components are used)
import './styles/Dock.css';
import './styles/MinimalDock.css';

// Type definitions
export interface DockManagerProps {
  currentApp?: string;
}

export interface DockApp {
  id?: string;
  name: string;
  icon: any;
  color: string;
  url?: string;
  disabled?: boolean;
  current?: boolean;
  isImage?: boolean;
}
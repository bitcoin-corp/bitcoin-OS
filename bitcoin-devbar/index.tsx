// Bitcoin DevBar - Developer sidebar components for Bitcoin OS ecosystem
export { default as DevSidebar } from './components/DevSidebar';
export { default as DevLayout } from './components/DevLayout';

// Types
export interface DevSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
  appName?: string;
  githubRepo?: string;
  tokenSymbol?: string;
  tokenStats?: {
    totalTokens: string;
    distributed: string;
    contributors: string;
    openTasks: string;
  };
  menuItems?: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }>;
}

export interface DevLayoutProps {
  children: React.ReactNode;
  showTaskbar?: boolean;
  TaskbarComponent?: React.ComponentType;
  appName?: string;
  githubRepo?: string;
  tokenSymbol?: string;
  tokenStats?: {
    totalTokens: string;
    distributed: string;
    contributors: string;
    openTasks: string;
  };
  menuItems?: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }>;
  isInOS?: boolean;
  setTitle?: (title: string) => void;
}
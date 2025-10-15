'use client';

import React, { useState, useEffect } from 'react';
import DevSidebar from './DevSidebar';

interface DevLayoutProps {
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

const DevLayout: React.FC<DevLayoutProps> = ({ 
  children,
  showTaskbar = true,
  TaskbarComponent,
  appName = 'Bitcoin App',
  githubRepo,
  tokenSymbol,
  tokenStats,
  menuItems,
  isInOS = false,
  setTitle
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Check if sidebar is collapsed from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setIsCollapsed(saved === 'true');
    }
    
    // Set app title when running in Bitcoin OS
    if (isInOS && setTitle) {
      setTitle(appName);
    }
  }, [isInOS, setTitle, appName]);

  const handleCollapsedChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <>
      {!isInOS && showTaskbar && TaskbarComponent && <TaskbarComponent />}
      {!isInOS && (
        <DevSidebar 
          onCollapsedChange={handleCollapsedChange}
          appName={appName}
          githubRepo={githubRepo}
          tokenSymbol={tokenSymbol}
          tokenStats={tokenStats}
          menuItems={menuItems}
        />
      )}
      <div className={`app-container ${isInOS ? '' : (isCollapsed ? 'with-dev-sidebar-collapsed' : 'with-dev-sidebar')}`}>
        {children}
      </div>
    </>
  );
};

export default DevLayout;
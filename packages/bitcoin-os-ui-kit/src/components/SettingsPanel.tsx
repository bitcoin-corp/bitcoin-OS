import React from 'react';
import { useOSStore } from '../stores/osStore';
import { GeneralSettings } from './settings/GeneralSettings';
import { AppearanceSettings } from './settings/AppearanceSettings';
import { DesktopSettings } from './settings/DesktopSettings';
import { AccountSettings } from './settings/AccountSettings';
import { SubscriptionSettings } from './settings/SubscriptionSettings';
import { AppSettings } from './settings/AppSettings';
import { WalletSettings } from './settings/WalletSettings';
import { NotificationSettings } from './settings/NotificationSettings';
import { PrivacySettings } from './settings/PrivacySettings';
import { DeveloperSettings } from './settings/DeveloperSettings';
import { AboutSettings } from './settings/AboutSettings';

export const SettingsPanel: React.FC = () => {
  const { settings } = useOSStore();

  const renderPanel = () => {
    switch (settings.activePanel) {
      case 'general':
        return <GeneralSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'desktop':
        return <DesktopSettings />;
      case 'account':
        return <AccountSettings />;
      case 'subscription':
        return <SubscriptionSettings />;
      case 'apps':
        return <AppSettings />;
      case 'wallet':
        return <WalletSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'developer':
        return <DeveloperSettings />;
      case 'about':
        return <AboutSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8">
        {renderPanel()}
      </div>
    </div>
  );
};
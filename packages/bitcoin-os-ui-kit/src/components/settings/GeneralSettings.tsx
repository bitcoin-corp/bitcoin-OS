import React from 'react';
import { cn } from '../../utils/cn';
import { SettingsSection } from './SettingsSection';
import { SettingsItem } from './SettingsItem';

export const GeneralSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">General</h2>
        <p className="text-gray-600">Configure basic system preferences and behavior.</p>
      </div>

      <SettingsSection title="System Preferences" description="Core system settings">
        <SettingsItem
          label="Language"
          description="Set your preferred language"
          type="select"
          value="English (US)"
          options={[
            { label: 'English (US)', value: 'en-US' },
            { label: 'English (UK)', value: 'en-GB' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
            { label: 'German', value: 'de' },
            { label: 'Japanese', value: 'ja' },
            { label: 'Chinese (Simplified)', value: 'zh-CN' },
          ]}
        />

        <SettingsItem
          label="Time Zone"
          description="Your current time zone"
          type="select"
          value="America/New_York"
          options={[
            { label: 'Eastern Time (ET)', value: 'America/New_York' },
            { label: 'Central Time (CT)', value: 'America/Chicago' },
            { label: 'Mountain Time (MT)', value: 'America/Denver' },
            { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
            { label: 'UTC', value: 'UTC' },
            { label: 'London (GMT)', value: 'Europe/London' },
            { label: 'Tokyo (JST)', value: 'Asia/Tokyo' },
          ]}
        />

        <SettingsItem
          label="Date Format"
          description="How dates are displayed"
          type="select"
          value="MM/DD/YYYY"
          options={[
            { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
            { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
            { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
            { label: 'DD MMM YYYY', value: 'DD MMM YYYY' },
          ]}
        />

        <SettingsItem
          label="Currency"
          description="Primary currency for transactions"
          type="select"
          value="USD"
          options={[
            { label: 'US Dollar (USD)', value: 'USD' },
            { label: 'Bitcoin SV (BSV)', value: 'BSV' },
            { label: 'Euro (EUR)', value: 'EUR' },
            { label: 'British Pound (GBP)', value: 'GBP' },
            { label: 'Japanese Yen (JPY)', value: 'JPY' },
          ]}
        />
      </SettingsSection>

      <SettingsSection title="Performance & Behavior" description="System performance settings">
        <SettingsItem
          label="Auto-save"
          description="Automatically save changes"
          type="toggle"
          value={true}
        />

        <SettingsItem
          label="Animations"
          description="Enable smooth animations and transitions"
          type="toggle"
          value={true}
        />

        <SettingsItem
          label="Sound Effects"
          description="Play system sounds for actions"
          type="toggle"
          value={false}
        />

        <SettingsItem
          label="Startup Behavior"
          description="What to do when Bitcoin OS starts"
          type="select"
          value="restore"
          options={[
            { label: 'Restore previous session', value: 'restore' },
            { label: 'Start fresh', value: 'fresh' },
            { label: 'Show startup screen', value: 'startup' },
          ]}
        />
      </SettingsSection>

      <SettingsSection title="Advanced" description="Advanced system configuration">
        <SettingsItem
          label="Debug Mode"
          description="Enable debug information and logging"
          type="toggle"
          value={false}
        />

        <SettingsItem
          label="Performance Monitor"
          description="Show system performance overlay"
          type="toggle"
          value={false}
        />

        <SettingsItem
          label="Cache Size"
          description="Maximum cache size for better performance"
          type="select"
          value="100MB"
          options={[
            { label: '50 MB', value: '50MB' },
            { label: '100 MB', value: '100MB' },
            { label: '250 MB', value: '250MB' },
            { label: '500 MB', value: '500MB' },
            { label: '1 GB', value: '1GB' },
          ]}
        />
      </SettingsSection>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
};
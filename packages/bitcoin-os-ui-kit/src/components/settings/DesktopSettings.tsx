import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsItem } from './SettingsItem';

export const DesktopSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Desktop & Dock</h2>
        <p className="text-gray-600">Configure desktop icons and dock behavior.</p>
      </div>

      <SettingsSection title="Dock Settings" description="Customize the dock appearance and behavior">
        <SettingsItem
          label="Dock Position"
          description="Where to display the dock"
          type="select"
          value="bottom"
          options={[
            { label: 'Bottom', value: 'bottom' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ]}
        />

        <SettingsItem
          label="Dock Size"
          description="Size of dock icons"
          type="select"
          value="medium"
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ]}
        />

        <SettingsItem
          label="Auto-hide Dock"
          description="Hide dock when not in use"
          type="toggle"
          value={false}
        />

        <SettingsItem
          label="Magnification"
          description="Magnify icons on hover"
          type="toggle"
          value={true}
        />
      </SettingsSection>

      <SettingsSection title="Desktop Icons" description="Desktop icon settings">
        <SettingsItem
          label="Icon Size"
          description="Size of desktop icons"
          type="select"
          value="medium"
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ]}
        />

        <SettingsItem
          label="Grid Snap"
          description="Snap icons to grid"
          type="toggle"
          value={true}
        />

        <SettingsItem
          label="Show Grid"
          description="Display alignment grid"
          type="toggle"
          value={false}
        />
      </SettingsSection>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Apply Changes
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Reset Layout
          </button>
        </div>
      </div>
    </div>
  );
};
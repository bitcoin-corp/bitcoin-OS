import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsItem } from './SettingsItem';

export const AppearanceSettings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appearance</h2>
        <p className="text-gray-600">Customize the look and feel of Bitcoin OS.</p>
      </div>

      <SettingsSection title="Theme" description="Choose your preferred theme">
        <SettingsItem
          label="Color Scheme"
          description="Light or dark theme"
          type="select"
          value="light"
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Auto (system)', value: 'auto' },
          ]}
        />

        <SettingsItem
          label="Accent Color"
          description="Primary accent color for UI elements"
          type="color"
          value="#f7931a"
        />

        <SettingsItem
          label="Bitcoin Orange"
          description="Use Bitcoin orange as primary color"
          type="toggle"
          value={true}
        />
      </SettingsSection>

      <SettingsSection title="Wallpaper" description="Desktop background settings">
        <SettingsItem
          label="Wallpaper Type"
          description="Choose wallpaper style"
          type="select"
          value="gradient"
          options={[
            { label: 'Gradient', value: 'gradient' },
            { label: 'Image', value: 'image' },
            { label: 'Solid Color', value: 'solid' },
            { label: 'Bitcoin Pattern', value: 'bitcoin' },
          ]}
        />

        <SettingsItem
          label="Background Color"
          description="Solid background color or gradient base"
          type="color"
          value="#667eea"
        />

        <SettingsItem
          label="Dynamic Wallpapers"
          description="Change wallpaper based on time of day"
          type="toggle"
          value={false}
        />
      </SettingsSection>

      <SettingsSection title="Visual Effects" description="Animation and visual settings">
        <SettingsItem
          label="Transparency Effects"
          description="Enable glass and blur effects"
          type="toggle"
          value={true}
        />

        <SettingsItem
          label="Animation Speed"
          description="Speed of UI animations"
          type="slider"
          value={300}
          min={100}
          max={1000}
          step={50}
        />

        <SettingsItem
          label="Reduce Motion"
          description="Minimize animations for accessibility"
          type="toggle"
          value={false}
        />

        <SettingsItem
          label="High Contrast"
          description="Increase contrast for better visibility"
          type="toggle"
          value={false}
        />
      </SettingsSection>

      <SettingsSection title="Typography" description="Font and text settings">
        <SettingsItem
          label="Font Size"
          description="Base font size for the interface"
          type="select"
          value="medium"
          options={[
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
            { label: 'Extra Large', value: 'xl' },
          ]}
        />

        <SettingsItem
          label="Font Weight"
          description="Default font weight"
          type="select"
          value="normal"
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Normal', value: 'normal' },
            { label: 'Medium', value: 'medium' },
            { label: 'Bold', value: 'bold' },
          ]}
        />
      </SettingsSection>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Apply Theme
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Preview Changes
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { cn } from '../../utils/cn';

interface SettingsItemProps {
  label: string;
  description?: string;
  type: 'toggle' | 'select' | 'input' | 'color' | 'slider';
  value?: any;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  label,
  description,
  type,
  value,
  options = [],
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
}) => {
  const renderControl = () => {
    switch (type) {
      case 'toggle':
        return (
          <button
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              value ? 'bg-blue-600' : 'bg-gray-200',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            disabled={disabled}
            onClick={() => onChange?.(!value)}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                value ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className={cn(
              'block w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'input':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className={cn(
              'block w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
              'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
        );

      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={disabled}
              className={cn(
                'h-8 w-16 rounded border border-gray-300 cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <span className="text-sm text-gray-600">{value}</span>
          </div>
        );

      case 'slider':
        return (
          <div className="flex items-center space-x-3 w-48">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange?.(Number(e.target.value))}
              disabled={disabled}
              className={cn(
                'flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
                'slider:bg-blue-600 slider:h-4 slider:w-4 slider:rounded-full',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <span className="text-sm text-gray-600 w-12 text-right">{value}</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-sm text-gray-600 mt-1">{description}</div>
        )}
      </div>
      <div className="ml-4">
        {renderControl()}
      </div>
    </div>
  );
};
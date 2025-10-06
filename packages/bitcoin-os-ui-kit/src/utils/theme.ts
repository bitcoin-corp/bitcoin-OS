import { BitcoinOSTheme } from '../types';

export const defaultTheme: BitcoinOSTheme = {
  colors: {
    primary: '#f7931a',
    secondary: '#1a1a1a',
    accent: '#4a9eff',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2d3748',
    textSecondary: '#718096',
    border: '#e2e8f0',
    bitcoin: '#f7931a',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
};

export const lightTheme: BitcoinOSTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2d3748',
    textSecondary: '#718096',
    border: '#e2e8f0',
  },
};

export const darkTheme: BitcoinOSTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#1a202c',
    surface: '#2d3748',
    text: '#f7fafc',
    textSecondary: '#a0aec0',
    border: '#4a5568',
  },
};

export const mergeTheme = (baseTheme: BitcoinOSTheme, overrides: Partial<BitcoinOSTheme>): BitcoinOSTheme => {
  return {
    ...baseTheme,
    ...overrides,
    colors: { ...baseTheme.colors, ...overrides.colors },
    typography: { ...baseTheme.typography, ...overrides.typography },
    spacing: { ...baseTheme.spacing, ...overrides.spacing },
    borderRadius: { ...baseTheme.borderRadius, ...overrides.borderRadius },
    shadows: { ...baseTheme.shadows, ...overrides.shadows },
    animations: { ...baseTheme.animations, ...overrides.animations },
  };
};

export const generateCSSVariables = (theme: BitcoinOSTheme): string => {
  return `
    :root {
      --bos-color-primary: ${theme.colors.primary};
      --bos-color-secondary: ${theme.colors.secondary};
      --bos-color-accent: ${theme.colors.accent};
      --bos-color-background: ${theme.colors.background};
      --bos-color-surface: ${theme.colors.surface};
      --bos-color-text: ${theme.colors.text};
      --bos-color-text-secondary: ${theme.colors.textSecondary};
      --bos-color-border: ${theme.colors.border};
      --bos-color-bitcoin: ${theme.colors.bitcoin};
      --bos-color-success: ${theme.colors.success};
      --bos-color-warning: ${theme.colors.warning};
      --bos-color-error: ${theme.colors.error};
      
      --bos-font-family: ${theme.typography.fontFamily};
      
      --bos-shadow-sm: ${theme.shadows.sm};
      --bos-shadow-md: ${theme.shadows.md};
      --bos-shadow-lg: ${theme.shadows.lg};
      --bos-shadow-xl: ${theme.shadows.xl};
    }
  `;
};

export const applyTheme = (theme: BitcoinOSTheme): void => {
  const style = document.createElement('style');
  style.innerHTML = generateCSSVariables(theme);
  document.head.appendChild(style);
};
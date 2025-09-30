// Bitcoin OS Bridge - Core Components for Cross-App Integration
// Main Provider Component (Recommended)
export { default as BitcoinOSProvider } from './components/BitcoinOSProvider';
// Layout Components (New in v2.0)
export { default as LayoutClient } from './components/LayoutClient';
export { default as AppWrapper } from './components/AppWrapper';
export { default as Footer } from './components/Footer';
// Navigation & UI Components  
export { default as PocBar } from './components/PocBar';
export { default as ProofOfConceptBar } from './components/ProofOfConceptBar';
export { default as Taskbar } from './components/Taskbar';
export { default as TopMenuBar } from './components/TopMenuBar';
export { default as DevSidebar } from './components/DevSidebar';
export { default as Dock } from './components/Dock';
// Utilities and Hooks
export * from './types';
export * from './hooks';
export * from './utils';
// CSS imports (for proper styling)
import './components/ProofOfConceptBar.css';
import './components/TopMenuBar.css';
import './components/DevSidebar.css';
import './components/Dock.css';

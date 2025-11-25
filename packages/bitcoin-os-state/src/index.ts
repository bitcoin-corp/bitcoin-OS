// Context exports
export { 
  BitcoinOSProvider, 
  useBitcoinOS,
  type BitcoinOSState,
  type BitcoinOSContextType,
  type DockStyle 
} from './context/BitcoinOSContext';

// Hook exports
export { useDockState } from './hooks/useDockState';

// Utility exports
export { BitcoinOSStateManager, default as StateManager } from './utils/StateManager';

// Type exports
export type { DockStyle as DockStyleType } from './hooks/useDockState';
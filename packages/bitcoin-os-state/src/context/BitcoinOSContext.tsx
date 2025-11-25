import React, { createContext, useContext, useReducer, useEffect } from 'react';

export type DockStyle = 'minimal' | 'large';

export interface BitcoinOSState {
  dockStyle: DockStyle;
  iconTheme: string;
  darkMode: boolean;
  currentApp: string;
  isAuthenticated: boolean;
}

export interface BitcoinOSContextType {
  state: BitcoinOSState;
  updateDockStyle: (style: DockStyle) => void;
  updateIconTheme: (theme: string) => void;
  updateDarkMode: (enabled: boolean) => void;
  setCurrentApp: (appId: string) => void;
  setAuthenticated: (isAuth: boolean) => void;
}

const BitcoinOSContext = createContext<BitcoinOSContextType | null>(null);

const initialState: BitcoinOSState = {
  dockStyle: 'minimal',
  iconTheme: 'lucide',
  darkMode: true,
  currentApp: 'bitcoin-os',
  isAuthenticated: false
};

type Action = 
  | { type: 'UPDATE_DOCK_STYLE'; payload: DockStyle }
  | { type: 'UPDATE_ICON_THEME'; payload: string }
  | { type: 'UPDATE_DARK_MODE'; payload: boolean }
  | { type: 'SET_CURRENT_APP'; payload: string }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOAD_INITIAL_STATE'; payload: Partial<BitcoinOSState> };

function reducer(state: BitcoinOSState, action: Action): BitcoinOSState {
  switch (action.type) {
    case 'UPDATE_DOCK_STYLE':
      return { ...state, dockStyle: action.payload };
    case 'UPDATE_ICON_THEME':
      return { ...state, iconTheme: action.payload };
    case 'UPDATE_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_CURRENT_APP':
      return { ...state, currentApp: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'LOAD_INITIAL_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const BitcoinOSProvider: React.FC<{ children: React.ReactNode; currentApp?: string }> = ({ 
  children, 
  currentApp = 'bitcoin-os' 
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, currentApp });

  // Load initial state from storage
  useEffect(() => {
    const dockStyle = localStorage.getItem('bitcoinOS-dock-style') as DockStyle;
    const iconTheme = localStorage.getItem('bitcoinOS-icon-theme') || 'lucide';
    const darkMode = localStorage.getItem('bitcoinOS-dark-mode') !== 'false';
    const isAuthenticated = sessionStorage.getItem('bitcoinOS-auth') === 'true';
    
    dispatch({ 
      type: 'LOAD_INITIAL_STATE', 
      payload: {
        dockStyle: dockStyle || 'minimal',
        iconTheme,
        darkMode,
        isAuthenticated
      }
    });
  }, []);

  // Listen for external state changes
  useEffect(() => {
    const handleStateChange = (event: CustomEvent) => {
      const { type, value } = event.detail;
      switch (type) {
        case 'dockStyle':
          dispatch({ type: 'UPDATE_DOCK_STYLE', payload: value });
          break;
        case 'iconTheme':
          dispatch({ type: 'UPDATE_ICON_THEME', payload: value });
          break;
        case 'darkMode':
          dispatch({ type: 'UPDATE_DARK_MODE', payload: value });
          break;
        case 'auth':
          dispatch({ type: 'SET_AUTHENTICATED', payload: value });
          break;
      }
    };

    const handleDockStyleChange = (event: CustomEvent) => {
      dispatch({ type: 'UPDATE_DOCK_STYLE', payload: event.detail });
    };

    const handleIconThemeChange = (event: CustomEvent) => {
      dispatch({ type: 'UPDATE_ICON_THEME', payload: event.detail });
    };

    const handleDarkModeChange = (event: CustomEvent) => {
      dispatch({ type: 'UPDATE_DARK_MODE', payload: event.detail });
    };

    const handleAuthChange = (event: CustomEvent) => {
      dispatch({ type: 'SET_AUTHENTICATED', payload: event.detail });
    };

    window.addEventListener('stateChanged', handleStateChange as EventListener);
    window.addEventListener('dockStyleChanged', handleDockStyleChange as EventListener);
    window.addEventListener('iconThemeChanged', handleIconThemeChange as EventListener);
    window.addEventListener('darkModeChanged', handleDarkModeChange as EventListener);
    window.addEventListener('authStateChanged', handleAuthChange as EventListener);
    
    return () => {
      window.removeEventListener('stateChanged', handleStateChange as EventListener);
      window.removeEventListener('dockStyleChanged', handleDockStyleChange as EventListener);
      window.removeEventListener('iconThemeChanged', handleIconThemeChange as EventListener);
      window.removeEventListener('darkModeChanged', handleDarkModeChange as EventListener);
      window.removeEventListener('authStateChanged', handleAuthChange as EventListener);
    };
  }, []);

  const updateDockStyle = (style: DockStyle) => {
    localStorage.setItem('bitcoinOS-dock-style', style);
    dispatch({ type: 'UPDATE_DOCK_STYLE', payload: style });
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: style }));
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'dockStyle', value: style, timestamp: Date.now() }
    }));
  };

  const updateIconTheme = (theme: string) => {
    localStorage.setItem('bitcoinOS-icon-theme', theme);
    dispatch({ type: 'UPDATE_ICON_THEME', payload: theme });
    window.dispatchEvent(new CustomEvent('iconThemeChanged', { detail: theme }));
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'iconTheme', value: theme, timestamp: Date.now() }
    }));
  };

  const updateDarkMode = (enabled: boolean) => {
    localStorage.setItem('bitcoinOS-dark-mode', enabled.toString());
    dispatch({ type: 'UPDATE_DARK_MODE', payload: enabled });
    window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: enabled }));
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'darkMode', value: enabled, timestamp: Date.now() }
    }));
  };

  const setCurrentApp = (appId: string) => {
    dispatch({ type: 'SET_CURRENT_APP', payload: appId });
  };

  const setAuthenticated = (isAuth: boolean) => {
    sessionStorage.setItem('bitcoinOS-auth', isAuth.toString());
    dispatch({ type: 'SET_AUTHENTICATED', payload: isAuth });
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: isAuth }));
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'auth', value: isAuth, timestamp: Date.now() }
    }));
  };

  return (
    <BitcoinOSContext.Provider value={{
      state,
      updateDockStyle,
      updateIconTheme,
      updateDarkMode,
      setCurrentApp,
      setAuthenticated
    }}>
      {children}
    </BitcoinOSContext.Provider>
  );
};

export const useBitcoinOS = () => {
  const context = useContext(BitcoinOSContext);
  if (!context) {
    throw new Error('useBitcoinOS must be used within a BitcoinOSProvider');
  }
  return context;
};
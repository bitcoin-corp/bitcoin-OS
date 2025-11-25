import { useState, useEffect } from 'react';

export type DockStyle = 'minimal' | 'large';

export const useDockState = () => {
  const [dockStyle, setDockStyle] = useState<DockStyle>('minimal');

  useEffect(() => {
    // Load initial state from localStorage
    const saved = localStorage.getItem('bitcoinOS-dock-style') as DockStyle;
    if (saved && (saved === 'minimal' || saved === 'large')) {
      setDockStyle(saved);
    }

    // Listen for external state changes
    const handleChange = (event: CustomEvent) => {
      if (event.detail.type === 'dockStyle') {
        setDockStyle(event.detail.value);
      }
    };

    const handleDockStyleChange = (event: CustomEvent) => {
      setDockStyle(event.detail);
    };

    window.addEventListener('stateChanged', handleChange as EventListener);
    window.addEventListener('dockStyleChanged', handleDockStyleChange as EventListener);
    
    return () => {
      window.removeEventListener('stateChanged', handleChange as EventListener);
      window.removeEventListener('dockStyleChanged', handleDockStyleChange as EventListener);
    };
  }, []);

  const updateDockStyle = (newStyle: DockStyle) => {
    localStorage.setItem('bitcoinOS-dock-style', newStyle);
    setDockStyle(newStyle);
    
    // Dispatch both events for backward compatibility
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: newStyle }));
    window.dispatchEvent(new CustomEvent('stateChanged', {
      detail: { type: 'dockStyle', value: newStyle, timestamp: Date.now() }
    }));
  };

  return { dockStyle, updateDockStyle };
};
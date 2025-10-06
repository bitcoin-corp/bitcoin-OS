import React from 'react';
import { useOSStore } from '../stores/osStore';
import { Window } from './Window';

interface WindowManagerProps {
  children?: React.ReactNode;
}

export const WindowManager: React.FC<WindowManagerProps> = ({ children }) => {
  const { windows } = useOSStore();

  return (
    <>
      {/* Render all windows */}
      {windows.map((window) => (
        <Window key={window.id} window={window}>
          {children}
        </Window>
      ))}
    </>
  );
};
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Send app menu clicks to main process
  openApp: (appName) => ipcRenderer.send('open-app', appName),
  
  // Receive menu commands from main process
  onMenuAction: (callback) => ipcRenderer.on('menu-action', callback),
  
  // Platform detection
  platform: process.platform,
  
  // Window controls
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
  
  // Check if running in Electron
  isElectron: true
});

// Inject CSS and add draggable title bar
window.addEventListener('DOMContentLoaded', () => {
  // Add a custom draggable title bar at the top
  const titleBar = document.createElement('div');
  titleBar.id = 'electron-title-bar';
  titleBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    background: transparent;
    -webkit-app-region: drag;
    z-index: 99999;
    pointer-events: all;
  `;
  document.body.appendChild(titleBar);
  
  // Add CSS for draggable regions
  const style = document.createElement('style');
  style.textContent = `
    /* Add padding to account for title bar */
    body {
      padding-top: 32px !important;
    }
    
    /* Make the custom title bar draggable */
    #electron-title-bar {
      -webkit-app-region: drag;
      -webkit-user-select: none;
      user-select: none;
    }
    
    /* Alternative: Make specific header areas draggable */
    .bitcoin-os-header,
    .app-header,
    header:first-of-type,
    nav:first-of-type,
    [class*="navbar"],
    [class*="topbar"] {
      -webkit-app-region: drag;
      -webkit-user-select: none;
      user-select: none;
    }
    
    /* Make buttons and interactive elements non-draggable */
    button,
    a,
    input,
    select,
    textarea,
    [role="button"],
    [onclick],
    .app-icon,
    .dock-item,
    [class*="button"],
    [class*="btn"] {
      -webkit-app-region: no-drag !important;
    }
    
    /* Ensure dock remains visible and functional */
    .dock-container,
    [class*="dock"] {
      -webkit-app-region: no-drag;
    }
    
    /* Traffic lights area should not be draggable */
    #electron-title-bar:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 32px;
      -webkit-app-region: no-drag;
    }
  `;
  document.head.appendChild(style);
});
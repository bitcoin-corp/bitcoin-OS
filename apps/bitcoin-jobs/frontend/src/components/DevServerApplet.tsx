import React, { useState, useEffect } from 'react';
import './DevServerApplet.css';

interface DevServerAppletProps {
  className?: string;
}

const DevServerApplet: React.FC<DevServerAppletProps> = ({ className }) => {
  const [serverStatus, setServerStatus] = useState<'running' | 'stopped' | 'restarting'>('stopped');
  const [port] = useState(2020);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`http://localhost:${port}`, { 
        method: 'HEAD',
        mode: 'no-cors' 
      });
      setServerStatus('running');
    } catch (error) {
      setServerStatus('stopped');
    }
  };

  const killPort = async () => {
    setServerStatus('restarting');
    
    // Kill process on port 1020
    try {
      const response = await fetch('/api/dev-server/kill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port })
      });
      
      if (!response.ok) {
        console.error('Failed to kill server');
      }
    } catch (error) {
      console.error('Error killing server:', error);
    }
    
    // Wait a moment for the process to die
    setTimeout(() => {
      restartServer();
    }, 2000);
  };

  const restartServer = async () => {
    try {
      const response = await fetch('/api/dev-server/restart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          port,
          projectPath: '/Users/b0ase/bitcoin-spreadsheets/frontend'
        })
      });
      
      if (response.ok) {
        setTimeout(() => {
          setServerStatus('running');
          checkServerStatus();
        }, 3000);
      }
    } catch (error) {
      console.error('Error restarting server:', error);
      setServerStatus('stopped');
    }
  };

  const handleQuickRestart = () => {
    killPort();
    setShowMenu(false);
  };

  const handleOpenInBrowser = () => {
    window.open(`http://localhost:${port}`, '_blank');
    setShowMenu(false);
  };

  const getStatusIcon = () => {
    switch (serverStatus) {
      case 'running':
        return '🟢';
      case 'stopped':
        return '🔴';
      case 'restarting':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'running':
        return `Running on :${port}`;
      case 'stopped':
        return 'Server Stopped';
      case 'restarting':
        return 'Restarting...';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`dev-server-applet ${className || ''}`}>
      <button 
        className="applet-button"
        onClick={() => setShowMenu(!showMenu)}
        title="Bitcoin Spreadsheet Dev Server"
      >
        <div className="applet-icon">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
            className="bitcoin-spreadsheet-logo"
          >
            {/* Spreadsheet background */}
            <rect x="10" y="10" width="80" height="80" rx="8" fill="#1a1a2e" stroke="#4285F4" strokeWidth="2"/>
            
            {/* Grid lines */}
            <line x1="10" y1="35" x2="90" y2="35" stroke="#4285F4" strokeWidth="1" opacity="0.3"/>
            <line x1="10" y1="60" x2="90" y2="60" stroke="#4285F4" strokeWidth="1" opacity="0.3"/>
            <line x1="35" y1="10" x2="35" y2="90" stroke="#4285F4" strokeWidth="1" opacity="0.3"/>
            <line x1="60" y1="10" x2="60" y2="90" stroke="#4285F4" strokeWidth="1" opacity="0.3"/>
            
            {/* Bitcoin symbol */}
            <circle cx="50" cy="50" r="25" fill="#F7931A" opacity="0.9"/>
            <text 
              x="50" 
              y="62" 
              fontFamily="Arial, sans-serif" 
              fontSize="28" 
              fontWeight="bold" 
              fill="white" 
              textAnchor="middle"
            >
              ₿
            </text>
          </svg>
          <span className="status-indicator">{getStatusIcon()}</span>
        </div>
        <span className="applet-text">Dev Server</span>
      </button>

      {showMenu && (
        <>
          <div className="applet-menu-backdrop" onClick={() => setShowMenu(false)} />
          <div className="applet-menu">
            <div className="menu-header">
              <h3>Bitcoin Spreadsheet</h3>
              <span className={`status-badge ${serverStatus}`}>{getStatusText()}</span>
            </div>
            
            <div className="menu-actions">
              <button 
                onClick={handleQuickRestart}
                disabled={serverStatus === 'restarting'}
                className="menu-action-btn restart"
              >
                <span className="action-icon">🔄</span>
                <span>Restart Server</span>
              </button>
              
              <button 
                onClick={handleOpenInBrowser}
                disabled={serverStatus !== 'running'}
                className="menu-action-btn open"
              >
                <span className="action-icon">🌐</span>
                <span>Open in Browser</span>
              </button>
              
              <button 
                onClick={() => serverStatus === 'running' ? killPort() : restartServer()}
                disabled={serverStatus === 'restarting'}
                className={`menu-action-btn ${serverStatus === 'running' ? 'stop' : 'start'}`}
              >
                <span className="action-icon">{serverStatus === 'running' ? '⏹' : '▶️'}</span>
                <span>{serverStatus === 'running' ? 'Stop Server' : 'Start Server'}</span>
              </button>
            </div>
            
            <div className="menu-info">
              <div className="info-item">
                <span className="info-label">Port:</span>
                <span className="info-value">{port}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Project:</span>
                <span className="info-value">bitcoin-spreadsheets</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DevServerApplet;
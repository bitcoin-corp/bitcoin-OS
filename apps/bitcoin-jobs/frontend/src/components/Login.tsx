import React, { useState } from 'react';
import { HandCashService } from '../services/HandCashService';
import './Login.css';

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHandCashLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const handcashService = new HandCashService();
      await handcashService.login();
      
      // In demo mode, login is instant
      if (handcashService.isAuthenticated()) {
        const user = handcashService.getCurrentUser();
        onLogin(user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect to HandCash');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bitcoin Spreadsheet</h1>
          <p>Secure, encrypted spreadsheets on the blockchain</p>
        </div>
        
        <div className="login-content">
          <div className="features">
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span>End-to-end encryption</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⛓️</span>
              <span>Immutable on Bitcoin</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👤</span>
              <span>Your data, your keys</span>
            </div>
          </div>

          <button 
            className="handcash-login-btn"
            onClick={handleHandCashLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-spinner"></span>
                Connecting...
              </>
            ) : (
              <>
                <img 
                  src="https://handcash.io/favicon.ico" 
                  alt="HandCash" 
                  className="handcash-logo"
                />
                Sign in with HandCash
              </>
            )}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
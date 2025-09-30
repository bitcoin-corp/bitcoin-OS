import React, { useState } from 'react';
import { HandCashService } from '../services/HandCashService';

interface NavbarLoginProps {
  onLogin: (user: any) => void;
}

const NavbarLogin: React.FC<NavbarLoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleHandCashLogin = async () => {
    setIsLoading(true);
    
    try {
      const handcashService = new HandCashService();
      await handcashService.login();
      
      if (handcashService.isAuthenticated()) {
        const user = handcashService.getCurrentUser();
        onLogin(user);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar-login">
      <button 
        className="navbar-handcash-btn"
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
              className="handcash-logo-small"
            />
            Sign in with HandCash
          </>
        )}
      </button>
    </div>
  );
};

export default NavbarLogin;
import React, { useState, useEffect } from 'react';
import './App.css';
import { SimpleAuth } from './services/SimpleAuth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (SimpleAuth.isLoggedIn()) {
      const userData = await SimpleAuth.getUser();
      setUser(userData);
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const handleLogin = () => {
    window.location.href = SimpleAuth.getAuthUrl();
  };

  const handleLogout = () => {
    SimpleAuth.logout();
    // Page will reload automatically
  };

  // Handle callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    
    const authToken = urlParams.get('authToken') || 
                     hashParams.get('authToken') || 
                     urlParams.get('token');
    
    if (authToken) {
      SimpleAuth.login(authToken);
      window.location.href = '/'; // Clean URL
    }
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bitcoin Spreadsheet</h1>
          <button onClick={handleLogin} className="login-btn">
            Sign in with HandCash
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="connection-indicator" />
        <h1>Bitcoin Spreadsheet</h1>
        <div className="user-info">
          <span className="user-handle">@{user?.handle || 'unknown'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>
      <main>
        <div style={{ padding: '20px', color: 'white' }}>
          <h2>Welcome {user?.handle}!</h2>
          <p>Paymail: {user?.paymail}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
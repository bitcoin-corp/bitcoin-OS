'use client';

import { useState } from 'react';

export default function SecureDocs() {
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('proposal');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/secure-docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, document }),
      });

      const data = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(data);
          setError(errorData.error || 'Authentication failed');
          if (errorData.attemptsRemaining !== undefined) {
            setAttemptsRemaining(errorData.attemptsRemaining);
          }
          if (errorData.rateLimited) {
            // Clear password on rate limit
            setPassword('');
          }
        } catch {
          setError('Authentication failed');
        }
      } else {
        setContent(data);
        setAuthenticated(true);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (authenticated) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
        <div style={{ 
          background: '#000', 
          color: '#fff', 
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}>
          <span>Secure Document Viewer - The Bitcoin Corporation</span>
          <button
            onClick={() => {
              setAuthenticated(false);
              setContent('');
              setPassword('');
            }}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '5px 15px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Lock Document
          </button>
        </div>
        <div style={{ 
          marginTop: '50px', 
          padding: '20px',
          background: 'white'
        }}>
          <style dangerouslySetInnerHTML={{ __html: `
            .parties-section {
              background: #f9f9f9 !important;
              color: #000 !important;
            }
            .parties-section * {
              color: #000 !important;
            }
            body {
              background: white !important;
            }
          `}} />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '10px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000'
        }}>
          Secure Document Access
        </h1>
        <p style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#666',
          fontSize: '14px'
        }}>
          The Bitcoin Corporation Limited
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#000'
            }}>
              Select Document
            </label>
            <select
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '5px',
                fontSize: '14px',
                background: 'white'
              }}
            >
              <option value="proposal">CTO Co-Founder Contract</option>
              <option value="scope">Bitcoin OS Technical Scope</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#000'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e0e0e0',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: '#fee',
              color: '#c00',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
              {attemptsRemaining !== null && attemptsRemaining > 0 && (
                <div style={{ marginTop: '5px', fontSize: '12px' }}>
                  Attempts remaining: {attemptsRemaining}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#ccc' : '#000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
          >
            {loading ? 'Authenticating...' : 'Access Document'}
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0',
          fontSize: '12px',
          color: '#999',
          textAlign: 'center'
        }}>
          <p>🔒 Server-side authentication with rate limiting</p>
          <p>Maximum 5 attempts per 15 minutes</p>
        </div>
      </div>
    </div>
  );
}
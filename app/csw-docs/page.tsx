'use client';

import { useState, useEffect } from 'react';

export default function CSWDocs() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [document, setDocument] = useState('proposal');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const documents = {
    proposal: {
      title: 'CTO Co-Founder Contract',
      file: 'csw-cofounder-cto-contract.html'
    },
    scope: {
      title: 'Bitcoin OS Technical Scope',
      file: 'bitcoin-os-cto-scope-document.html'
    },
    memo: {
      title: 'Memorandum to Dr. Wright - My Proof of Work',
      file: 'memo-to-dr-wright.html'
    },
    'why-cto': {
      title: 'Why CSW Should Be CTO',
      file: 'why-csw-should-be-cto.html'
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadDocument(document);
    }
  }, [document, authenticated]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password === 'thesartrebit') {
      setAuthenticated(true);
      loadDocument(document);
    } else {
      setError('Invalid password');
    }
  };

  const loadDocument = async (doc: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/csw-docs?doc=${doc}&auth=${password}`);
      if (!response.ok) {
        throw new Error('Failed to load document');
      }
      const html = await response.text();
      setContent(html);
    } catch (error) {
      console.error('Error loading document:', error);
      setContent('<p>Error loading document</p>');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
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
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            CSW Documents - Secure Access
          </h1>
          
          <form onSubmit={handleAuth}>
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
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
                autoFocus
              />
            </div>
            
            {error && (
              <div style={{
                color: '#dc2626',
                fontSize: '14px',
                marginBottom: '20px'
              }}>
                {error}
              </div>
            )}
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#000',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Access Documents
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      height: 'auto',
      overflow: 'visible',
      background: 'white',
      position: 'relative'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#000',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ margin: 0, fontSize: '16px' }}>Dr. Wright Documents</h2>
        <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
          {Object.entries(documents).map(([key, doc]) => (
            <button
              key={key}
              onClick={() => setDocument(key)}
              disabled={loading}
              style={{
                background: document === key ? '#d946ef' : 'transparent',
                color: document === key ? '#fff' : '#fff',
                border: `1px solid ${document === key ? '#d946ef' : '#666'}`,
                padding: '5px 15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                borderRadius: '3px',
                opacity: loading ? 0.5 : 1
              }}
            >
              {doc.title}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ 
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading document...</p>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
    </div>
  );
}
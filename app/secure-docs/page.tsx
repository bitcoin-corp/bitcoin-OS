'use client';

import { useEffect } from 'react';

export default function SecureDocs() {
  useEffect(() => {
    // Redirect to the bitcoin-corp-website secure docs
    window.location.href = 'https://thebitcoincorporation.website/secure-docs';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
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
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          marginBottom: '20px',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000'
        }}>
          Redirecting to Secure Documents...
        </h1>
        <p style={{ 
          marginBottom: '30px',
          color: '#666',
          fontSize: '16px'
        }}>
          You are being redirected to the secure document enclave.
        </p>
        <div style={{
          marginBottom: '20px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #f3f3f3',
            borderTop: '6px solid #667eea',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
        <p style={{
          fontSize: '14px',
          color: '#999'
        }}>
          If you are not redirected automatically, 
          <a 
            href="https://thebitcoincorporation.website/secure-docs"
            style={{
              color: '#667eea',
              marginLeft: '5px',
              textDecoration: 'underline'
            }}
          >
            click here
          </a>
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
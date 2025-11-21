'use client';

import { useState, useEffect } from 'react';
import { readFileSync } from 'fs';

export default function CSWDocs() {
  const [document, setDocument] = useState('proposal');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

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
    loadDocument(document);
  }, [document]);

  const loadDocument = async (doc: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/csw-docs?doc=${doc}`);
      const html = await response.text();
      setContent(html);
    } catch (error) {
      console.error('Error loading document:', error);
      setContent('<p>Error loading document</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'auto',
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
import React, { useState, useEffect } from 'react';
import { HandCashService, HandCashUser } from '../services/HandCashService';
import './ConnectionsModal.css';

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: HandCashUser) => void;
  isDarkMode?: boolean;
}

interface ConnectedAccount {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  type: string;
}

interface ConnectionOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  available: boolean;
  connected?: boolean;
}

const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin,
  isDarkMode = false 
}) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [handcashService] = useState(new HandCashService());

  useEffect(() => {
    // Check for stored connected accounts
    const storedGoogle = localStorage.getItem('googleUser');
    const storedHandCash = localStorage.getItem('handcashUser');
    const storedMicrosoft = localStorage.getItem('microsoftUser');
    const storedQuickBooks = localStorage.getItem('quickbooksUser');
    
    const accounts: ConnectedAccount[] = [];
    
    if (storedGoogle) {
      const googleUser = JSON.parse(storedGoogle);
      accounts.push({
        id: 'google',
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.picture,
        type: 'Google Workspace'
      });
    }
    
    if (storedHandCash) {
      const handcashUser = JSON.parse(storedHandCash);
      accounts.push({
        id: 'handcash',
        name: `$${handcashUser.handle}`,
        email: handcashUser.paymail,
        avatar: handcashUser.avatarUrl,
        type: 'HandCash Wallet'
      });
    }
    
    if (storedMicrosoft) {
      const microsoftUser = JSON.parse(storedMicrosoft);
      accounts.push({
        id: 'microsoft',
        name: microsoftUser.name,
        email: microsoftUser.email,
        avatar: microsoftUser.picture,
        type: 'Microsoft 365'
      });
    }
    
    if (storedQuickBooks) {
      const qbUser = JSON.parse(storedQuickBooks);
      accounts.push({
        id: 'quickbooks',
        name: qbUser.companyName,
        email: qbUser.email,
        type: 'QuickBooks'
      });
    }
    
    setConnectedAccounts(accounts);
  }, []);

  const connectionOptions: ConnectionOption[] = [
    {
      id: 'google',
      name: 'Google Workspace',
      description: 'Import Google Sheets & connect Drive',
      icon: '📊',
      color: '#4285F4',
      category: 'productivity',
      available: true,
      connected: connectedAccounts.some(acc => acc.id === 'google')
    },
    {
      id: 'microsoft',
      name: 'Microsoft 365',
      description: 'Import Excel files & OneDrive',
      icon: '📈',
      color: '#00A4EF',
      category: 'productivity',
      available: true,
      connected: connectedAccounts.some(acc => acc.id === 'microsoft')
    },
    {
      id: 'handcash',
      name: 'HandCash',
      description: 'BSV wallet for blockchain features',
      icon: '💰',
      color: '#38CB7C',
      category: 'wallet',
      available: true,
      connected: connectedAccounts.some(acc => acc.id === 'handcash')
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Sync financial data & reports',
      icon: '💼',
      color: '#2CA01C',
      category: 'business',
      available: true,
      connected: connectedAccounts.some(acc => acc.id === 'quickbooks')
    },
    {
      id: 'subscription',
      name: 'Bitcoin Spreadsheets Pro',
      description: 'Subscribe for unlimited features',
      icon: '⭐',
      color: '#F7931A',
      category: 'subscription',
      available: true,
      connected: false
    },
    {
      id: 'topup',
      name: 'BSV Top-up',
      description: 'Add BSV credits for tokenization',
      icon: '💳',
      color: '#EAB300',
      category: 'subscription',
      available: true,
      connected: false
    }
  ];

  const handleConnection = async (option: ConnectionOption) => {
    if (!option.available) {
      setError(`${option.name} connection coming soon!`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (option.connected) {
      // Already connected, maybe show manage options
      return;
    }

    setIsLoading(option.id);
    setError(null);

    try {
      switch (option.id) {
        case 'google':
          console.log('Starting Google Workspace authentication...');
          // Simulate connection for demo
          setTimeout(() => {
            const mockGoogleUser = {
              name: 'Your Business Account',
              email: 'business@company.com',
              picture: 'https://www.google.com/favicon.ico'
            };
            localStorage.setItem('googleUser', JSON.stringify(mockGoogleUser));
            setConnectedAccounts(prev => [...prev, {
              id: 'google',
              name: mockGoogleUser.name,
              email: mockGoogleUser.email,
              avatar: mockGoogleUser.picture,
              type: 'Google Workspace'
            }]);
            setIsLoading(null);
          }, 1500);
          break;
        case 'microsoft':
          console.log('Starting Microsoft 365 authentication...');
          setTimeout(() => {
            const mockMSUser = {
              name: 'Business Excel Account',
              email: 'excel@business.com',
              picture: 'https://www.microsoft.com/favicon.ico'
            };
            localStorage.setItem('microsoftUser', JSON.stringify(mockMSUser));
            setConnectedAccounts(prev => [...prev, {
              id: 'microsoft',
              name: mockMSUser.name,
              email: mockMSUser.email,
              avatar: mockMSUser.picture,
              type: 'Microsoft 365'
            }]);
            setIsLoading(null);
          }, 1500);
          break;
        case 'quickbooks':
          console.log('Starting QuickBooks authentication...');
          setTimeout(() => {
            const mockQBUser = {
              companyName: 'Your Company',
              email: 'accounting@company.com'
            };
            localStorage.setItem('quickbooksUser', JSON.stringify(mockQBUser));
            setConnectedAccounts(prev => [...prev, {
              id: 'quickbooks',
              name: mockQBUser.companyName,
              email: mockQBUser.email,
              type: 'QuickBooks'
            }]);
            setIsLoading(null);
          }, 1500);
          break;
        case 'subscription':
          console.log('Opening subscription options...');
          setError('Subscription plans coming soon!');
          setIsLoading(null);
          break;
        case 'topup':
          console.log('Opening BSV top-up...');
          setError('BSV top-up coming soon!');
          setIsLoading(null);
          break;
        case 'handcash':
          await handcashService.login();
          // After login, check if authentication was successful
          const currentUser = handcashService.getCurrentUser();
          if (currentUser) {
            localStorage.setItem('handcashUser', JSON.stringify(currentUser));
            setConnectedAccounts(prev => [...prev, {
              id: 'handcash',
              name: `$${currentUser.handle}`,
              email: currentUser.paymail,
              avatar: currentUser.avatarUrl,
              type: 'HandCash Wallet'
            }]);
            onLogin(currentUser);
          }
          setIsLoading(null);
          break;
        default:
          throw new Error(`${option.name} integration not implemented`);
      }
    } catch (error) {
      console.error(`${option.name} connection failed:`, error);
      setError(error instanceof Error ? error.message : `${option.name} connection failed`);
      setIsLoading(null);
    }
  };

  const handleDisconnect = (accountId: string) => {
    localStorage.removeItem(`${accountId}User`);
    setConnectedAccounts(prev => prev.filter(acc => acc.id !== accountId));
  };

  const hasConnections = connectedAccounts.length > 0;
  const productivityOptions = connectionOptions.filter(opt => opt.category === 'productivity');
  const businessOptions = connectionOptions.filter(opt => opt.category === 'business');
  const subscriptionOptions = connectionOptions.filter(opt => opt.category === 'subscription');
  const walletOptions = connectionOptions.filter(opt => opt.category === 'wallet');

  if (!isOpen) return null;

  return (
    <>
      <div className="auth-modal-overlay" onClick={onClose} />
      <div className="auth-modal">
        <div className="auth-modal-header">
          <h2>{hasConnections ? 'Manage Connections' : 'Connect to Bitcoin Spreadsheets'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="auth-modal-content">
          {error && (
            <div className="error-banner">
              <span>⚠️</span>
              {error}
            </div>
          )}

          {/* Connected Accounts Section */}
          {hasConnections && (
            <div className="connected-accounts-section">
              <h3>Connected Accounts</h3>
              {connectedAccounts.map(account => (
                <div key={account.id} className={`connected-account-card ${account.id}-connected`}>
                  <div className="connected-avatar">
                    {account.avatar ? (
                      <img src={account.avatar} alt={account.name} style={{width: '100%', height: '100%', borderRadius: '50%'}} />
                    ) : (
                      <div className="avatar-placeholder">
                        {account.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="connected-info">
                    <div className="connected-name">{account.name}</div>
                    <div className="connected-email">{account.email}</div>
                    <div className="connected-type">{account.type}</div>
                  </div>
                  <button className="disconnect-btn" onClick={() => handleDisconnect(account.id)}>
                    Disconnect
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="auth-options">
            {/* Productivity Section */}
            <div className="connection-section">
              <h3>📊 Import Spreadsheets</h3>
              <div className="connections-grid">
                {productivityOptions.map(option => (
                  <button
                    key={option.id}
                    className={`connection-option ${!option.available ? 'disabled' : ''} ${option.connected ? 'connected' : ''} ${isLoading === option.id ? 'loading' : ''}`}
                    onClick={() => handleConnection(option)}
                    disabled={isLoading !== null || option.connected}
                    style={{
                      '--option-color': option.color
                    } as React.CSSProperties}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-details">
                      <div className="option-name">{option.name}</div>
                      <div className="option-description">{option.description}</div>
                      {option.connected && <div className="connected-badge">Connected</div>}
                      {!option.available && <div className="coming-soon-badge">Coming Soon</div>}
                    </div>
                    {isLoading === option.id && (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Tools Section */}
            <div className="connection-section">
              <h3>💼 Business Tools</h3>
              <div className="connections-grid">
                {businessOptions.map(option => (
                  <button
                    key={option.id}
                    className={`connection-option ${!option.available ? 'disabled' : ''} ${option.connected ? 'connected' : ''} ${isLoading === option.id ? 'loading' : ''}`}
                    onClick={() => handleConnection(option)}
                    disabled={isLoading !== null || option.connected}
                    style={{
                      '--option-color': option.color
                    } as React.CSSProperties}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-details">
                      <div className="option-name">{option.name}</div>
                      <div className="option-description">{option.description}</div>
                      {option.connected && <div className="connected-badge">Connected</div>}
                      {!option.available && <div className="coming-soon-badge">Coming Soon</div>}
                    </div>
                    {isLoading === option.id && (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wallet Section */}
            <div className="connection-section">
              <h3>💰 BSV Wallet</h3>
              <div className="connections-grid">
                {walletOptions.map(option => (
                  <button
                    key={option.id}
                    className={`connection-option ${!option.available ? 'disabled' : ''} ${option.connected ? 'connected' : ''} ${isLoading === option.id ? 'loading' : ''}`}
                    onClick={() => handleConnection(option)}
                    disabled={isLoading !== null || option.connected}
                    style={{
                      '--option-color': option.color
                    } as React.CSSProperties}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-details">
                      <div className="option-name">{option.name}</div>
                      <div className="option-description">{option.description}</div>
                      {option.connected && <div className="connected-badge">Connected</div>}
                      {!option.available && <div className="coming-soon-badge">Coming Soon</div>}
                    </div>
                    {isLoading === option.id && (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Section */}
            <div className="connection-section">
              <h3>⭐ Subscription & Top-up</h3>
              <div className="connections-grid">
                {subscriptionOptions.map(option => (
                  <button
                    key={option.id}
                    className={`connection-option ${!option.available ? 'disabled' : ''} ${isLoading === option.id ? 'loading' : ''}`}
                    onClick={() => handleConnection(option)}
                    disabled={isLoading !== null}
                    style={{
                      '--option-color': option.color
                    } as React.CSSProperties}
                  >
                    <div className="option-icon">{option.icon}</div>
                    <div className="option-details">
                      <div className="option-name">{option.name}</div>
                      <div className="option-description">{option.description}</div>
                      {!option.available && <div className="coming-soon-badge">Coming Soon</div>}
                    </div>
                    {isLoading === option.id && (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="auth-benefits">
            <h3>Why connect?</h3>
            <p className="simple-explanation">
              Bitcoin Spreadsheets allows you to import your existing spreadsheets from Google Sheets and Excel, connect business tools like QuickBooks for financial data, and use blockchain features for tokenization and immutable storage. Connect your HandCash wallet to receive payments and tokenize your spreadsheets as NFTs.
            </p>
            
            <div className="topup-buttons-section">
              <h4>Quick Top-up</h4>
              <div className="topup-buttons">
                <button className="topup-btn" onClick={() => console.log('Opening $5 BSV top-up')}>
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="#FFD700" style={{ marginRight: '6px' }}>
                    <text x="16" y="26" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#FFD700" textAnchor="middle">B</text>
                  </svg>
                  $5
                </button>
                <button className="topup-btn" onClick={() => console.log('Opening $10 BSV top-up')}>
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="#FFD700" style={{ marginRight: '6px' }}>
                    <text x="16" y="26" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#FFD700" textAnchor="middle">B</text>
                  </svg>
                  $10
                </button>
                <button className="topup-btn" onClick={() => console.log('Opening $50 BSV top-up')}>
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="#FFD700" style={{ marginRight: '6px' }}>
                    <text x="16" y="26" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#FFD700" textAnchor="middle">B</text>
                  </svg>
                  $50
                </button>
              </div>
            </div>
            
            <button className="premium-subscribe-btn" onClick={() => console.log('Opening premium subscription flow')}>
              <svg width="20" height="20" viewBox="0 0 32 32" style={{ marginRight: '8px' }}>
                <text x="16" y="26" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#FFD700" textAnchor="middle">B</text>
              </svg>
              Subscribe Now - $19/month
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectionsModal;
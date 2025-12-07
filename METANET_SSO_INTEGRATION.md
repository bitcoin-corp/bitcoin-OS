# MetaNet Desktop SSO Integration Guide

## Overview

This guide shows how to integrate MetaNet Desktop single sign-on (SSO) with BRC100 token support into any Bitcoin-OS app. The system provides unified authentication across all 36+ apps using MetaNet Desktop.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Bitcoin-OS Apps                          │
├─────────────────┬─────────────────┬─────────────────────┤
│ bitcoin-music   │ bitcoin-writer  │ ... (34 more apps) │
│ ├─Token: MUSIC  │ ├─Token: DOC    │                     │
│ ├─Token: ALBUM  │ ├─Token: EDIT   │                     │
│ └─Token: STREAM │ └─Token: SHARE  │                     │
└─────────────────┴─────────────────┴─────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│               Bitcoin-OS SSO Layer                      │
│ ├─ BitcoinOSAuth (Session Management)                  │
│ ├─ MetaNetWalletService (Wallet Interface)             │
│ ├─ BitcoinOSStateManager (Global State)                │
│ └─ BRC100 Token Registry                                │
└─────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────────────────────────────────────┐
│                MetaNet Desktop                          │
│ ├─ Private Key Management                               │
│ ├─ BSV Wallet Operations                                │
│ ├─ Transaction Signing                                  │
│ └─ BRC100 Token Standard                                │
└─────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Wrap Your App with the Auth Provider

```tsx
// In your main app component (e.g., apps/bitcoin-music/app/layout.tsx)
import { BitcoinOSAuthProvider } from '../../../components/auth/BitcoinOSAuthProvider'
import BitcoinOSWalletWidget from '../../../components/auth/BitcoinOSWalletWidget'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <BitcoinOSAuthProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Global wallet widget - shows in top right */}
        <BitcoinOSWalletWidget 
          appId="bitcoin-music"
          position="top-right"
          variant="compact"
          showBalance={true}
          showTokenCount={true}
        />
        
        {/* Your app content */}
        <main>
          {children}
        </main>
      </div>
    </BitcoinOSAuthProvider>
  )
}
```

### 2. Use Authentication in Components

```tsx
// In any component within your app
import { useBitcoinOSAuth } from '../../../hooks/useBitcoinOSAuth'

export default function MyAppComponent() {
  const {
    user,
    isAuthenticated,
    isSignedInToApp,
    balance,
    appTokens,
    connectWallet,
    createToken,
    error
  } = useBitcoinOSAuth('bitcoin-music')

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2>Connect your MetaNet Wallet</h2>
        <button onClick={connectWallet} className="btn-primary">
          Connect Wallet
        </button>
      </div>
    )
  }

  if (!isSignedInToApp) {
    return (
      <div className="p-8 text-center">
        <h2>Welcome {user?.displayName}</h2>
        <p>Please sign in to use bitcoin-music</p>
        {/* Widget will show sign-in button automatically */}
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1>Welcome to bitcoin-music!</h1>
      <p>Balance: {balance} sats</p>
      <p>Your tokens: {appTokens.length}</p>
      
      {/* Your app functionality here */}
    </div>
  )
}
```

### 3. Create App-Specific Tokens

```tsx
// Example: Creating a music NFT token
const createMusicNFT = async () => {
  try {
    const token = await createToken({
      name: `${songTitle} by ${artist}`,
      symbol: 'MUSIC',
      tokenType: 'MUSIC-NFT',
      metadata: {
        title: songTitle,
        artist: artist,
        audioHash: audioFileHash,
        artworkHash: artworkFileHash,
        duration: songDuration,
        genre: genre,
        createdAt: new Date().toISOString()
      }
    })
    
    console.log('Music NFT created:', token.id)
  } catch (error) {
    console.error('Failed to create music NFT:', error)
  }
}
```

## App-Specific Integration Examples

### Bitcoin-Music App
```tsx
// Token types for music app
const MUSIC_TOKEN_TYPES = {
  SONG_NFT: 'MUSIC-NFT',
  ALBUM_TOKEN: 'ALBUM-TOKEN',
  STREAM_PASS: 'STREAM-PASS',
  ARTIST_SHARE: 'ARTIST-SHARE'
}

// Create streaming pass token
const createStreamingPass = async (duration: '1day' | '1month' | '1year') => {
  return createToken({
    name: `Streaming Pass - ${duration}`,
    symbol: 'STREAM',
    tokenType: MUSIC_TOKEN_TYPES.STREAM_PASS,
    metadata: {
      accessLevel: 'premium',
      duration: duration,
      features: ['unlimited-streaming', 'high-quality', 'offline-mode']
    }
  })
}
```

### Bitcoin-Writer App
```tsx
// Token types for writer app
const WRITER_TOKEN_TYPES = {
  DOCUMENT_NFT: 'DOC-NFT',
  EDIT_RIGHTS: 'EDIT-RIGHTS', 
  COLLAB_TOKEN: 'COLLAB-TOKEN',
  COPYRIGHT: 'COPYRIGHT-TOKEN'
}

// Create document ownership token
const createDocumentNFT = async (documentData: any) => {
  return createToken({
    name: documentData.title,
    symbol: 'DOC',
    tokenType: WRITER_TOKEN_TYPES.DOCUMENT_NFT,
    metadata: {
      title: documentData.title,
      author: user.address,
      wordCount: documentData.wordCount,
      documentHash: documentData.hash,
      createdAt: new Date().toISOString(),
      copyright: true
    }
  })
}
```

### Bitcoin-Social App
```tsx
// Token types for social app
const SOCIAL_TOKEN_TYPES = {
  REPUTATION: 'REP-TOKEN',
  PREMIUM_ACCESS: 'PREMIUM-ACCESS',
  CREATOR_COIN: 'CREATOR-COIN',
  SOCIAL_NFT: 'SOCIAL-NFT'
}

// Create reputation token
const awardReputation = async (amount: number, reason: string) => {
  return createToken({
    name: `Reputation Token - ${reason}`,
    symbol: 'REP',
    tokenType: SOCIAL_TOKEN_TYPES.REPUTATION,
    supply: amount.toString(),
    metadata: {
      reason: reason,
      value: amount,
      category: 'community-contribution'
    }
  })
}
```

## Cross-App Token Integration

### Viewing Tokens from Other Apps
```tsx
const { allTokens } = useBitcoinOSAuth('bitcoin-music')

// Show tokens from all apps
const renderAllTokens = () => {
  return Array.from(allTokens.entries()).map(([appId, tokens]) => (
    <div key={appId} className="mb-4">
      <h3>{appId} Tokens ({tokens.length})</h3>
      {tokens.map(token => (
        <div key={token.id} className="p-2 border rounded">
          <p><strong>{token.name}</strong></p>
          <p>Type: {token.tokenType}</p>
          <p>App: {token.appId}</p>
        </div>
      ))}
    </div>
  ))
}
```

### Using Tokens Across Apps
```tsx
// Example: Use music reputation in social app
const useMusicReputationInSocial = () => {
  const musicTokens = allTokens.get('bitcoin-music') || []
  const reputationTokens = musicTokens.filter(
    token => token.tokenType === 'ARTIST-REPUTATION'
  )
  
  // Grant social privileges based on music reputation
  const socialPrivileges = reputationTokens.length > 0 ? [
    'verified-musician',
    'premium-posting',
    'exclusive-channels'
  ] : []
  
  return socialPrivileges
}
```

## State Management Integration

### Reading Global Wallet State
```tsx
import { useBitcoinOSAuthContext } from '../../../components/auth/BitcoinOSAuthProvider'

const MyComponent = () => {
  const { 
    isSystemAuthenticated,
    currentUser,
    getSignedInApps,
    globalSignOut 
  } = useBitcoinOSAuthContext()
  
  const signedInApps = getSignedInApps()
  
  return (
    <div>
      <p>System authenticated: {isSystemAuthenticated ? 'Yes' : 'No'}</p>
      <p>Active in {signedInApps.length} apps</p>
      <button onClick={globalSignOut}>Sign out of all apps</button>
    </div>
  )
}
```

### App-Specific State Management
```tsx
// Following Bitcoin-OS state standards
import BitcoinOSStateManager from '../../../lib/state/BitcoinOSStateManager'

const stateManager = BitcoinOSStateManager.getInstance()

// Store app-specific settings
stateManager.setState('music-auto-play', true)
stateManager.setState('music-quality', 'high')
stateManager.setState('music-volume', 0.8)

// Read app-specific settings
const autoPlay = stateManager.getState('music-auto-play', false)
const quality = stateManager.getState('music-quality', 'medium')
```

## Error Handling

```tsx
const MyComponent = () => {
  const { error, connectWallet } = useBitcoinOSAuth('my-app')
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded">
        <h3 className="text-red-800">Connection Error</h3>
        <p className="text-red-600">{error}</p>
        
        {error.includes('MetaNet Desktop') && (
          <div className="mt-2">
            <p className="text-sm">Please ensure MetaNet Desktop is running:</p>
            <ol className="list-decimal list-inside text-sm mt-1">
              <li>Open MetaNet Desktop application</li>
              <li>Make sure it's connected to the BSV network</li>
              <li>Try connecting again</li>
            </ol>
            <button onClick={connectWallet} className="mt-2 btn-primary">
              Retry Connection
            </button>
          </div>
        )}
      </div>
    )
  }
  
  // Rest of component...
}
```

## Widget Customization

```tsx
// Different widget configurations for different apps

// Minimal widget for clean interfaces
<BitcoinOSWalletWidget 
  appId="bitcoin-writer"
  variant="compact"
  position="top-right"
  showBalance={false}
  showTokenCount={true}
/>

// Full widget with app management
<BitcoinOSWalletWidget 
  appId="bitcoin-social"
  variant="full"
  position="top-left"
  showBalance={true}
  showTokenCount={true}
  showAppList={true}
/>

// Inline widget for dashboards
<BitcoinOSWalletWidget 
  appId="bitcoin-dashboard"
  variant="full"
  position="inline"
  className="w-full max-w-md mx-auto"
/>
```

## Testing

```tsx
// Test component for MetaNet integration
import { useBitcoinOSAuth } from '../hooks/useBitcoinOSAuth'

export default function MetaNetTest() {
  const auth = useBitcoinOSAuth('test-app')
  
  return (
    <div className="p-8 space-y-4">
      <h1>MetaNet Desktop Integration Test</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>Authentication</h3>
          <p>Connected: {auth.isWalletConnected ? '✅' : '❌'}</p>
          <p>Authenticated: {auth.isAuthenticated ? '✅' : '❌'}</p>
          <p>Signed in to app: {auth.isSignedInToApp ? '✅' : '❌'}</p>
        </div>
        
        <div>
          <h3>Wallet Info</h3>
          <p>Address: {auth.walletData?.address}</p>
          <p>Balance: {auth.balance} sats</p>
          <p>Tokens: {auth.totalTokens}</p>
        </div>
      </div>
      
      {auth.error && (
        <div className="bg-red-100 p-4 rounded">
          Error: {auth.error}
        </div>
      )}
      
      <button onClick={auth.connectWallet} disabled={auth.isConnecting}>
        {auth.isConnecting ? 'Connecting...' : 'Connect MetaNet'}
      </button>
    </div>
  )
}
```

## Implementation Checklist

For each of the 36 Bitcoin-OS apps:

- [ ] Wrap app with `BitcoinOSAuthProvider`
- [ ] Add `BitcoinOSWalletWidget` component
- [ ] Import and use `useBitcoinOSAuth` hook
- [ ] Define app-specific token types
- [ ] Implement token creation for app features
- [ ] Add error handling for wallet connection
- [ ] Test MetaNet Desktop integration
- [ ] Update app state management to use global standards
- [ ] Document app-specific token use cases
- [ ] Implement cross-app token interactions

## Benefits

1. **Single Sign-On**: One wallet connection for all 36+ apps
2. **Cross-App Assets**: Use tokens from one app in another
3. **Unified Identity**: Same user profile across all apps  
4. **Secure Key Management**: MetaNet Desktop handles private keys
5. **BRC100 Standard**: Modern tokenization with metadata
6. **State Synchronization**: Consistent experience across apps
7. **Easy Integration**: Minimal code changes for existing apps
8. **Extensible**: Easy to add new apps to the ecosystem

This SSO system transforms Bitcoin-OS from individual apps into a cohesive, interoperable ecosystem where users own their identity, assets, and data across all applications.
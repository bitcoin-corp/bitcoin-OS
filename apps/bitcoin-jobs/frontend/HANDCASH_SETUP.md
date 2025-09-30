# HandCash Authentication Setup

## Current Status: DEMO MODE
The app is currently running in demo mode with fake authentication. When you sign in, it creates a demo user account that doesn't connect to a real HandCash wallet.

## To Enable Real HandCash Authentication:

### 1. Register Your App
1. Go to https://dashboard.handcash.io
2. Sign up/Login with your HandCash account
3. Click "Create New App"
4. Fill in your app details:
   - App Name: "Bitcoin Spreadsheet" (or your choice)
   - Description: "Encrypted spreadsheets on Bitcoin"
   - Redirect URLs (add both):
     - Development: `http://localhost:3001/auth/handcash/callback`
     - Production (Vercel): `https://bitcoin-spreadsheet.vercel.app/auth/handcash/callback`

### 2. Get Your App ID
After creating the app, you'll receive an App ID. Copy this ID.

### 3. Configure Your Environment
Create a `.env` file in the frontend directory:
```
REACT_APP_HANDCASH_APP_ID=your_app_id_here
```

### 4. Update HandCashService.ts
Replace the demo login with real HandCash SDK integration:

```typescript
// Install the real SDK first:
// npm install @handcash/handcash-connect

import { HandCashConnect } from '@handcash/handcash-connect';

// In the login method:
async login(): Promise<void> {
  const handcash = new HandCashConnect({
    appId: process.env.REACT_APP_HANDCASH_APP_ID!,
  });
  
  const redirectUrl = await handcash.getRedirectionUrl();
  window.location.href = redirectUrl;
}
```

### 5. Handle OAuth Callback
Create a callback route to handle the OAuth response from HandCash.

## Why Demo Mode?
Currently using demo mode because:
- No HandCash app has been registered yet
- Allows testing the UI/UX without real authentication
- Prevents errors from missing App ID

## Security Note
When using real HandCash:
- User's public key will be used for encryption
- Private keys never leave the user's HandCash wallet
- All spreadsheet data is encrypted before storing on-chain
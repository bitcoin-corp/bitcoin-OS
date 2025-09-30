require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { HandCashConnect } = require('@handcash/handcash-connect');

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables - NO FALLBACK VALUES FOR SECURITY
const APP_ID = process.env.HANDCASH_APP_ID || process.env.REACT_APP_HANDCASH_APP_ID;
const APP_SECRET = process.env.HANDCASH_APP_SECRET || process.env.REACT_APP_HANDCASH_APP_SECRET;
const CLIENT_URL = process.env.CLIENT_URL || 'https://bitcoin-spreadsheet.vercel.app';

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: true
}));
app.use(express.json());

// Initialize HandCash Connect
let handCashConnect;
if (APP_SECRET) {
  handCashConnect = new HandCashConnect({ 
    appId: APP_ID,
    appSecret: APP_SECRET 
  });
}

// Routes
app.get('/api/auth/handcash/url', (req, res) => {
  try {
    // Generate the authorization URL
    const authUrl = `https://app.handcash.io/#/authorizeApp?appId=${APP_ID}`;
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

app.get('/api/auth/handcash/callback', async (req, res) => {
  try {
    const { authToken } = req.query;
    
    if (!authToken) {
      return res.status(400).json({ error: 'No authToken provided' });
    }

    if (!handCashConnect || !APP_SECRET) {
      // If no app secret, just return the token for client-side handling
      // This is for demo/development mode
      return res.redirect(`${CLIENT_URL}?authToken=${authToken}`);
    }

    // Get account from authToken
    const account = await handCashConnect.getAccountFromAuthToken(authToken);
    
    // Get user profile
    const profile = await account.profile.getCurrentProfile();
    
    // Create a session token or JWT here
    // For now, we'll just pass the data back to the client
    const userData = {
      handle: profile.handle,
      paymail: profile.paymail,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl,
      authToken: authToken
    };
    
    // Redirect back to client with user data
    const encodedData = Buffer.from(JSON.stringify(userData)).toString('base64');
    res.redirect(`${CLIENT_URL}?userData=${encodedData}`);
    
  } catch (error) {
    console.error('Callback error:', error);
    res.redirect(`${CLIENT_URL}?error=authentication_failed`);
  }
});

app.get('/api/auth/handcash/profile', async (req, res) => {
  try {
    const authToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!authToken) {
      return res.status(401).json({ error: 'No auth token provided' });
    }

    if (!handCashConnect || !APP_SECRET) {
      // Demo mode - return mock data
      return res.json({
        handle: 'demo_user',
        paymail: 'demo@handcash.io',
        displayName: 'Demo User',
        avatarUrl: 'https://handcash.io/avatar/default'
      });
    }

    const account = await handCashConnect.getAccountFromAuthToken(authToken);
    const profile = await account.profile.getCurrentProfile();
    
    res.json({
      handle: profile.handle,
      paymail: profile.paymail,
      displayName: profile.displayName,
      avatarUrl: profile.avatarUrl
    });
    
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// HandCash profile endpoint (POST version for frontend compatibility)
app.post('/api/handcash-profile', async (req, res) => {
  try {
    const { authToken } = req.body;
    
    console.log('=== Profile Request ===');
    console.log('Auth token received:', authToken ? authToken.substring(0, 20) + '...' : 'NONE');
    console.log('Has APP_SECRET:', !!APP_SECRET);
    console.log('APP_ID:', APP_ID);
    
    if (!authToken) {
      return res.status(401).json({ error: 'No auth token provided' });
    }

    if (!handCashConnect || !APP_SECRET) {
      console.log('No HandCash secret configured, returning demo data');
      return res.json({
        success: true,
        profile: {
          handle: 'demo_user',
          paymail: 'demo@handcash.io',
          displayName: 'Demo User',
          avatarUrl: null
        }
      });
    }

    console.log('Getting account from token...');
    const account = handCashConnect.getAccountFromAuthToken(authToken);
    console.log('Fetching profile...');
    const profile = await account.profile.getCurrentProfile();
    
    console.log('Profile fetched successfully!');
    console.log('Public handle:', profile.publicProfile?.handle);
    console.log('Private handle:', profile.privateProfile?.handle);
    
    res.json({
      success: true,
      profile: {
        handle: profile.publicProfile?.handle || profile.privateProfile?.handle || 'unknown',
        paymail: profile.publicProfile?.paymail || profile.privateProfile?.email || 'user@handcash.io',
        displayName: profile.publicProfile?.displayName || profile.publicProfile?.handle || 'HandCash User',
        avatarUrl: profile.publicProfile?.avatarUrl,
        publicKey: profile.publicProfile?.id,
        email: profile.privateProfile?.email,
        phoneNumber: profile.privateProfile?.phoneNumber
      }
    });
    
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      error: 'Failed to get profile',
      details: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    appId: APP_ID,
    hasSecret: !!APP_SECRET
  });
});

app.listen(PORT, () => {
  console.log(`HandCash API server running on port ${PORT}`);
  console.log(`App ID: ${APP_ID}`);
  console.log(`Has App Secret: ${!!APP_SECRET}`);
});
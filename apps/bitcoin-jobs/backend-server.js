const express = require('express');
const cors = require('cors');
const { HandCashConnect } = require('@handcash/handcash-connect');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3002;

// HandCash profile endpoint
app.post('/api/handcash-profile', async (req, res) => {
  try {
    const { authToken } = req.body;
    
    if (!authToken) {
      return res.status(400).json({ error: 'No auth token provided' });
    }

    console.log('Fetching profile for token:', authToken.substring(0, 20) + '...');

    // Use HandCash Connect SDK to get profile
    const handcashConnect = new HandCashConnect({
      appId: process.env.HANDCASH_APP_ID || '68c532b2a0b054ff147f4579'
    });

    const account = handcashConnect.getAccountFromAuthToken(authToken);
    const profile = await account.profile.getCurrentProfile();

    console.log('Profile fetched:', profile);

    res.json({
      profile: {
        handle: profile.publicProfile?.handle || profile.handle,
        paymail: profile.publicProfile?.paymail || profile.paymail,
        displayName: profile.publicProfile?.displayName || profile.displayName,
        avatarUrl: profile.publicProfile?.avatarUrl || profile.avatarUrl,
        publicKey: profile.publicProfile?.id || profile.id
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// Claude AI endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      console.error('Claude API key not configured');
      return res.status(500).json({ error: 'Claude API not configured. Please add CLAUDE_API_KEY to environment variables.' });
    }

    console.log('Sending request to Claude API with', messages.length, 'messages');

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: messages
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    });

    const content = response.data.content[0].text;
    console.log('Claude response received');
    
    res.json({ content });
  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log('- HandCash profile endpoint: /api/handcash-profile');
  console.log('- Claude AI endpoint: /api/claude');
});
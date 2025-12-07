// Background service worker for Bitcoin OS Chrome Extension

// Handle extension installation
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    console.log('Bitcoin OS Extension installed');
    // Set default storage values
    chrome.storage.local.set({
      installed: true,
      version: '0.1.0',
      firstRun: true
    });
  } else if (details.reason === 'update') {
    console.log('Bitcoin OS Extension updated');
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getWalletStatus') {
    // Check wallet status
    chrome.storage.local.get(['walletConnected'], function(result) {
      sendResponse({ connected: result.walletConnected || false });
    });
    return true;
  }
  
  if (request.action === 'openBitcoinOS') {
    // Open Bitcoin OS in new tab
    chrome.tabs.create({
      url: 'https://bitcoin-os.vercel.app'
    });
  }
});

// Handle browser action click (when clicking extension icon)
chrome.action.onClicked.addListener(function(tab) {
  // Open Bitcoin OS
  chrome.tabs.create({
    url: 'https://bitcoin-os.vercel.app'
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const openAppBtn = document.getElementById('openApp');
  const appButtons = document.querySelectorAll('.app-btn');
  
  // Open main Bitcoin OS app
  openAppBtn.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://bitcoin-os.vercel.app'
    });
    window.close();
  });
  
  // Handle app button clicks
  appButtons.forEach(button => {
    button.addEventListener('click', function() {
      const app = this.getAttribute('data-app');
      let appUrl;
      
      // Map app names to their actual URLs
      switch(app) {
        case 'wallet':
          appUrl = 'https://bitcoin-os.vercel.app'; // Main app has wallet
          break;
        case 'writer':
          appUrl = 'https://bitcoin-writer.vercel.app';
          break;
        case 'email':
          appUrl = 'https://bitcoin-email.vercel.app';
          break;
        case 'drive':
          appUrl = 'https://bitcoin-drive.vercel.app';
          break;
        case 'calendar':
          appUrl = 'https://bitcoin-calendar.vercel.app';
          break;
        case 'chat':
          appUrl = 'https://bitcoin-chat.vercel.app';
          break;
        case 'music':
          appUrl = 'https://bitcoin-music.vercel.app';
          break;
        case 'video':
          appUrl = 'https://bitcoin-video.vercel.app';
          break;
        case 'photos':
          appUrl = 'https://bitcoin-photos.vercel.app';
          break;
        case 'spreadsheets':
          appUrl = 'https://bitcoin-spreadsheets.vercel.app';
          break;
        case 'code':
          appUrl = 'https://bitcoin-code.vercel.app';
          break;
        case 'social':
          appUrl = 'https://bitcoin-social.vercel.app';
          break;
        default:
          appUrl = 'https://bitcoin-os.vercel.app';
      }
      
      chrome.tabs.create({
        url: appUrl
      });
      window.close();
    });
  });
});
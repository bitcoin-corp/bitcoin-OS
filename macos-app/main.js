const { app, BrowserWindow, Menu, shell, nativeImage, Tray } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 20, y: 20 },
    backgroundColor: '#1a1a1a',
    show: false
  });

  // Load Bitcoin OS
  mainWindow.loadURL('https://bitcoin-os.vercel.app');

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Create application menu
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'Bitcoin OS',
      submenu: [
        {
          label: 'About Bitcoin OS',
          click: () => {
            shell.openExternal('https://bitcoin-os.vercel.app/about');
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: 'Cmd+,',
          click: () => {
            mainWindow.webContents.send('open-preferences');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => mainWindow.reload() },
        { label: 'Force Reload', accelerator: 'CmdOrCtrl+Shift+R', click: () => mainWindow.webContents.reloadIgnoringCache() },
        { type: 'separator' },
        { label: 'Actual Size', accelerator: 'CmdOrCtrl+0', click: () => mainWindow.webContents.setZoomLevel(0) },
        { label: 'Zoom In', accelerator: 'CmdOrCtrl+Plus', click: () => mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 0.5) },
        { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', click: () => mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 0.5) },
        { type: 'separator' },
        { label: 'Toggle Fullscreen', accelerator: 'F11', click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen()) }
      ]
    },
    {
      label: 'Apps',
      submenu: [
        { label: '💰 Wallet', accelerator: 'Cmd+1', click: () => mainWindow.loadURL('https://bitcoin-os.vercel.app') },
        { label: '✍️ Writer', accelerator: 'Cmd+2', click: () => mainWindow.loadURL('https://bitcoin-writer.vercel.app') },
        { label: '📧 Email', accelerator: 'Cmd+3', click: () => mainWindow.loadURL('https://bitcoin-email.vercel.app') },
        { label: '💾 Drive', accelerator: 'Cmd+4', click: () => mainWindow.loadURL('https://bitcoin-drive.vercel.app') },
        { label: '📅 Calendar', accelerator: 'Cmd+5', click: () => mainWindow.loadURL('https://bitcoin-calendar.vercel.app') },
        { label: '💬 Chat', accelerator: 'Cmd+6', click: () => mainWindow.loadURL('https://bitcoin-chat.vercel.app') },
        { label: '🎵 Music', accelerator: 'Cmd+7', click: () => mainWindow.loadURL('https://bitcoin-music.vercel.app') },
        { label: '📹 Video', accelerator: 'Cmd+8', click: () => mainWindow.loadURL('https://bitcoin-video.vercel.app') },
        { label: '📸 Photos', accelerator: 'Cmd+9', click: () => mainWindow.loadURL('https://bitcoin-photos.vercel.app') },
        { type: 'separator' },
        { label: '📊 Spreadsheets', click: () => mainWindow.loadURL('https://bitcoin-spreadsheets.vercel.app') },
        { label: '💻 Code', click: () => mainWindow.loadURL('https://bitcoin-code.vercel.app') },
        { label: '👥 Social', click: () => mainWindow.loadURL('https://bitcoin-social.vercel.app') },
        { label: '🎮 Gaming', click: () => mainWindow.loadURL('https://bitcoin-gaming.vercel.app') },
        { label: '🎨 Paint', click: () => mainWindow.loadURL('https://bitcoin-paint.vercel.app') },
        { label: '🔍 Search', click: () => mainWindow.loadURL('https://bitcoin-search.vercel.app') },
        { label: '📚 Books', click: () => mainWindow.loadURL('https://bitcoin-books.vercel.app') },
        { label: '🎓 Education', click: () => mainWindow.loadURL('https://bitcoin-education.vercel.app') },
        { type: 'separator' },
        { label: 'All Apps', accelerator: 'Cmd+0', click: () => mainWindow.loadURL('https://bitcoin-os.vercel.app/#apps') }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { label: 'Minimize', accelerator: 'CmdOrCtrl+M', click: () => mainWindow.minimize() },
        { label: 'Close', accelerator: 'CmdOrCtrl+W', click: () => mainWindow.close() }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            shell.openExternal('https://github.com/bitcoin-corp/bitcoin-OS');
          }
        },
        {
          label: 'Report Issue',
          click: () => {
            shell.openExternal('https://github.com/bitcoin-corp/bitcoin-OS/issues');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

// Set app name
app.setName('Bitcoin OS');
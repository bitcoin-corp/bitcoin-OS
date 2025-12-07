const fs = require('fs');
const path = require('path');

// Build script for Chrome extension
const distDir = path.join(__dirname, 'dist');

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Files to copy
const filesToCopy = [
  'manifest.json',
  'popup.html',
  'popup.css',
  'popup.js',
  'background.js',
  'icon-16.svg',
  'icon-48.svg',
  'icon-128.svg',
  'icon-256.svg'
];

// Copy files to dist
filesToCopy.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(distDir, file.replace('.svg', '.png'));
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
});

console.log('\nBuild complete! Extension files are in the dist/ directory.');
console.log('To load in Chrome:');
console.log('1. Open chrome://extensions/');
console.log('2. Enable Developer mode');
console.log('3. Click "Load unpacked"');
console.log('4. Select the chrome-app/dist directory');
const fs = require('fs');
const path = require('path');

// Simple script to generate placeholder icons
// In production, you'd use a proper image resizing library

const sizes = [16, 48, 128, 256];

const svgIcon = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)" rx="${size/8}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size/3}px" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">B</text>
</svg>
`;

sizes.forEach(size => {
  const svg = svgIcon(size);
  const filename = path.join(__dirname, `icon-${size}.png`);
  
  // For now, create SVG files (in production, convert to PNG)
  fs.writeFileSync(filename.replace('.png', '.svg'), svg);
  console.log(`Created icon-${size}.svg`);
});

console.log('Icon generation complete. Convert SVG to PNG for production use.');
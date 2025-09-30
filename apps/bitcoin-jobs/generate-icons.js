// Node.js script to generate PWA icons
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#F7931A');
  gradient.addColorStop(1, '#ff9500');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Add Bitcoin symbol
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.5}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₿', size / 2, size / 2);

  // Add small "S" for spreadsheet
  ctx.font = `bold ${size * 0.2}px Arial`;
  ctx.fillText('S', size * 0.75, size * 0.75);

  return canvas.toBuffer('image/png');
}

// Generate all required icon sizes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, 'frontend', 'public', 'icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach(size => {
  const buffer = generateIcon(size);
  const filename = path.join(outputDir, `icon-${size}x${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Generated ${filename}`);
});

console.log('All icons generated successfully!');
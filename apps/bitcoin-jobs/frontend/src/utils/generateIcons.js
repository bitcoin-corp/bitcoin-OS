// Utility to generate PWA icons
// This creates placeholder icons - replace with actual Bitcoin Spreadsheet logo

const generateIcon = (size) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
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

  return canvas.toDataURL('image/png');
};

// Generate all required icon sizes
export const generateAllIcons = () => {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  const icons = {};

  sizes.forEach(size => {
    icons[`icon-${size}x${size}.png`] = generateIcon(size);
  });

  return icons;
};

// Helper to download generated icons (for development)
export const downloadIcon = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};
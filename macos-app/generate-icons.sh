#!/bin/bash

# Generate app icons for macOS
echo "Generating Bitcoin OS app icons..."

# Create a simple icon using ImageMagick or sips
# For now, we'll copy existing icon if available
if [ -f "../bitcoin-os.jpg" ]; then
    cp ../bitcoin-os.jpg assets/icon.png
    echo "Copied existing Bitcoin OS image"
elif [ -f "../chrome-app/icon-256.png" ]; then  
    cp ../chrome-app/icon-256.png assets/icon.png
    echo "Copied Chrome app icon"
else
    # Create a placeholder icon
    echo "Creating placeholder icon..."
    cat > assets/icon.svg << 'EOF'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)" rx="64"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="256px" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">B</text>
</svg>
EOF
    echo "Created placeholder SVG icon"
fi

# Note: To create .icns file for production, you'll need to:
# 1. Create icon.iconset folder with multiple sizes
# 2. Run: iconutil -c icns assets/icon.iconset
echo "Icon generation complete!"
echo "For production, convert icon.png to icon.icns using iconutil"
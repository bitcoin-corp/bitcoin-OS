#!/bin/bash

# Create macOS icon from Bitcoin OS logo
echo "Creating Bitcoin OS app icon..."

# Use the Bitcoin OS logo
SOURCE_IMAGE="/Users/b0ase/Projects/bitcoin-OS/bitcoin-os.jpg"

if [ ! -f "$SOURCE_IMAGE" ]; then
    SOURCE_IMAGE="/Users/b0ase/Projects/bitcoin-OS/public/bitcoin-os-social.png"
fi

ICONSET="assets/icon.iconset"

# Create required icon sizes for macOS
sips -z 16 16     "$SOURCE_IMAGE" --out "$ICONSET/icon_16x16.png"
sips -z 32 32     "$SOURCE_IMAGE" --out "$ICONSET/icon_16x16@2x.png"
sips -z 32 32     "$SOURCE_IMAGE" --out "$ICONSET/icon_32x32.png"
sips -z 64 64     "$SOURCE_IMAGE" --out "$ICONSET/icon_32x32@2x.png"
sips -z 128 128   "$SOURCE_IMAGE" --out "$ICONSET/icon_128x128.png"
sips -z 256 256   "$SOURCE_IMAGE" --out "$ICONSET/icon_128x128@2x.png"
sips -z 256 256   "$SOURCE_IMAGE" --out "$ICONSET/icon_256x256.png"
sips -z 512 512   "$SOURCE_IMAGE" --out "$ICONSET/icon_256x256@2x.png"
sips -z 512 512   "$SOURCE_IMAGE" --out "$ICONSET/icon_512x512.png"
sips -z 1024 1024 "$SOURCE_IMAGE" --out "$ICONSET/icon_512x512@2x.png"

# Convert to icns
iconutil -c icns "$ICONSET" -o assets/icon.icns

# Also create PNG version for electron
sips -z 512 512 "$SOURCE_IMAGE" --out assets/icon.png

echo "Icon created at assets/icon.icns"

# Clean up iconset
rm -rf "$ICONSET"

echo "Icon generation complete!"
#!/bin/bash

# Script to set up port forwarding from 1020 to 3020 on macOS
# This allows the dev server to run on 3020 but be accessible on 1020

echo "🔧 Setting up port forwarding from 1020 → 3020..."

# Create pf config file
cat > /tmp/bitcoin-spreadsheet-pf.conf << EOF
# Port forwarding for Bitcoin Spreadsheet development
rdr pass on lo0 inet proto tcp from any to any port 1020 -> 127.0.0.1 port 3020
EOF

# Enable the port forwarding
sudo pfctl -ef /tmp/bitcoin-spreadsheet-pf.conf

echo "✅ Port forwarding enabled!"
echo "📍 Access the app at: http://localhost:1020"
echo "📍 Server runs on: http://localhost:3020"
echo ""
echo "To disable port forwarding, run:"
echo "  sudo pfctl -d"
echo ""
echo "To re-enable port forwarding, run:"
echo "  sudo pfctl -e"
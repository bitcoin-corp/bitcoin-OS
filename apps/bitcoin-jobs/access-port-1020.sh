#!/bin/bash

# Simple script to enable port forwarding for Bitcoin Spreadsheet
# This allows access via http://localhost:1020 while server runs on 3020

echo "🔧 Enabling port forwarding 1020 → 3020..."
echo "📝 You'll be prompted for your password to enable privileged port forwarding."
echo ""

# Create pf config for port forwarding
sudo bash -c 'cat > /tmp/bitcoin-spreadsheet-pf.conf << EOF
# Port forwarding for Bitcoin Spreadsheet development
rdr pass on lo0 inet proto tcp from any to any port 1020 -> 127.0.0.1 port 3020
EOF'

# Enable the port forwarding
sudo pfctl -ef /tmp/bitcoin-spreadsheet-pf.conf

echo ""
echo "✅ Port forwarding enabled!"
echo "📍 Access the app at: http://localhost:1020"
echo "📍 Server runs on: http://localhost:3020"
echo ""
echo "To disable port forwarding, run:"
echo "  sudo pfctl -d"
echo ""
echo "💡 Tip: You only need to run this once per system restart"
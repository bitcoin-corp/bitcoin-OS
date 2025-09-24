#!/bin/bash

# Bitcoin OS Development Launcher
# This script starts Bitcoin OS and optionally the individual apps

echo "🟠 Starting Bitcoin OS..."
echo "================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Start Bitcoin OS
echo -e "${BLUE}Starting Bitcoin OS on port 2050...${NC}"
cd /Users/b0ase/Projects/bitcoin-OS
npm run dev &
OS_PID=$!

sleep 3

echo -e "${GREEN}✓ Bitcoin OS is running at http://localhost:2050${NC}"
echo ""
echo "To start individual apps for development:"
echo "  bitcoin-wallet: cd ../bitcoin-wallet && npm start (port 3001)"
echo "  bitcoin-email:  cd ../bitcoin-email && npm run dev (port 3002)"
echo "  bitcoin-music:  cd ../bitcoin-music && npm run dev (port 3003)"
echo "  bitcoin-writer: cd ../bitcoin-writer && npm start (port 3004)"
echo "  bitcoin-drive:  cd ../bitcoin-drive && npm run dev (port 3005)"
echo "  bitcoin-jobs:   cd ../bitcoin-jobs/frontend && npm start (port 3006)"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop Bitcoin OS${NC}"

# Wait for user to stop
wait $OS_PID
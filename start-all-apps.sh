#!/bin/bash

echo "Starting Bitcoin OS Ecosystem..."

# Kill any existing processes on our ports
lsof -ti:1050,2010,2030,2040,2050,3000,3007,3010,3020 | xargs kill -9 2>/dev/null

# Start each app in its own process from local apps directory
echo "Starting Bitcoin Wallet (port 1050)..."
(cd apps/bitcoin-wallet && npm start > /tmp/bitcoin-wallet.log 2>&1) &

echo "Starting Bitcoin Writer (port 2010)..."
(cd apps/bitcoin-writer && npm start > /tmp/bitcoin-writer.log 2>&1) &

echo "Starting Bitcoin Drive (port 2030)..."
(cd apps/bitcoin-drive && npm run dev > /tmp/bitcoin-drive.log 2>&1) &

echo "Starting Bitcoin Email (port 2040)..."
(cd apps/bitcoin-email && npm run dev > /tmp/bitcoin-email.log 2>&1) &

echo "Starting Bitcoin Jobs (port 3010)..."
(cd apps/bitcoin-jobs && npm run dev > /tmp/bitcoin-jobs.log 2>&1) &

echo "Starting Bitcoin Music (port 3007)..."
(cd apps/bitcoin-music && npm run dev > /tmp/bitcoin-music.log 2>&1) &

echo "Starting Bitcoin Exchange (port 3000)..."
(cd apps/bitcoin-exchange && npm run dev > /tmp/bitcoin-exchange.log 2>&1) &

echo "Starting Bitcoin Spreadsheets (port 3020)..."
(cd apps/bitcoin-spreadsheets && npm run dev > /tmp/bitcoin-spreadsheets.log 2>&1 || echo "Spreadsheets not configured") &

# Wait for apps to start
echo "Waiting for apps to initialize..."
sleep 5

# Start Bitcoin OS
echo "Starting Bitcoin OS (port 2050)..."
cd /Users/b0ase/Projects/bitcoin-OS && npm run dev

# When OS stops, kill all child processes
trap "kill 0" EXIT
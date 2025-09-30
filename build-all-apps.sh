#!/bin/bash

echo "Building Bitcoin OS Ecosystem for Production..."

# Build each app from local apps directory
echo "Building Bitcoin Wallet..."
(cd apps/bitcoin-wallet && npm run build)

echo "Building Bitcoin Writer..."
(cd apps/bitcoin-writer && npm run build)

echo "Building Bitcoin Drive..."
(cd apps/bitcoin-drive && npm run build)

echo "Building Bitcoin Email..."
(cd apps/bitcoin-email && npm run build)

echo "Building Bitcoin Jobs..."
(cd apps/bitcoin-jobs && npm run build)

echo "Building Bitcoin Music..."
(cd apps/bitcoin-music && npm run build)

echo "Building Bitcoin Exchange..."
(cd apps/bitcoin-exchange && npm run build)

echo "Building Bitcoin Spreadsheets..."
(cd apps/bitcoin-spreadsheets && npm run build 2>/dev/null || echo "Spreadsheets build not configured")

# Build Bitcoin OS last
echo "Building Bitcoin OS..."
npm run build

echo "All builds complete!"
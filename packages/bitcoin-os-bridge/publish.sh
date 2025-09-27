#!/bin/bash

# Bitcoin OS Bridge Publishing Script

echo "🚀 Publishing @bitcoin-os/bridge to npm..."

# Navigate to package directory
cd /Users/b0ase/Projects/bitcoin-OS/packages/bitcoin-os-bridge

# Clean and rebuild
echo "🔧 Building package..."
npm run clean 2>/dev/null || true
npm run build

# Check if logged in
echo "🔐 Checking npm login..."
npm whoami || (echo "❌ Please run 'npm login' first" && exit 1)

# Publish
echo "📦 Publishing to npm..."
npm publish --access public

echo "✅ Package published successfully!"
echo ""
echo "Developers can now install with:"
echo "  npm install @bitcoin-os/bridge"
echo ""
echo "Or yarn:"
echo "  yarn add @bitcoin-os/bridge"
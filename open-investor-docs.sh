#!/bin/bash

echo "Opening Bitcoin Corporation investor documents..."
echo ""
echo "To save as PDF:"
echo "1. Press Cmd+P in your browser"
echo "2. Choose 'Save as PDF'"
echo "3. Save each document"
echo ""

# Open covering letter
open covering-letter.html

# Wait a moment
sleep 2

# Open pitch deck
open pitch-deck.html

echo "Documents opened in your default browser."
echo "Please save each as PDF using Cmd+P → Save as PDF"
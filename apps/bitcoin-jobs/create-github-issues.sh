#!/bin/bash

# Create GitHub Issues for Bitcoin Spreadsheet Development Tasks
# Make sure you have GitHub CLI installed: brew install gh
# Authenticate first: gh auth login

echo "Creating GitHub issues for Bitcoin Spreadsheet development tasks..."

# Issue 1: Real-time Collaboration
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Implement Real-time Collaboration" \
  --body "## Description
Add WebRTC-based real-time collaboration so multiple users can edit the same spreadsheet simultaneously.

## Requirements
- WebRTC integration for peer-to-peer connections
- Cursor tracking and display for multiple users  
- Cell locking mechanism to prevent conflicts
- Conflict resolution system
- Tests with 90% coverage

## Skills Required
- WebRTC
- React
- TypeScript
- Real-time Systems

## Reward
**10,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Expert

## Category
Feature" \
  --label "enhancement" \
  --label "help wanted" \
  --label "10000-BSHEETS"

# Issue 2: Advanced Charting Library
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Add Advanced Charting Library" \
  --body "## Description
Integrate a comprehensive charting library (Chart.js or D3.js) to allow users to create various chart types from spreadsheet data.

## Requirements
- Support for 10+ chart types
- Interactive chart editing
- Data binding from cells
- Export charts as images

## Skills Required
- Chart.js/D3.js
- Data Visualization
- React

## Reward
**5,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Medium

## Category
Feature" \
  --label "enhancement" \
  --label "help wanted" \
  --label "5000-BSHEETS"

# Issue 3: Pivot Tables
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Implement Pivot Tables" \
  --body "## Description
Build a full-featured pivot table functionality similar to Excel, allowing users to summarize and analyze data dynamically.

## Requirements
- Drag-and-drop pivot table builder
- Multiple aggregation functions
- Filtering and sorting
- Performance optimization for large datasets

## Skills Required
- Data Processing
- Algorithms
- React
- TypeScript

## Reward
**8,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Hard

## Category
Feature" \
  --label "enhancement" \
  --label "help wanted" \
  --label "8000-BSHEETS"

# Issue 4: Mobile App Development
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Mobile App Development" \
  --body "## Description
Create a React Native mobile app for Bitcoin Spreadsheet with full functionality and offline support.

## Requirements
- iOS and Android apps
- Offline mode with sync
- Touch-optimized UI
- Push notifications
- App store deployment

## Skills Required
- React Native
- Mobile Development
- Offline Storage
- BSV Integration

## Reward
**15,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Expert

## Category
Mobile" \
  --label "enhancement" \
  --label "help wanted" \
  --label "mobile" \
  --label "15000-BSHEETS"

# Issue 5: Excel Import/Export Enhancement
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Excel Import/Export Enhancement" \
  --body "## Description
Improve Excel file import/export to support advanced features like macros, pivot tables, and complex formatting.

## Requirements
- Support for .xlsx format
- Preserve formulas and formatting
- Handle large files efficiently

## Skills Required
- Excel File Format
- File Parsing
- TypeScript

## Reward
**3,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Medium

## Category
Enhancement" \
  --label "enhancement" \
  --label "help wanted" \
  --label "3000-BSHEETS"

# Issue 6: Performance Optimization
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Performance Optimization for Large Datasets" \
  --body "## Description
Optimize rendering and calculation performance for spreadsheets with 100,000+ cells.

## Requirements
- Virtual scrolling implementation
- Web Worker for calculations
- Lazy loading strategies
- Performance benchmarks

## Skills Required
- Performance Optimization
- Virtual Scrolling
- Web Workers

## Reward
**6,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Hard

## Category
Performance" \
  --label "enhancement" \
  --label "performance" \
  --label "help wanted" \
  --label "6000-BSHEETS"

# Issue 7: API Documentation
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Create API Documentation" \
  --body "## Description
Create comprehensive API documentation with examples and interactive playground.

## Requirements
- Complete API reference
- Code examples in multiple languages
- Interactive API playground
- Integration guides

## Skills Required
- Technical Writing
- API Documentation
- Swagger/OpenAPI

## Reward
**2,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Easy

## Category
Documentation" \
  --label "documentation" \
  --label "good first issue" \
  --label "help wanted" \
  --label "2000-BSHEETS"

# Issue 8: Accessibility Improvements
gh issue create \
  --repo bitcoin-apps-suite/bitcoin-spreadsheet \
  --title "Accessibility and Screen Reader Support" \
  --body "## Description
Ensure WCAG 2.1 AA compliance with screen reader support and keyboard navigation.

## Requirements
- Full keyboard navigation
- Screen reader compatibility
- ARIA labels and roles
- Accessibility audit report

## Skills Required
- WCAG
- ARIA
- Screen Readers
- Accessibility Testing

## Reward
**4,000 BSHEETS tokens** upon successful PR merge

## Difficulty
Medium

## Category
Accessibility" \
  --label "accessibility" \
  --label "enhancement" \
  --label "help wanted" \
  --label "4000-BSHEETS"

echo "✅ All issues created successfully!"
echo "View them at: https://github.com/bitcoin-apps-suite/bitcoin-spreadsheet/issues"
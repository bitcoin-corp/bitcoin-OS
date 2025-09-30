#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const path = require('path');

// Function to kill process on port 2020
function killPort2020() {
  return new Promise((resolve, reject) => {
    // Find and kill process on port 2020
    exec("lsof -ti:2020 | xargs kill -9", (error, stdout, stderr) => {
      if (error) {
        console.log('No process running on port 2020 or already killed');
        resolve(); // Resolve even if there's an error (port might be free)
      } else {
        console.log('✅ Killed process on port 2020');
        resolve();
      }
    });
  });
}

// Function to start the development server
function startDevServer() {
  console.log('🚀 Starting Bitcoin Spreadsheet on port 2020...');
  
  const frontendPath = path.join(__dirname, 'frontend');
  
  // Start the development server
  const devServer = spawn('npm', ['start'], {
    cwd: frontendPath,
    stdio: 'inherit',
    shell: true
  });

  devServer.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
  });

  devServer.on('close', (code) => {
    if (code !== 0) {
      console.log(`⚠️ Server process exited with code ${code}`);
    }
  });

  return devServer;
}

// Function to restart the server
async function restartServer() {
  console.log('🔄 Restarting Bitcoin Spreadsheet development server...\n');
  
  // Kill existing process on port 2020
  await killPort2020();
  
  // Wait a moment for port to be freed
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Start the server
  startDevServer();
}

// Handle command line arguments
const command = process.argv[2];

switch (command) {
  case 'kill':
    killPort2020().then(() => {
      console.log('✅ Port 3020 is now free');
      process.exit(0);
    });
    break;
    
  case 'start':
    startDevServer();
    break;
    
  case 'restart':
  default:
    restartServer();
    break;
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⏹ Stopping server...');
  killPort2020().then(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  killPort2020().then(() => {
    process.exit(0);
  });
});
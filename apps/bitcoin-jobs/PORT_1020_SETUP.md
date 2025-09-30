# Port 1020 Access Setup

## Current Status
✅ Bitcoin Spreadsheet is running on port 3020
🔧 Port 1020 access requires additional setup (due to Unix privileged port restrictions)

## Quick Setup for Port 1020 Access

### Option 1: Port Forwarding (Recommended)
Run the provided script to forward port 1020 to 3020:

```bash
./access-port-1020.sh
```

This will:
- Forward port 1020 → 3020 using macOS pfctl
- Require admin password once per system restart
- Allow access via http://localhost:1020

### Option 2: Direct Access
Use port 3020 directly:
- Access: http://localhost:3020
- No admin permissions required
- DevServer applet configured for port 3020

## Server Management

### Using the Dev Server Manager
```bash
# Start server
node dev-server-manager.js start

# Restart server
node dev-server-manager.js restart

# Kill server
node dev-server-manager.js kill
```

### Using the Taskbar Applet
The DevServerApplet in the taskbar provides:
- ✅ Real-time server status monitoring
- 🔄 One-click restart functionality
- 🌐 Quick browser opening
- ⏹ Start/stop controls

## Technical Notes

### Why Port 1020 Needs Admin Access
- Ports 0-1023 are "privileged ports" in Unix systems
- Originally reserved for system services
- Require root/admin permissions for security
- Modern applications typically use ports 3000+ to avoid this

### Port Forwarding Details
- Uses macOS pfctl (packet filter)
- Creates transparent redirect from 1020 → 3020
- Persists until system restart or manual disable
- Safe and commonly used for development
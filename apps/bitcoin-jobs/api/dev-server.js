const { exec, spawn } = require('child_process');
const path = require('path');

// Kill process on port
function killPort(port) {
  return new Promise((resolve, reject) => {
    exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
      if (error) {
        console.log(`No process running on port ${port} or already killed`);
        resolve({ success: true, message: 'Port is free' });
      } else {
        resolve({ success: true, message: `Killed process on port ${port}` });
      }
    });
  });
}

// API handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // Kill server endpoint
  if (pathname === '/api/dev-server/kill' && req.method === 'POST') {
    try {
      const { port = 1020 } = req.body;
      const result = await killPort(port);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Restart server endpoint
  else if (pathname === '/api/dev-server/restart' && req.method === 'POST') {
    try {
      const { port = 1020, projectPath } = req.body;
      
      // Kill existing process
      await killPort(port);
      
      // Wait for port to be freed
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start new process
      const devServer = spawn('npm', ['start'], {
        cwd: projectPath || path.join(process.cwd(), 'frontend'),
        detached: true,
        stdio: 'ignore'
      });
      
      devServer.unref();
      
      res.status(200).json({ 
        success: true, 
        message: 'Server restarting',
        pid: devServer.pid 
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  
  // Status check endpoint
  else if (pathname === '/api/dev-server/status' && req.method === 'GET') {
    const port = req.query.port || 1020;
    
    exec(`lsof -ti:${port}`, (error, stdout, stderr) => {
      if (error || !stdout) {
        res.status(200).json({ running: false, port });
      } else {
        res.status(200).json({ running: true, port, pid: stdout.trim() });
      }
    });
  }
  
  else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
};
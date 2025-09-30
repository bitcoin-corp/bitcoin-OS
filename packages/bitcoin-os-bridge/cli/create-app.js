#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const log = (message, color = colors.white) => {
  console.log(color + message + colors.reset);
};

const logHeader = (message) => {
  console.log('\n' + colors.cyan + colors.bright + '▶ ' + message + colors.reset + '\n');
};

const logSuccess = (message) => {
  console.log(colors.green + '✓ ' + message + colors.reset);
};

const logError = (message) => {
  console.log(colors.red + '✗ ' + message + colors.reset);
};

const logWarning = (message) => {
  console.log(colors.yellow + '⚠ ' + message + colors.reset);
};

// Get command line arguments
const args = process.argv.slice(2);
const appName = args[0];

if (!appName) {
  logError('Please provide an app name');
  log('Usage: npx @bitcoin-os/bridge create-app <app-name>');
  process.exit(1);
}

// Validate app name
const validAppName = /^[a-z][a-z0-9-]*$/.test(appName);
if (!validAppName) {
  logError('App name must start with a letter and contain only lowercase letters, numbers, and hyphens');
  process.exit(1);
}

const appDir = path.join(process.cwd(), appName);

// Check if directory exists
if (fs.existsSync(appDir)) {
  logError(`Directory "${appName}" already exists`);
  process.exit(1);
}

logHeader(`Creating Bitcoin OS App: ${appName}`);

try {
  // Create app directory
  fs.mkdirSync(appDir, { recursive: true });
  logSuccess(`Created directory: ${appName}`);

  // Create package.json
  const packageJson = {
    name: appName,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      '@bitcoin-os/bridge': '^2.0.0',
      'next': '^14.0.0',
      'react': '^18.0.0',
      'react-dom': '^18.0.0',
      'lucide-react': '^0.263.0'
    },
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
      'eslint': '^8.0.0',
      'eslint-config-next': '^14.0.0',
      'typescript': '^5.0.0'
    }
  };

  fs.writeFileSync(
    path.join(appDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  logSuccess('Created package.json');

  // Create Next.js config
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
`;

  fs.writeFileSync(path.join(appDir, 'next.config.js'), nextConfig);
  logSuccess('Created next.config.js');

  // Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'es6'],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: 'preserve',
      incremental: true,
      plugins: [
        {
          name: 'next'
        }
      ],
      paths: {
        '@/*': ['./app/*', './components/*', './lib/*']
      }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  };

  fs.writeFileSync(
    path.join(appDir, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );
  logSuccess('Created tsconfig.json');

  // Create app directory structure
  const appDirPath = path.join(appDir, 'app');
  fs.mkdirSync(appDirPath, { recursive: true });

  // Create layout.tsx
  const layout = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LayoutClient } from '@bitcoin-os/bridge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '${appName}',
  description: 'Bitcoin OS Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const context = {
    appName: '${appName}',
    exchangeUrl: '/exchange'
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient context={context}>
          {children}
        </LayoutClient>
      </body>
    </html>
  )
}
`;

  fs.writeFileSync(path.join(appDirPath, 'layout.tsx'), layout);
  logSuccess('Created app/layout.tsx');

  // Create page.tsx
  const page = `'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(64, 224, 208, 0.3)',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #40e0d0, #20b2aa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Welcome to ${appName}
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Your Bitcoin OS application is ready to go! This template includes the full
          Bitcoin OS UI system with taskbar, sidebar, and dock components.
        </p>

        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              background: 'linear-gradient(135deg, #40e0d0, #20b2aa)',
              color: '#000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              marginRight: '10px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Count: {count}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#40e0d0', marginBottom: '10px' }}>🚀 Next.js 14</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              Built with the latest Next.js features including App Router
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#40e0d0', marginBottom: '10px' }}>₿ Bitcoin OS</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              Complete Bitcoin OS UI system with taskbar, sidebar, and dock
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ color: '#40e0d0', marginBottom: '10px' }}>⚡ TypeScript</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              Full TypeScript support with strict type checking
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
`;

  fs.writeFileSync(path.join(appDirPath, 'page.tsx'), page);
  logSuccess('Created app/page.tsx');

  // Create globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 26, 26, 26;
  --background-end-rgb: 10, 10, 10;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: Inter, system-ui, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}
`;

  fs.writeFileSync(path.join(appDirPath, 'globals.css'), globalsCss);
  logSuccess('Created app/globals.css');

  // Create README
  const readme = `# ${appName}

A Bitcoin OS application built with Next.js 14 and the Bitcoin OS Bridge components.

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- ✅ Bitcoin OS UI System (Taskbar, Sidebar, Dock)
- ✅ Next.js 14 with App Router
- ✅ TypeScript support
- ✅ Turquoise theme (#40e0d0)
- ✅ Responsive design
- ✅ Bitcoin OS Bridge components

## Bitcoin OS Components

This app includes the full Bitcoin OS component library:

- **PocBar**: Proof of concept banner
- **Taskbar**: Full macOS-style taskbar with menus
- **DevSidebar**: Collapsible developer sidebar
- **Dock**: macOS-style dock at the bottom
- **Footer**: Corporate footer with Vercel badge
- **AppWrapper**: Dark gradient background wrapper

## Customization

Edit \`app/layout.tsx\` to customize the app context:

\`\`\`tsx
const context = {
  appName: '${appName}',
  exchangeUrl: '/exchange'
};
\`\`\`

## Learn More

- [Bitcoin OS Documentation](https://github.com/bitcoin-corp/bitcoin-OS)
- [Next.js Documentation](https://nextjs.org/docs)
- [Bitcoin OS Bridge Package](https://www.npmjs.com/package/@bitcoin-os/bridge)

## Deploy

Deploy your app on Vercel for the best experience:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
`;

  fs.writeFileSync(path.join(appDir, 'README.md'), readme);
  logSuccess('Created README.md');

  // Create .gitignore
  const gitignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

  fs.writeFileSync(path.join(appDir, '.gitignore'), gitignore);
  logSuccess('Created .gitignore');

  // Create .eslintrc.json
  const eslintrc = {
    extends: ['next/core-web-vitals']
  };

  fs.writeFileSync(
    path.join(appDir, '.eslintrc.json'),
    JSON.stringify(eslintrc, null, 2)
  );
  logSuccess('Created .eslintrc.json');

  logHeader('Installing dependencies...');
  
  // Change to app directory and install dependencies
  process.chdir(appDir);
  
  try {
    execSync('npm install', { stdio: 'inherit' });
    logSuccess('Dependencies installed successfully');
  } catch (error) {
    logWarning('Failed to install dependencies automatically');
    log('You can install them manually by running:');
    log(`  cd ${appName}`);
    log('  npm install');
  }

  // Success message
  logHeader('🎉 Success! Your Bitcoin OS app is ready!');
  log('');
  log(`To get started:`);
  log(`  cd ${colors.cyan}${appName}${colors.reset}`);
  log(`  ${colors.cyan}npm run dev${colors.reset}`);
  log('');
  log('Your app will be available at http://localhost:3000');
  log('');
  log('Happy coding! 🚀');
  log('');

} catch (error) {
  logError('Failed to create app: ' + error.message);
  
  // Cleanup on failure
  if (fs.existsSync(appDir)) {
    fs.rmSync(appDir, { recursive: true, force: true });
    log('Cleaned up partial installation');
  }
  
  process.exit(1);
}
'use client'

import { useState } from 'react'
import { Download, Chrome, Monitor, Github, CheckCircle, ArrowRight } from 'lucide-react'

export default function DownloadPage() {
  const [copied, setCopied] = useState(false)

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Bitcoin OS Downloads
          </h1>
          <p className="text-xl opacity-90">Take Bitcoin OS everywhere with our desktop and browser extensions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Chrome Extension */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Chrome className="w-12 h-12 mr-4 text-yellow-400" />
              <div>
                <h2 className="text-3xl font-bold">Chrome Extension</h2>
                <p className="text-sm opacity-80">Quick access from your browser</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>One-click access to all Bitcoin OS apps</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Quick wallet access from any tab</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>12 integrated Bitcoin apps</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Secure and lightweight</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://github.com/bitcoin-corp/bitcoin-OS/releases/latest/download/bitcoin-os-chrome.zip"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Chrome Extension
              </a>
              
              <div className="text-sm opacity-70 text-center">
                v0.1.0 • 2.3 MB • Manifest V3
              </div>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm opacity-80 hover:opacity-100">Installation Instructions</summary>
              <ol className="mt-3 space-y-2 text-sm opacity-70">
                <li>1. Download the extension ZIP file</li>
                <li>2. Unzip the downloaded file</li>
                <li>3. Open chrome://extensions/</li>
                <li>4. Enable "Developer mode"</li>
                <li>5. Click "Load unpacked"</li>
                <li>6. Select the unzipped folder</li>
              </ol>
            </details>
          </div>

          {/* macOS App */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <Monitor className="w-12 h-12 mr-4 text-blue-400" />
              <div>
                <h2 className="text-3xl font-bold">macOS App</h2>
                <p className="text-sm opacity-80">Native desktop experience</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Native macOS app with dock support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Full Bitcoin OS experience</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Menu bar integration</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                <span>Keyboard shortcuts</span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://github.com/bitcoin-corp/bitcoin-OS/releases/latest/download/Bitcoin-OS-0.1.0.dmg"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download for macOS
              </a>
              
              <div className="text-sm opacity-70 text-center">
                v0.1.0 • 85 MB • Apple Silicon & Intel
              </div>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm opacity-80 hover:opacity-100">Installation Instructions</summary>
              <ol className="mt-3 space-y-2 text-sm opacity-70">
                <li>1. Download the DMG file</li>
                <li>2. Open the downloaded DMG</li>
                <li>3. Drag Bitcoin OS to Applications</li>
                <li>4. Launch from Applications</li>
                <li>5. Right-click dock icon → Keep in Dock</li>
              </ol>
            </details>
          </div>
        </div>

        {/* GitHub Releases Section */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
            <Github className="w-16 h-16 mx-auto mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-4">All Releases on GitHub</h3>
            <p className="mb-6 opacity-80">
              Get the latest versions, view changelog, and download previous releases
            </p>
            <a
              href="https://github.com/bitcoin-corp/bitcoin-OS/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              View All Releases
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* Quick Install Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Quick Install via Terminal</h3>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <code className="text-green-400">
                  curl -L https://bitcoin-os.vercel.app/install.sh | bash
                </code>
                <button
                  onClick={() => copyCommand('curl -L https://bitcoin-os.vercel.app/install.sh | bash')}
                  className="ml-4 px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-all"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm opacity-70">
              Automatically detects your OS and installs the appropriate version
            </p>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="font-bold mb-3">Chrome Extension Requirements</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li>• Chrome 88+ or Edge 88+</li>
              <li>• 50 MB available storage</li>
              <li>• Internet connection</li>
            </ul>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="font-bold mb-3">macOS App Requirements</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li>• macOS 10.13 High Sierra or later</li>
              <li>• 200 MB available storage</li>
              <li>• Apple Silicon or Intel processor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
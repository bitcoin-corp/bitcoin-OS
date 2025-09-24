/**
 * Bitcoin OS Bridge
 * Include this script in your app to enable communication with Bitcoin OS
 * This can be published as an npm package: @bitcoin-os/bridge
 */

class BitcoinOSBridge {
  constructor() {
    this.isInOS = this.detectOS()
    this.listeners = {}
    this.init()
  }

  detectOS() {
    // Check if running inside Bitcoin OS iframe
    try {
      return window.parent !== window && window.parent.location.href.includes('bitcoin-os')
    } catch (e) {
      // Cross-origin error means we're probably in an iframe
      return window.parent !== window
    }
  }

  init() {
    if (!this.isInOS) return

    // Listen for messages from OS
    window.addEventListener('message', (event) => {
      this.handleMessage(event)
    })

    // Notify OS that app is ready
    this.sendToOS('app-ready', {
      app: window.location.hostname
    })
  }

  handleMessage(event) {
    const { type, ...data } = event.data

    switch (type) {
      case 'os-config':
        this.applyOSConfig(data)
        break
      case 'theme-change':
        this.applyTheme(data.theme)
        break
      case 'focus':
        this.emit('focus')
        break
      case 'blur':
        this.emit('blur')
        break
      default:
        this.emit(type, data)
    }
  }

  applyOSConfig(config) {
    if (config.theme) {
      this.applyTheme(config.theme)
    }
    this.emit('config', config)
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    this.emit('theme-change', theme)
  }

  sendToOS(type, data = {}) {
    if (!this.isInOS) return
    
    window.parent.postMessage({
      type,
      ...data
    }, '*')
  }

  // Event emitter methods
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event, callback) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
  }

  emit(event, data) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(callback => callback(data))
  }

  // Helper methods for apps
  navigateHome() {
    this.sendToOS('navigate-home')
  }

  openApp(appName) {
    this.sendToOS('open-app', { app: appName })
  }

  showNotification(title, message) {
    this.sendToOS('notification', { title, message })
  }

  setTitle(title) {
    this.sendToOS('set-title', { title })
  }
}

// Create singleton instance
const bitcoinOS = new BitcoinOSBridge()

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = bitcoinOS
} else if (typeof define === 'function' && define.amd) {
  define([], function() { return bitcoinOS })
} else {
  window.bitcoinOS = bitcoinOS
}
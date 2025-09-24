'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      // Only register in production
      if (process.env.NODE_ENV === 'production') {
        window.addEventListener('load', async () => {
          try {
            // First, try to unregister any existing service workers
            const registrations = await navigator.serviceWorker.getRegistrations()
            for (let registration of registrations) {
              await registration.unregister()
            }
            
            // Then register our service worker
            const registration = await navigator.serviceWorker.register('/service-worker.js')
            console.log('ServiceWorker registration successful:', registration.scope)
            
            // Check for updates periodically
            const intervalId = setInterval(async () => {
              try {
                await registration.update()
              } catch (error) {
                console.log('ServiceWorker update check failed:', error)
                clearInterval(intervalId)
              }
            }, 60000) // Check every minute
          } catch (err) {
            console.log('ServiceWorker registration failed:', err)
          }
        })
      }
    }
  }, [])

  return null
}
import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'Bitcoin OS - Decentralized Operating System',
  description: 'Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration | By The Bitcoin Corporation LTD',
  openGraph: {
    title: 'Bitcoin OS - Decentralized Operating System',
    description: 'Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration',
    url: 'https://bitcoin-os.vercel.app',
    siteName: 'Bitcoin OS',
    images: [
      {
        url: '/bitcoin-os.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitcoin OS - Decentralized Operating System',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin OS - Decentralized Operating System',
    description: 'Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration',
    images: ['/bitcoin-os.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f7931a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}
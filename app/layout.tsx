import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

export const metadata: Metadata = {
  title: 'Bitcoin OS - Decentralized Operating System',
  description: 'Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration | By The Bitcoin Corporation LTD',
  keywords: 'Bitcoin, OS, Operating System, Blockchain, Cryptocurrency, Wallet, Decentralized Apps, Bitcoin Corporation',
  authors: [{ name: 'The Bitcoin Corporation LTD' }],
  creator: 'The Bitcoin Corporation LTD',
  publisher: 'The Bitcoin Corporation LTD',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitcoin-os.vercel.app',
    siteName: 'Bitcoin OS',
    title: 'Bitcoin OS - Decentralized Operating System',
    description: 'Experience the future with Bitcoin OS - a revolutionary operating system featuring integrated Bitcoin wallet, decentralized apps, and seamless blockchain interaction.',
    images: [
      {
        url: 'https://bitcoin-os.vercel.app/bitcoin-os.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitcoin OS - Decentralized Operating System',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin OS - Decentralized Operating System',
    description: 'Experience the future with Bitcoin OS - a revolutionary operating system featuring integrated Bitcoin wallet, decentralized apps, and seamless blockchain interaction.',
    images: ['https://bitcoin-os.vercel.app/bitcoin-os.jpg'],
    creator: '@BitcoinCorp',
    site: '@BitcoinCorp',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
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
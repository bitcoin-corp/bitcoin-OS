import type { Metadata, Viewport } from 'next'
import './globals.css'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import BitcoinOSLayout from '@/components/BitcoinOSLayout'
import ClientOnlyAuth from '@/components/auth/ClientOnlyAuth'

export const metadata: Metadata = {
  title: 'Bitcoin OS - The Distributed Operating System for Bitcoin',
  description: 'A revolutionary distributed operating system for running Bitcoin apps with tokenized computing resources. Trade GPU, CPU, memory & storage on the $bOS token economy.',
  keywords: 'Bitcoin, OS, Operating System, Distributed Computing, Blockchain, Cryptocurrency, Tokenized Resources, GPU Marketplace, $bOS Token, Bitcoin Apps, Bitcoin Corporation',
  authors: [{ name: 'The Bitcoin Corporation LTD' }],
  creator: 'The Bitcoin Corporation LTD',
  publisher: 'The Bitcoin Corporation LTD',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bitcoin-os.website',
    siteName: 'Bitcoin OS',
    title: 'Bitcoin OS - The Distributed Operating System for Bitcoin',
    description: 'Experience the future with Bitcoin OS - a revolutionary distributed operating system for running Bitcoin apps with tokenized computing resources.',
    images: [
      {
        url: 'https://www.bitcoin-os.website/bitcoin-os-social.png',
        width: 1200,
        height: 630,
        alt: 'Bitcoin OS - The Distributed Operating System',
        type: 'image/png',
      },
      {
        url: 'https://www.bitcoin-os.website/bitcoin-os.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitcoin OS - The Distributed Operating System',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin OS - The Distributed Operating System for Bitcoin',
    description: 'Experience the future with Bitcoin OS - a revolutionary distributed operating system for running Bitcoin apps with tokenized computing resources.',
    images: ['https://www.bitcoin-os.website/bitcoin-os-social.png', 'https://www.bitcoin-os.website/bitcoin-os.jpg'],
    creator: '@Bitcoin_OS_X',
    site: '@Bitcoin_OS_X',
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
        <ClientOnlyAuth>
          <BitcoinOSLayout>
            {children}
          </BitcoinOSLayout>
        </ClientOnlyAuth>
      </body>
    </html>
  )
}
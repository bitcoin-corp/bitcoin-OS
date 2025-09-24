import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bitcoin OS - Decentralized Operating System',
  description: 'Bitcoin-powered operating system with built-in wallet, decentralized apps, and blockchain integration | By THE BITCOIN CORPORATION LTD',
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
        {children}
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bitcoin Accelerator - Scale Your On-Chain Business',
  description: 'Elite training program for exceptional entrepreneurs to scale their businesses on the Bitcoin blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
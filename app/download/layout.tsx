import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download Bitcoin OS - 50+ Open Source Bitcoin Apps',
  description: 'Download Bitcoin OS for macOS and Chrome, plus 50+ open source Bitcoin apps. Includes the Path 401/402/403 protocol stack, BitGit CLI, and the full bApps suite.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bitcoin-os.website/download',
    siteName: 'Bitcoin OS',
    title: 'Download Bitcoin OS - 50+ Open Source Bitcoin Apps',
    description: 'Download Bitcoin OS for macOS and Chrome, plus 50+ open source Bitcoin apps. Includes the Path 401/402/403 protocol stack, BitGit CLI, and the full bApps suite.',
    images: [
      {
        url: 'https://www.bitcoin-os.website/bitcoin-os-social.png',
        width: 1200,
        height: 630,
        alt: 'Download Bitcoin OS - 50+ Open Source Bitcoin Apps',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Bitcoin OS - 50+ Open Source Bitcoin Apps',
    description: 'Download Bitcoin OS for macOS and Chrome, plus 50+ open source Bitcoin apps. Path 401/402/403 protocol stack, BitGit CLI, and the full bApps suite.',
    images: ['https://www.bitcoin-os.website/bitcoin-os-social.png'],
    creator: '@Bitcoin_OS_X',
    site: '@Bitcoin_OS_X',
  },
}

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

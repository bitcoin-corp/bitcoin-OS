/**
 * Metanet Wallet Demo Page
 * Demonstrates Bitcoin OS integration with metanet-desktop
 */

import MetanetWalletDemo from '@/components/MetanetWalletDemo'

export default function WalletDemoPage() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <MetanetWalletDemo />
    </div>
  )
}

export const metadata = {
  title: 'Metanet Wallet Demo - Bitcoin OS',
  description: 'Demonstration of Bitcoin OS integration with metanet-desktop wallet',
}
/**
 * BRC Standards Demo Page
 * Demonstrates Bitcoin OS integration with BSV BRC specifications
 */

import BRCDemo from '@/components/BRCDemo'

export default function BRCDemoPage() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4">
      <BRCDemo />
    </div>
  )
}

export const metadata = {
  title: 'BRC Standards Demo - Bitcoin OS',
  description: 'Demonstration of Bitcoin OS integration with BSV BRC specifications',
}
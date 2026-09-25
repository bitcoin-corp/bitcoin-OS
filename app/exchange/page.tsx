import Link from 'next/link'

export const metadata = {
  title: 'Exchange (Preview only) | Bitcoin OS',
  description: 'The Bitcoin OS exchange is a design preview. It is not a live exchange and does not accept deposits.',
}

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full border border-yellow-600/50 bg-yellow-900/10 rounded-lg p-8">
        <p className="text-xs uppercase tracking-widest text-yellow-400 mb-3">Preview only</p>
        <h1 className="text-3xl font-bold mb-4">Not a live exchange. Do not send funds.</h1>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            The Bitcoin OS exchange is a design concept. There is no live market, no order book,
            no trading and no custody of funds. It does not accept deposits and cannot process withdrawals.
          </p>
          <p>
            Any figures previously shown on this page (prices, volumes, fees, holder payouts or yields)
            were illustrative placeholders, not real data. No dividends, revenue share or other returns
            are offered.
          </p>
          <p>
            If anyone gives you a deposit address claiming to be the Bitcoin OS exchange, do not use it.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="px-4 py-2 rounded bg-white text-black font-medium hover:bg-gray-200">
            Back to Bitcoin OS
          </Link>
          <a
            href="https://github.com/bitcoin-corp/bitcoin-OS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded border border-gray-600 hover:border-gray-400"
          >
            View the source on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

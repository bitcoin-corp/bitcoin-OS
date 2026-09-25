import { NextResponse } from 'next/server'

// Exchange is a design preview only; no market data is served.
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'The Bitcoin OS exchange is a preview only and is not live. No market data is available.',
    },
    { status: 503 }
  )
}

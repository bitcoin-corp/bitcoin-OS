import { NextResponse } from 'next/server'

// The server-side wallet API was an unauthenticated mock (backup, restore,
// sign, broadcast, etc.). It has been removed. Wallet operations must happen
// client-side in the user's own wallet.
function removed() {
  return NextResponse.json(
    { success: false, error: 'Not found. The server-side wallet API has been removed.' },
    { status: 404 }
  )
}

export async function GET() {
  return removed()
}

export async function POST() {
  return removed()
}

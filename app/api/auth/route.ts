import { NextResponse } from 'next/server'

// Signature-based login is not implemented. The previous handler issued
// session tokens without verifying the signature, so it has been disabled
// until real verification exists.
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Not implemented. Wallet sign-in is not available yet.' },
    { status: 501 }
  )
}

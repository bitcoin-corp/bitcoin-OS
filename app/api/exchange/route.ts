import { NextResponse } from 'next/server'

// The Bitcoin OS exchange is a design preview only. There is no live market,
// no custody and no deposit/withdrawal support. Every endpoint returns 503 so
// no client can ever be handed a (fake) deposit address or mock balances.
const UNAVAILABLE = {
  success: false,
  error:
    'The Bitcoin OS exchange is a preview only and is not live. Deposits, withdrawals and trading are not available. Do not send funds.',
}

function unavailable() {
  return NextResponse.json(UNAVAILABLE, { status: 503 })
}

export async function GET() {
  return unavailable()
}

export async function POST() {
  return unavailable()
}

export async function DELETE() {
  return unavailable()
}

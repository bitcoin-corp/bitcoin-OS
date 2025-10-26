import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Mock market data for Bitcoin exchange
  const markets = [
    {
      id: 'bsv-usd',
      name: 'BSV/USD',
      price: '50.25',
      change: '+2.5%',
      volume: '1,250,000'
    },
    {
      id: 'btc-usd', 
      name: 'BTC/USD',
      price: '43,500.00',
      change: '-1.2%',
      volume: '850,000'
    }
  ]
  
  return NextResponse.json(markets)
}
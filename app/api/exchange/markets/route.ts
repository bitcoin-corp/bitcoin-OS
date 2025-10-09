import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Forward to main exchange route
  const baseUrl = new URL(request.url).origin
  const response = await fetch(`${baseUrl}/api/exchange/markets`, {
    method: 'GET',
    headers: request.headers
  })
  
  return response
}
import { NextRequest, NextResponse } from 'next/server'
import { brc100Wallet } from '@/lib/brc100'
import { randomBytes } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'challenge':
        // Generate authentication challenge
        const challenge = randomBytes(32).toString('hex')
        const timestamp = Date.now()
        const origin = request.headers.get('origin') || 'unknown'
        
        // Store challenge temporarily (in production, use Redis or similar)
        const challengeData = {
          challenge,
          timestamp,
          origin,
          expires: timestamp + (5 * 60 * 1000) // 5 minutes
        }
        
        return NextResponse.json({ 
          success: true, 
          challenge,
          timestamp,
          expires: challengeData.expires
        })

      case 'verify':
        const { signature, publicKey, challenge: userChallenge, timestamp: userTimestamp } = body
        
        // Verify signature against challenge
        try {
          const identity = await brc100Wallet.getIdentity()
          if (!identity) {
            return NextResponse.json({ 
              success: false, 
              error: 'No identity available' 
            }, { status: 401 })
          }

          // In production, verify the actual signature
          const messageToSign = `${userChallenge}:${userTimestamp}:${request.headers.get('origin')}`
          
          // Mock verification for now
          const isValidSignature = signature && publicKey && userChallenge
          
          if (isValidSignature) {
            // Generate session token
            const sessionToken = randomBytes(32).toString('hex')
            const sessionData = {
              token: sessionToken,
              identity: identity.id,
              publicKey: identity.publicKey,
              origin: request.headers.get('origin'),
              createdAt: Date.now(),
              expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
            }

            return NextResponse.json({ 
              success: true, 
              sessionToken,
              identity: {
                id: identity.id,
                address: identity.address,
                publicKey: identity.publicKey
              }
            })
          } else {
            return NextResponse.json({ 
              success: false, 
              error: 'Invalid signature' 
            }, { status: 401 })
          }
        } catch (error) {
          return NextResponse.json({ 
            success: false, 
            error: 'Signature verification failed' 
          }, { status: 401 })
        }

      case 'session':
        const { sessionToken } = body
        
        // Verify session token (in production, check against stored sessions)
        if (sessionToken && sessionToken.length === 64) {
          const identity = await brc100Wallet.getIdentity()
          return NextResponse.json({ 
            success: true, 
            valid: true,
            identity: identity ? {
              id: identity.id,
              address: identity.address,
              publicKey: identity.publicKey
            } : null
          })
        } else {
          return NextResponse.json({ 
            success: false, 
            valid: false,
            error: 'Invalid session token' 
          }, { status: 401 })
        }

      case 'logout':
        const { sessionToken: logoutToken } = body
        
        // Invalidate session (in production, remove from store)
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Authentication error' 
    }, { status: 500 })
  }
}
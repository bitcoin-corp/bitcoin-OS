import { NextRequest, NextResponse } from 'next/server'
import { brc100Wallet } from '@/lib/brc100'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')

  try {
    switch (action) {
      case 'identity':
        const identity = await brc100Wallet.getIdentity()
        return NextResponse.json({ success: true, identity })

      case 'balance':
        const balance = await brc100Wallet.getBalance()
        return NextResponse.json({ success: true, balance })

      case 'address':
        const address = await brc100Wallet.getAddress()
        return NextResponse.json({ success: true, address })

      case 'certificates':
        const certificates = await brc100Wallet.getCertificates()
        return NextResponse.json({ success: true, certificates })

      case 'permissions':
        const origin = searchParams.get('origin')
        const permissions = await brc100Wallet.getPermissions(origin || undefined)
        return NextResponse.json({ success: true, permissions })

      case 'ordinals':
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
        const filter = searchParams.get('filter') as 'all' | 'images' | 'text' | 'json' | undefined
        const ordinals = await brc100Wallet.getOrdinals({ limit, offset, filter })
        return NextResponse.json({ success: true, ordinals })

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Wallet API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'create_identity':
        const identity = await brc100Wallet.createIdentity(body.options)
        return NextResponse.json({ success: true, identity })

      case 'sign_message':
        const signature = await brc100Wallet.signMessage(body.request)
        return NextResponse.json({ success: true, signature })

      case 'create_certificate':
        const certificate = await brc100Wallet.createCertificate(body.data)
        return NextResponse.json({ success: true, certificate })

      case 'verify_certificate':
        const isValid = await brc100Wallet.verifyCertificate(body.certificate)
        return NextResponse.json({ success: true, isValid })

      case 'create_transaction':
        const transaction = await brc100Wallet.createTransaction(body.request)
        return NextResponse.json({ success: true, transaction })

      case 'sign_transaction':
        const signedTx = await brc100Wallet.signTransaction(body.rawTx)
        return NextResponse.json({ success: true, signedTx })

      case 'broadcast_transaction':
        const txid = await brc100Wallet.broadcastTransaction(body.rawTx)
        return NextResponse.json({ success: true, txid })

      case 'backup':
        const backup = await brc100Wallet.backup()
        return NextResponse.json({ success: true, backup })

      case 'restore':
        await brc100Wallet.restore(body.backup)
        return NextResponse.json({ success: true })

      case 'request_permissions':
        const granted = await brc100Wallet.requestPermissions(body.permissions)
        return NextResponse.json({ success: true, granted })

      case 'revoke_permissions':
        await brc100Wallet.revokePermissions(body.origin)
        return NextResponse.json({ success: true })

      case 'transfer_ordinal':
        const transferTxid = await brc100Wallet.transferOrdinal(body.ordinal, body.to)
        return NextResponse.json({ success: true, txid: transferTxid })

      case 'inscribe':
        const inscribeTxid = await brc100Wallet.inscribe(body.request)
        return NextResponse.json({ success: true, txid: inscribeTxid })

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Wallet API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
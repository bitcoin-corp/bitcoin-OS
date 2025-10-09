import { NextRequest, NextResponse } from 'next/server'

// Mock exchange data for development
// In production, this would connect to a real exchange backend
const mockMarkets = [
  {
    id: 'BTC-USD',
    baseAsset: 'BTC',
    quoteAsset: 'USD',
    price: 98450.25,
    volume24h: 1250000,
    change24h: 2.45,
    high24h: 99200,
    low24h: 96800,
    bid: 98445,
    ask: 98455
  },
  {
    id: 'BSV-USD',
    baseAsset: 'BSV',
    quoteAsset: 'USD',
    price: 95.20,
    volume24h: 450000,
    change24h: -1.2,
    high24h: 97.50,
    low24h: 94.80,
    bid: 95.15,
    ask: 95.25
  },
  {
    id: 'BSV-BTC',
    baseAsset: 'BSV',
    quoteAsset: 'BTC',
    price: 0.000967,
    volume24h: 125,
    change24h: -3.4,
    high24h: 0.000985,
    low24h: 0.000962,
    bid: 0.000966,
    ask: 0.000968
  }
]

const mockBalances = [
  { asset: 'BTC', available: 0.5423, locked: 0.0, total: 0.5423 },
  { asset: 'BSV', available: 125.789, locked: 10.0, total: 135.789 },
  { asset: 'USD', available: 5420.50, locked: 500.0, total: 5920.50 }
]

const mockOrders: any[] = []
const mockTrades: any[] = []
const mockTransactions: any[] = []

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url)
  const { searchParams } = new URL(request.url)

  try {
    // Markets endpoint
    if (pathname.endsWith('/markets')) {
      return NextResponse.json({
        success: true,
        markets: mockMarkets
      })
    }

    // Order book endpoint
    if (pathname.includes('/orderbook/')) {
      const marketId = pathname.split('/orderbook/')[1]
      const market = mockMarkets.find(m => m.id === marketId)
      
      if (!market) {
        return NextResponse.json({
          success: false,
          error: 'Market not found'
        }, { status: 404 })
      }

      // Generate mock order book
      const orderbook = {
        bids: Array.from({ length: 20 }, (_, i) => ({
          price: market.bid - (i * 0.1),
          quantity: Math.random() * 10,
          total: 0
        })).map(level => ({
          ...level,
          total: level.price * level.quantity
        })),
        asks: Array.from({ length: 20 }, (_, i) => ({
          price: market.ask + (i * 0.1),
          quantity: Math.random() * 10,
          total: 0
        })).map(level => ({
          ...level,
          total: level.price * level.quantity
        })),
        timestamp: Date.now()
      }

      return NextResponse.json({
        success: true,
        orderbook
      })
    }

    // Balances endpoint
    if (pathname.endsWith('/balances')) {
      return NextResponse.json({
        success: true,
        balances: mockBalances
      })
    }

    // Orders endpoint
    if (pathname.endsWith('/orders')) {
      const marketId = searchParams.get('market')
      const orders = marketId 
        ? mockOrders.filter(o => o.market === marketId)
        : mockOrders

      return NextResponse.json({
        success: true,
        orders
      })
    }

    // Trades endpoint
    if (pathname.endsWith('/trades')) {
      const marketId = searchParams.get('market')
      const limit = parseInt(searchParams.get('limit') || '50')
      
      let trades = marketId
        ? mockTrades.filter(t => t.market === marketId)
        : mockTrades

      trades = trades.slice(0, limit)

      return NextResponse.json({
        success: true,
        trades
      })
    }

    // Transactions endpoint
    if (pathname.endsWith('/transactions')) {
      const limit = parseInt(searchParams.get('limit') || '50')
      const transactions = mockTransactions.slice(0, limit)

      return NextResponse.json({
        success: true,
        transactions
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid endpoint'
    }, { status: 404 })

  } catch (error) {
    console.error('Exchange API error:', error)
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
      case 'place_order': {
        const order = {
          id: `ORD-${Date.now()}`,
          market: body.order.market,
          type: body.order.type || 'limit',
          side: body.order.side,
          price: body.order.price,
          quantity: body.order.quantity,
          filled: 0,
          remaining: body.order.quantity,
          status: 'open',
          timestamp: new Date(),
          fee: body.order.quantity * (body.order.price || 0) * 0.002
        }

        mockOrders.push(order)

        // Update balance (mock)
        const asset = order.market.split('-')[0]
        const balance = mockBalances.find(b => b.asset === asset)
        if (balance && order.side === 'sell') {
          balance.available -= order.quantity
          balance.locked += order.quantity
        }

        return NextResponse.json({
          success: true,
          order
        })
      }

      case 'cancel_order': {
        const orderId = body.orderId
        const orderIndex = mockOrders.findIndex(o => o.id === orderId)
        
        if (orderIndex === -1) {
          return NextResponse.json({
            success: false,
            error: 'Order not found'
          }, { status: 404 })
        }

        const order = mockOrders[orderIndex]
        order.status = 'cancelled'

        // Update balance (mock)
        if (order.side === 'sell') {
          const asset = order.market.split('-')[0]
          const balance = mockBalances.find(b => b.asset === asset)
          if (balance) {
            balance.available += order.remaining
            balance.locked -= order.remaining
          }
        }

        return NextResponse.json({
          success: true,
          order
        })
      }

      case 'deposit': {
        const transaction = {
          id: `TXN-${Date.now()}`,
          type: 'deposit',
          asset: body.asset,
          amount: body.amount,
          status: 'pending',
          timestamp: new Date()
        }

        mockTransactions.push(transaction)

        // Generate deposit address (mock)
        const depositAddress = `bc1q${Math.random().toString(36).substring(2, 15)}`

        return NextResponse.json({
          success: true,
          transaction,
          depositAddress
        })
      }

      case 'withdraw': {
        const { asset, amount, address } = body
        
        // Check balance
        const balance = mockBalances.find(b => b.asset === asset)
        if (!balance || balance.available < amount) {
          return NextResponse.json({
            success: false,
            error: 'Insufficient balance'
          }, { status: 400 })
        }

        const transaction = {
          id: `TXN-${Date.now()}`,
          type: 'withdraw',
          asset,
          amount,
          address,
          status: 'pending',
          timestamp: new Date(),
          txid: `${Math.random().toString(36).substring(2, 15)}`
        }

        mockTransactions.push(transaction)
        
        // Update balance
        balance.available -= amount
        balance.total -= amount

        return NextResponse.json({
          success: true,
          transaction
        })
      }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action'
        }, { status: 400 })
    }
  } catch (error) {
    console.error('Exchange API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { pathname } = new URL(request.url)
  
  try {
    // Cancel order endpoint
    if (pathname.includes('/orders/')) {
      const orderId = pathname.split('/orders/')[1]
      const orderIndex = mockOrders.findIndex(o => o.id === orderId)
      
      if (orderIndex === -1) {
        return NextResponse.json({
          success: false,
          error: 'Order not found'
        }, { status: 404 })
      }

      const order = mockOrders[orderIndex]
      order.status = 'cancelled'

      // Update balance (mock)
      if (order.side === 'sell') {
        const asset = order.market.split('-')[0]
        const balance = mockBalances.find(b => b.asset === asset)
        if (balance) {
          balance.available += order.remaining
          balance.locked -= order.remaining
        }
      }

      return NextResponse.json({
        success: true,
        order
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid endpoint'
    }, { status: 404 })

  } catch (error) {
    console.error('Exchange API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
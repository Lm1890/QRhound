import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import QRCode from 'qrcode'
import crypto from 'crypto'
function nanoid(size) { return crypto.randomBytes(size).toString('base64url').slice(0, size) }

export async function POST(request) {
  try {
    const { url, title } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    const shortCode = nanoid(8)
    const adminToken = nanoid(24)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const trackingUrl = `${appUrl}/r/${shortCode}`

    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(trackingUrl, {
      width: 512,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    })

    // Save to database
    const { data, error } = await getSupabase()
      .from('qr_codes')
      .insert({
        short_code: shortCode,
        target_url: url,
        title: title || null,
        admin_token: adminToken,
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save QR code' }, { status: 500 })
    }

    return NextResponse.json({
      id: data.id,
      shortCode,
      adminToken,
      trackingUrl,
      targetUrl: url,
      qrDataUrl,
      dashboardUrl: `${appUrl}/dashboard/${data.id}?token=${adminToken}`,
    })
  } catch (err) {
    console.error('QR generation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

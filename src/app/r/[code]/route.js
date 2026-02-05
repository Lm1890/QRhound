import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { parseDevice } from '@/lib/utils'

export async function GET(request, { params }) {
  const { code } = params

  // Look up the QR code
  const { data: qrCode, error } = await supabase
    .from('qr_codes')
    .select('id, target_url, scan_count')
    .eq('short_code', code)
    .single()

  if (error || !qrCode) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Extract tracking data from headers
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const referrer = request.headers.get('referer') || ''
  const country = request.headers.get('x-vercel-ip-country') ||
                  request.headers.get('cf-ipcountry') || null
  const city = request.headers.get('x-vercel-ip-city') || null

  // Log the scan (fire and forget — don't block the redirect)
  supabase.from('scans').insert({
    qr_code_id: qrCode.id,
    ip_address: ip,
    user_agent: userAgent,
    referrer: referrer,
    country: country,
    city: city ? decodeURIComponent(city) : null,
    device_type: parseDevice(userAgent),
  }).then(() => {})

  // Increment scan count
  supabase.from('qr_codes')
    .update({ scan_count: (qrCode.scan_count || 0) + 1 })
    .eq('id', qrCode.id)
    .then(() => {})

  // Redirect to target
  return NextResponse.redirect(qrCode.target_url, { status: 302 })
}

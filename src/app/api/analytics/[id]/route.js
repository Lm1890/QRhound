import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(request, { params }) {
  const { id } = params
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Admin token required' }, { status: 401 })
  }

  // Verify admin token
  const supabase = getSupabase()

  const { data: qrCode, error: qrError } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('id', id)
    .eq('admin_token', token)
    .single()

  if (qrError || !qrCode) {
    return NextResponse.json({ error: 'Not found or invalid token' }, { status: 404 })
  }

  // Get scan data
  const { data: scans, error: scanError } = await supabase
    .from('scans')
    .select('*')
    .eq('qr_code_id', id)
    .order('scanned_at', { ascending: false })
    .limit(200)

  if (scanError) {
    return NextResponse.json({ error: 'Failed to fetch scans' }, { status: 500 })
  }

  // Compute daily scan counts for last 30 days
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const dailyCounts = {}
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    dailyCounts[d.toISOString().split('T')[0]] = 0
  }
  scans.forEach(scan => {
    const day = scan.scanned_at.split('T')[0]
    if (dailyCounts[day] !== undefined) {
      dailyCounts[day]++
    }
  })

  const todayStr = now.toISOString().split('T')[0]
  const todayScans = dailyCounts[todayStr] || 0

  // Device breakdown
  const devices = {}
  scans.forEach(s => {
    devices[s.device_type || 'Unknown'] = (devices[s.device_type || 'Unknown'] || 0) + 1
  })

  // Country breakdown
  const countries = {}
  scans.forEach(s => {
    const c = s.country || 'Unknown'
    countries[c] = (countries[c] || 0) + 1
  })

  return NextResponse.json({
    qrCode: {
      id: qrCode.id,
      shortCode: qrCode.short_code,
      targetUrl: qrCode.target_url,
      title: qrCode.title,
      totalScans: scans.length,
      todayScans,
      createdAt: qrCode.created_at,
    },
    dailyCounts: Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    devices,
    countries,
    recentScans: scans.slice(0, 50).map(s => ({
      time: s.scanned_at,
      country: s.country || 'Unknown',
      city: s.city || '',
      device: s.device_type || 'Unknown',
      referrer: s.referrer || 'Direct',
    })),
  })
}

'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { timeAgo } from '@/lib/utils'

export default function Dashboard() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setError('Missing admin token. Use the dashboard link you received when creating the QR code.')
      setLoading(false)
      return
    }

    fetch(`/api/analytics/${params.id}?token=${token}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found or invalid token')
        return res.json()
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [params.id, searchParams])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-gray-400 text-lg">Loading analytics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-2">Error</h1>
        <p className="text-gray-400">{error}</p>
      </div>
    )
  }

  const { qrCode, dailyCounts, devices, countries, recentScans } = data
  const maxDailyCount = Math.max(...dailyCounts.map(d => d.count), 1)

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{qrCode.title || 'Untitled QR Code'}</h1>
        <p className="text-gray-400 mt-1">
          Created {new Date(qrCode.createdAt).toLocaleDateString()} &middot;
          Target: <a href={qrCode.targetUrl} className="text-brand-400 hover:underline" target="_blank" rel="noopener noreferrer">{qrCode.targetUrl}</a>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 font-medium">Total Scans</p>
          <p className="text-4xl font-extrabold text-gradient mt-1">{qrCode.totalScans}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 font-medium">Today</p>
          <p className="text-4xl font-extrabold text-white mt-1">{qrCode.todayScans}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 font-medium">Tracking URL</p>
          <code className="text-sm text-gray-300 mt-2 block truncate">
            {typeof window !== 'undefined' ? window.location.origin : ''}/r/{qrCode.shortCode}
          </code>
        </div>
      </div>

      {/* Chart: Scans over time */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Scans &mdash; Last 30 Days</h2>
        <div className="flex items-end gap-[3px] h-40">
          {dailyCounts.map(day => (
            <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
              <div
                className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t transition-all hover:brightness-125 min-h-[2px]"
                style={{ height: `${Math.max((day.count / maxDailyCount) * 100, day.count > 0 ? 8 : 2)}%` }}
              />
              <div className="absolute -top-8 bg-white/10 backdrop-blur-sm text-gray-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                {day.date}: {day.count} scan{day.count !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{dailyCounts[0]?.date}</span>
          <span>{dailyCounts[dailyCounts.length - 1]?.date}</span>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Devices */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Devices</h2>
          {Object.keys(devices).length === 0 ? (
            <p className="text-sm text-gray-500">No scans yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(devices)
                .sort((a, b) => b[1] - a[1])
                .map(([device, count]) => (
                  <div key={device}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">{device}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all"
                        style={{ width: `${(count / qrCode.totalScans) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Countries */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Countries</h2>
          {Object.keys(countries).length === 0 ? (
            <p className="text-sm text-gray-500">No scans yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(countries)
                .sort((a, b) => b[1] - a[1])
                .map(([country, count]) => (
                  <div key={country}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-300">{country}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all"
                        style={{ width: `${(count / qrCode.totalScans) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Scans</h2>
        {recentScans.length === 0 ? (
          <p className="text-sm text-gray-500">No scans yet. Share your QR code to start tracking!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-gray-400">
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Device</th>
                  <th className="pb-2 font-medium">Referrer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentScans.map((scan, i) => (
                  <tr key={i}>
                    <td className="py-2 text-gray-300">{timeAgo(scan.time)}</td>
                    <td className="py-2 text-gray-300">{scan.city ? `${scan.city}, ${scan.country}` : scan.country}</td>
                    <td className="py-2 text-gray-300">{scan.device}</td>
                    <td className="py-2 text-gray-500 truncate max-w-[200px]">{scan.referrer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import GenieAnimation from '@/components/GenieAnimation'

export default function Home() {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleGenerate(e) {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    let targetUrl = url.trim()
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl
    }

    setLoading(true)
    try {
      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl, title: title.trim() || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate QR code')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    if (!result?.qrDataUrl) return
    const link = document.createElement('a')
    link.download = `qrhound-${result.shortCode}.png`
    link.href = result.qrDataUrl
    link.click()
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side: text + form */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                QR Codes That <span className="text-brand-600">Track</span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0">
                Generate QR codes and see exactly who scans them. Real-time analytics, no signup required.
              </p>

              {/* Generator */}
              <form id="generator" onSubmit={handleGenerate} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-lg mx-auto lg:mx-0">
                <input
                  type="text"
                  placeholder="Paste your URL here..."
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent mb-3"
                />
                <input
                  type="text"
                  placeholder="Label (optional)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent mb-4"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Generating...' : 'Generate QR Code'}
                </button>
                {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
              </form>
            </div>

            {/* Right side: animated genie */}
            <div className="flex-shrink-0 hidden md:block">
              <GenieAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Result */}
      {result && (
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex flex-col items-center gap-4">
                  <img src={result.qrDataUrl} alt="QR Code" className="w-48 h-48 rounded-lg" />
                  <button
                    onClick={handleDownload}
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Download PNG
                  </button>
                </div>
                <div className="flex-1 space-y-4 text-left">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tracking URL</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-3 py-2 rounded text-sm flex-1 overflow-x-auto">{result.trackingUrl}</code>
                      <button
                        onClick={() => handleCopy(result.trackingUrl)}
                        className="text-brand-600 hover:text-brand-700 text-sm font-medium whitespace-nowrap"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Target</p>
                    <p className="text-sm text-gray-700 mt-1 truncate">{result.targetUrl}</p>
                  </div>
                  <a
                    href={result.dashboardUrl}
                    className="inline-block bg-brand-100 text-brand-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-200 transition"
                  >
                    View Analytics Dashboard &rarr;
                  </a>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-xs font-medium">
                      Bookmark your dashboard link! It&apos;s the only way to access your analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why QRhound?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '1', title: 'Generate', desc: 'Paste any URL and get a trackable QR code in seconds. No signup needed.' },
              { icon: '2', title: 'Share', desc: 'Print it, embed it, share it anywhere. Every scan is tracked automatically.' },
              { icon: '3', title: 'Analyze', desc: 'See total scans, devices, locations, and trends on your private dashboard.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="font-bold text-lg mb-1">Free</h3>
              <p className="text-3xl font-extrabold mb-4">$0</p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>&#10003; 5 QR codes</li>
                <li>&#10003; Scan count tracking</li>
                <li>&#10003; Device detection</li>
                <li>&#10003; Download as PNG</li>
              </ul>
              <a href="#generator" className="block text-center bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                Get Started
              </a>
            </div>
            <div className="bg-white rounded-xl border-2 border-brand-500 p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
              <h3 className="font-bold text-lg mb-1">Pro</h3>
              <p className="text-3xl font-extrabold mb-4">$5<span className="text-lg font-normal text-gray-500">/mo</span></p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>&#10003; Unlimited QR codes</li>
                <li>&#10003; Full analytics dashboard</li>
                <li>&#10003; Geographic data</li>
                <li>&#10003; Scan history &amp; export</li>
                <li>&#10003; Priority support</li>
              </ul>
              <a href="#generator" className="block text-center bg-brand-600 text-white py-2 rounded-lg font-medium hover:bg-brand-700 transition">
                Go Pro
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QRhound - QR Codes That Track',
  description: 'QRhound generates QR codes with built-in scan analytics. Track who scans, when, and where — in real time.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0f0a1e] text-gray-100`}>
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0a1e]/80 backdrop-blur-lg">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-gradient">QRhound</a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/#pricing" className="text-gray-400 hover:text-gray-100 transition">Pricing</a>
              <a href="/#generator" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-lg hover:brightness-110 transition btn-glow">
                Create QR Code
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
            QRhound &mdash; QR codes with bite.
          </div>
        </footer>
      </body>
    </html>
  )
}

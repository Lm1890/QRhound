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
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-brand-600">QRhound</a>
            <div className="flex items-center gap-6 text-sm">
              <a href="/#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/#generator" className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition">
                Create QR Code
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-gray-200 bg-white mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
            QRhound &mdash; QR codes with bite.
          </div>
        </footer>
      </body>
    </html>
  )
}

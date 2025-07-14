import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'code converter',
  description: 'Created by Surya Akkala',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

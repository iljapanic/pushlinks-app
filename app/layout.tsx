import { Inter } from 'next/font/google'

import SupabaseProvider from './supabase-provider'
import '@/styles/globals.css'
import Header from './header'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'Welcome to Pushlinks!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <Header />
          <div>{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  )
}

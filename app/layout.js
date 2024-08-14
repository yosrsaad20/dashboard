import { Inter } from 'next/font/google'
import './ui/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'Next.js huawei dashboard app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
             <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter&display=swap"  />
         <link rel="icon" href="/huaweilogo.png" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}

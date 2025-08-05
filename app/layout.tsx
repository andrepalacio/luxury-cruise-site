import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google';
import './globals.css'
import WelcomeOverlay from '@/components/WelcomeOverlay';

const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Expery Travel',
  description: 'Explore luxury travel experiences with Expery Travel',
  // generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={notoSerif.className}>
      <body>
        <WelcomeOverlay />
        {children}
      </body>
    </html>
  )
}

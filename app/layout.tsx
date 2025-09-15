import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google';
import './globals.css'
import WelcomeOverlay from '@/components/WelcomeOverlay';

const notoSerif = Noto_Serif({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Expery Travel - Cruceros de Lujo y Experiencias Exclusivas',
  description: 'Explora el lujo de viajar con Expery Travel: cruceros exclusivos, destinos de ensueño y experiencias personalizadas.',
  openGraph: {
    title: 'Expery Travel - Cruceros de Lujo',
    description: 'Descubre cruceros exclusivos y experiencias personalizadas con Expery Travel.',
    url: 'https://experytravel.com',
    siteName: 'Expery Travel',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expery Travel - Cruceros de Lujo',
    description: 'Descubre cruceros exclusivos y experiencias personalizadas.',
    site: '@experytravel',
    images: ['https://experytravel.com/twitter-image.jpg']
  },
  // alternates: {
  //   canonical: 'https://experytravel.com',
  // },
  generator: 'Next.js',
  keywords: ['cruceros de lujo', 'viajes exclusivos', 'Expery Travel', 'destinos de ensueño', 'servicio premium', 'viajes premium', 'experiencias personalizadas'],
  robots: 'index, follow',
  authors: [{ name: 'Expery Travel', url: 'https://experytravel.com' }],
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

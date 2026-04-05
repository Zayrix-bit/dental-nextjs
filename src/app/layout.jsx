import { siteInfo } from '@/data/siteData';
import config from '@/config';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  metadataBase: new URL(config.seo.metadataBase),
  title: {
    default: `${config.name} — ${config.tagline}`,
    template: `%s | ${config.name}`,
  },
  description: config.seo.defaultDescription,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: `${config.name} — ${config.tagline}`,
    description: config.seo.defaultDescription,
    url: '/',
    siteName: config.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.name} — ${config.tagline}`,
    description: config.seo.defaultDescription,
  },
};

import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import Preloader from '@/components/ui/Preloader';
import FloatingCTA from '@/components/ui/FloatingCTA';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: config.name,
    image: `${config.seo.siteUrl}/images/hero-bg.png`,
    '@id': config.seo.siteUrl,
    url: config.seo.siteUrl,
    telephone: config.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address.street,
      addressLocality: config.contact.address.city,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.geo.latitude,
      longitude: config.geo.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00'
      }
    ]
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        {/* Global Background Accents */}
        <div className="fixed inset-0 bg-abstract-waves pointer-events-none -z-10" />
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <FloatingCTA />
          <StickyMobileCTA />
        </SmoothScrollProvider>
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

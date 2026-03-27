import { siteInfo } from '@/data/siteData';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata = {
  metadataBase: new URL('https://dentalclinic.com'),
  title: {
    default: `${siteInfo.name} — ${siteInfo.tagline}`,
    template: `%s | ${siteInfo.name}`,
  },
  description: 'Providing exceptional dental care with modern technology and compassionate service.',
  openGraph: {
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: 'Providing exceptional dental care with modern technology and compassionate service.',
    url: '/',
    siteName: siteInfo.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteInfo.name} — ${siteInfo.tagline}`,
    description: 'Providing exceptional dental care with modern technology.',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: siteInfo.name,
    image: 'https://dentalclinic.com/images/hero-bg.png',
    '@id': 'https://dentalclinic.com',
    url: 'https://dentalclinic.com',
    telephone: siteInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Dental Street, Medical District',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7484405,
      longitude: -73.9878531
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
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.expresservisapple.cz'),
  title: 'Expres Servis Apple Brno | Opravy iPhone, iPad, MacBook na počkání',
  description:
    'Expresní servis a opravy Apple zařízení v Brně. Opravy iPhone, iPad a MacBook do hodiny. Originální díly, 24 měsíců záruka, diagnostika zdarma k opravě. Kosmova 4, Brno.',
  keywords: [
    'servis apple brno',
    'oprava iphone brno',
    'oprava ipad brno',
    'servis macbook brno',
    'výměna displeje iphone',
    'výměna baterie iphone',
    'apple servis brno',
    'expresní oprava iphone',
  ],
  authors: [{ name: 'Expres Servis Apple Brno' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.expresservisapple.cz' },
  openGraph: {
    title: 'Expres Servis Apple Brno | Opravy iPhone, iPad, MacBook na počkání',
    description:
      'Expresní servis Apple zařízení v Brně. Originální díly, 24 měsíců záruka, diagnostika zdarma k opravě.',
    url: 'https://www.expresservisapple.cz',
    siteName: 'Expres Servis Apple Brno',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Expres Servis Apple Brno',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expres Servis Apple Brno',
    description: 'Expresní opravy iPhone, iPad, MacBook v Brně. Na počkání.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://www.expresservisapple.cz/#business',
              name: 'Expres Servis Apple Brno',
              description:
                'Expresní servis a opravy Apple zařízení v Brně. iPhone, iPad, MacBook.',
              url: 'https://www.expresservisapple.cz',
              telephone: '+420777041184',
              email: 'info@expresservisapple.cz',
              taxID: 'CZ07042515',
              vatID: 'CZ07042515',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kosmova 4',
                addressLocality: 'Brno',
                postalCode: '612 00',
                addressCountry: 'CZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 49.1938,
                longitude: 16.6037,
              },
              areaServed: {
                '@type': 'City',
                name: 'Brno',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '08:30',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              currenciesAccepted: 'CZK',
              paymentAccepted: 'Cash, Credit Card',
              image: 'https://www.expresservisapple.cz/og-image.jpg',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servisní služby',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Výměna displeje iPhone',
                      description:
                        'Expresní výměna displeje pro všechny modely iPhone',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Výměna baterie iPhone',
                      description: 'Výměna baterie iPhone na počkání',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Servis MacBook',
                      description:
                        'Opravy MacBook Air a Pro: displej, klávesnice, logická deska',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Oprava iPad',
                      description: 'Profesionální opravy iPadů všech generací',
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Jak dlouho trvá oprava iPhone?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Většinu oprav iPhone zvládáme do 60 minut na počkání. Výměna baterie trvá přibližně 20 minut, výměna displeje 30 minut.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Jaká je záruka na opravu?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Na všechny opravy poskytujeme záruku 24 měsíců.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Používáte originální díly?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ano, používáme originální díly od výrobce.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Kolik stojí diagnostika?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Diagnostika je zdarma, pokud se rozhodnete pro opravu u nás. V případě, že opravu nerealizujete, účtujeme poplatek za diagnostiku.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Kde se servis nachází?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Náš servis se nachází na adrese Kosmova 4, 612 00 Brno, v centru města.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Vykupujete staré iPhony?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ano, vykupujeme starší iPhony a další Apple zařízení za férové ceny. Přijďte k nám nebo nás kontaktujte pro nacenění.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Opravujete i Apple Watch?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ano, opravujeme Apple Watch všech generací. Kontaktujte nás pro nacenění konkrétní opravy.',
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Domů',
                  item: 'https://www.expresservisapple.cz',
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

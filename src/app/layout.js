import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://krishnawanshioverseas.com'),
  title: {
    default: "Krishnawanshi Overseas - Premium Laboratory Glassware Manufacturer & Supplier",
    template: "%s | Krishnawanshi Overseas"
  },
  description: "Leading manufacturer and exporter of high-quality laboratory glassware including beakers, flasks, test tubes, pipettes, and more. ISO certified scientific equipment for research, pharmaceutical, and industrial applications. Buy laboratory glassware online with worldwide shipping.",
  keywords: [
    "laboratory glassware",
    "scientific equipment",
    "borosilicate glass",
    "laboratory beakers",
    "laboratory flasks",
    "test tubes",
    "laboratory supplies",
    "pharmaceutical glassware",
    "laboratory equipment manufacturer",
    "scientific glassware supplier",
    "ISO certified glassware",
    "laboratory glassware India",
    "beaker manufacturer",
    "flask supplier",
    "laboratory glassware exporter",
    "research equipment",
    "chemical glassware",
    "precision glassware",
    "laboratory instruments",
    "scientific research equipment"
  ],
  authors: [{ name: "Krishnawanshi Overseas" }],
  creator: "Krishnawanshi Overseas",
  publisher: "Krishnawanshi Overseas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/4118.jpg',
    shortcut: '/4118.jpg',
    apple: '/4118.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krishnawanshioverseas.com',
    siteName: 'Krishnawanshi Overseas',
    title: 'Krishnawanshi Overseas - Premium Laboratory Glassware Manufacturer',
    description: 'Leading manufacturer and exporter of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.',
    images: [
      {
        url: '/4118.jpg',
        width: 1200,
        height: 630,
        alt: 'Krishnawanshi Overseas - Laboratory Glassware Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishnawanshi Overseas - Premium Laboratory Glassware',
    description: 'Leading manufacturer of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications.',
    images: ['/4118.jpg'],
    creator: '@krishnawanshioverseas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://krishnawanshioverseas.com',
  },
  category: 'Laboratory Equipment',
};

export default function RootLayout({ children }) {
  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Krishnawanshi Overseas",
    "url": "https://krishnawanshioverseas.com",
    "logo": "https://krishnawanshioverseas.com/4118.jpg",
    "description": "Leading manufacturer and exporter of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kaccha Bazar",
      "addressLocality": "Ambala Cantt",
      "addressRegion": "Haryana",
      "postalCode": "133001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-989699933",
      "contactType": "Customer Service",
      "email": "krishnawanshioverseas@gmail.com",
      "areaServed": "Worldwide",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      // Add your social media links here when available
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Krishnawanshi Overseas",
    "url": "https://krishnawanshioverseas.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://krishnawanshioverseas.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

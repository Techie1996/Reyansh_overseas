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
  title: "Krishnawanshi Overseas - Premium Laboratory Glassware",
  description: "Leading manufacturer of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.",
  keywords: "laboratory glassware, scientific equipment, borosilicate glass, beakers, flasks, test tubes, laboratory supplies, pharmaceutical glassware",
  authors: [{ name: "Krishnawanshi Overseas" }],
  icons: {
    icon: [
      { url: '/4118.jpg', sizes: 'any' },
      { url: '/4118.jpg', type: 'image/jpeg' }
    ],
    apple: '/4118.jpg',
    shortcut: '/4118.jpg',
  },
  openGraph: {
    title: "Krishnawanshi Overseas - Premium Laboratory Glassware",
    description: "Leading manufacturer of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.",
    url: "https://krishnawanshioverseas.com",
    siteName: "Krishnawanshi Overseas",
    images: [
      {
        url: '/4118.jpg',
        width: 1200,
        height: 630,
        alt: 'Krishnawanshi Overseas Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Krishnawanshi Overseas - Premium Laboratory Glassware",
    description: "Leading manufacturer of high-quality laboratory glassware for scientific research, pharmaceutical, and industrial applications worldwide.",
    images: ['/4118.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

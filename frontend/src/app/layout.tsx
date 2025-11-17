import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "UMKM Rumah Makan - Sistem Pemesanan Online",
    template: "%s | UMKM Rumah Makan"
  },
  description: "Sistem pemesanan makanan modern untuk UMKM Rumah Makan. Pesan langsung dari meja Anda dengan QR code, tanpa perlu antre!",
  keywords: ["rumah makan", "pemesanan online", "QR code ordering", "food delivery", "restaurant", "UMKM"],
  authors: [{ name: "UMKM Rumah Makan" }],
  creator: "UMKM Rumah Makan",
  publisher: "UMKM Rumah Makan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "UMKM Rumah Makan - Sistem Pemesanan Online",
    description: "Pesan makanan favorit Anda dengan mudah dan cepat melalui sistem pemesanan digital kami.",
    url: "/",
    siteName: "UMKM Rumah Makan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UMKM Rumah Makan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UMKM Rumah Makan - Sistem Pemesanan Online",
    description: "Pesan makanan favorit Anda dengan mudah dan cepat",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Theme Color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rumah Makan" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${poppins.className} bg-gray-50 antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Main Content */}
        <div id="main-content">
          {children}
        </div>

        {/* Noscript fallback */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#f59e0b',
            color: 'white',
            padding: '1rem',
            textAlign: 'center',
            zIndex: 9999
          }}>
            JavaScript diperlukan untuk menggunakan aplikasi ini dengan optimal.
          </div>
        </noscript>
      </body>
    </html>
  );
}

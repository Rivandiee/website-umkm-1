import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMKM Rumah Makan",
  description: "Aplikasi pemesanan makanan untuk UMKM Rumah Makan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}

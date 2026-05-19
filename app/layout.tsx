import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import { CartToast } from "@/components/ui/CartToast";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kronos × Banca Ifis — Noleggio operativo",
  description:
    "Offerta dedicata ai clienti Banca Ifis. Noleggio operativo Ifis Rental Services con condizioni dedicate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <CartProvider>
          {children}
          <CartDrawer />
          <CartToast />
        </CartProvider>
        <Script
          src="https://bnr.elmobot.eu/ou1WD8C9-ZFV_g7k64n2Z/it.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

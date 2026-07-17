import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROPWisdom",
  description:
    "Verified listings, trusted deals, and expert guidance. Browse premium properties for buying, selling, and renting.",
  openGraph: {
    title: "PROPWisdom",
    description: "Premium residential and commercial properties in Pune",
    url: "https://propwisdom.in",
    siteName: "PROPWisdom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PROPWisdom - Premium Properties in Pune",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROPWisdom",
    description: "Premium residential and commercial properties in Pune",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-0 bg-slate-50">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

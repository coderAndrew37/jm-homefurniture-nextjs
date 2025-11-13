import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JM Home Furniture - Quality Furniture for Kenyan Homes",
    template: "%s | JM Home Furniture",
  },
  description:
    "Discover handcrafted furniture that combines modern design with authentic Kenyan artistry. Transform your space with our quality collections. Free delivery in Nairobi.",
  keywords: [
    "furniture",
    "Kenya",
    "Nairobi",
    "home decor",
    "living room",
    "bedroom",
    "dining",
    "office furniture",
    "Kenyan crafts",
  ],
  authors: [{ name: "JM Home Furniture" }],
  creator: "JM Home Furniture",
  publisher: "JM Home Furniture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jmhomefurniture.co.ke"),
  alternates: {
    canonical: "/",
    languages: {
      "en-KE": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://jmhomefurniture.co.ke",
    siteName: "JM Home Furniture",
    title: "JM Home Furniture - Quality Furniture for Kenyan Homes",
    description:
      "Discover handcrafted furniture that combines modern design with authentic Kenyan artistry.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JM Home Furniture - Quality Furniture for Kenyan Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JM Home Furniture - Quality Furniture for Kenyan Homes",
    description:
      "Discover handcrafted furniture that combines modern design with authentic Kenyan artistry.",
    images: ["/og-image.jpg"],
    creator: "@jmhomefurniture",
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
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarWrapper />
        <main className="min-h-screen">
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}

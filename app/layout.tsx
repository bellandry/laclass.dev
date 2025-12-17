import CustomCursor from "@/components/custom-cursor";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://laclass.dev'),
  title: {
    default: "Landry Bella | Software Engineer & Tech Lead",
    template: "%s | Landry Bella"
  },
  description: "Software Engineer and Tech Lead specializing in full-stack development, React, Node.js, and scalable web applications. Explore my portfolio, projects, and technical blog.",
  keywords: ["Landry Bella", "Software Engineer", "Tech Lead", "Full Stack Developer", "React", "Node.js", "Next.js", "Web Development", "Portfolio"],
  authors: [{ name: "Landry Bella", url: "https://laclass.dev" }],
  creator: "Landry Bella",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://laclass.dev",
    siteName: "Landry Bella",
    title: "Landry Bella | Software Engineer & Tech Lead",
    description: "Software Engineer and Tech Lead specializing in full-stack development, React, Node.js, and scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Landry Bella - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landry Bella | Software Engineer & Tech Lead",
    description: "Software Engineer and Tech Lead specializing in full-stack development, React, Node.js, and scalable web applications.",
    creator: "@landrybella",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#03152eff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >      
      <CustomCursor />
      <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

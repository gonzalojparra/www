import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SunRays } from "@/components/sun-rays";
import { AnimatedFavicon } from "@/components/animated-favicon";
import "./globals.css";

const SITE_URL = "https://gonzalojparra.vercel.app";
const SITE_DESCRIPTION = "Software engineer, passionate about web technologies";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gonzalo Parra",
    template: "%s — Gonzalo Parra",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Gonzalo Parra",
  authors: [{ name: "Gonzalo Parra", url: SITE_URL }],
  creator: "Gonzalo Parra",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Gonzalo Parra",
    title: "Gonzalo Parra",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gonzalo Parra" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gonzalo Parra",
    description: SITE_DESCRIPTION,
    creator: "@_gonzaparra",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/earth_spin.webp",
    apple: "/earth_spin.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        <AnimatedFavicon src="/earth_spin.webp" />
        <SunRays />
        <div
          className="relative z-10 mx-auto flex w-full flex-col max-w-(--col) px-(--pad) min-h-screen"
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

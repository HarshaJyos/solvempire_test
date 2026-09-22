import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { COMPANY } from "@/lib/company";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solvempire.com"),
  title: {
    default: "SolveMpire — Product Engineering Company",
    template: "%s | SolveMpire",
  },
  description: COMPANY.positioning.subhead,
  keywords: [
    "Product Engineering",
    "Mechanical Design",
    "Custom PCB Design",
    "Embedded Firmware",
    "IoT Platforms",
    "Hardware Engineering India",
    "CAD to Production",
  ],
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://solvempire.com",
    title: "SolveMpire — We Engineer Ideas Into Working Products",
    description: COMPANY.positioning.subhead,
    siteName: COMPANY.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: "SolveMpire — We Engineer Ideas Into Working Products",
    description: COMPANY.positioning.subhead,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  alternateName: COMPANY.brandName,
  url: "https://solvempire.com",
  logo: "https://solvempire.com/logo.png",
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "SFNO 244/3 D.No: 2-247/2, Near Medha School Employee, Panasapadu",
    addressLocality: "Kakinada",
    addressRegion: "Andhra Pradesh",
    postalCode: "533005",
    addressCountry: "IN",
  },
  identifier: {
    "@type": "PropertyValue",
    name: "CIN",
    value: COMPANY.cin,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} ${ibmPlexMono.variable} ${plusJakartaSans.variable} min-h-screen bg-canvas text-heading antialiased selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8] relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Micro Film Grain Overlay */}
        <div className="bg-noise-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

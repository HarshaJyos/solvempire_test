import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { COMPANY } from "@/lib/company";
import { buildOrganizationJsonLd, buildWebSiteJsonLd, buildLocalBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.websiteUrl),
  title: {
    default: "SolveMpire — Product Engineering Company | Mechanical, Electronics, Firmware & IoT",
    template: "%s | SolveMpire",
  },
  description: COMPANY.positioning.subhead,
  keywords: [
    "Product Engineering Company",
    "Hardware Engineering Studio",
    "Mechanical CAD Design",
    "Custom PCB Design KiCad",
    "Embedded Firmware STM32 ESP32",
    "DWIN DGUS Touchscreen HMI",
    "IoT Cloud Telemetry & OTA",
    "Design for Manufacturing DFM",
    "IP65 Waterproof Enclosure Design",
    "Hardware Engineering India",
    "Automated Machinery Development",
    "SolveMpire",
  ],
  authors: [{ name: COMPANY.legalName, url: COMPANY.websiteUrl }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: COMPANY.websiteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.websiteUrl,
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = buildOrganizationJsonLd();
  const websiteSchema = buildWebSiteJsonLd();
  const localBusinessSchema = buildLocalBusinessJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
        <JsonLd schema={localBusinessSchema} />
      </head>
      <body
        className={`${bricolageGrotesque.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} min-h-screen bg-[#fafcff] text-[#0f172a] antialiased selection:bg-[#1F56C6]/15 selection:text-[#1F56C6] font-sans relative`}
      >
        <GoogleAnalytics />

        {/* Very subtle technical film grain overlay */}
        <div className="bg-noise-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}


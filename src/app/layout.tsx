import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solvempire — We Engineer Ideas Into Working Products",
  description: "Custom software. Scalable platforms. Real-world impact.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/google-sans"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${bricolageGrotesque.variable} ${plusJakartaSans.variable} min-h-screen bg-[#f3f6fc] text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700`}
      >
        {children}
      </body>
    </html>
  );
}


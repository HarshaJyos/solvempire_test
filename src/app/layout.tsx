import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
    <html lang="en" className="light">
      <body
        className={`${plusJakartaSans.className} min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-700`}
      >
        {children}
      </body>
    </html>
  );
}


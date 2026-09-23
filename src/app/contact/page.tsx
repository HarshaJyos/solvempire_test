import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { MultiStepContactWizard } from "@/components/contact/MultiStepContactWizard";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Engineering Leads | Scope Your Product | SolveMpire",
  description:
    "Scope your mechanical packaging, custom PCB, firmware, or connected platform project directly with SolveMpire's lead engineers in Andhra Pradesh, India.",
  keywords: [
    "Contact SolveMpire",
    "Hardware Engineering Inquiry",
    "Scope Custom Machine",
    "PCB Design Consultation",
    "Product Engineering India",
    "SolveMpire Kakinada Contact",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Engineering Leads | Scope Your Product | SolveMpire",
    description:
      "Scope your mechanical design, custom PCB, firmware, or connected platform project directly with SolveMpire's engineering team.",
    url: `${COMPANY.websiteUrl}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Engineering Leads | Scope Your Product | SolveMpire",
    description:
      "Scope your mechanical design, custom PCB, firmware, or connected platform project directly with SolveMpire's engineering team.",
  },
};

export default function ContactPage() {
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${COMPANY.websiteUrl}/contact/#contact`,
    name: "Contact SolveMpire Engineering",
    description:
      "Direct technical discovery and project scoping with SolveMpire lead product engineers.",
    url: `${COMPANY.websiteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: COMPANY.legalName,
      telephone: COMPANY.phone,
      email: COMPANY.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu",
        addressLocality: "Kakinada",
        addressRegion: "Andhra Pradesh",
        postalCode: "533005",
        addressCountry: "IN",
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={contactSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16">
          <div className="indisea-grid items-start gap-12 lg:gap-16">
            {/* Left Column: Context & Direct Reach (Span 5) */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="indisea-eyebrow">
                  01 / PROJECT INITIATION &amp; SCOPING
                </span>

                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] tracking-tight leading-[1.06] uppercase">
                  Let&apos;s Scope <br />
                  <span className="text-[#1F56C6]">Your Product.</span>
                </h1>

                <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
                  Whether you have an early concept sketch, tight enclosure packaging constraints, or need full-scale firmware and PCB architecture, connect directly with our engineering leads.
                </p>

                {/* Expectation Box */}
                <div className="p-6 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-2">
                  <span className="indisea-eyebrow text-[#1F56C6] block">
                    What happens next?
                  </span>
                  <p className="font-sans text-sm text-[var(--text-heading)] font-medium leading-relaxed">
                    We review your brief within 1 business day and reply with a link to schedule a 30-minute technical discovery call. Direct engineering discussion — zero sales fluff.
                  </p>
                </div>
              </div>

              {/* Direct Info */}
              <div className="space-y-4 pt-6 border-t border-[var(--border-hairline)] text-xs font-sans">
                <div>
                  <span className="indisea-eyebrow block mb-1">
                    Direct Email
                  </span>
                  <a
                    href="mailto:support@solvempire.com"
                    className="text-[#1F56C6] font-bold text-sm hover:underline block"
                  >
                    support@solvempire.com
                  </a>
                </div>

                <div>
                  <span className="indisea-eyebrow block mb-1">
                    Direct Phone
                  </span>
                  <a
                    href="tel:+919701341323"
                    className="text-[var(--text-heading)] font-bold text-sm hover:text-[#1F56C6] block font-mono"
                  >
                    +91 97013 41323
                  </a>
                </div>

                <div>
                  <span className="indisea-eyebrow block mb-1">
                    Studio &amp; Prototyping Lab
                  </span>
                  <p className="text-[var(--text-heading)] font-medium leading-relaxed text-sm">
                    SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed text-sm">
                    Kakinada, Andhra Pradesh, India
                  </p>
                  <a
                    href="https://maps.app.goo.gl/7awCUTuTPqBsHT4c7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1F56C6] font-bold text-xs hover:underline mt-1.5 uppercase tracking-wider"
                  >
                    <span>Open in Google Maps</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Step Form (Span 7) */}
            <div className="col-span-12 lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs">
                <MultiStepContactWizard theme="light" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <IndiseaFooter />
    </div>
  );
}

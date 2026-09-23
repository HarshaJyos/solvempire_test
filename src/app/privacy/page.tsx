import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | SolveMpire Private Limited",
  description: `Official Privacy Policy and Data Protection practices of ${COMPANY.legalName} (CIN: ${COMPANY.cin}) in compliance with the Digital Personal Data Protection Act 2023 and global privacy frameworks.`,
  alternates: {
    canonical: `${COMPANY.websiteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs space-y-12">
          {/* Header Banner */}
          <div className="space-y-4 border-b border-[var(--border-hairline)] pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="indisea-eyebrow text-[#1F56C6]">
                CORPORATE COMPLIANCE // CIN: {COMPANY.cin}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Effective: September 2026
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--text-heading)] uppercase">
              Privacy Policy &amp; Data Protection
            </h1>

            <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
              This Privacy Policy details how <strong className="text-[var(--text-heading)]">{COMPANY.legalName}</strong> (&ldquo;SolveMpire&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, protects, and governs personal, commercial, and technical information across our engineering portal, physical prototyping facilities, and software platforms in accordance with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, Information Technology Act, 2000, and recognized international privacy standards.
            </p>
          </div>

          {/* Table of Key Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-display font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA &amp; IP Protection</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                All client 3D CAD, KiCad PCB files, and firmware source codes are safeguarded under strict mutual NDAs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-[#1F56C6] font-display font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>Zero Data Selling</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                We never monetize, broker, or transfer personal or proprietary engineering data to third-party ad networks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-display font-bold text-sm">
                <Eye className="w-4 h-4" />
                <span>DPDP 2023 Compliant</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                Clear consent records, lawful data processing, and dedicated Grievance Officer contact protocols.
              </p>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="space-y-10 text-[15px] sm:text-base leading-relaxed text-[var(--text-body)] font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                1. Corporate Identity &amp; Governance
              </h2>
              <p>
                <strong>{COMPANY.legalName}</strong> is a private limited company duly incorporated under the Companies Act, 2013 in the Republic of India with <strong>CIN: {COMPANY.cin}</strong>. Our registered corporate office is located at:
              </p>
              <div className="p-4 rounded-xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] font-mono text-xs text-[var(--text-heading)] leading-relaxed">
                SolveMpire Private Limited<br />
                SFNO 244/3, D.No: 2-247/2, Near Medha School Employee,<br />
                Panasapadu, Kakinada, Andhra Pradesh - 533005, India.<br />
                Email: <a href="mailto:support@solvempire.com" className="text-[#1F56C6] underline">support@solvempire.com</a> | Phone: +91 97013 41323
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                2. Categories of Information We Collect
              </h2>
              <p>
                We collect only the minimum data required to execute professional engineering services, communicate with clients, and fulfill commercial contracts:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li>
                  <strong className="text-[var(--text-heading)]">Client Identity &amp; Contact Data:</strong> Name, corporate email address, telephone number, job title, and organization name submitted through contact forms or scoping wizards.
                </li>
                <li>
                  <strong className="text-[var(--text-heading)]">Technical &amp; Engineering Specifications:</strong> 3D CAD files (STEP/IGES), PCB schematic requirements, microcontroller preferences, Bill of Materials (BOM) estimates, and project scope documents.
                </li>
                <li>
                  <strong className="text-[var(--text-heading)]">Commercial &amp; Billing Data:</strong> GSTIN, billing address, bank wire transfer confirmations, and formal purchase order metadata.
                </li>
                <li>
                  <strong className="text-[var(--text-heading)]">Digital Telemetry &amp; Analytics:</strong> Anonymized usage data, IP addresses, browser types, and session telemetry collected via Google Analytics 4 to evaluate portal performance.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                3. Purpose &amp; Lawful Grounds for Processing
              </h2>
              <p>
                We process your personal and project information based on explicit contractual necessity, legitimate business interests, and statutory compliance:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li>Evaluating engineering feasibility and preparing formal Statements of Work (SOW) &amp; Quotations.</li>
                <li>Executing mechanical CAD, PCB layout, embedded firmware programming, and physical prototype builds.</li>
                <li>Issuing GST tax invoices and complying with corporate accounting laws in India.</li>
                <li>Managing Over-the-Air (OTA) firmware deployments and cloud IoT telemetry for deployed hardware fleets.</li>
                <li>Providing technical support, warranty services, and lifecycle engineering updates.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                4. Intellectual Property Confidentiality &amp; NDAs
              </h2>
              <p>
                SolveMpire operates under zero-leakage intellectual property protocols. All confidential proprietary design files, firmware repositories, schematics, and commercial briefs shared with SolveMpire are protected under mutual Non-Disclosure Agreements (NDAs).
              </p>
              <p>
                Access to client project data is restricted strictly to authorized engineering staff on a need-to-know basis. Upon final milestone payment and project completion, full client ownership is assigned in accordance with our Master Engineering Terms.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                5. Google Analytics &amp; Cookie Usage
              </h2>
              <p>
                Our website utilizes first-party cookies and Google Analytics 4 (GA4) to analyze visitor traffic patterns, measure page load speeds, and improve user experience. Google Analytics processes anonymized IP addresses and aggregate metrics.
              </p>
              <p>
                You may disable cookies directly within your web browser settings or install the official Google Analytics Opt-out Browser Add-on at any time without impacting your ability to browse our engineering dossiers or contact our studio.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                6. Data Retention &amp; Security Measures
              </h2>
              <p>
                We employ industry-standard physical, electronic, and administrative safeguards to protect your information:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li>End-to-end TLS 1.3 cryptographic encryption for all web and API communications.</li>
                <li>Encrypted cloud backups with strict role-based access control (RBAC).</li>
                <li>Retention of financial and contractual records for statutory periods required by Indian taxation authorities (typically 7–8 years).</li>
                <li>Secure sanitization and deletion of alpha prototype design scrap files upon client request.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                7. Your Data Principal Rights
              </h2>
              <p>
                Under the Indian Digital Personal Data Protection Act, 2023 (DPDP Act) and international data protection laws, you retain the right to:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction, completion, or updating of inaccurate data.</li>
                <li>Request erasure of your personal data where retention is no longer legally mandated.</li>
                <li>Withdraw consent for marketing communications or non-essential telemetry.</li>
                <li>Nominate an authorized representative to exercise data rights on your behalf.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                8. Grievance Officer &amp; Contact Details
              </h2>
              <p>
                In compliance with Rule 3(11) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and Section 6 of the DPDP Act 2023, the designated Grievance Officer for SolveMpire is:
              </p>
              <div className="p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
                <p className="font-display font-bold text-sm text-[var(--text-heading)]">
                  Grievance &amp; Compliance Officer
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  SolveMpire Private Limited (CIN: {COMPANY.cin})<br />
                  SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh - 533005, India<br />
                  Direct Email: <a href="mailto:support@solvempire.com" className="text-[#1F56C6] font-bold underline">support@solvempire.com</a><br />
                  Phone: +91 97013 41323
                </p>
                <p className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-hairline)]">
                  Grievances are acknowledged within 24 hours and resolved within 15 business days.
                </p>
              </div>
            </section>
          </div>

          {/* Footer Back Link */}
          <div className="pt-8 border-t border-[var(--border-hairline)] flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-[#1F56C6] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to SolveMpire Home</span>
            </Link>

            <Link
              href="/terms"
              className="font-display text-sm font-bold text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors"
            >
              View Terms of Service &rarr;
            </Link>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}

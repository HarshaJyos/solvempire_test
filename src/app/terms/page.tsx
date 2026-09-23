import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, FileCheck2, Cpu, Scale, ArrowLeft, ArrowRight } from "lucide-react";
import { buildBreadcrumbsJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service | SolveMpire Private Limited",
  description: `Official Master Engineering Services Terms and Conditions of ${COMPANY.legalName} (CIN: ${COMPANY.cin}) covering Statements of Work, 100% IP assignment, prototyping, milestone payments, and multi-year support agreements.`,
  alternates: {
    canonical: `${COMPANY.websiteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
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
                MASTER ENGINEERING SERVICES // CIN: {COMPANY.cin}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)] uppercase">
                Effective: September 2026
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--text-heading)] uppercase">
              Terms of Service &amp; Master Agreement
            </h1>

            <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
              These Terms of Service govern all engineering engagements, physical product design, electronics prototyping, firmware development, cloud telemetry, and manufacturing support services provided by <strong className="text-[var(--text-heading)]">{COMPANY.legalName}</strong> (&ldquo;SolveMpire&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;Studio&rdquo;) to clients and partners worldwide.
            </p>
          </div>

          {/* Key Engagement Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-display font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>100% IP Assignment</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                Full transfer of native 3D CAD, KiCad schematics/layouts, Gerber files, and firmware source code upon milestone payment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-[#1F56C6] font-display font-bold text-sm">
                <FileCheck2 className="w-4 h-4" />
                <span>Milestone SOW Model</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                Structured delivery phases with transparent stage-gate approvals and clear engineering acceptance criteria.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-display font-bold text-sm">
                <Scale className="w-4 h-4" />
                <span>Kakinada Jurisdiction</span>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
                Legally governed under Indian Commercial Law with dispute resolution exclusively in Andhra Pradesh, India.
              </p>
            </div>
          </div>

          {/* Legal Clauses */}
          <div className="space-y-10 text-[15px] sm:text-base leading-relaxed text-[var(--text-body)] font-normal">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                1. Corporate Details &amp; Engagement Framework
              </h2>
              <p>
                <strong>{COMPANY.legalName}</strong> is a registered Indian company with <strong>CIN: {COMPANY.cin}</strong>, maintaining registered headquarters at:
              </p>
              <div className="p-4 rounded-xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] font-mono text-xs text-[var(--text-heading)] leading-relaxed">
                SolveMpire Private Limited<br />
                SFNO 244/3, D.No: 2-247/2, Near Medha School Employee,<br />
                Panasapadu, Kakinada, Andhra Pradesh - 533005, India.<br />
                Direct Contact: <a href="mailto:support@solvempire.com" className="text-[#1F56C6] underline">support@solvempire.com</a> | +91 97013 41323
              </div>
              <p>
                Every engineering engagement is executed via an authorized Statement of Work (&ldquo;SOW&rdquo;) or Master Services Agreement (&ldquo;MSA&rdquo;) referencing these terms. In the event of any specific conflict between an individual signed SOW and these general terms, the provisions of the signed SOW shall prevail.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                2. Scope of Services &amp; Stage-Gate Milestones
              </h2>
              <p>
                SolveMpire provides full-stack product engineering services encompassing:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li><strong className="text-[var(--text-heading)]">Mechanical Engineering:</strong> 3D CAD modeling in Autodesk Fusion 360/SolidWorks, industrial enclosure design, sheet-metal CNC layout, injection molding DFM, GD&amp;T, and 3D rapid prototyping.</li>
                <li><strong className="text-[var(--text-heading)]">Electronics &amp; PCB Design:</strong> Custom multi-layer PCB design in KiCad, schematic capture, component selection, BOM optimization, power architecture, and SMT assembly.</li>
                <li><strong className="text-[var(--text-heading)]">Embedded Firmware &amp; HMI:</strong> Bare-metal C/C++, FreeRTOS, STM32, ESP32, Linux SoM systems, DWIN DGUS display tooling, UART/CAN bus protocols, and dynamic Razorpay UPI integration.</li>
                <li><strong className="text-[var(--text-heading)]">Cloud Telemetry &amp; OTA:</strong> IoT cloud fleet management, live telemetry heartbeats, remote Over-the-Air (OTA) firmware deployment pipelines, and admin dashboards.</li>
                <li><strong className="text-[var(--text-heading)]">Volume Tooling &amp; Production Transfer:</strong> Vendor liaison, factory DFM reviews, production jigs, and quality control documentation.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                3. Intellectual Property Assignment &amp; Deliverables
              </h2>
              <p>
                SolveMpire operates on a strict <strong>100% Client IP Ownership</strong> principle:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li><strong className="text-[var(--text-heading)]">Assignment of Bespoke Work Product:</strong> Upon receipt of full and final milestone payment, SolveMpire unconditionally assigns to the Client all worldwide rights, title, copyright, and patentable interests in the bespoke mechanical CAD files, STEP/IGES models, KiCad PCB files, Gerber packages, firmware source code repositories, and BOMs generated specifically for the Client under the applicable SOW.</li>
                <li><strong className="text-[var(--text-heading)]">Pre-Existing Studio Libraries:</strong> SolveMpire retains ownership of its pre-existing core firmware libraries, design tool scripts, and generic design patterns. SolveMpire grants the Client a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and deploy such embedded libraries as integrated within the deliverable.</li>
                <li><strong className="text-[var(--text-heading)]">Client Materials:</strong> The Client retains sole ownership of all pre-existing IP, brand trademarks, and proprietary technical requirements supplied to SolveMpire.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                4. Prototyping, DFM &amp; Tolerance Disclaimers
              </h2>
              <p>
                Physical product engineering is inherently iterative:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li><strong className="text-[var(--text-heading)]">Alpha &amp; Beta Prototypes:</strong> 3D-printed (FDM/SLA/SLS) and bench-assembled alpha prototypes are engineered for fit-checks, mechanical validation, and firmware testing. Tolerances and surface finishes differ naturally from mass-production injection molding or die casting.</li>
                <li><strong className="text-[var(--text-heading)]">Design For Manufacturing (DFM) Sign-Off:</strong> Before ordering hard production tooling (e.g., steel injection molds, progressive stamping dies), Client and manufacturing partners must review and formally sign off on the 2D GD&amp;T production drawings and DFM reports.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                5. Commercial Terms, Invoicing &amp; Taxes
              </h2>
              <p>
                All commercial fees are invoiced based on agreed SOW milestone deliverables:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] list-disc pl-5">
                <li>Domestic Indian invoices are subject to applicable Goods and Services Tax (GST) at statutory rates.</li>
                <li>International invoices are payable in USD/EUR via standard SWIFT/Wire transfer in compliance with Indian foreign exchange regulations (FEMA).</li>
                <li>Invoices are payable within 15 calendar days of presentation unless otherwise stated in the signed SOW. Work on subsequent milestones initiates upon receipt of preceding milestone settlement.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                6. Multi-Year Support Agreements &amp; SLAs
              </h2>
              <p>
                For clients opting into post-deployment maintenance frameworks (such as 3 to 10-year support SLAs), SolveMpire provides ongoing OTA firmware updates, cloud telemetry monitoring, security patch deployments, and hardware revision engineering under dedicated Service Level Agreements.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                7. Confidentiality &amp; Mutual Non-Disclosure
              </h2>
              <p>
                Both parties agree to protect and maintain the confidentiality of all proprietary engineering drawings, source code, trade secrets, and commercial pricing for a minimum period of 5 years from disclosure (or indefinitely for trade secrets), unless authorized in writing.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                8. Limitation of Liability &amp; Warranty
              </h2>
              <p>
                SolveMpire warrants that all engineering deliverables will be prepared with professional skill in accordance with recognized industry standards. To the maximum extent permitted by applicable law, SolveMpire&rsquo;s aggregate financial liability arising under any SOW shall not exceed the total fees paid to SolveMpire under that specific SOW in the preceding 6 months. SolveMpire shall not be liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                9. Governing Law &amp; Dispute Resolution
              </h2>
              <p>
                These Terms of Service and all related Statements of Work shall be governed by and construed in accordance with the substantive laws of the <strong>Republic of India</strong>.
              </p>
              <p>
                Any dispute, claim, or controversy arising out of or relating to these terms shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to the exclusive jurisdiction of the competent courts in <strong>Kakinada, Andhra Pradesh, India</strong>.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)] uppercase">
                10. Legal Notices &amp; Inquiries
              </h2>
              <p>
                Formal notices, MSA execution requests, and legal communications must be addressed to:
              </p>
              <div className="p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] space-y-2">
                <p className="font-display font-bold text-sm text-[var(--text-heading)]">
                  Legal &amp; Contracts Desk
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  SolveMpire Private Limited (CIN: {COMPANY.cin})<br />
                  SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh - 533005, India<br />
                  Email: <a href="mailto:support@solvempire.com" className="text-[#1F56C6] font-bold underline">support@solvempire.com</a><br />
                  Phone: +91 97013 41323
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
              href="/privacy"
              className="font-display text-sm font-bold text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors"
            >
              View Privacy Policy &rarr;
            </Link>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}

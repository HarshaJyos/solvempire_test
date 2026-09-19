// NOTE: These terms of service are a draft template and must be reviewed by legal counsel before public production launch.
// {{TODO: legal review: formal terms of service review by legal counsel}}

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions governing the engineering services and website of ${COMPANY.legalName}.`,
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Legal Review Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono mb-8">
            {"{{TODO: legal review — draft terms of service document for review by legal counsel prior to formal execution}}"}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-heading mb-4">
            Terms of Service
          </h1>
          <p className="text-muted text-xs mb-8">
            Last Updated: September 2026 | {COMPANY.legalName} (CIN: {COMPANY.cin})
          </p>

          <div className="prose prose-slate max-w-none text-body text-sm sm:text-base leading-[1.618] space-y-6">
            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                1. Scope of Engineering Services
              </h2>
              <p>
                {COMPANY.legalName} (&quot;SolveMpire&quot;) provides customized mechanical design, electronic hardware engineering, embedded firmware development, and connected digital platform solutions. All bespoke engineering projects are governed by detailed Statements of Work (SOW) and Master Services Agreements (MSA) executed separately between SolveMpire and the client.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                2. Intellectual Property &amp; Deliverables
              </h2>
              <p>
                Unless explicitly agreed otherwise in a signed Statement of Work, custom mechanical CAD models, PCB schematics, Gerber files, and firmware deliverables created specifically for a client upon full payment of project fees are assigned to the client. Pre-existing proprietary libraries, architectural frameworks, and reusable engineering tools remain the property of SolveMpire.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                3. Confidentiality &amp; Non-Disclosure
              </h2>
              <p>
                We treat all client concepts, proprietary schematics, CAD data, and commercial discussions with strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are routinely executed prior to in-depth technical scoping calls.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                4. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, SolveMpire&apos;s total liability under any engineering engagement or through the use of this website shall be limited to the total fees paid by the client under the specific Statement of Work giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These terms and any commercial agreements arising from them shall be governed by and construed in accordance with the laws of India. The courts located in Kakinada, Andhra Pradesh, India shall have exclusive jurisdiction over any disputes.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

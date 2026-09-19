// NOTE: This privacy policy is a draft template and must be reviewed by legal counsel before public production launch.
// {{TODO: legal review: formal privacy policy review for India DPDP Act and international privacy regulations}}

import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and data protection practices of ${COMPANY.legalName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Legal Review Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono mb-8">
            {"{{TODO: legal review — draft privacy document for review by legal counsel prior to formal certification}}"}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-heading mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted text-xs mb-8">
            Last Updated: September 2026 | {COMPANY.legalName} (CIN: {COMPANY.cin})
          </p>

          <div className="prose prose-slate max-w-none text-body text-sm sm:text-base leading-[1.618] space-y-6">
            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you interact with our website or submit an inquiry through our contact form, {COMPANY.legalName} collects only the information necessary to evaluate and scope your engineering requirements. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Your name and professional contact email</li>
                <li>Your company or organization name</li>
                <li>Project scope, technical specifications, and timeline details you voluntarily provide</li>
                <li>Technical logs (IP address, browser type) used strictly for security and rate-limiting purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use the collected information solely to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 mt-2">
                <li>Review and respond to your technical project inquiries</li>
                <li>Schedule and conduct engineering scoping calls</li>
                <li>Deliver proposal documents and commercial engineering agreements</li>
                <li>Maintain the security and operational integrity of our website infrastructure</li>
              </ul>
              <p className="mt-2 font-medium text-heading">
                We never sell, rent, or trade your contact information or engineering project data to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                3. Data Storage &amp; Third-Party Processors
              </h2>
              <p>
                Inquiries are processed via secure email infrastructure and encrypted databases. We utilize standard professional cloud hosting and communication processors that adhere to strict industry data security standards.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg sm:text-xl font-bold text-heading mt-6 mb-3">
                4. Your Rights &amp; Contact Information
              </h2>
              <p>
                You may request access to, correction of, or deletion of any personal data we hold by contacting us directly:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-surface border border-hairline text-xs space-y-1">
                <p><strong>{COMPANY.legalName}</strong></p>
                <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-brand hover:underline">{COMPANY.email}</a></p>
                <p>Address: {COMPANY.fullAddress}</p>
                <p>CIN: {COMPANY.cin}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

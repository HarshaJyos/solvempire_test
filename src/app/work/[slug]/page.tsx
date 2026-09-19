import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { COMPANY } from "@/lib/company";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | SolveMpire",
    };
  }

  return {
    title: `${study.title} — Case Study`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Case Study | SolveMpire`,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    author: {
      "@type": "Organization",
      name: COMPANY.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY.legalName,
      logo: "https://solvempire.com/logo.png",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <article className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-muted">
            <Link href="/work" className="hover:text-brand transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-body truncate">{study.title}</span>
          </div>

          {/* Header */}
          <header className="mb-10 sm:mb-14">
            <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
              {study.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-heading leading-[1.12]">
              {study.title}
            </h1>

            {/* Meta Bar */}
            <div className="mt-6 pt-6 border-t border-hairline grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="block text-muted uppercase tracking-wider mb-0.5">Client</span>
                <span className="font-medium text-heading">{study.client}</span>
              </div>
              <div>
                <span className="block text-muted uppercase tracking-wider mb-0.5">Status</span>
                <span className="font-medium text-brand">{study.status}</span>
              </div>
              <div className="col-span-2 sm:col-span-2">
                <span className="block text-muted uppercase tracking-wider mb-0.5">Disciplines</span>
                <span className="font-medium text-heading">{study.disciplines.join(", ")}</span>
              </div>
            </div>
          </header>

          {/* Hero Visual */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-ink mb-12 sm:mb-16 border border-hairline shadow-lg">
            <Image
              src={study.hero.src}
              alt={study.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>

          {/* Key Metrics (if available) */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-2xl bg-surface border border-hairline shadow-xs">
              {study.metrics.map((m) => (
                <div key={m.label} className="p-3">
                  <span className="block text-xs text-muted font-medium uppercase tracking-wider mb-1">
                    {m.label}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-brand">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Executive Summary */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border-l-4 border-l-brand border-y border-r border-hairline mb-14">
            <h2 className="text-xs font-bold text-brand tracking-widest uppercase mb-2">Executive Summary</h2>
            <p className="text-base sm:text-lg text-heading font-medium leading-[1.618]">
              {study.summary}
            </p>
          </div>

          {/* Highlights List */}
          {study.highlights && study.highlights.length > 0 && (
            <div className="mb-14">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-heading mb-6">
                Key Engineering Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-hairline">
                    <span className="w-5 h-5 rounded-full bg-ice-light text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm text-body leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Narrative Sections */}
          <div className="space-y-10 sm:space-y-12 mb-16">
            {study.sections.map((section, idx) => (
              <section key={idx} className="border-t border-hairline pt-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-heading mb-4">
                  {section.heading}
                </h2>
                <div className="text-body text-base leading-[1.618] whitespace-pre-line space-y-4">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          {/* Verified Outcomes */}
          {study.outcomes && study.outcomes.length > 0 && (
            <div className="p-8 rounded-2xl sm:rounded-3xl bg-surface border border-hairline shadow-xs mb-16">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-heading mb-6">
                Project Outcomes &amp; Impact
              </h2>
              <ul className="space-y-3">
                {study.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-body text-sm sm:text-base">
                    <span className="text-brand font-bold mt-0.5">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bottom CTA Block */}
          <div className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl bg-ink text-surface text-center flex flex-col items-center">
            <span className="text-brand-light font-bold text-xs uppercase tracking-widest mb-2">
              LET&apos;S COLLABORATE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Have a similar engineering challenge?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-6">
              Connect directly with our engineering team to scope your mechanical, PCB, or firmware requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-brand/30 transition-all duration-200"
            >
              <span>Start Scoping Call</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

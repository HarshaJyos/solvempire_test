import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { A4CaseStudyArticle } from "@/components/work/A4CaseStudyArticle";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | SolveMpire",
    };
  }

  return {
    title: `${study.title} — Engineering Case Study | SolveMpire`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — SolveMpire Engineering Case Study`,
      description: study.summary,
      images: [study.hero.src],
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

  // Calculate adjacent case studies for pagination
  const currentIndex = caseStudies.findIndex((s) => s.slug === study.slug);
  const prevStudy =
    currentIndex > 0
      ? {
          title: caseStudies[currentIndex - 1].title,
          slug: caseStudies[currentIndex - 1].slug,
        }
      : undefined;
  const nextStudy =
    currentIndex < caseStudies.length - 1
      ? {
          title: caseStudies[currentIndex + 1].title,
          slug: caseStudies[currentIndex + 1].slug,
        }
      : undefined;

  return (
    <A4CaseStudyArticle
      study={study}
      prevStudy={prevStudy}
      nextStudy={nextStudy}
    />
  );
}

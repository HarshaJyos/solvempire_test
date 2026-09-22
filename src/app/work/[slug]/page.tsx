import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { IndiseaDossierArticle } from "@/components/work/IndiseaDossierArticle";
import { buildBreadcrumbsJsonLd, buildCaseStudyJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

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

  const imageUrl = study.hero.src.startsWith("http")
    ? study.hero.src
    : `${COMPANY.websiteUrl}${study.hero.src}`;

  return {
    title: `${study.title} — Engineering Case Study | SolveMpire`,
    description: study.summary,
    keywords: [
      ...study.disciplines,
      study.category,
      study.client,
      "Product Engineering Case Study",
      "Hardware Engineering India",
      "SolveMpire Work",
    ],
    alternates: {
      canonical: `${COMPANY.websiteUrl}/work/${study.slug}`,
    },
    openGraph: {
      title: `${study.title} — SolveMpire Engineering Dossier`,
      description: study.summary,
      url: `${COMPANY.websiteUrl}/work/${study.slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: study.hero.alt || study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — SolveMpire Engineering Dossier`,
      description: study.summary,
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

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

  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Case Studies", url: "/work" },
    { name: study.title, url: `/work/${study.slug}` },
  ]);
  const caseStudySchema = buildCaseStudyJsonLd(study);

  return (
    <>
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={caseStudySchema} />
      <IndiseaDossierArticle
        study={study}
        prevStudy={prevStudy}
        nextStudy={nextStudy}
      />
    </>
  );
}


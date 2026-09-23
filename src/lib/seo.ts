import { COMPANY } from "@/lib/company";
import { CaseStudy } from "@/content/case-studies";
import { ServiceDiscipline } from "@/content/services";
import { TeamMember } from "@/types/team";
import { BlogArticleData } from "@/types/blog-article";


const BASE_URL = COMPANY.websiteUrl;

/**
 * Organization / Corporation / Engineering Studio Schema
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Corporation"],
    "@id": `${BASE_URL}/#organization`,
    name: COMPANY.legalName,
    alternateName: [COMPANY.brandName, "SolveMpire Engineering", "SolveMpire Studio"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/icon.png`,
      caption: `${COMPANY.brandName} Logo`,
    },
    email: COMPANY.email,
    telephone: COMPANY.phone,
    sameAs: [
      "https://maps.app.goo.gl/7awCUTuTPqBsHT4c7",
      "https://github.com/HarshaJyos",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      postalCode: "533005",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.989065,
      longitude: 82.247465,
    },
    founder: [
      {
        "@type": "Person",
        name: "Hanish Jyosyabhatla",
        jobTitle: "Founder & CEO",
        url: `${BASE_URL}/team/hanish-jyosyabhatla`,
      },
      {
        "@type": "Person",
        name: "Lohith Medisetti",
        jobTitle: "Co-Founder & COO",
        url: `${BASE_URL}/team/lohith-medisetti`,
      },
      {
        "@type": "Person",
        name: "Teja Mandapalli",
        jobTitle: "Co-Founder & Product Lead",
        url: `${BASE_URL}/team/teja-mandapalli`,
      },
      {
        "@type": "Person",
        name: "Pavan Kumar Duggirala",
        jobTitle: "Product Strategist & Marketing",
        url: `${BASE_URL}/team/pavan-kumar-duggirala`,
      },
      {
        "@type": "Person",
        name: "Prasad Duggirala",
        jobTitle: "AI/ML Engineer",
        url: `${BASE_URL}/team/prasad-duggirala`,
      },
      {
        "@type": "Person",
        name: "Gayathri Boyapati",
        jobTitle: "Electronics Engineer, PCB & VLSI Specialist",
        url: `${BASE_URL}/team/gayathri-boyapati`,
      },
    ],

    identifier: {
      "@type": "PropertyValue",
      name: "CIN",
      value: COMPANY.cin,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "Nepal" },
      { "@type": "Country", name: "China" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    knowsAbout: [
      "Product Engineering",
      "Mechanical CAD & Enclosure Design",
      "Custom PCB Schematics & Gerber Layouts",
      "Embedded Firmware Development (STM32, ESP32, RTOS)",
      "Touchscreen HMI (DWIN DGUS)",
      "Ingress Protection (IP65, IP67)",
      "Design for Manufacturing (DFM)",
      "CNC Sheet Metal Bending",
      "Plastic Injection Moulding Tooling",
      "IoT Cloud Telemetry & OTA Pipelines",
      "Turnkey Automated Machinery",
    ],
    description: COMPANY.positioning.subhead,
  };
}

/**
 * WebSite Schema with Sitelinks Search
 */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY.brandName,
    alternateName: COMPANY.legalName,
    description: COMPANY.positioning.subhead,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * BreadcrumbList Schema
 */
export function buildBreadcrumbsJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Case Study / TechArticle Schema for /work/[slug]
 */
export function buildCaseStudyJsonLd(study: CaseStudy) {
  const imageUrl = study.hero.src.startsWith("http")
    ? study.hero.src
    : `${BASE_URL}${study.hero.src}`;

  return {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "CreativeWork"],
    "@id": `${BASE_URL}/work/${study.slug}/#article`,
    headline: study.title,
    description: study.summary,
    image: [imageUrl],
    url: `${BASE_URL}/work/${study.slug}`,
    inLanguage: "en-US",
    author: {
      "@id": `${BASE_URL}/#organization`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    about: study.disciplines.map((d) => ({
      "@type": "Thing",
      name: d,
    })),
    keywords: [
      ...study.disciplines,
      study.category,
      "Hardware Engineering",
      "Product Development",
    ].join(", "),
    articleSection: study.category,
    mentions: [
      {
        "@type": "Organization",
        name: study.client,
      },
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/work/${study.slug}`,
    },
  };
}

/**
 * BlogPosting Schema for /journal/[slug]
 */
export function buildJournalArticleJsonLd(article: BlogArticleData) {
  return {

    "@context": "https://schema.org",
    "@type": ["BlogPosting", "TechArticle"],
    "@id": `${BASE_URL}/journal/${article.meta.slug}/#article`,
    headline: article.meta.title,
    description: article.meta.excerpt,
    url: `${BASE_URL}/journal/${article.meta.slug}`,
    datePublished: article.meta.isoDate,
    dateModified: article.meta.isoDate,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: article.meta.author.name,
      jobTitle: article.meta.author.role,
      url: article.meta.author.slug
        ? `${BASE_URL}/team/${article.meta.author.slug}`
        : `${BASE_URL}/about`,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    articleSection: article.meta.category,
    keywords: [article.meta.category, ...(article.meta.tags || [])].join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/journal/${article.meta.slug}`,
    },
  };
}

/**
 * Service & Offer Catalog Schema for /services
 */
export function buildServicesJsonLd(disciplines: ServiceDiscipline[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/#service`,
    name: "End-to-End Product & Hardware Engineering Services",
    serviceType: "Product Engineering",
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    description:
      "Integrated mechanical design, custom PCB development, embedded firmware, IoT telemetry, and factory manufacturing support.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engineering Disciplines",
      itemListElement: disciplines.map((disc, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: disc.title,
          description: disc.summary,
          category: disc.eyebrow,
        },
        position: idx + 1,
      })),
    },
  };
}

/**
 * 6-Stage Process HowTo Schema for /process (LLM & Rich Snippet optimization)
 */
export function buildProcessHowToJsonLd() {
  const steps = [
    {
      num: 1,
      name: "Discover",
      text: "Analyze operational constraints, mechanical envelopes, unit economics, ERD requirements, and feasibility matrix.",
      deliverables: ["ERD Specification", "Constraint Map", "BOM Budgeting"],
    },
    {
      num: 2,
      name: "Design",
      text: "Develop native 3D CAD assemblies in Autodesk Fusion 360 and multi-layer electronic schematics in KiCad with DFM validation.",
      deliverables: ["Native 3D CAD & STEP", "KiCad Schematics", "DFM Analysis"],
    },
    {
      num: 3,
      name: "Develop",
      text: "Engineer deterministic embedded firmware (C++/RTOS), custom DGUS touchscreen interfaces over UART, and cloud telemetry backends.",
      deliverables: ["PCB Gerber Layouts", "Firmware Binaries", "DGUS HMI Assets"],
    },
    {
      num: 4,
      name: "Prototype",
      text: "Fabricate functional prototypes via high-precision 3D printing, CNC machining, custom PCB populating, IP65 sealing, and vibration stress testing.",
      deliverables: ["Functional Prototypes", "Ingress Test Reports", "Vibration Logs"],
    },
    {
      num: 5,
      name: "Manufacture",
      text: "Transition validated designs to volume factory production with 2D drawings, CNC sheet metal bending specs, mold qualification, and QA jigs.",
      deliverables: ["2D Manufacturing Drawings", "Tooling DXF Packages", "Full Production BOM"],
    },
    {
      num: 6,
      name: "Deploy & Support",
      text: "Deploy connected fleets into commercial service with remote OTA firmware pipelines, cloud monitoring, and multi-year support agreements.",
      deliverables: ["Fleet Management Dashboard", "Remote OTA Pipeline", "10-Year Support SLA"],
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE_URL}/process/#howto`,
    name: "SolveMpire 6-Stage Hardware & Product Engineering Lifecycle",
    description:
      "A disciplined, end-to-end engineering methodology from initial requirements to commercial volume manufacturing and field support.",
    totalTime: "P90D",
    tool: [
      { "@type": "HowToTool", name: "Autodesk Fusion 360 (3D CAD)" },
      { "@type": "HowToTool", name: "KiCad (Multi-layer PCB Design)" },
      { "@type": "HowToTool", name: "STM32 & ESP32 Microcontrollers" },
      { "@type": "HowToTool", name: "DWIN DGUS Touchscreen Displays" },
      { "@type": "HowToTool", name: "CNC Sheet Metal Bending & 3D Printers" },
    ],
    step: steps.map((s) => ({
      "@type": "HowToStep",
      position: s.num,
      name: `Stage 0${s.num}: ${s.name}`,
      text: s.text,
      url: `${BASE_URL}/process`,
    })),
  };
}

/**
 * Person Schema for Team Members
 */
export function buildPersonJsonLd(member: TeamMember) {
  const avatarUrl = member.avatar.startsWith("http")
    ? member.avatar
    : `${BASE_URL}${member.avatar}`;

  const sameAsLinks = member.socials
    ? Object.values(member.socials).filter(Boolean) as string[]
    : [];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/team/${member.slug}/#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.shortBio,
    image: avatarUrl,
    url: `${BASE_URL}/team/${member.slug}`,
    worksFor: {
      "@id": `${BASE_URL}/#organization`,
    },
    sameAs: sameAsLinks,
    knowsAbout: member.focusAreas || [],
  };
}

/**
 * FAQPage Schema for direct LLM and Search Engine citation
 */
export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

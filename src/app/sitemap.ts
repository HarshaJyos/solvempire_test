import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { getAllJournalPosts } from "@/lib/journal-data";
import { getAllTeamMembers } from "@/lib/team-data";
import { COMPANY } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = COMPANY.websiteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${baseUrl}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const journalRoutes: MetadataRoute.Sitemap = getAllJournalPosts().map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.isoDate || Date.now()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const teamRoutes: MetadataRoute.Sitemap = getAllTeamMembers().map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...journalRoutes,
    ...teamRoutes,
  ];
}



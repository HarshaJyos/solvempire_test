import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/privacy", "/terms"],
    },
    sitemap: `${COMPANY.websiteUrl}/sitemap.xml`,
  };
}



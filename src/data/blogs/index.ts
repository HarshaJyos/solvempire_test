import { BlogArticleData, BlogMeta } from "@/types/blog-article";
import { whatIsEndToEndBlog } from "./what-is-end-to-end-product-engineering";
import { physicalProductBlog } from "./how-to-develop-a-physical-product-from-idea-to-manufacturing";
import { indiaProductEngineeringBlog } from "./product-engineering-company-in-india";
import { customAutomatedMachineBlog } from "./how-to-build-a-custom-automated-machine";
import { mechanicalElectronicsEmbeddedBlog } from "./mechanical-electronics-embedded-product-development";

export const allBlogs: BlogArticleData[] = [
  whatIsEndToEndBlog,
  physicalProductBlog,
  indiaProductEngineeringBlog,
  customAutomatedMachineBlog,
  mechanicalElectronicsEmbeddedBlog,
];

export function getBlogArticleBySlug(slug: string): BlogArticleData | undefined {
  return allBlogs.find((blog) => blog.meta.slug === slug);
}

export function getAllBlogMetas(): BlogMeta[] {
  return allBlogs.map((b) => b.meta);
}

export function getAdjacentBlogs(slug: string): {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
} {
  const index = allBlogs.findIndex((b) => b.meta.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? { title: allBlogs[index - 1].meta.title, slug: allBlogs[index - 1].meta.slug } : undefined,
    next:
      index < allBlogs.length - 1
        ? { title: allBlogs[index + 1].meta.title, slug: allBlogs[index + 1].meta.slug }
        : undefined,
  };
}

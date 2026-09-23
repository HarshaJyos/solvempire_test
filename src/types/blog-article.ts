export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  slug?: string;
}

export interface BlogMeta {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  type: string;
  author: BlogAuthor;
  coAuthors?: BlogAuthor[];
  publishedAt: string;
  isoDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogTocItem {
  id: string;
  title: string;
  level?: number;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogTableData {
  caption?: string;
  headers: string[];
  rows: string[][];
  highlightColumnIndex?: number;
}

export type BlogSection =
  | { type: "lead"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "quote"; text: string; author?: string; source?: string }
  | { type: "callout"; title: string; text: string; variant?: "insight" | "science" | "warning" | "tip" }
  | { type: "table"; data: BlogTableData }
  | { type: "divider" }
  | { type: "cta"; title: string; text: string; buttonText: string; buttonHref: string };

export interface BlogArticleData {
  meta: BlogMeta;
  tableOfContents: BlogTocItem[];
  sections: BlogSection[];
  takeaways?: string[];
  faqs: BlogFaqItem[];
}

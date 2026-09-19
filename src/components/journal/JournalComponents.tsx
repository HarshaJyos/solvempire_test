"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Info,
  Copy,
  Check,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. PARAGRAPH COMPONENT
// ============================================================================
export interface JournalParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  lead?: boolean;
}

export function JournalParagraph({
  children,
  className,
  lead = false,
  ...props
}: JournalParagraphProps) {
  return (
    <p
      className={cn(
        "text-body transition-colors",
        lead
          ? "text-lg sm:text-xl font-normal leading-[1.7] text-heading mb-6"
          : "text-base sm:text-[1.0625rem] leading-[1.75] mb-5",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Alias for quick writing
export const P = JournalParagraph;

// ============================================================================
// 2. EXTENSIBLE SPAN / INLINE TEXT COMPONENT
// ============================================================================
export interface JournalSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
  | "default"
  | "bold"
  | "italic"
  | "highlight"
  | "mint"
  | "gradient"
  | "code"
  | "badge"
  | "kbd"
  | "muted";
}

export function JournalSpan({
  children,
  className,
  variant = "default",
  ...props
}: JournalSpanProps) {
  const variantStyles: Record<string, string> = {
    default: "",
    bold: "font-semibold text-heading",
    italic: "italic text-body",
    highlight:
      "bg-ice-light text-brand px-1.5 py-0.5 rounded border border-brand/20 font-medium",
    mint: "text-brand font-semibold",
    gradient:
      "text-transparent bg-clip-text bg-gradient-to-r from-heading via-slate-700 to-brand font-bold",
    code: "font-mono text-[0.875em] bg-surface-subtle text-brand px-1.5 py-0.5 rounded border border-hairline",
    badge:
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-subtle border border-hairline text-muted",
    kbd: "font-mono text-xs px-1.5 py-0.5 rounded bg-surface-subtle border border-hairline text-heading shadow-xs",
    muted: "text-muted",
  };

  return (
    <span className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}

export const Span = JournalSpan;

// ============================================================================
// 3. HEADINGS WITH AUTO-SLUG ANCHORS
// ============================================================================
function slugify(text: React.ReactNode): string {
  if (typeof text === "string") {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  return "";
}

export interface JournalHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  id?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

export function JournalHeading({
  children,
  className,
  id,
  as: Component = "h2",
  ...props
}: JournalHeadingProps) {
  const anchorId = id || slugify(children);

  const baseStyles = {
    h1: "font-display font-bold text-3xl sm:text-4xl md:text-5xl text-heading tracking-tight leading-[1.15] mb-6 mt-10",
    h2: "font-display font-bold text-2xl sm:text-3xl text-heading tracking-tight leading-[1.25] mb-4 mt-10 pt-4 border-t border-hairline",
    h3: "font-display font-bold text-xl sm:text-2xl text-heading tracking-tight leading-[1.3] mb-3 mt-7",
    h4: "font-display font-semibold text-lg sm:text-xl text-heading mb-2 mt-5",
  };

  return (
    <Component
      id={anchorId}
      className={cn("group relative scroll-mt-24", baseStyles[Component], className)}
      {...props}
    >
      {anchorId && (
        <a
          href={`#${anchorId}`}
          className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-brand p-1"
          aria-label={`Link to ${anchorId}`}
        >
          <Hash className="w-4 h-4" />
        </a>
      )}
      {children}
    </Component>
  );
}

export const H1 = (props: JournalHeadingProps) => <JournalHeading as="h1" {...props} />;
export const H2 = (props: JournalHeadingProps) => <JournalHeading as="h2" {...props} />;
export const H3 = (props: JournalHeadingProps) => <JournalHeading as="h3" {...props} />;
export const H4 = (props: JournalHeadingProps) => <JournalHeading as="h4" {...props} />;

// ============================================================================
// 4. UNORDERED LIST (UL) WITH NESTED LIST SUPPORT
// ============================================================================
// 4. UNORDERED LIST (UL) WITH NESTED LIST SUPPORT
// ============================================================================
export interface JournalListProps extends React.HTMLAttributes<HTMLUListElement> {
  nested?: boolean;
  bulletVariant?: "mint" | "dash" | "check";
}

export function JournalUL({
  children,
  className,
  nested = false,
  bulletVariant = "mint",
  ...props
}: JournalListProps) {
  return (
    <ul
      className={cn(
        "space-y-2.5 text-body text-base sm:text-[1.0625rem] leading-[1.75] list-disc list-outside pl-6 my-5 marker:text-brand",
        nested ? "mt-2.5 ml-4 pl-4 border-l border-hairline space-y-2 list-circle marker:text-muted" : "my-5 pl-6",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

// ============================================================================
// 5. ORDERED LIST (OL) WITH NESTED LIST SUPPORT
// ============================================================================
export interface JournalOLProps extends React.HTMLAttributes<HTMLOListElement> {
  nested?: boolean;
}

export function JournalOL({
  children,
  className,
  nested = false,
  ...props
}: JournalOLProps) {
  return (
    <ol
      className={cn(
        "list-decimal list-outside space-y-3 text-body text-base sm:text-[1.0625rem] leading-[1.75] my-5 pl-6 marker:text-brand marker:font-semibold",
        nested ? "mt-2.5 ml-4 pl-4 border-l border-hairline space-y-2 list-[lower-alpha]" : "my-5 pl-6",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

// ============================================================================
// 6. LIST ITEM WITH NESTING COMPATIBILITY
// ============================================================================
export interface JournalListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  icon?: React.ReactNode;
}

export function JournalListItem({
  children,
  className,
  icon,
  ...props
}: JournalListItemProps) {
  return (
    <li className={cn("pl-1 text-body text-base sm:text-[1.0625rem] leading-[1.75]", className)} {...props}>
      {icon && <span className="inline-block mr-2 align-middle">{icon}</span>}
      {children}
    </li>
  );
}

export const LI = JournalListItem;

// ============================================================================
// 7. SMART EXTENSIBLE LINK COMPONENT
// ============================================================================
export interface JournalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

export function JournalLink({
  href,
  children,
  className,
  external,
  ...props
}: JournalLinkProps) {
  const isExternal = external ?? href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1 text-brand hover:underline font-medium underline-offset-4 decoration-brand/30 hover:decoration-brand transition-all",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "text-brand hover:underline font-medium underline-offset-4 decoration-brand/30 hover:decoration-brand transition-all",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

// ============================================================================
// 8. RESPONSIVE IMAGE COMPONENT WITH CAPTION & ZOOM
// ============================================================================
export interface JournalImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "21/9" | "auto";
  priority?: boolean;
}

export function JournalImage({
  src,
  alt,
  caption,
  className,
  aspectRatio = "16/9",
  priority = false,
}: JournalImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <figure className={cn("my-8 space-y-2.5", className)}>
      <div
        onClick={() => setIsZoomed(!isZoomed)}
        className="relative overflow-hidden rounded-2xl bg-surface border border-hairline hover:border-brand/40 transition-all cursor-pointer group shadow-sm"
        style={{ aspectRatio: aspectRatio === "auto" ? undefined : aspectRatio }}
      >
        <Image
          src={src}
          alt={alt}
          fill={aspectRatio !== "auto"}
          width={aspectRatio === "auto" ? 1200 : undefined}
          height={aspectRatio === "auto" ? 675 : undefined}
          priority={priority}
          className="object-cover w-full h-full group-hover:scale-[1.01] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-xs text-white font-medium bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
            Click to view full image
          </span>
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-xs sm:text-sm text-muted">
          {caption}
        </figcaption>
      )}

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </figure>
  );
}

// ============================================================================
// 9. CALLOUT BOX
// ============================================================================
export interface JournalCalloutProps {
  children: React.ReactNode;
  variant?: "insight" | "science" | "takeaway" | "warning" | "tip";
  title?: string;
  className?: string;
}

export function JournalCallout({
  children,
  variant = "insight",
  title,
  className,
}: JournalCalloutProps) {
  const configs = {
    insight: {
      icon: <Sparkles className="w-5 h-5 text-brand" />,
      bg: "bg-ice-light/60 border-brand/25 text-body shadow-xs",
      accent: "text-brand",
      defaultTitle: "Engineering Insight",
    },
    science: {
      icon: <Lightbulb className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50/70 border-blue-200 text-slate-700 shadow-xs",
      accent: "text-blue-700",
      defaultTitle: "Technical Architecture Note",
    },
    takeaway: {
      icon: <CheckCircle2 className="w-5 h-5 text-brand" />,
      bg: "bg-surface border-hairline text-body shadow-xs",
      accent: "text-brand",
      defaultTitle: "Key Takeaway",
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50/80 border-amber-200 text-amber-900 shadow-xs",
      accent: "text-amber-800",
      defaultTitle: "Design Constraint / Warning",
    },
    tip: {
      icon: <Info className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50/80 border-cyan-200 text-cyan-950 shadow-xs",
      accent: "text-cyan-800",
      defaultTitle: "Practical Tip",
    },
  };

  const config = configs[variant];

  return (
    <div
      className={cn(
        "my-7 p-5 sm:p-6 rounded-2xl border space-y-2.5",
        config.bg,
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="shrink-0">{config.icon}</div>
        <h4 className={cn("font-display font-bold text-base tracking-tight", config.accent)}>
          {title || config.defaultTitle}
        </h4>
      </div>
      <div className="text-body text-sm sm:text-base leading-[1.7] pl-7">
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 10. BLOCKQUOTE / PULL QUOTE
// ============================================================================
export interface JournalQuoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

export function JournalQuote({
  children,
  author,
  source,
  className,
}: JournalQuoteProps) {
  return (
    <blockquote
      className={cn(
        "my-8 pl-6 border-l-4 border-brand italic text-lg sm:text-xl text-heading leading-[1.6] bg-surface border-y border-r border-hairline py-4 pr-6 rounded-r-2xl shadow-xs",
        className
      )}
    >
      <p className="mb-2">“{children}”</p>
      {(author || source) && (
        <footer className="text-xs sm:text-sm font-normal not-italic text-muted">
          {author && <strong className="text-heading font-medium">{author}</strong>}
          {author && source && " — "}
          {source && <span>{source}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// ============================================================================
// 11. CODE BLOCK WITH COPY BUTTON
// ============================================================================
export interface JournalCodeProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function JournalCode({
  code,
  language = "typescript",
  filename,
  className,
}: JournalCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("my-6 rounded-2xl overflow-hidden border border-slate-800 bg-ink text-slate-100 shadow-md", className)}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          {filename && <span className="ml-2 font-mono text-white">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="uppercase font-mono text-[10px] tracking-wider text-slate-400">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-brand-light transition-colors p-1 rounded hover:bg-white/5 cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-light" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ============================================================================
// 12. SUMMARY TAKEAWAYS BOX
// ============================================================================
export interface JournalTakeawaysProps {
  points: Array<string | React.ReactNode>;
  title?: string;
  className?: string;
}

export function JournalTakeaways({
  points,
  title = "Key Summary & Takeaways",
  className,
}: JournalTakeawaysProps) {
  return (
    <div className={cn("my-8 p-6 sm:p-8 rounded-2xl bg-ice-light/60 border border-brand/20 shadow-xs", className)}>
      <div className="flex items-center gap-2.5 mb-4">
        <Sparkles className="w-5 h-5 text-brand" />
        <h3 className="font-display font-bold text-lg sm:text-xl text-heading">
          {title}
        </h3>
      </div>
      <ul className="space-y-3 text-sm sm:text-base text-body">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-brand mt-1 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================================
// 13. SECTION DIVIDER
// ============================================================================
export function JournalDivider({ className }: { className?: string }) {
  return (
    <div className={cn("my-12 flex items-center justify-center gap-3", className)}>
      <div className="h-px bg-gradient-to-r from-transparent via-hairline to-transparent flex-1" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
      <div className="h-px bg-gradient-to-r from-transparent via-hairline to-transparent flex-1" />
    </div>
  );
}


// Re-export FAQ, Related, Table and JsonLd components for unified editorial imports
export { JournalFaq } from "./JournalFaq";
export { JournalRelated } from "./JournalRelated";
export { JournalJsonLd } from "./JournalJsonLd";
export {
  JournalTable,
  JournalTableHead,
  JournalTableBody,
  JournalTableFooter,
  JournalTableRow,
  JournalTableHeaderCell,
  JournalTableCell,
  JournalTableCaption,
  JournalDataTable,
  Table,
  THead,
  TBody,
  TFoot,
  TR,
  TH,
  TD,
  TableCaption,
  DataTable,
} from "./JournalTable";
export type {
  JournalTableProps,
  JournalTableHeadProps,
  JournalTableBodyProps,
  JournalTableFooterProps,
  JournalTableRowProps,
  JournalTableHeaderCellProps,
  JournalTableCellProps,
  JournalTableCaptionProps,
  JournalDataTableProps,
} from "./JournalTable";

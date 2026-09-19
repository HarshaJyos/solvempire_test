"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Table as TableIcon } from "lucide-react";

// ============================================================================
// 1. TABLE CONTAINER & WRAPPER
// ============================================================================
export interface JournalTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: string | React.ReactNode;
  captionSide?: "top" | "bottom";
  striped?: boolean;
  compact?: boolean;
  hoverable?: boolean;
  wrapperClassName?: string;
  bordered?: boolean;
}

export function JournalTable({
  children,
  className,
  wrapperClassName,
  caption,
  captionSide = "bottom",
  striped = true,
  compact = false,
  hoverable = true,
  bordered = true,
  ...props
}: JournalTableProps) {
  return (
    <div className={cn("my-8 space-y-2.5", wrapperClassName)}>
      {caption && captionSide === "top" && (
        <div className="flex items-center gap-2 px-1 font-body text-xs sm:text-sm text-muted">
          <TableIcon className="w-3.5 h-3.5 text-brand" />
          <span>{caption}</span>
        </div>
      )}

      <div
        className={cn(
          "relative overflow-x-auto rounded-2xl bg-surface shadow-xs",
          bordered && "border border-hairline",
          "scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent"
        )}
      >
        <table
          className={cn(
            "w-full text-left border-collapse font-body text-sm sm:text-base",
            striped && "[&_tbody_tr:nth-child(even)]:bg-surface-subtle/50",
            hoverable && "[&_tbody_tr:hover]:bg-ice-light/40 [&_tbody_tr]:transition-colors",
            compact && "[&_th]:py-2.5 [&_th]:px-3.5 [&_td]:py-2.5 [&_td]:px-3.5 text-xs sm:text-sm",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>

      {caption && captionSide === "bottom" && (
        <div className="flex items-center justify-center gap-2 px-1 font-body text-xs text-muted text-center pt-1">
          <TableIcon className="w-3 h-3 text-brand/70" />
          <span>{caption}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. THEAD (TABLE HEADER WRAPPER)
// ============================================================================
export interface JournalTableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableHead({ children, className, ...props }: JournalTableHeadProps) {
  return (
    <thead
      className={cn(
        "bg-surface-subtle border-b border-hairline text-xs font-display font-semibold uppercase tracking-wider text-muted",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

// ============================================================================
// 3. TBODY (TABLE BODY WRAPPER)
// ============================================================================
export interface JournalTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableBody({ children, className, ...props }: JournalTableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-hairline text-body", className)} {...props}>
      {children}
    </tbody>
  );
}

// ============================================================================
// 4. TFOOT (TABLE FOOTER WRAPPER)
// ============================================================================
export interface JournalTableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

export function JournalTableFooter({ children, className, ...props }: JournalTableFooterProps) {
  return (
    <tfoot
      className={cn(
        "bg-surface-subtle border-t-2 border-hairline font-medium text-xs sm:text-sm text-heading",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
}

// ============================================================================
// 5. TR (TABLE ROW)
// ============================================================================
export interface JournalTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: "default" | "highlight" | "mint" | "warning" | "danger" | "muted";
  selected?: boolean;
}

export function JournalTableRow({
  children,
  className,
  variant = "default",
  selected = false,
  ...props
}: JournalTableRowProps) {
  const variantStyles = {
    default: "",
    highlight: "bg-ice-light/80 hover:bg-ice-light text-heading",
    mint: "bg-ice-light text-brand font-medium",
    warning: "bg-amber-50/80 hover:bg-amber-100/60 text-amber-900",
    danger: "bg-red-50/80 hover:bg-red-100/60 text-red-900",
    muted: "opacity-60 bg-transparent",
  };

  return (
    <tr
      className={cn(
        "border-b border-hairline last:border-none",
        variantStyles[variant],
        selected && "bg-ice-light",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

// ============================================================================
// 6. TH (TABLE HEADER CELL)
// ============================================================================
export interface JournalTableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
}

export function JournalTableHeaderCell({
  children,
  className,
  align = "left",
  ...props
}: JournalTableHeaderCellProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <th
      className={cn(
        "px-4 sm:px-6 py-3.5 sm:py-4 font-display font-semibold text-xs sm:text-sm text-heading tracking-wider",
        alignStyles[align],
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

// ============================================================================
// 7. TD (TABLE BODY CELL)
// ============================================================================
export interface JournalTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "center" | "right";
  variant?: "default" | "mint" | "bold" | "mono" | "muted" | "badge";
}

export function JournalTableCell({
  children,
  className,
  align = "left",
  variant = "default",
  ...props
}: JournalTableCellProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const variantStyles = {
    default: "text-body",
    mint: "text-brand font-semibold",
    bold: "font-semibold text-heading",
    mono: "font-mono text-xs sm:text-sm text-brand",
    muted: "text-xs text-muted",
    badge: "font-medium",
  };

  return (
    <td
      className={cn(
        "px-4 sm:px-6 py-3.5 sm:py-4 font-body leading-relaxed align-middle",
        alignStyles[align],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

// ============================================================================
// 8. TABLE CAPTION / TITLE COMPONENT
// ============================================================================
export interface JournalTableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export function JournalTableCaption({
  children,
  className,
  ...props
}: JournalTableCaptionProps) {
  return (
    <caption
      className={cn("p-3 text-xs sm:text-sm text-muted text-center font-body", className)}
      {...props}
    >
      {children}
    </caption>
  );
}

// ============================================================================
// 9. CONVENIENCE DECLARATIVE COMPONENT: JournalDataTable
// ============================================================================
export interface JournalDataTableProps {
  headers: Array<string | React.ReactNode>;
  rows: Array<Array<string | React.ReactNode>>;
  caption?: string | React.ReactNode;
  captionSide?: "top" | "bottom";
  striped?: boolean;
  compact?: boolean;
  highlightRowIndex?: number;
  className?: string;
  wrapperClassName?: string;
}

export function JournalDataTable({
  headers,
  rows,
  caption,
  captionSide = "bottom",
  striped = true,
  compact = false,
  highlightRowIndex,
  className,
  wrapperClassName,
}: JournalDataTableProps) {
  return (
    <JournalTable
      caption={caption}
      captionSide={captionSide}
      striped={striped}
      compact={compact}
      className={className}
      wrapperClassName={wrapperClassName}
    >
      <JournalTableHead>
        <JournalTableRow>
          {headers.map((header, idx) => (
            <JournalTableHeaderCell key={idx}>{header}</JournalTableHeaderCell>
          ))}
        </JournalTableRow>
      </JournalTableHead>
      <JournalTableBody>
        {rows.map((row, rowIdx) => (
          <JournalTableRow
            key={rowIdx}
            variant={highlightRowIndex === rowIdx ? "highlight" : "default"}
          >
            {row.map((cell, cellIdx) => (
              <JournalTableCell key={cellIdx}>{cell}</JournalTableCell>
            ))}
          </JournalTableRow>
        ))}
      </JournalTableBody>
    </JournalTable>
  );
}

// ============================================================================
// CONCISE ALIASES FOR EDITORIAL PRODUCTIVITY
// ============================================================================
export const Table = JournalTable;
export const THead = JournalTableHead;
export const TBody = JournalTableBody;
export const TFoot = JournalTableFooter;
export const TR = JournalTableRow;
export const TH = JournalTableHeaderCell;
export const TD = JournalTableCell;
export const TableCaption = JournalTableCaption;
export const DataTable = JournalDataTable;

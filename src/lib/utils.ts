import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names conditionally.
 * Lightweight alternative to clsx + twMerge for this project.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a Firestore timestamp or date string for display.
 */
export function formatDate(date: Date | string | { toDate: () => Date }): string {
  const d = typeof date === "string" 
    ? new Date(date)
    : "toDate" in date 
      ? date.toDate()
      : date;
  
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

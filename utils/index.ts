import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDistance(miles: number): string {
  return `${miles.toFixed(1)} mi`;
}

export function formatFreshnessBadge(score: number): string {
  return `${score}% AI Verified`;
}

/**
 * Converts a name string to nominative (title) case (e.g. "bhaskar" -> "Bhaskar").
 * Fallback to "Bhaskar" for generic admin role titles.
 */
export function toNominativeCase(name?: string): string {
  if (!name || ['admin', 'administrator', 'user', 'super admin', ''].includes(name.trim().toLowerCase())) {
    return 'Bhaskar';
  }
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

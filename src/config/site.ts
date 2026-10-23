/**
 * Deployment-specific settings, read from VITE_* environment variables at build time.
 * See .env.example. These values are public; never put secrets in VITE_* variables.
 */
export interface SiteConfig {
  /** Verified production origin without a trailing slash, or null if not configured. */
  siteUrl: string | null;
  /** True only when indexing is explicitly enabled AND a production URL is set. */
  allowIndexing: boolean;
  /** Quote form endpoint, or null if the form has not been connected yet. */
  quoteEndpoint: string | null;
}

const clean = (value: string | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

/** Only HTTPS endpoints are accepted (plain HTTP is allowed for localhost testing). */
const secureEndpoint = (value: string | null): string | null => {
  if (!value) return null;
  return /^https:\/\//i.test(value) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//i.test(value) ? value : null;
};

const siteUrl = clean(import.meta.env.VITE_SITE_URL)?.replace(/\/+$/, '') ?? null;

export const siteConfig: SiteConfig = {
  siteUrl,
  allowIndexing: siteUrl !== null && import.meta.env.VITE_ALLOW_INDEXING === 'true',
  quoteEndpoint: secureEndpoint(clean(import.meta.env.VITE_QUOTE_ENDPOINT)),
};

/** Absolute URL for a path, or null when the production domain is not configured. */
export const absoluteUrl = (path: string): string | null =>
  siteConfig.siteUrl ? `${siteConfig.siteUrl}${path === '/' ? '/' : path}` : null;

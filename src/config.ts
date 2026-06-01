/**
 * Global site configuration.
 * Most of these can be overridden with environment variables at build time.
 */
export const SITE = {
  /** Brand name shown in the header, titles, etc. */
  name: 'Kelvo',
  /** Default locale used for the <html lang> fallback and x-default hreflang. */
  defaultLocale: 'en' as const,
  /** Supported locales. Order matters for the language switcher. */
  locales: ['en', 'es'] as const,
  /**
   * Google AdSense publisher id, e.g. "ca-pub-1234567890123456".
   * Leave empty to render NO ads at all (recommended until you're approved).
   * Set the ADSENSE_CLIENT env var to enable.
   */
  adsenseClient: process.env.ADSENSE_CLIENT || '',
};

export type Locale = (typeof SITE.locales)[number];

/** The canonical production origin (no trailing slash). Used for absolute URLs in JSON-LD/OG. */
export const ORIGIN = (process.env.SITE_URL || 'https://kelvo.com').replace(/\/$/, '');

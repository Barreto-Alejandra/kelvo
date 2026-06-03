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
};

export type Locale = (typeof SITE.locales)[number];

/** The canonical production origin (no trailing slash). Used for absolute URLs in JSON-LD/OG. */
export const ORIGIN = (process.env.SITE_URL || 'https://kelvo.com').replace(/\/$/, '');

/**
 * Contact details shown on the About / Privacy / Terms pages. Single source of
 * truth — set CONTACT_EMAIL once you have a real inbox (e.g. a @kelvo domain
 * address) and it updates everywhere. The default is a placeholder.
 */
export const CONTACT = {
  email: process.env.CONTACT_EMAIL || 'hola@kelvo.com',
};

/** Date the legal pages were last reviewed (shown on Privacy/Terms). */
export const LEGAL_UPDATED = { en: 'June 3, 2026', es: '3 de junio de 2026' };

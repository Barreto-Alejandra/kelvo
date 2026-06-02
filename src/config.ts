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

/**
 * Kelvo Pro — one-time purchase (no ads, no subscription). Powered by Lemon
 * Squeezy as Merchant of Record (it handles VAT/tax). License validation runs
 * entirely client-side via the public License API, so no server is required.
 *
 * Fill these in once the product exists in Lemon Squeezy. Until `checkoutUrl`
 * is set, the Pro page shows a "coming soon" state instead of a buy button.
 */
export const PRO = {
  /** Hosted checkout / buy link, e.g. "https://kelvo.lemonsqueezy.com/buy/XXXX". */
  checkoutUrl: process.env.PRO_CHECKOUT_URL || '',
  /** Lemon Squeezy store id (number) — needed by the license validate/activate API. */
  storeId: process.env.PRO_STORE_ID || '',
  /** Price shown on the Pro page (display only; Lemon Squeezy is the source of truth). */
  price: process.env.PRO_PRICE || 'US$9',
  /** localStorage key that marks a device as Pro. */
  storageKey: 'kelvo_pro',
};

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
export const LEGAL_UPDATED = { en: 'June 2, 2026', es: '2 de junio de 2026' };

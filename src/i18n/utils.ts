import { SITE, type Locale } from '@/config';
import { tools, type Tool } from './tools';

export const locales = SITE.locales;
export const defaultLocale = SITE.defaultLocale;

/**
 * Prefix a root-relative path ("/en/...") with the site base ("/" or "/kelvo/").
 * Astro guarantees BASE_URL ends with a slash; we strip it and re-join so the
 * result has exactly one slash between base and path.
 */
const BASE = import.meta.env.BASE_URL || '/';
export function withBase(path: string): string {
  const base = BASE.replace(/\/$/, '');
  return base + path;
}

/** Extract the locale from a URL pathname, falling back to the default. */
export function getLocale(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg)
    ? (seg as Locale)
    : defaultLocale;
}

/** Home path for a locale, e.g. "/en" (or "/kelvo/en" under a base). */
export function homePath(locale: Locale): string {
  return withBase(`/${locale}`);
}

/** Public URL path for a tool in a given locale, e.g. "/es/comprimir-imagen". */
export function toolPath(locale: Locale, tool: Tool): string {
  return withBase(`/${locale}/${tool.content[locale].slug}`);
}

/**
 * Build the set of hreflang alternates for a page.
 * `kind` is "home" or a tool id. Returns [{ locale, href }] with absolute-free paths.
 */
export function alternatesFor(kind: 'home' | string): { locale: Locale; path: string }[] {
  if (kind === 'home') {
    return locales.map((l) => ({ locale: l, path: homePath(l) }));
  }
  const tool = tools.find((t) => t.id === kind);
  if (!tool) return [];
  return locales.map((l) => ({ locale: l, path: toolPath(l, tool) }));
}

/** The "other" locale for a simple two-language switcher, given current locale + page kind. */
export function switchLocalePath(current: Locale, kind: 'home' | string): { locale: Locale; path: string }[] {
  return alternatesFor(kind);
}

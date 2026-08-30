import { ui, LOCALES, DEFAULT_LOCALE, type Locale, type UIKey } from './ui';

/** Read the locale out of a URL. `/es/work` -> 'es'; anything else -> 'en'. */
export function localeFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return (LOCALES as readonly string[]).includes(first) ? (first as Locale) : DEFAULT_LOCALE;
}

/** Translator bound to one locale. Missing keys fall back to English, never to a blank. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
  };
}

/**
 * Build a path for a locale. `path` is always the canonical English-rooted path
 * ('/', '/work', '/work/apollyon'); the default locale gets no prefix.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = '/' + path.replace(/^\/+|\/+$/g, '');
  if (locale === DEFAULT_LOCALE) return clean === '/' ? '/' : clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

/** The other locale, for the language switch. Two locales, so this is a toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}

/** Every locale's URL for one page, for <link rel="alternate" hreflang>. */
export function alternates(path: string): Array<{ locale: Locale; href: string }> {
  return LOCALES.map((locale) => ({ locale, href: localePath(locale, path) }));
}

export { LOCALES, DEFAULT_LOCALE, type Locale, type UIKey };

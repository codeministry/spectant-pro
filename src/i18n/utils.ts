import { de } from './de';
import { en } from './en';
import type { Dict, Locale } from './types';

export const LOCALES: Locale[] = ['en', 'de'];
export const DEFAULT_LOCALE: Locale = 'en';

const DICTS: Record<Locale, Dict> = { en, de };

export function t(locale: Locale): Dict {
  return DICTS[locale];
}

export function toLocale(value: string | undefined): Locale {
  return value === 'de' ? 'de' : DEFAULT_LOCALE;
}

/** Home path of a locale: `/` for the default locale, `/de` otherwise (no trailing slash). */
export function homePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'de' : 'en';
}

import type { Locale } from '@i18n/ui';

const MONTHS: Record<Locale, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
};

/** '2024-10' -> 'Oct 2024' / 'oct 2024'. */
export function month(value: string, locale: Locale): string {
  const [year, mm] = value.split('-');
  if (!mm) return year;
  return `${MONTHS[locale][Number(mm) - 1]} ${year}`;
}

/** An open-ended range needs the word for "now", not an empty side. */
export function period(start: string, end: string | null, locale: Locale, present: string): string {
  return `${month(start, locale)} — ${end ? month(end, locale) : present}`;
}

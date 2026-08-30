import type { Locale } from '@i18n/ui';
import type { Price, PriceByLocale, PriceUnit } from '@data/services';

const LOCALE_TAG: Record<Locale, string> = { en: 'en-US', es: 'es-CO' };

const UNIT: Record<PriceUnit, Record<Locale, string>> = {
  project: { en: 'per project', es: 'por proyecto' },
  month: { en: 'per month', es: 'al mes' },
  hour: { en: 'per hour', es: 'por hora' },
  'hour-per-student': { en: 'per hour, per student', es: 'por hora, por estudiante' },
};

/**
 * Formats a price range for display. Returns null when there is no price, so a
 * caller can omit the line entirely rather than render an empty one.
 *
 * COP is shown without decimals -- a figure in the millions with two decimal
 * places reads as a bank statement, not a rate.
 */
export function formatPrice(
  price: PriceByLocale | null,
  locale: Locale,
): { amount: string; unit: string } | null {
  if (!price) return null;
  const p: Price = price[locale];

  const money = (n: number) =>
    new Intl.NumberFormat(LOCALE_TAG[locale], {
      style: 'currency',
      currency: p.currency,
      maximumFractionDigits: 0,
    }).format(n);

  return {
    amount: p.to ? `${money(p.from)} – ${money(p.to)}` : money(p.from),
    unit: UNIT[p.unit][locale],
  };
}

import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {defaultLocale, locales, type Locale} from './locales';
import {getPublicSiteSettings} from '@/lib/site-settings';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const settings = await getPublicSiteSettings();
  const configuredFallback = locales.includes(settings.defaultLanguage as Locale)
    ? (settings.defaultLanguage as Locale)
    : defaultLocale;

  const english = await import('../../messages/en.json').then((m) => m.default);
  const fallback = configuredFallback === 'en'
    ? {}
    : await import(`../../messages/${configuredFallback}.json`).then((m) => m.default);
  const localized = locale === configuredFallback
    ? {}
    : locale === 'en'
      ? {}
      : await import(`../../messages/${locale}.json`).then((m) => m.default);

  return {
    locale,
    messages: deepMerge(deepMerge(english, fallback), localized)
  };
});

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {...base};
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    if (isObject(current) && isObject(value)) result[key] = deepMerge(current, value);
    else result[key] = value;
  }
  return result;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

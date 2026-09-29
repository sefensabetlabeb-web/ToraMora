import {defaultLocale, type Locale} from '@/i18n/locales';

const fallbackUrl = 'https://example.com';

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl;
  return raw.replace(/\/$/, '');
}

export function localizedPath(locale: Locale | string, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return normalized;
  return `/${locale}${normalized === '/' ? '' : normalized}`;
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

import {revalidatePath} from 'next/cache';
import {locales} from '@/i18n/locales';

function localized(path: string, locale: string) {
  if (locale === 'en') return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

export function revalidatePublicSite() {
  revalidatePath('/', 'layout');
  for (const locale of locales) {
    revalidatePath(localized('/', locale));
    revalidatePath(localized('/trips', locale));
    revalidatePath(localized('/contact', locale));
    revalidatePath(localized('/book', locale));
  }
}

export function revalidatePublicTrip(slug: string) {
  revalidatePath('/', 'layout');
  for (const locale of locales) {
    revalidatePath(localized('/', locale));
    revalidatePath(localized('/trips', locale));
    revalidatePath(localized(`/trips/${slug}`, locale));
  }
}

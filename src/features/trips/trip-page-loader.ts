import {cache} from 'react';
import {getTripBySlug} from '@/features/trips/trip-service';
import {localizeTrip} from '@/features/trips/trip-localization';
import type {Locale} from '@/i18n/locales';
import {getPublicSiteSettings} from '@/lib/site-settings';

export const loadTripPageData = cache(async (slug: string, locale: Locale) => {
  const base = await getTripBySlug(slug);

  if (!base) {
    return null;
  }

  const [trip, settings] = await Promise.all([
    localizeTrip(base, locale),
    getPublicSiteSettings()
  ]);

  return {trip, settings};
});

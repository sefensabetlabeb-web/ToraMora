import type {Locale} from '@/i18n/locales';
import type {Trip} from '@/types/trip';
import {prisma} from '@/lib/database/prisma';
import {findBundledTripTranslation} from '@/data/trip-translations/all';

type TripSection = {title: string; description?: string};
type TripGalleryItem = {src: string; alt: string};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function stringArray(value: unknown): string[] | undefined {
  return Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : undefined;
}

function sectionArray(value: unknown): TripSection[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const sections: TripSection[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.title !== 'string') continue;
    sections.push({
      title: item.title,
      description: typeof item.description === 'string' ? item.description : undefined
    });
  }

  return sections.length > 0 ? sections : undefined;
}

function galleryArray(value: unknown): TripGalleryItem[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items: TripGalleryItem[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.src !== 'string' || typeof item.alt !== 'string') continue;
    items.push({src: item.src, alt: item.alt});
  }

  return items.length > 0 ? items : undefined;
}

function applyBundled(base: Trip, locale: string): Trip {
  const translation = findBundledTripTranslation(base.slug, locale);
  if (!translation) return base;

  return {
    ...base,
    title: translation.title,
    eyebrow: translation.eyebrow,
    shortDescription: translation.shortDescription,
    duration: translation.duration,
    highlights: translation.highlights,
    itinerary: translation.itinerary,
    included: translation.included,
    excluded: translation.excluded,
    whatToBring: translation.whatToBring,
    whatsappMessage: translation.whatsappMessage,
    seo: {title: translation.seoTitle, description: translation.seoDescription}
  };
}

export async function localizeTrip(base: Trip, locale: Locale): Promise<Trip> {
  if (locale === 'en') return base;
  const fallback = applyBundled(base, locale);
  if (!process.env.DATABASE_URL) return fallback;

  try {
    const row = await prisma.trip.findUnique({
      where: {slug: base.slug},
      select: {translations: {where: {locale}, take: 1}}
    });
    const translation = row?.translations[0];
    if (!translation) return fallback;

    return {
      ...fallback,
      title: translation.title || fallback.title,
      eyebrow: translation.eyebrow || fallback.eyebrow,
      shortDescription: translation.shortDescription || fallback.shortDescription,
      duration: translation.duration || fallback.duration,
      gallery: galleryArray(translation.gallery) || fallback.gallery,
      highlights: sectionArray(translation.highlights) || fallback.highlights,
      itinerary: sectionArray(translation.itinerary) || fallback.itinerary,
      included: stringArray(translation.included) || fallback.included,
      excluded: stringArray(translation.excluded) || fallback.excluded,
      whatToBring: stringArray(translation.whatToBring) || fallback.whatToBring,
      whatsappMessage: translation.whatsappMessage || fallback.whatsappMessage,
      seo: {
        title: translation.seoTitle || fallback.seo.title,
        description: translation.seoDescription || fallback.seo.description
      }
    };
  } catch {
    return fallback;
  }
}

export async function localizeTrips(trips: Trip[], locale: Locale): Promise<Trip[]> {
  if (locale === 'en' || trips.length === 0) return trips;

  const fallbackTrips = trips.map((trip) => applyBundled(trip, locale));
  if (!process.env.DATABASE_URL) return fallbackTrips;

  try {
    const rows = await prisma.trip.findMany({
      where: {slug: {in: trips.map((trip) => trip.slug)}},
      select: {
        slug: true,
        translations: {where: {locale}, take: 1}
      }
    });

    const bySlug = new Map(rows.map((row) => [row.slug, row.translations[0]]));

    return fallbackTrips.map((fallback) => {
      const translation = bySlug.get(fallback.slug);
      if (!translation) return fallback;

      return {
        ...fallback,
        title: translation.title || fallback.title,
        eyebrow: translation.eyebrow || fallback.eyebrow,
        shortDescription: translation.shortDescription || fallback.shortDescription,
        duration: translation.duration || fallback.duration,
        gallery: galleryArray(translation.gallery) || fallback.gallery,
        highlights: sectionArray(translation.highlights) || fallback.highlights,
        itinerary: sectionArray(translation.itinerary) || fallback.itinerary,
        included: stringArray(translation.included) || fallback.included,
        excluded: stringArray(translation.excluded) || fallback.excluded,
        whatToBring: stringArray(translation.whatToBring) || fallback.whatToBring,
        whatsappMessage: translation.whatsappMessage || fallback.whatsappMessage,
        seo: {
          title: translation.seoTitle || fallback.seo.title,
          description: translation.seoDescription || fallback.seo.description
        }
      };
    });
  } catch {
    return fallbackTrips;
  }
}

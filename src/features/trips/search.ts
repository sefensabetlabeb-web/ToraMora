import type {Trip} from '@/types/trip';

export function normalizeSearchText(value: string, locale = 'en') {
  return value
    .toLocaleLowerCase(locale)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[’'`´]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function buildTripSearchText(trip: Trip, categoryLabel: string) {
  const sectionText = [...trip.highlights, ...trip.itinerary]
    .flatMap((item) => [item.title, item.description ?? '']);

  return [
    trip.title,
    trip.shortDescription,
    trip.duration,
    categoryLabel,
    ...sectionText,
    ...trip.included,
    ...trip.excluded,
    ...trip.whatToBring
  ].join(' ');
}

export function tripMatchesQuery(trip: Trip, query: string, locale: string, categoryLabel = '') {
  const normalizedQuery = normalizeSearchText(query, locale);
  if (!normalizedQuery) return true;

  const haystack = normalizeSearchText(buildTripSearchText(trip, categoryLabel), locale);
  return normalizedQuery.split(/\s+/).every((token) => haystack.includes(token));
}

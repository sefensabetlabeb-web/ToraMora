import type {Trip, TripCategory, TripImage, TripSectionItem} from '@/types/trip';
import type {Trip as PrismaTripModel} from '@/generated/prisma/client';
import type {TripRepository} from '@/features/trips/trip-repository';
import {prisma} from '@/lib/database/prisma';

const categories = new Set<TripCategory>([
  'culture',
  'islands-snorkeling',
  'diving-sea',
  'desert-adventure',
  'family-city',
  'private'
]);

function category(value: string): TripCategory {
  return categories.has(value as TripCategory) ? (value as TripCategory) : 'family-city';
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function sectionArray(value: unknown): TripSectionItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    if (typeof record.title !== 'string') return [];
    return [{
      title: record.title,
      description: typeof record.description === 'string' ? record.description : undefined
    }];
  });
}

function galleryArray(value: unknown): TripImage[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    if (typeof record.src !== 'string' || typeof record.alt !== 'string') return [];
    return [{src: record.src, alt: record.alt}];
  });
}

function toTrip(row: PrismaTripModel): Trip {
  const gallery = galleryArray(row.gallery);
  const heroSrc = row.heroImage || gallery[0]?.src || '/images/trips/catalog/cairo-1.svg';
  const heroAlt = gallery.find((item) => item.src === heroSrc)?.alt || row.title;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    eyebrow: row.eyebrow || row.title,
    shortDescription: row.shortDescription,
    duration: row.duration,
    priceFrom: Number(row.priceFrom),
    currency: row.currency.toUpperCase(),
    priceMode: row.priceMode === 'sample' ? 'sample' : 'live',
    image: heroSrc,
    heroImage: {src: heroSrc, alt: heroAlt},
    gallery: gallery.length ? gallery : [{src: heroSrc, alt: heroAlt}],
    category: category(row.category),
    categoryLabel: row.categoryLabel,
    status: row.status === 'published' || row.status === 'disabled' ? row.status : 'draft',
    featured: row.featured,
    popular: row.popular,
    sortOrder: row.sortOrder,
    highlights: sectionArray(row.highlights),
    itinerary: sectionArray(row.itinerary),
    included: stringArray(row.included),
    excluded: stringArray(row.excluded),
    whatToBring: stringArray(row.whatToBring),
    whatsappMessage: row.whatsappMessage || `Hello, I am interested in the ${row.title} from Hurghada.`,
    seo: {
      title: row.seoTitle || `${row.title} | ToraMora`,
      description: row.seoDescription || row.shortDescription
    }
  };
}

async function publishedRows() {
  return prisma.trip.findMany({where: {status: 'published'}, orderBy: {sortOrder: 'asc'}});
}

export const prismaTripRepository: TripRepository = {
  async listPublished() {
    return (await publishedRows()).map(toTrip);
  },
  async listFeatured() {
    const rows = await prisma.trip.findMany({
      where: {status: 'published', featured: true},
      orderBy: {sortOrder: 'asc'}
    });
    return rows.map(toTrip);
  },
  async findPublishedBySlug(slug) {
    const row = await prisma.trip.findFirst({where: {slug, status: 'published'}});
    return row ? toTrip(row) : null;
  },
  async listPublishedSlugs() {
    const rows = await prisma.trip.findMany({
      where: {status: 'published'},
      orderBy: {sortOrder: 'asc'},
      select: {slug: true}
    });
    return rows.map((row) => row.slug);
  }
};

import {localTripRepository} from '@/features/trips/local-trip-repository';
import {prismaTripRepository} from '@/features/trips/prisma-trip-repository';
import type {TripRepository} from '@/features/trips/trip-repository';
import type {Trip, TripCategory} from '@/types/trip';

async function readWithFallback<T>(read: (repository: TripRepository) => Promise<T>): Promise<T> {
  if (!process.env.DATABASE_URL) return read(localTripRepository);
  try {
    return await read(prismaTripRepository);
  } catch {
    // Public catalogue pages remain available from the bundled baseline if the
    // database is temporarily unavailable. Admin/API write paths still require DB.
    return read(localTripRepository);
  }
}

export async function getPublishedTrips(): Promise<Trip[]> {
  return (await readWithFallback((repository) => repository.listPublished())).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedTrips(): Promise<Trip[]> {
  return (await readWithFallback((repository) => repository.listFeatured())).sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 6);
}

export async function getPopularTrips(): Promise<Trip[]> {
  return (await getPublishedTrips()).filter((trip) => trip.popular);
}

export async function getTripsByCategory(category: TripCategory): Promise<Trip[]> {
  return (await getPublishedTrips()).filter((trip) => trip.category === category);
}

export async function getTripBySlug(slug: string): Promise<Trip | null> {
  return readWithFallback((repository) => repository.findPublishedBySlug(slug));
}

export async function getPublishedTripSlugs(): Promise<string[]> {
  return readWithFallback((repository) => repository.listPublishedSlugs());
}

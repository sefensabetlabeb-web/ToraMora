import type {Trip} from '@/types/trip';

export interface TripRepository {
  listPublished(): Promise<Trip[]>;
  listFeatured(): Promise<Trip[]>;
  findPublishedBySlug(slug: string): Promise<Trip | null>;
  listPublishedSlugs(): Promise<string[]>;
}

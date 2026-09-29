import {trips} from '@/data/trips';
import type {TripRepository} from '@/features/trips/trip-repository';
import type {Trip} from '@/types/trip';

function cloneTrip(trip: Trip): Trip {
  return structuredClone(trip);
}

export const localTripRepository: TripRepository = {
  async listPublished() {
    return trips.filter((trip) => trip.status === 'published').map(cloneTrip);
  },

  async listFeatured() {
    return trips
      .filter((trip) => trip.status === 'published' && trip.featured)
      .map(cloneTrip);
  },

  async findPublishedBySlug(slug) {
    const trip = trips.find((item) => item.slug === slug && item.status === 'published');
    return trip ? cloneTrip(trip) : null;
  },

  async listPublishedSlugs() {
    return trips.filter((trip) => trip.status === 'published').map((trip) => trip.slug);
  }
};

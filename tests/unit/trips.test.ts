import {describe, expect, it} from 'vitest';
import {trips} from '@/data/trips';
import {getFeaturedTrips, getPublishedTripSlugs, getPublishedTrips, getTripBySlug} from '@/features/trips/trip-service';

describe('trip catalogue', () => {
  it('contains the expected 24 development trips with unique slugs', () => {
    expect(trips).toHaveLength(24);
    expect(new Set(trips.map((trip) => trip.slug)).size).toBe(trips.length);
  });

  it('contains the requested key Hurghada experiences', () => {
    const slugs = new Set(trips.map((trip) => trip.slug));
    for (const slug of ['orange-bay', 'hula-hula', 'intro-diving', 'dolphin-house', 'quad-safari', 'cairo', 'luxor']) {
      expect(slugs.has(slug), `${slug} should exist`).toBe(true);
    }
  });

  it('returns only published trips through the public service', async () => {
    const published = await getPublishedTrips();
    expect(published.length).toBeGreaterThan(0);
    expect(published.every((trip) => trip.status === 'published')).toBe(true);
  });

  it('returns featured trips in a compact homepage set', async () => {
    const featured = await getFeaturedTrips();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(6);
    expect(featured.every((trip) => trip.featured)).toBe(true);
  });

  it('loads a trip by slug and returns null for an unknown slug', async () => {
    expect((await getTripBySlug('orange-bay'))?.title).toMatch(/Orange Bay/i);
    expect(await getTripBySlug('does-not-exist')).toBeNull();
  });

  it('publishes unique route slugs', async () => {
    const slugs = await getPublishedTripSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

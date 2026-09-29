import {prisma} from '@/lib/database/prisma';

export type PublicReview = {
  id: string;
  name: string;
  country: string | null;
  rating: number;
  title: string | null;
  text: string;
  tripSlug: string | null;
};

export async function getPublishedReviews(options: {tripSlug?: string; limit?: number} = {}): Promise<PublicReview[]> {
  if (!process.env.DATABASE_URL) return [];
  const limit = Math.min(Math.max(options.limit ?? 6, 1), 12);
  try {
    return await prisma.review.findMany({
      where: {
        status: 'published',
        ...(options.tripSlug ? {tripSlug: options.tripSlug} : {})
      },
      orderBy: [{sortOrder: 'asc'}, {createdAt: 'desc'}],
      take: limit,
      select: {id: true, name: true, country: true, rating: true, title: true, text: true, tripSlug: true}
    });
  } catch {
    return [];
  }
}

import type {MetadataRoute} from 'next';
import {locales} from '@/i18n/locales';
import {getPublishedTripSlugs} from '@/features/trips/trip-service';
import {absoluteUrl, localizedPath} from '@/lib/seo/urls';

const staticPages = [
  {path: '/', changeFrequency: 'weekly' as const, priority: 1},
  {path: '/trips', changeFrequency: 'daily' as const, priority: 0.95},
  {path: '/contact', changeFrequency: 'monthly' as const, priority: 0.65},
  {path: '/book', changeFrequency: 'monthly' as const, priority: 0.7},
  {path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.2},
  {path: '/terms', changeFrequency: 'yearly' as const, priority: 0.2}
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPublishedTripSlugs();
  const now = new Date();

  const pages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: absoluteUrl(localizedPath(locale, page.path)),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: locale === 'en' ? page.priority : Math.max(page.priority - 0.05, 0.1),
      alternates: {
        languages: Object.fromEntries(
          [...locales.map((code) => [code, absoluteUrl(localizedPath(code, page.path))] as const), ['x-default', absoluteUrl(localizedPath('en', page.path))]]
        )
      }
    }))
  );

  const trips: MetadataRoute.Sitemap = slugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, `/trips/${slug}`)),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: locale === 'en' ? 0.9 : 0.85,
      alternates: {
        languages: Object.fromEntries(
          [...locales.map((code) => [code, absoluteUrl(localizedPath(code, `/trips/${slug}`))] as const), ['x-default', absoluteUrl(localizedPath('en', `/trips/${slug}`))]]
        )
      }
    }))
  );

  return [...pages, ...trips];
}

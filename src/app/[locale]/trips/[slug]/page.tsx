import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { TripDetailPage } from '@/components/trips/detail/TripDetailPage';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import { loadTripPageData } from '@/features/trips/trip-page-loader';
import { locales, type Locale } from '@/i18n/locales';
import { touristTripJsonLd, tripBreadcrumbJsonLd } from '@/lib/seo/jsonld';
import { localizedPath } from '@/lib/seo/urls';

type TripPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: TripPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await loadTripPageData(slug, locale as Locale);

  if (!data) return { title: 'Trip not found', robots: { index: false, follow: false } };

  const { trip, settings } = data;
  const brandTitle = trip.seo.title.replace(/\s*\|\s*ToraMora\s*$/i, ` | ${settings.websiteName}`);
  const canonical = localizedPath(locale, `/trips/${trip.slug}`);

  return {
    title: brandTitle,
    description: trip.seo.description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          locales.map((code) => [code, localizedPath(code, `/trips/${trip.slug}`)])
        ),
        'x-default': localizedPath('en', `/trips/${trip.slug}`)
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: brandTitle,
      description: trip.seo.description,
      siteName: settings.websiteName || siteConfig.name,
      images: [{ url: trip.heroImage.src, alt: trip.heroImage.alt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: brandTitle,
      description: trip.seo.description,
      images: [trip.heroImage.src]
    }
  };
}

export default async function TripPage({ params }: TripPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const data = await loadTripPageData(slug, locale as Locale);
  if (!data) notFound();

  const { trip, settings } = data;

  return (
    <>
      <JsonLd data={touristTripJsonLd(trip, locale, settings)} />
      <JsonLd data={tripBreadcrumbJsonLd(trip, locale)} />
      <TripDetailPage trip={trip} whatsappNumber={settings.whatsappNumber} />
    </>
  );
}

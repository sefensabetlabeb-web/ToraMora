import {siteConfig} from '@/config/site';
import type {Trip} from '@/types/trip';
import {absoluteUrl, localizedPath} from './urls';
import type {PublicSiteSettings} from '@/lib/site-settings';

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== '' && item != null)) as T;
}

export function travelAgencyJsonLd(locale: string, settings?: PublicSiteSettings) {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${absoluteUrl('/')}#travel-agency`,
    name: settings?.websiteName || siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(localizedPath(locale, '/')),
    logo: absoluteUrl(settings?.logoPath || '/brand/toramora-logo.png'),
    image: absoluteUrl(settings?.logoPath || '/brand/toramora-logo.png'),
    areaServed: {
      '@type': 'City',
      name: 'Hurghada'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hurghada',
      addressRegion: 'Red Sea Governorate',
      addressCountry: 'EG'
    },
    telephone: settings?.phone || siteConfig.contact.phone,
    email: settings?.email || siteConfig.contact.email,
    sameAs: [settings?.facebook || siteConfig.social.facebook, settings?.instagram || siteConfig.social.instagram].filter(Boolean)
  });
}

export function touristTripJsonLd(trip: Trip, locale: string, settings?: PublicSiteSettings) {
  const tripUrl = absoluteUrl(localizedPath(locale, `/trips/${trip.slug}`));
  return compact({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${tripUrl}#trip`,
    name: trip.title,
    description: trip.shortDescription,
    url: tripUrl,
    image: [absoluteUrl(trip.heroImage.src), ...trip.gallery.map((item) => absoluteUrl(item.src))],
    touristType: trip.categoryLabel,
    provider: {
      '@type': 'TravelAgency',
      '@id': `${absoluteUrl('/')}#travel-agency`,
      name: settings?.websiteName || siteConfig.name,
      url: absoluteUrl('/')
    },
    offers: {
      '@type': 'Offer',
      url: tripUrl,
      price: trip.priceFrom,
      priceCurrency: trip.currency,
      availability: 'https://schema.org/InStock'
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: trip.itinerary.length,
      itemListElement: trip.itinerary.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        description: item.description
      }))
    }
  });
}

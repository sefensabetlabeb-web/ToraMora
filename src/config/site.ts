export const siteConfig = {
  name: 'ToraMora',
  shortName: 'TM',
  tagline: 'Egypt starts here.',
  description: 'Curated Cairo, Luxor and Red Sea trips from Hurghada.',
  defaultLocale: 'en',
  currency: 'USD',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  contact: {
    whatsapp: '',
    phone: '',
    email: ''
  },
  social: {
    facebook: '',
    instagram: ''
  }
} as const;

export type SiteConfig = typeof siteConfig;

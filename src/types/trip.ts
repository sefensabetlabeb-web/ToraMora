export type TripStatus = 'draft' | 'published' | 'disabled';

export type TripCategory =
  | 'culture'
  | 'islands-snorkeling'
  | 'diving-sea'
  | 'desert-adventure'
  | 'family-city'
  | 'private';

export type TripSectionItem = {
  title: string;
  description?: string;
};

export type TripImage = {
  src: string;
  alt: string;
};

export interface TripSummary {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  duration: string;
  priceFrom: number;
  currency: string;
  priceMode: 'sample' | 'live';
  image: string;
  category: TripCategory;
  categoryLabel: string;
  status: TripStatus;
  featured?: boolean;
  popular?: boolean;
  sortOrder: number;
}

export interface Trip extends TripSummary {
  eyebrow: string;
  heroImage: TripImage;
  gallery: TripImage[];
  highlights: TripSectionItem[];
  itinerary: TripSectionItem[];
  included: string[];
  excluded: string[];
  whatToBring: string[];
  whatsappMessage: string;
  seo: {
    title: string;
    description: string;
  };
}

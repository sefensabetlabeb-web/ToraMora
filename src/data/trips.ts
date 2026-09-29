import type {Trip} from '@/types/trip';

export const trips: Trip[] = [
  {
    id: 'cairo-trip',
    slug: 'cairo',
    title: 'Cairo Day Trip',
    eyebrow: 'Cairo Day Trip from Hurghada',
    shortDescription: 'Pyramids of Giza, the Great Sphinx and Cairo highlights in one unforgettable day.',
    duration: 'Full day',
    priceFrom: 85,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/cairo.webp',
    heroImage: {src: '/images/trips/pro/cairo.webp', alt: 'Cairo Day Trip travel experience'},
    gallery: [{src: '/images/trips/pro/cairo.webp', alt: 'Cairo Day Trip gallery image 1'}, {src: '/images/trips/pro/cairo-2.webp', alt: 'Cairo Day Trip gallery image 2'}, {src: '/images/trips/pro/cairo-3.webp', alt: 'Cairo Day Trip gallery image 3'}],
    category: 'culture',
    categoryLabel: 'Culture & History',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 10,
    highlights: [
      {title: 'Iconic Egyptian history', description: 'Explore major historical landmarks with a structured day program.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Pyramids of Giza, the Great Sphinx and Cairo highlights in one unforgettable day.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Air-conditioned transport', 'Professional guide', 'Main program entrance tickets'],
    excluded: ['Drinks unless confirmed', 'Optional activities', 'Personal expenses'],
    whatToBring: ['Passport', 'Comfortable shoes', 'Sun hat', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Cairo Day Trip from Hurghada.',
    seo: {
      title: 'Cairo Day Trip From Hurghada | ToraMora',
      description: 'Pyramids of Giza, the Great Sphinx and Cairo highlights in one unforgettable day.'
    }
  },
  {
    id: 'luxor-trip',
    slug: 'luxor',
    title: 'Luxor Day Trip',
    eyebrow: 'Luxor Day Trip from Hurghada',
    shortDescription: 'Karnak, the Valley of the Kings and Luxor’s most famous ancient landmarks.',
    duration: 'Full day',
    priceFrom: 75,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/luxor.webp',
    heroImage: {src: '/images/trips/pro/luxor.webp', alt: 'Luxor Day Trip travel experience'},
    gallery: [{src: '/images/trips/pro/luxor.webp', alt: 'Luxor Day Trip gallery image 1'}, {src: '/images/trips/pro/luxor-2.webp', alt: 'Luxor Day Trip gallery image 2'}, {src: '/images/trips/pro/luxor-3.webp', alt: 'Luxor Day Trip gallery image 3'}],
    category: 'culture',
    categoryLabel: 'Culture & History',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 20,
    highlights: [
      {title: 'Iconic Egyptian history', description: 'Explore major historical landmarks with a structured day program.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Karnak, the Valley of the Kings and Luxor’s most famous ancient landmarks.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Air-conditioned transport', 'Professional guide', 'Main program entrance tickets'],
    excluded: ['Drinks unless confirmed', 'Optional activities', 'Personal expenses'],
    whatToBring: ['Passport', 'Comfortable shoes', 'Sun hat', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Luxor Day Trip from Hurghada.',
    seo: {
      title: 'Luxor Day Trip From Hurghada | ToraMora',
      description: 'Karnak, the Valley of the Kings and Luxor’s most famous ancient landmarks.'
    }
  },
  {
    id: 'orange-bay-trip',
    slug: 'orange-bay',
    title: 'Orange Bay',
    eyebrow: 'Orange Bay from Hurghada',
    shortDescription: 'Turquoise water, white sand, snorkeling stops and relaxing island time.',
    duration: 'Full day',
    priceFrom: 38,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/orange-bay.webp',
    heroImage: {src: '/images/trips/pro/orange-bay.webp', alt: 'Orange Bay travel experience'},
    gallery: [{src: '/images/trips/pro/orange-bay.webp', alt: 'Orange Bay gallery image 1'}, {src: '/images/trips/pro/orange-bay-2.webp', alt: 'Orange Bay gallery image 2'}, {src: '/images/trips/pro/orange-bay-3.webp', alt: 'Orange Bay gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 30,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Turquoise water, white sand, snorkeling stops and relaxing island time.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Orange Bay from Hurghada.',
    seo: {
      title: 'Orange Bay From Hurghada | ToraMora',
      description: 'Turquoise water, white sand, snorkeling stops and relaxing island time.'
    }
  },
  {
    id: 'hula-hula-trip',
    slug: 'hula-hula',
    title: 'Hula Hula Island',
    eyebrow: 'Hula Hula Island from Hurghada',
    shortDescription: 'A relaxed Red Sea island day with beach time, snorkeling and lunch.',
    duration: 'Full day',
    priceFrom: 35,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Hula Hula Island travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Hula Hula Island gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Hula Hula Island gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Hula Hula Island gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 40,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A relaxed Red Sea island day with beach time, snorkeling and lunch.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Hula Hula Island from Hurghada.',
    seo: {
      title: 'Hula Hula Island From Hurghada | ToraMora',
      description: 'A relaxed Red Sea island day with beach time, snorkeling and lunch.'
    }
  },
  {
    id: 'paradise-island-trip',
    slug: 'paradise-island',
    title: 'Paradise Island',
    eyebrow: 'Paradise Island from Hurghada',
    shortDescription: 'A classic Giftun-area beach day with snorkeling and clear Red Sea water.',
    duration: 'Full day',
    priceFrom: 36,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Paradise Island travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Paradise Island gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Paradise Island gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Paradise Island gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: false,
    popular: true,
    sortOrder: 50,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A classic Giftun-area beach day with snorkeling and clear Red Sea water.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Paradise Island from Hurghada.',
    seo: {
      title: 'Paradise Island From Hurghada | ToraMora',
      description: 'A classic Giftun-area beach day with snorkeling and clear Red Sea water.'
    }
  },
  {
    id: 'mahmya-trip',
    slug: 'mahmya',
    title: 'Mahmya Island',
    eyebrow: 'Mahmya Island from Hurghada',
    shortDescription: 'A more premium island-style day with beach time and snorkeling.',
    duration: 'Full day',
    priceFrom: 68,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Mahmya Island travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Mahmya Island gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Mahmya Island gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Mahmya Island gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: false,
    popular: true,
    sortOrder: 60,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A more premium island-style day with beach time and snorkeling.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Mahmya Island from Hurghada.',
    seo: {
      title: 'Mahmya Island From Hurghada | ToraMora',
      description: 'A more premium island-style day with beach time and snorkeling.'
    }
  },
  {
    id: 'dolphin-house-trip',
    slug: 'dolphin-house',
    title: 'Dolphin House',
    eyebrow: 'Dolphin House from Hurghada',
    shortDescription: 'Snorkeling at Red Sea reefs with a chance to observe dolphins in the wild.',
    duration: 'Full day',
    priceFrom: 42,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/dolphins.webp',
    heroImage: {src: '/images/trips/pro/dolphins.webp', alt: 'Dolphin House travel experience'},
    gallery: [{src: '/images/trips/pro/dolphins.webp', alt: 'Dolphin House gallery image 1'}, {src: '/images/trips/pro/dolphins-2.webp', alt: 'Dolphin House gallery image 2'}, {src: '/images/trips/pro/dolphins-3.webp', alt: 'Dolphin House gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 70,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Snorkeling at Red Sea reefs with a chance to observe dolphins in the wild.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Dolphin House from Hurghada.',
    seo: {
      title: 'Dolphin House From Hurghada | ToraMora',
      description: 'Snorkeling at Red Sea reefs with a chance to observe dolphins in the wild.'
    }
  },
  {
    id: 'magawish-three-islands-trip',
    slug: 'magawish-three-islands',
    title: 'Magawish Three Islands',
    eyebrow: 'Magawish Three Islands from Hurghada',
    shortDescription: 'A multi-stop boat day combining beach time, snorkeling and Red Sea scenery.',
    duration: 'Full day',
    priceFrom: 40,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Magawish Three Islands travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Magawish Three Islands gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Magawish Three Islands gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Magawish Three Islands gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 80,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A multi-stop boat day combining beach time, snorkeling and Red Sea scenery.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Magawish Three Islands from Hurghada.',
    seo: {
      title: 'Magawish Three Islands From Hurghada | ToraMora',
      description: 'A multi-stop boat day combining beach time, snorkeling and Red Sea scenery.'
    }
  },
  {
    id: 'utopia-island-trip',
    slug: 'utopia-island',
    title: 'Utopia Island',
    eyebrow: 'Utopia Island from Hurghada',
    shortDescription: 'A longer sea excursion with reef snorkeling and a sandy island stop.',
    duration: 'Full day',
    priceFrom: 48,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Utopia Island travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Utopia Island gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Utopia Island gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Utopia Island gallery image 3'}],
    category: 'islands-snorkeling',
    categoryLabel: 'Islands & Snorkeling',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 90,
    highlights: [
      {title: 'Red Sea escape', description: 'Enjoy clear water, reef scenery and a relaxing boat day.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A longer sea excursion with reef snorkeling and a sandy island stop.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Utopia Island from Hurghada.',
    seo: {
      title: 'Utopia Island From Hurghada | ToraMora',
      description: 'A longer sea excursion with reef snorkeling and a sandy island stop.'
    }
  },
  {
    id: 'intro-diving-trip',
    slug: 'intro-diving',
    title: 'Intro Scuba Diving',
    eyebrow: 'Intro Scuba Diving from Hurghada',
    shortDescription: 'Try scuba diving with professional supervision and Red Sea boat stops.',
    duration: 'Full day',
    priceFrom: 55,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/diving.webp',
    heroImage: {src: '/images/trips/pro/diving.webp', alt: 'Intro Scuba Diving travel experience'},
    gallery: [{src: '/images/trips/pro/diving.webp', alt: 'Intro Scuba Diving gallery image 1'}, {src: '/images/trips/pro/diving-2.webp', alt: 'Intro Scuba Diving gallery image 2'}, {src: '/images/trips/pro/diving-3.webp', alt: 'Intro Scuba Diving gallery image 3'}],
    category: 'diving-sea',
    categoryLabel: 'Diving & Sea',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 100,
    highlights: [
      {title: 'Red Sea experience', description: 'Spend time on or under the water with appropriate safety support.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Try scuba diving with professional supervision and Red Sea boat stops.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Intro Scuba Diving from Hurghada.',
    seo: {
      title: 'Intro Scuba Diving From Hurghada | ToraMora',
      description: 'Try scuba diving with professional supervision and Red Sea boat stops.'
    }
  },
  {
    id: 'certified-diving-trip',
    slug: 'certified-diving',
    title: 'Certified Diving - 2 Dives',
    eyebrow: 'Certified Diving - 2 Dives from Hurghada',
    shortDescription: 'Two boat dives for certified divers at selected Red Sea dive sites.',
    duration: 'Full day',
    priceFrom: 75,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/diving.webp',
    heroImage: {src: '/images/trips/pro/diving.webp', alt: 'Certified Diving - 2 Dives travel experience'},
    gallery: [{src: '/images/trips/pro/diving.webp', alt: 'Certified Diving - 2 Dives gallery image 1'}, {src: '/images/trips/pro/diving-2.webp', alt: 'Certified Diving - 2 Dives gallery image 2'}, {src: '/images/trips/pro/diving-3.webp', alt: 'Certified Diving - 2 Dives gallery image 3'}],
    category: 'diving-sea',
    categoryLabel: 'Diving & Sea',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 110,
    highlights: [
      {title: 'Red Sea experience', description: 'Spend time on or under the water with appropriate safety support.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Two boat dives for certified divers at selected Red Sea dive sites.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Certified Diving - 2 Dives from Hurghada.',
    seo: {
      title: 'Certified Diving - 2 Dives From Hurghada | ToraMora',
      description: 'Two boat dives for certified divers at selected Red Sea dive sites.'
    }
  },
  {
    id: 'snorkeling-boat-trip',
    slug: 'snorkeling-boat',
    title: 'Red Sea Snorkeling Boat',
    eyebrow: 'Red Sea Snorkeling Boat from Hurghada',
    shortDescription: 'A simple full-day snorkeling boat trip with reef stops and lunch.',
    duration: 'Full day',
    priceFrom: 30,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Red Sea Snorkeling Boat travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Red Sea Snorkeling Boat gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Red Sea Snorkeling Boat gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Red Sea Snorkeling Boat gallery image 3'}],
    category: 'diving-sea',
    categoryLabel: 'Diving & Sea',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 120,
    highlights: [
      {title: 'Red Sea experience', description: 'Spend time on or under the water with appropriate safety support.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A simple full-day snorkeling boat trip with reef stops and lunch.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Red Sea Snorkeling Boat from Hurghada.',
    seo: {
      title: 'Red Sea Snorkeling Boat From Hurghada | ToraMora',
      description: 'A simple full-day snorkeling boat trip with reef stops and lunch.'
    }
  },
  {
    id: 'semi-submarine-trip',
    slug: 'semi-submarine',
    title: 'Semi Submarine',
    eyebrow: 'Semi Submarine from Hurghada',
    shortDescription: 'See colorful Red Sea marine life through underwater panoramic windows.',
    duration: '2-3 hours',
    priceFrom: 32,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Semi Submarine travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Semi Submarine gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Semi Submarine gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Semi Submarine gallery image 3'}],
    category: 'family-city',
    categoryLabel: 'Family & City',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 130,
    highlights: [
      {title: 'Easy half-day option', description: 'A simple activity that fits comfortably around a resort holiday.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'See colorful Red Sea marine life through underwater panoramic windows.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Main listed activity', 'Local assistance'],
    excluded: ['Personal expenses', 'Food or drinks unless confirmed', 'Optional extras'],
    whatToBring: ['Comfortable shoes', 'Phone or camera', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Semi Submarine from Hurghada.',
    seo: {
      title: 'Semi Submarine From Hurghada | ToraMora',
      description: 'See colorful Red Sea marine life through underwater panoramic windows.'
    }
  },
  {
    id: 'parasailing-trip',
    slug: 'parasailing',
    title: 'Parasailing',
    eyebrow: 'Parasailing from Hurghada',
    shortDescription: 'Enjoy a short parasailing experience with panoramic views over the Red Sea.',
    duration: '1-2 hours',
    priceFrom: 28,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/orange-bay.webp',
    heroImage: {src: '/images/trips/pro/orange-bay.webp', alt: 'Parasailing travel experience'},
    gallery: [{src: '/images/trips/pro/orange-bay.webp', alt: 'Parasailing gallery image 1'}, {src: '/images/trips/pro/orange-bay-2.webp', alt: 'Parasailing gallery image 2'}, {src: '/images/trips/pro/orange-bay-3.webp', alt: 'Parasailing gallery image 3'}],
    category: 'diving-sea',
    categoryLabel: 'Diving & Sea',
    status: 'published',
    featured: false,
    popular: true,
    sortOrder: 140,
    highlights: [
      {title: 'Red Sea experience', description: 'Spend time on or under the water with appropriate safety support.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Enjoy a short parasailing experience with panoramic views over the Red Sea.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Parasailing from Hurghada.',
    seo: {
      title: 'Parasailing From Hurghada | ToraMora',
      description: 'Enjoy a short parasailing experience with panoramic views over the Red Sea.'
    }
  },
  {
    id: 'quad-safari-trip',
    slug: 'quad-safari',
    title: 'Quad Bike Safari',
    eyebrow: 'Quad Bike Safari from Hurghada',
    shortDescription: 'Ride through the Eastern Desert by quad with a simple Bedouin-style stop.',
    duration: '3 hours',
    priceFrom: 27,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/safari.webp',
    heroImage: {src: '/images/trips/pro/safari.webp', alt: 'Quad Bike Safari travel experience'},
    gallery: [{src: '/images/trips/pro/safari.webp', alt: 'Quad Bike Safari gallery image 1'}, {src: '/images/trips/pro/safari-2.webp', alt: 'Quad Bike Safari gallery image 2'}, {src: '/images/trips/pro/safari-3.webp', alt: 'Quad Bike Safari gallery image 3'}],
    category: 'desert-adventure',
    categoryLabel: 'Desert & Adventure',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 150,
    highlights: [
      {title: 'Eastern Desert adventure', description: 'Experience Hurghada’s desert landscape away from the resort area.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Ride through the Eastern Desert by quad with a simple Bedouin-style stop.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Desert program', 'Safety briefing', 'Guide or escort'],
    excluded: ['Personal expenses', 'Optional extras', 'Scarf or goggles if sold separately'],
    whatToBring: ['Closed shoes', 'Sunglasses', 'Sunscreen', 'Comfortable clothes'],
    whatsappMessage: 'Hello, I am interested in the Quad Bike Safari from Hurghada.',
    seo: {
      title: 'Quad Bike Safari From Hurghada | ToraMora',
      description: 'Ride through the Eastern Desert by quad with a simple Bedouin-style stop.'
    }
  },
  {
    id: 'super-safari-trip',
    slug: 'super-safari',
    title: 'Super Safari',
    eyebrow: 'Super Safari from Hurghada',
    shortDescription: 'A mixed desert program with jeep, quad, Bedouin village and evening activities.',
    duration: 'Half day',
    priceFrom: 38,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/safari.webp',
    heroImage: {src: '/images/trips/pro/safari.webp', alt: 'Super Safari travel experience'},
    gallery: [{src: '/images/trips/pro/safari.webp', alt: 'Super Safari gallery image 1'}, {src: '/images/trips/pro/safari-2.webp', alt: 'Super Safari gallery image 2'}, {src: '/images/trips/pro/safari-3.webp', alt: 'Super Safari gallery image 3'}],
    category: 'desert-adventure',
    categoryLabel: 'Desert & Adventure',
    status: 'published',
    featured: true,
    popular: true,
    sortOrder: 160,
    highlights: [
      {title: 'Eastern Desert adventure', description: 'Experience Hurghada’s desert landscape away from the resort area.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A mixed desert program with jeep, quad, Bedouin village and evening activities.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Desert program', 'Safety briefing', 'Guide or escort'],
    excluded: ['Personal expenses', 'Optional extras', 'Scarf or goggles if sold separately'],
    whatToBring: ['Closed shoes', 'Sunglasses', 'Sunscreen', 'Comfortable clothes'],
    whatsappMessage: 'Hello, I am interested in the Super Safari from Hurghada.',
    seo: {
      title: 'Super Safari From Hurghada | ToraMora',
      description: 'A mixed desert program with jeep, quad, Bedouin village and evening activities.'
    }
  },
  {
    id: 'stargazing-trip',
    slug: 'stargazing',
    title: 'Desert Stargazing',
    eyebrow: 'Desert Stargazing from Hurghada',
    shortDescription: 'Sunset desert scenery followed by a calm stargazing experience.',
    duration: 'Evening',
    priceFrom: 36,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/safari.webp',
    heroImage: {src: '/images/trips/pro/safari.webp', alt: 'Desert Stargazing travel experience'},
    gallery: [{src: '/images/trips/pro/safari.webp', alt: 'Desert Stargazing gallery image 1'}, {src: '/images/trips/pro/safari-2.webp', alt: 'Desert Stargazing gallery image 2'}, {src: '/images/trips/pro/safari-3.webp', alt: 'Desert Stargazing gallery image 3'}],
    category: 'desert-adventure',
    categoryLabel: 'Desert & Adventure',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 170,
    highlights: [
      {title: 'Eastern Desert adventure', description: 'Experience Hurghada’s desert landscape away from the resort area.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Sunset desert scenery followed by a calm stargazing experience.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Desert program', 'Safety briefing', 'Guide or escort'],
    excluded: ['Personal expenses', 'Optional extras', 'Scarf or goggles if sold separately'],
    whatToBring: ['Closed shoes', 'Sunglasses', 'Sunscreen', 'Comfortable clothes'],
    whatsappMessage: 'Hello, I am interested in the Desert Stargazing from Hurghada.',
    seo: {
      title: 'Desert Stargazing From Hurghada | ToraMora',
      description: 'Sunset desert scenery followed by a calm stargazing experience.'
    }
  },
  {
    id: 'hurghada-city-tour-trip',
    slug: 'hurghada-city-tour',
    title: 'Hurghada City Tour',
    eyebrow: 'Hurghada City Tour from Hurghada',
    shortDescription: 'Discover Hurghada Marina, local areas, viewpoints and city highlights.',
    duration: '3-4 hours',
    priceFrom: 18,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/orange-bay.webp',
    heroImage: {src: '/images/trips/pro/orange-bay.webp', alt: 'Hurghada City Tour travel experience'},
    gallery: [{src: '/images/trips/pro/orange-bay.webp', alt: 'Hurghada City Tour gallery image 1'}, {src: '/images/trips/pro/orange-bay-2.webp', alt: 'Hurghada City Tour gallery image 2'}, {src: '/images/trips/pro/orange-bay-3.webp', alt: 'Hurghada City Tour gallery image 3'}],
    category: 'family-city',
    categoryLabel: 'Family & City',
    status: 'published',
    featured: false,
    popular: true,
    sortOrder: 180,
    highlights: [
      {title: 'Easy half-day option', description: 'A simple activity that fits comfortably around a resort holiday.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Discover Hurghada Marina, local areas, viewpoints and city highlights.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Main listed activity', 'Local assistance'],
    excluded: ['Personal expenses', 'Food or drinks unless confirmed', 'Optional extras'],
    whatToBring: ['Comfortable shoes', 'Phone or camera', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Hurghada City Tour from Hurghada.',
    seo: {
      title: 'Hurghada City Tour From Hurghada | ToraMora',
      description: 'Discover Hurghada Marina, local areas, viewpoints and city highlights.'
    }
  },
  {
    id: 'grand-aquarium-trip',
    slug: 'grand-aquarium',
    title: 'Hurghada Grand Aquarium',
    eyebrow: 'Hurghada Grand Aquarium from Hurghada',
    shortDescription: 'A family-friendly visit focused on marine life and indoor exhibits.',
    duration: 'Half day',
    priceFrom: 35,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/diving.webp',
    heroImage: {src: '/images/trips/pro/diving.webp', alt: 'Hurghada Grand Aquarium travel experience'},
    gallery: [{src: '/images/trips/pro/diving.webp', alt: 'Hurghada Grand Aquarium gallery image 1'}, {src: '/images/trips/pro/diving-2.webp', alt: 'Hurghada Grand Aquarium gallery image 2'}, {src: '/images/trips/pro/diving-3.webp', alt: 'Hurghada Grand Aquarium gallery image 3'}],
    category: 'family-city',
    categoryLabel: 'Family & City',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 190,
    highlights: [
      {title: 'Easy half-day option', description: 'A simple activity that fits comfortably around a resort holiday.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A family-friendly visit focused on marine life and indoor exhibits.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Main listed activity', 'Local assistance'],
    excluded: ['Personal expenses', 'Food or drinks unless confirmed', 'Optional extras'],
    whatToBring: ['Comfortable shoes', 'Phone or camera', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Hurghada Grand Aquarium from Hurghada.',
    seo: {
      title: 'Hurghada Grand Aquarium From Hurghada | ToraMora',
      description: 'A family-friendly visit focused on marine life and indoor exhibits.'
    }
  },
  {
    id: 'el-gouna-tour-trip',
    slug: 'el-gouna-tour',
    title: 'El Gouna Tour',
    eyebrow: 'El Gouna Tour from Hurghada',
    shortDescription: 'Explore El Gouna’s lagoons, marina areas and relaxed resort atmosphere.',
    duration: 'Half day',
    priceFrom: 40,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'El Gouna Tour travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'El Gouna Tour gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'El Gouna Tour gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'El Gouna Tour gallery image 3'}],
    category: 'family-city',
    categoryLabel: 'Family & City',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 200,
    highlights: [
      {title: 'Easy half-day option', description: 'A simple activity that fits comfortably around a resort holiday.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'Explore El Gouna’s lagoons, marina areas and relaxed resort atmosphere.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Main listed activity', 'Local assistance'],
    excluded: ['Personal expenses', 'Food or drinks unless confirmed', 'Optional extras'],
    whatToBring: ['Comfortable shoes', 'Phone or camera', 'Water'],
    whatsappMessage: 'Hello, I am interested in the El Gouna Tour from Hurghada.',
    seo: {
      title: 'El Gouna Tour From Hurghada | ToraMora',
      description: 'Explore El Gouna’s lagoons, marina areas and relaxed resort atmosphere.'
    }
  },
  {
    id: 'private-boat-trip',
    slug: 'private-boat',
    title: 'Private Boat Trip',
    eyebrow: 'Private Boat Trip from Hurghada',
    shortDescription: 'A flexible private Red Sea boat experience for couples, families or groups.',
    duration: 'Half day',
    priceFrom: 220,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Private Boat Trip travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Private Boat Trip gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Private Boat Trip gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Private Boat Trip gallery image 3'}],
    category: 'private',
    categoryLabel: 'Private Trips',
    status: 'published',
    featured: false,
    popular: true,
    sortOrder: 210,
    highlights: [
      {title: 'Private experience', description: 'A more flexible trip designed around your group.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A flexible private Red Sea boat experience for couples, families or groups.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Private pickup and return', 'Private transport or boat as listed', 'Flexible assistance'],
    excluded: ['Personal expenses', 'Optional extras'],
    whatToBring: ['Passport if required', 'Comfortable clothes', 'Sunscreen', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Private Boat Trip from Hurghada.',
    seo: {
      title: 'Private Boat Trip From Hurghada | ToraMora',
      description: 'A flexible private Red Sea boat experience for couples, families or groups.'
    }
  },
  {
    id: 'private-cairo-trip',
    slug: 'private-cairo',
    title: 'Private Cairo Trip',
    eyebrow: 'Private Cairo Trip from Hurghada',
    shortDescription: 'A private Cairo itinerary with flexible timing and personal transport.',
    duration: 'Full day',
    priceFrom: 240,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/cairo.webp',
    heroImage: {src: '/images/trips/pro/cairo.webp', alt: 'Private Cairo Trip travel experience'},
    gallery: [{src: '/images/trips/pro/cairo.webp', alt: 'Private Cairo Trip gallery image 1'}, {src: '/images/trips/pro/cairo-2.webp', alt: 'Private Cairo Trip gallery image 2'}, {src: '/images/trips/pro/cairo-3.webp', alt: 'Private Cairo Trip gallery image 3'}],
    category: 'private',
    categoryLabel: 'Private Trips',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 220,
    highlights: [
      {title: 'Private experience', description: 'A more flexible trip designed around your group.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A private Cairo itinerary with flexible timing and personal transport.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Private pickup and return', 'Private transport or boat as listed', 'Flexible assistance'],
    excluded: ['Personal expenses', 'Optional extras'],
    whatToBring: ['Passport if required', 'Comfortable clothes', 'Sunscreen', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Private Cairo Trip from Hurghada.',
    seo: {
      title: 'Private Cairo Trip From Hurghada | ToraMora',
      description: 'A private Cairo itinerary with flexible timing and personal transport.'
    }
  },
  {
    id: 'private-luxor-trip',
    slug: 'private-luxor',
    title: 'Private Luxor Trip',
    eyebrow: 'Private Luxor Trip from Hurghada',
    shortDescription: 'A private Luxor day with flexible timing and a more personal experience.',
    duration: 'Full day',
    priceFrom: 210,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/luxor.webp',
    heroImage: {src: '/images/trips/pro/luxor.webp', alt: 'Private Luxor Trip travel experience'},
    gallery: [{src: '/images/trips/pro/luxor.webp', alt: 'Private Luxor Trip gallery image 1'}, {src: '/images/trips/pro/luxor-2.webp', alt: 'Private Luxor Trip gallery image 2'}, {src: '/images/trips/pro/luxor-3.webp', alt: 'Private Luxor Trip gallery image 3'}],
    category: 'private',
    categoryLabel: 'Private Trips',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 230,
    highlights: [
      {title: 'Private experience', description: 'A more flexible trip designed around your group.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A private Luxor day with flexible timing and a more personal experience.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Private pickup and return', 'Private transport or boat as listed', 'Flexible assistance'],
    excluded: ['Personal expenses', 'Optional extras'],
    whatToBring: ['Passport if required', 'Comfortable clothes', 'Sunscreen', 'Water'],
    whatsappMessage: 'Hello, I am interested in the Private Luxor Trip from Hurghada.',
    seo: {
      title: 'Private Luxor Trip From Hurghada | ToraMora',
      description: 'A private Luxor day with flexible timing and a more personal experience.'
    }
  },
  {
    id: 'fishing-trip-trip',
    slug: 'fishing-trip',
    title: 'Red Sea Fishing Trip',
    eyebrow: 'Red Sea Fishing Trip from Hurghada',
    shortDescription: 'A relaxed boat day combining fishing time with Red Sea scenery.',
    duration: 'Full day',
    priceFrom: 45,
    currency: 'USD',
    priceMode: 'sample',
    image: '/images/trips/pro/island.webp',
    heroImage: {src: '/images/trips/pro/island.webp', alt: 'Red Sea Fishing Trip travel experience'},
    gallery: [{src: '/images/trips/pro/island.webp', alt: 'Red Sea Fishing Trip gallery image 1'}, {src: '/images/trips/pro/island-2.webp', alt: 'Red Sea Fishing Trip gallery image 2'}, {src: '/images/trips/pro/island-3.webp', alt: 'Red Sea Fishing Trip gallery image 3'}],
    category: 'diving-sea',
    categoryLabel: 'Diving & Sea',
    status: 'published',
    featured: false,
    popular: false,
    sortOrder: 240,
    highlights: [
      {title: 'Red Sea experience', description: 'Spend time on or under the water with appropriate safety support.'},
      {title: 'Hotel pickup', description: 'Pickup details are confirmed according to the final booking and hotel area.'},
      {title: 'Clear program', description: 'Final inclusions, timing and any optional extras are confirmed before departure.'}
    ],
    itinerary: [
      {title: 'Hotel pickup', description: 'Pickup time is confirmed after your booking request.'},
      {title: 'Main experience', description: 'A relaxed boat day combining fishing time with Red Sea scenery.'},
      {title: 'Break or activity time', description: 'Follow the confirmed program with time for the main activities.'},
      {title: 'Return to hotel', description: 'Return transfer is arranged after the program.'}
    ],
    included: ['Hotel pickup and return', 'Boat trip', 'Safety equipment', 'Lunch or refreshments when listed'],
    excluded: ['Personal expenses', 'Optional extras', 'Photos or videos unless confirmed'],
    whatToBring: ['Swimwear', 'Towel', 'Sunscreen', 'Sunglasses'],
    whatsappMessage: 'Hello, I am interested in the Red Sea Fishing Trip from Hurghada.',
    seo: {
      title: 'Red Sea Fishing Trip From Hurghada | ToraMora',
      description: 'A relaxed boat day combining fishing time with Red Sea scenery.'
    }
  },
];

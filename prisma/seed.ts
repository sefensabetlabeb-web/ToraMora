import {config as loadEnv} from 'dotenv';

for (const path of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  loadEnv({path});
}
import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../src/generated/prisma/client';
import {trips} from '../src/data/trips';
import {bundledTripTranslations} from '../src/data/trip-translations/all';

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL!});
const prisma = new PrismaClient({adapter});

async function main() {
  for (const trip of trips) {
    await prisma.trip.upsert({
      where: {slug: trip.slug},
      update: {},
      create: {
        slug: trip.slug,
        status: trip.status,
        category: trip.category,
        categoryLabel: trip.categoryLabel,
        title: trip.title,
        eyebrow: trip.eyebrow,
        shortDescription: trip.shortDescription,
        duration: trip.duration,
        priceFrom: trip.priceFrom,
        currency: trip.currency,
        priceMode: trip.priceMode,
        featured: Boolean(trip.featured),
        popular: Boolean(trip.popular),
        sortOrder: trip.sortOrder,
        heroImage: trip.heroImage.src,
        gallery: trip.gallery,
        highlights: trip.highlights,
        itinerary: trip.itinerary,
        included: trip.included,
        excluded: trip.excluded,
        whatToBring: trip.whatToBring,
        whatsappMessage: trip.whatsappMessage,
        seoTitle: trip.seo.title,
        seoDescription: trip.seo.description
      }
    });
  }
  for (const translation of bundledTripTranslations) {
    const trip = await prisma.trip.findUnique({where:{slug:translation.slug}, select:{id:true}});
    if (!trip) continue;
    await prisma.tripTranslation.upsert({
      where:{tripId_locale:{tripId:trip.id, locale:translation.locale}},
      update:{},
      create:{
        tripId:trip.id, locale:translation.locale, title:translation.title, eyebrow:translation.eyebrow,
        shortDescription:translation.shortDescription, duration:translation.duration, highlights:translation.highlights,
        itinerary:translation.itinerary, included:translation.included, excluded:translation.excluded,
        whatToBring:translation.whatToBring, whatsappMessage:translation.whatsappMessage, seoTitle:translation.seoTitle,
        seoDescription:translation.seoDescription, isReviewed:translation.isReviewed
      }
    });
  }
  await prisma.siteSetting.upsert({where:{id:'global'}, update:{}, create:{id:'global', currency:'USD'}});
  console.log(`Seeded ${trips.length} trips and ${bundledTripTranslations.length} bundled translations.`);
}

main().finally(() => prisma.$disconnect());

import type {Trip} from '@/types/trip';
import {TripHero} from '@/components/trips/detail/TripHero';
import {TripGallery} from '@/components/trips/detail/TripGallery';
import {TripHighlights} from '@/components/trips/detail/TripHighlights';
import {TripItinerary} from '@/components/trips/detail/TripItinerary';
import {TripInclusions} from '@/components/trips/detail/TripInclusions';
import {WhatToBring} from '@/components/trips/detail/WhatToBring';
import {TripBookingCTA} from '@/components/trips/detail/TripBookingCTA';
import {MobileTripActions} from '@/components/trips/detail/MobileTripActions';
import {ReviewsSection} from '@/components/home/ReviewsSection';

export async function TripDetailPage({trip, whatsappNumber}: {trip: Trip; whatsappNumber?: string}) {
  return (
    <div className="pb-24 md:pb-0">
      <TripHero trip={trip} />
      <TripGallery images={trip.gallery} />
      <TripHighlights items={trip.highlights} />
      <TripItinerary items={trip.itinerary} />
      <TripInclusions included={trip.included} excluded={trip.excluded} />
      <WhatToBring items={trip.whatToBring} />
      <ReviewsSection tripSlug={trip.slug} />
      <TripBookingCTA trip={trip} whatsappNumber={whatsappNumber} />
      <MobileTripActions trip={trip} whatsappNumber={whatsappNumber} />
    </div>
  );
}

import {useTranslations} from 'next-intl';
import {TripCard} from '@/components/home/TripCard';
import type {TripSummary} from '@/types/trip';

export function TripGrid({trips}: {trips: TripSummary[]}) {
  const t = useTranslations('trips');
  if (trips.length === 0) {
    return <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">{t('empty')}</div>;
  }
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}</div>;
}

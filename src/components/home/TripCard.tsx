import Image from 'next/image';
import {ArrowUpRight, Clock} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {categoryMessageKey} from '@/features/trips/trip-categories';
import {Link} from '@/i18n/navigation';
import type {TripSummary} from '@/types/trip';

export function TripCard({trip}: {trip: TripSummary}) {
  const t = useTranslations('trips');
  const c = useTranslations('categories');

  return (
    <article className="group overflow-hidden rounded-[26px] border border-slate-200/90 bg-white shadow-[0_14px_42px_rgba(15,23,42,.07)] transition hover:-translate-y-1">
      <Link
        href={`/trips/${trip.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
          src={trip.image}
          alt={`${trip.title} destination preview`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-xs font-extrabold">
          {c(`${categoryMessageKey(trip.category)}.label`)}
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/94 px-3 py-1.5 text-xs font-bold">
          <Clock size={14} />
          {trip.duration}
        </span>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-black sm:text-2xl">{trip.title}</h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-slate-400">{t('samplePrice')}</p>
            <p className="text-lg font-black">
              {trip.priceFrom} {trip.currency}
            </p>
          </div>
        </div>

        <p className="mt-3 line-clamp-3 leading-7 text-slate-600">{trip.shortDescription}</p>

        <Link
          href={`/trips/${trip.slug}`}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-extrabold !text-white shadow-sm transition hover:bg-teal-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <span className="text-white">{t('viewTrip')}</span>
          <ArrowUpRight size={16} className="text-white" />
        </Link>
      </div>
    </article>
  );
}

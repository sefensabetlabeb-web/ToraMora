'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {CalendarDays, MessageCircleMore} from 'lucide-react';
import {buildWhatsAppUrl} from '@/lib/whatsapp';
import type {Trip} from '@/types/trip';

export function MobileTripActions({
  trip,
  whatsappNumber,
}: {
  trip: Trip;
  whatsappNumber?: string;
}) {
  const t = useTranslations('tripDetail');
  const whatsappHref = buildWhatsAppUrl(trip.whatsappMessage, whatsappNumber);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-slate-200/90 bg-white/96 px-3 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] shadow-[0_-16px_40px_rgba(15,23,42,.14)] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2.5">
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 text-[15px] font-black !text-white shadow-sm transition active:scale-[.98]"
          style={{color: '#ffffff'}}
        >
          <MessageCircleMore size={19} aria-hidden="true" />
          <span>{t('whatsapp')}</span>
        </Link>

        <Link
          href="#trip-booking"
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-[15px] font-black !text-white shadow-sm transition active:scale-[.98]"
          style={{color: '#ffffff'}}
        >
          <CalendarDays size={19} aria-hidden="true" />
          <span>{t('bookNow')}</span>
        </Link>
      </div>
    </div>
  );
}

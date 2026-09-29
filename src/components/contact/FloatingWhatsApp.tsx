'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {MessageCircleMore} from 'lucide-react';
import {buildWhatsAppUrl, getWhatsAppMessageForPath} from '@/lib/whatsapp';

export function FloatingWhatsApp({number}: {number?: string}) {
  const pathname = usePathname();
  const t = useTranslations('tripDetail');
  const href = buildWhatsAppUrl(getWhatsAppMessageForPath(pathname), number);
  const isTripDetail = /\/trips\/[^/]+\/?$/.test(pathname);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t('whatsapp')}
      className={`fixed right-3 z-[70] min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-500 px-4 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(16,185,129,.38)] transition hover:-translate-y-0.5 hover:bg-emerald-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 sm:right-6 sm:px-5 ${
        isTripDetail
          ? 'hidden md:inline-flex md:bottom-6'
          : 'inline-flex bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6'
      }`}
    >
      <MessageCircleMore size={21} aria-hidden="true" />
      <span>{t('whatsapp')}</span>
    </Link>
  );
}

'use client';

import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {BookOpen, Home, MapPinned, MessageCircle, Search, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {LanguageSelector} from './LanguageSelector';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('nav');
  const search = useTranslations('search');

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = open && mounted
    ? createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden" role="presentation">
          <button
            type="button"
            aria-label={t('closeMenu')}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
            onClick={close}
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label={t('openMenu')}
            className="absolute inset-y-0 left-0 flex h-[100dvh] w-[min(88vw,390px)] flex-col overflow-hidden bg-white text-left shadow-[20px_0_60px_rgba(15,23,42,0.28)]"
          >
            <div className="flex min-h-[76px] items-center justify-between border-b border-slate-200 px-5">
              <div className="min-w-0">
                <div className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--brand)]">ToraMora</div>
                <div className="mt-1 text-sm font-semibold text-slate-500">Explore Egypt from Hurghada</div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t('closeMenu')}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
              <nav className="grid gap-1.5" aria-label="Mobile navigation">
                <Link href="/" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-base font-bold text-slate-800 transition hover:bg-slate-100">
                  <Home size={20} className="shrink-0 text-[var(--brand)]" />
                  <span>{t('home')}</span>
                </Link>
                <Link href="/trips" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-base font-bold text-slate-800 transition hover:bg-slate-100">
                  <MapPinned size={20} className="shrink-0 text-[var(--brand)]" />
                  <span>{t('trips')}</span>
                </Link>
                <Link href="/trips/cairo" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-base font-bold text-slate-800 transition hover:bg-slate-100">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-black text-amber-700">C</span>
                  <span>{t('cairo')}</span>
                </Link>
                <Link href="/trips/luxor" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-base font-bold text-slate-800 transition hover:bg-slate-100">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-black text-amber-700">L</span>
                  <span>{t('luxor')}</span>
                </Link>
                <Link href="/contact" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl px-4 text-base font-bold text-slate-800 transition hover:bg-slate-100">
                  <MessageCircle size={20} className="shrink-0 text-[var(--brand)]" />
                  <span>{t('contact')}</span>
                </Link>
              </nav>

              <div className="my-5 h-px bg-slate-200" />

              <Link href="/trips#trip-search" onClick={close} className="flex min-h-14 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-base font-bold text-slate-800 transition hover:bg-slate-50">
                <Search size={20} className="shrink-0 text-[var(--brand)]" />
                <span>{search('label')}</span>
              </Link>

              <div className="mt-4 rounded-2xl border border-slate-200 p-3">
                <div className="mb-2 px-1 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">Language</div>
                <LanguageSelector />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/book"
                onClick={close}
                className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 text-base font-extrabold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[var(--brand-dark)]"
              >
                <BookOpen size={20} />
                <span>{t('book')}</span>
              </Link>
            </div>
          </aside>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        className="inline-grid size-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-100 lg:hidden"
        aria-label={open ? t('closeMenu') : t('openMenu')}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">{open ? t('closeMenu') : t('openMenu')}</span>
        <span aria-hidden="true" className="flex flex-col gap-[4px]">
          <span className="block h-[2px] w-[20px] rounded-full bg-current" />
          <span className="block h-[2px] w-[20px] rounded-full bg-current" />
          <span className="block h-[2px] w-[20px] rounded-full bg-current" />
        </span>
      </button>
      {drawer}
    </>
  );
}

'use client';

import {useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {Languages, Search, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {localeNames, locales, type Locale} from '@/i18n/locales';
import {usePathname, useRouter} from '@/i18n/navigation';

const quickLocales: readonly Locale[] = ['en', 'de', 'ru', 'tr'];

export function LanguageSelector({compact = false}: {compact?: boolean}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const filtered = useMemo(
    () => locales.filter((code) => `${localeNames[code]} ${code}`.toLocaleLowerCase(locale).includes(normalizedQuery)),
    [locale, normalizedQuery]
  );

  const quick = quickLocales.filter((code) => filtered.includes(code));
  const remaining = filtered.filter((code) => !quickLocales.includes(code));

  function choose(nextLocale: Locale) {
    router.replace(pathname, {locale: nextLocale});
    setOpen(false);
    setQuery('');
  }

  function openSelector() {
    setQuery('');
    setOpen(true);
  }

  const languageButton = (code: Locale, prominent = false) => (
    <button
      key={code}
      type="button"
      onClick={() => choose(code)}
      className={`flex min-h-12 items-center justify-between rounded-xl border px-4 text-left text-sm font-bold transition ${
        code === locale
          ? 'border-cyan-600 bg-cyan-50 text-cyan-900'
          : prominent
            ? 'border-slate-200 bg-white shadow-sm hover:border-cyan-300 hover:bg-cyan-50/50'
            : 'border-slate-200 hover:bg-slate-50'
      }`}
      aria-current={code === locale ? 'true' : undefined}
    >
      <span>{localeNames[code]}</span>
      <span className="text-xs uppercase text-slate-400">{code}</span>
    </button>
  );

  const dialog = open ? (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      aria-hidden="false"
    >
      <section
        className="flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:max-w-3xl sm:rounded-[28px]"
        aria-modal="true"
        role="dialog"
        aria-label={t('title')}
      >
        <div className="shrink-0 border-b border-slate-200 bg-white px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-black uppercase tracking-[.16em] text-cyan-700">
                {t('current')}: {localeNames[locale]}
              </p>
              <h2 className="mt-1 text-xl font-black">{t('title')}</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 hover:bg-slate-200"
              aria-label={t('close')}
            >
              <X size={19}/>
            </button>
          </div>

          <label className="mt-4 flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200 px-4">
            <Search size={17} className="text-slate-400"/>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search')}
              className="w-full bg-transparent outline-none"
              autoFocus
            />
          </label>

          {quick.length > 0 && (
            <div className="mt-3 grid gap-2 rounded-2xl bg-slate-50 p-2 sm:grid-cols-2 lg:grid-cols-4">
              {quick.map((code) => languageButton(code, true))}
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 sm:px-5 sm:pb-5">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((code) => languageButton(code))}
          </div>
          {remaining.length === 0 && quick.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-500">{t('search')}</p>
          )}
        </div>
      </section>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={openSelector}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 text-sm font-bold text-slate-700 shadow-sm sm:gap-2 sm:px-3.5"
        aria-label={t('title')}
        aria-expanded={open}
      >
        <Languages size={17}/>
        <span className={compact ? 'sr-only sm:not-sr-only' : ''}>{localeNames[locale]}</span>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black uppercase">{locale}</span>
      </button>

      {mounted && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}

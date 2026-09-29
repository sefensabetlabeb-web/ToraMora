'use client';

import {useDeferredValue, useMemo, useState} from 'react';
import {Search, X} from 'lucide-react';
import {TripGrid} from '@/components/trips/TripGrid';
import {tripMatchesQuery} from '@/features/trips/search';
import type {Trip, TripCategory} from '@/types/trip';

type CategoryView = {
  key: TripCategory;
  label: string;
  description: string;
};

type SearchStrings = {
  label: string;
  placeholder: string;
  clear: string;
  noResults: string;
  results: string;
};

export function SearchableTripCatalog({
  trips,
  categories,
  locale,
  strings
}: {
  trips: Trip[];
  categories: CategoryView[];
  locale: string;
  strings: SearchStrings;
}) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const categoryLabels = useMemo(
    () => new Map(categories.map((category) => [category.key, category.label])),
    [categories]
  );

  const filteredTrips = useMemo(
    () => trips.filter((trip) => tripMatchesQuery(trip, deferredQuery, locale, categoryLabels.get(trip.category) ?? '')),
    [trips, deferredQuery, locale, categoryLabels]
  );

  const resultText = strings.results.replace('{count}', String(filteredTrips.length));

  return (
    <div className="mt-10">
      <div id="trip-search" className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_12px_38px_rgba(15,23,42,.06)] sm:p-5">
        <label htmlFor="trip-search-input" className="mb-2 block text-sm font-extrabold text-slate-800">
          {strings.label}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} aria-hidden="true" />
          <input
            id="trip-search-input"
            type="search"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={strings.placeholder}
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={strings.clear}
              title={strings.clear}
              className="absolute right-2 top-1/2 inline-grid size-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-medium text-slate-500" aria-live="polite">{resultText}</p>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="mt-8 rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          <Search className="mx-auto mb-3 text-slate-400" size={28} aria-hidden="true" />
          <p className="font-bold text-slate-800">{strings.noResults}</p>
        </div>
      ) : (
        <div className="mt-12 space-y-16">
          {categories.map((category) => {
            const list = filteredTrips.filter((trip) => trip.category === category.key);
            if (!list.length) return null;
            return (
              <section key={category.key} id={category.key} className="scroll-mt-28">
                <div className="mb-6 max-w-2xl">
                  <h2 className="text-2xl font-black sm:text-3xl">{category.label}</h2>
                  <p className="mt-2 text-slate-600">{category.description}</p>
                </div>
                <TripGrid trips={list} />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

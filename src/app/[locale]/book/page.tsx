import {localizedPageMetadata} from '@/lib/seo/page-metadata';
import type {Metadata} from 'next';
import {getTranslations,setRequestLocale} from 'next-intl/server';import {BookingForm} from '@/components/forms/BookingForm';import {getPublishedTrips} from '@/features/trips/trip-service';import {localizeTrips} from '@/features/trips/trip-localization';import type {Locale} from '@/i18n/locales';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const t=await getTranslations('forms');
  return localizedPageMetadata({locale,path:'/book',title:t('sendBooking'),description:t('bookingIntro')});
}

export default async function BookPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{trip?:string}>}){const [{locale},{trip},base]=await Promise.all([params,searchParams,getPublishedTrips()]);setRequestLocale(locale);const [trips,nav,forms]=await Promise.all([localizeTrips(base,locale as Locale),getTranslations('nav'),getTranslations('forms')]);return <main className="container-shell py-12 sm:py-16"><div className="mx-auto max-w-3xl"><p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand)]">{nav('book')}</p><h1 className="mt-3 text-4xl font-black tracking-[-.04em] text-slate-950 sm:text-5xl">{forms('sendBooking')}</h1><p className="mt-4 mb-8 text-slate-600">{forms('bookingIntro')}</p><BookingForm defaultTrip={trip??''} trips={trips.map(({slug,title})=>({slug,title}))}/></div></main>}

import type {Metadata} from 'next';
import {getTranslations,setRequestLocale} from 'next-intl/server';
import {SearchableTripCatalog} from '@/components/trips/SearchableTripCatalog';
import {tripCategories} from '@/features/trips/trip-categories';
import {getPublishedTrips} from '@/features/trips/trip-service';
import {localizeTrips} from '@/features/trips/trip-localization';
import type {Locale} from '@/i18n/locales';
import {locales} from '@/i18n/locales';
import {localizedPath} from '@/lib/seo/urls';
import {Link} from '@/i18n/navigation';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const t=await getTranslations('trips');
  return {
    title:t('title'),
    description:t('description'),
    alternates:{canonical:localizedPath(locale,'/trips'),languages:{...Object.fromEntries(locales.map(code=>[code,localizedPath(code,'/trips')])),'x-default':localizedPath('en','/trips')}}
  };
}

export default async function TripsPage({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  setRequestLocale(locale);
  const [t,c,s]=await Promise.all([getTranslations('trips'),getTranslations('categories'),getTranslations('search')]);
  const base=await getPublishedTrips();
  const trips=await localizeTrips(base,locale as Locale);
  const categories=tripCategories.map((cat)=>({
    key:cat.key,
    label:c(`${cat.messageKey}.label`),
    description:c(`${cat.messageKey}.description`)
  }));

  return <main className="py-14 sm:py-18 lg:py-22"><div className="container-shell"><div className="max-w-3xl"><p className="section-kicker">{t('kicker')}</p><h1 className="section-title">{t('title')}</h1><p className="section-copy">{t('description')}</p></div><nav className="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label={t('kicker')}>{categories.map(cat=><Link key={cat.key} href={`#${cat.key}`} className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold">{cat.label}</Link>)}</nav><SearchableTripCatalog trips={trips} categories={categories} locale={locale} strings={{label:s('label'),placeholder:s('placeholder'),clear:s('clear'),noResults:s('noResults'),results:s.raw('results') as string}}/></div></main>
}

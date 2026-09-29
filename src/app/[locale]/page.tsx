import {localizedPageMetadata} from '@/lib/seo/page-metadata';
import type {Metadata} from 'next';
import {getTranslations,setRequestLocale} from 'next-intl/server';
import {ContactTeaser} from '@/components/contact/ContactTeaser';
import {Hero} from '@/components/home/Hero';
import {HowItWorks} from '@/components/home/HowItWorks';
import {TrustSection} from '@/components/home/TrustSection';
import {TripGrid} from '@/components/trips/TripGrid';
import {getFeaturedTrips} from '@/features/trips/trip-service';
import {localizeTrips} from '@/features/trips/trip-localization';
import type {Locale} from '@/i18n/locales';
import {Link} from '@/i18n/navigation';
import {ReviewsSection} from '@/components/home/ReviewsSection';
import {getPublicSiteSettings} from '@/lib/site-settings';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const [home,hero]=await Promise.all([getTranslations('home'),getTranslations('hero')]);
  return localizedPageMetadata({locale,path:'/',title:home('title'),description:hero('description')});
}

export default async function HomePage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);const [base,settings]=await Promise.all([getFeaturedTrips(),getPublicSiteSettings()]);const trips=await localizeTrips(base,locale as Locale);const t=await getTranslations('home');return <><Hero/><section id="trips" className="perf-defer-section scroll-mt-28 py-16 sm:py-20 lg:py-24"><div className="container-shell"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="section-kicker">{t('popular')}</p><h2 className="section-title">{t('title')}</h2><p className="section-copy">{t('description')}</p></div><Link href="/trips" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-extrabold">{t('allTrips')}</Link></div><div className="mt-10"><TripGrid trips={trips}/></div></div></section><TrustSection/><ReviewsSection/><HowItWorks/><ContactTeaser whatsappNumber={settings.whatsappNumber}/></>}

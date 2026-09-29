import {localizedPageMetadata} from '@/lib/seo/page-metadata';
import type {Metadata} from 'next';
import {Mail, MessageCircle, Phone} from 'lucide-react';
import {getTranslations,setRequestLocale} from 'next-intl/server';
import {ContactForm} from '@/components/forms/ContactForm';
import {getPublishedTrips} from '@/features/trips/trip-service';
import {localizeTrips} from '@/features/trips/trip-localization';
import type {Locale} from '@/i18n/locales';
import {getPublicSiteSettings} from '@/lib/site-settings';
import {buildWhatsAppUrl} from '@/lib/whatsapp';


export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const t=await getTranslations('contact');
  return localizedPageMetadata({locale,path:'/contact',title:t('title'),description:t('description')});
}

export default async function ContactPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{trip?:string}>}){
  const [{locale},{trip},base,settings]=await Promise.all([params,searchParams,getPublishedTrips(),getPublicSiteSettings()]);
  setRequestLocale(locale);
  const [trips,nav,forms,contact]=await Promise.all([localizeTrips(base,locale as Locale),getTranslations('nav'),getTranslations('forms'),getTranslations('contact')]);
  const whatsapp=buildWhatsAppUrl(forms('contactIntro'),settings.whatsappNumber);
  return <main className="container-shell py-12 sm:py-16"><div className="mx-auto max-w-3xl">
    <p className="text-sm font-black uppercase tracking-[.18em] text-[var(--brand)]">{nav('contact')}</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.04em] text-slate-950 sm:text-5xl">{forms('sendMessage')}</h1>
    <p className="mt-4 text-slate-600">{forms('contactIntro')}</p>
    {(whatsapp||settings.phone||settings.email)?<div className="mt-6 grid gap-3 sm:grid-cols-3">
      {whatsapp?<a href={whatsapp} target="_blank" rel="noreferrer noopener" className="flex min-h-12 items-center gap-2 rounded-2xl border bg-white px-4 text-sm font-bold"><MessageCircle size={17}/>{contact('whatsapp')}</a>:null}
      {settings.phone?<a href={`tel:${settings.phone}`} className="flex min-h-12 items-center gap-2 rounded-2xl border bg-white px-4 text-sm font-bold"><Phone size={17}/>{settings.phone}</a>:null}
      {settings.email?<a href={`mailto:${settings.email}`} className="flex min-h-12 items-center gap-2 rounded-2xl border bg-white px-4 text-sm font-bold break-all"><Mail size={17}/>{settings.email}</a>:null}
    </div>:null}
    <div className="mt-8"><ContactForm defaultTrip={trip??''} trips={trips.map(({slug,title})=>({slug,title}))}/></div>
  </div></main>;
}

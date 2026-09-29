import {localizedPageMetadata} from '@/lib/seo/page-metadata';
import type {Metadata} from 'next';
import {getTranslations,setRequestLocale} from 'next-intl/server';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const t=await getTranslations('legal');
  return localizedPageMetadata({locale,path:'/terms',title:t('termsTitle'),description:t('termsIntro')});
}

export default async function TermsPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('legal');return <main className="container-shell py-14 sm:py-20"><article className="mx-auto max-w-3xl"><h1 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t('termsTitle')}</h1><div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600"><p>{t('termsIntro')}</p><p>{t('termsBooking')}</p><p>{t('termsPrices')}</p><p>{t('termsChanges')}</p><p>{t('termsGuest')}</p><p>{t('termsContact')}</p></div></article></main>}

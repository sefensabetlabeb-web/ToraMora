import {localizedPageMetadata} from '@/lib/seo/page-metadata';
import type {Metadata} from 'next';
import {getTranslations,setRequestLocale} from 'next-intl/server';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  setRequestLocale(locale);
  const t=await getTranslations('legal');
  return localizedPageMetadata({locale,path:'/privacy',title:t('privacyTitle'),description:t('privacyIntro')});
}

export default async function PrivacyPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('legal');return <main className="container-shell py-14 sm:py-20"><article className="mx-auto max-w-3xl"><h1 className="text-4xl font-black tracking-[-.04em] sm:text-5xl">{t('privacyTitle')}</h1><div className="mt-7 space-y-5 text-[15px] leading-7 text-slate-600"><p>{t('privacyIntro')}</p><p>{t('privacyData')}</p><p>{t('privacyUse')}</p><p>{t('privacySharing')}</p><p>{t('privacyRetention')}</p><p>{t('privacyRights')}</p></div></article></main>}

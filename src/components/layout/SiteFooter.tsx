import {Globe, Camera, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {Logo} from '@/components/brand/Logo';
import {Link} from '@/i18n/navigation';
import type {PublicSiteSettings} from '@/lib/site-settings';
import {buildWhatsAppUrl} from '@/lib/whatsapp';
import {siteConfig} from '@/config/site';

export function SiteFooter({settings}: {settings?: PublicSiteSettings}) {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  const hero = useTranslations('hero');
  const forms = useTranslations('forms');
  const name = settings?.websiteName || siteConfig.name;
  const whatsapp = settings?.whatsappNumber ? buildWhatsAppUrl(forms('contactIntro'), settings.whatsappNumber) : null;
  const socials = [
    settings?.facebook ? {href: settings.facebook, label: 'Facebook', Icon: Globe} : null,
    settings?.instagram ? {href: settings.instagram, label: 'Instagram', Icon: Camera} : null
  ].filter(Boolean) as {href:string;label:string;Icon:typeof Globe}[];

  return <footer className="border-t border-slate-200 bg-white">
    <div className="container-shell grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.45fr_.8fr_.8fr_1fr]">
      <div><Logo name={name} tagline={settings?.tagline} logoSrc={settings?.logoPath}/><p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{hero('description')}</p>{socials.length?<div className="mt-5 flex gap-2">{socials.map(({href,label,Icon})=><a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="grid size-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:text-slate-900"><Icon size={17}/></a>)}</div>:null}</div>
      <div><h2 className="text-sm font-black">{t('trips')}</h2><div className="mt-4 grid gap-3 text-sm text-slate-600"><Link href="/trips/cairo">{n('cairo')}</Link><Link href="/trips/luxor">{n('luxor')}</Link><Link href="/trips">{n('trips')}</Link></div></div>
      <div><h2 className="text-sm font-black">{t('information')}</h2><div className="mt-4 grid gap-3 text-sm text-slate-600"><Link href="/contact">{n('contact')}</Link><Link href="/privacy">{t('privacy')}</Link><Link href="/terms">{t('terms')}</Link></div></div>
      <div><h2 className="text-sm font-black">{t('fromHurghada')}</h2><div className="mt-4 grid gap-3 text-sm text-slate-600"><p className="flex gap-2"><MapPin size={16}/>{t('redSea')}</p>{whatsapp?<a className="flex gap-2" href={whatsapp} target="_blank" rel="noreferrer noopener"><MessageCircle size={16}/>WhatsApp</a>:null}{settings?.phone?<a className="flex gap-2" href={`tel:${settings.phone}`}><Phone size={16}/>{settings.phone}</a>:null}{settings?.email?<a className="flex gap-2" href={`mailto:${settings.email}`}><Mail size={16}/>{settings.email}</a>:null}</div></div>
    </div>
    <div className="border-t border-slate-200 py-5"><div className="container-shell flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>Â© {new Date().getFullYear()} {name}. {t('rights')}</p><p>{t('fast')}</p></div></div>
  </footer>;
}



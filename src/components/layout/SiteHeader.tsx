import {useTranslations} from 'next-intl';
import {Search} from 'lucide-react';
import {Logo} from '@/components/brand/Logo';
import {MobileNav} from '@/components/layout/MobileNav';
import {LanguageSelector} from '@/components/layout/LanguageSelector';
import {Link} from '@/i18n/navigation';

export function SiteHeader({websiteName,tagline,logoPath}: {websiteName?: string;tagline?:string;logoPath?:string}) {
  const t = useTranslations('nav');
  const search = useTranslations('search');
  const nav = [[t('home'),'/'],[t('trips'),'/trips'],[t('cairo'),'/trips/cairo'],[t('luxor'),'/trips/luxor'],[t('contact'),'/contact']] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/75 bg-white/94 backdrop-blur-xl">
      <div className="container-shell flex min-h-[72px] items-center gap-2 sm:gap-4">
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileNav />
        </div>

        <Link href="/" aria-label={`${websiteName || 'ToraMora'} home`} className="min-w-0 shrink lg:mr-auto">
          <span className="sm:hidden"><Logo compact name={websiteName} tagline={tagline} logoSrc={logoPath}/></span>
          <span className="hidden sm:inline"><Logo name={websiteName} tagline={tagline} logoSrc={logoPath}/></span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map(([label,href])=><Link key={href} href={href} className="rounded-full px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-[var(--brand-dark)]">{label}</Link>)}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:ml-0">
          <Link href="/trips#trip-search" aria-label={search('label')} title={search('label')} className="inline-grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 sm:size-11">
            <Search size={19}/>
          </Link>
          <div className="block"><LanguageSelector compact/></div>
          <Link href="/book" className="hidden min-h-11 items-center rounded-full bg-[var(--brand)] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--brand-dark)] sm:inline-flex">{t('book')}</Link>
        </div>
      </div>
    </header>
  );
}

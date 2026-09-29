import type {Metadata} from 'next';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import '../globals.css';
import {SiteHeader} from '@/components/layout/SiteHeader';
import {SiteFooter} from '@/components/layout/SiteFooter';
import {FloatingWhatsApp} from '@/components/contact/FloatingWhatsApp';
import {JsonLd} from '@/components/seo/JsonLd';
import {travelAgencyJsonLd} from '@/lib/seo/jsonld';
import {routing} from '@/i18n/routing';
import {getPublicSiteSettings} from '@/lib/site-settings';
import {siteConfig} from '@/config/site';
import {getSiteUrl, localizedPath} from '@/lib/seo/urls';
import {locales} from '@/i18n/locales';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const settings = await getPublicSiteSettings();
  const name = settings.websiteName || siteConfig.name;
  const canonical = localizedPath(locale, '/');
  const title = `${name} | Trips from Hurghada`;
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {default: title, template: `%s | ${name}`},
    description: siteConfig.description,
    applicationName: name,
    category: 'travel',
    referrer: 'origin-when-cross-origin',
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localizedPath(code, '/')])),
        'x-default': localizedPath('en', '/')
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1}
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION ? {google: process.env.GOOGLE_SITE_VERIFICATION} : undefined,
    openGraph: {
      type: 'website',
      siteName: name,
      url: canonical,
      title,
      description: siteConfig.description,
      images: [{url: settings.logoPath, alt: `${name} logo`}]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: siteConfig.description,
      images: [settings.logoPath]
    }
  };
}

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const [messages, settings] = await Promise.all([getMessages(), getPublicSiteSettings()]);
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={travelAgencyJsonLd(locale, settings)} />
          <SiteHeader websiteName={settings.websiteName} tagline={settings.tagline} logoPath={settings.logoPath} />
          {children}
          <SiteFooter settings={settings} />
          <FloatingWhatsApp number={settings.whatsappNumber} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

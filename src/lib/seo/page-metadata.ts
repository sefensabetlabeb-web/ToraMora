import type {Metadata} from 'next';
import {locales} from '@/i18n/locales';
import {localizedPath} from './urls';

export function localizedPageMetadata(args: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const {locale, path, title, description} = args;
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localizedPath(code, path)])),
        'x-default': localizedPath('en', path)
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

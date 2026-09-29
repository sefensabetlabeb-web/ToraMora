import {locales, type Locale} from '@/i18n/locales';
import {localizedPath} from './urls';

export function languageAlternates(path = '/') {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, path)])
  );

  return {
    canonical: localizedPath('en' satisfies Locale, path),
    languages: {...languages, 'x-default': localizedPath('en', path)}
  };
}

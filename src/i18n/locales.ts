export const locales = [
  'en','de','fr','it','es','pt','nl','pl','cs','sk','sl','hr','sr','bs','cnr','ro','hu','bg','el','sq','mk','lt','lv','et','fi','sv','no','da','is','ga','mt','uk','be','ru','tr','ca','eu','cy','lb'
] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en:'English', de:'Deutsch', fr:'Français', it:'Italiano', es:'Español', pt:'Português', nl:'Nederlands', pl:'Polski', cs:'Čeština', sk:'Slovenčina', sl:'Slovenščina', hr:'Hrvatski', sr:'Srpski', bs:'Bosanski', cnr:'Crnogorski', ro:'Română', hu:'Magyar', bg:'Български', el:'Ελληνικά', sq:'Shqip', mk:'Македонски', lt:'Lietuvių', lv:'Latviešu', et:'Eesti', fi:'Suomi', sv:'Svenska', no:'Norsk', da:'Dansk', is:'Íslenska', ga:'Gaeilge', mt:'Malti', uk:'Українська', be:'Беларуская', ru:'Русский', tr:'Türkçe', ca:'Català', eu:'Euskara', cy:'Cymraeg', lb:'Lëtzebuergesch'
};

export const rtlLocales: readonly Locale[] = [];
export const defaultLocale: Locale = 'en';

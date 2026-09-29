import 'server-only';
import type {Locale} from './locales';

type JsonRecord = Record<string, unknown>;

export type TranslationCoverage = {
  explicit: number;
  total: number;
  missing: number;
  percent: number;
};

export async function getInterfaceTranslationCoverage(locale: Locale): Promise<TranslationCoverage> {
  const base = await import('../../messages/en.json').then((m) => m.default as JsonRecord);
  const localized = locale === 'en'
    ? base
    : await import(`../../messages/${locale}.json`).then((m) => m.default as JsonRecord);
  const baseKeys = new Set(flattenKeys(base));
  const localizedKeys = new Set(flattenKeys(localized));
  let explicit = 0;
  for (const key of baseKeys) if (localizedKeys.has(key)) explicit += 1;
  const total = baseKeys.size;
  const missing = total - explicit;
  return {explicit, total, missing, percent: total ? Math.round((explicit / total) * 100) : 100};
}

function flattenKeys(value: JsonRecord, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      keys.push(...flattenKeys(child as JsonRecord, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

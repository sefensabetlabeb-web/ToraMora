import fs from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';
import {defaultLocale, localeNames, locales} from '@/i18n/locales';

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return prefix ? [prefix] : [];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key));
}

describe('internationalisation', () => {
  it('enables 39 locales with English as the default', () => {
    expect(locales).toHaveLength(39);
    expect(defaultLocale).toBe('en');
    expect(new Set(locales).size).toBe(locales.length);
  });

  it('has a display name and a JSON message file for every locale', () => {
    for (const locale of locales) {
      expect(localeNames[locale]).toBeTruthy();
      const file = path.join(process.cwd(), 'messages', `${locale}.json`);
      expect(fs.existsSync(file), `${locale}.json should exist`).toBe(true);
      expect(() => JSON.parse(fs.readFileSync(file, 'utf8'))).not.toThrow();
    }
  });

  it('keeps every locale structurally compatible with the English master messages', () => {
    const master = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages', 'en.json'), 'utf8'));
    const masterKeys = new Set(flattenKeys(master));
    expect(masterKeys.size).toBeGreaterThan(20);

    for (const locale of locales) {
      const messages = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages', `${locale}.json`), 'utf8'));
      for (const key of flattenKeys(messages)) expect(masterKeys.has(key), `${locale}: unexpected key ${key}`).toBe(true);
    }
  });
});

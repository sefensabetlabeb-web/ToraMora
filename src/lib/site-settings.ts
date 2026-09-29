import {siteConfig} from '@/config/site';
import {prisma} from '@/lib/database/prisma';
import {normalizeWhatsAppNumber} from '@/lib/whatsapp';

export type PublicSiteSettings = {
  websiteName: string;
  tagline: string;
  logoPath: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  currency: string;
  defaultLanguage: string;
  facebook: string;
  instagram: string;
};

const fallback: PublicSiteSettings = {
  websiteName: siteConfig.name,
  tagline: siteConfig.tagline,
  logoPath: '/brand/toramora-logo.png',
  whatsappNumber: normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phone,
  currency: siteConfig.currency,
  defaultLanguage: siteConfig.defaultLocale,
  facebook: siteConfig.social.facebook,
  instagram: siteConfig.social.instagram
};

export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    const row = await prisma.siteSetting.findUnique({where: {id: 'global'}});
    if (!row) return fallback;
    return {
      websiteName: row.websiteName || fallback.websiteName,
      tagline: row.tagline || fallback.tagline,
      logoPath: row.logoPath || fallback.logoPath,
      whatsappNumber: normalizeWhatsAppNumber(row.whatsappNumber || fallback.whatsappNumber),
      email: row.email || fallback.email,
      phone: row.phone || fallback.phone,
      currency: row.currency || fallback.currency,
      defaultLanguage: row.defaultLanguage || fallback.defaultLanguage,
      facebook: row.facebook || fallback.facebook,
      instagram: row.instagram || fallback.instagram
    };
  } catch {
    return fallback;
  }
}

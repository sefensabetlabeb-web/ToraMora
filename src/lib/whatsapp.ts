import {trips} from '@/data/trips';

const DEFAULT_MESSAGE = 'Hello, I would like more information about trips from Hurghada.';
const DEFAULT_WHATSAPP_NUMBER = '201006236948';

export function normalizeWhatsAppNumber(value: string | undefined) {
  return (value ?? '').replace(/\D/g, '');
}

export function getWhatsAppNumber() {
  return normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppMessageForPath(pathname: string) {
  const slug = pathname.match(/(?:^|\/)trips\/([^/?#]+)/)?.[1];
  if (!slug) return DEFAULT_MESSAGE;
  const trip = trips.find((item) => item.slug === slug && item.status === 'published');
  return trip?.whatsappMessage ?? DEFAULT_MESSAGE;
}

export function buildWhatsAppUrl(message: string, number?: string) {
  const normalized = normalizeWhatsAppNumber(number) || getWhatsAppNumber();
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

import Link from 'next/link';
import {MessageCircleMore} from 'lucide-react';
import {buildWhatsAppUrl} from '@/lib/whatsapp';

type Props = {
  message: string;
  label?: string;
  className?: string;
  number?: string;
};

export function WhatsAppLink({message, label = 'Ask on WhatsApp', className = 'cta-secondary', number}: Props) {
  const href = buildWhatsAppUrl(message, number);
  if (!href) return null;

  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className={className}>
      <MessageCircleMore size={17} aria-hidden="true" /> {label}
    </Link>
  );
}

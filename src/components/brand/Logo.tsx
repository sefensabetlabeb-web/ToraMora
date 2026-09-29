import Image from 'next/image';

interface LogoProps { compact?: boolean; name?: string; tagline?: string; logoSrc?: string; }

export function Logo({compact = false, name = 'ToraMora', logoSrc = '/brand/toramora-logo.png'}: LogoProps) {
  return (
    <span className="inline-flex items-center">
      <Image
        src={logoSrc}
        alt={`${name} travel`}
        width={compact ? 126 : 168}
        height={compact ? 42 : 56}
        priority
        className="h-auto w-[126px] object-contain sm:w-[150px] lg:w-[168px]"
      />
    </span>
  );
}

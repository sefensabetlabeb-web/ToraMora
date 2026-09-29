'use client';

import Image from 'next/image';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useCallback, useEffect, useRef, useState} from 'react';
import type {TripImage} from '@/types/trip';

const AUTOPLAY_MS = 4500;

export function TripGallery({images}: {images: TripImage[]}) {
  const t = useTranslations('tripDetail');
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      if (!images.length) return;
      const normalized = (index + images.length) % images.length;
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({left: normalized * track.clientWidth, behavior});
      setActiveIndex(normalized);
    },
    [images.length],
  );

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 6500);
  }, []);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % images.length;
        const track = trackRef.current;
        if (track) track.scrollTo({left: next * track.clientWidth, behavior: 'smooth'});
        return next;
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  useEffect(() => {
    const onResize = () => goTo(activeIndex, 'auto');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, goTo]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  if (!images.length) return null;

  const syncIndexFromScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.max(0, Math.min(images.length - 1, next)));
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="gallery-heading">
      <div className="container-shell">
        <div className="mb-6 flex items-end justify-between gap-6 sm:mb-8">
          <div>
            <p className="section-kicker">{t('gallery')}</p>
            <h2
              id="gallery-heading"
              className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl"
            >
              {t('galleryTitle')}
            </h2>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-6 text-slate-500 md:block">
            {t('galleryCopy')}
          </p>
        </div>

        <div
          className="group relative overflow-hidden rounded-[28px] bg-slate-100 shadow-[0_18px_60px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 sm:rounded-[34px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPointerDown={pauseTemporarily}
        >
          <div
            ref={trackRef}
            onScroll={syncIndexFromScroll}
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Trip photo gallery"
          >
            {images.map((image, index) => (
              <figure
                key={`${image.src}-${index}`}
                className="relative aspect-[4/3] min-w-full snap-center bg-slate-200 sm:aspect-[16/10] lg:aspect-[16/8.5]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1180px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </figure>
            ))}
          </div>

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => {
                  pauseTemporarily();
                  goTo(activeIndex - 1);
                }}
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:left-5 sm:size-12"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  pauseTemporarily();
                  goTo(activeIndex + 1);
                }}
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-950 shadow-lg backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:right-5 sm:size-12"
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/55 px-3 py-2 backdrop-blur-md sm:bottom-5">
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-dot-${index}`}
                    type="button"
                    onClick={() => {
                      pauseTemporarily();
                      goTo(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex ? 'w-7 bg-white' : 'w-2 bg-white/55 hover:bg-white/80'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>

              <div className="absolute right-4 top-4 rounded-full bg-slate-950/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md sm:right-5 sm:top-5 sm:text-sm">
                {activeIndex + 1} / {images.length}
              </div>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <p className="mt-3 text-center text-xs font-medium text-slate-500 sm:text-sm">
            Swipe to explore the gallery
          </p>
        ) : null}
      </div>
    </section>
  );
}

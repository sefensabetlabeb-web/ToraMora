import {Star} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {getPublishedReviews} from '@/lib/reviews';

export async function ReviewsSection({tripSlug}: {tripSlug?: string}) {
  const reviews = await getPublishedReviews({tripSlug, limit: tripSlug ? 4 : 6});
  if (!reviews.length) return null;
  const t = await getTranslations('reviews');
  return <section className="perf-defer-section py-16 sm:py-20">
    <div className="container-shell">
      <div className="max-w-3xl"><p className="section-kicker">{t('kicker')}</p><h2 className="section-title">{tripSlug ? t('tripTitle') : t('title')}</h2><p className="section-copy">{t('description')}</p></div>
      <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review)=><article key={review.id} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex gap-1" aria-label={`${review.rating} / 5`}>{Array.from({length:5},(_,i)=><Star key={i} size={17} className={i<review.rating?'fill-amber-400 text-amber-400':'text-slate-200'}/>)}</div>
          {review.title?<h3 className="mt-4 text-lg font-black">{review.title}</h3>:null}
          <p className="mt-3 text-sm leading-7 text-slate-600">“{review.text}”</p>
          <p className="mt-5 text-sm font-black text-slate-900">{review.name}{review.country?` · ${review.country}`:''}</p>
        </article>)}
      </div>
    </div>
  </section>;
}

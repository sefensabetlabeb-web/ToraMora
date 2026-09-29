# Performance strategy

Stage 12 focuses on fast mobile loading and predictable server work as the trip catalog grows.

## Implemented

- Next/Image configured for AVIF/WebP with responsive device sizes and a 24-hour image optimization cache.
- Public trip/brand assets receive browser caching with stale-while-revalidate.
- Hero images stay high priority; gallery/card images remain lazy-loaded and responsive.
- Multi-trip localization uses one batched Prisma query instead of one query per trip (removes N+1 behavior).
- Large below-the-fold sections can use `content-visibility: auto` through `perf-defer-section`.
- Existing client JavaScript is kept limited to interactions that require it: navigation, language selector, forms, WhatsApp, and admin controls.
- A lightweight `npm run performance:audit` command flags unusually large source/public files and missing image optimization settings.

## Production image policy

When real photos replace the current SVG placeholders, upload source images at sensible dimensions, prefer WebP/AVIF, and avoid multi-megabyte originals. Next/Image remains responsible for responsive delivery.

## Final validation

Lighthouse/Core Web Vitals, production bundle analysis, slow-network testing, and full build validation are intentionally deferred to the final audit stage.

# Architecture

## Chosen production stack
- Next.js 16 App Router + React Server Components
- TypeScript strict mode
- Tailwind CSS 4
- PostgreSQL
- Prisma ORM 7 (stable production baseline)
- next-intl for structured i18n
- Zod for server/client input schemas
- Future admin authentication module isolated under `src/features/auth`

## Design principles
- Mobile-first UI.
- Server-first rendering for SEO and low JavaScript cost.
- Dynamic trip data lives behind services/repositories; UI never depends directly on database details.
- Site identity is centralized in `src/config/site.ts` now and moves to database-backed settings in the Admin stage.
- Images use Next Image and AVIF/WebP output when deployed on a compatible image optimizer.
- Security controls are implemented at boundaries: auth, validation, rate limiting, headers and CSRF strategy.

## Planned feature boundaries
`src/components`: reusable UI only.
`src/features`: business modules added by stage (trips, enquiries, bookings, admin, auth, settings, reviews).
`src/lib`: infrastructure/shared utilities.
`src/services`: business orchestration and external integrations.
`prisma`: database schema/migrations.
`locales`: translation catalogs, never scattered through components.

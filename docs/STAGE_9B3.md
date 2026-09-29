# Stage 9B-3

Expanded customer-facing trip content to 13 additional European locales while preserving English fallback and database overrides.

## Added locales
pt, nl, cs, sk, ro, hu, bg, el, uk, sv, no, da, fi.

## Architecture
`core.ts` keeps the first reviewed translation batch.
`extended.ts` contains the new batch.
`all.ts` merges both sources for frontend localization and Prisma seeding.

Database translations always override bundled content, so Admin edits remain authoritative.

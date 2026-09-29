# Stage 15A — Build & Architecture Fixes

## Fixed

1. Prisma config renamed to the Prisma 7 supported `prisma.config.ts`.
2. Added initial production migration matching all current Prisma models.
3. Fixed the local trip repository import/export mismatch.
4. Added lazy Prisma Client creation to preserve bundled-catalogue fallback when `DATABASE_URL` is absent.
5. Unified environment loading order for Prisma CLI, seed and admin scripts.
6. Separated production migrations from starter data seeding so deploys cannot overwrite admin-edited content.
7. Improved Windows PostgreSQL backup environment loading.

## Audit evidence

- JSON parse check: PASS.
- Prisma schema models vs migration tables: PASS (9/9).
- No obsolete `prisma7.config.ts` references: PASS.
- JavaScript/MJS syntax check: PASS.
- `npm install`: not completed in the audit container because dependency download exceeded the environment timeout. Full lint/typecheck/test/build is intentionally deferred to Stage 15E.

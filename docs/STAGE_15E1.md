# Stage 15E-1 — Pre-Build Audit

## Purpose
Prepare the codebase for the real dependency-backed build/test run and remove issues that can be proven without npm registry access.

## Fixed in this stage
- Corrected stale `/brand/logo.svg` references in the web manifest and JSON-LD.
- JSON-LD now respects the admin-configured logo path.
- Removed nested `<main>` landmarks from the locale root layout.
- Replaced the decorative WhatsApp CTA in the home contact teaser with a real WhatsApp action using current site settings.
- Contact enquiries now validate an optional selected trip against a published trip before storing it.
- Added `npm run final:audit` static project audit.
- Added `scripts/windows/stage15e-full-check.cmd` for the full Windows verification sequence.

## Verified here
- Security audit: 15/15 PASS.
- Performance audit: PASS.
- Translation audit: 39 locales, 151/151 keys each, 0 fallback keys.
- Static final audit: 11/11 PASS.
- Local import resolution: PASS.
- Prisma schema -> initial migration model coverage: PASS.
- TypeScript `.ts` syntax: 58 files PASS using Node 22 type stripping.
- TSX parser-level syntax: no TS1xxx parser errors.

## Why the real build did not run here
The environment cannot resolve `registry.npmjs.org` and `npm ping` returns `EAI_AGAIN`. Therefore `npm install` cannot finish and dependency-backed commands (`prisma generate`, ESLint, Vitest, Playwright, Next production build) cannot be honestly marked as passed here.

## Run next on Windows
From the project directory:

```cmd
scripts\windows\stage15e-full-check.cmd
```

The script installs dependencies (and creates `package-lock.json` if this is the first install), generates Prisma Client, runs static/security/i18n audits, lint, typecheck, unit tests, production build, installs Playwright Chromium, and runs E2E tests.

Do not treat the release as final until this script prints `ALL STAGE 15E CHECKS PASSED`.

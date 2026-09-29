# Stage 15D — Security & Production Audit

This stage hardens authentication, public POST endpoints, rate limiting, admin input validation, deployment guards and backup verification.

## Security changes

- Admin JWT sessions now carry a `sessionVersion`. Recreating/changing the admin password increments that version, immediately revoking older sessions.
- Production POST endpoints reject requests without a same-origin `Origin` header.
- Rate-limit keys store a SHA-256 hash instead of the raw client IP.
- Proxy IP headers are ignored unless `TRUST_PROXY_HEADERS=true` is explicitly configured.
- Expired rate-limit buckets older than 24 hours are cleaned opportunistically within the rate-limit query.
- Production readiness checks now require explicit proxy trust configuration, detect placeholder admin credentials and require encrypted PostgreSQL connections for non-local databases.
- CSP now blocks inline event-handler attributes; additional defensive response headers were added.
- `.env.production.example` is explicitly retained in Git while real production env files and database dumps remain ignored.
- Admin input validation now restricts media paths to local `/images` or `/brand` assets, rejects parent-directory traversal, requires HTTPS social links, restricts trip translations to enabled locales, and validates gallery/section/list JSON structures.
- Backup verification tooling checks that a PostgreSQL custom-format dump can be read by `pg_restore`.

## Commands

Run the local static security audit:

```cmd
scripts\windows\security-audit.cmd
```

Check production environment readiness:

```cmd
npm run production:guard
```

Check dependency advisories when internet access is available:

```cmd
npm run security:deps
```

Create a backup:

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\windows\backup-postgres.ps1
```

Verify a backup catalogue:

```cmd
scripts\windows\verify-backup.cmd "backups\hurghada_journeys_YYYYMMDD_HHMMSS.dump"
```

A readable dump is not a substitute for a periodic restore test into a disposable PostgreSQL database.

## Deployment note: proxy headers

Set `TRUST_PROXY_HEADERS=true` only when the hosting platform/reverse proxy removes client-supplied forwarding headers and supplies trusted client-IP headers itself. If this cannot be guaranteed, leave it false; the rate limiter then behaves conservatively rather than trusting spoofable headers.

## Deferred to Stage 15E

- Full `npm install` / dependency advisory check (network dependent)
- TypeScript compilation
- ESLint
- Vitest
- Playwright
- Production Next.js build

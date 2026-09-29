# Security — Stage 11

## Controls implemented

- Admin passwords are hashed with bcrypt (12 rounds) and never stored in plaintext.
- Admin session JWTs require a strong `AUTH_SECRET`, include issuer/audience checks, expire after 8 hours, and are stored in `HttpOnly`, `SameSite=Strict`, production-secure cookies.
- Admin login returns a generic authentication error to reduce account enumeration.
- Public forms and admin login use PostgreSQL-backed rate-limit buckets so limits survive restarts and work across multiple app instances.
- Same-origin checks protect state-changing JSON API routes.
- JSON APIs require `application/json`, enforce a 32 KiB body limit, and validate all submitted data with Zod.
- Public error responses do not expose stack traces, database errors, or secrets.
- Security headers include CSP, frame denial, MIME sniffing protection, referrer policy, permissions policy, COOP/CORP, and production HSTS.
- `/admin/*` and `/api/*` responses are marked `no-store`.
- React rendering escapes stored customer text; the JSON-LD component also escapes `<` before rendering structured data.
- `/admin` and `/api` remain excluded from search indexing in robots rules.

## Production notes

- Use HTTPS only.
- Generate `AUTH_SECRET` from cryptographically secure random bytes; never commit it.
- Create a unique database password and restricted application database user.
- Put the app behind a trusted reverse proxy / hosting provider that controls forwarding headers.
- Review CSP again after the final deployment target is chosen. The current policy intentionally allows Next.js inline bootstrap scripts/styles while blocking third-party origins.
- Rate-limit rows can be periodically removed after their reset time as routine database maintenance.

## Final audit

The requested full lint, type-check, production build, automated tests, dependency audit, responsive audit, and end-to-end security audit are deferred to the final project stage.

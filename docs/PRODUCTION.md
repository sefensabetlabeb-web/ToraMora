# Production preparation

Stage 14 prepares Hurghada Journeys for a real production environment. Stage 15 still performs the complete deep audit before the project is treated as release-ready.

## Required runtime

- Node.js 20.9+ (use a current maintained LTS release in production)
- PostgreSQL
- HTTPS domain
- Persistent production environment variables/secrets

## Required environment values

Use `.env.production.example` only as a template. Never commit real secrets.

Required:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL` — must be the final HTTPS public origin
- `AUTH_SECRET` — random, 43+ characters

Business/config values:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `GOOGLE_SITE_VERIFICATION` (optional)

`ADMIN_EMAIL` and `ADMIN_PASSWORD` are only needed when intentionally running the first-admin creation script. Remove them from the deployment environment afterward if the platform permits it.

## Windows secret generation

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\windows\generate-auth-secret.ps1
```

Copy only the generated value into the hosting provider's secret store.

## Production guard

Before deployment:

```cmd
npm run production:guard
```

It refuses obvious unsafe deployment configuration such as localhost/example URLs, missing PostgreSQL connection, or a weak placeholder `AUTH_SECRET`.

## Database deployment

Use migrations in production, not `prisma migrate dev`.

```cmd
npm run db:deploy
npm run db:seed
```

A production deployment must have reviewed migration files before running this command. Stage 15 will explicitly verify the migration state.

## Build and start

```cmd
scripts\windows\production-build.cmd
scripts\windows\production-start.cmd
```

Next.js standalone output is enabled so supported hosts/container workflows can deploy a smaller runtime artifact.

## Health check

`GET /api/health`

- `200 {"status":"ok"}` when the app can reach PostgreSQL.
- `503 {"status":"unavailable"}` otherwise.
- It never returns database URLs, stack traces, or internal exception details.

## Backups

With PostgreSQL client tools installed and `DATABASE_URL` set:

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\windows\backup-postgres.ps1
```

Use the hosting provider's managed automatic backups as the primary production backup when available. Test restoration periodically; a backup that has never been restored is not a verified backup.

## Logs

Production logs must not contain passwords, `AUTH_SECRET`, session tokens, full database URLs, or unnecessary customer form content. Platform logs should be retained with a reasonable rotation/retention policy.

## Deployment order

1. Provision PostgreSQL and backups.
2. Configure HTTPS domain and environment secrets.
3. Run `npm run production:guard`.
4. Apply reviewed Prisma migrations.
5. Seed required catalog/settings data.
6. Create the first admin in a controlled step if needed.
7. Build and deploy.
8. Check `/api/health`.
9. Run Stage 15 smoke/E2E checks against the deployment or a production-like environment.
10. Connect Search Console after the real domain is final.

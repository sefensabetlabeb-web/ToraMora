import fs from 'node:fs';

const checks = [];
const pass = (name) => checks.push({name, ok: true});
const fail = (name, detail) => checks.push({name, ok: false, detail});
const read = (path) => fs.readFileSync(path, 'utf8');
const has = (path, needle) => read(path).includes(needle);

function check(name, condition, detail) {
  if (condition) {
    pass(name);
  } else {
    fail(name, detail);
  }
}

check('Production env example is committed by gitignore', has('.gitignore', '!.env.production.example'), 'Add !.env.production.example to .gitignore.');
check('Real production env remains ignored', has('.gitignore', '.env.production\n'), 'Real production env must stay ignored.');
check('Database backups remain ignored', has('.gitignore', 'backups/'), 'backups/ must stay ignored.');
check('Admin session cookie is HttpOnly', has('src/lib/auth/session.ts', 'httpOnly: true'), 'Session cookie must be HttpOnly.');
check('Admin session uses SameSite Strict', has('src/lib/auth/session.ts', "sameSite: 'strict'"), 'Admin cookie must use SameSite strict.');
check('Admin session has explicit version revocation', has('src/lib/auth/session.ts', 'sessionVersion') && has('prisma/schema.prisma', 'sessionVersion'), 'Session version revocation is missing.');
check('Unsafe POSTs require same-origin in production', has('src/lib/security/request-guard.ts', "if (!origin) return process.env.NODE_ENV !== 'production'"), 'Production requests without Origin should be rejected.');
check('Rate-limit client identifiers are hashed', has('src/lib/security/request-guard.ts', "createHash('sha256')"), 'Do not persist raw client IP addresses in rate-limit keys.');
check('Proxy trust is explicit', has('src/lib/security/request-guard.ts', 'TRUST_PROXY_HEADERS'), 'Proxy IP headers need an explicit trust policy.');
check('CSP blocks framing', has('next.config.ts', "frame-ancestors 'none'"), 'CSP frame-ancestors is missing.');
check('CSP blocks inline event-handler attributes', has('next.config.ts', "script-src-attr 'none'"), 'script-src-attr protection is missing.');
check('HSTS is production-only', has('next.config.ts', 'Strict-Transport-Security') && has('next.config.ts', "process.env.NODE_ENV === 'production'"), 'HSTS production condition is missing.');
check('Initial migration contains all core security tables', has('prisma/migrations/20260927140000_init/migration.sql', 'CREATE TABLE "RateLimitBucket"') && has('prisma/migrations/20260927140000_init/migration.sql', '"sessionVersion" INTEGER'), 'Initial migration is missing security schema.');
check('Production deploy uses migrate deploy', has('scripts/windows/deploy-database.cmd', 'db:deploy'), 'Production database deploy must use migrate deploy.');
check('Production deploy does not auto-seed', !has('scripts/windows/deploy-database.cmd', 'db:seed'), 'Production deploy must not overwrite admin-edited data with seed data.');

const failed = checks.filter((item) => !item.ok);
for (const item of checks) console.log(`${item.ok ? 'PASS' : 'FAIL'}  ${item.name}${item.detail ? ` — ${item.detail}` : ''}`);
console.log(`\nSecurity audit: ${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exit(1);

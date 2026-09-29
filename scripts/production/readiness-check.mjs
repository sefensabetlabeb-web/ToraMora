import {config as loadEnv} from 'dotenv';

// Local production checks can use standard dotenv files; real host-provided
// environment variables remain authoritative because dotenv doesn't override them.
for (const file of ['.env.production.local', '.env.production', '.env.local', '.env']) {
  loadEnv({path: file, quiet: true});
}

const fail = (message) => {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
};

const required = ['DATABASE_URL', 'NEXT_PUBLIC_SITE_URL', 'AUTH_SECRET'];
for (const key of required) {
  if (!process.env[key]?.trim()) fail(`${key} is required for production.`);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? '';
if (siteUrl) {
  try {
    const url = new URL(siteUrl);
    if (url.protocol !== 'https:') fail('NEXT_PUBLIC_SITE_URL must use HTTPS in production.');
    if (['localhost', '127.0.0.1'].includes(url.hostname) || url.hostname.endsWith('.example')) {
      fail('NEXT_PUBLIC_SITE_URL still points to a development/placeholder host.');
    }
  } catch {
    fail('NEXT_PUBLIC_SITE_URL is not a valid absolute URL.');
  }
}

const secret = process.env.AUTH_SECRET ?? '';
if (secret && (secret.length < 43 || /replace|change|secret/i.test(secret))) {
  fail('AUTH_SECRET must be a strong random secret of at least 43 characters.');
}

const db = process.env.DATABASE_URL ?? '';
if (db && !/^postgres(ql)?:\/\//i.test(db)) fail('DATABASE_URL must be a PostgreSQL connection string.');
if (db && /^postgres(ql)?:\/\//i.test(db)) {
  try {
    const dbUrl = new URL(db);
    const localDb = ['localhost', '127.0.0.1', '::1'].includes(dbUrl.hostname);
    const sslMode = dbUrl.searchParams.get('sslmode')?.toLowerCase();
    const sslFlag = dbUrl.searchParams.get('ssl')?.toLowerCase();
    if (!localDb && !['require', 'verify-ca', 'verify-full'].includes(sslMode ?? '') && sslFlag !== 'true') {
      fail('Production DATABASE_URL should require TLS (for example sslmode=require or stronger).');
    }
  } catch {
    // The basic URL validation above will report malformed connection strings.
  }
}


const trustProxy = process.env.TRUST_PROXY_HEADERS?.trim();
if (!['true', 'false'].includes(trustProxy ?? '')) {
  fail('TRUST_PROXY_HEADERS must be explicitly set to true or false. Set true only when your hosting proxy sanitizes client IP headers.');
}

const adminEmail = process.env.ADMIN_EMAIL?.trim() ?? '';
if (adminEmail && /example\.com$|your-domain\.example$/i.test(adminEmail)) {
  fail('ADMIN_EMAIL still contains a placeholder address.');
}

const adminPassword = process.env.ADMIN_PASSWORD ?? '';
if (adminPassword && (adminPassword.length < 12 || /replace|change|password|admin/i.test(adminPassword))) {
  fail('ADMIN_PASSWORD is missing, weak, or still contains a placeholder value.');
}

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? '';
if (whatsapp && !/^\d{8,15}$/.test(whatsapp)) {
  fail('NEXT_PUBLIC_WHATSAPP_NUMBER must contain only 8-15 international-format digits.');
}

if (process.exitCode) {
  console.error('\nProduction readiness check FAILED. Fix the items above before deployment.');
  process.exit(process.exitCode);
}
console.log('Production readiness check: PASS');

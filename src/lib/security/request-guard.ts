import {createHash} from 'node:crypto';
import type {NextRequest} from 'next/server';
import {prisma} from '@/lib/database/prisma';

const MAX_JSON_BYTES = 32 * 1024;

export class RequestGuardError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export function validateRequestOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return process.env.NODE_ENV !== 'production';
  try {
    const requestOrigin = new URL(request.url).origin;
    if (origin === requestOrigin) return true;

    if (process.env.TRUST_PROXY_HEADERS !== 'true') return false;

    const proto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const host =
      request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ||
      request.headers.get('host')?.trim();

    if (!proto || !host || !['http', 'https'].includes(proto)) return false;

    return origin === `${proto}://${host}`;
  } catch {
    return false;
  }
}

export function assertSameOrigin(request: Request) {
  if (!validateRequestOrigin(request)) throw new RequestGuardError('INVALID_ORIGIN', 403);
}

export function getClientAddress(request: Request) {
  // Proxy-provided client IP headers are only trustworthy when the deployment
  // platform strips user-supplied copies before forwarding the request.
  // Keep this explicit so a direct client cannot bypass per-IP limits simply
  // by spoofing x-forwarded-for.
  if (process.env.TRUST_PROXY_HEADERS !== 'true') return 'untrusted-proxy';

  const cf = request.headers.get('cf-connecting-ip')?.trim();
  const realIp = request.headers.get('x-real-ip')?.trim();
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return cf || realIp || forwarded || 'unknown';
}

export function getClientKey(request: Request, namespace: string) {
  const address = getClientAddress(request);
  const digest = createHash('sha256').update(address).digest('hex');
  return `${namespace}:${digest}`;
}


export async function consumeRateLimit(key: string, limit = 8, windowMs = 10 * 60_000) {
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);
  const rows = await prisma.$queryRaw<Array<{count: number; resetAt: Date}>>`
    WITH cleanup AS (
      DELETE FROM "RateLimitBucket"
      WHERE "resetAt" < ${new Date(Date.now() - 24 * 60 * 60_000)}
    )
    INSERT INTO "RateLimitBucket" ("key", "count", "resetAt", "updatedAt")
    VALUES (${key}, 1, ${resetAt}, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN 1
        ELSE "RateLimitBucket"."count" + 1
      END,
      "resetAt" = CASE
        WHEN "RateLimitBucket"."resetAt" <= ${now} THEN ${resetAt}
        ELSE "RateLimitBucket"."resetAt"
      END,
      "updatedAt" = ${now}
    RETURNING "count", "resetAt";
  `;
  const bucket = rows[0];
  return {allowed: Boolean(bucket && bucket.count <= limit), remaining: bucket ? Math.max(0, limit - bucket.count) : 0, resetAt: bucket?.resetAt ?? resetAt};
}

export async function readJsonBody<T = unknown>(request: Request): Promise<T> {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) throw new RequestGuardError('UNSUPPORTED_MEDIA_TYPE', 415);
  const length = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(length) && length > MAX_JSON_BYTES) throw new RequestGuardError('PAYLOAD_TOO_LARGE', 413);
  const text = await request.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_JSON_BYTES) throw new RequestGuardError('PAYLOAD_TOO_LARGE', 413);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new RequestGuardError('INVALID_JSON', 400);
  }
}

export function publicError(error: unknown, fallback: string) {
  if (error instanceof RequestGuardError) {
    if (error.status === 403) return {status: 403, message: 'Request rejected.'};
    if (error.status === 413) return {status: 413, message: 'Request is too large.'};
    if (error.status === 415) return {status: 415, message: 'Unsupported request format.'};
    if (error.status === 400) return {status: 400, message: 'Invalid request.'};
  }
  return {status: 500, message: fallback};
}

export function isApiRequest(request: NextRequest) {
  return request.nextUrl.pathname.startsWith('/api/');
}

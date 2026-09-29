import {NextResponse} from 'next/server';
import {z} from 'zod';
import {prisma} from '@/lib/database/prisma';
import {createAdminSession} from '@/lib/auth/session';
import {verifyAdminPassword} from '@/lib/auth/password';
import {assertSameOrigin, consumeRateLimit, getClientKey, publicError, readJsonBody} from '@/lib/security/request-guard';

const schema = z.object({email: z.string().trim().email().max(160), password: z.string().min(8).max(200)}).strict();
const GENERIC_ERROR = 'Invalid email or password.';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limit = await consumeRateLimit(getClientKey(request, 'admin-login'), 6, 15 * 60_000);
    if (!limit.allowed) {
      return NextResponse.json({message: 'Too many login attempts. Try again later.'}, {status: 429, headers: {'Retry-After': String(Math.max(1, Math.ceil((limit.resetAt.getTime() - Date.now()) / 1000)))}});
    }

    const parsed = schema.safeParse(await readJsonBody(request));
    if (!parsed.success) return NextResponse.json({message: GENERIC_ERROR}, {status: 401});

    const email = parsed.data.email.toLowerCase();
    const user = await prisma.adminUser.findUnique({where: {email}});
    const dummyHash = '$2b$12$P5JYg9hHh5hGgE3tR6eZWuu7dK2N7KkIY1o0W9KqysfHC4u0CqXnK';
    const valid = await verifyAdminPassword(parsed.data.password, user?.passwordHash ?? dummyHash);
    if (!user?.isActive || !valid) return NextResponse.json({message: GENERIC_ERROR}, {status: 401});

    await prisma.adminUser.update({where: {id: user.id}, data: {lastLoginAt: new Date()}});
    await createAdminSession({id: user.id, email: user.email, role: user.role, sessionVersion: user.sessionVersion});
    return NextResponse.json({ok: true}, {headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    const result = publicError(error, 'Unable to sign in right now.');
    return NextResponse.json({message: result.message}, {status: result.status});
  }
}

import {cookies} from 'next/headers';
import {SignJWT, jwtVerify} from 'jose';
import {redirect} from 'next/navigation';
import {prisma} from '@/lib/database/prisma';

const COOKIE_NAME = 'hj_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;
const ISSUER = 'hurghada-journeys';
const AUDIENCE = 'hurghada-journeys-admin';

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 43) throw new Error('AUTH_SECRET must be a strong random secret of at least 43 characters.');
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(input: {id: string; email: string; role: string; sessionVersion: number}) {
  const token = await new SignJWT({email: input.email, role: input.role, sv: input.sessionVersion})
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setSubject(input.id)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(secretKey());
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_SECONDS,
    priority: 'high',
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    priority: 'high',
  });
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const {payload} = await jwtVerify(token, secretKey(), {
      algorithms: ['HS256'],
      issuer: ISSUER,
      audience: AUDIENCE,
      clockTolerance: 5,
    });
    if (!payload.sub) return null;
    const user = await prisma.adminUser.findUnique({where: {id: payload.sub}, select: {id: true, email: true, role: true, isActive: true, sessionVersion: true}});
    if (!user?.isActive || user.role !== 'admin') return null;
    const tokenVersion = typeof payload.sv === 'number' ? payload.sv : -1;
    if (tokenVersion !== user.sessionVersion) return null;
    return {id: user.id, email: user.email, role: user.role};
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  return session;
}

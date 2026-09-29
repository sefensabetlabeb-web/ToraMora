import {NextResponse} from 'next/server';
import {clearAdminSession} from '@/lib/auth/session';
import {assertSameOrigin, publicError} from '@/lib/security/request-guard';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await clearAdminSession();
    return NextResponse.json({ok: true}, {headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    const result = publicError(error, 'Unable to sign out right now.');
    return NextResponse.json({message: result.message}, {status: result.status});
  }
}

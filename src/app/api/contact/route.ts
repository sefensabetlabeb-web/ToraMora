import {NextResponse} from 'next/server';
import {prisma} from '@/lib/database/prisma';
import {assertSameOrigin, consumeRateLimit, getClientKey, publicError, readJsonBody} from '@/lib/security/request-guard';
import {contactSchema} from '@/lib/validation/enquiries';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limit = await consumeRateLimit(getClientKey(request, 'contact'), 8, 10 * 60_000);
    if (!limit.allowed) {
      return NextResponse.json({ok: false, message: 'Too many requests. Please try again later.'}, {status: 429, headers: {'Retry-After': String(Math.max(1, Math.ceil((limit.resetAt.getTime() - Date.now()) / 1000)))}});
    }

    const parsed = contactSchema.safeParse(await readJsonBody(request));
    if (!parsed.success) {
      return NextResponse.json({ok: false, message: parsed.error.issues[0]?.message ?? 'Please check the form.'}, {status: 400});
    }
    const input = parsed.data;

    if (input.tripSlug) {
      const trip = await prisma.trip.findFirst({where: {slug: input.tripSlug, status: 'published'}, select: {slug: true}});
      if (!trip) return NextResponse.json({ok: false, message: 'This trip is not currently available.'}, {status: 400});
    }

    await prisma.contactMessage.create({
      data: {
        name: input.name,
        email: input.email || null,
        phone: input.phone || null,
        country: input.country || null,
        hotelName: input.hotelName || null,
        roomNumber: input.roomNumber || null,
        tripSlug: input.tripSlug || null,
        message: input.message,
      },
    });

    return NextResponse.json({ok: true, message: 'Message sent successfully.'}, {status: 201, headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    const result = publicError(error, 'Unable to send your message right now.');
    return NextResponse.json({ok: false, message: result.message}, {status: result.status});
  }
}

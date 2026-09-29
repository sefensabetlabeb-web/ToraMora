import {NextResponse} from 'next/server';
import {prisma} from '@/lib/database/prisma';
import {assertSameOrigin, consumeRateLimit, getClientKey, publicError, readJsonBody} from '@/lib/security/request-guard';
import {bookingSchema} from '@/lib/validation/enquiries';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const limit = await consumeRateLimit(getClientKey(request, 'booking'), 6, 10 * 60_000);
    if (!limit.allowed) {
      return NextResponse.json({ok: false, message: 'Too many requests. Please try again later.'}, {status: 429, headers: {'Retry-After': String(Math.max(1, Math.ceil((limit.resetAt.getTime() - Date.now()) / 1000)))}});
    }

    const parsed = bookingSchema.safeParse(await readJsonBody(request));
    if (!parsed.success) {
      return NextResponse.json({ok: false, message: parsed.error.issues[0]?.message ?? 'Please check the booking form.'}, {status: 400});
    }
    const input = parsed.data;

    const trip = await prisma.trip.findFirst({where: {slug: input.tripSlug, status: 'published'}, select: {slug: true}});
    if (!trip) return NextResponse.json({ok: false, message: 'This trip is not available for booking.'}, {status: 400});

    await prisma.bookingRequest.create({
      data: {
        tripSlug: input.tripSlug,
        preferredDate: input.preferredDate,
        adults: input.adults,
        children: input.children,
        hotelName: input.hotelName,
        roomNumber: input.roomNumber || null,
        name: input.name,
        phone: input.phone,
        email: input.email || null,
        country: input.country || null,
        specialRequest: input.specialRequest || null,
      },
    });

    return NextResponse.json({ok: true, message: 'Booking request sent successfully.'}, {status: 201, headers: {'Cache-Control': 'no-store'}});
  } catch (error) {
    const result = publicError(error, 'Unable to send your booking right now.');
    return NextResponse.json({ok: false, message: result.message}, {status: result.status});
  }
}

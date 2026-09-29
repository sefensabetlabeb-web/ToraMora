import {describe, expect, it} from 'vitest';
import {bookingSchema, contactSchema} from '@/lib/validation/enquiries';

describe('contactSchema', () => {
  it('accepts a valid enquiry with email only', () => {
    const result = contactSchema.safeParse({
      name: 'Anna Smith',
      email: 'anna@example.com',
      phone: '',
      country: 'Germany',
      hotelName: 'Sample Hotel',
      roomNumber: '',
      tripSlug: 'orange-bay',
      message: 'I would like to ask about pickup time.',
      website: '',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an enquiry without email or phone', () => {
    const result = contactSchema.safeParse({
      name: 'Anna Smith',
      email: '',
      phone: '',
      message: 'Please send me more information.',
      website: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects the honeypot field when populated', () => {
    const result = contactSchema.safeParse({
      name: 'Bot User',
      email: 'bot@example.com',
      message: 'This should be rejected by the honeypot validation.',
      website: 'spam.example',
    });
    expect(result.success).toBe(false);
  });
});

describe('bookingSchema', () => {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  it('accepts a valid future booking request', () => {
    const result = bookingSchema.safeParse({
      tripSlug: 'luxor',
      preferredDate: tomorrow,
      adults: '2',
      children: '1',
      hotelName: 'Sample Hotel',
      roomNumber: '204',
      name: 'John Traveller',
      phone: '+49123456789',
      email: 'john@example.com',
      country: 'Germany',
      specialRequest: '',
      website: '',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a booking with zero adults', () => {
    const result = bookingSchema.safeParse({
      tripSlug: 'cairo',
      preferredDate: tomorrow,
      adults: '0',
      children: '0',
      hotelName: 'Sample Hotel',
      name: 'John Traveller',
      phone: '+49123456789',
      website: '',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a past booking date', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const result = bookingSchema.safeParse({
      tripSlug: 'cairo',
      preferredDate: yesterday,
      adults: '2',
      children: '0',
      hotelName: 'Sample Hotel',
      name: 'John Traveller',
      phone: '+49123456789',
      website: '',
    });
    expect(result.success).toBe(false);
  });
});

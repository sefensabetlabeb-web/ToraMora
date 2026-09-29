import {z} from 'zod';

const optionalShort = z.string().trim().max(120).optional().or(z.literal(''));
const optionalEmail = z.string().trim().email().max(160).optional().or(z.literal(''));

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: optionalEmail,
  phone: optionalShort,
  country: optionalShort,
  hotelName: optionalShort,
  roomNumber: z.string().trim().max(40).optional().or(z.literal('')),
  tripSlug: z.string().trim().max(100).optional().or(z.literal('')),
  message: z.string().trim().min(8).max(3000),
  website: z.string().max(0).optional().or(z.literal(''))
}).refine((value) => Boolean(value.email || value.phone), {
  message: 'Please provide an email address or phone number.',
  path: ['email']
});

export const bookingSchema = z.object({
  tripSlug: z.string().trim().min(1).max(100),
  preferredDate: z.coerce.date(),
  adults: z.coerce.number().int().min(1).max(30),
  children: z.coerce.number().int().min(0).max(30),
  hotelName: z.string().trim().min(2).max(140),
  roomNumber: z.string().trim().max(40).optional().or(z.literal('')),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(50),
  email: optionalEmail,
  country: optionalShort,
  specialRequest: z.string().trim().max(3000).optional().or(z.literal('')),
  website: z.string().max(0).optional().or(z.literal(''))
}).refine((value) => value.preferredDate >= new Date(new Date().setHours(0, 0, 0, 0)), {
  message: 'Please choose today or a future date.',
  path: ['preferredDate']
});

export type ContactInput = z.infer<typeof contactSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;

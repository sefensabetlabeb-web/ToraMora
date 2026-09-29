'use server';
import {revalidatePath} from 'next/cache';
import {z} from 'zod';
import {prisma} from '@/lib/database/prisma';
import {requireAdmin} from '@/lib/auth/session';
import {locales} from '@/i18n/locales';
import {revalidatePublicSite, revalidatePublicTrip} from '@/features/admin/revalidation';

const localAssetPathSchema = z.string().regex(/^\/(?:brand|images)\/(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9_./-]+$/);
const httpsUrlSchema = z.string().url().refine((value) => value.startsWith('https://'), 'Use an HTTPS URL.');
const tripImageSchema = z.object({src: localAssetPathSchema, alt: z.string().trim().min(2).max(240)}).strict();
const sectionItemSchema = z.object({title: z.string().trim().min(1).max(180), description: z.string().trim().max(1200).optional()}).strict();
const shortTextSchema = z.string().trim().min(1).max(500);

function parseJsonWithSchema<T>(value: FormDataEntryValue | null, label: string, schema: z.ZodType<T>, empty: T): T {
  if (!value || !String(value).trim()) return empty;
  let parsed: unknown;
  try { parsed = JSON.parse(String(value)); } catch { throw new Error(`${label} must be valid JSON.`); }
  const result = schema.safeParse(parsed);
  if (!result.success) throw new Error(`${label} has an invalid structure.`);
  return result.data;
}

const parseGallery = (value: FormDataEntryValue | null) => parseJsonWithSchema(value, 'Gallery', z.array(tripImageSchema).max(40), []);
const parseSections = (value: FormDataEntryValue | null, label: string) => parseJsonWithSchema(value, label, z.array(sectionItemSchema).max(100), []);
const parseTextList = (value: FormDataEntryValue | null, label: string) => parseJsonWithSchema(value, label, z.array(shortTextSchema).max(100), []);

const statusSchema=z.enum(['new','read','replied']);
export async function updateMessageStatus(id:string,status:string){await requireAdmin();const parsed=statusSchema.parse(status);await prisma.contactMessage.update({where:{id},data:{status:parsed}});revalidatePath('/admin/messages')}
export async function deleteMessage(id:string){await requireAdmin();await prisma.contactMessage.delete({where:{id}});revalidatePath('/admin/messages')}
export async function updateBookingStatus(id:string,status:string){await requireAdmin();const parsed=z.enum(['new','confirmed','completed','cancelled']).parse(status);await prisma.bookingRequest.update({where:{id},data:{status:parsed}});revalidatePath('/admin/bookings')}
export async function deleteBooking(id:string){await requireAdmin();await prisma.bookingRequest.delete({where:{id}});revalidatePath('/admin/bookings')}

const tripSchema=z.object({slug:z.string().regex(/^[a-z0-9-]+$/).max(100),category:z.enum(['culture','islands-snorkeling','diving-sea','desert-adventure','family-city','private']),categoryLabel:z.string().min(2).max(100),title:z.string().min(2).max(140),eyebrow:z.string().max(120).optional(),shortDescription:z.string().min(10).max(1200),duration:z.string().min(1).max(80),priceFrom:z.coerce.number().min(0).max(100000),currency:z.enum(['USD','EUR','GBP']),status:z.enum(['draft','published','disabled']),featured:z.boolean(),popular:z.boolean(),sortOrder:z.coerce.number().int().min(0).max(10000),heroImage:localAssetPathSchema.optional(),whatsappMessage:z.string().max(500).optional(),seoTitle:z.string().max(160).optional(),seoDescription:z.string().max(300).optional()});
function tripInput(formData:FormData){return tripSchema.parse({slug:formData.get('slug'),category:formData.get('category'),categoryLabel:formData.get('categoryLabel'),title:formData.get('title'),eyebrow:formData.get('eyebrow')||undefined,shortDescription:formData.get('shortDescription'),duration:formData.get('duration'),priceFrom:formData.get('priceFrom'),currency:formData.get('currency'),status:formData.get('status'),featured:formData.get('featured')==='on',popular:formData.get('popular')==='on',sortOrder:formData.get('sortOrder'),heroImage:formData.get('heroImage')||undefined,whatsappMessage:formData.get('whatsappMessage')||undefined,seoTitle:formData.get('seoTitle')||undefined,seoDescription:formData.get('seoDescription')||undefined});}
export async function updateTrip(id:string,formData:FormData){await requireAdmin();const data=tripInput(formData);const current=await prisma.trip.findUnique({where:{id},select:{slug:true}});await prisma.trip.update({where:{id},data:{...data,eyebrow:data.eyebrow||null,heroImage:data.heroImage||null,gallery:parseGallery(formData.get('gallery')),highlights:parseSections(formData.get('highlights'),'Highlights'),itinerary:parseSections(formData.get('itinerary'),'Itinerary'),included:parseTextList(formData.get('included'),'Included'),excluded:parseTextList(formData.get('excluded'),'Excluded'),whatToBring:parseTextList(formData.get('whatToBring'),'What to bring')}});revalidatePath('/admin/trips');if(current?.slug&&current.slug!==data.slug)revalidatePublicTrip(current.slug);revalidatePublicTrip(data.slug)}
export async function createTrip(formData:FormData){await requireAdmin();const data=tripInput(formData);await prisma.trip.create({data:{...data,eyebrow:data.eyebrow||null,heroImage:data.heroImage||null,gallery:parseGallery(formData.get('gallery')),highlights:parseSections(formData.get('highlights'),'Highlights'),itinerary:parseSections(formData.get('itinerary'),'Itinerary'),included:parseTextList(formData.get('included'),'Included'),excluded:parseTextList(formData.get('excluded'),'Excluded'),whatToBring:parseTextList(formData.get('whatToBring'),'What to bring')}});revalidatePath('/admin/trips');revalidatePublicTrip(data.slug)}
export async function deleteTrip(id:string){await requireAdmin();const trip=await prisma.trip.findUnique({where:{id},select:{slug:true}});await prisma.trip.delete({where:{id}});revalidatePath('/admin/trips');if(trip?.slug)revalidatePublicTrip(trip.slug);else revalidatePublicSite()}

export async function updateSettings(formData:FormData){await requireAdmin();const s=z.object({websiteName:z.string().min(2).max(100),tagline:z.string().min(2).max(120),logoPath:localAssetPathSchema,whatsappNumber:z.string().regex(/^\d{8,15}$/).or(z.literal('')).optional(),email:z.string().email().or(z.literal('')).optional(),phone:z.string().max(40).optional(),currency:z.enum(['USD','EUR','GBP']),defaultLanguage:z.enum(locales),facebook:httpsUrlSchema.or(z.literal('')).optional(),instagram:httpsUrlSchema.or(z.literal('')).optional()}).parse(Object.fromEntries(formData));await prisma.siteSetting.upsert({where:{id:'global'},create:{id:'global',...s,email:s.email||null,facebook:s.facebook||null,instagram:s.instagram||null},update:{...s,email:s.email||null,facebook:s.facebook||null,instagram:s.instagram||null}});revalidatePath('/admin/settings');revalidatePublicSite()}

const translationSchema=z.object({
  locale:z.enum(locales),title:z.string().min(2).max(140),eyebrow:z.string().max(120).optional(),shortDescription:z.string().min(10).max(1200),duration:z.string().max(80).optional(),whatsappMessage:z.string().max(500).optional(),seoTitle:z.string().max(160).optional(),seoDescription:z.string().max(300).optional(),isReviewed:z.boolean()
});
export async function upsertTripTranslation(tripId:string,formData:FormData){
  await requireAdmin();
  const data=translationSchema.parse({locale:formData.get('locale'),title:formData.get('title'),eyebrow:formData.get('eyebrow')||undefined,shortDescription:formData.get('shortDescription'),duration:formData.get('duration')||undefined,whatsappMessage:formData.get('whatsappMessage')||undefined,seoTitle:formData.get('seoTitle')||undefined,seoDescription:formData.get('seoDescription')||undefined,isReviewed:formData.get('isReviewed')==='on'});
  await prisma.tripTranslation.upsert({where:{tripId_locale:{tripId,locale:data.locale}},create:{tripId,...data,eyebrow:data.eyebrow||null,duration:data.duration||null,whatsappMessage:data.whatsappMessage||null,seoTitle:data.seoTitle||null,seoDescription:data.seoDescription||null,highlights:parseSections(formData.get('highlights'),'Highlights'),itinerary:parseSections(formData.get('itinerary'),'Itinerary'),included:parseTextList(formData.get('included'),'Included'),excluded:parseTextList(formData.get('excluded'),'Excluded'),whatToBring:parseTextList(formData.get('whatToBring'),'What to bring')},update:{...data,eyebrow:data.eyebrow||null,duration:data.duration||null,whatsappMessage:data.whatsappMessage||null,seoTitle:data.seoTitle||null,seoDescription:data.seoDescription||null,highlights:parseSections(formData.get('highlights'),'Highlights'),itinerary:parseSections(formData.get('itinerary'),'Itinerary'),included:parseTextList(formData.get('included'),'Included'),excluded:parseTextList(formData.get('excluded'),'Excluded'),whatToBring:parseTextList(formData.get('whatToBring'),'What to bring')}});
  revalidatePath(`/admin/trips/${tripId}/translations`);const trip=await prisma.trip.findUnique({where:{id:tripId},select:{slug:true}});if(trip?.slug)revalidatePublicTrip(trip.slug);
}

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(100),
  country: z.string().trim().max(100).optional(),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().trim().max(160).optional(),
  text: z.string().trim().min(5).max(2000),
  tripSlug: z.string().trim().max(100).optional(),
  status: z.enum(['draft','published']),
  sortOrder: z.coerce.number().int().min(0).max(10000)
});

async function assertReviewTripSlug(tripSlug?: string) {
  if (!tripSlug) return;
  const trip = await prisma.trip.findUnique({where: {slug: tripSlug}, select: {id: true}});
  if (!trip) throw new Error('Trip slug does not match an existing trip.');
}

export async function createReview(formData: FormData) {
  await requireAdmin();
  const data = reviewSchema.parse({
    name: formData.get('name'), country: formData.get('country') || undefined,
    rating: formData.get('rating'), title: formData.get('title') || undefined,
    text: formData.get('text'), tripSlug: formData.get('tripSlug') || undefined,
    status: formData.get('status'), sortOrder: formData.get('sortOrder')
  });
  await assertReviewTripSlug(data.tripSlug);
  await prisma.review.create({data: {...data, country: data.country || null, title: data.title || null, tripSlug: data.tripSlug || null}});
  revalidatePath('/admin/reviews');
  revalidatePublicSite();
  if (data.tripSlug) revalidatePublicTrip(data.tripSlug);
}

export async function updateReview(id: string, formData: FormData) {
  await requireAdmin();
  const data = reviewSchema.parse({
    name: formData.get('name'), country: formData.get('country') || undefined,
    rating: formData.get('rating'), title: formData.get('title') || undefined,
    text: formData.get('text'), tripSlug: formData.get('tripSlug') || undefined,
    status: formData.get('status'), sortOrder: formData.get('sortOrder')
  });
  await assertReviewTripSlug(data.tripSlug);
  const previous = await prisma.review.findUnique({where: {id}, select: {tripSlug: true}});
  await prisma.review.update({where: {id}, data: {...data, country: data.country || null, title: data.title || null, tripSlug: data.tripSlug || null}});
  revalidatePath('/admin/reviews');
  revalidatePublicSite();
  if (previous?.tripSlug) revalidatePublicTrip(previous.tripSlug);
  if (data.tripSlug) revalidatePublicTrip(data.tripSlug);
}

export async function updateReviewStatus(id: string, status: string) {
  await requireAdmin();
  const parsed = z.enum(['draft','published']).parse(status);
  const review = await prisma.review.findUnique({where: {id}, select: {tripSlug: true}});
  await prisma.review.update({where: {id}, data: {status: parsed}});
  revalidatePath('/admin/reviews');
  revalidatePublicSite();
  if (review?.tripSlug) revalidatePublicTrip(review.tripSlug);
}

export async function deleteReview(id: string) {
  await requireAdmin();
  const review = await prisma.review.findUnique({where: {id}, select: {tripSlug: true}});
  await prisma.review.delete({where: {id}});
  revalidatePath('/admin/reviews');
  revalidatePublicSite();
  if (review?.tripSlug) revalidatePublicTrip(review.tripSlug);
}

const mediaSchema = z.object({
  label: z.string().trim().min(2).max(120),
  path: localAssetPathSchema,
  altText: z.string().trim().min(2).max(240)
});
export async function createMediaAsset(formData: FormData) {
  await requireAdmin();
  const data = mediaSchema.parse({label: formData.get('label'), path: formData.get('path'), altText: formData.get('altText')});
  await prisma.mediaAsset.create({data});
  revalidatePath('/admin/media');
}
export async function updateMediaAsset(id: string, formData: FormData) {
  await requireAdmin();
  const data = mediaSchema.parse({label: formData.get('label'), path: formData.get('path'), altText: formData.get('altText')});
  await prisma.mediaAsset.update({where: {id}, data});
  revalidatePath('/admin/media');
}
export async function toggleMediaAsset(id: string, active: boolean) {
  await requireAdmin();
  await prisma.mediaAsset.update({where: {id}, data: {active}});
  revalidatePath('/admin/media');
}
export async function deleteMediaAsset(id: string) {
  await requireAdmin();
  await prisma.mediaAsset.delete({where: {id}});
  revalidatePath('/admin/media');
}

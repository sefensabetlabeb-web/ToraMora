import {notFound} from 'next/navigation';
import Link from 'next/link';
import {prisma} from '@/lib/database/prisma';
import {deleteTrip,updateTrip} from '@/features/admin/actions';
import {TripAdminForm} from '@/components/admin/TripAdminForm';
export default async function EditTrip({params}:{params:Promise<{id:string}>}){const {id}=await params;const trip=await prisma.trip.findUnique({where:{id}});if(!trip)notFound();return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-4xl"><div className="flex flex-wrap items-start justify-between gap-4"><div><Link href="/admin/trips" className="text-sm font-bold text-cyan-700">← Trips</Link><h1 className="mt-3 text-3xl font-black">Edit {trip.title}</h1></div><form action={deleteTrip.bind(null,id)}><button className="rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700">Delete trip</button></form></div><TripAdminForm trip={trip} action={updateTrip.bind(null,id)} submitLabel="Save changes"/></div></main>}

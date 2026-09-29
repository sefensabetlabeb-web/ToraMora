import Link from 'next/link';
import {createTrip} from '@/features/admin/actions';
import {TripAdminForm} from '@/components/admin/TripAdminForm';
import {getPublicSiteSettings} from '@/lib/site-settings';
export default async function NewTrip(){const settings=await getPublicSiteSettings();return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-4xl"><Link href="/admin/trips" className="text-sm font-bold text-cyan-700">← Trips</Link><h1 className="mt-3 text-3xl font-black">Add new trip</h1><p className="mt-2 text-slate-600">Create it as Draft first, then publish when the content is ready.</p><TripAdminForm action={createTrip} submitLabel="Create trip" defaultCurrency={settings.currency as 'USD'|'EUR'|'GBP'}/></div></main>}

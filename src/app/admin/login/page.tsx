import {redirect} from 'next/navigation';
import {AdminLoginForm} from '@/components/admin/AdminLoginForm';
import {getAdminSession} from '@/lib/auth/session';
import {Logo} from '@/components/brand/Logo';

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect('/admin');
  return <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10"><section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"><Logo/><p className="mt-8 text-xs font-black uppercase tracking-[.18em] text-cyan-700">Secure administration</p><h1 className="mt-2 text-3xl font-black text-slate-950">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-slate-600">Manage trips, messages, bookings and website settings.</p><AdminLoginForm/></section></main>;
}

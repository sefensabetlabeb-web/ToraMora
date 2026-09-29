'use client';
import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/auth/login', {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({email:form.get('email'), password:form.get('password')})});
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {setError(body.message ?? 'Unable to sign in.'); setLoading(false); return;}
    router.replace('/admin'); router.refresh();
  }
  return <form onSubmit={submit} className="mt-7 space-y-4">
    <label className="block text-sm font-bold text-slate-700">Email<input name="email" type="email" autoComplete="username" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600"/></label>
    <label className="block text-sm font-bold text-slate-700">Password<input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600"/></label>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
    <button disabled={loading} className="min-h-12 w-full rounded-xl bg-slate-950 px-5 font-black text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}

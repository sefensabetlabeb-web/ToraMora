'use client';
import {useRouter} from 'next/navigation';
export function AdminLogoutButton(){const router=useRouter();return <button onClick={async()=>{await fetch('/api/admin/auth/logout',{method:'POST'});router.replace('/admin/login');router.refresh();}} className="rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">Sign out</button>}

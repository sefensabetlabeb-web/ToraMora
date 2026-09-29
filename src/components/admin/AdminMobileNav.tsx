'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Menu, X} from 'lucide-react';
const links=[['/admin','Dashboard'],['/admin/trips','Trips'],['/admin/messages','Messages'],['/admin/bookings','Bookings'],['/admin/settings','Settings']];
export function AdminMobileNav({websiteName='ToraMora'}:{websiteName?:string}){const [open,setOpen]=useState(false);return <div className="border-b border-slate-200 bg-white lg:hidden"><div className="flex min-h-16 items-center justify-between px-4"><strong>{websiteName} · Admin</strong><button aria-label="Toggle admin menu" onClick={()=>setOpen(v=>!v)} className="rounded-xl border p-2">{open?<X/>:<Menu/>}</button></div>{open&&<nav className="grid gap-1 border-t px-4 py-3">{links.map(([href,label])=><Link onClick={()=>setOpen(false)} key={href} href={href} className="rounded-xl px-3 py-3 text-sm font-bold hover:bg-slate-100">{label}</Link>)}</nav>}</div>}

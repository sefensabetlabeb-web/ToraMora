import {prisma} from '@/lib/database/prisma';
import {deleteMessage, updateMessageStatus} from '@/features/admin/actions';

export default async function Messages({searchParams}: {searchParams: Promise<{q?: string; status?: string}>}) {
  const {q = '', status = ''} = await searchParams;
  const query = q.trim().slice(0, 120);
  const allowedStatus = ['new', 'read', 'replied'].includes(status) ? status : '';
  const rows = await prisma.contactMessage.findMany({
    where: {
      ...(allowedStatus ? {status: allowedStatus} : {}),
      ...(query ? {
        OR: [
          {name: {contains: query, mode: 'insensitive'}},
          {email: {contains: query, mode: 'insensitive'}},
          {phone: {contains: query, mode: 'insensitive'}},
          {country: {contains: query, mode: 'insensitive'}},
          {hotelName: {contains: query, mode: 'insensitive'}},
          {tripSlug: {contains: query, mode: 'insensitive'}},
          {message: {contains: query, mode: 'insensitive'}}
        ]
      } : {})
    },
    orderBy: {createdAt: 'desc'},
    take: 200
  });

  return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h1 className="text-3xl font-black">Messages</h1><p className="mt-2 text-slate-600">Search enquiries, review contact details and update their status.</p></div><form className="flex flex-col gap-2 sm:flex-row" method="get"><input name="q" defaultValue={query} placeholder="Search messages…" className="input min-w-64"/><select name="status" defaultValue={allowedStatus} className="input"><option value="">All statuses</option><option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option></select><button className="min-h-12 rounded-xl bg-slate-950 px-5 text-sm font-black text-white">Search</button></form></div>
    <div className="mt-7 grid gap-4">{rows.length===0&&<Empty text="No messages found."/>}{rows.map(m=><article key={m.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><div className="font-black">{m.name}</div><div className="mt-1 text-sm text-slate-500">{m.email||'No email'}{m.phone?` · ${m.phone}`:''} · {m.tripSlug||'General'}</div><div className="mt-1 text-xs text-slate-400">{m.createdAt.toLocaleString()} {m.country?`· ${m.country}`:''}</div></div><span className="h-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase">{m.status}</span></div>{(m.hotelName||m.roomNumber)&&<div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">Hotel: {m.hotelName||'—'} {m.roomNumber?`· Room ${m.roomNumber}`:''}</div>}<p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{m.message}</p><div className="mt-4 flex flex-wrap gap-2"><form action={updateMessageStatus.bind(null,m.id,'read')}><button className="rounded-lg border px-3 py-2 text-xs font-bold">Mark read</button></form><form action={updateMessageStatus.bind(null,m.id,'replied')}><button className="rounded-lg border px-3 py-2 text-xs font-bold">Mark replied</button></form><form action={deleteMessage.bind(null,m.id)}><button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button></form></div></article>)}</div>
  </div></main>;
}
function Empty({text}:{text:string}){return <div className="rounded-2xl border border-dashed bg-white p-8 text-center text-slate-500">{text}</div>}

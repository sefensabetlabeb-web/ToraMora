import {prisma} from '@/lib/database/prisma';
import {createMediaAsset, deleteMediaAsset, toggleMediaAsset, updateMediaAsset} from '@/features/admin/actions';

export default async function MediaPage() {
  const assets = await prisma.mediaAsset.findMany({orderBy: {createdAt: 'desc'}, take: 300});
  return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-6xl">
    <h1 className="text-3xl font-black">Images</h1>
    <p className="mt-2 max-w-3xl text-slate-600">Register the production image paths used by trips. Files live under <code>public/images</code> or <code>public/brand</code>; the library keeps names and accessible alt text editable without hard-coding them into the dashboard.</p>
    <form action={createMediaAsset} className="mt-7 grid gap-4 rounded-3xl border bg-white p-5 sm:grid-cols-2 sm:p-7">
      <Field label="Label"><input name="label" required placeholder="Orange Bay hero" className="input"/></Field>
      <Field label="Image path"><input name="path" required placeholder="/images/trips/orange-bay.webp" className="input"/></Field>
      <div className="sm:col-span-2"><Field label="Alt text"><input name="altText" required placeholder="Orange Bay beach and turquoise Red Sea water" className="input"/></Field></div>
      <button className="min-h-12 w-fit rounded-xl bg-slate-950 px-5 text-sm font-black text-white">Add image reference</button>
    </form>
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{assets.length===0?<div className="sm:col-span-2 xl:col-span-3 rounded-2xl border border-dashed bg-white p-8 text-center text-slate-500">No image references added yet. The bundled trip assets continue to work normally.</div>:assets.map(asset=><article key={asset.id} className="rounded-2xl border bg-white p-5"><div className="flex items-start justify-between gap-3"><div><div className="font-black">{asset.label}</div><code className="mt-1 block break-all text-xs text-slate-500">{asset.path}</code></div><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${asset.active?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-500'}`}>{asset.active?'Active':'Hidden'}</span></div><p className="mt-4 text-sm leading-6 text-slate-600">Alt: {asset.altText}</p><details className="mt-4 rounded-xl border bg-slate-50 p-3"><summary className="cursor-pointer text-xs font-black">Edit reference</summary><form action={updateMediaAsset.bind(null,asset.id)} className="mt-3 grid gap-3"><Field label="Label"><input name="label" defaultValue={asset.label} required className="input"/></Field><Field label="Image path"><input name="path" defaultValue={asset.path} required className="input"/></Field><Field label="Alt text"><input name="altText" defaultValue={asset.altText} required className="input"/></Field><button className="w-fit rounded-lg bg-slate-950 px-3 py-2 text-xs font-black text-white">Save changes</button></form></details><div className="mt-4 flex gap-2"><form action={toggleMediaAsset.bind(null,asset.id,!asset.active)}><button className="rounded-lg border px-3 py-2 text-xs font-bold">{asset.active?'Hide':'Activate'}</button></form><form action={deleteMediaAsset.bind(null,asset.id)}><button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700">Delete</button></form></div></article>)}</div>
  </div></main>;
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="grid gap-2 text-sm font-bold text-slate-700">{label}{children}</label>}

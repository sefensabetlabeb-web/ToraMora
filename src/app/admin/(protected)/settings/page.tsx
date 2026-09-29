import {prisma} from '@/lib/database/prisma';
import {updateSettings} from '@/features/admin/actions';
import {localeNames, locales} from '@/i18n/locales';

export default async function SettingsPage(){
  const s=await prisma.siteSetting.findUnique({where:{id:'global'}});
  return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-3xl"><h1 className="text-3xl font-black">Website Settings</h1><p className="mt-2 text-slate-600">Change the main business details without editing code.</p><form action={updateSettings} className="mt-7 grid gap-5 rounded-3xl border bg-white p-5 sm:p-7">
    <Field label="Website name"><input name="websiteName" defaultValue={s?.websiteName??'ToraMora'} className="input"/></Field>
    <Field label="Tagline"><input name="tagline" defaultValue={s?.tagline??'Egypt starts here.'} className="input"/></Field>
    <Field label="Logo path"><input name="logoPath" defaultValue={s?.logoPath??'/brand/toramora-logo.png'} placeholder="/brand/toramora-logo.png" className="input"/></Field>
    <Field label="WhatsApp number"><input name="whatsappNumber" inputMode="tel" defaultValue={s?.whatsappNumber??''} placeholder="201001234567" className="input"/></Field>
    <Field label="Email"><input name="email" type="email" defaultValue={s?.email??''} className="input"/></Field>
    <Field label="Phone"><input name="phone" inputMode="tel" defaultValue={s?.phone??''} className="input"/></Field>
    <Field label="Default currency for new trips"><select name="currency" defaultValue={s?.currency??'USD'} className="input"><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option></select></Field>
    <Field label="Fallback language for missing translations"><select name="defaultLanguage" defaultValue={s?.defaultLanguage??'en'} className="input">{locales.map(code=><option key={code} value={code}>{localeNames[code]} ({code})</option>)}</select><span className="font-normal text-slate-500">English remains the canonical base language. This setting controls the fallback used only when a translation is missing.</span></Field>
    <Field label="Facebook URL"><input name="facebook" type="url" defaultValue={s?.facebook??''} className="input"/></Field>
    <Field label="Instagram URL"><input name="instagram" type="url" defaultValue={s?.instagram??''} className="input"/></Field>
    <button className="min-h-12 rounded-xl bg-slate-950 px-5 font-black text-white">Save settings</button>
  </form></div></main>;
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <label className="grid gap-2 text-sm font-bold text-slate-700">{label}{children}</label>}

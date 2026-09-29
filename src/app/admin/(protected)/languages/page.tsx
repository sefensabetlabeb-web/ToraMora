import {AlertTriangle, CheckCircle2, Languages} from 'lucide-react';
import {localeNames, locales} from '@/i18n/locales';
import {getInterfaceTranslationCoverage} from '@/i18n/coverage';

export default async function LanguagesPage(){
  const coverage=await Promise.all(locales.map(async code=>({code,coverage:await getInterfaceTranslationCoverage(code)})));
  const complete=coverage.filter(item=>item.coverage.missing===0).length;
  return <main className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-7xl">
    <div className="flex items-start gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-700"><Languages size={21}/></div><div><h1 className="text-3xl font-black">Languages</h1><p className="mt-2 text-slate-600">{locales.length} locales are enabled. {complete} currently have complete explicit interface coverage; incomplete locales safely use the configured fallback language.</p></div></div>
    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong>Translation workflow:</strong> open Trips → Translations to edit trip content. Interface coverage below is measured separately from trip translations.</div>
    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{coverage.map(({code,coverage})=><div key={code} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-center justify-between gap-3"><div><div className="font-black">{localeNames[code]}</div><div className="mt-1 text-xs uppercase text-slate-400">{code}</div></div>{coverage.missing===0?<CheckCircle2 size={19} className="text-emerald-500"/>:<AlertTriangle size={19} className="text-amber-500"/>}</div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900" style={{width:`${coverage.percent}%`}}/></div><div className="mt-2 text-xs font-semibold text-slate-500">{coverage.explicit}/{coverage.total} explicit · {coverage.percent}%</div></div>)}</div>
  </div></main>;
}

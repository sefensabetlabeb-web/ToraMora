import type {ReactNode} from 'react';
import {AdminSidebar} from '@/components/admin/AdminSidebar';
import {AdminMobileNav} from '@/components/admin/AdminMobileNav';
export function AdminShell({children,websiteName}:{children:ReactNode;websiteName?:string}){return <div className="min-h-screen bg-slate-50 lg:flex"><AdminSidebar websiteName={websiteName}/><div className="min-w-0 flex-1"><AdminMobileNav websiteName={websiteName}/>{children}</div></div>}

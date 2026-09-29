import type {ReactNode} from 'react';
import {AdminShell} from '@/components/admin/AdminShell';
import {requireAdmin} from '@/lib/auth/session';
import {getPublicSiteSettings} from '@/lib/site-settings';
export default async function AdminProtectedLayout({children}:{children:ReactNode}){await requireAdmin();const settings=await getPublicSiteSettings();return <AdminShell websiteName={settings.websiteName}>{children}</AdminShell>}

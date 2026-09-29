import type {MetadataRoute} from 'next';
import {siteConfig} from '@/config/site';
import {getPublicSiteSettings} from '@/lib/site-settings';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getPublicSiteSettings();
  return {
    name: settings.websiteName || siteConfig.name,
    short_name: (settings.websiteName || siteConfig.name).slice(0, 24),
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b7080',
    icons: [{src: '/brand/toramora-logo.png', sizes: 'any', type: 'image/png'}]
  };
}

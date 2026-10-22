import {redirect} from 'next/navigation';

export default async function BookPage({
  params, searchParams
}: {
  params: Promise<{locale:string}>;
  searchParams: Promise<{trip?:string}>;
}) {
  const [{locale},{trip}] = await Promise.all([params,searchParams]);
  const query = trip ? '?trip=' + encodeURIComponent(trip) : '';
  redirect('/' + locale + '/contact' + query);
}

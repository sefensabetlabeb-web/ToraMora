# SEO architecture

Stage 10 adds dynamic SEO primitives without adding analytics or advertising trackers.

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before production, for example `https://example.com`.

Optionally set `GOOGLE_SITE_VERIFICATION` to the token supplied by Google Search Console. Do not paste the full HTML meta tag.

## Generated endpoints

- `/sitemap.xml` — localized static pages and all published trip URLs.
- `/robots.txt` — indexes public pages and blocks `/admin/` and `/api/`.
- `/manifest.webmanifest` — basic install metadata.

## Metadata

Trip pages generate localized canonical URLs, hreflang alternates, Open Graph and Twitter metadata. The site also emits JSON-LD for `TravelAgency`, while trip pages emit `TouristTrip` with an `Offer` and ordered itinerary.

## Production checklist

1. Replace `NEXT_PUBLIC_SITE_URL` with the real domain.
2. Add a real social-sharing image (1200×630 recommended) before launch.
3. Add the Search Console verification token only when the property exists.
4. Submit `/sitemap.xml` to Search Console after deployment.
5. Validate rendered JSON-LD in a structured-data validator before launch.

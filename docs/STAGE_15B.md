# Stage 15B — Admin & Settings Integrity

This stage verifies that admin-managed values are wired into the public experience instead of being stored without effect.

## Completed

- Central public revalidation across all 39 locales for trip, translation, settings and review changes.
- Trip slug changes invalidate both the previous and new public routes.
- Website name, tagline and logo path are editable from Website Settings.
- Website name/tagline/logo are consumed by public header/footer and metadata where appropriate.
- WhatsApp, email and phone are sourced from Website Settings with safe configuration fallback.
- Contact page now exposes configured WhatsApp, phone and email actions.
- Website name is reflected in the responsive admin shell.
- Default currency setting now clearly acts as the default for newly created trips; existing trip prices keep their explicit currency to avoid silently relabelling amounts without FX conversion.
- Genuine published reviews now render publicly on the home page and on matching trip pages.
- Reviews are editable, publishable/draftable and deletable in Admin; optional trip slugs are validated.
- Media references can be edited as well as enabled/disabled/deleted.

## Deferred deliberately to Stage 15C

`defaultLanguage` affects locale routing, canonical URLs and hreflang policy. It is therefore audited with Languages & SEO rather than receiving a partial runtime implementation here.

## Data integrity rule

Changing an existing trip's slug invalidates both old and new locale routes. Media library entries are references; a trip's hero/gallery paths remain explicitly controlled from the trip editor so changing a library label cannot unexpectedly rewrite published trip content.

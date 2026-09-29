# Stage 15C-1A — Languages & SEO integrity

This audit slice focuses on multilingual SEO and truthful translation coverage reporting.

## Completed
- Locale document language is bound to the active route locale (`<html lang={locale}>`).
- Home, Trips, Contact, Booking, Privacy, and Terms pages emit localized metadata and locale-specific canonical/hreflang alternates.
- `x-default` remains English because English is the canonical base language of the site.
- Website Settings `defaultLanguage` is used as the content fallback language for missing interface translations. It does not mutate canonical routing at runtime.
- English remains the final safety fallback.
- General WhatsApp messages from Contact and Footer use the current interface language rather than hard-coded English copy.
- Footer marketing copy uses translated content.
- Review UI translations were completed for the 27 non-English locales that were already near-complete.
- Admin → Languages displays measured interface translation coverage instead of marking every locale complete.

## Translation audit status
- 39 enabled locales total.
- 28 locales currently have 146/146 explicit interface keys (English + 27 translations).
- 11 locales currently have 44/146 explicit interface keys and safely use fallback for 102 keys each:
  - Belarusian (be)
  - Catalan (ca)
  - Welsh (cy)
  - Estonian (et)
  - Basque (eu)
  - Irish (ga)
  - Luxembourgish (lb)
  - Lithuanian (lt)
  - Latvian (lv)
  - Maltese (mt)
  - Ukrainian (uk)

These 11 locales are intentionally left for Stage 15C-1B so they can be completed explicitly rather than falsely marked complete.

## Next
Stage 15C-1B completes the remaining 11 interface dictionaries, then Stage 15C-2 adds multilingual trip search.

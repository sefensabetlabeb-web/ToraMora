# Stage 15C-2 — Multilingual Trip Search

Implemented a lightweight client-side trip search that searches already-localized trip data in the current locale.

## Search coverage
Search includes:
- Trip title
- Short description
- Duration
- Localized category label
- Highlights
- Itinerary titles/descriptions
- Included / excluded items
- What to bring

## UX
- Search field on `/trips`
- Search shortcut in desktop header and mobile menu
- Local filtering without network requests per keystroke
- `useDeferredValue` keeps typing responsive
- Clear-search control
- Live result count
- Localized empty state
- Keyboard-accessible input and controls

## International text handling
Search normalizes case and diacritics using the active locale. Explicit checks were added for German umlauts, Turkish dotted I and Cyrillic text.

## Localization
Five search UI strings were added to every enabled locale.
Translation audit result: 39 locale files, 151/151 explicit keys, 0 fallback keys.

## Testing
`tests/unit/trip-search.test.ts` adds focused tests for multilingual normalization and matching. Full Vitest/Playwright execution remains part of Stage 15E because node_modules are not available in the current build container.

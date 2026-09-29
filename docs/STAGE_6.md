# Stage 6 — Expanded Hurghada Catalogue + Admin UX Foundation

This stage incorporates the expanded business scope before database/admin CRUD work.

## Added
- 24 editable trip definitions across six simple categories.
- Sample USD prices for development/testing only.
- Orange Bay, Hula Hula, diving, Dolphin House, safari and other common Hurghada excursions.
- A cleaner `/trips` catalogue grouped by category so customers are not overwhelmed.
- Homepage limited to featured trips with one clear “View all trips” action.
- Reusable admin left-sidebar foundation with only the primary workflows.
- Prisma Trip model expanded so trip content can later be edited from Admin.
- Local lightweight SVG placeholders for every trip; these will later be replaced through Media management.

## Important
Sample prices are not presented as verified market prices. They exist only to exercise the UI and data model.
The Admin sidebar components are prepared but intentionally not exposed through an `/admin` route until authentication is implemented.

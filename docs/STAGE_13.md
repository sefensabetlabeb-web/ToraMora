# Stage 13 — Automated Tests

The goal is regression protection without coupling tests to production data.

## Unit coverage

- Contact enquiry validation and anti-bot honeypot.
- Booking date and party-size validation.
- 24-trip catalogue integrity and unique public slugs.
- Published/featured trip service behavior.
- 39-locale message-file integrity.
- Admin password minimum policy, bcrypt hashing and verification.

## Browser coverage

- Homepage primary calls to action.
- Mobile hamburger navigation and no horizontal overflow on a Pixel 7 viewport.
- Locale switch from English to German while staying on the same trip route.
- Contact form required fields.
- Booking form trip preselection from `?trip=`.
- Dynamic Orange Bay trip detail rendering.
- Anonymous `/admin` redirect to `/admin/login`.

## Deliberately deferred

Real POST requests that write bookings/messages are not run against a shared database. Stage 15 will provision an isolated test database before exercising database-writing API flows.

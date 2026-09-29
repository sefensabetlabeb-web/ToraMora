# Automated testing

Stage 13 adds two layers of automated tests.

## Unit tests — Vitest

Covers server-side validation, trip catalogue integrity, i18n structure and admin password hashing/policy.

```cmd
npm run test:unit
```

Interactive development mode:

```cmd
npm run test:watch
```

## Browser tests — Playwright

Covers the homepage journey, mobile navigation, locale switching, trip loading, contact/booking form structure and the unauthenticated admin redirect.

Install the Chromium browser once after installing dependencies:

```cmd
npx playwright install chromium
```

Run browser tests:

```cmd
npm run test:e2e
```

Run every automated test:

```cmd
npm run test:all
```

The Playwright suite deliberately does not create real bookings or messages. Database-writing API integration tests will use an isolated test database during the final audit so production/development records are never polluted by tests.

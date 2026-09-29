# Stage 8 — Secure Admin Dashboard

Implemented:
- Database-backed AdminUser accounts with bcrypt password hashing.
- Signed httpOnly SameSite=Strict admin sessions.
- Rate-limited login endpoint and origin validation.
- Protected `/admin` route group with responsive sidebar/mobile navigation.
- Dashboard counts and quick actions.
- Trip list and trip editing (price, status, visibility, messaging, SEO).
- Contact message status/delete controls.
- Booking status/delete controls.
- Website settings editor.
- Reserved management pages for media, reviews, and languages.

Admin creation uses environment variables and the `admin:create` script so credentials never need to be committed to source control.

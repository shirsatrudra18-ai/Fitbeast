# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Key commands

This is a Next.js App Router project managed with `npm`.

- Start dev server (Turbopack):
  - `npm run dev`
- Production build:
  - `npm run build`
- Start production server (after build):
  - `npm start`
- Lint all files (Next + TypeScript config):
  - `npm run lint`

There is no dedicated test setup in this repo (no Jest/Playwright/Vitest configs). If you add a test framework, document any project-specific commands here.

### Database utilities

The app uses a local SQLite database via `sql.js`, stored in `data/fitbeast.sqlite`.

- Initialize a fresh database (creates `data/fitbeast.sqlite` with base schema):
  - `node scripts/init-db.mjs`
- Apply schema migrations to an existing database:
  - `node scripts/migrate-db.mjs`

The runtime backend API also bootstraps and migrates the DB on access via `src/lib/sql.ts` if the file exists.

## High-level architecture

### Overall structure

- Next.js App Router under `src/app` provides both pages and API routes.
- Shared UI and state live under `src/components` and `src/context`.
- Backend-style logic (auth, database access) is in `src/lib` and is reused across API routes.
- A local `WorkoutVideos/` folder and `data/fitbeast.sqlite` DB act as content sources.

### Layout and client providers

- `src/app/layout.tsx` defines the root layout, global fonts, and wraps the app with:
  - `AuthProvider` from `src/context/AuthContext.tsx` (client-side auth state, `/api/auth/login` introspection, logout).
  - `CartProvider` from `src/context/CartContext.tsx` (client-side cart state synchronized to `/api/cart`).
  - `Header` from `src/components/Header.tsx` (navigation, cart badge, login/logout controls).
- All page components rendered under this layout can assume that `useAuth()` and `useCart()` are available.

### Auth and session model

- `src/lib/auth.ts` implements a custom HMAC-signed session token stored in an HTTP-only cookie named `fb_token`:
  - `sign` / `verify` encode a JSON payload as `base64url` + HMAC-SHA256 signature.
  - `getAuthUser` is the central helper for reading the current user from `cookies()` and verifying the token.
  - `AUTH_SECRET` is read from `process.env.AUTH_SECRET`, with a hard-coded dev fallback; set this env var in any non-local environment.
- API routes use `getAuthUser` for authorization instead of re-parsing cookies directly.

### Database layer (SQLite via sql.js)

- `src/lib/sql.ts` is the single entry point for database access:
  - `getDb()` lazily initializes a `sql.js` `Database` instance, stored in memory.
  - `bootstrap` executes the schema (users, bookings, carts, cart_items, program_progress, subscriptions, contacts).
  - `persist(db)` exports the in-memory DB back to `data/fitbeast.sqlite`.
  - `dbPath()` returns the absolute path for tooling/inspection.
- DB lifecycle:
  - On first access, if `data/fitbeast.sqlite` does not exist, a new DB is created, `bootstrap` is run, and the file is written.
  - On subsequent accesses, the existing file is loaded, `bootstrap` is re-run (idempotently ensures latest tables), and persisted again.

### Core API surface

All APIs are implemented as App Router route handlers under `src/app/api`:

- Auth:
  - `src/app/api/auth/signup/route.ts` – Creates a new user with `bcrypt` password hashing, sets auth cookie, persists DB.
  - `src/app/api/auth/login/route.ts` –
    - `POST` verifies credentials, sets auth cookie.
    - `GET` returns `{ user }` based on current cookie.
    - `DELETE` clears auth cookie.
- Bookings:
  - `src/app/api/bookings/route.ts` – Authenticated `POST` to create class bookings tied to a user.
- Cart:
  - `src/app/api/cart/route.ts` – Authenticated cart backed by `carts` and `cart_items` tables:
    - `GET` reads a user’s cart and denormalizes to product + qty objects.
    - `PUT` upserts the cart and replaces items from the client-provided payload.
    - `DELETE` clears items for the current user.
- Progress tracking:
  - `src/app/api/progress/route.ts` – Per-user, per-program-level day completion:
    - `GET` returns a fixed-length boolean array of days for a given `level`.
    - `POST` upserts completion state with an `ON CONFLICT` clause.
- Subscriptions:
  - `src/app/api/subscription/route.ts` – Authenticated `POST` that records a subscription `plan` for a user.
- Contacts:
  - `src/app/api/contact/route.ts` – Accepts contact/lead form submissions, optionally associating them with the current user.
- Workout videos:
  - `src/app/api/workouts/[muscle]/route.ts` – Maps a `muscle` slug to one or more folders under `WorkoutVideos/`, applies a synonym/combination mapping, and returns a de-duplicated list of video URLs.
  - `src/app/WorkoutVideos/[...path]/route.ts` – Streams video files from the `WorkoutVideos/` directory with basic path sanitization and content-type selection.

API routes are designed to be side-effecting and call `persist(db)` when they change the database.

### Client state and UI integration

- `src/context/AuthContext.tsx`:
  - On mount, calls `GET /api/auth/login` to populate `user` and `loading` state.
  - Exposes `refresh()` to re-fetch the current session and `logout()` to call `DELETE /api/auth/login`.
- `src/context/CartContext.tsx`:
  - Depends on `useAuth()` – only manages a server-backed cart for authenticated users.
  - On user change, calls `GET /api/cart` to hydrate the cart.
  - On cart state changes, sends `PUT /api/cart` to persist items.
  - Provides `add`, `remove`, `inc`, `dec`, `clear`, and derived `count`/`subtotal`.
- `src/components/Header.tsx`:
  - Uses `useCart()` to show the live cart count badge.
  - Uses `useAuth()` to conditionally render login vs. user greeting and logout button.

Page components under `src/app` (home, classes, pricing, programs, cart, checkout, etc.) consume these contexts and APIs to implement the gym experience; they follow standard Next.js App Router page patterns and can be discovered by exploring `src/app/*/page.tsx`.

## Tooling configuration summary

- ESLint is configured via `eslint.config.mjs` using `next/core-web-vitals` and `next/typescript`, with `.next`, `node_modules`, `out`, and `build` ignored.
- `next.config.ts` enables image optimization for external domains used in marketing imagery and disables ESLint during `next build`.
- TypeScript is configured in `tsconfig.json` with a `@/*` path alias to `./src/*` and the Next.js TS plugin.

## Notes for future Warp agents

- When modifying auth or DB behavior, prefer updating `src/lib/auth.ts` and `src/lib/sql.ts` instead of duplicating logic in multiple route handlers.
- When adding new server endpoints, implement them under `src/app/api/...` and reuse `getAuthUser` and `getDb`/`persist` where appropriate.
- When adding UI that depends on auth or cart state, use `useAuth()` and `useCart()` instead of separate fetches so updates stay consistent across the app.

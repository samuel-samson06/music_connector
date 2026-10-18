# PROJECT.md — Architecture & Technical Source of Truth

> **Status:** Draft v0.1 (pre-build).
> **Rule for agents:** Anything marked **[TBD]** is an open decision owned by the project owner. Do not resolve a TBD on your own. Ask.
> Status labels used below: **Decided** (locked), **Proposed** (recommended, awaiting confirmation), **[TBD]** (open).

---

## 1. Product summary

A niche music web app (working title: **[TBD — name and domain postponed]**). People post about songs they love in a social feed, and once a week they can mark one post as their **Song of the Week**, which earns a profile badge and a streak. Users can post as often as they like.

Hobby project, built to stay on free plans for as long as possible.

---

## 2. Scope

### In scope for v1 (MVP)
- Auth: email + Google
- Profile: avatar, username, bio, public profile page
- Favorites: up to 5 artists and 10 songs, editable and removable
- Song/artist search (Deezer primary, iTunes fallback)
- Feed: unlimited posts (text, optional song, optional uploaded image), likes, flat comments
- Song of the Week flag (one per user per week), badge, streak (different song each week)
- "Trending on the app" (most-liked posts in the last 7 days, computed from our own data)
- Weekly reminder email (blocked until a domain exists)
- Report button, admin delete, delete account
- Public profile and post pages with share/preview cards

### Deferred (DO NOT BUILD without explicit approval)
- Direct messaging
- Location-based artist suggestions
- Worldwide / country trending charts
- "Currently listening" status
- Follow graph, groups, in-app notifications, push notifications
- Recommendations
- Any Spotify integration (Spotify's API access limits make a public launch infeasible)
- Native mobile app

---

## 3. Tech stack

| Layer | Choice | Why | Status |
|---|---|---|---|
| Framework | Next.js (App Router) + React + TypeScript (strict) | Owner's existing stack; route handlers hold secrets | Decided |
| Styling/UI | Tailwind CSS + shadcn/ui | Fast, accessible components | Proposed |
| Database + Auth | Supabase (Postgres, Auth, Row Level Security) | Owner's existing stack; free tier | Decided |
| Validation | zod | Validate every input at the boundary | Proposed |
| User images | Cloudinary (signed direct uploads) | Avoids Supabase Storage caps; user uploads only | Decided |
| Song cover art | Links from Deezer/iTunes, stored as text | Not user content; no storage cost | Decided |
| Catalogue data | Deezer (primary), iTunes Search (fallback) | Keyless; covers, previews, search | Decided |
| Email | SendByte, behind one mailer module | Nigerian provider; local-currency billing | Decided (API vs SMTP, daily cap: **[TBD]**) |
| Hosting | Vercel Hobby | Free; **non-commercial use only** | Proposed |
| Scheduled jobs | Vercel Cron (once per day on Hobby) | Daily reminder job + keep-alive | Proposed |
| Testing | Vitest (unit) + Playwright (e2e) | Common, maintained | Proposed |
| Lint/format | ESLint + Prettier + TS strict | Consistency | Proposed |
| Package manager | **[TBD]** npm or pnpm | Owner to choose | **[TBD]** |
| Local database | Hosted Supabase dev project + Supabase CLI migrations (avoid local Docker on limited hardware) | Owner's machine is resource-constrained | Proposed — **[TBD] confirm** |

**Version policy:** Do not hard-code version numbers from memory. Check the current stable version of each package at install time, record it in the lockfile, and note any major-version differences from documentation you rely on.

---

## 4. Dependency policy (stable, secure, maintained)

Every new dependency needs owner approval and must pass these checks first. Report the results in the approval request.

1. **Maintained:** recent release and commits (roughly the last 12 months) and issues are being answered.
2. **Secure:** no open critical/high advisories (`npm audit` or equivalent); check the repository's security policy.
3. **Established:** reasonable adoption; avoid brand-new or single-maintainer packages for security-sensitive work.
4. **License:** permissive (MIT, Apache-2.0, BSD, ISC) unless approved otherwise.
5. **Typed:** ships TypeScript types.
6. **Light:** small footprint; no unexpected install scripts; few transitive dependencies.
7. **Not redundant:** prefer built-in platform/Next.js/Supabase features over a new package.

Lockfile is always committed. No unpinned `latest` in manifests for security-critical packages.

### Initial candidates (NOT yet health-checked — verify before installing)
| Package | Purpose |
|---|---|
| `next`, `react`, `react-dom`, `typescript` | Core framework |
| `@supabase/supabase-js`, `@supabase/ssr` | Supabase client and server-side auth helpers (follow Supabase's current Next.js guide) |
| `zod` | Input validation |
| `tailwindcss`, shadcn/ui components | Styling/UI |
| `cloudinary` | Server-side signing and asset deletion |
| `browser-image-compression` (candidate) | Client-side image shrinking before upload — verify health, or implement with the Canvas API |
| `vitest`, `@playwright/test` | Testing |
| `eslint`, `prettier` | Lint/format |
| SendByte SDK **[TBD]** | Confirm in SendByte's docs whether an official Node SDK exists; do not guess the package name |

### Approved dependency log
| Date | Package | Version | Reason | Approved by |
|---|---|---|---|---|
| — | — | — | — | — |

---

## 5. Architecture

### 5.1 Components
- **Browser:** Next.js app (React + TypeScript).
- **Server (Vercel):** Next.js route handlers/server actions for anything needing secrets.
- **Supabase:** Postgres with RLS on every table; Auth (Google + email). Supabase Storage is **not used**.
- **External:** Deezer, iTunes, Cloudinary, SendByte.

Simple reads/writes go browser → Supabase directly, protected by RLS. Server routes exist only where a secret or privileged action is required.

### 5.2 Server routes (planned)
| Route | Purpose | Auth |
|---|---|---|
| `GET /api/search` | Catalogue proxy: cache → Deezer → iTunes; normalizes results | Signed-in user, rate limited |
| `POST /api/upload/sign` | Returns a Cloudinary upload signature with enforced folder/size/type | Signed-in user, rate limited |
| `GET /api/cron/reminders` | Daily reminder job + keep-alive | `CRON_SECRET` only |
| `DELETE /api/account` | Deletes Cloudinary assets, DB rows, then the auth user | Signed-in user (re-confirm) |

### 5.3 Main flows
1. **Search and pick a song:** browser → `/api/search` → cache → Deezer → iTunes fallback. On pick, upsert a row in `songs`/`artists` (title, artist, cover link, track id). Preview links are re-fetched by track id at play time because they can expire.
2. **Post:** if there is an image, the browser compresses it and uploads **directly to Cloudinary** using a server-issued signature (image bytes never pass through Vercel). The post row (text, optional song, optional image public id, optional weekly-pick flag) is then inserted via Supabase under RLS.
3. **Feed:** cursor-paginated by `created_at`. Likes/comments are plain tables. Trending = most-liked posts in the last 7 days.
4. **Song of the Week:** at most one flagged post per user per week (partial unique index). Streak is computed from weekly picks (consecutive weeks, different song each week). v1 uses **UTC weeks** (known simplification).
5. **Reminder emails:** daily cron selects users whose reminder weekday is today, with email opt-in, and no weekly pick yet; sends via the mailer module; records in `email_log` with a unique key so a double run cannot double-send. The same job pings the database as a keep-alive.
6. **Delete account:** delete Cloudinary assets (avatar, post images) → delete DB rows (cascade) → delete auth user, using the service-role key server-side only.

### 5.4 Image rules
- Only user-uploaded images go to Cloudinary (avatars, post pictures). **Song covers are never uploaded.**
- One image per post in v1. Avatars ~256 px. Post images resized client-side to ~1080 px wide, ~300 KB max.
- Signed uploads only; allowed types jpeg/png/webp; enforced max size; fixed folder per purpose.
- Deliver with one fixed transformation to avoid generating many derived versions.
- Free Cloudinary has no automatic moderation: rely on report button + manual delete.
- Env flag `FEATURE_IMAGE_UPLOADS` can switch uploads off.

### 5.5 Responsive layout (mobile-first, X-style on large screens)

The product is a web application with an app-style interface. **Base styles target a phone (390px). Larger screens are added with `min-width` breakpoints.** One codebase, one set of components; only the page shell changes. Reference pattern for large screens: X (formerly Twitter): a left navigation rail, a fixed-width center feed, and a right column.

**Breakpoints (Tailwind defaults; do not add new ones without approval)**

| Width | Navigation | Columns | Notes |
|---|---|---|---|
| < 768 (phone) | Bottom tab bar (Feed, Search, Post, Profile) + sticky top bar | 1 column, full width | Composer is a full-screen sheet; pickers are bottom sheets |
| 768-1023 (`md`) | Left rail, **icons only** (72px), replaces the bottom bar | Rail + center column (max 600px, centered) | Composer and pickers become centered dialogs (max 600px) |
| 1024-1279 (`lg`) | Left rail, icons only | Rail + center (600px) + **right rail (320px)** | Right rail is sticky |
| >= 1280 (`xl`) | Left rail with **icons + labels** (240px) and a full-width lilac Post button | Rail + center (600px) + right rail (320px), centered as a group | Center column never stretches wider than 600px, even on 1536+ screens |

**App shell (single layout component used by every signed-in page)**
- `BottomNav`: visible below `md` only. Respects the device's bottom safe area. 64px high.
- `LeftRail`: hidden below `md`; icon-only from `md`; labels from `xl`.
- `Main column`: `max-w-[600px]`, centered, with 1px divider lines on both sides from `md` up.
- `RightRail`: hidden below `lg`. Contents: compact Song of the Week prompt, "Trending this week" (5 Song Cards with rank numbers), muted footer links (Privacy, Terms).

**How each screen adapts**
- **Feed, Profile, Post detail, Search, Settings:** same page content in the center column at every size; the shell (nav and rails) changes around it. Post detail and Profile keep the rails visible on large screens.
- **Composer and song picker:** full-screen sheet / bottom sheet below `md`; centered dialog (max 600px) with a dimmed overlay from `md` up.
- **Sign up / Log in:** full-screen below `lg`; from `lg`, two columns (left: headline and a sample post preview; right: form card, max 400px). No app shell on these pages.
- **Onboarding:** full-screen below `md`; centered container (max 480px) from `md`.
- **Dialogs (report, delete account):** bottom sheet below `md`, centered dialog from `md`.

**Rules**
- No horizontal scrolling at any width from 320px to 1920px.
- No hover-only interactions; every action works by tap. Tap targets are at least 44px.
- Post body text 15px on phones, 16px from `lg`. Images scale with `max-w-full`; photo posts use a 16:9 crop.
- Use the same Song Card component at every size; do not create a desktop-only variant.
- Do not build separate "mobile" and "desktop" pages. Adapt the shell and use responsive classes.

**Verification:** every screen must be checked at 390, 768, 1024, 1280 and 1440 px widths before it is considered done (Playwright viewport tests for the main flows).

---

## 6. Data model (v1 draft)

| Table | Key columns | Notes |
|---|---|---|
| `profiles` | id (= auth user id), username (unique), display_name, avatar_public_id, bio, reminder_weekday (0–6), email_opt_in, created_at | Email lives in auth, not here |
| `artists` | id, provider, provider_id, name, image_url, cached_at | Unique (provider, provider_id) |
| `songs` | id, provider, provider_id, title, artist_id, artist_name, cover_url, external_url, cached_at | Unique (provider, provider_id) |
| `favorite_artists` | user_id, artist_id, position | Max 5 per user |
| `favorite_songs` | user_id, song_id, position | Max 10 per user |
| `posts` | id, user_id, body, song_id (nullable), image_public_id (nullable), is_weekly_pick, week_start, created_at | Partial unique index (user_id, week_start) where is_weekly_pick |
| `likes` | user_id, post_id, created_at | Composite primary key |
| `comments` | id, post_id, user_id, body, created_at | Flat only |
| `reports` | id, reporter_id, target_type, target_id, reason, status, created_at | Admin queue |
| `email_log` | id, user_id, kind, week_start, sent_at | Unique (user_id, kind, week_start) |
| (view) `streaks` | user_id, current_streak, longest_streak | Computed from weekly picks |

### RLS principles
- RLS enabled on **every** table in the same migration that creates it.
- Public read for public content (profiles, posts, songs, artists, likes, comments).
- Insert/update/delete only where `user_id = auth.uid()`; never trust a client-supplied user id.
- `reports`: users can insert and read their own; only admin can read all/update.
- `email_log`: no client access; service role only.
- Admin identification mechanism: **[TBD]**.

---

## 7. External services and free-tier limits

Figures come from third-party summaries and provider docs checked October 2026. **Re-verify on each provider's own pricing/docs page before launch.**

| Service | Free-tier facts (as researched) | Watch-outs |
|---|---|---|
| Supabase Free | 500 MB database, 50,000 MAU, ~5 GB egress, file storage 500 MB–1 GB (sources disagree), 2 active projects | Projects pause after 7 days idle |
| Vercel Hobby | Non-commercial use only; cron once per day, may fire anywhere within the scheduled hour | Move plans/hosts before monetizing |
| Cloudinary Free | 25 credits/month shared across storage, bandwidth, transformations (1 credit ≈ 1 GB storage or 1 GB bandwidth or 1,000 transformations) | Over-limit behaviour reported inconsistently: treat as hard. No auto-moderation on free |
| Deezer public API | No key for catalogue reads; ~50 requests / 5 s (third-party figure) | Terms for commercial use **[TBD]**; browsers generally cannot call it directly, so proxy server-side |
| iTunes Search API | Keyless; ~20 requests/min per IP (soft); 200-result cap | Fallback only; cache aggressively |
| SendByte | Free tier ~3,000 emails/month (third-party listing) | Daily cap, SMTP availability, domain verification, deliverability: **[TBD]** |

### Email dependency
No real email can be sent until a **domain is owned and verified**. Name and domain are postponed, so the reminder-email feature (and custom auth emails) is blocked until then. Everything else can be built first. All email goes through a single `mailer` module so the provider can be swapped. In development, the mailer logs instead of sending.

---

## 8. Environment variables (names only; never commit values)

> Check Supabase's current API key naming in its docs; names below are placeholders for the same roles.

| Variable | Exposure | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or current publishable-key equivalent) | Public | Client key, safe only because RLS is enforced |
| `SUPABASE_SERVICE_ROLE_KEY` (or current secret-key equivalent) | **Server only** | Privileged actions (account deletion, cron) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Public | Image delivery URL |
| `CLOUDINARY_API_KEY` | **Server only** | Upload signing, deletion |
| `CLOUDINARY_API_SECRET` | **Server only** | Upload signing, deletion |
| `SENDBYTE_API_KEY` | **Server only** | Email sending |
| `EMAIL_FROM_ADDRESS` | Server only | **[TBD]** until domain exists |
| `CRON_SECRET` | **Server only** | Authenticates cron route |
| `FEATURE_IMAGE_UPLOADS` | Server | Kill switch for uploads |

`.env.local` is git-ignored. Keep an `.env.example` with names and empty values only.

---

## 9. Proposed folder structure

```
/app                 Next.js routes (App Router)
  /api               Server route handlers (search, upload/sign, cron, account)
/components          UI components
/lib
  /supabase          Client/server helpers
  /catalogue         Deezer/iTunes providers + normalizer + cache (provider interface)
  /mailer            Email module (SendByte implementation behind an interface)
  /cloudinary        Signing + deletion helpers
  /validation        zod schemas
/supabase/migrations SQL migrations (source of truth for schema + RLS)
/tests               Unit and e2e tests
PROJECT.md  AGENT.md  README.md
```

---

## 10. Conventions
- TypeScript strict; no `any` without a comment explaining why.
- Validation schemas (zod) co-located by feature in `/lib/validation`.
- Branches: `feat/…`, `fix/…`, `chore/…`. Commits: small, one concern each, imperative mood.
- Database changes only via new migration files.

---

## 11. Open items [TBD]
1. App name and domain (postponed)
2. Package manager (npm or pnpm)
3. Local database approach (hosted dev project vs local Supabase)
4. SendByte: API vs SMTP, daily cap, SDK, domain verification, deliverability test
5. Deezer terms of use (display of covers/previews, commercial use)
6. Admin role mechanism
7. Week boundaries: UTC (v1) vs user timezone
8. Image moderation process and upload limits per user
9. Privacy policy and terms pages (required before inviting outside users)
10. Hosting plan if the app is ever monetized

---

## 12. Decision log
| Date | Decision | Notes |
|---|---|---|
| 2026-10 | Users can post unlimited; plus one Song of the Week per week | Weekly pick drives badge and streak |
| 2026-10 | Cloudinary for user images only; covers via Deezer/iTunes links | Avoid Supabase Storage caps |
| 2026-10 | SendByte for email | Nigerian provider, local-currency payments |
| 2026-10 | Spotify integration dropped | API access limits block a public launch |
| 2026-10 | Name and domain postponed | Blocks email sending only |
| 2026-10 | App-style UI, mobile-first, X-style layout on large screens | See section 5.5; UI screens generated in Google Stitch (App mode for mobile, Web mode for desktop) |
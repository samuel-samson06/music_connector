# [App name TBD]

> A niche music web app where people talk about songs they love, and share one **Song of the Week** to build a streak.

**Status:** Pre-build planning (v0.1). Name and domain are still to be decided.

---

## What is this?

Streaming apps tell you what you played. This app is about **why a song matters to you**. People post about songs in a social feed (with the song's cover art and an optional picture of their own), react to each other's posts, and once a week pick a **Song of the Week** that shows on their profile as a badge with a streak.

It is a hobby project, designed to run on free plans for as long as possible.

---

## User story

1. **Sign up or sign in** with email or Google.
2. **Set up a profile:** avatar, username, bio.
3. **Pick favorites:** search for up to 5 artists and 10 songs; they appear on your profile. You can edit or remove them any time.
4. **Post about a song:** write a post, optionally attach a song (cover art comes from the music catalogue) and optionally upload your own image. Post as often as you like.
5. **Choose a Song of the Week:** mark one post per week as your pick. It earns a badge, and picking a different song each week builds a **streak**.
6. **Browse the feed:** like and comment on other people's posts, and see what is trending in the app.
7. **Visit profiles:** see someone's favorites, Song of the Week, and streak.
8. **Get a weekly reminder email** on the day you choose (once email is set up).
9. **Stay in control:** report content, delete your own posts, or delete your account and all your data.

---

## Versions

### v1 — MVP (current target)
Auth, profiles, favorites (5 artists / 10 songs), song search, feed with unlimited posts, optional song and image per post, likes and comments, Song of the Week with badge and streak, "trending on the app", weekly reminder email, report/admin delete, delete account, public profile/post pages with share cards.

### v1.1 — Next (deferred)
Direct messaging, "currently listening" status, location-based artist suggestions, worldwide/country trending charts, follow graph.

### v2 — Later (deferred)
Recommendations, groups, in-app and push notifications.

> Spotify integration is **not** planned: Spotify's current API access limits make a public launch infeasible.

---

## Architecture (quick summary)

```
Browser (Next.js, React, TypeScript)
   │
   ├── Supabase (Postgres + Auth + Row Level Security)   ← simple reads/writes, protected by RLS
   │
   └── Next.js server routes (Vercel)                    ← only where secrets are needed
          ├── /api/search        → cache → Deezer → iTunes (fallback)
          ├── /api/upload/sign   → Cloudinary signature (browser uploads directly)
          ├── /api/cron/reminders→ daily job → SendByte email (+ database keep-alive)
          └── /api/account       → delete assets, rows, then the auth user
```

- **Song covers** are links from Deezer/iTunes, saved as text. They are never uploaded.
- **User images** (avatars, post pictures) go to **Cloudinary**; Supabase Storage is not used.
- **Email** goes through SendByte behind a swappable module. It needs a verified domain, so reminder emails come last.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js (App Router), React, TypeScript (strict) |
| Database/Auth | Supabase (Postgres, Row Level Security) |
| Styling | Tailwind CSS, shadcn/ui |
| Validation | zod |
| Images | Cloudinary |
| Music data | Deezer (primary), iTunes Search (fallback) |
| Email | SendByte |
| Hosting | Vercel (Hobby, non-commercial) |
| Testing | Vitest, Playwright |

Details, limits, data model, and open decisions are in **[PROJECT.md](./PROJECT.md)**. Rules for AI coding agents are in **[AGENT.md](./AGENT.md)**.

---

## Getting started

> To be completed once the project is scaffolded. Package manager is still undecided.

Prerequisites: Node.js (current LTS), a Supabase project, a Cloudinary account.

1. Clone the repository.
2. Copy `.env.example` to `.env.local` and fill in the values (see PROJECT.md §8 for variable names and which are server-only).
3. Install dependencies.
4. Apply database migrations from `/supabase/migrations`.
5. Start the dev server.

Never commit `.env.local` or any secret.

---

## Roadmap (v1 build phases)

- [ ] **Week 1 — Foundation:** repo, Next.js, Supabase, auth, profiles + RLS, deploy
- [ ] **Week 2 — Catalogue and favorites:** search proxy with caching, favorites UI
- [ ] **Week 3 — Feed:** posts (song + image), feed, likes, comments
- [ ] **Week 4 — Retention loop:** Song of the Week, streak, trending
- [ ] **Week 5 — Safety and reminders:** reports, admin delete, account deletion, reminder emails
- [ ] **Week 6 — Share and launch:** share cards, onboarding, invite the first 20 users

---

## Security and privacy

- Row Level Security on every table; secrets are server-only.
- Reporting and admin deletion for user content.
- Users can delete their account and all associated data.
- A privacy policy and terms of use are required before inviting outside users.

## License

To be decided.
# music_connector

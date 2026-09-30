# CLAUDE.md

Scroll-animated wedding invitation (Vietnamese content). Next.js App Router + React 19 + TypeScript, Tailwind CSS v4, GSAP ScrollTrigger, Lenis smooth scroll.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

No test or lint scripts are configured. Verify changes with `npm run build` (type-checks) and by viewing the page in a browser.

## Structure

- `content/wedding.ts` — single source of truth for all copy, dates, photos, events. Edit content here, not in components.
- `app/page.tsx` — composes the sections in scroll order; `app/layout.tsx` sets fonts/metadata; `app/globals.css` holds Tailwind `@theme` tokens (`cream`, `ink`, `blush`, `wine`, `font-display`).
- `components/` — one component per section (Hero, Intro, Couple, Schedule (venue + timeline), Wishes (RSVP + wishes form), Gallery, Footer) plus helpers: `SmoothScroll` (Lenis + ScrollTrigger sync), `useReveal` (reveal-on-scroll), `SplitChars`, ``CornerNav`.
- `public/images/` — photos referenced from `content/wedding.ts`.

## Conventions

- Components using GSAP, refs or browser APIs are client components (`"use client"`); register GSAP plugins on the client only.
- Use Tailwind utilities and the theme tokens above; avoid ad-hoc colors.
- Animations should match the existing motion style (pinned sections, scrubbed ScrollTrigger); clean up triggers/contexts on unmount.
- Path alias `@/` maps to the repo root.

## Attendee data / database

Live: `docker compose up -d --build` runs the Next.js app (`Dockerfile`, standalone output) + Postgres, routed by Traefik on the external `lucas-proxy` network at `${WEDDING_HOST}.${DOMAINNAME_CLOUD_SERVER}`; the DB is not published. Local dev: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d db` exposes Postgres on localhost for `npm run dev`. Schema in `db/init.sql`, runs only on first volume creation). Copy `.env.example` to `.env` first (`DATABASE_URL`, `ADMIN_TOKEN`); never commit `.env`.

- `lib/db.ts` — shared `pg` pool.
- `app/api/wishes` (GET/POST) and `app/api/rsvp` (POST) back `components/Wishes.tsx` (single RSVP + wish form).
- `app/api/export?type=rsvps|wishes` — CSV download, protected by `ADMIN_TOKEN` (`Authorization: Bearer` or `?token=`). Output is UTF-8 with BOM (Excel reads Vietnamese correctly) and cells starting with `= + - @` are prefixed with `'` to block formula injection.
- No Node on the host: run npm via `docker run --rm -v $PWD:/app -w /app node:22-alpine ...`.

# Wedding-Invitation

Scroll-animated wedding invitation built with Next.js, Tailwind CSS v4, GSAP ScrollTrigger and Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Customize

Everything (names, date, venue, timeline) is in `content/wedding.ts`.

- **Photos**: put files in `public/images/` and set `src: "/images/your-file.jpg"` on any photo entry. 
- **RSVPs & wishes**: stored in Postgres. `cp .env.example .env`, then `docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d db` and `npm run dev` locally, or `docker compose up -d --build` on the server (Traefik on the `lucas-proxy` network, see `.env.example`). Download as CSV (opens correctly in Excel with Vietnamese): `/api/export?type=rsvps&token=<ADMIN_TOKEN>` or `type=wishes`.

## Sections

Hero (pinned, frames scatter while the main photo expands, names animate in) → Intro → Couple → Schedule (venue + timeline) → RSVP & wishes → Gallery → Footer. The corner nav uses `mix-blend-difference` so it stays readable over any background.

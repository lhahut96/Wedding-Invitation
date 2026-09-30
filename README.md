# Wedding-Invitation

Scroll-animated wedding invitation built with Next.js, Tailwind CSS v4, GSAP ScrollTrigger and Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Customize

Everything (names, date, story, events, bank info, music) is in `content/wedding.ts`.

- **Photos**: put files in `public/images/` and set `src: "/images/your-file.jpg"` on any photo entry. Entries without `src` show a gradient placeholder.
- **Music**: put an mp3 in `public/music/` and set `music.src`.
- **Wishes**: currently saved only in each visitor's browser (localStorage). Hook `save` in `components/Wishes.tsx` up to a backend to collect them.

## Sections

Hero (pinned, frames scatter while the main photo expands, names animate in) → Intro → Couple → Story (pinned horizontal scroll) → Gallery → Music → Schedule + countdown → Wishes → Gift → Footer. The corner nav uses `mix-blend-difference` so it stays readable over any background.

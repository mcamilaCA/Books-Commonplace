# The Commonplace

A Renaissance commonplace book built on top of your Goodreads shelves. It pulls
your **currently reading**, **want to read**, **read**, and **did not finish**
shelves from Goodreads (via the [piratereads.com](https://www.piratereads.com/)
API), and lets you keep, next to every book:

- favorite **quotes**, with page numbers and a note on why they struck you
- **reflections** — longer thoughts a book (or a section of one) set loose
- free-text **idea tags** on any quote or reflection

Those ideas are drawn together into an **Idea Map** — a force-directed
constellation where ideas that echo the same quote or thought sit close
together, and ideas that only share a shelf drift further apart. A
**Timeline** page shows every quote and reflection in the order you kept
them, across every book.

Single-user app: there is one Goodreads identity connected at a time, no
accounts or sign-in.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- SQLite via Prisma
- `d3-force` for the idea map's layout, hand-rolled SVG rendering (no chart library)
- Server actions for all mutations — no client-side data-fetching library needed

## Getting started

```bash
npm install
cp .env.example .env        # DATABASE_URL="file:./dev.db" by default
npx prisma migrate dev       # creates dev.db from prisma/schema.prisma
npm run db:seed              # optional: loads offline fixture books/quotes/tags
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Connecting your Goodreads shelves

Go to **Settings** and enter your Goodreads user id — the number-and-slug in
your profile URL:

```
goodreads.com/user/show/12345678-jane  →  12345678-jane
```

Then click **Sync from Goodreads**. This calls
`https://api.piratereads.com/{user_id}/{shelf}` for each of the four shelves
and upserts the books into your local database. Your quotes, reflections,
and tags live independently of the sync — re-syncing only ever updates
book metadata and shelf placement, it never touches what you've written.

### Seed data

`npm run db:seed` loads twenty real books (with real cover art, ratings, and
Goodreads links, taken from a live piratereads.com response) across all four
shelves, plus a handful of quotes and reflections tagged with ideas like
*selfishness*, *stoicism*, and *human nature* — enough to see the Idea Map,
Timeline, and Library populated without needing a live sync first.

## Project layout

```
prisma/schema.prisma       Book / Quote / Reflection / Tag data model
prisma/seed.ts             Offline fixture data
src/lib/piratereads.ts     Typed client for the four shelf endpoints
src/lib/sync.ts            Fetches all shelves, upserts Book rows
src/lib/actions.ts         Server actions: quotes, reflections, tags, sync
src/lib/graph.ts           Builds Idea Map nodes/edges from tag co-occurrence
src/app/page.tsx           Library (shelves)
src/app/books/[id]/        Book detail: quotes, reflections, add forms
src/app/timeline/          Chronological feed
src/app/map/               Idea Map (d3-force + SVG)
src/app/settings/          Goodreads connection + stats
```

## Design

Gothic Romanesque, with a Studio Ghibli warmth to the details: candlelit
ink-and-parchment palette, round Romanesque arches on panels, an engraved
double-frame around quotes, and a small hand-drawn vine flourish as a
section divider. Fonts are Cinzel (display), Cormorant Garamond (serif
headings), and Crimson Pro (body) — all via `next/font/google`.

# Kingsway wireframes

Marketing-site **wireframes** for Kingsway Corporation (NYSE: KWY), a public
evergreen owner of entrepreneur-led essential-services businesses. This is a
design/wireframe prototype — content is intentionally placeholder in places
(`[Name]`, image placeholders, "pending approval" copy). It is **not** the
production site.

## Keeping this doc current (every session — read this first)

This file is the onboarding contract that lets any new session pick up the
project without losing context. **Preserve and maintain it** so future
sessions stay reproducible. Whenever you change something a later session
would need to know, update `CLAUDE.md` **in the same commit** and push it —
including:

- new / renamed / removed pages, routes, or key components;
- changes to the build or **deploy flow** (still: push to `develop`);
- new conventions or client preferences (e.g. sentence case);
- new gotchas you hit and the workaround.

Keep it accurate and concise. Durable project knowledge lives **here** (it
travels with the repo and every clone); machine-local Claude memory does not,
so put anything a teammate or fresh session needs into this file, not memory.

## Stack

- **Vite + React 19 + TypeScript**, **Tailwind CSS v4** (config-less; theme
  tokens live in `@theme` inside `src/index.css`), routing via **wouter**.
- Fonts: Inter (`@fontsource/inter`). No other runtime deps.
- Node: use **20** (see `.nvmrc`; CI builds on 20). Newer versions work locally.

## Run / build

```bash
npm install        # fresh clone only (node_modules is git-ignored)
npm run dev        # http://localhost:5173/kingsway-wireframes/
npm run build      # tsc -b && vite build  ← ALWAYS run before pushing
npm run lint
```

The app is served under the base path **`/kingsway-wireframes/`** (GitHub
Pages project site) — see `vite.config.ts` and the `BASE` const in
`src/App.tsx`. Internal links use wouter `<Link>`; the base is applied
automatically. Hard-coded `<a>`s must include the `/kingsway-wireframes` prefix.

> **`tsc -b` is stricter than `tsc --noEmit`.** The app tsconfig sets
> `noUnusedLocals`/`noUnusedParameters`, so an orphaned import fails the build
> (and the deploy) even though `tsc --noEmit` passes. Always verify with
> `npm run build`, not just a typecheck.

## Deploy (important)

- Deploy is **automatic on push to `develop`**: `.github/workflows/deploy.yml`
  builds and publishes to GitHub Pages.
- **Live site:** https://papertiger.github.io/kingsway-wireframes/
- Do **not** use the `npm run deploy` / `gh-pages` script — Pages is served
  from the Actions build of `develop`, not the `gh-pages` branch. Pushing there
  does nothing visible.
- Typical loop: branch off `develop` (or work on it), `npm run build` to
  verify, commit, `git push origin develop`, then `gh run watch` the
  "Deploy to GitHub Pages" run. A green run publishes in ~1–2 min.

## Conventions

- **Sentence case everywhere** — headings, card titles, labels, buttons.
  Capitalize only the first word and proper nouns (Kingsway, Kingsway Business
  System / KBS, Gemba, Kaizen, Voice of the Customer). Never Title Case.
  All-caps eyebrows/overlines (`uppercase tracking-…`) are a separate
  typographic device and are fine.
- **Design system:** neutral editorial palette, typography-led. Theme tokens
  (in `src/index.css` `@theme`): `--color-ink`, `-ink-soft`, `-ink-faint`,
  `-line`, `-paper`, `-paper-warm`, `-dark` (#0b0b0b), `-ph` (placeholder gray).
  Use these via Tailwind (`text-ink`, `bg-dark`, `border-line`, …). Shared
  primitives live in `src/lib/ui.tsx` (`Container`, `Section`, `SectionHeading`,
  `Overline`, `Button`, `Placeholder`, …).
- **British → American:** copy has mixed spellings; only change what a ticket
  asks for (don't mass-normalize).
- Match the density/idiom of surrounding code; keep components small.

## Layout / structure

- `src/App.tsx` — routes (`/`, `/about`, `/companies`, `/investors`,
  `/business-owners`, `/intermediaries`, `/entrepreneurs`,
  `/talk-to-an-expert`, `/legal`, `/documents/:slug`, 404).
- `src/pages/Document.tsx` — document detail page (date, title, description,
  PDF link), driven by a `DOCUMENTS` array keyed on slug; unknown slugs render
  a "document not found" state. Mirrors the live site's `/documents/<slug>`.
- `src/pages/Legal.tsx` — legal notice, linked from the footer. Copy is
  verbatim from https://kingsway-financial.com/legal/ — lawyer-drafted, so
  don't apply the sentence-case/spelling conventions to it or "fix" its typos.
- `src/components/Layout.tsx` — sticky header (flat right-justified nav; `NAV`
  array; About is left-most), footer. Overlay-header pages (transparent white
  nav over a dark hero) are listed in `overlayRoute`: `/`, `/about`,
  `/entrepreneurs`. Those heroes use `-mt-20` to sit under the sticky header.
- Notable components: `FlywheelScroll` (home model section — sticky diagram +
  scroll steps / mobile tabs), `TestimonialGallery` (black 2:3 portrait cards,
  auto-rotate, expand), `Carousel` (draggable horizontal, dots + arrows — used
  by the About KBS section and the Entrepreneurs "Three phases" slider: full-
  width dark cards, equal height via the flex track, neighbours peek both
  sides), `AudiencePathways` (home "Who we work with" flush-imagery cards),
  `PdfCallout` (boxed "download this PDF" callout — title, description, button
  and an optional thumbnail; drop it on any page. Used by Business owners,
  Intermediaries and Entrepreneurs),
  `AudienceCards` (compact contact-page routing cards), `Accordion`,
  `SocialProof`, `Logo` (Kingsway wordmark SVG; `fill: currentColor` so it
  inherits the header/footer text colour — header and footer render it at
  160px wide, never exceed 180px). (`RevealPanel` exists but is no longer
  used.)
- The Investors "Why invest" section reuses the About KBS card treatment in a
  static 4-column grid; the About "Five principles" and Entrepreneurs "Why
  choose the KSX platform" sections share the sticky stacking-scroll layout.

## Feedback / tickets (Marker.io)

- Client feedback comes in as **Marker.io** tickets numbered `KU-NN`, project
  **"Kingsway - UX"**. Ticket titles/screenshots often differ from the actual
  intent — read the description and screenshot; confirm scope if ambiguous.
- Workflow when addressing them: implement → `npm run build` → push to
  `develop` → watch the deploy → comment on the ticket with the commit sha and
  set it **Resolved** (or **Closed** when told). Access via the Marker MCP
  (project id `6a429e10657db3ce9cde578c`).

## Gotchas

- **Preview screenshots desync on long pages** — on tall pages (home, about,
  entrepreneurs) the screenshot tab often won't scroll to a deep section and
  returns a blank/other frame. Verify layout with `preview_eval` DOM +
  computed-style measurements and `preview_snapshot` instead of relying on
  screenshots.
- After editing, verify observable changes in the live preview; don't just
  typecheck.

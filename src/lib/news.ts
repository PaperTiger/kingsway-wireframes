/*
  News & press content.

  Two kinds of entry:
  - an article, with a rich-text `body` rendered at /news/<slug>;
  - a document, which has no body and links straight out to an existing
    /documents/<slug> page (date, title, PDF link).

  `thumbnail` is optional — entries that have one render as an image box with
  white text over it in the listing; entries without render as a plain box.

  Body copy is placeholder throughout.
*/
export type NewsBlock = { h?: string; p?: string; ul?: string[] }

export type NewsItem = {
  slug: string
  /* ISO date, used for sorting and to derive the year filter. */
  iso: string
  date: string
  title: string
  excerpt: string
  thumbnail?: string
  /* Set for PDF-style entries; mutually exclusive with `body`. */
  documentHref?: string
  body?: NewsBlock[]
}

const PLACEHOLDER_BODY: NewsBlock[] = [
  {
    p: 'Placeholder release copy. The opening paragraph carries the announcement itself — what happened, who it involves, and when it takes effect — in a couple of plain sentences.',
  },
  {
    p: 'A second paragraph adds the context an outside reader needs: where the business sits, why it fits the Kingsway model, and what changes for its customers and its team.',
  },
  { h: 'A subheading for the detail' },
  {
    p: 'Body copy continues here. This page is styled as rich text, so a release can mix paragraphs, subheadings and lists without needing a new template.',
  },
  {
    ul: [
      'A bulleted point of supporting detail',
      'A second point — terms, timing, or the people involved',
      'A third point, where the release needs one',
    ],
  },
  {
    h: 'About Kingsway',
    p: 'Kingsway is a public, permanent-capital platform that acquires essential services businesses and pairs them with exceptional entrepreneurial operators. Boilerplate copy pending approval.',
  },
]

export const NEWS: NewsItem[] = [
  {
    slug: 'planet-microcap-2026',
    iso: '2026-06-05',
    date: 'June 5, 2026',
    title: 'Kingsway to present at Planet MicroCap 2026 investor conference',
    excerpt:
      'Management will present and hold one-on-one meetings with investors.',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'investor-day-2026',
    iso: '2026-05-18',
    date: 'May 18, 2026',
    title: 'Kingsway publishes 2026 Investor Day presentation',
    excerpt: 'The full presentation, available to download.',
    thumbnail: '960 × 540px',
    documentHref: '/documents/investor-day-2026',
  },
  {
    slug: 'first-quarter-2026-results',
    iso: '2026-04-29',
    date: 'April 29, 2026',
    title: 'Kingsway reports first quarter 2026 results',
    excerpt: 'Results for the quarter ended March 31, 2026.',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'roundhouse-electric-acquisition',
    iso: '2026-03-03',
    date: 'March 3, 2026',
    title: 'Kingsway acquires Roundhouse Electric',
    excerpt:
      'The electric motor equipment and repair business joins the skilled trades portfolio.',
    thumbnail: '960 × 640px',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'operator-in-residence-appointment',
    iso: '2025-11-12',
    date: 'November 12, 2025',
    title: 'Kingsway names [Name] as operator-in-residence',
    excerpt: 'The latest addition to the KSX operator bench.',
    thumbnail: '960 × 640px',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'third-quarter-2025-results',
    iso: '2025-10-30',
    date: 'October 30, 2025',
    title: 'Kingsway reports third quarter 2025 results',
    excerpt: 'Results for the quarter ended September 30, 2025.',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'is-technology-acquisition',
    iso: '2024-09-09',
    date: 'September 9, 2024',
    title: 'Kingsway acquires IS Technology',
    excerpt:
      'One of the largest IT service providers in North Carolina joins the portfolio.',
    thumbnail: '960 × 640px',
    body: PLACEHOLDER_BODY,
  },
  {
    slug: 'digital-diagnostics-acquisition',
    iso: '2024-02-20',
    date: 'February 20, 2024',
    title: 'Kingsway completes acquisition of Digital Diagnostics',
    excerpt: 'A national provider of outsourced cardiac monitoring telemetry.',
    body: PLACEHOLDER_BODY,
  },
]

/* Newest first. */
export const NEWS_SORTED = [...NEWS].sort((a, b) => b.iso.localeCompare(a.iso))

/* Years present in the content, newest first — drives the filter. */
export const NEWS_YEARS = [...new Set(NEWS_SORTED.map((n) => n.iso.slice(0, 4)))]

/* Where an entry links to: its own article, or an existing document page. */
export function newsHref(item: NewsItem) {
  return item.documentHref ?? `/news/${item.slug}`
}

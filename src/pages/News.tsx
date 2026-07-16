import { useState } from 'react'
import { Link } from 'wouter'
import { Container, Section, Overline, Lede, Placeholder } from '../lib/ui'
import { NEWS_SORTED, NEWS_YEARS, newsHref, type NewsItem } from '../lib/news'

/*
  A post box. With a thumbnail it becomes an image tile with white text over
  it; without, a plain bordered box. Both are the same height so the grid
  stays even.
*/
function PostCard({ item }: { item: NewsItem }) {
  const href = newsHref(item)
  const classes =
    'group flex h-[300px] flex-col justify-end overflow-hidden rounded-[3px] p-7 transition-colors'

  const meta = (
    <>
      <div
        className={`text-[12px] font-medium uppercase tracking-[0.12em] ${
          item.thumbnail ? 'text-paper/70' : 'text-ink-faint'
        }`}
      >
        {item.date}
        {item.documentHref && <span> · PDF</span>}
      </div>
      <h2
        className={`mt-3 text-[21px] font-semibold leading-[1.2] tracking-[-0.01em] ${
          item.thumbnail ? 'text-paper' : 'text-ink'
        }`}
      >
        {item.title}
      </h2>
      <p
        className={`mt-2 text-[14px] leading-[1.5] ${
          item.thumbnail ? 'text-paper/70' : 'text-ink-soft'
        }`}
      >
        {item.excerpt}
      </p>
    </>
  )

  if (!item.thumbnail) {
    return (
      <Link href={href} className={`${classes} border border-line bg-paper hover:border-ink-faint`}>
        {meta}
      </Link>
    )
  }

  return (
    <Link href={href} className={`${classes} relative`}>
      {/* No label — the overlaid text is the content here. */}
      <Placeholder dark className="absolute inset-0 h-full w-full" />
      {/* Keeps the white text legible whatever the photo turns out to be. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
      />
      <div className="relative">{meta}</div>
    </Link>
  )
}

export default function News() {
  const [year, setYear] = useState('All')
  const filtered =
    year === 'All' ? NEWS_SORTED : NEWS_SORTED.filter((n) => n.iso.startsWith(year))

  return (
    <>
      <Section className="pt-20 md:pt-24">
        <Container>
          <Overline>Newsroom</Overline>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <h1 className="text-[46px] font-semibold tracking-[-0.03em] md:text-[64px]">
              News &amp; press
            </h1>
            <div className="flex items-center">
              <Lede>
                Announcements, acquisitions, and results from Kingsway and the
                companies we own.
              </Lede>
            </div>
          </div>
        </Container>
      </Section>

      {/* Year filter */}
      <div className="border-y border-line bg-paper-warm">
        <Container>
          <div className="flex flex-wrap items-center gap-4 py-5">
            <label
              htmlFor="news-year"
              className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint"
            >
              Year
            </label>
            <div className="relative">
              <select
                id="news-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none rounded-[2px] border border-line bg-paper py-2.5 pl-4 pr-10 text-[14px] text-ink outline-none transition-colors hover:border-ink-faint focus:border-ink"
              >
                {['All', ...NEWS_YEARS].map((y) => (
                  <option key={y} value={y}>
                    {y === 'All' ? 'All years' : y}
                  </option>
                ))}
              </select>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <span className="text-[13px] text-ink-faint">
              {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <PostCard key={item.slug} item={item} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-[16px] text-ink-soft">No posts from {year}.</p>
          )}
        </Container>
      </Section>
    </>
  )
}

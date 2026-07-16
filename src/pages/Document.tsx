import { useRoute } from 'wouter'
import { Container, Section, Overline, TextLink, Placeholder, DownloadIcon } from '../lib/ui'

/*
  Document detail page — the destination for an item in Investor resources.
  Deliberately plain: date, title, a short description, and a link to the PDF.
  Mirrors the /documents/<slug> shape of the live Kingsway site.
*/
type Doc = {
  slug: string
  date: string
  title: string
  description: string
  pdfHref: string
  meta: string
  /* Optional cover thumbnail, as "W × Hpx" — omit for a text-only document. */
  thumbnail?: string
}

const DOCUMENTS: Doc[] = [
  {
    slug: 'may-18-2026-kingsway-publishes-2026-investor-day-presentation',
    date: 'May 18, 2026',
    title: 'Kingsway publishes 2026 Investor Day presentation',
    // Placeholder description — the live page carries no summary copy.
    description:
      'The presentation given at Kingsway’s 2026 Investor Day, covering the search-driven acquisition model, the performance of the portfolio, and how the company compounds capital over the long term.',
    pdfHref:
      'https://kingsway-financial.com/wp-content/uploads/2026/05/KFS-May-2026-Investor-Day-Deck.pdf',
    meta: 'PDF',
    thumbnail: '960 × 540px',
  },
]

export default function Document() {
  const [, params] = useRoute('/documents/:slug')
  const doc = DOCUMENTS.find((d) => d.slug === params?.slug)

  if (!doc) {
    return (
      <Section className="pt-24 md:pt-32">
        <Container>
          <Overline>Document</Overline>
          <h1 className="mt-6 text-[46px] font-semibold tracking-[-0.03em] md:text-[60px]">
            Document not found
          </h1>
          <div className="mt-8">
            <TextLink href="/investors" arrow="">← Back to investors</TextLink>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <Section className="pt-20 md:pt-24">
      <Container>
        {/* Two columns only when there's a thumbnail; otherwise the copy runs
            at its natural measure. */}
        <div
          className={
            doc.thumbnail
              ? 'grid gap-12 lg:grid-cols-[minmax(0,62ch)_minmax(0,380px)] lg:gap-16'
              : ''
          }
        >
          <div className="max-w-[62ch]">
            <Overline>{doc.date}</Overline>
            <h1 className="mt-6 text-[46px] font-semibold tracking-[-0.03em] md:text-[60px]">
              {doc.title}
            </h1>
            <p className="mt-8 text-[18px] leading-[1.6] text-ink-soft md:text-[20px]">
              {doc.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href={doc.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-[2px] bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
              >
                <DownloadIcon />
                Download the PDF
              </a>
              <span className="text-[14px] text-ink-faint">{doc.meta}</span>
            </div>
          </div>

          {doc.thumbnail && (
            <a
              href={doc.pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block self-start transition-opacity hover:opacity-90"
              aria-label={`${doc.title} — open the PDF`}
            >
              <Placeholder
                label="Thumbnail"
                dims={doc.thumbnail}
                className="w-full rounded-[3px] border border-line"
              />
            </a>
          )}
        </div>
      </Container>
    </Section>
  )
}

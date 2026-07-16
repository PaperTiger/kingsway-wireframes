import { useRoute } from 'wouter'
import { Container, Section, Overline, TextLink } from '../lib/ui'

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
  },
]

function DownloadIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
      <path d="M7 11l5 5l5 -5" />
      <path d="M12 4l0 12" />
    </svg>
  )
}

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

          <div className="mt-14 border-t border-line pt-8">
            <TextLink href="/investors" arrow="">← Back to investor resources</TextLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}

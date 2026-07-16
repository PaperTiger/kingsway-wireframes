import { Placeholder, DownloadIcon } from '../lib/ui'

/*
  Boxed callout pointing at a downloadable PDF — whitepaper, tear sheet,
  criteria extract, and so on. Drop it into any page.

  The thumbnail is optional: supply dims ("W × Hpx") to show a cover alongside
  the copy, omit it and the copy runs full width.
*/
export type PdfCalloutProps = {
  eyebrow?: string
  title: string
  description: string
  href: string
  /* Optional cover, as "W × Hpx". */
  thumbnail?: string
  /* Small note beside the button — e.g. "PDF · 2 pages". */
  meta?: string
  cta?: string
}

export default function PdfCallout({
  eyebrow,
  title,
  description,
  href,
  thumbnail,
  meta = 'PDF',
  cta = 'Download the PDF',
}: PdfCalloutProps) {
  return (
    <div className="rounded-[3px] border border-line bg-paper-warm p-8 md:p-10">
      <div
        className={
          thumbnail ? 'grid gap-8 md:grid-cols-[minmax(0,200px)_1fr] md:gap-10' : ''
        }
      >
        {thumbnail && (
          <a href={href} download className="block self-start transition-opacity hover:opacity-90">
            <Placeholder
              label="Thumbnail"
              dims={thumbnail}
              className="w-full rounded-[2px] border border-line"
            />
          </a>
        )}

        <div className="max-w-[54ch]">
          {eyebrow && (
            <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {eyebrow}
            </div>
          )}
          <h3
            className={`text-[22px] font-semibold tracking-[-0.01em] md:text-[26px] ${
              eyebrow ? 'mt-3' : ''
            }`}
          >
            {title}
          </h3>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft">{description}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={href}
              download
              className="inline-flex items-center gap-2.5 rounded-[2px] bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              <DownloadIcon />
              {cta}
            </a>
            {meta && <span className="text-[14px] text-ink-faint">{meta}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

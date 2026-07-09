import { Link } from 'wouter'

export type Audience = {
  title: string
  desc: string
  cta: string
  href: string
}

/*
  Interactive audience pathway cards (KU-4, and KU-28 which mirrors this on
  the Talk to an expert page). Whole card is a link; on hover it inverts to
  ink with a sliding arrow, so the pathways feel interactive.
*/
export default function AudienceCards({
  items,
  columns = 4,
}: {
  items: Audience[]
  columns?: 2 | 4
}) {
  const cols = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'
  return (
    <div className={`mt-12 grid gap-5 ${cols}`}>
      {items.map((a, i) => (
        <Link
          key={a.title}
          href={a.href}
          className="group flex flex-col rounded-[3px] border border-line bg-paper p-8 transition-colors duration-200 hover:border-ink hover:bg-dark"
        >
          <div className="text-[13px] font-medium tabular-nums text-ink-faint transition-colors group-hover:text-paper/50">
            {String(i + 1).padStart(2, '0')}
          </div>
          <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-paper">
            {a.title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-ink-soft transition-colors group-hover:text-paper/70">
            {a.desc}
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink transition-colors group-hover:text-paper">
            {a.cta}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      ))}
    </div>
  )
}

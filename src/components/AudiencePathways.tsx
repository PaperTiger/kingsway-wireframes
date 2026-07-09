import { Link } from 'wouter'
import { Placeholder } from '../lib/ui'
import type { Audience } from './AudienceCards'

/*
  Homepage "Who we work with" pathway cards (KU-4). Each card is a full link:
  an uppercase label + description in a text block, and an image area that is
  flush to the card edges. The image alternates top/bottom across the row so
  the imagery zig-zags. No index numbers.
*/
export default function AudiencePathways({ items }: { items: Audience[] }) {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((a, i) => {
        const imageTop = i % 2 === 1
        const text = (
          <div className="p-7">
            <h3 className="text-[15px] font-bold uppercase tracking-[0.04em]">
              {a.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{a.desc}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-ink">
              {a.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        )
        const image = (
          <div className="min-h-[180px] flex-1">
            <Placeholder label="Image" className="h-full w-full" />
          </div>
        )
        return (
          <Link
            key={a.title}
            href={a.href}
            className="group flex h-[440px] flex-col overflow-hidden rounded-[8px] bg-paper transition-shadow duration-200 hover:shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)]"
          >
            {imageTop ? (
              <>
                {image}
                {text}
              </>
            ) : (
              <>
                {text}
                {image}
              </>
            )}
          </Link>
        )
      })}
    </div>
  )
}

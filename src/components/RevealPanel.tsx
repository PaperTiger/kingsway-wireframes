import { useState } from 'react'

export type RevealItem = {
  n?: string
  title: string
  body: string
}

/*
  Headlines upfront, explanation on interaction (KU-7).
  Left: selectable list of headlines. Right: detail for the active item.
*/
export default function RevealPanel({ items }: { items: RevealItem[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-[1fr_1.1fr] md:gap-12">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const on = active === i
          return (
            <li key={i}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="flex w-full items-baseline gap-5 py-5 text-left"
              >
                <span className="text-[13px] font-medium tabular-nums text-ink-faint">
                  {item.n ?? String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[22px] font-semibold tracking-[-0.02em] transition-colors md:text-[28px] ${
                    on ? 'text-ink' : 'text-ink-faint'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="md:sticky md:top-28 md:self-start">
        <div className="rounded-[3px] border border-line bg-paper-warm p-8 md:p-10">
          <div className="text-[13px] font-medium tabular-nums text-ink-faint">
            {items[active].n ?? String(active + 1).padStart(2, '0')}
          </div>
          <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]">
            {items[active].title}
          </h3>
          <p className="mt-5 text-[17px] leading-[1.65] text-ink-soft">
            {items[active].body}
          </p>
        </div>
      </div>
    </div>
  )
}

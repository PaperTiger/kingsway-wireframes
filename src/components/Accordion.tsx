import { useState, type ReactNode } from 'react'

export type AccordionItem = {
  title: string
  body: ReactNode
}

/*
  High-level view, dive into detail on click (KU-11, KU-14, KU-22).
  Numbered rows; the open row reveals its detail.
*/
export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[]
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)
  return (
    <div className="border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={i > 0 ? 'border-t border-line' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-6 py-6 text-left"
            >
              <span className="text-[13px] font-medium tabular-nums text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-[20px] font-semibold tracking-[-0.01em] md:text-[22px]">
                {item.title}
              </span>
              <span
                className={`text-[22px] leading-none text-ink-soft transition-transform ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] pb-7' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-[70ch] pl-[3.25rem] text-[16px] leading-[1.65] text-ink-soft">
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

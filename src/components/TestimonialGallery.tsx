import { useEffect, useState } from 'react'
import { Placeholder } from '../lib/ui'

export type Testimonial = {
  /** Short segment/persona label shown under the card (e.g. "The seller"). */
  label: string
  /** One-line descriptor shown under the label when the card is open. */
  desc?: string
  quote: string
  name: string
  title: string
}

const ROTATE_MS = 3500
// The 2:3 portrait stays this size whether the card is open or closed
// (width; height is the column width × 3/2 = 225 via the aspect ratio).
const PORTRAIT_W = 150
// Width the quote panel reveals to the right of the portrait when open.
const QUOTE_W = 320
// Every card is the same fixed height so the labels below them line up; the
// open card only grows wider (to the right), never taller. Tall enough for a
// 2:3 portrait (225) plus the logo pinned below it.
const CARD_H = 340

// Small white logo tile placeholder (the reference's corner badge).
function LogoTile() {
  return (
    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[4px] bg-paper text-[11px] text-ink-faint">
      Logo
    </div>
  )
}

/*
  Testimonial gallery (KU: "What sellers/intermediaries/operators say").
  A row of black cards, each holding a square portrait with the logo at the
  bottom. One card is open: the black section extends to the right to reveal
  the quote — the square itself never resizes and cards keep their natural
  width (they don't stretch to fill the row).
  - Click a card to open it, click again to close (open/close toggle).
  - Auto-rotates the open card every 3.5s.
  - Hovering the gallery pauses the auto-rotate.
  Collapses to a stacked accordion on small screens.
*/
export default function TestimonialGallery({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState<number | null>(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => {
      setActive((a) => ((a === null ? -1 : a) + 1) % items.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, items.length])

  const toggle = (i: number) => setActive((a) => (a === i ? null : i))
  const hover = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  }

  return (
    <>
      {/* Desktop: black cards, square portrait, quote reveals to the right */}
      <div className="hidden gap-4 overflow-x-auto pb-2 md:flex" {...hover}>
        {items.map((t, i) => {
          const isOpen = active === i
          return (
            <div key={i} className="flex flex-shrink-0 flex-col">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-label={`${t.label} testimonial`}
                className="rounded-[8px] outline-none ring-ink focus-visible:ring-2"
              >
                <div
                  className="grid overflow-hidden rounded-[8px] bg-dark p-5 text-left text-paper transition-[grid-template-columns] duration-500 ease-out"
                  style={{
                    height: CARD_H,
                    gridTemplateColumns: isOpen
                      ? `${PORTRAIT_W}px ${QUOTE_W}px`
                      : `${PORTRAIT_W}px 0px`,
                  }}
                >
                  {/* 2:3 portrait with the logo pinned to the bottom */}
                  <div
                    className="flex h-full flex-col justify-between"
                    style={{ width: PORTRAIT_W }}
                  >
                    <div className="aspect-[2/3] w-full overflow-hidden rounded-[4px]">
                      <Placeholder label="Portrait" className="h-full w-full" />
                    </div>
                    <LogoTile />
                  </div>

                  {/* Quote panel — clipped to zero width when the card is closed */}
                  <div className="overflow-hidden">
                    <figure
                      className="flex h-full flex-col justify-between pl-6"
                      style={{ width: QUOTE_W }}
                    >
                      <blockquote className="text-[16px] leading-[1.5] tracking-[-0.01em]">
                        <span className="text-paper/40">&#8220;</span>
                        {t.quote}
                        <span className="text-paper/40">&#8221;</span>
                      </blockquote>
                      <figcaption className="mt-4">
                        <div className="text-[15px] font-semibold">{t.name}</div>
                        <div className="text-[14px] text-paper/60">{t.title}</div>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </button>

              {/* Label + descriptor below the card */}
              <div className="mt-4 text-[18px] font-semibold tracking-[-0.01em]">
                {t.label}
              </div>
              {isOpen && t.desc && (
                <p className="mt-1 max-w-[44ch] text-[15px] leading-[1.5] text-ink-soft">
                  {t.desc}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: stacked accordion, same black styling */}
      <div className="space-y-4 md:hidden" {...hover}>
        {items.map((t, i) => {
          const isOpen = active === i
          return (
            <div key={i} className="overflow-hidden rounded-[8px] bg-dark text-paper">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-[4px]">
                  <Placeholder className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[17px] font-semibold tracking-[-0.01em]">
                    {t.label}
                  </div>
                  <div className="truncate text-[13px] text-paper/60">
                    {t.name} · {t.title}
                  </div>
                </div>
                <span
                  className={`text-[22px] leading-none text-paper/50 transition-transform ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <figure className="px-4 pb-4">
                    <blockquote className="text-[16px] leading-[1.5]">
                      <span className="text-paper/40">&#8220;</span>
                      {t.quote}
                      <span className="text-paper/40">&#8221;</span>
                    </blockquote>
                    {t.desc && (
                      <p className="mt-3 text-[14px] leading-[1.5] text-paper/60">
                        {t.desc}
                      </p>
                    )}
                    <div className="mt-4">
                      <LogoTile />
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

import { useRef, useState, type ReactNode } from 'react'

/*
  Horizontal card carousel: native/trackpad scroll, pointer-drag to scroll,
  prev/next arrows, and dots below. Children are the cards (each sets its own
  width + `snap-start shrink-0`).
*/
export default function Carousel({ children }: { children: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, startX: 0, startLeft: 0 })
  const [active, setActive] = useState(0)
  const count = children.length

  // Distance between the start of consecutive cards (card width + gap).
  const step = () => {
    const el = track.current
    if (!el) return 0
    const a = el.children[0] as HTMLElement | undefined
    const b = el.children[1] as HTMLElement | undefined
    if (a && b) return b.offsetLeft - a.offsetLeft
    return a ? a.offsetWidth : el.clientWidth
  }

  const onScroll = () => {
    const el = track.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / (step() || 1)))
  }

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const idx = Math.max(0, Math.min(count - 1, i))
    el.scrollTo({ left: idx * step(), behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const el = track.current
    if (!el) return
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = track.current
    if (!el || !drag.current.down) return
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
  }
  const endDrag = () => {
    drag.current.down = false
  }

  const Arrow = ({ dir }: { dir: -1 | 1 }) => {
    const disabled = dir === -1 ? active === 0 : active === count - 1
    return (
      <button
        type="button"
        aria-label={dir === -1 ? 'Previous' : 'Next'}
        onClick={() => goTo(active + dir)}
        disabled={disabled}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={dir === -1 ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'} />
        </svg>
      </button>
    )
  }

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex cursor-grab snap-x snap-mandatory select-none gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <Arrow dir={-1} />
        <div className="flex items-center gap-2">
          {children.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              aria-current={active === i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? 'w-6 bg-ink' : 'w-2 bg-line hover:bg-ink-faint'
              }`}
            />
          ))}
        </div>
        <Arrow dir={1} />
      </div>
    </div>
  )
}

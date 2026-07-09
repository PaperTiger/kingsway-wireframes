import { useRef, useState, type ReactNode } from 'react'

/*
  Horizontal card carousel: native/trackpad scroll, smooth pointer-drag with
  momentum, prev/next arrows, and dots below. Children are the cards (each sets
  its own width + `snap-start shrink-0`).
*/
export default function Carousel({ children }: { children: ReactNode[] }) {
  const track = useRef<HTMLDivElement>(null)
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

  // Pointer-drag: free-scroll 1:1 while dragging (snap disabled so it doesn't
  // fight), then settle to the nearest card on release with a little momentum.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = track.current
    if (!el || e.button !== 0) return
    const startX = e.clientX
    const startLeft = el.scrollLeft
    let lastX = startX
    let lastT = performance.now()
    let v = 0
    let moved = false
    el.style.scrollSnapType = 'none'
    el.style.cursor = 'grabbing'

    const move = (ev: PointerEvent) => {
      const now = performance.now()
      const dt = now - lastT || 16
      v = (ev.clientX - lastX) / dt
      lastX = ev.clientX
      lastT = now
      el.scrollLeft = startLeft - (ev.clientX - startX)
      if (Math.abs(ev.clientX - startX) > 4) moved = true
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      el.style.scrollSnapType = ''
      el.style.cursor = ''
      if (moved) {
        let target = Math.round(el.scrollLeft / (step() || 1))
        if (Math.abs(v) > 0.35) target += v < 0 ? 1 : -1
        goTo(target)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
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
        className="flex cursor-grab snap-x snap-mandatory select-none gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

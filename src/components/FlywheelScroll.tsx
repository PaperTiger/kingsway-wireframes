import { useEffect, useRef, useState } from 'react'

export type FlyStep = { n: string; title: string; body: string }

/*
  KU-3: show the flywheel at work. Steps are greyed out to begin with; as the
  reader scrolls, the step crossing the centre of the viewport comes into full
  colour with its explanation in large type.
*/
export default function FlywheelScroll({ steps }: { steps: FlyStep[] }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx)
            setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="mt-14 divide-y divide-line border-y border-line">
      {steps.map((s, i) => {
        const on = active === i
        return (
          <div
            key={s.n}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="grid gap-4 py-12 md:grid-cols-[auto_1fr] md:gap-12 md:py-16"
          >
            <div
              className={`text-[44px] font-medium leading-none tabular-nums transition-colors duration-300 md:text-[56px] ${
                on ? 'text-ink' : 'text-line'
              }`}
            >
              {s.n}
            </div>
            <div>
              <h3
                className={`text-[30px] font-semibold tracking-[-0.02em] transition-colors duration-300 md:text-[40px] ${
                  on ? 'text-ink' : 'text-ink-faint/40'
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`mt-4 max-w-[60ch] text-[18px] leading-[1.5] transition-all duration-300 md:text-[22px] ${
                  on ? 'text-ink-soft opacity-100' : 'text-ink-faint/50 opacity-40'
                }`}
              >
                {s.body}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

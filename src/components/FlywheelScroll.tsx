import { useEffect, useRef, useState } from 'react'

export type FlyStep = {
  n: string
  title: string
  body: string
  detail?: string
}

// Node centres around the circle, clockwise from the top (matches the four
// steps). Coordinates are in the 380×380 SVG viewBox, centre (190, 190).
const NODES = [
  { x: 190, y: 60 }, // top
  { x: 320, y: 190 }, // right
  { x: 190, y: 320 }, // bottom
  { x: 60, y: 190 }, // left
]

// Curved clockwise arrows sitting in the gaps between the four nodes.
const ARROWS = [
  'M 248.1 30.2 A 170 170 0 0 1 349.8 131.9',
  'M 349.8 248.1 A 170 170 0 0 1 248.1 349.8',
  'M 131.9 349.8 A 170 170 0 0 1 30.2 248.1',
  'M 30.2 131.9 A 170 170 0 0 1 131.9 30.2',
]

const ROTATE_MS = 3000

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return mobile
}

function FlywheelDiagram({
  steps,
  active,
  onSelect,
}: {
  steps: FlyStep[]
  active: number
  onSelect: (i: number) => void
}) {
  return (
    <svg
      viewBox="0 0 380 380"
      className="mx-auto w-full max-w-[340px] lg:max-w-[440px]"
      role="img"
      aria-label="The Kingsway flywheel: attract, acquire, grow, repeat."
    >
      <defs>
        <marker
          id="fw-arrow"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6.5"
          markerHeight="6.5"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="var(--color-line)" />
        </marker>
      </defs>

      {ARROWS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="2"
          markerEnd="url(#fw-arrow)"
        />
      ))}

      {/* Mobile-only affordance in the centre of the wheel */}
      <text
        x="190"
        y="194"
        textAnchor="middle"
        className="lg:hidden"
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fill: 'var(--color-ink-faint)',
        }}
      >
        Click to reveal
      </text>

      {steps.slice(0, 4).map((s, i) => {
        const on = active === i
        const c = NODES[i]
        return (
          <g
            key={s.n}
            role="button"
            tabIndex={0}
            aria-label={`Step ${s.n}: ${s.title}`}
            aria-pressed={on}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(i)
              }
            }}
            className="cursor-pointer outline-none"
          >
            <circle
              cx={c.x}
              cy={c.y}
              r="46"
              fill={on ? 'var(--color-ink)' : 'var(--color-paper)'}
              stroke={on ? 'var(--color-ink)' : 'var(--color-line)'}
              strokeWidth="1.5"
              style={{ transition: 'fill 300ms, stroke 300ms' }}
            />
            <text
              x={c.x}
              y={c.y - 8}
              textAnchor="middle"
              className="tabular-nums"
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                fill: on ? 'rgba(255,255,255,0.6)' : 'var(--color-ink-faint)',
                transition: 'fill 300ms',
              }}
            >
              {s.n}
            </text>
            <text
              x={c.x}
              y={c.y + 12}
              textAnchor="middle"
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                fill: on ? 'var(--color-paper)' : 'var(--color-ink-faint)',
                transition: 'fill 300ms',
              }}
            >
              {s.title}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/*
  KU-3: show the flywheel at work. The circular diagram sits on the left with
  every step greyed out to begin with.

  Desktop: the diagram is sticky; as the reader scrolls, the step crossing the
  centre turns full ink and its explanation appears in large type on the right.
  Clicking a node scrolls that step's content into view.

  Mobile: the diagram is a set of tabs. The text below it swaps to the selected
  step, all within the viewport. It auto-rotates until the reader taps a node.
*/
export default function FlywheelScroll({ steps }: { steps: FlyStep[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const isMobile = useIsMobile()
  const refs = useRef<(HTMLDivElement | null)[]>([])

  // Desktop: scroll drives the active step (the hidden stack is display:none on
  // mobile, so this observer is inert there).
  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[]
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Mobile: auto-rotate through the steps until the reader interacts.
  useEffect(() => {
    if (!isMobile || paused) return
    const id = setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      ROTATE_MS,
    )
    return () => clearInterval(id)
  }, [isMobile, paused, steps.length])

  const selectNode = (i: number) => {
    if (isMobile) {
      setPaused(true)
      setActive(i)
    } else {
      setActive(i)
      refs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const activeStep = steps[active]

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: diagram (sticky on desktop). On mobile it doubles as tabs with
          the active step's text directly below. */}
      <div className="lg:sticky lg:top-24 lg:flex lg:h-[70vh] lg:flex-col lg:items-center lg:justify-center lg:self-start">
        <FlywheelDiagram steps={steps} active={active} onSelect={selectNode} />

        <div className="mt-8 lg:hidden">
          <div className="text-[13px] font-medium uppercase tracking-[0.16em] tabular-nums text-ink-faint">
            Step {activeStep.n}
          </div>
          <h3 className="mt-2 text-[28px] font-semibold leading-[1.05] tracking-[-0.02em]">
            {activeStep.title}
          </h3>
          <p className="mt-3 text-[17px] leading-[1.5] text-ink-soft">
            {activeStep.body}
          </p>
          {activeStep.detail && (
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
              {activeStep.detail}
            </p>
          )}
          <div className="mt-5 text-[12px] uppercase tracking-[0.12em] text-ink-faint/70">
            {paused ? 'Tap a step to explore' : 'Auto-rotating · tap a step'}
          </div>
        </div>
      </div>

      {/* Right: desktop scroll stack (hidden on mobile) */}
      <div className="hidden lg:block">
        {steps.map((s, i) => {
          const on = active === i
          return (
            <div
              key={s.n}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              className="flex min-h-[70vh] flex-col justify-center py-10"
            >
              <div
                className={`text-[13px] font-medium uppercase tracking-[0.16em] tabular-nums transition-colors duration-300 ${
                  on ? 'text-ink-faint' : 'text-ink-faint/40'
                }`}
              >
                Step {s.n}
              </div>
              <h3
                className={`mt-3 text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] transition-colors duration-300 md:text-[52px] ${
                  on ? 'text-ink' : 'text-ink-faint/30'
                }`}
              >
                {s.title}
              </h3>
              <p
                className={`mt-5 max-w-[46ch] text-[19px] leading-[1.5] transition-all duration-300 md:text-[24px] ${
                  on ? 'text-ink-soft opacity-100' : 'text-ink-faint/50 opacity-40'
                }`}
              >
                {s.body}
              </p>
              {s.detail && (
                <p
                  className={`mt-4 max-w-[52ch] text-[16px] leading-[1.65] transition-all duration-300 ${
                    on ? 'text-ink-soft opacity-100' : 'text-ink-faint/50 opacity-30'
                  }`}
                >
                  {s.detail}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

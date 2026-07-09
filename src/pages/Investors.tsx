import { useState } from 'react'
import {
  Container,
  Section,
  Overline,
  SectionHeading,
  TextLink,
  Placeholder,
  LogoPlaceholder,
} from '../lib/ui'

const METRICS = [
  { value: 'XX', label: 'Portfolio companies', caption: 'Essential services across North America' },
  { value: 'XX', label: 'Acquisitions completed', caption: 'Since programme launch' },
  { value: '$XXM', label: 'Portfolio revenue', caption: 'Combined annual revenue' },
  { value: 'XX%', label: 'Revenue CAGR', caption: 'Compounding across the portfolio' },
  { value: 'XX', label: 'Operators placed', caption: 'Active and alumni' },
]

const THESIS = [
  {
    n: '1',
    category: 'Structure',
    heading: 'Permanent capital advantage',
    body: 'No fund lifecycle, no forced exits. We hold and compound indefinitely, allowing operators to make long-term decisions without artificial horizons. There is no pressure to sell — ever.',
  },
  {
    n: '2',
    category: 'Model',
    heading: 'Repeatable acquisition engine',
    body: 'The KBS and operator platform create a systematic, scalable acquisition model. We repeatedly find, acquire, and transition great businesses with disciplined rigour at every step.',
  },
  {
    n: '3',
    category: 'Market',
    heading: 'Fragmented market opportunity',
    body: 'Millions of SMB succession events represent a structural, long-duration opportunity. The market is vast and ripe for a disciplined, permanent buyer with deep operator infrastructure.',
  },
  {
    n: '4',
    category: 'Alignment',
    heading: 'Aligned incentives',
    body: "Operators have meaningful ownership in the companies they run. Kingsway's interests and theirs are the same — sustainable, long-term compounding of intrinsic value, not short-term exits.",
  },
]

const FLYWHEEL = [
  {
    cat: 'Talent',
    title: 'Search & attract operators',
    body: 'Identify and recruit top entrepreneurial talent ready to lead an acquisition. We source from MBA programmes, operator networks, and our own alumni.',
  },
  {
    cat: 'Capital',
    title: 'Acquire essential businesses',
    body: 'Back operators with committed Kingsway capital to acquire small, high-growth essential services businesses at disciplined valuations.',
  },
  {
    cat: 'Execution',
    title: 'Apply the KBS',
    body: 'Deploy the Kingsway Business System — proven playbooks across operations, sales, and talent — to improve every business we own.',
  },
  {
    cat: 'Performance',
    title: 'Generate cash flow',
    body: 'Well-run essential businesses generate durable, growing cash flow through economic cycles.',
  },
  {
    cat: 'Growth',
    title: 'Reinvest & compound',
    body: 'Reinvest cash flow into new acquisitions and bolt-ons, compounding intrinsic value over the long run.',
  },
]

const RESOURCES = [
  { label: 'Quarterly earnings', icon: 'M4 20V10 M10 20V4 M16 20v-7' },
  { label: 'SEC filings', icon: 'M6 2h8l4 4v16H6z M14 2v4h4' },
  { label: 'Presentations & events', icon: 'M4 5h16v14H4z M4 9h16 M8 3v4 M16 3v4' },
  { label: 'Governance', icon: 'M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6z' },
  { label: 'Stock information', icon: 'M4 16l5-5 4 4 7-8' },
  { label: 'Email alerts', icon: 'M3 6h18v12H3z M3 7l9 6 9-6' },
]

function ResourceIcon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-ink-soft">
      <path d={path} />
    </svg>
  )
}

function Flywheel() {
  const [active, setActive] = useState(0)
  const step = FLYWHEEL[active]
  const next = FLYWHEEL[(active + 1) % FLYWHEEL.length]
  return (
    <div className="mt-14 grid overflow-hidden rounded-[3px] border border-paper/15 lg:grid-cols-2">
      <div>
        {FLYWHEEL.map((s, i) => {
          const on = i === active
          return (
            <button
              key={s.cat}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-baseline gap-6 border-b border-paper/10 px-8 py-7 text-left transition-colors last:border-b-0 ${
                on ? 'bg-paper/[0.06]' : ''
              }`}
            >
              <span className={`text-[13px] tabular-nums ${on ? 'text-paper/60' : 'text-paper/30'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <span className={`block text-[22px] font-semibold tracking-[-0.01em] ${on ? 'text-paper' : 'text-paper/40'}`}>
                  {s.title}
                </span>
                <span className={`mt-1 block text-[12px] uppercase tracking-[0.14em] ${on ? 'text-paper/50' : 'text-paper/25'}`}>
                  {s.cat}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <div className="flex flex-col border-t border-paper/15 md:border-l md:border-t-0">
        <Placeholder dark label={`Image placeholder — ${step.cat}`} className="min-h-[240px] flex-1" />
        <div className="border-t border-paper/15 p-8">
          <div className="text-[13px] tabular-nums text-paper/50">
            {String(active + 1).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[12px] uppercase tracking-[0.14em] text-paper/50">
            {step.cat}
          </div>
          <h3 className="mt-2 text-[22px] font-semibold text-paper">{step.title}</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-paper/60">{step.body}</p>
          <button
            type="button"
            onClick={() => setActive((active + 1) % FLYWHEEL.length)}
            className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-paper/70"
          >
            Next: {next.title} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Investors() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <div>
              <Overline>For investors · NYSE: KWY</Overline>
              <h1 className="mt-8 text-[40px] leading-none font-normal tracking-[-0.03em] md:text-[60px]">
                The compounding power of entrepreneurship through acquisition
              </h1>
              <p className="mt-8 max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
                Kingsway is a public, permanent-capital platform that acquires
                essential services businesses and pairs them with exceptional
                entrepreneurial operators.
              </p>
            </div>
            <Placeholder
              label="Image placeholder"
              dims="960 × 880px"
              className="w-full self-start"
            />
          </div>
        </Container>
      </Section>

      {/* Kingsway at a glance */}
      <Section warm>
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:gap-20">
            <div>
              <Overline>Kingsway at a glance</Overline>
              <p className="mt-6 text-[18px] leading-[1.55] text-ink-soft">
                A growing platform of essential services businesses across North
                America, built on a repeatable acquisition model.
              </p>
            </div>
            <div>
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex items-center gap-8 py-8 ${i > 0 ? 'border-t border-line' : ''}`}
                >
                  <div className="w-[160px] shrink-0 text-[52px] font-medium leading-none tracking-[-0.02em] md:text-[64px]">
                    {m.value}
                  </div>
                  <div>
                    <div className="text-[18px] font-semibold">{m.label}</div>
                    <div className="mt-1 text-[15px] text-ink-soft">{m.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Why invest. Same stacking-scroll layout as "Why choose the KSX
          platform" (Entrepreneurs): each advantage pins and the next panel
          scrolls up to overlap it. Sticky stacking on desktop; plain stacked
          blocks on mobile. */}
      <section className="bg-paper pt-20 md:pt-28">
        <Container>
          <SectionHeading>Why invest in Kingsway</SectionHeading>
          <p className="mt-5 max-w-[46ch] text-[18px] text-ink-soft md:text-[20px]">
            Four structural advantages that compound over time.
          </p>
        </Container>

        <div className="mt-12">
          {THESIS.map((a) => (
            <div
              key={a.n}
              className="border-t border-line bg-paper lg:sticky lg:top-0 lg:min-h-screen lg:shadow-[0_-16px_40px_-28px_rgba(0,0,0,0.25)]"
            >
              <Container>
                <div className="grid gap-x-10 gap-y-6 py-14 md:py-20 lg:grid-cols-[minmax(0,180px)_minmax(0,160px)_minmax(0,1fr)] lg:items-start lg:py-28">
                  <div className="text-[88px] font-medium leading-[0.8] tracking-[-0.03em] md:text-[160px]">
                    {a.n}
                  </div>
                  <div className="text-[16px] text-ink-soft">({a.category})</div>
                  <div>
                    <h3 className="max-w-[16ch] text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[52px]">
                      {a.heading}
                    </h3>
                    <div className="mt-8 max-w-[420px] lg:mt-10">
                      <Placeholder
                        label="Image placeholder"
                        dims="1000 × 560px"
                        className="w-full"
                      />
                    </div>
                    <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft md:text-[19px]">
                      {a.body}
                    </p>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </section>

      {/* How the model compounds — dark interactive flywheel */}
      <Section dark>
        <Container>
          <SectionHeading>How the model compounds</SectionHeading>
          <p className="mt-5 text-[18px] text-paper/60 md:text-[20px]">
            A five-step flywheel — turning great operators into enduring businesses.
          </p>
          <Flywheel />
        </Container>
      </Section>

      {/* Proof of model */}
      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionHeading>Proof of model</SectionHeading>
              <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
                Our portfolio companies span essential sectors across North America.
              </p>
            </div>
            <TextLink href="/companies">View all companies</TextLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="overflow-hidden rounded-[3px] border border-line">
                <LogoPlaceholder label="Logo placeholder" className="h-[130px] w-full" />
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold">Company name {n}</h3>
                  <div className="mt-1 text-[14px] text-ink-soft">Essential services</div>
                  <div className="mt-3 text-[12px] uppercase tracking-[0.1em] text-ink-faint">
                    Region, state
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Investor resources */}
      <Section warm>
        <Container>
          <SectionHeading>Investor resources</SectionHeading>
          <div className="mt-12 grid grid-cols-1 border border-line sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r, i) => (
              <a
                key={r.label}
                href="#"
                className={[
                  'flex items-center justify-between gap-4 bg-paper p-6 transition-colors hover:bg-paper-warm border-line',
                  'border-t sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0',
                  i % 3 !== 2 ? 'lg:border-r' : '',
                  i % 2 === 0 ? 'sm:border-r lg:border-r' : 'sm:border-r-0',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <ResourceIcon path={r.icon} />
                  <span className="text-[16px] font-medium">{r.label}</span>
                </span>
                <span aria-hidden className="text-ink-faint">→</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact investor relations */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <div>
              <SectionHeading>Contact investor relations</SectionHeading>
              <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft">
                For inquiries regarding Kingsway Corporation, our financial
                performance, or investment strategy, please reach out to our team.
              </p>
            </div>
            <div className="rounded-[3px] border border-line">
              <div className="flex items-center gap-4 p-8">
                <div className="h-14 w-14 rounded-full bg-ph" />
                <div>
                  <div className="text-[18px] font-semibold">[Contact name]</div>
                  <div className="mt-1 text-[14px] text-ink-soft">
                    Head of investor relations
                  </div>
                </div>
              </div>
              <div className="border-t border-line p-8">
                <div className="text-[16px]">ir@kingswaycorporation.com</div>
                <div className="mt-3 text-[16px]">+1 (000) 000-0000</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

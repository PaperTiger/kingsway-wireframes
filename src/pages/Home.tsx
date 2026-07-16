import {
  Container,
  Section,
  Overline,
  SectionHeading,
  OutlineButton,
  Placeholder,
} from '../lib/ui'
import FlywheelScroll from '../components/FlywheelScroll'
import AudiencePathways from '../components/AudiencePathways'

const STEPS = [
  {
    n: '01',
    title: 'Attract',
    body: 'We recruit highly qualified operators ready to lead.',
    detail:
      'Placeholder copy — a longer description of how Kingsway sources and evaluates operator talent will live here. It will expand on the pipeline: top MBA programs, operator networks, and our own alumni, along with the qualities we screen for before backing someone to lead an acquisition.',
  },
  {
    n: '02',
    title: 'Acquire',
    body: 'Backed by Kingsway capital, operators acquire small, high-growth essential businesses.',
    detail:
      'Placeholder copy — more detail on the acquisition process goes here. Committed capital lets operators move quickly and credibly on small, high-growth essential-services businesses, acquired at disciplined valuations with a permanent-hold mindset rather than a fixed fund horizon.',
  },
  {
    n: '03',
    title: 'Grow',
    body: 'The Kingsway Business System compounds value across the portfolio over the long run.',
    detail:
      'Placeholder copy — how the Kingsway Business System is applied after close. Proven playbooks across operations, sales, pricing, and talent are deployed to lift performance, while shared infrastructure and follow-on capital fund bolt-on acquisitions.',
  },
  {
    n: '04',
    title: 'Repeat',
    body: 'Permanent capital means we never need to sell. We build, not flip.',
    detail:
      'Placeholder copy — the compounding loop described in full. Durable cash flow from well-run businesses is reinvested into new operators and acquisitions, so intrinsic value compounds over decades. Permanent capital means we never have to sell — we build, not flip.',
  },
]

const METRICS = [
  { value: 'XX', label: 'Portfolio companies', caption: 'Essential services across North America' },
  { value: 'XX', label: 'Acquisitions completed', caption: 'Since the program launched' },
  { value: '$XXM', label: 'Portfolio revenue', caption: 'Combined annual revenue' },
  { value: 'XX', label: 'Operators placed', caption: 'Active and alumni' },
]

const AUDIENCES = [
  { title: 'Investors', desc: 'Understand our compounding model and why permanent capital is a structural advantage for shareholders.', cta: 'Explore the investment story', href: '/investors' },
  { title: 'Business owners', desc: "A permanent home for your legacy. We protect what you've built and invest in its future — no rebrand, no strip.", cta: 'Explore a Kingsway exit', href: '/business-owners' },
  { title: 'Entrepreneurs', desc: 'A structured path to becoming a CEO through acquisition. Capital, coaching, and support from day one.', cta: 'Apply to KSX', href: '/entrepreneurs' },
  { title: 'Intermediaries', desc: "A reliable, well-capitalised buyer with clear criteria. We close, we don't re-trade, and we respond to every CIM.", cta: 'Submit an opportunity', href: '/intermediaries' },
]

export default function Home() {
  return (
    <>
      {/* Hero. KU-2: photography-led, primary CTA to the investment story.
          100vh billboard; the header overlays it (pulled up under the sticky bar). */}
      <section className="relative -mt-20 h-screen overflow-hidden">
        <Placeholder dark label="Hero image" dims="1600 × 900px — visual content TBD" className="absolute inset-0 h-full w-full" />
        <div className="relative flex h-full items-center">
          <Container>
            <div className="max-w-[52rem] text-paper">
              <Overline className="text-paper/60">NYSE: KWY · Building through search</Overline>
              <h1 className="mt-8 text-[46px] font-semibold tracking-[-0.03em] md:text-[76px]">
                Growing enduring businesses through entrepreneurial talent
              </h1>
              <p className="mt-6 max-w-[46ch] text-[19px] leading-[1.5] text-paper/75 md:text-[22px]">
                We partner with exceptional operators to acquire and grow essential
                services companies for the long-run.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  href="/kingsway-wireframes/investors"
                  className="inline-flex items-center gap-3 rounded-[2px] bg-paper px-6 py-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
                >
                  View our investment story <span aria-hidden>→</span>
                </a>
                <a href="#model" className="inline-flex items-center gap-2 text-[15px] font-medium text-paper">
                  How the model works
                  <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* How the model works. KU-3: flywheel highlights each step on scroll. */}
      <Section warm id="model">
        <Container>
          <SectionHeading>How the Kingsway model works</SectionHeading>
          <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
            A search fund accelerator strategy built on four connected steps.
          </p>
          <FlywheelScroll steps={STEPS} />
          <div className="mt-10">
            <OutlineButton href="/about">Learn more about us</OutlineButton>
          </div>
        </Container>
      </Section>

      {/* A growing platform */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:gap-20">
            <div>
              <Overline>A growing platform</Overline>
              <p className="mt-6 text-[18px] leading-[1.55] text-ink-soft">
                Kingsway has built a growing portfolio of essential services
                businesses across North America, each led by a dedicated operator.
              </p>
            </div>
            <div>
              {METRICS.map((m, i) => (
                <div key={m.label} className={`flex items-center gap-8 py-8 ${i > 0 ? 'border-t border-line' : ''}`}>
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

      {/* Who we work with. KU-4: interactive audience cards. */}
      <Section warm>
        <Container>
          <SectionHeading>Who we work with</SectionHeading>
          <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
            Kingsway serves four distinct audiences. Find your path.
          </p>
          <AudiencePathways items={AUDIENCES} />
        </Container>
      </Section>
    </>
  )
}

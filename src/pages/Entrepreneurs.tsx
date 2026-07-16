import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Button,
  TextLink,
  Placeholder,
} from '../lib/ui'
import Carousel from '../components/Carousel'
import SocialProof from '../components/SocialProof'
import TestimonialGallery, { type Testimonial } from '../components/TestimonialGallery'
import Accordion, { type AccordionItem } from '../components/Accordion'

const TESTIMONIALS: Testimonial[] = [
  {
    label: 'The operator',
    desc: 'On the KSX programme and the support to lead.',
    quote:
      'Operator testimonial text pending approval. Will speak to the KSX programme experience, the capital and coaching support, and the outcome of leading their acquired company.',
    name: '[Name]',
    title: 'CEO of [Company], acquired [year]',
  },
  {
    label: 'The CEO',
    desc: 'On the capital, coaching, and the outcome.',
    quote:
      'Operator testimonial text pending approval. Will speak to the KSX programme experience, the capital and coaching support, and the outcome of leading their acquired company.',
    name: '[Name]',
    title: 'CEO of [Company], acquired [year]',
  },
  {
    label: 'The searcher',
    desc: 'On the deal flow and infrastructure behind the search.',
    quote:
      'Operator testimonial text pending approval. Will speak to the KSX programme experience, the capital and coaching support, and the outcome of leading their acquired company.',
    name: '[Name]',
    title: 'CEO of [Company], acquired [year]',
  },
  {
    label: 'The graduate',
    desc: 'On going from programme to leading a company.',
    quote:
      'Operator testimonial text pending approval. Will speak to the KSX programme experience, the capital and coaching support, and the outcome of leading their acquired company.',
    name: '[Name]',
    title: 'CEO of [Company], acquired [year]',
  },
]

const ADVANTAGES = [
  {
    n: '1',
    category: 'Capital',
    heading: 'Committed capital, so you can focus on the search.',
    body: 'Kingsway provides committed capital — no fundraising, no LP pitches. You focus on finding and running the business.',
  },
  {
    n: '2',
    category: 'Coaching',
    heading: 'Coaching from operators who have done it before.',
    body: "Structured mentorship with experienced operators and the KSX advisory board. You're never alone in the process.",
  },
  {
    n: '3',
    category: 'Deal flow',
    heading: 'Deal flow and infrastructure that accelerate your search.',
    body: "Kingsway's relationships and M&A infrastructure accelerate the search timeline significantly.",
  },
  {
    n: '4',
    category: 'Growth',
    heading: 'A platform built to compound, not just operate.',
    body: 'KBS playbooks and follow-on capital for bolt-ons give you a platform to compound, not just operate.',
  },
  {
    n: '5',
    category: 'Economics',
    heading: 'Ownership and aligned incentives from day one.',
    body: 'You hold ownership in the company you lead — aligned incentives and a genuine partnership.',
  },
]

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Search',
    body: "Thesis development, industry research, proprietary deal sourcing. Kingsway's network and infrastructure are behind you from day one.",
    checks: ['Sector thesis development', 'Proprietary outreach support', 'Deal flow from Kingsway network', 'Weekly coaching sessions'],
  },
  {
    phase: 'Phase 2',
    title: 'Acquire',
    body: 'Capital commitment, deal structuring, negotiation, and due diligence. We work alongside you every step through to close.',
    checks: ['Capital commitment in place', 'Deal structuring support', 'Legal and diligence infrastructure', 'Negotiation coaching'],
  },
  {
    phase: 'Phase 3',
    title: 'Grow',
    body: 'Post-acquisition: KBS deployment, peer network, advisory board, and follow-on capital for bolt-on M&A.',
    checks: ['KBS playbook onboarding', 'Peer CEO community', 'Advisory board access', 'Follow-on capital for bolt-ons'],
  },
]

const PROFILE = [
  { title: 'Strong credentials', desc: 'An MBA or equivalent practical operating experience.' },
  { title: 'Proven leadership', desc: 'Demonstrated leadership and management skills.' },
  { title: 'Financial literacy', desc: 'Comfortable analysing a P&L and a balance sheet.' },
  { title: 'Ownership mindset', desc: "Entrepreneurial drive and a builder's mentality." },
  { title: 'Willing to relocate', desc: "Ready to move to the business's location and lead on the ground." },
]

const APPLY: AccordionItem[] = [
  {
    title: 'Apply',
    body: 'Send your résumé and a short letter on why you want to be a CEO. We review every application personally and respond quickly.',
  },
  {
    title: 'Meet the KSX team',
    body: 'Initiate a conversation with the KSX team to explore fit, the programme, and the path from search to running your own company.',
  },
  {
    title: 'Join the programme',
    body: "If selected, you're admitted to the KSX programme — paired with committed capital, coaching, and infrastructure from day one.",
  },
]

const METRICS = [
  { value: 'XX', label: 'Operators placed', caption: 'Active and alumni across the portfolio' },
  { value: 'XX', label: 'Businesses acquired via KSX', caption: 'Each one led by a Kingsway CEO' },
  { value: '$XXM', label: 'Combined portfolio revenue', caption: 'Growing year on year' },
]

/* KU-20/KU-22: the phases are a draggable slider — each phase is a full-width
   dark card with an image on the right. Cards peek to the left and right; drag
   (or use the arrows / dots) to follow the path. All cards share one height
   (the flex track stretches every card to the tallest). */
function PhaseJourney() {
  return (
    <div className="mt-10">
      <Carousel>
        {PHASES.map((p) => (
          <div
            key={p.phase}
            className="flex w-[86%] max-w-[1120px] shrink-0 snap-center flex-col overflow-hidden rounded-[3px] bg-dark text-paper lg:grid lg:grid-cols-[1fr_42%]"
          >
            <div className="flex flex-col p-8 md:p-12">
              <div className="text-[13px] font-medium uppercase tracking-[0.14em] text-paper/50">
                {p.phase}
              </div>
              <h3 className="mt-4 text-[40px] font-semibold tracking-[-0.02em] md:text-[64px]">
                {p.title}
              </h3>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-paper/70 md:text-[18px]">
                {p.body}
              </p>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {p.checks.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[15px] text-paper/75">
                    <span aria-hidden className="text-paper/40">→</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8 md:px-12 md:pb-12 lg:p-12 lg:pl-0">
              <Placeholder
                label="Image placeholder"
                className="h-[200px] w-full rounded-[2px] lg:h-full"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default function Entrepreneurs() {
  return (
    <>
      {/* Hero. KU-19: photography-led, image with text overlay, made to "pop".
          Pulled up under the sticky header (-mt-20) so the transparent nav
          overlays the dark billboard, matching the Home/About heroes. */}
      <section className="relative -mt-20 overflow-hidden">
        <Placeholder dark label="Hero image" dims="1600 × 900px — visual content TBD" className="absolute inset-0 h-full w-full" />
        <div className="relative">
          <Container>
            <div className="max-w-[46rem] pb-28 pt-40 text-paper md:pb-40 md:pt-56">
              <Overline className="text-paper/60">NYSE: KWY · Kingsway Search Xcelerator</Overline>
              <h1 className="mt-8 text-[46px] font-semibold tracking-[-0.03em] md:text-[68px]">
                Become a CEO through the Kingsway Search Xcelerator
              </h1>
              <p className="mt-6 max-w-[44ch] text-[19px] leading-[1.5] text-paper/75 md:text-[22px]">
                You bring the talent, ambition, and craft. We bring the capital,
                coaching, and support.
              </p>
              <div className="mt-9">
                <a
                  href="/kingsway-wireframes/talk-to-an-expert"
                  className="inline-flex items-center gap-3 rounded-[2px] bg-paper px-6 py-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
                >
                  Partner with us <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* Why choose KSX. KU-19: stacking scroll — each advantage pins and the
          next panel scrolls up to overlap it, revealing a new image each time.
          Sticky stacking on desktop; plain stacked blocks on mobile. */}
      <section id="why-ksx" className="bg-paper pt-20 md:pt-28">
        <Container>
          <SectionHeading>Why choose the KSX platform</SectionHeading>
          <p className="mt-5 max-w-[46ch] text-[18px] text-ink-soft md:text-[20px]">
            Five advantages that make Kingsway the right accelerator for serious
            operators.
          </p>
        </Container>

        <div className="mt-12">
          {ADVANTAGES.map((a) => (
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

      {/* Three phases. KU-20/KU-22: full-width phases, click to follow the path. */}
      <Section id="phases">
        <Container>
          <SectionHeading>Three phases of the KSX programme</SectionHeading>
          <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
            A high-level view of the journey. Follow the path phase by phase.
          </p>
          <PhaseJourney />
        </Container>
      </Section>

      {/* What we're looking for. KU-21: full-width — image with the heading
          overlaid top-left, dark checklist panel on the right. */}
      <section id="profile" className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] overflow-hidden">
          <Placeholder dark label="Image" className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/55 via-black/10 to-transparent" />
          <div className="relative p-8 md:p-12">
            <SectionHeading className="max-w-[12ch] text-paper">
              What we're looking for
            </SectionHeading>
          </div>
        </div>

        <div className="bg-dark px-8 py-14 text-paper md:px-14 md:py-16 lg:py-20">
          <p className="text-[16px] leading-[1.55] text-paper/60">
            KSX is selective — we look for a specific profile.
          </p>
          <div className="mt-10 space-y-9">
            {PROFILE.map((p) => (
              <div key={p.title} className="flex gap-5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-paper"
                  aria-hidden
                >
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                <div>
                  <h3 className="text-[21px] font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.6] text-paper/70">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply. KU-22: high-level steps, click one to dive into detail. */}
      <Section warm id="apply">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <SectionHeading>Ready to apply?</SectionHeading>
              <p className="mt-5 max-w-[36ch] text-[18px] leading-[1.55] text-ink-soft">
                A straightforward process — we respond to every application
                personally. Follow the steps to see what to expect.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button href="mailto:ksx@kingswaycorporation.com">Apply now</Button>
                <span className="text-[15px] text-ink-soft">
                  ksx@kingswaycorporation.com
                </span>
              </div>
            </div>
            <Accordion items={APPLY} />
          </div>
        </Container>
      </Section>

      {/* The numbers behind the platform. KU-23: flagged as a discussion point. */}
      <Section>
        <Container>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-dashed border-ink-faint px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-ink-faint">
            Discussion point · do we need this section?
          </div>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:gap-20">
            <div>
              <Overline>The numbers behind the platform</Overline>
              <p className="mt-6 text-[18px] leading-[1.55] text-ink-soft">
                The proof that the KSX model works — in businesses acquired,
                operators placed, and value compounded.
              </p>
              <div className="mt-6">
                <TextLink href="/companies">View our companies</TextLink>
              </div>
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

      {/* KU-24: social proof strip */}
      <SocialProof overline="Backing operators from top programmes and networks" warm />

      {/* What operators say */}
      <Section>
        <Container>
          <SectionHeading>What operators say about Kingsway</SectionHeading>
          <div className="mt-12">
            <TestimonialGallery items={TESTIMONIALS} />
          </div>
        </Container>
      </Section>
    </>
  )
}

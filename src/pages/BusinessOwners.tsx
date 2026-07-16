import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Placeholder,
} from '../lib/ui'
import Accordion from '../components/Accordion'
import PdfCallout from '../components/PdfCallout'
import SocialProof from '../components/SocialProof'
import TestimonialGallery, { type Testimonial } from '../components/TestimonialGallery'

const PROMISES = [
  {
    title: 'We keep it whole',
    body: "We don't strip assets or rebrand what works. Your business keeps its identity, people, and culture intact.",
    // shield
    icon: 'M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3',
  },
  {
    title: 'Permanent capital, no clock',
    body: "Kingsway isn't a fund with a 10-year exit horizon. We hold businesses for the long run because we're a public company.",
    // infinity
    icon: 'M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828',
  },
  {
    title: 'A growth partner, not a passive owner',
    body: 'We pair your business with a talented operator and proven KBS playbooks to help it reach its full potential.',
    // trending up
    icon: 'M3 17l6 -6l4 4l8 -8 M14 7l7 0l0 7',
  },
]

const CRITERIA = [
  { label: 'Size', value: 'Revenue range TBD' },
  { label: 'Industries', value: 'Essential services, skilled trades, healthcare, B2B' },
  { label: 'Geography', value: 'North America' },
  {
    label: 'Situation',
    value: 'Owner-operated, founder seeking succession, profitable, established customer base',
  },
]

const STEPS = [
  { title: 'First conversation', body: 'A confidential introductory call to understand your business and what matters to you. No obligation.' },
  { title: 'Preliminary estimate', body: 'A high-level valuation discussion so you can decide whether to continue, with no pressure.' },
  { title: 'Relationship building', body: 'Meeting the team and a site visit. We take time to understand the business before anything is formalised.' },
  { title: 'Formal offer', body: 'A clear Letter of Intent presented in plain language. No surprises and no re-trading.' },
  { title: 'Finances & legal', body: 'Confirmatory due diligence and paperwork, handled efficiently and kept transparent throughout.' },
  { title: 'Transition agreed', body: 'Closing and onboarding begins, with a transition plan built around you.' },
]

const TESTIMONIALS: Testimonial[] = [
  {
    label: 'The seller',
    desc: 'On the ease of transition and preserving the business.',
    quote:
      "Testimonial text will appear here — seller quote pending approval. It will speak to the ease of transition and Kingsway's commitment to preserving the business.",
    name: '[Name]',
    title: '[Business], [Location]',
  },
  {
    label: 'The family',
    desc: 'On finding a permanent, responsible home.',
    quote:
      "Testimonial text will appear here — seller quote pending approval. It will speak to the ease of transition and Kingsway's commitment to preserving the business.",
    name: '[Name]',
    title: '[Business], [Location]',
  },
  {
    label: 'The founder',
    desc: 'On stepping back while the business keeps its identity.',
    quote:
      "Testimonial text will appear here — seller quote pending approval. It will speak to the ease of transition and Kingsway's commitment to preserving the business.",
    name: '[Name]',
    title: '[Business], [Location]',
  },
  {
    label: 'The team',
    desc: 'On continuity for the people and the culture.',
    quote:
      "Testimonial text will appear here — seller quote pending approval. It will speak to the ease of transition and Kingsway's commitment to preserving the business.",
    name: '[Name]',
    title: '[Business], [Location]',
  },
]

export default function BusinessOwners() {
  return (
    <>
      {/* Hero. KU-9: CTA removed here; a single dedicated CTA closes the page. */}
      <Section className="pt-20 md:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <div>
              <Overline>For business owners</Overline>
              <h1 className="mt-8 text-[46px] font-semibold tracking-[-0.03em] md:text-[60px]">
                A permanent home for your business
              </h1>
              <p className="mt-8 max-w-[44ch] text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
                You've built something worth protecting. We keep it whole, invest in
                its future, and honour what made it great.
              </p>
            </div>
            <Placeholder label="Image placeholder" dims="960 × 880px" className="w-full self-start" />
          </div>
        </Container>
      </Section>

      {/* What we promise. KU-10: separate cards. */}
      <Section warm id="promise">
        <Container>
          <SectionHeading>What we promise</SectionHeading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-[3px] border border-line bg-paper p-8 lg:p-10">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ink"
                  aria-hidden
                >
                  <path d={p.icon} />
                </svg>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What we look for. KU-12: image placeholder matches content height. */}
      <Section id="criteria">
        <Container>
          <div className="grid items-stretch gap-10 lg:grid-cols-2 md:gap-16">
            <Placeholder label="Image placeholder" dims="840 × 680px" className="h-full w-full" />
            <div>
              <SectionHeading>What we look for</SectionHeading>
              <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft">
                We focus on a specific type of business. If yours fits, we'd like to
                hear from you.
              </p>
              <div className="mt-10 border border-line">
                {CRITERIA.map((c, i) => (
                  <div
                    key={c.label}
                    className={`grid grid-cols-[120px_1fr] gap-4 p-6 ${i > 0 ? 'border-t border-line' : ''}`}
                  >
                    <div className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                      {c.label}
                    </div>
                    <div className="text-[16px] leading-[1.5]">{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <PdfCallout
            eyebrow="Guide"
            title="The owner's guide to a Kingsway exit"
            description="What selling to a permanent owner actually looks like — how we value a business, what changes on day one, and what happens to your team and your name."
            href="#"
            thumbnail="480 × 620px"
            meta="PDF · file pending"
          />
        </Container>
      </Section>

      {/* What happens next. KU-11: two-column — high-level steps on the right,
          click one to dive into detail. */}
      <Section warm id="process">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <SectionHeading>What happens next</SectionHeading>
              <p className="mt-5 max-w-[36ch] text-[18px] leading-[1.55] text-ink-soft">
                A simple, respectful process — no surprises. Click a step for the
                detail.
              </p>
            </div>
            <Accordion items={STEPS} />
          </div>
        </Container>
      </Section>

      {/* What business owners say */}
      <Section id="testimonials">
        <Container>
          <SectionHeading>What business owners say about Kingsway</SectionHeading>
          <div className="mt-12">
            <TestimonialGallery items={TESTIMONIALS} />
          </div>
        </Container>
      </Section>

      {/* KU-13: social proof strip */}
      <SocialProof overline="Trusted by owners across essential services" warm />
    </>
  )
}

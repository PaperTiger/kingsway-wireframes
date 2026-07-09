import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Button,
  Placeholder,
} from '../lib/ui'
import Accordion from '../components/Accordion'
import SocialProof from '../components/SocialProof'
import TestimonialGallery, { type Testimonial } from '../components/TestimonialGallery'

const TESTIMONIALS: Testimonial[] = [
  {
    label: 'The broker',
    desc: "On Kingsway's speed of response and follow-through to close.",
    quote:
      "Intermediary testimonial pending approval. Will reference Kingsway's speed of response, transparency on criteria, and follow-through to close.",
    name: '[Name]',
    title: '[Firm], [Location]',
  },
  {
    label: 'The advisor',
    desc: 'On transparent criteria and no re-trading.',
    quote:
      "Intermediary testimonial pending approval. Will reference Kingsway's speed of response, transparency on criteria, and follow-through to close.",
    name: '[Name]',
    title: '[Firm], [Location]',
  },
  {
    label: 'The banker',
    desc: 'On certainty of close and a clean process.',
    quote:
      "Intermediary testimonial pending approval. Will reference Kingsway's speed of response, transparency on criteria, and follow-through to close.",
    name: '[Name]',
    title: '[Firm], [Location]',
  },
  {
    label: 'The dealmaker',
    desc: 'On a reliable buyer that honours the terms.',
    quote:
      "Intermediary testimonial pending approval. Will reference Kingsway's speed of response, transparency on criteria, and follow-through to close.",
    name: '[Name]',
    title: '[Firm], [Location]',
  },
]

const WHY = [
  {
    title: 'Clear investment criteria',
    body: "We are explicit about what we buy: sector, size, geography, and situation. You'll know immediately whether a client fits — no ambiguity, no wasted calls.",
    // target
    icon: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0 M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
  },
  {
    title: 'Permanent capital',
    body: "Kingsway is a public company with no fund expiry date. Our capital is always available, and our process doesn't change quarter to quarter.",
    // infinity
    icon: 'M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828',
  },
  {
    title: 'Quick & transparent feedback',
    body: 'We commit to responding to all CIMs within a stated timeframe. We give honest, direct feedback even on passes.',
    // message
    icon: 'M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3 M8 9h8 M8 13h6',
  },
]

const CRITERIA = [
  { label: 'Size', value: 'Revenue range TBD' },
  { label: 'Industries', value: 'Essential services, skilled trades, healthcare, B2B services, vertical SaaS' },
  { label: 'Geography', value: 'North America (US and Canada)' },
  { label: 'Situation', value: 'Owner-operated, founder-led, profitable, recurring or repeat revenue, established customer base' },
  { label: 'Not a fit', value: 'Turnarounds, loss-making, highly cyclical businesses, real estate' },
]

const SUBMISSION = [
  {
    title: 'Send a CIM to our dedicated deal email',
    body: 'We accept CIMs or teasers by email. We sign NDAs on request and treat all information with strict confidentiality.',
  },
  {
    title: 'Kingsway can sign an NDA to facilitate',
    body: "If required before sharing materials, we'll turn around an NDA within 48 hours. We use a standard form.",
  },
  {
    title: 'Evaluation and response within a stated timeframe',
    body: "We aim to respond to all CIMs within [X] business days. You'll receive a clear pass or proceed — no ambiguity.",
  },
]

export default function Intermediaries() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <div>
              <Overline>For intermediaries</Overline>
              <h1 className="mt-8 text-[44px] font-normal tracking-[-0.03em] md:text-[60px]">
                A reliable buyer for your clients
              </h1>
              <p className="mt-8 max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
                Kingsway is a responsive, well-capitalised platform with clear
                investment criteria and a consistent process. We close and we don't
                re-trade.
              </p>
              <div className="mt-8">
                <Button href="mailto:deals@kingswaycorporation.com">Submit an opportunity</Button>
              </div>
            </div>
            <Placeholder label="Image placeholder" dims="960 × 720px" className="w-full self-start" />
          </div>
        </Container>
      </Section>

      {/* Why intermediaries work with Kingsway. KU-15: separate cards. */}
      <Section warm>
        <Container>
          <SectionHeading>Why intermediaries work with Kingsway</SectionHeading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-[3px] border border-line bg-paper p-8 lg:p-10">
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
                  <path d={w.icon} />
                </svg>
                <h3 className="mt-6 text-[20px] font-semibold tracking-[-0.01em]">{w.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our investment criteria. KU-16: bottom tick boxes removed for consistency with business owners. */}
      <Section>
        <Container>
          <SectionHeading>Our investment criteria</SectionHeading>
          <p className="mt-5 max-w-[60ch] text-[18px] leading-[1.55] text-ink-soft">
            We focus on a specific type of business. Self-qualify your client before
            reaching out.
          </p>
          <div className="mt-12 grid items-start gap-10 md:grid-cols-[0.8fr_1.6fr] md:gap-12">
            <Placeholder label="Image placeholder" dims="680 × 560px" className="w-full self-start" />
            <div className="border border-line">
              {CRITERIA.map((c, i) => (
                <div
                  key={c.label}
                  className={`grid grid-cols-[130px_1fr] gap-4 p-6 ${i > 0 ? 'border-t border-line' : ''}`}
                >
                  <div className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                    {c.label}
                  </div>
                  <div className="text-[16px] leading-[1.5]">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How to submit. KU-14: dark feature removed; high-level view, dive into detail. KU-17: fleshed out with an italic intro. */}
      <Section warm>
        <Container>
          <Overline>How to submit</Overline>
          <SectionHeading className="mt-6">How to submit an opportunity</SectionHeading>
          <p className="mt-5 max-w-[62ch] text-[18px] italic leading-[1.55] text-ink-soft">
            A simple three-step process. No black holes — we acknowledge every
            submission and respond promptly. (Placeholder intro copy, to be
            finalised.)
          </p>
          <div className="mt-12">
            <Accordion items={SUBMISSION} />
          </div>
        </Container>
      </Section>

      {/* Your direct contact. KU-17: editorial two-column layout mirroring the
          contact page — portrait on the left; italic intro + large inquiry
          blocks on the right. */}
      <Section className="border-b border-line">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Placeholder
              label="Image placeholder"
              dims="1000 × 1120px"
              className="w-full"
            />

            <div className="lg:pt-2">
              <Overline>Your direct contact</Overline>
              <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.01em] md:text-[28px]">
                [Contact name]
              </h2>
              <div className="mt-1 text-[15px] text-ink-soft">
                Head of business development
              </div>

              <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-ink-soft md:text-[18px]">
                "We value long-term relationships with deal intermediaries.
                You'll find Kingsway a reliable partner, deal after deal."
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="text-[14px] font-medium text-ink">Deal submissions:</div>
                  <a
                    href="mailto:deals@kingswaycorporation.com"
                    className="mt-1 block text-[18px] tracking-[-0.01em] text-ink transition-opacity hover:opacity-60 md:text-[20px]"
                  >
                    deals@kingswaycorporation.com
                  </a>
                </div>
                <div>
                  <div className="text-[14px] font-medium text-ink">Direct line:</div>
                  <a
                    href="tel:+10000000000"
                    className="mt-1 block text-[18px] tracking-[-0.01em] text-ink transition-opacity hover:opacity-60 md:text-[20px]"
                  >
                    +1 (000) 000-0000
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <Button href="mailto:deals@kingswaycorporation.com">
                  Submit an opportunity
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* KU-18: social proof strip */}
      <SocialProof overline="Partnering with advisors and brokers nationwide" />

      {/* What intermediaries say */}
      <Section warm>
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeading>What intermediaries say about Kingsway</SectionHeading>
            <span className="rounded-[2px] border border-dashed border-line px-3 py-1.5 text-[12px] text-ink-faint">
              Hidden until quotes confirmed
            </span>
          </div>
          <div className="mt-12 opacity-60">
            <TestimonialGallery items={TESTIMONIALS} />
          </div>
        </Container>
      </Section>
    </>
  )
}

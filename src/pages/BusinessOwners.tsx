import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Placeholder,
} from '../lib/ui'
import Accordion from '../components/Accordion'
import SocialProof from '../components/SocialProof'
import TestimonialGallery, { type Testimonial } from '../components/TestimonialGallery'

const PROMISES = [
  {
    title: 'We keep it whole',
    body: "We don't strip assets or rebrand what works. Your business keeps its identity, people, and culture intact.",
  },
  {
    title: 'Permanent capital, no clock',
    body: "Kingsway isn't a fund with a 10-year exit horizon. We hold businesses for the long run because we're a public company.",
  },
  {
    title: 'A growth partner, not a passive owner',
    body: 'We pair your business with a talented operator and proven KBS playbooks to help it reach its full potential.',
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
              <h1 className="mt-8 text-[44px] font-normal tracking-[-0.03em] md:text-[60px]">
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
      <Section warm>
        <Container>
          <SectionHeading>What we promise</SectionHeading>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-[3px] border border-line bg-paper p-8 lg:p-10">
                <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What we look for. KU-12: image placeholder matches content height. */}
      <Section>
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

      {/* What happens next. KU-11: high-level view, click a step to dive into detail. */}
      <Section warm>
        <Container>
          <SectionHeading>What happens next</SectionHeading>
          <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
            A simple, respectful process — no surprises. Click a step for the detail.
          </p>
          <div className="mt-12">
            <Accordion items={STEPS} />
          </div>
        </Container>
      </Section>

      {/* What sellers say */}
      <Section>
        <Container>
          <SectionHeading>What sellers say about Kingsway</SectionHeading>
          <div className="mt-12">
            <TestimonialGallery items={TESTIMONIALS} />
          </div>
        </Container>
      </Section>

      {/* KU-13: social proof strip */}
      <SocialProof overline="Trusted by owners across essential services" warm />

      {/* Ready to have a conversation — dark. The one CTA this page needs. */}
      <Section dark>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:items-center">
            <div>
              <SectionHeading>Ready to have a conversation?</SectionHeading>
              <p className="mt-5 max-w-[44ch] text-[18px] leading-[1.55] text-paper/60">
                There's no obligation and complete confidentiality from the first
                call.
              </p>
            </div>
            <div className="md:text-right">
              <a
                href="mailto:partnerships@kingswaycorporation.com"
                className="inline-flex items-center gap-3 rounded-[2px] bg-paper px-6 py-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
              >
                Talk to an expert <span aria-hidden>→</span>
              </a>
              <div className="mt-6 text-[15px] text-paper/60">
                partnerships@kingswaycorporation.com
              </div>
              <div className="mt-2 text-[15px] text-paper/60">+1 (000) 000-0000</div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

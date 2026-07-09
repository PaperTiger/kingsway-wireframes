import { Container, Section, Overline, Placeholder } from '../lib/ui'
import AudienceCards from '../components/AudienceCards'

/*
  KU-27: kept deliberately simple. No full contact form; the less the better.
  Editorial two-column layout — a large image alongside a short description
  and labelled inquiry blocks with the addresses set in large type.
  KU-28: routing mirrors the homepage's interactive audience cards.
*/
const SPECIFIC = [
  { title: 'For investors', desc: 'Investment story & IR resources', cta: 'Go', href: '/investors' },
  { title: 'For business owners', desc: 'Exit options & acquisition process', cta: 'Go', href: '/business-owners' },
  { title: 'For entrepreneurs', desc: 'The KSX programme', cta: 'Go', href: '/entrepreneurs' },
  { title: 'For intermediaries', desc: 'Criteria & CIM submission', cta: 'Go', href: '/intermediaries' },
]

const INQUIRIES = [
  { label: 'General inquiries:', email: 'hello@kingswaycorporation.com' },
  { label: 'Investor relations:', email: 'ir@kingswaycorporation.com' },
]

export default function TalkToAnExpert() {
  return (
    <>
      <Section className="pt-20 md:pt-24">
        <Container>
          <Overline>Contact us</Overline>
          <h1 className="mt-6 max-w-[14ch] text-[48px] font-normal leading-[1.0] tracking-[-0.03em] md:text-[80px]">
            Talk to an expert
          </h1>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Placeholder
              label="Image placeholder"
              dims="1000 × 1120px"
              className="w-full"
            />

            <div className="lg:pt-2">
              <p className="max-w-[40ch] text-[22px] leading-[1.4] tracking-[-0.01em] md:text-[26px]">
                Kingsway partners with exceptional operators to acquire and grow
                essential-services businesses for the long run.
              </p>
              <p className="mt-6 max-w-[40ch] text-[22px] leading-[1.4] tracking-[-0.01em] md:text-[26px]">
                Tell us who you are and we'll point you to the right person — no
                forms required, and the right person will be in touch within one
                business day.
              </p>

              <div className="mt-12 space-y-8">
                {INQUIRIES.map((q) => (
                  <div key={q.email}>
                    <div className="text-[15px] font-medium text-ink">{q.label}</div>
                    <a
                      href={`mailto:${q.email}`}
                      className="mt-2 block text-[26px] tracking-[-0.01em] text-ink transition-opacity hover:opacity-60 md:text-[32px]"
                    >
                      {q.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Looking for something specific — mirrors the homepage audience cards (KU-28). */}
      <Section warm>
        <Container>
          <Overline>Looking for something specific?</Overline>
          <AudienceCards items={SPECIFIC} columns={4} />
        </Container>
      </Section>
    </>
  )
}

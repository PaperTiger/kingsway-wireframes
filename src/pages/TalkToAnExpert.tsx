import { Container, Section, Overline } from '../lib/ui'
import AudienceCards from '../components/AudienceCards'

/*
  KU-27: kept deliberately simple. No full contact form; the less the better.
  KU-28: routing mirrors the homepage's interactive audience cards.
*/
const SPECIFIC = [
  { title: 'For investors', desc: 'Investment story & IR resources', cta: 'Go', href: '/investors' },
  { title: 'For business owners', desc: 'Exit options & acquisition process', cta: 'Go', href: '/business-owners' },
  { title: 'For entrepreneurs', desc: 'The KSX programme', cta: 'Go', href: '/entrepreneurs' },
  { title: 'For intermediaries', desc: 'Criteria & CIM submission', cta: 'Go', href: '/intermediaries' },
]

export default function TalkToAnExpert() {
  return (
    <>
      <Section className="pt-20 md:pt-24">
        <Container>
          <Overline>Let's talk</Overline>
          <h1 className="mt-8 max-w-[16ch] text-[44px] font-normal tracking-[-0.03em] md:text-[64px]">
            Talk to an expert
          </h1>
          <p className="mt-8 max-w-[52ch] text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
            Tell us who you are and we'll point you to the right person. The fastest
            way to reach us is a direct email — no forms required. The right person
            will be in touch within one business day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="mailto:hello@kingswaycorporation.com"
              className="inline-flex items-center gap-3 rounded-[2px] bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-90"
            >
              Email us <span aria-hidden>→</span>
            </a>
            <div className="text-[16px]">
              <span className="text-ink-soft">hello@kingswaycorporation.com</span>
              <span className="mx-3 text-line">·</span>
              <span className="text-ink-soft">+1 (000) 000-0000</span>
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

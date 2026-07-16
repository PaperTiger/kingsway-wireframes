import { Container, Section, Overline } from '../lib/ui'
import { LogoPlaceholder } from '../lib/ui'

/*
  Social proof strip (KU-13, KU-18, KU-24, KU-26).
  A trust bar: short overline + a row of partner/press logo placeholders.
  Distinct from the testimonial sections already on each page.
*/
export default function SocialProof({
  overline = 'Trusted across essential services',
  warm = false,
  count = 5,
  className = '',
}: {
  overline?: string
  warm?: boolean
  count?: number
  className?: string
}) {
  return (
    <Section warm={warm} className={`py-14 md:py-16 ${className}`}>
      <Container>
        <Overline className="text-center">{overline}</Overline>
        <div className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: count }).map((_, i) => (
            <LogoPlaceholder key={i} label="Logo" className="h-14 w-full" />
          ))}
        </div>
      </Container>
    </Section>
  )
}

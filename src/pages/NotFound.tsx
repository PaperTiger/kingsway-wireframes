import { Container, Section, Overline, SectionHeading, TextLink } from '../lib/ui'

export default function NotFound() {
  return (
    <Section className="pt-24 md:pt-32">
      <Container>
        <Overline>404</Overline>
        <SectionHeading>Page not found</SectionHeading>
        <div className="mt-8">
          <TextLink href="/">← Back to home</TextLink>
        </div>
      </Container>
    </Section>
  )
}

import { useState } from 'react'
import {
  Container,
  Section,
  Overline,
  SectionHeading,
  OutlineButton,
  Placeholder,
} from '../lib/ui'

const VALUES = [
  { n: '01', title: 'Permanent stewardship', body: 'Evergreen ownership, not flip-and-exit. We hold companies indefinitely and make decisions on a decade timescale, never under pressure to sell.' },
  { n: '02', title: 'Entrepreneurial empowerment', body: 'Backing talented operators with real autonomy. We hire great people and trust them to lead — providing capital, infrastructure, and support without micromanaging.' },
  { n: '03', title: 'Legacy preservation', body: 'Honouring what founders worked hard to build. We protect the culture, the name, the team, and the community the business serves.' },
  { n: '04', title: 'Disciplined process', body: 'The Kingsway Business System as a repeatable engine. Rigour in acquisition, integration, and operations ensures every company improves under our ownership.' },
  { n: '05', title: 'Radical transparency', body: 'A commitment to public company accountability. We report openly, communicate plainly, and hold ourselves to the same standards we expect of our operators.' },
]

const KBS = ['[KBS pillar 1 name]', '[KBS pillar 2 name]', '[KBS pillar 3 name]', '[KBS pillar 4 name]']

type Member = { name: string; title: string; bio: string }

const EXEC: Member[] = [
  { name: '[Executive name 1]', title: '[Title]', bio: '3–4 sentence bio placeholder. Background, prior experience, and relevant expertise described here.' },
  { name: '[Executive name 2]', title: '[Title]', bio: '3–4 sentence bio placeholder. Background, prior experience, and relevant expertise described here.' },
  { name: '[Executive name 3]', title: '[Title]', bio: '3–4 sentence bio placeholder. Background, prior experience, and relevant expertise described here.' },
]
const BOARD: Member[] = [
  { name: '[Director 1]', title: '[Title / affiliation]', bio: 'Short bio — 2 sentences describing background and board contribution.' },
  { name: '[Director 2]', title: '[Title / affiliation]', bio: 'Short bio — 2 sentences describing background and board contribution.' },
  { name: '[Director 3]', title: '[Title / affiliation]', bio: 'Short bio — 2 sentences describing background and board contribution.' },
  { name: '[Director 4]', title: '[Title / affiliation]', bio: 'Short bio — 2 sentences describing background and board contribution.' },
]
const ADVISORS: Member[] = [
  { name: '[Advisor 1]', title: '[Background / expertise]', bio: 'Short note on area of expertise and how they advise the KSX programme.' },
  { name: '[Advisor 2]', title: '[Background / expertise]', bio: 'Short note on area of expertise and how they advise the KSX programme.' },
  { name: '[Advisor 3]', title: '[Background / expertise]', bio: 'Short note on area of expertise and how they advise the KSX programme.' },
  { name: '[Advisor 4]', title: '[Background / expertise]', bio: 'Short note on area of expertise and how they advise the KSX programme.' },
]

function LinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-ink-faint">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

/* KU-29: team layout with more information on click, cleanly separated by team. */
function MemberGrid({ members, avatar = 'round' }: { members: Member[]; avatar?: 'round' | 'photo' }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m, i) => {
        const isOpen = open === i
        return (
          <button
            key={i}
            type="button"
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            className="flex flex-col rounded-[3px] border border-line p-6 text-left transition-colors hover:border-ink-faint"
          >
            <div className="flex items-start justify-between">
              {avatar === 'photo' ? (
                <div className="h-16 w-16 bg-ph" />
              ) : (
                <div className="h-14 w-14 rounded-full bg-ph" />
              )}
              <LinkedIn />
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[17px] font-semibold">{m.name}</div>
                <div className="mt-1 text-[14px] text-ink-soft">{m.title}</div>
              </div>
              <span className={`text-[18px] leading-none text-ink-faint transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </div>
            <div className={`grid transition-all duration-300 ${isOpen ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="text-[14px] leading-[1.6] text-ink-soft">{m.bio}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

/*
  Executive card (Lattice style): large headshot by default; on click the headshot
  smoothly shrinks and moves up, and the bio reveals. Chevron flips.
*/
function ExecCard({ m }: { m: Member }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="flex w-full flex-col rounded-[3px] border border-line bg-paper p-6 text-left transition-colors hover:border-ink-faint"
    >
      <div
        className={`overflow-hidden rounded-[2px] bg-ph transition-all duration-500 ease-in-out ${
          open ? 'h-20 w-20' : 'h-[280px] w-full'
        }`}
      />
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-[18px] font-semibold">{m.name}</div>
          <div className="mt-2 inline-block rounded-[2px] bg-paper-warm px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-soft">
            {m.title}
          </div>
        </div>
        <span
          aria-hidden
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
      <div className={`grid transition-all duration-500 ease-in-out ${open ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="text-[14px] leading-[1.65] text-ink-soft">{m.bio}</p>
        </div>
      </div>
    </button>
  )
}

export default function About() {
  return (
    <>
      {/* Hero. KU-6: image with text overlay execution. 100vh billboard; the header overlays it. */}
      <section className="relative -mt-20 h-screen overflow-hidden">
        <Placeholder dark label="Hero image" dims="1600 × 900px — visual content TBD" className="absolute inset-0 h-full w-full" />
        <div className="relative flex h-full items-center">
          <Container>
            <div className="max-w-[46rem] text-paper">
              <Overline className="text-paper/60">About Kingsway Corporation</Overline>
              <h1 className="mt-8 text-[44px] font-semibold tracking-[-0.03em] md:text-[68px]">
                Who we are
              </h1>
              <p className="mt-6 max-w-[52ch] text-[19px] leading-[1.5] text-paper/75 md:text-[22px]">
                Kingsway is a public evergreen owner of entrepreneur-led, essential
                services businesses. We combine permanent capital with exceptional
                talent, a decentralised operating model, and the Kingsway Business
                System to buy and build great companies.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* Our mission — dark band */}
      <Section dark>
        <Container>
          <Overline className="text-paper/50">Our mission</Overline>
          <p className="mt-8 max-w-[24ch] text-[38px] font-normal tracking-[-0.02em] md:text-[56px]">
            We provide a permanent, responsible exit for small business owners who
            have built something worth protecting — and pair their companies with
            the talent and systems to grow.
          </p>
        </Container>
      </Section>

      {/* What we stand for */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.85fr_1.5fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <Overline>What we stand for</Overline>
              <SectionHeading className="mt-6">Five principles that guide every decision</SectionHeading>
              <p className="mt-6 max-w-[40ch] text-[17px] leading-[1.6] text-ink-soft">
                From how we acquire companies to how we support our operators — these
                values define what Kingsway is.
              </p>
            </div>
            <div className="border-y border-line">
              {VALUES.map((v, i) => (
                <div key={v.n} className={`py-12 ${i > 0 ? 'border-t border-line' : ''}`}>
                  <div className="text-[13px] font-medium tabular-nums text-line">{v.n}</div>
                  <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.01em]">{v.title}</h3>
                  <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.65] text-ink-soft">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* How we operate */}
      <Section warm>
        <Container>
          <SectionHeading>How we operate</SectionHeading>
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 md:gap-16">
            <div>
              <Overline>Why Kingsway exists</Overline>
              <h3 className="mt-5 text-[30px] font-semibold tracking-[-0.02em] md:text-[38px]">
                SMB succession is a structural problem
              </h3>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-soft">
                Millions of business owners will retire without a logical succession
                plan. Kingsway provides the solution: permanent capital, a
                professional operator, and a system to grow the business long after
                the founder steps back.
              </p>
            </div>
            <Placeholder label="Image placeholder" dims="640 × 480px — visual content TBD" className="w-full self-start" />
          </div>

          <div className="my-16 border-t border-line" />

          <div className="grid items-center gap-10 lg:grid-cols-2 md:gap-16">
            <Placeholder label="Image placeholder" dims="640 × 480px — visual content TBD" className="order-2 w-full self-start lg:order-1" />
            <div className="order-1 lg:order-2">
              <Overline>What we do</Overline>
              <h3 className="mt-5 text-[30px] font-semibold tracking-[-0.02em] md:text-[38px]">
                Operators, capital, and systems — together
              </h3>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.65] text-ink-soft">
                We recruit exceptional entrepreneurs, back them with Kingsway capital,
                and help them acquire small, high-growth essential services
                businesses. Unlike private equity, we hold indefinitely. Unlike
                traditional search funds, we provide full infrastructure, support,
                and a brand behind every operator.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kingsway Business System */}
      <Section warm>
        <Container>
          <SectionHeading>The Kingsway Business System</SectionHeading>
          <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.55] text-ink-soft">
            KBS is our shared operating platform — a set of proven playbooks and
            tools that help every portfolio company perform at its best, while
            preserving its autonomy.
          </p>
          <div className="mt-14 grid grid-cols-1 divide-y divide-line border border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {KBS.map((title) => (
              <div key={title} className="p-8">
                <div className="flex h-10 w-10 items-center justify-center bg-ph">
                  <div className="h-4 w-4 border border-ink-faint" />
                </div>
                <h3 className="mt-6 text-[18px] font-semibold">{title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                  Description TBD per brand guidelines. 2–3 sentences on what this
                  pillar does for portfolio companies.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our team. KU-29: grouped by team, more info on click. */}
      <Section>
        <Container>
          <SectionHeading>Our team</SectionHeading>
          <p className="mt-5 text-[18px] text-ink-soft md:text-[20px]">
            Cleanly separated by team. Select a person for more detail.
          </p>

          <div className="mt-12">
            <Overline>Executive team</Overline>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {EXEC.map((m) => (
                <ExecCard key={m.name} m={m} />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Overline>Board of directors</Overline>
            <MemberGrid members={BOARD} />
          </div>

          {/* KU-30: "don't think we need this here" — flagged for confirmation. */}
          <div className="mt-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dashed border-ink-faint px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-ink-faint">
              Flagged (KU-30): do we need this here?
            </div>
            <Overline>KSX advisory board</Overline>
            <MemberGrid members={ADVISORS} />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 md:items-center">
            <div>
              <SectionHeading>Want to learn more or get in touch?</SectionHeading>
              <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.55] text-ink-soft">
                Whether you're an investor, a business owner, or a prospective
                operator — we'd like to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <OutlineButton href="/talk-to-an-expert">Talk to an expert</OutlineButton>
              <OutlineButton href="/investors">Investor information</OutlineButton>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

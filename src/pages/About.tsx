import { useState } from 'react'
import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Placeholder,
} from '../lib/ui'
import Carousel from '../components/Carousel'

const VALUES = [
  { n: '1', category: 'Ownership', title: 'Permanent stewardship', body: 'Evergreen ownership, not fix-and-flip. We hold companies indefinitely and make decisions on a decades timescale, never under pressure to sell.' },
  { n: '2', category: 'Autonomy', title: 'Entrepreneurial empowerment', body: 'Backing talented operators with real autonomy. We hire great people and trust them to lead — providing capital, infrastructure, and support without micromanaging.' },
  { n: '3', category: 'Legacy', title: 'Legacy preservation', body: 'Honouring what founders worked hard to build. We protect the culture, the name, the team, and the community the business serves.' },
  { n: '4', category: 'Process', title: 'Disciplined process', body: 'The Kingsway Business System as a repeatable engine. Rigour in acquisition, integration, operations, and growth ensures every company improves under our ownership.' },
  { n: '5', category: 'Accountability', title: 'Full transparency', body: 'Accountability of a publicly-traded company. We report openly, communicate plainly, and hold ourselves to the same standards we expect of our operators.' },
]

const KBS = [
  {
    name: 'Leadership training',
    icon: 'M22 9l-10 -4l-10 4l10 4l10 -4v6 M6 10.6v5.4c0 1 2.7 2 6 2s6 -1 6 -2v-5.4',
    teaser:
      'Builds leaders through disciplined practice, self-awareness, and the consistent use of proven tools — not charisma or instinct alone.',
    detail:
      'By helping CEOs create inspiration, shape strong teams, chart the course, translate strategy into action, follow through, communicate clearly, and manage time effectively, KBS develops leaders who can align people, execute with discipline, and continuously improve themselves and their businesses.',
  },
  {
    name: 'Data and daily management',
    icon: 'M4 20h16 M7 16v-5 M12 16V8 M17 16v-7',
    teaser:
      'Makes performance visible, measurable, and actionable across the business.',
    detail:
      'By translating strategy into weekly scorecards, clear ownership, and daily operating rhythms, leaders can spot issues early, solve them with facts, and keep teams aligned on the activities that drive growth, cash, and continuous improvement.',
  },
  {
    name: 'Talent',
    icon: 'M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2 M16 3.13a4 4 0 0 1 0 7.75 M21 21v-2a4 4 0 0 0 -3 -3.85',
    teaser:
      'The KBS system for attracting, developing, retaining, and rewarding the right people in the right seats.',
    detail:
      'By using clear accountabilities, rigorous hiring, objective talent assessment, continuous performance management, aligned incentives, effective onboarding, and fair treatment of underperformance, leaders build meritocratic teams where A-players thrive and people decisions drive business performance.',
  },
  {
    name: 'Enterprise excellence',
    icon: 'M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0 M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889 M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889',
    teaser:
      'The KBS system for making work visible, improving flow, and sustaining better performance across the business.',
    detail:
      'By using tools like Gemba walks, 5S, value stream mapping, Kaizen, standard work, and daily management, leaders eliminate waste, reduce errors, shorten lead times, and build a culture where continuous improvement becomes part of how the company operates every day.',
  },
  {
    name: 'Plan and policy deployment',
    icon: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0 M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0 M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0',
    teaser:
      'The KBS system for turning vision and strategy into focused execution.',
    detail:
      'It defines where the business is going, how it will win, and which breakthrough priorities matter most — then deploys those priorities through clear ownership, aligned action plans, measurable targets, and regular review so strategy becomes daily progress, not an annual offsite artifact.',
  },
  {
    name: 'Growth',
    icon: 'M3 17l6 -6l4 4l8 -8 M14 7l7 0l0 7',
    teaser:
      'The KBS system for building profitable, customer-driven growth — not growth for growth’s sake.',
    detail:
      'By understanding unit economics, listening to the Voice of the Customer, strengthening retention, optimizing pricing, expanding customer relationships, entering attractive markets, and building disciplined sales capability, leaders create growth that compounds value.',
  },
]

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

/* KU-29: team layout, cleanly separated by team. Non-executive members are
   static cards — no plus sign / expand-to-reveal (that's reserved for the
   executive team's ExecCard). */
function MemberGrid({ members, avatar = 'round' }: { members: Member[]; avatar?: 'round' | 'photo' }) {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m, i) => (
        <div
          key={i}
          className="flex flex-col rounded-[3px] border border-line p-6"
        >
          <div className="flex items-start justify-between">
            {avatar === 'photo' ? (
              <div className="h-16 w-16 bg-ph" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-ph" />
            )}
            <LinkedIn />
          </div>
          <div className="mt-5">
            <div className="text-[17px] font-semibold">{m.name}</div>
            <div className="mt-1 text-[14px] text-ink-soft">{m.title}</div>
          </div>
        </div>
      ))}
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

/*
  KBS carousel card: icon top-left, toggle button top-right. A teaser is shown
  first; clicking the button crossfades it out and reveals the fuller detail.
*/
function KbsCard({
  item,
}: {
  item: { name: string; icon: string; teaser: string; detail: string }
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex h-[440px] w-[300px] shrink-0 snap-start flex-col rounded-[12px] border border-line bg-paper p-6 sm:w-[340px]">
      {/* Header: icon left, toggle right */}
      <div className="flex items-center justify-between">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink"
          aria-hidden
        >
          <path d={item.icon} />
        </svg>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Show less' : 'Show more'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
            className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.01em]">
        {item.name}
      </h3>

      {/* Description sits at the bottom. On open the teaser fades out and the
          detail fades up from the bottom. */}
      <div className="relative mt-4 flex-1">
        <p
          className={`absolute inset-x-0 bottom-0 text-[15px] leading-[1.6] text-ink-soft transition-opacity duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {item.teaser}
        </p>
        <p
          className={`absolute inset-x-0 bottom-0 text-[15px] leading-[1.6] text-ink-soft transition-all duration-500 ${
            open ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-4 opacity-0'
          }`}
        >
          {item.detail}
        </p>
      </div>
    </div>
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
                talent, a decentralized operating model, and the Kingsway Business
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
            We provide a permanent, responsible home for small business owners who
            have built something worth protecting — and pair their companies with
            the talent and systems to grow.
          </p>
        </Container>
      </Section>

      {/* What we stand for. Same stacking-scroll layout as "Why choose the KSX
          platform" (Entrepreneurs): each principle pins and the next panel
          scrolls up to overlap it. Sticky stacking on desktop; plain stacked
          blocks on mobile. */}
      <section className="bg-paper pt-20 md:pt-28">
        <Container>
          <Overline>What we stand for</Overline>
          <SectionHeading className="mt-6">
            Five principles that guide every decision
          </SectionHeading>
          <p className="mt-5 max-w-[46ch] text-[18px] text-ink-soft md:text-[20px]">
            From how we acquire companies to how we support our operators — these
            values define what Kingsway is.
          </p>
        </Container>

        <div className="mt-12">
          {VALUES.map((v) => (
            <div
              key={v.n}
              className="border-t border-line bg-paper lg:sticky lg:top-0 lg:min-h-screen lg:shadow-[0_-16px_40px_-28px_rgba(0,0,0,0.25)]"
            >
              <Container>
                <div className="grid gap-x-10 gap-y-6 py-14 md:py-20 lg:grid-cols-[minmax(0,180px)_minmax(0,160px)_minmax(0,1fr)] lg:items-start lg:py-28">
                  <div className="text-[88px] font-medium leading-[0.8] tracking-[-0.03em] md:text-[160px]">
                    {v.n}
                  </div>
                  <div className="text-[16px] text-ink-soft">({v.category})</div>
                  <div>
                    <h3 className="max-w-[16ch] text-[32px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[52px]">
                      {v.title}
                    </h3>
                    <div className="mt-8 max-w-[420px] lg:mt-10">
                      <Placeholder
                        label="Image placeholder"
                        dims="1000 × 560px"
                        className="w-full"
                      />
                    </div>
                    <p className="mt-8 max-w-[52ch] text-[17px] leading-[1.6] text-ink-soft md:text-[19px]">
                      {v.body}
                    </p>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </section>

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
                plan. Kingsway provides the solution: a permanent home, a
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
                We recruit exceptional entrepreneurs, back them with Kingsway
                resources and capital, and help them acquire small, high-growth
                essential services businesses. Unlike private equity, we hold
                indefinitely. Unlike traditional search funds, we provide full
                infrastructure, support, and the weight of a public company behind
                every operator.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kingsway Business System — horizontal carousel. Divider separates it
          from the section above. */}
      <Section warm className="border-t border-line">
        <Container>
          <SectionHeading>The Kingsway Business System</SectionHeading>
          <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.55] text-ink-soft">
            KBS is our shared operating platform — a set of beliefs, proven
            playbooks and tools that help every portfolio company perform at its
            best, while preserving its autonomy.
          </p>
          <div className="mt-14">
            <Carousel>
              {KBS.map((k) => (
                <KbsCard key={k.name} item={k} />
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      {/* Our team. KU-29: grouped by team, more info on click. */}
      <Section>
        <Container>
          <SectionHeading>Our team</SectionHeading>

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

    </>
  )
}

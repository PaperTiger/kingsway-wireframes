import { useState } from 'react'
import { Link } from 'wouter'
import {
  Container,
  Section,
  Overline,
  SectionHeading,
  Lede,
  Placeholder,
  LogoPlaceholder,
} from '../lib/ui'
import SocialProof from '../components/SocialProof'

type Company = {
  name: string
  sector: string
  location: string
  year: string
  ceo: string
  blurb: string
}

const SECTORS = ['All', 'Skilled trades', 'Healthcare', 'B2B services', 'Vertical SaaS']

const COMPANIES: Company[] = [
  { name: 'Company name A', sector: 'Skilled trades', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name B', sector: 'Healthcare', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name C', sector: 'B2B services', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name D', sector: 'Skilled trades', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name E', sector: 'B2B services', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name F', sector: 'Healthcare', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name G', sector: 'Vertical SaaS', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
  { name: 'Company name H', sector: 'Skilled trades', location: 'State, region', year: '20XX', ceo: '[CEO name]', blurb: 'One-line description of what this company does, expanded here into a short paragraph for the detail panel.' },
]

/* KU-25: minimal cards, fuller detail in a side panel (a16z-style). No individual company pages. */
function Drawer({ company, onClose }: { company: Company | null; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-50 ${company ? '' : 'pointer-events-none'}`} aria-hidden={!company}>
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity ${company ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-[460px] overflow-y-auto bg-paper p-8 shadow-xl transition-transform md:p-10 ${
          company ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {company && (
          <>
            <div className="flex items-start justify-between">
              <LogoPlaceholder className="h-16 w-32" />
              <button type="button" onClick={onClose} aria-label="Close" className="text-[22px] leading-none text-ink-soft hover:text-ink">
                ×
              </button>
            </div>
            <h3 className="mt-8 text-[30px] font-semibold tracking-[-0.02em]">{company.name}</h3>
            <div className="mt-2 inline-flex rounded-full border border-line px-3 py-1 text-[13px] text-ink-soft">
              {company.sector}
            </div>
            <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft">{company.blurb}</p>
            <dl className="mt-8 space-y-4 border-t border-line pt-6 text-[15px]">
              <div className="flex justify-between gap-6"><dt className="text-ink-faint">Location</dt><dd>{company.location}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-ink-faint">Acquired</dt><dd>{company.year}</dd></div>
              <div className="flex justify-between gap-6"><dt className="text-ink-faint">CEO / OIR</dt><dd>{company.ceo}</dd></div>
            </dl>
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium underline underline-offset-4">
              Visit company website →
            </a>
          </>
        )}
      </aside>
    </div>
  )
}

export default function Companies() {
  const [sector, setSector] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Company | null>(null)

  const filtered = COMPANIES.filter(
    (c) => (sector === 'All' || c.sector === sector) && c.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-24">
        <Container>
          <Overline>Our portfolio</Overline>
          <div className="mt-8 grid gap-10 lg:grid-cols-2 md:gap-16 lg:items-center">
            <h1 className="text-[46px] font-semibold tracking-[-0.03em] md:text-[64px]">Our companies</h1>
            <div className="flex items-center">
              <Lede>
                A growing family of entrepreneur-led, essential services businesses
                serving customers across North America.
              </Lede>
            </div>
          </div>
        </Container>
      </Section>

      {/* Filter bar */}
      <div className="border-y border-line bg-paper-warm">
        <Container>
          <div className="flex flex-wrap items-center gap-4 py-5">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies..."
                className="w-[220px] rounded-[2px] border border-line bg-paper py-2.5 pl-9 pr-3 text-[14px] outline-none focus:border-ink-faint"
              />
            </div>
            <span className="ml-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-faint">Sector</span>
            <div className="flex flex-wrap gap-2.5">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSector(s)}
                  className={`rounded-[2px] border px-4 py-2 text-[14px] transition-colors ${
                    sector === s ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink hover:border-ink-faint'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Company grid — KU-25: minimal cards */}
      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelected(c)}
                className="group flex flex-col rounded-[3px] border border-line bg-paper p-7 text-left transition-colors hover:border-ink-faint"
              >
                <LogoPlaceholder className="h-16 w-28" />
                <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.01em]">{c.name}</h3>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-[0.1em] text-ink-faint">{c.sector}</div>
                <span className="mt-5 text-[14px] font-medium text-ink underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                  View details →
                </span>
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* In focus */}
      <Section warm>
        <Container>
          <Overline className="mb-8">In focus</Overline>
          <div className="grid overflow-hidden rounded-[3px] border border-line md:grid-cols-[1.7fr_1fr]">
            <div className="bg-paper p-8 md:p-12">
              <LogoPlaceholder className="h-16 w-32" />
              <div className="mt-6 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint">
                [Sector] · [Location] · Acquired [year]
              </div>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.65] text-ink-soft">
                [Company name] was acquired in [year] through the KSX programme.
                Since then, revenue has grown [X]% and the team has expanded from [X]
                to [X] employees — a result of applying the KBS across operations,
                sales, and talent.
              </p>
              <blockquote className="mt-8 border-l-2 border-ink pl-6 text-[20px] leading-[1.4] tracking-[-0.01em]">
                "Working with Kingsway gave me the capital and coaching I needed to
                acquire a great business — and the support to actually run it well."
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                <div className="h-11 w-11 rounded-full bg-ph" />
                <div>
                  <div className="text-[15px] font-semibold">[CEO name]</div>
                  <div className="text-[14px] text-ink-soft">CEO, [Company name]</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-dark p-10 text-center">
              <LogoPlaceholder dark label="Logo (white)" className="mb-6 h-20 w-36" />
              <div className="text-[16px] font-semibold text-paper">[CEO name]</div>
              <div className="mt-1 text-[14px] text-paper/50">CEO, [Company name]</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* KU-26: social proof strip */}
      <SocialProof overline="Serving customers across North America" />

      {/* Pipeline CTA */}
      <Section warm>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center">
              <SectionHeading>Know a company that would fit?</SectionHeading>
              <p className="mt-5 max-w-[52ch] text-[18px] leading-[1.55] text-ink-soft">
                Whether you're a business owner thinking about succession or an
                intermediary with a client opportunity, we'd like to hear from you.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Link href="/business-owners" className="rounded-[3px] border border-line bg-paper p-6 transition-colors hover:border-ink-faint">
                  <div className="flex items-center gap-2 text-[17px] font-semibold">I'm a business owner <span aria-hidden>→</span></div>
                  <div className="mt-1 text-[14px] text-ink-soft">Explore a Kingsway exit</div>
                </Link>
                <Link href="/intermediaries" className="rounded-[3px] border border-line bg-paper p-6 transition-colors hover:border-ink-faint">
                  <div className="flex items-center gap-2 text-[17px] font-semibold">I'm an intermediary <span aria-hidden>→</span></div>
                  <div className="mt-1 text-[14px] text-ink-soft">Submit a client opportunity</div>
                </Link>
              </div>
            </div>
            <Placeholder label="Image placeholder" dims="420 × 340px" className="w-full self-start" />
          </div>
        </Container>
      </Section>

      <Drawer company={selected} onClose={() => setSelected(null)} />
    </>
  )
}

import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { Container } from '../lib/ui'

const AUDIENCES = [
  {
    overline: 'The equity story',
    title: 'For investors',
    desc: 'Understand our compounding model and permanent capital advantage.',
    href: '/investors',
  },
  {
    overline: 'A permanent home',
    title: 'For business owners',
    desc: 'A responsible exit that honours your legacy, your people, and your culture.',
    href: '/business-owners',
  },
  {
    overline: 'A reliable buyer',
    title: 'For intermediaries',
    desc: 'Clear criteria, quick feedback, and no re-trading. Submit a CIM directly.',
    href: '/intermediaries',
  },
  {
    overline: 'Become a CEO',
    title: 'For entrepreneurs',
    desc: 'Capital, coaching, and infrastructure to find and run your first business.',
    href: '/entrepreneurs',
  },
]

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute inset-x-0 top-full border-t border-line bg-paper shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)]">
      <Container>
        <div className="grid grid-cols-1 gap-y-8 py-12 md:grid-cols-5 md:gap-x-10">
          <div className="md:border-r md:border-line md:pr-10">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint">
              Explore
            </p>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.01em]">
              Who we work with
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
              Kingsway serves four distinct audiences. Each has a dedicated page
              with relevant information.
            </p>
            <Link
              href="/about"
              onClick={onNavigate}
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-ink"
            >
              About us <span aria-hidden>→</span>
            </Link>
          </div>

          {AUDIENCES.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              onClick={onNavigate}
              className="group block"
            >
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                {a.overline}
              </p>
              <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.01em]">
                {a.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-soft">
                {a.desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-ink">
                Explore{' '}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

function Header() {
  const [location] = useLocation()
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = location === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the homepage the header overlays the dark billboard (white text) until you
  // scroll or open a menu, then fades to the solid white bar with black text.
  const overlay = isHome && !scrolled && !mega && !mobile

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        overlay
          ? 'border-b border-transparent bg-transparent text-paper'
          : 'border-b border-line bg-paper text-ink'
      }`}
    >
      <div onMouseLeave={() => setMega(false)}>
        <Container>
          <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
            <Link href="/" className="text-[20px] font-semibold tracking-[-0.02em]">
              Kingsway
            </Link>

            <nav className="hidden items-center gap-9 lg:flex">
              <button
                type="button"
                onMouseEnter={() => setMega(true)}
                onClick={() => setMega((v) => !v)}
                aria-expanded={mega}
                className="inline-flex items-center gap-1.5 text-[15px]"
              >
                Work with us
                <svg
                  aria-hidden
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`mt-0.5 transition-transform ${mega ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <Link
                href="/companies"
                onMouseEnter={() => setMega(false)}
                className="text-[15px]"
              >
                Our companies
              </Link>
              <Link
                href="/about"
                onMouseEnter={() => setMega(false)}
                className="text-[15px]"
              >
                About us
              </Link>
            </nav>

            <div className="col-start-3 flex items-center justify-end gap-3">
              <Link
                href="/talk-to-an-expert"
                className={`hidden items-center rounded-[2px] px-5 py-3 text-[15px] font-medium transition-colors hover:opacity-90 md:inline-flex ${
                  overlay ? 'bg-paper text-ink' : 'bg-ink text-paper'
                }`}
              >
                Talk to an expert
              </Link>
              <button
                type="button"
                aria-label={mobile ? 'Close menu' : 'Open menu'}
                aria-expanded={mobile}
                className="flex h-10 w-10 items-center justify-center lg:hidden"
                onClick={() => setMobile((v) => !v)}
              >
                {mobile ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <div className="space-y-1.5">
                    <span className="block h-0.5 w-6 bg-current" />
                    <span className="block h-0.5 w-6 bg-current" />
                    <span className="block h-0.5 w-6 bg-current" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </Container>

        {mega && (
          <div className="hidden lg:block">
            <MegaMenu onNavigate={() => setMega(false)} />
          </div>
        )}
      </div>

      {mobile && (
        <div className="border-t border-line bg-paper lg:hidden">
          <Container>
            <nav className="py-4">
              <p className="pb-1 pt-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                Work with us
              </p>
              {AUDIENCES.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="block border-b border-line py-4"
                  onClick={() => setMobile(false)}
                >
                  <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                    {a.overline}
                  </span>
                  <span className="mt-1 block text-[20px] font-semibold tracking-[-0.01em]">
                    {a.title}
                  </span>
                </Link>
              ))}
              <Link
                href="/companies"
                className="block border-b border-line py-4 text-[20px] font-semibold tracking-[-0.01em]"
                onClick={() => setMobile(false)}
              >
                Our companies
              </Link>
              <Link
                href="/about"
                className="block py-4 text-[20px] font-semibold tracking-[-0.01em]"
                onClick={() => setMobile(false)}
              >
                About us
              </Link>
              <Link
                href="/talk-to-an-expert"
                className="mt-4 flex items-center justify-center rounded-[2px] bg-ink px-5 py-4 text-[15px] font-medium text-paper"
                onClick={() => setMobile(false)}
              >
                Talk to an expert
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}

function Footer() {
  const cols = [
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About us' },
        { href: '/companies', label: 'Our companies' },
        { href: '/about', label: 'Kingsway Business System' },
      ],
    },
    {
      title: 'Work with us',
      links: [
        { href: '/investors', label: 'For investors' },
        { href: '/business-owners', label: 'For business owners' },
        { href: '/intermediaries', label: 'For intermediaries' },
        { href: '/entrepreneurs', label: 'For entrepreneurs' },
      ],
    },
    {
      title: 'Investor relations',
      links: [
        { href: '/investors', label: 'SEC filings' },
        { href: '/investors', label: 'Earnings' },
        { href: '/investors', label: 'Governance' },
        { href: '/investors', label: 'Stock information' },
        { href: '/investors', label: 'Email alerts' },
      ],
    },
  ]

  return (
    <footer className="bg-dark py-20 text-paper">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <div className="text-[20px] font-semibold tracking-[-0.02em]">Kingsway</div>
            <p className="mt-4 text-[14px] text-paper/60">Building through Search</p>
            <p className="mt-1 text-[13px] tracking-[0.08em] text-paper/40">NYSE: KWY</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.14em] text-paper/40">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-paper/70 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[12px] font-medium uppercase tracking-[0.14em] text-paper/40">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="text-[14px] text-paper/70">General inquiries</li>
              <li className="text-[14px] text-paper/70">Investor relations</li>
            </ul>
            <address className="mt-5 text-[14px] not-italic leading-[1.6] text-paper/50">
              10 S. Riverside Plaza, Ste 1520
              <br />
              Chicago, IL 60606
              <br />
              (312) 766-2138
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-paper/15 pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-paper/50">
            <span>© 2026 Kingsway Corporation. All rights reserved.</span>
            <span>Legal</span>
            <span>WCAG 2.1 AA</span>
          </div>
          <p className="mt-4 max-w-[80ch] text-[12px] leading-[1.6] text-paper/40">
            This website may contain forward-looking statements within the meaning
            of applicable securities legislation. These statements involve known and
            unknown risks and uncertainties that may cause actual results to differ
            materially.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

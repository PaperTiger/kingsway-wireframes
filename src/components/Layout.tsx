import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { Container } from '../lib/ui'
import Logo from './Logo'

/*
  Primary nav, right-justified in the header. About sits left-most.

  KU-31: every pathway carries a dropdown of that page's sections; About and
  Contact are plain links. Dropdown items are hard-coded <a>s (not wouter
  <Link>s) so the browser handles the #anchor scroll — hence the explicit
  /kingsway-wireframes base path.
*/
const BASE = '/kingsway-wireframes'

type NavItem = {
  href: string
  label: string
  blurb?: string
  items?: { hash: string; label: string; desc: string }[]
}

const NAV: NavItem[] = [
  { href: '/about', label: 'About' },
  {
    href: '/companies',
    label: 'Our companies',
    blurb: 'Entrepreneur-led essential services businesses across North America.',
    items: [
      { hash: '#portfolio', label: 'Browse the portfolio', desc: 'Every company, filtered by sector' },
      { hash: '#in-focus', label: 'In focus', desc: 'A closer look at one business' },
      { hash: '#pipeline', label: 'Know a company that would fit?', desc: 'Introduce an opportunity' },
    ],
  },
  {
    href: '/investors',
    label: 'Investors',
    blurb: 'A public, permanent-capital platform compounding for the long run.',
    items: [
      { hash: '#why-invest', label: 'Why invest in Kingsway', desc: 'Four structural advantages' },
      { hash: '#how-it-compounds', label: 'How the model compounds', desc: 'The five-step flywheel' },
      { hash: '#proof', label: 'Proof of model', desc: 'The portfolio today' },
      { hash: '#resources', label: 'Investor resources', desc: 'Filings, earnings, governance' },
      { hash: '#ir-contact', label: 'Contact investor relations', desc: 'Speak to the IR team' },
    ],
  },
  {
    href: '/business-owners',
    label: 'Business owners',
    blurb: 'A permanent home for the business you built.',
    items: [
      { hash: '#promise', label: 'What we promise', desc: 'How we treat your legacy' },
      { hash: '#criteria', label: 'What we look for', desc: 'Whether your business fits' },
      { hash: '#process', label: 'What happens next', desc: 'The process, end to end' },
      { hash: '#testimonials', label: 'What owners say', desc: 'From founders who sold to us' },
    ],
  },
  {
    href: '/intermediaries',
    label: 'Intermediaries',
    blurb: 'A responsive, well-capitalised buyer that closes.',
    items: [
      { hash: '#why', label: 'Why work with Kingsway', desc: 'Clear criteria, permanent capital' },
      { hash: '#criteria', label: 'Our investment criteria', desc: 'Self-qualify a client' },
      { hash: '#submit', label: 'How to submit an opportunity', desc: 'A simple three-step process' },
      { hash: '#direct-contact', label: 'Your direct contact', desc: 'Go straight to the team' },
    ],
  },
  {
    href: '/entrepreneurs',
    label: 'Entrepreneurs',
    blurb: 'Become a CEO through the Kingsway Search Xcelerator.',
    items: [
      { hash: '#why-ksx', label: 'Why choose the KSX platform', desc: 'Five advantages for operators' },
      { hash: '#phases', label: 'Three phases of the programme', desc: 'Search, acquire, grow' },
      { hash: '#profile', label: "What we're looking for", desc: 'The operator profile' },
      { hash: '#apply', label: 'Ready to apply?', desc: 'How to start the conversation' },
    ],
  },
  { href: '/talk-to-an-expert', label: 'Contact' },
]

/*
  A nav entry. Items with sections render a dropdown on hover/focus; the label
  itself stays a link to the page. The wrapper keeps the pointer inside the
  group while travelling from the label down to the panel, so the panel is
  anchored directly beneath with no gap to fall through.
*/
function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const hasMenu = !!item.items?.length
  return (
    <div className="group relative">
      <Link
        href={item.href}
        aria-haspopup={hasMenu || undefined}
        className={`flex items-center gap-1.5 whitespace-nowrap py-7 text-[15px] transition-opacity hover:opacity-70 ${
          active ? 'font-medium' : ''
        }`}
      >
        {item.label}
        {hasMenu && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="mt-0.5 opacity-50 transition-transform duration-200 group-hover:rotate-180"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </Link>

      {hasMenu && (
        <div
          className="invisible absolute left-1/2 top-full z-50 w-[380px] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
        >
          <div className="overflow-hidden rounded-[6px] border border-line bg-paper text-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
            {item.blurb && (
              <p className="border-b border-line bg-paper-warm px-5 py-4 text-[13px] leading-[1.5] text-ink-soft">
                {item.blurb}
              </p>
            )}
            <div className="p-2">
              {item.items!.map((sub) => (
                <a
                  key={sub.hash}
                  href={`${BASE}${item.href}${sub.hash}`}
                  className="block rounded-[3px] px-3 py-2.5 transition-colors hover:bg-paper-warm"
                >
                  <div className="text-[14px] font-medium">{sub.label}</div>
                  <div className="mt-0.5 text-[12.5px] text-ink-soft">{sub.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Header() {
  const [location] = useLocation()
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Pages whose hero is a dark full-bleed billboard the header overlays.
  const overlayRoute =
    location === '/' || location === '/about' || location === '/entrepreneurs'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On those pages the header overlays the dark billboard (white text) until you
  // scroll or open a menu, then fades to the solid white bar with black text.
  const overlay = overlayRoute && !scrolled && !mobile

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        overlay
          ? 'border-b border-transparent bg-transparent text-paper'
          : 'border-b border-line bg-paper text-ink'
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Kingsway — home" className="shrink-0">
            <Logo className="h-auto w-[160px] max-w-full" />
          </Link>

          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV.map((item) => (
                <NavLink key={item.href} item={item} active={location === item.href} />
              ))}
            </nav>

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

      {mobile && (
        <div className="border-t border-line bg-paper lg:hidden">
          <Container>
            {/* The desktop dropdown detail becomes an inline list under each
                pathway — no hover to depend on. */}
            <nav className="py-4">
              {NAV.map((item, i) => (
                <div
                  key={item.href}
                  className={i < NAV.length - 1 ? 'border-b border-line' : ''}
                >
                  <Link
                    href={item.href}
                    className="block pb-3 pt-4 text-[20px] font-semibold tracking-[-0.01em]"
                    onClick={() => setMobile(false)}
                  >
                    {item.label}
                  </Link>
                  {item.items?.length ? (
                    <div className="pb-4">
                      {item.items.map((sub) => (
                        <a
                          key={sub.hash}
                          href={`${BASE}${item.href}${sub.hash}`}
                          className="block py-1.5 text-[15px] text-ink-soft"
                          onClick={() => setMobile(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
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
            <Logo className="h-auto w-[160px] max-w-full" />
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
              <li>
                <Link
                  href="/talk-to-an-expert"
                  className="text-[14px] text-paper/70 transition-colors hover:text-paper"
                >
                  General inquiries
                </Link>
              </li>
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

/*
  Scroll to the #anchor from the URL once the page has actually rendered. On a
  full page load the browser looks for the target before React has mounted it
  and gives up, so the nav dropdown links would otherwise land at the top of
  the page. Same-document hash clicks are handled natively; hashchange covers
  the rest. (Sections carry scroll-margin-top for the sticky header — see
  index.css.)
*/
function useHashScroll() {
  const [location] = useLocation()
  useEffect(() => {
    const jump = () => {
      const { hash } = window.location
      if (!hash) return
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      // Instant, not smooth: this is a deep link landing, so jump straight
      // there the way a native anchor would rather than animating the whole
      // page. (html has scroll-behavior: smooth, which would otherwise apply.)
      el?.scrollIntoView({ behavior: 'instant' })
    }
    const raf = requestAnimationFrame(jump)
    window.addEventListener('hashchange', jump)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('hashchange', jump)
    }
  }, [location])
}

export default function Layout({ children }: { children: ReactNode }) {
  useHashScroll()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

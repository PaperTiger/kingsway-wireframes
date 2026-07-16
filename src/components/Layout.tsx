import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { Container, Placeholder } from '../lib/ui'
import Logo from './Logo'

/*
  Primary nav, right-justified in the header. About sits left-most.

  KU-31: hovering the nav encapsulates it in a card that expands to preview the
  hovered page — image, title, blurb, and a "Learn more" link.
*/
type NavItem = {
  href: string
  label: string
  title: string
  blurb: string
  /* An optional second link in the panel, alongside "Learn more". */
  extra?: { label: string; href: string }
}

const NAV: NavItem[] = [
  {
    href: '/about',
    label: 'About',
    title: 'Who we are',
    blurb:
      'A public, evergreen owner of entrepreneur-led essential services businesses — built on the Kingsway Business System.',
  },
  {
    href: '/companies',
    label: 'Our companies',
    title: 'Our companies',
    blurb:
      'A growing family of entrepreneur-led, essential services businesses serving customers across North America.',
  },
  {
    href: '/investors',
    label: 'Investors',
    title: 'The compounding power of entrepreneurship',
    blurb:
      'A public, permanent-capital platform that acquires essential services businesses and compounds them for the long run.',
    // TODO: real IR portal URL pending from the client.
    extra: { label: 'Visit our IR portal', href: '#' },
  },
  {
    href: '/business-owners',
    label: 'Business owners',
    title: 'A permanent home for your business',
    blurb:
      'We buy to hold, not to flip — protecting the culture, the team, and the legacy you spent a career building.',
  },
  {
    href: '/intermediaries',
    label: 'Intermediaries',
    title: 'A reliable buyer for your clients',
    blurb:
      'A responsive, well-capitalised platform with clear investment criteria and a consistent process. We close and we don’t re-trade.',
  },
  {
    href: '/entrepreneurs',
    label: 'Entrepreneurs',
    title: 'Become a CEO through KSX',
    blurb:
      'You bring the talent, ambition, and craft. We bring the capital, coaching, and support to acquire and lead a company.',
  },
  {
    href: '/talk-to-an-expert',
    label: 'Contact',
    title: 'Talk to an expert',
    blurb:
      'Tell us who you are and we’ll point you to the right person — no forms required, and a reply within one business day.',
  },
]

/* Shared by the Investors preview panel and the mobile menu, so the URL only
   has to be filled in once. */
const IR_PORTAL = NAV.find((n) => n.href === '/investors')?.extra

/*
  The nav row plus, when a link is hovered, a preview panel for that page. The
  whole thing sits in a card that only shows its border/shadow while open, so
  the closed state reads as a plain nav.

  The card is absolutely positioned over an invisible spacer of the same nav
  row, so expanding it overlays the page instead of growing the header.
*/
function NavCard({ location }: { location: string }) {
  const [hovered, setHovered] = useState<string | null>(null)
  const open = NAV.find((n) => n.href === hovered) ?? null

  const row = (interactive: boolean) => (
    <div className="flex items-center gap-1">
      {NAV.map((item) => {
        const on = hovered === item.href
        const classes = `whitespace-nowrap rounded-full px-3.5 py-2 text-[15px] transition-colors ${
          on ? 'bg-paper-warm text-ink' : location === item.href ? 'font-medium' : ''
        }`
        return interactive ? (
          <Link
            key={item.href}
            href={item.href}
            className={classes}
            onMouseEnter={() => setHovered(item.href)}
            onFocus={() => setHovered(item.href)}
          >
            {item.label}
          </Link>
        ) : (
          <span key={item.href} className={classes}>
            {item.label}
          </span>
        )
      })}
    </div>
  )

  return (
    <div
      className="relative hidden lg:block"
      onMouseLeave={() => setHovered(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHovered(null)
      }}
    >
      {/* Scrim over the page while the menu is open. It lives inside the
          header, whose own z-50 stacking context already sits above the page,
          so z-40 here puts it under the card (z-50) but over everything else.
          Starts below the header bar so the logo and nav stay undimmed.

          pointer-events-none is load-bearing: the scrim is a child of this
          hover wrapper, so if it captured the pointer, moving onto the page
          would still count as being inside the wrapper and onMouseLeave would
          never fire — leaving the menu stuck open. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 bottom-0 top-20 z-40 bg-ink/20 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Spacer: keeps the header's layout and height stable while the real
          card floats above it. */}
      <div className="invisible p-2" aria-hidden>
        {row(false)}
      </div>

      <div
        className={`absolute right-0 top-0 z-50 rounded-[26px] border p-2 transition-[background-color,border-color,box-shadow] duration-200 ${
          open
            ? 'border-line bg-paper text-ink shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]'
            : 'border-transparent'
        }`}
      >
        {row(true)}

        {open && (
          <div className="grid grid-cols-[320px_1fr] items-start gap-8 px-3 pb-3 pt-5">
            <Placeholder label="Image" className="h-[200px] w-full rounded-[16px]" />
            <div className="flex h-full flex-col">
              <h2 className="text-[22px] font-semibold tracking-[-0.01em]">
                {open.title}
              </h2>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-[1.6] text-ink-soft">
                {open.blurb}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
                <Link
                  href={open.href}
                  className="text-[14px] font-medium underline underline-offset-4"
                >
                  Learn more
                </Link>
                {open.extra && (
                  <a
                    href={open.extra.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium underline underline-offset-4"
                  >
                    {open.extra.label}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className="shrink-0"
                    >
                      <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
                      <path d="M10 14l10 -10" />
                      <path d="M15 4h5v5" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
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
            <NavCard location={location} />

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
            <nav className="py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-line py-4 text-[20px] font-semibold tracking-[-0.01em]"
                  onClick={() => setMobile(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* IR portal sits below the pathways, set smaller. */}
              {IR_PORTAL && (
                <a
                  href={IR_PORTAL.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-4 text-[15px] text-ink-soft"
                  onClick={() => setMobile(false)}
                >
                  {IR_PORTAL.label}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="shrink-0"
                  >
                    <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
                    <path d="M10 14l10 -10" />
                    <path d="M15 4h5v5" />
                  </svg>
                </a>
              )}
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
        { href: '/news', label: 'News & press' },
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
            <Link href="/legal" className="transition-colors hover:text-paper">
              Legal
            </Link>
            <a
              href="https://transparency-in-coverage.uhc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              Transparency in coverage
            </a>
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

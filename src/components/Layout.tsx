import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'wouter'
import { Container } from '../lib/ui'
import Logo from './Logo'

// Primary nav, right-justified in the header. About sits left-most.
const NAV = [
  { href: '/about', label: 'About' },
  { href: '/companies', label: 'Our companies' },
  { href: '/investors', label: 'Investors' },
  { href: '/business-owners', label: 'Business owners' },
  { href: '/intermediaries', label: 'Intermediaries' },
  { href: '/entrepreneurs', label: 'Entrepreneurs' },
  { href: '/talk-to-an-expert', label: 'Contact' },
]

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
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-[15px] transition-opacity hover:opacity-70 ${
                    location === item.href ? 'font-medium' : ''
                  }`}
                >
                  {item.label}
                </Link>
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
            <nav className="py-4">
              {NAV.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-4 text-[20px] font-semibold tracking-[-0.01em] ${
                    i < NAV.length - 1 ? 'border-b border-line' : ''
                  }`}
                  onClick={() => setMobile(false)}
                >
                  {item.label}
                </Link>
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

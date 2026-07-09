import type { ReactNode, CSSProperties } from 'react'
import { Link } from 'wouter'

/* Layout ------------------------------------------------------------------ */

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  )
}

export function Section({
  children,
  warm = false,
  dark = false,
  id,
  className = '',
}: {
  children: ReactNode
  warm?: boolean
  dark?: boolean
  id?: string
  className?: string
}) {
  const bg = dark ? 'bg-dark text-paper' : warm ? 'bg-paper-warm' : 'bg-paper'
  return (
    <section id={id} className={`py-20 md:py-28 ${bg} ${className}`}>
      {children}
    </section>
  )
}

/* Type -------------------------------------------------------------------- */

export function Overline({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-[12px] font-medium uppercase tracking-[0.16em] text-ink-faint ${className}`}
    >
      {children}
    </p>
  )
}

export function SectionHeading({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2
      className={`text-[34px] leading-none font-semibold tracking-[-0.02em] md:text-[46px] ${className}`}
    >
      {children}
    </h2>
  )
}

export function Lede({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={`max-w-[54ch] text-[18px] leading-[1.55] text-ink-soft md:text-[20px] ${className}`}
    >
      {children}
    </p>
  )
}

/* Actions ----------------------------------------------------------------- */

type BtnProps = {
  href: string
  children: ReactNode
  className?: string
}

function isInternal(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

// Solid black rectangular button with a trailing arrow.
export function Button({ href, children, className = '' }: BtnProps) {
  const cls = `inline-flex items-center gap-3 rounded-[2px] bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-90 ${className}`
  const inner = (
    <>
      {children}
      <span aria-hidden className="text-[16px]">→</span>
    </>
  )
  return isInternal(href) ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  )
}

// Outlined rectangular button with a trailing arrow.
export function OutlineButton({ href, children, className = '' }: BtnProps) {
  const cls = `inline-flex items-center gap-3 rounded-[2px] border border-ink px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper ${className}`
  const inner = (
    <>
      {children}
      <span aria-hidden className="text-[16px]">→</span>
    </>
  )
  return isInternal(href) ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  )
}

// Text link with a trailing chevron or arrow.
export function TextLink({
  href,
  children,
  arrow = '→',
  className = '',
}: BtnProps & { arrow?: string }) {
  const cls = `inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-opacity hover:opacity-70 ${className}`
  const inner = (
    <>
      {children}
      <span aria-hidden>{arrow}</span>
    </>
  )
  return isInternal(href) ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  )
}

/* Wireframe image placeholder --------------------------------------------- */

function Aperture({ className = '' }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

// Solid gray placeholder with a centered aperture icon and a caption
// ("label" line + optional "dims" line), matching the wireframe style.
export function Placeholder({
  label,
  dims,
  className = '',
  style,
  dark = false,
}: {
  label?: string
  dims?: string
  className?: string
  style?: CSSProperties
  dark?: boolean
}) {
  // Keep the image's stated ratio (e.g. "960 × 880px" → 960 / 880).
  const m = dims?.match(/(\d+)\s*[×x]\s*(\d+)/)
  const ratioStyle: CSSProperties = m ? { aspectRatio: `${m[1]} / ${m[2]}` } : {}
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        dark ? 'bg-dark text-paper/40' : 'bg-ph text-ink-faint'
      } ${className}`}
      style={{ ...ratioStyle, ...style }}
    >
      <Aperture />
      {(label || dims) && (
        <div className="px-4 text-center">
          {label && <div className="text-[14px]">{label}</div>}
          {dims && <div className="mt-1 text-[13px] opacity-70">{dims}</div>}
        </div>
      )}
    </div>
  )
}

/* Small logo placeholder (word "Logo") ------------------------------------ */

export function LogoPlaceholder({
  className = '',
  label = 'Logo',
  dark = false,
}: {
  className?: string
  label?: string
  dark?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center text-[13px] ${
        dark ? 'text-paper/40' : 'bg-ph text-ink-faint'
      } ${className}`}
    >
      {label}
    </div>
  )
}

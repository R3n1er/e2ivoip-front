'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'

interface CTAButtonProps {
  href: string
  children: ReactNode
  icon?: string
  className?: string
  onClick?: () => void
  external?: boolean
}

function useCTAClick(href: string, children: ReactNode, onClick?: () => void) {
  const pathname = usePathname()

  return () => {
    const eventName = href.startsWith('tel:') ? 'phone_click' : 'cta_click' as const
    const childText = typeof children === 'string' ? children : ''
    trackEvent(eventName, {
      page: pathname || '/',
      element_id: href,
      element_text: childText,
    })
    onClick?.()
  }
}

export function CTAButton({
  href,
  children,
  icon,
  className = '',
  onClick,
  external = false,
}: CTAButtonProps) {
  const handleClick = useCTAClick(href, children, onClick)

  const inner = (
    <span className="block bg-red-primary text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
      {icon && <i className={`lni ${icon} mr-3`} />}
      {children}
    </span>
  )

  if (external) {
    const isTelOrMailto = href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={`monolith-btn ${className}`}
        onClick={handleClick}
        {...(isTelOrMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={`monolith-btn ${className}`} onClick={handleClick}>
      {inner}
    </Link>
  )
}

export function CTAButtonMarine({
  href,
  children,
  icon,
  className = '',
  onClick,
  external = false,
}: CTAButtonProps) {
  const handleClick = useCTAClick(href, children, onClick)

  const inner = (
    <span className="block bg-blue-marine text-white px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
      {icon && <i className={`lni ${icon} mr-3`} />}
      {children}
    </span>
  )

  if (external) {
    const isTelOrMailto = href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={`monolith-btn ${className}`}
        onClick={handleClick}
        {...(isTelOrMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={`monolith-btn ${className}`} onClick={handleClick}>
      {inner}
    </Link>
  )
}

export function CTAButtonSecondary({
  href,
  children,
  icon,
  className = '',
  onClick,
  external = false,
}: CTAButtonProps) {
  const handleClick = useCTAClick(href, children, onClick)

  const inner = (
    <span className="block bg-white text-[#091421] px-10 py-4 text-sm font-black uppercase tracking-[0.2em]">
      {icon && <i className={`lni ${icon} mr-3`} />}
      {children}
    </span>
  )

  if (external) {
    const isTelOrMailto = href.startsWith('tel:') || href.startsWith('mailto:')
    return (
      <a
        href={href}
        className={`monolith-btn ${className}`}
        onClick={handleClick}
        {...(isTelOrMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={`monolith-btn ${className}`} onClick={handleClick}>
      {inner}
    </Link>
  )
}

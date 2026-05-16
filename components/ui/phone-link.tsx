'use client'

import { usePathname } from 'next/navigation'
import { trackEvent } from '@/lib/analytics/track-event'
import type { TerritoryPhone } from '@/lib/constants/phone-numbers'

interface PhoneLinkProps {
  phone: TerritoryPhone
  className?: string
  showTerritory?: boolean
}

export function PhoneLink({ phone, className = '', showTerritory = false }: PhoneLinkProps) {
  const pathname = usePathname()

  return (
    <a
      href={`tel:${phone.tel}`}
      className={`min-h-[44px] inline-flex items-center ${className}`}
      onClick={() => trackEvent('phone_click', {
        page: pathname || '/',
        element_id: `tel:${phone.tel}`,
        element_text: phone.territory,
      })}
    >
      {showTerritory && (
        <span className="text-xs font-black uppercase tracking-[0.3em] mr-2">
          {phone.territory}
        </span>
      )}
      {phone.number}
    </a>
  )
}

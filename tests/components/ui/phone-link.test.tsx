import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { PhoneLink } from '@/components/ui/phone-link'
import { trackEvent } from '@/lib/analytics/track-event'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

// Mock trackEvent
jest.mock('@/lib/analytics/track-event', () => ({
  trackEvent: jest.fn(),
}))

const mockPhone = {
  territory: 'Guadeloupe',
  number: '05 90 17 35 00',
  tel: '+590590173500',
}

describe('PhoneLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders an anchor with href="tel:{phone.tel}"', () => {
    render(<PhoneLink phone={mockPhone} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'tel:+590590173500')
  })

  test('shows phone.number as visible text', () => {
    render(<PhoneLink phone={mockPhone} />)

    expect(screen.getByText('05 90 17 35 00')).toBeInTheDocument()
  })

  test('calls trackEvent phone_click on click', () => {
    render(<PhoneLink phone={mockPhone} />)

    const link = screen.getByRole('link')
    fireEvent.click(link)

    expect(trackEvent).toHaveBeenCalledWith('phone_click', {
      page: '/test-page',
      element_id: 'tel:+590590173500',
      element_text: 'Guadeloupe',
    })
  })

  test('with showTerritory=true renders territory name', () => {
    render(<PhoneLink phone={mockPhone} showTerritory />)

    expect(screen.getByText('Guadeloupe')).toBeInTheDocument()
    expect(screen.getByText('05 90 17 35 00')).toBeInTheDocument()
  })

  test('has min-h-[44px] for touch target accessibility', () => {
    render(<PhoneLink phone={mockPhone} />)

    const link = screen.getByRole('link')
    expect(link.className).toContain('min-h-[44px]')
  })
})

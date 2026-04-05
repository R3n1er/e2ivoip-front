import React from 'react'
import { render, screen } from '@testing-library/react'

const mockInit = jest.fn()
jest.mock('posthog-js', () => ({
  __esModule: true,
  default: {
    init: mockInit,
    __loaded: false,
  },
}))

// Set env var before importing provider
const TEST_KEY = 'phc_test_key_12345'
process.env.NEXT_PUBLIC_POSTHOG_KEY = TEST_KEY

import { PostHogProvider } from '@/lib/analytics/posthog-provider'

describe('PostHogProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children', () => {
    render(
      <PostHogProvider>
        <div data-testid="child">Hello</div>
      </PostHogProvider>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('calls posthog.init with the correct project key', () => {
    render(
      <PostHogProvider>
        <div>Test</div>
      </PostHogProvider>
    )

    expect(mockInit).toHaveBeenCalledWith(
      TEST_KEY,
      expect.any(Object)
    )
  })

  it('configures EU Cloud api_host', () => {
    render(
      <PostHogProvider>
        <div>Test</div>
      </PostHogProvider>
    )

    const initOptions = mockInit.mock.calls[0][1]
    expect(initOptions.api_host).toBe('https://eu.i.posthog.com')
  })

  it('configures cookieless persistence (memory)', () => {
    render(
      <PostHogProvider>
        <div>Test</div>
      </PostHogProvider>
    )

    const initOptions = mockInit.mock.calls[0][1]
    expect(initOptions.persistence).toBe('memory')
  })

  it('does not disable session recording', () => {
    render(
      <PostHogProvider>
        <div>Test</div>
      </PostHogProvider>
    )

    const initOptions = mockInit.mock.calls[0][1]
    expect(initOptions.disable_session_recording).not.toBe(true)
  })
})

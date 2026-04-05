import React from 'react'
import { render, screen } from '@testing-library/react'
import { PostHogProvider } from '@/lib/analytics/posthog-provider'

// PostHog init is now handled by instrumentation-client.ts
// This test only verifies the provider renders children correctly

describe('PostHogProvider', () => {
  it('renders children', () => {
    render(
      <PostHogProvider>
        <div data-testid="child">Hello</div>
      </PostHogProvider>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Configuration globale pour les tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock pour Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock pour Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { div, ...rest } = props
      return React.createElement('div', rest, children)
    },
    span: ({ children, ...props }: any) => {
      const { span, ...rest } = props
      return React.createElement('span', rest, children)
    },
    button: ({ children, ...props }: any) => {
      const { button, ...rest } = props
      return React.createElement('button', rest, children)
    },
  },
  AnimatePresence: ({ children }: any) => children,
})) 
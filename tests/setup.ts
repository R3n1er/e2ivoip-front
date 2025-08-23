import '@testing-library/jest-dom'
import React from 'react'

// Configuration globale pour les tests
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock pour Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
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
jest.mock('framer-motion', () => ({
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
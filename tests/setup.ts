import '@testing-library/jest-dom'
import React from 'react'

// Harmonise Next/Image qualities for tests to silence configuration warnings
const { imageConfigDefault } = require('next/dist/shared/lib/image-config')
imageConfigDefault.qualities = [60, 70, 75, 80, 85, 90]

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

// Mock pour Framer Motion : on ignore les props d'animation pour éviter les warnings React
jest.mock('framer-motion', () => {
  const animationProps = [
    'initial',
    'animate',
    'exit',
    'transition',
    'whileHover',
    'whileTap',
    'variants',
    'layout',
  ]

  const createMotionMock = (tag: keyof JSX.IntrinsicElements) =>
    ({ children, ...props }: any) => {
      const cleanedProps = { ...props }
      for (const prop of animationProps) {
        if (prop in cleanedProps) {
          delete cleanedProps[prop]
        }
      }
      return React.createElement(tag, cleanedProps, children)
    }

  return {
    motion: {
      div: createMotionMock('div'),
      span: createMotionMock('span'),
      button: createMotionMock('button'),
      header: createMotionMock('header'),
      nav: createMotionMock('nav'),
    },
    AnimatePresence: ({ children }: any) => children,
  }
})

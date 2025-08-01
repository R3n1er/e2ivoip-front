import { describe, it, expect } from 'vitest'

describe('Environment Setup', () => {
  it('should have correct Node.js environment', () => {
    expect(process.env.NODE_ENV).toBeDefined()
  })

  it('should have testing environment configured', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })

  it('should have ResizeObserver mocked', () => {
    expect(global.ResizeObserver).toBeDefined()
    expect(typeof global.ResizeObserver).toBe('function')
  })
}) 
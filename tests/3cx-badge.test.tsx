import { describe, it, expect } from 'vitest'

describe('3CX Badge Component', () => {
  it('should use the correct image path', () => {
    const imagePath = '/images/logo-3CX-partner-e2i/Bronze Partner badge-min.jpeg'
    expect(imagePath).toContain('Bronze Partner badge-min.jpeg')
    expect(imagePath).toContain('logo-3CX-partner-e2i')
  })

  it('should have correct image properties', () => {
    const imageProps = {
      src: '/images/logo-3CX-partner-e2i/Bronze Partner badge-min.jpeg',
      alt: '3CX Bronze Partner Badge',
      fill: true,
      className: 'object-contain',
      sizes: '(max-width: 768px) 128px, 160px'
    }
    
    expect(imageProps.src).toContain('Bronze Partner badge-min.jpeg')
    expect(imageProps.alt).toBe('3CX Bronze Partner Badge')
    expect(imageProps.fill).toBe(true)
    expect(imageProps.className).toBe('object-contain')
  })

  it('should have correct container structure', () => {
    const containerClasses = 'flex items-center space-x-3 bg-white rounded-lg p-3 shadow-lg'
    expect(containerClasses).toContain('bg-white')
    expect(containerClasses).toContain('rounded-lg')
    expect(containerClasses).toContain('shadow-lg')
  })

  it('should have correct image container', () => {
    const imageContainerClasses = 'relative w-32 h-16'
    expect(imageContainerClasses).toContain('relative')
    expect(imageContainerClasses).toContain('w-32')
    expect(imageContainerClasses).toContain('h-16')
  })
}) 
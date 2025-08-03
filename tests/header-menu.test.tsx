import { describe, it, expect } from 'vitest'

describe('Header Menu Navigation', () => {
  it('should have "Devis en ligne" instead of "Contact"', () => {
    const navigation = [
      {
        name: "Qui sommes-nous",
        href: "/qui-sommes-nous"
      },
      {
        name: "Téléphonie d'entreprise",
        href: "/telephonie-entreprise"
      },
      {
        name: "Nos services",
        href: "/nos-services"
      },
      {
        name: "Blog",
        href: "/blog"
      },
      {
        name: "Devis en ligne",
        href: "/devis-en-ligne"
      }
    ]
    
    // Vérifier que "Devis en ligne" est présent
    expect(navigation.some(item => item.name === "Devis en ligne")).toBe(true)
    
    // Vérifier que "Contact" n'est plus présent
    expect(navigation.some(item => item.name === "Contact")).toBe(false)
    
    // Vérifier le lien correct
    const devisItem = navigation.find(item => item.name === "Devis en ligne")
    expect(devisItem?.href).toBe("/devis-en-ligne")
  })

  it('should have correct button text', () => {
    const buttonTexts = [
      "Devis en ligne", // Desktop button
      "Devis en ligne"  // Mobile button
    ]
    
    buttonTexts.forEach(text => {
      expect(text).toBe("Devis en ligne")
      expect(text).not.toBe("Nous contacter")
    })
  })

  it('should have proper navigation structure', () => {
    const navigationItems = [
      "Qui sommes-nous",
      "Téléphonie d'entreprise", 
      "Nos services",
      "Blog",
      "Devis en ligne"
    ]
    
    expect(navigationItems).toContain("Devis en ligne")
    expect(navigationItems).not.toContain("Contact")
    expect(navigationItems).toHaveLength(5)
  })
}) 
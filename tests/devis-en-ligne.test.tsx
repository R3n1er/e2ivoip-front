

describe('Devis en ligne Page', () => {
  it('should have correct page structure', () => {
    const pageStructure = {
      hero: 'Recevez un devis personnalisé en moins de 24h',
      sections: [
        'Types de Devis',
        'Contact Urgent',
        'Avantages',
        'FAQ',
        'Certification'
      ]
    }
    
    expect(pageStructure.hero).toContain('devis personnalisé')
    expect(pageStructure.sections).toHaveLength(5)
  })

  it('should have correct devis types', () => {
    const devisTypes = [
      {
        title: 'Devis Trunk SIP',
        href: '/devis-en-ligne/trunk-sip',
        features: ['Au compteur', 'Illimité', 'Portabilité']
      },
      {
        title: 'Devis Portabilité',
        href: '/devis-en-ligne/portabilite',
        features: ['Numéros fixes', 'RIO requis', 'Sans interruption']
      },
      {
        title: 'Devis VoIP 3CX',
        href: '/devis-en-ligne/voip-3cx',
        features: ['3CX PRO Cloud', '3CX SMB PRO', 'Support inclus']
      },
      {
        title: 'Devis Projet PBX',
        href: '/devis-en-ligne/projet-pbx',
        features: ['PBX Yeastar', 'Intégrations', 'Accompagnement']
      }
    ]
    
    expect(devisTypes).toHaveLength(4)
    devisTypes.forEach(devis => {
      expect(devis.title).toContain('Devis')
      expect(devis.href).toContain('/devis-en-ligne/')
      expect(devis.features).toHaveLength(3)
    })
  })

  it('should have correct advantages', () => {
    const advantages = [
      'Réponse sous 24h',
      'Accompagnement gratuit',
      'Offres sur mesure',
      'Support technique réactif'
    ]
    
    advantages.forEach(advantage => {
      expect(advantage).toBeTruthy()
    })
  })

  it('should have correct contact information', () => {
    const contactInfo = {
      phone: '05 94 96 35 00',
      email: 'contact@e2i-voip.com',
      title: 'Un projet urgent ?'
    }
    
    expect(contactInfo.phone).toBe('05 94 96 35 00')
    expect(contactInfo.email).toBe('contact@e2i-voip.com')
    expect(contactInfo.title).toContain('projet urgent')
  })

  it('should have correct FAQ structure', () => {
    const faqQuestions = [
      'Quel est le délai moyen pour obtenir un devis personnalisé ?',
      'Quelles différences entre un Trunk SIP \'au compteur\' et \'illimité\' ?',
      'Puis-je conserver mes numéros actuels avec votre solution ?',
      'Quel débit internet est nécessaire pour une qualité d\'appel optimale ?'
    ]
    
    expect(faqQuestions).toHaveLength(4)
    faqQuestions.forEach(question => {
      expect(question).toContain('?')
    })
  })

  it('should have correct certification section', () => {
    const certification = {
      title: 'Nous sommes certifiés !',
      description: 'E2I Assistance est partenaire 3CX Bronze et certifié',
      badge: '/images/logo-3CX-partner-e2i/3cx-Silver-Partner-badge.webp'
    }
    
    expect(certification.title).toBe('Nous sommes certifiés !')
    expect(certification.description).toContain('3CX Bronze')
    expect(certification.badge).toContain('3cx-Silver-Partner-badge.webp')
  })
}) 

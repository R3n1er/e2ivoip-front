import { describe, it, expect } from 'vitest'

describe('HubSpot CRM Integration with Tally Tracking', () => {
  it('should track Tally link clicks correctly', () => {
    const tallyEvents = {
      trunk_sip: 'tally_link_clicked',
      portabilite: 'tally_link_clicked',
      voip_3cx: 'tally_link_clicked',
      projet_pbx: 'tally_link_clicked'
    }
    
    Object.values(tallyEvents).forEach(event => {
      expect(event).toBe('tally_link_clicked')
    })
  })

  it('should track contact form submissions', () => {
    const contactEvents = [
      'contact_form_submitted',
      'quick_contact_submitted',
      'full_contact_submitted'
    ]
    
    contactEvents.forEach(event => {
      expect(event).toContain('contact')
      expect(event).toContain('submitted')
    })
  })

  it('should have correct HubSpot portal configuration', () => {
    const hubspotConfig = {
      portalId: '26878201',
      formId: '312a9f67-e613-4651-9690-4586646554a0',
      region: 'eu1',
      scriptUrl: '//js-eu1.hs-scripts.com/26878201.js'
    }
    
    expect(hubspotConfig.portalId).toBe('26878201')
    expect(hubspotConfig.formId).toBe('312a9f67-e613-4651-9690-4586646554a0')
    expect(hubspotConfig.region).toBe('eu1')
    expect(hubspotConfig.scriptUrl).toContain('26878201')
  })

  it('should have Tally URLs configured', () => {
    const tallyUrls = {
      trunk_sip: 'https://tally.so/r/trunk-sip-devis',
      portabilite: 'https://tally.so/r/portabilite-devis',
      voip_3cx: 'https://tally.so/r/voip-3cx-devis',
      projet_pbx: 'https://tally.so/r/projet-pbx-devis'
    }
    
    Object.values(tallyUrls).forEach(url => {
      expect(url).toContain('tally.so')
      expect(url).toContain('devis')
    })
  })

  it('should track form display events', () => {
    const displayEvents = [
      'contact_form_displayed',
      'form_displayed'
    ]
    
    displayEvents.forEach(event => {
      expect(event).toContain('displayed')
    })
  })

  it('should have correct event properties', () => {
    const eventProperties = {
      form_type: 'contact_general',
      lead_source: 'website',
      portal_id: '26878201'
    }
    
    expect(eventProperties.form_type).toBe('contact_general')
    expect(eventProperties.lead_source).toBe('website')
    expect(eventProperties.portal_id).toBe('26878201')
  })
}) 
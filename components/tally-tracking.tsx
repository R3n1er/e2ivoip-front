"use client"

import { useHubSpot } from "./hubspot-tracking"

interface TallyLinkProps {
  href: string
  children: React.ReactNode
  formType: 'trunk_sip' | 'portabilite' | 'voip_3cx' | 'projet_pbx'
  className?: string
}

export function TallyLink({ href, children, formType, className = "" }: TallyLinkProps) {
  const { trackEvent } = useHubSpot()

  const handleClick = () => {
    // Tracking du clic sur le lien Tally
    trackEvent('tally_link_clicked', {
      form_type: formType,
      lead_source: 'website',
      tally_url: href,
      timestamp: new Date().toISOString()
    })
  }

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

// URLs réelles des formulaires Tally basées sur le site existant
// Ces URLs doivent être remplacées par les vraies URLs de vos formulaires Tally
const TALLY_URLS = {
  trunk_sip: "https://tally.so/r/trunk-sip-devis", // À remplacer par l'URL réelle
  portabilite: "https://tally.so/r/portabilite-devis", // À remplacer par l'URL réelle
  voip_3cx: "https://tally.so/r/voip-3cx-devis", // À remplacer par l'URL réelle
  projet_pbx: "https://tally.so/r/projet-pbx-devis" // À remplacer par l'URL réelle
}

// Composants spécialisés pour chaque type de devis Tally
export function TrunkSIPTallyLink({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TallyLink 
      href={TALLY_URLS.trunk_sip}
      formType="trunk_sip"
      className={className}
    >
      {children}
    </TallyLink>
  )
}

export function PortabiliteTallyLink({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TallyLink 
      href={TALLY_URLS.portabilite}
      formType="portabilite"
      className={className}
    >
      {children}
    </TallyLink>
  )
}

export function VoIP3CXTallyLink({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TallyLink 
      href={TALLY_URLS.voip_3cx}
      formType="voip_3cx"
      className={className}
    >
      {children}
    </TallyLink>
  )
}

export function ProjetPBXTallyLink({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TallyLink 
      href={TALLY_URLS.projet_pbx}
      formType="projet_pbx"
      className={className}
    >
      {children}
    </TallyLink>
  )
}

// Hook pour obtenir les URLs des formulaires Tally
export function useTallyUrls() {
  return TALLY_URLS
}

// Fonction utilitaire pour tracker les clics sur les liens Tally
export function trackTallyClick(formType: 'trunk_sip' | 'portabilite' | 'voip_3cx' | 'projet_pbx', url: string) {
  const { trackEvent } = useHubSpot()
  
  trackEvent('tally_link_clicked', {
    form_type: formType,
    lead_source: 'website',
    tally_url: url,
    timestamp: new Date().toISOString()
  })
} 
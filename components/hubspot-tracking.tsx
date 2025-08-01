"use client"

import { useEffect } from 'react'

interface HubSpotTrackingProps {
  portalId?: string
}

export function HubSpotTracking({ portalId = "26878201" }: HubSpotTrackingProps) {
  useEffect(() => {
    // Vérifier si le script HubSpot est déjà chargé
    if (window.hbspt) {
      return
    }

    // Créer et charger le script HubSpot
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'hs-script-loader'
    script.async = true
    script.defer = true
    script.src = `//js-eu1.hs-scripts.com/${portalId}.js`
    
    document.head.appendChild(script)

    // Nettoyer le script lors du démontage du composant
    return () => {
      const existingScript = document.getElementById('hs-script-loader')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [portalId])

  return null
}

/**
 * Hook pour utiliser les fonctionnalités HubSpot
 */
export function useHubSpot() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (window.hbspt) {
      window.hbspt.push(['trackEvent', eventName, properties])
    }
  }

  const identifyUser = (email: string, properties?: Record<string, any>) => {
    if (window.hbspt) {
      window.hbspt.push(['identify', email, properties])
    }
  }

  const trackPageView = (url?: string) => {
    if (window.hbspt) {
      window.hbspt.push(['trackPageView', url])
    }
  }

  return {
    trackEvent,
    identifyUser,
    trackPageView,
  }
}

// Déclaration TypeScript pour HubSpot
declare global {
  interface Window {
    hbspt: {
      push: (args: any[]) => void
    }
  }
} 
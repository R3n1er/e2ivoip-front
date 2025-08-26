"use client"

import { useEffect } from 'react'

interface HubSpotTrackingProps {
  portalId?: string
}

export function HubSpotTracking({ portalId = "26878201" }: HubSpotTrackingProps) {
  useEffect(() => {
    // Charger le script HubSpot principal
    if (!window.hbspt) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.id = 'hs-script-loader'
      script.async = true
      script.defer = true
      script.src = `//js-eu1.hs-scripts.com/${portalId}.js`
      document.head.appendChild(script)
    }

    // Charger le script HubSpot Forms v2
    const formsScript = document.createElement('script')
    formsScript.type = 'text/javascript'
    formsScript.charset = 'utf-8'
    formsScript.src = '//js-eu1.hsforms.net/forms/embed/v2.js'
    formsScript.id = 'hs-forms-script'
    
    // Vérifier si le script Forms n'est pas déjà chargé
    if (!document.getElementById('hs-forms-script')) {
      document.head.appendChild(formsScript)
    }

    // Nettoyer les scripts lors du démontage du composant
    return () => {
      const existingScript = document.getElementById('hs-script-loader')
      const existingFormsScript = document.getElementById('hs-forms-script')
      if (existingScript) {
        existingScript.remove()
      }
      if (existingFormsScript) {
        existingFormsScript.remove()
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
    hbspt: any;
  }
} 
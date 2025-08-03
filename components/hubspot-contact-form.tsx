"use client"

import { useEffect, useRef } from "react"
import { useHubSpot } from "./hubspot-tracking"

interface HubSpotContactFormProps {
  portalId?: string
  formId?: string
  region?: string
  onFormSubmitted?: (data: any) => void
  className?: string
}

export function HubSpotContactForm({ 
  portalId = "26878201", 
  formId = "312a9f67-e613-4651-9690-4586646554a0", // Form ID réel du formulaire HubSpot
  region = "eu1",
  onFormSubmitted,
  className = ""
}: HubSpotContactFormProps) {
  const formRef = useRef<HTMLDivElement>(null)
  const { trackEvent } = useHubSpot()

  useEffect(() => {
    if (window.hbspt && formRef.current) {
      // Supprimer le formulaire existant s'il y en a un
      const existingForm = formRef.current.querySelector('.hs-form')
      if (existingForm) {
        existingForm.remove()
      }

      // Créer le formulaire HubSpot
      window.hbspt.forms.create({
        portalId: portalId,
        formId: formId,
        region: region,
        target: formRef.current,
        onFormSubmitted: (form: any) => {
          // Tracking de l'événement de soumission
          trackEvent('contact_form_submitted', {
            form_id: formId,
            form_type: 'contact_general',
            portal_id: portalId,
            lead_source: 'website',
            timestamp: new Date().toISOString()
          })

          // Callback personnalisé
          if (onFormSubmitted) {
            onFormSubmitted(form)
          }
        },
        onFormReady: (form: any) => {
          // Tracking de l'affichage du formulaire
          trackEvent('contact_form_displayed', {
            form_id: formId,
            form_type: 'contact_general',
            portal_id: portalId
          })
        }
      })
    }
  }, [portalId, formId, region, onFormSubmitted, trackEvent])

  return (
    <div 
      ref={formRef} 
      className={`hubspot-contact-form ${className}`}
      data-portal-id={portalId}
      data-form-id={formId}
    />
  )
}

// Composant de contact rapide pour la page d'accueil
export function QuickContactForm() {
  const { trackEvent } = useHubSpot()

  const handleFormSubmitted = (data: any) => {
    trackEvent('quick_contact_submitted', {
      form_type: 'quick_contact',
      lead_source: 'homepage',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Contactez-nous rapidement
      </h3>
      <p className="text-gray-600 mb-6">
        Notre équipe d'experts est là pour vous accompagner
      </p>
      <HubSpotContactForm 
        formId="312a9f67-e613-4651-9690-4586646554a0"
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  )
}

// Composant de contact complet pour les pages dédiées
export function FullContactForm() {
  const { trackEvent } = useHubSpot()

  const handleFormSubmitted = (data: any) => {
    trackEvent('full_contact_submitted', {
      form_type: 'full_contact',
      lead_source: 'contact_page',
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Contactez notre équipe
      </h3>
      <p className="text-gray-600 mb-6">
        Remplissez ce formulaire et nous vous recontacterons dans les plus brefs délais
      </p>
      <HubSpotContactForm 
        formId="312a9f67-e613-4651-9690-4586646554a0"
        onFormSubmitted={handleFormSubmitted}
        className="w-full"
      />
    </div>
  )
} 
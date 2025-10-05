/**
 * Constantes centralisées pour HubSpot
 *
 * Ce fichier centralise toutes les constantes HubSpot pour éviter la duplication
 * et faciliter la maintenance.
 *
 * @see docs/REFACTORING.md - Phase 1
 */

/**
 * Configuration principale HubSpot
 */
export const HUBSPOT_CONFIG = {
  /**
   * Portal ID HubSpot (peut être surchargé par variable d'environnement)
   */
  PORTAL_ID: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "26878201",

  /**
   * Région du serveur HubSpot (Europe)
   */
  REGION: "eu1" as const,

  /**
   * IDs des formulaires HubSpot
   */
  FORMS: {
    /**
     * Formulaire de contact général
     * Utilisé sur : /contact, /devis-en-ligne, page d'accueil
     */
    CONTACT_GENERAL: "312a9f67-e613-4651-9690-4586646554a0",
  },

  /**
   * URLs des scripts HubSpot
   */
  SCRIPTS: {
    /**
     * Script pour les formulaires HubSpot
     */
    FORMS: "https://js-eu1.hsforms.net/forms/embed/v2.js" as const,

    /**
     * Script de tracking HubSpot (fonction pour générer l'URL avec portal ID)
     */
    TRACKING: (portalId: string = "26878201") =>
      `//js-eu1.hs-scripts.com/${portalId}.js` as const,
  },

  /**
   * Timeouts et configurations de chargement
   */
  LOADING: {
    /**
     * Timeout pour le chargement du script (ms)
     */
    SCRIPT_TIMEOUT: 10000,

    /**
     * Délai avant retry en cas d'échec (ms)
     */
    RETRY_DELAY: 2000,
  },
} as const;

/**
 * Type pour les IDs de formulaires disponibles
 */
export type HubSpotFormId = keyof typeof HUBSPOT_CONFIG.FORMS;

/**
 * Type pour les types de scripts HubSpot
 */
export type HubSpotScriptType = keyof typeof HUBSPOT_CONFIG.SCRIPTS;

/**
 * Helper pour obtenir l'URL complète d'un script
 *
 * @param type - Type de script ('FORMS' ou 'TRACKING')
 * @returns URL du script
 *
 * @example
 * ```ts
 * const formsScriptUrl = getHubSpotScriptUrl('FORMS');
 * // => "https://js-eu1.hsforms.net/forms/embed/v2.js"
 * ```
 */
export function getHubSpotScriptUrl(type: 'FORMS' | 'TRACKING'): string {
  if (type === 'FORMS') {
    return HUBSPOT_CONFIG.SCRIPTS.FORMS;
  }
  return HUBSPOT_CONFIG.SCRIPTS.TRACKING(HUBSPOT_CONFIG.PORTAL_ID);
}

/**
 * Helper pour obtenir l'ID d'un formulaire
 *
 * @param formName - Nom du formulaire
 * @returns ID du formulaire
 *
 * @example
 * ```ts
 * const formId = getHubSpotFormId('CONTACT_GENERAL');
 * // => "312a9f67-e613-4651-9690-4586646554a0"
 * ```
 */
export function getHubSpotFormId(formName: HubSpotFormId): string {
  return HUBSPOT_CONFIG.FORMS[formName];
}

/**
 * Helper pour vérifier si HubSpot est chargé
 *
 * @returns true si HubSpot est disponible dans window
 */
export function isHubSpotLoaded(): boolean {
  return typeof window !== 'undefined' && !!(window as any).hbspt;
}

/**
 * Helper pour vérifier si HubSpot Forms est chargé
 *
 * @returns true si HubSpot Forms est disponible
 */
export function isHubSpotFormsLoaded(): boolean {
  return isHubSpotLoaded() && !!((window as any).hbspt?.forms);
}

/**
 * Configuration pour les événements de tracking
 */
export const HUBSPOT_EVENTS = {
  /**
   * Événements de formulaire
   */
  FORM: {
    DISPLAYED: 'contact_form_displayed',
    SUBMITTED: 'contact_form_submitted',
    ERROR: 'contact_form_error',
  },

  /**
   * Événements de chat
   */
  CHAT: {
    OPENED: 'chat_widget_opened',
    CLOSED: 'chat_widget_closed',
    MESSAGE_SENT: 'chat_message_sent',
  },

  /**
   * Événements de navigation
   */
  NAVIGATION: {
    PAGE_VIEW: 'page_view',
    CTA_CLICKED: 'cta_clicked',
  },
} as const;

/**
 * Type pour les noms d'événements
 */
export type HubSpotEventName =
  | typeof HUBSPOT_EVENTS.FORM[keyof typeof HUBSPOT_EVENTS.FORM]
  | typeof HUBSPOT_EVENTS.CHAT[keyof typeof HUBSPOT_EVENTS.CHAT]
  | typeof HUBSPOT_EVENTS.NAVIGATION[keyof typeof HUBSPOT_EVENTS.NAVIGATION];

/**
 * Exports centralisés pour les composants HubSpot
 *
 * Ce fichier permet d'importer tous les composants HubSpot depuis un seul endroit :
 * import { HubSpotForm, QuickContactForm } from '@/components/hubspot';
 *
 * @see docs/REFACTORING.md - Phase 2
 */

// Composant principal et variantes
export {
  HubSpotForm,
  QuickContactForm,
  FullContactForm,
  InlineContactForm,
  type HubSpotFormProps,
} from "./hubspot-form";

// Export par défaut
export { default } from "./hubspot-form";

/**
 * Schéma de validation Zod pour le Chat Intake
 *
 * Centralise la validation des données du formulaire de pré-chat
 * pour garantir la cohérence et la qualité des données envoyées à HubSpot.
 *
 * @see docs/REFACTORING.md - Phase 4
 */

import { z } from "zod";

/**
 * Schéma de validation pour le formulaire de pré-chat
 *
 * Règles de validation :
 * - firstName : requis, minimum 2 caractères
 * - lastName : requis, minimum 2 caractères
 * - company : requis, minimum 2 caractères
 * - email : requis, format email valide
 * - phone : optionnel, format français/international si fourni
 */
export const chatIntakeSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .trim(),

  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .trim(),

  company: z
    .string()
    .min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'entreprise ne peut pas dépasser 100 caractères")
    .trim(),

  email: z
    .string()
    .email("L'adresse email n'est pas valide")
    .min(5, "L'email doit contenir au moins 5 caractères")
    .max(100, "L'email ne peut pas dépasser 100 caractères")
    .trim()
    .toLowerCase(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        // Regex simple pour téléphones français/internationaux
        const phoneRegex = /^[\d\s\+\-\(\)]{8,20}$/;
        return phoneRegex.test(val);
      },
      {
        message:
          "Le numéro de téléphone n'est pas valide (8-20 caractères, chiffres et +()-)",
      }
    ),
});

/**
 * Type TypeScript déduit du schéma Zod
 *
 * @example
 * ```typescript
 * const formData: ChatIntakeFormData = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   company: "Acme Inc",
 *   email: "john@acme.com",
 *   phone: "+33 1 23 45 67 89"
 * };
 * ```
 */
export type ChatIntakeFormData = z.infer<typeof chatIntakeSchema>;

/**
 * Schéma étendu incluant les champs additionnels pour l'API
 *
 * Ajoute les champs techniques nécessaires pour l'API HubSpot
 * mais non présents dans le formulaire utilisateur.
 */
export const chatIntakeApiSchema = chatIntakeSchema.extend({
  pageUrl: z.string().url().optional(),
  source: z.string().default("website-prechat"),
  conversationId: z.string().optional(),
  message: z.string().optional(),
});

/**
 * Type pour le payload API complet
 */
export type ChatIntakeApiPayload = z.infer<typeof chatIntakeApiSchema>;

/**
 * Messages d'erreur personnalisés français
 *
 * Pour une meilleure UX, utiliser ces messages dans le formulaire
 */
export const chatIntakeErrorMessages = {
  firstName: {
    required: "Le prénom est obligatoire",
    tooShort: "Le prénom est trop court (min. 2 caractères)",
    tooLong: "Le prénom est trop long (max. 50 caractères)",
  },
  lastName: {
    required: "Le nom est obligatoire",
    tooShort: "Le nom est trop court (min. 2 caractères)",
    tooLong: "Le nom est trop long (max. 50 caractères)",
  },
  company: {
    required: "Le nom de l'entreprise est obligatoire",
    tooShort: "Le nom de l'entreprise est trop court (min. 2 caractères)",
    tooLong: "Le nom de l'entreprise est trop long (max. 100 caractères)",
  },
  email: {
    required: "L'email est obligatoire",
    invalid: "L'adresse email n'est pas valide",
    tooShort: "L'email est trop court",
    tooLong: "L'email est trop long (max. 100 caractères)",
  },
  phone: {
    invalid: "Le numéro de téléphone n'est pas valide",
  },
} as const;

/**
 * Helper pour valider les données du formulaire
 *
 * @param data - Données à valider
 * @returns Résultat de la validation
 *
 * @example
 * ```typescript
 * const result = validateChatIntake({
 *   firstName: "John",
 *   lastName: "Doe",
 *   company: "Acme",
 *   email: "john@acme.com"
 * });
 *
 * if (result.success) {
 *   console.log("Données valides:", result.data);
 * } else {
 *   console.error("Erreurs:", result.error.errors);
 * }
 * ```
 */
export function validateChatIntake(data: unknown) {
  return chatIntakeSchema.safeParse(data);
}

/**
 * Helper pour valider le payload API complet
 *
 * @param data - Payload API à valider
 * @returns Résultat de la validation
 */
export function validateChatIntakeApi(data: unknown) {
  return chatIntakeApiSchema.safeParse(data);
}

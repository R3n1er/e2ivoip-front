import { escapeHtml, escapeHtmlMultiline } from "@/lib/api/email-safety";

/**
 * Construit le `hs_note_body` d'une note HubSpot à partir de texte brut.
 *
 * HubSpot affiche le corps des notes comme du HTML dans le CRM. Un texte de
 * visiteur interpolé tel quel y deviendrait du HTML actif (lien de phishing,
 * image piégée) sous les yeux de l'équipe commerciale : vuln-0002 et
 * vuln-0007 du scan Strix 2026-08-20. Toute route qui écrit une note passe
 * donc par cette fonction.
 */
export function formatHubSpotNoteBody(title: string, body: string): string {
  return `<p><strong>${escapeHtml(title)}</strong></p><p>${escapeHtmlMultiline(body)}</p>`;
}

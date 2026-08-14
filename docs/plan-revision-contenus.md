# Plan de révision des contenus — avant mise en ligne

> **Objectif** : relire et valider le contenu de chaque page statique avant la
> mise en ligne de la nouvelle version du site. Le SEO technique est fait (voir
> `PLAN-RELECTURE-MISE-EN-LIGNE.md`) ; ce document couvre **uniquement la
> qualité éditoriale et factuelle** des pages.
>
> **Statut** : à dérouler page par page. Cocher au fur et à mesure.
>
> ⚠️ **Ce fichier remplace une ancienne version (août 2025) devenue obsolète et
> non conforme** (elle contenait « 500+ clients », « 30 % garantis »,
> « support 24/7 », des pages inexistantes). Ne pas réintroduire ces éléments.

---

## Rappels de ligne éditoriale (à respecter sur TOUTES les pages)

Source : `docs/BrandBrief_e2ivoip.md`, `design.md`, décisions `.planning/STATE.md`.

- ❌ **Pas de nombre de clients** affiché (ex : « 100+ clients », « 500+ entreprises »).
- ✅ **15 ans** d'expérience (formulation validée).
- ✅ **20 %** d'économies sur les communications (DROM) — chiffre validé, **sans « garanties »**.
- ✅ Support **par mail et téléphone**, du **lundi au vendredi 8h-18h** (heure locale). ❌ Jamais « 24/7 ».
- ✅ Présence locale DOM : **Guadeloupe, Martinique, Guyane** (équipes), Réunion (couverture).
- ✅ Numéros locaux : +590, +596, +594, +262, +33 (métropole).
- ⚠️ Vérifier qu'aucune mention « garantie » / SLA chiffré non tenable ne subsiste.

---

## Critères de relecture (pour chaque page)

1. **Message** — le H1 et l'intro répondent-ils clairement à « quoi / pour qui / pourquoi » ?
2. **Exactitude** — chiffres, tarifs, numéros, horaires conformes à la ligne éditoriale.
3. **Orthographe / grammaire** — relecture fine (accents, fautes, typographie FR).
4. **Liens internes** — pas de lien mort, CTA cohérents, maillage vers pages clés.
5. **CTA** — un appel à l'action clair et pertinent par page.
6. **Cohérence de marque** — ton, vocabulaire (E2I VoIP, Trunk SIP, DOM, 3CX, Yeastar).
7. **GEO / citabilité** — l'intro est-elle une réponse auto-portante extractible par une IA ?

---

## Revue page par page

Légende statut : ⬜ à faire · 🔄 en cours · ✅ validé · ⚠️ correction requise

| # | Page | Statut | Points de vigilance spécifiques |
|---|------|:---:|---------------------------------|
| 1 | `/` (accueil) | ⬜ | Stats hero (15 ans / Mail & Tél / 20 %). Cohérence H1. Maillage vers offres. |
| 2 | `/qui-sommes-nous` | ✅ | Recentrée installer/accompagner. Prix 3CX SMB → sur devis. Métas SEO alignées. « Réseau de partenaires ». Cas client TBF -20% (factuel) conservé. Badge Aircall ajouté. |
| 3 | `/telephonie-entreprise` | ✅ | Hero aligné charte (gradient). 4 liens morts corrigés → 6 cartes cliquables (offres réelles + IA + Aircall). 3 blocs reformulés vers offres. `force-dynamic` retiré. |
| 4 | `/telephonie-entreprise/trunk-sip-agents-ia` | ✅ | Metadata SEO ajoutée + force-dynamic retiré. Bandeau earlybird. Offre dédiée (facturation min. entrants+sortants). 5 plateformes + logos (VAPI/Rounded/ElevenLabs/Jambonz/Airagent). CTA → Tally (n8n). Page revendeur créée. Marges 40-60% retirées. |
| 5 | `/telephonie-entreprise/trunk-sip-compteur` | ✅ | Validée en l'état (Alban). Form Tally tunnel (embed 7RpEBa) OK. Prix 0,0275 € non affiché (caché derrière le form → conforme tunnel). CTA → /devis-en-ligne (choix Alban). « E2I VOIP » conservé (choix Alban). |
| 6 | `/telephonie-entreprise/trunk-sip-illimite` | ✅ | Offre corrigée : **fixes uniquement** France+DOM (mobiles au compteur). Paliers **4/8/16** (pop. 8). Tableau tarifs mobiles HT/min (6 dest. dont Mayotte). Fair Use précisé. Bascule ~200 min. Form HubSpot retiré → 3 numéros + /contact. CTA → /devis-en-ligne. Engagement 36 mois. Commits `53d6a25`, `f2c8e42`. |
| 7 | `/telephonie-entreprise/3cx-smb-mutualisee` | ✅ | ⚖️ **Prix public assumé : 29€/utilisateur/mois** (exception règle prix masqués, décision Alban). Délai 24h → rapide. Support local → mail+tél. H1 + title SEO → « 3CX SMB PRO Mutualisé ». Capacité 3 à 10 utilisateurs. Bloc tarification détaillé (3CX Pro, fixes DOM+métro, app mobile, SIP Fanvil/Yealink). CTA → Tally `44Gprk` (flow n8n notif commerciale). Commits `f70eb64`, `aa554dd`. |
| 8 | `/telephonie-entreprise/pbx-yeastar` | ✅ | Title dédupliqué (« \| E2I VoIP » retiré). « 20% » → « jusqu'à 20 % » (×2). Équipes/interventions locales → réseau de partenaires + support mail/tél (×3). « 24h » → « rapidement ». SLA contractuels → suivi réactif. 2 CTA → Tally `ODVoz8` (flow n8n). « Nous écrire » supprimé. Bouton tel → « Nous contacter » /contact. Commit `77c5618`. |
| 9 | `/telephonie-3cx` | ✅ | Hub 3CX (renvoie vers PRO `/3cx-cloud` + SMB `/3cx-smb-mutualisee`, pas de cannibalisation). « +50 entreprises » → « 15 ans d'expérience ». Support local → mail/tél (×2). Capacité SMB 3 à 10 (cohérent p.7). 24h → rapide. Prix SMB tableau → sur devis. Commit `6456c87`. |
| 10 | `/3cx-cloud` | ✅ | Angle distinct : 3CX PRO sur instance cloud dédiée, dès 8 appels simultanés. Promesses non sourcées retirées. Page distillée : listes éditoriales, comparatif de capacités, contacts compacts, aucun callout répétitif. 2 CTA → Tally `EkALv4` + calendrier final. Canonical conservée vers le hub. Tests Jest + Playwright ajoutés. |
| 11 | `/nos-services` | ⬜ | Intro « 20 % d'économies » OK. Vérifier liste services à jour (mobilité retirée). |
| 12 | `/devis-en-ligne` | ⬜ | 4 types de devis + « réponse sous 24h ». Liens urlr.me valides. |
| 13 | `/assistance` | ⬜ | Horaires hotline (L-V 8h-18h) cohérents. FAQ à jour. |
| 14 | `/studio-attente` | ⬜ | Offre voix off + musiques libres de droits. |
| 15 | `/contact` | ⬜ | **NAP** (nom / adresse / tél) cohérent pour le SEO local. 5 numéros par territoire. |
| 16 | `/mentions-legales` | ⬜ | E2I ASSISTANCE, SIRET 51743457700014, APE 6203Z, siège Cayenne. |
| 17 | `/politique-confidentialite` | ⬜ | Présence légale RGPD OK. |

> **Blog** (`/blog` + articles) : **hors scope** de cette révision (traité dans
> une phase ultérieure avec la récupération des slugs HubSpot).

---

## Décisions transverses à trancher (Alban)

- [x] **Cannibalisation 3CX** : conserver le hub `/telephonie-3cx` comme page
      canonique ; `/3cx-cloud` détaille l'instance PRO dédiée et
      `/3cx-smb-mutualisee` l'offre mutualisée pour 3 à 10 utilisateurs.
- [ ] **Prix affichés** : confirmer « 15 €/utilisateur/mois » (3CX SMB) et tout
      autre tarif public restant.
- [ ] **Tally trunk-sip-compteur** : re-tester le tunnel de leads en conditions
      réelles (déjà validé E2E le 2026-06-12, à reconfirmer visuellement).

---

## Méthode d'exécution proposée

1. Je relis chaque page (contenu réel du code) et je liste les corrections
   proposées (orthographe, message, liens, cohérence).
2. Tu valides / arbitres les points métier (prix, cannibalisation, chiffres).
3. J'applique les corrections validées.
4. Re-vérification finale : `npm run validate` + check visuel des pages clés.

---

## Références
- SEO technique : `docs/PLAN-RELECTURE-MISE-EN-LIGNE.md`
- Ligne éditoriale : `docs/BrandBrief_e2ivoip.md`, `design.md`
- Charte : `docs/CHARTE_GRAPHIQUE.md`

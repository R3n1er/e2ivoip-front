# Design — Tunnel de leads sur la page Trunk SIP au Compteur

**Date** : 2026-05-25
**Page concernée** : `app/telephonie-entreprise/trunk-sip-compteur/page.tsx`

## Objectif

Retirer **100% des tarifs affichés publiquement** sur la page Trunk SIP au compteur,
afin de ne pas exposer la grille tarifaire aux concurrents. Les tarifs évoluent et
sont stockés dans une autre base de données.

Remplacer ces tarifs par un **formulaire unique de capture de leads**. À la soumission,
le lead est transmis à un webhook n8n qui enverra les tarifs par email au prospect.

## Décisions validées

| Sujet | Décision |
|-------|----------|
| Tarifs affichés | Aucun. Suppression complète du bloc tarifs. |
| Format du tunnel | Formulaire intégré directement dans la page (pas de popup). |
| Champs du formulaire | 4 champs : Nom/prénom, Email, Nom entreprise, Téléphone. |
| Technologie | Tally embed (réutilise l'outil déjà en place) + webhook n8n. |
| Webhook n8n | Conçu côté n8n par l'utilisateur. Côté web : aucun code, config Tally. |
| Nombre de formulaires | Un seul. Le nouveau form "tarifs" remplace l'ancien `TallyEmbedDevis`. |
| URL Tally | `7RpEBa` (embed : `https://tally.so/embed/7RpEBa`). |

## Modifications de la page

1. **Section "Tarifs des appels à la minute" (l.224-306)** → SUPPRIMÉE.
   La grille `lg:grid-cols-2` (l.140) passe en une seule colonne centrée
   contenant les 4 avantages (facturation au compteur, numéros locaux DOM,
   compatible IPBX, support local).

2. **Nouveau composant `TallyEmbedTarifs`** inséré à la place de `TallyEmbedDevis`
   (l.421). Affiche le formulaire Tally `7RpEBa`.

3. **`TallyEmbedDevis`** retiré de cette page (import l.6 + usage l.421).
   Le composant `components/tally-embed-devis.tsx` N'EST PAS supprimé
   (non utilisé ailleurs mais conservé pour réutilisation éventuelle).

4. **Textes/CTA orientés "recevoir les tarifs"** :
   - Indicateur de défilement "Découvrez nos tarifs" (l.110) → "Recevez nos tarifs personnalisés".
   - Les CTA "Calculer mes économies" peuvent pointer vers l'ancre du formulaire.

## Architecture technique

### Nouveau composant : `components/tally-embed-tarifs.tsx`

Calqué sur le pattern SSR-safe de `TallyEmbedDevis` :
- Chargement du script Tally avec garde `isClient` (évite mismatch hydration).
- URL d'embed : `https://tally.so/embed/7RpEBa?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1`
- Le paramètre `formEventsForwarding=1` est conservé pour le tracking HubSpot existant.
- En-tête orienté tarifs (titre "Recevez nos tarifs personnalisés"), gradient charte
  `from-red-primary to-blue-marine`.

### Flux de données

```
Visiteur remplit le form Tally (4 champs)
        │ submit
        ▼
Tally → webhook n8n (config Tally : Integrations → Webhooks)
        │
        ▼
n8n récupère le lead → envoie email avec tarifs au prospect
```

Côté code : aucun appel API à écrire. Le webhook est une configuration Tally
pointant vers l'URL du nœud Webhook n8n.

### Configuration Tally (côté utilisateur)

Formulaire "Demande de tarifs Trunk SIP" avec 4 champs :
- Nom et prénom (texte court, obligatoire)
- Email professionnel (type Email natif, obligatoire)
- Nom de l'entreprise (texte court, obligatoire)
- Téléphone (type Téléphone natif, obligatoire)

Bouton submit : "Recevoir les tarifs". Message de confirmation invitant à
consulter sa boîte mail.

### Payload reçu par n8n

```json
{
  "data": {
    "fields": [
      { "label": "Nom et prénom", "value": "..." },
      { "label": "Email professionnel", "value": "..." },
      { "label": "Nom de l'entreprise", "value": "..." },
      { "label": "Téléphone", "value": "..." }
    ]
  }
}
```

## Fichiers touchés

| Fichier | Action |
|---------|--------|
| `app/telephonie-entreprise/trunk-sip-compteur/page.tsx` | Modifier : supprimer bloc tarifs, passer en 1 colonne, remplacer `TallyEmbedDevis` par `TallyEmbedTarifs`, ajuster textes |
| `components/tally-embed-tarifs.tsx` | Créer |
| `tests/trunk-sip-compteur.test.tsx` | Réécrire : retirer assertions tarifs (l.86-130), ajouter assertion formulaire présent + aucun prix affiché |

## Approche TDD (règle projet CLAUDE.md)

RED → GREEN → REFACTOR → DOCUMENT → COMMIT :

1. **RED** : modifier les tests d'abord.
   - Supprimer les tests qui vérifient l'affichage des tarifs
     ("affiche le tableau des coûts", "affiche la section des tarifs détaillés",
     "affiche les indications Sur devis").
   - Ajouter un test : le formulaire de demande de tarifs est présent.
   - Ajouter un test de non-régression : aucun prix (`0,0120 €`, etc.) n'est rendu.
2. **GREEN** : modifier la page pour faire passer les tests.
3. **VALIDATE** : `npm run validate` (6 contrôles) avant tout commit.

## Hors périmètre (YAGNI)

- Pas de refactoring de `TallyEmbedDevis` en composant générique paramétré.
- Pas de suppression du fichier `tally-embed-devis.tsx`.
- La construction du workflow n8n est faite par l'utilisateur (hors code).

# SEO Orchestrator Agent — Design Spec

**Date** : 2026-04-03
**Statut** : Valide

## Objectif

Creer un agent SEO orchestrateur qui audite automatiquement les pages du site E2I VoIP, applique les corrections techniques SEO, et produit un rapport de recommandations contenu pour les autres agents.

## Declenchement

- **Proactif** : quand une nouvelle page `app/**/page.tsx` est creee
- **Sur demande** : quand l'utilisateur demande un audit SEO d'une page existante

## Skills SEO invoques

| Skill | Usage | Declenchement |
|-------|-------|---------------|
| `seo-page` | Audit on-page (meta, headings, liens) | Toujours |
| `seo-schema` | JSON-LD / structured data | Toujours |
| `seo-content` | E-E-A-T, readability, thin content | Nouvelles pages |
| `seo-images` | Alt text, formats, lazy loading | Si images presentes |

## Niveau d'Autonomie

### Corrections automatiques (sans validation)
- Meta title/description manquants ou incomplets
- Canonical URL absente
- Open Graph / Twitter Card tags
- Schema JSON-LD (BreadcrumbList, Service, LocalBusiness, WebPage)
- Alt text vides sur images
- Attributs next/image manquants

### Rapport pour validation (pas de modification)
- Reformulation H1/H2 pour integration mots-cles
- Ajout ou restructuration de contenu
- Suggestions de mots-cles
- Recommandations de liens internes
- Ameliorations E-E-A-T

## Integration dans le workflow

### Workflow Nouvelle Page
```
1. Creer page.tsx + layout
2. content-writer-seo → redaction contenu
3. seo-orchestrator → audit SEO + corrections techniques auto
4. content-writer-seo → appliquer recommandations contenu du rapport
5. stitch-compliance → Design System OK ?
6. pre-commit-validator + security-guardian → avant commit
```

### Workflow Feature (page existante)
```
...
6. seo-orchestrator → si nouvelle page (proactif)
7. pre-commit-validator → scan rapide
...
```

## Format de sortie

Rapport structure avec :
- Corrections appliquees (liste checkbox)
- Recommandations contenu (tableau priorite/element/recommandation/agent suggere)
- Mots-cles suggeres (principal, secondaires, longue traine)
- Prochaines actions numerotees

## Specifications Techniques

- **Modele** : sonnet
- **Couleur** : purple
- **Tools** : Read, Write, Edit, Grep, Glob, Bash, WebFetch
- **Fichier** : `.claude/agents/seo-orchestrator.md`

## Regles metier

- Contenu SEO en francais
- Marque : "E2I VoIP" (forme exacte)
- Pas de statistiques inventees
- Pas de sur-optimisation (contenu naturel)
- Respecter le Design System Monolithe 2026
- Deleguer le design a `stitch-compliance`

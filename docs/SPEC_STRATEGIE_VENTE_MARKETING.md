# Spécification — Stratégie de Vente & Marketing E2I VoIP

> **Version** : 1.0
> **Date** : 28 avril 2026
> **Auteur** : Alban Renier (Direction)
> **Statut** : Document de référence
> **Sources consolidées** :
> - `docs/BrandBrief_e2ivoip.md` (positionnement, ICP, offres, processus)
> - `.planning/PROJECT.md` (objectifs business, KPIs, contraintes)
> - `.planning/ROADMAP.md` (phases d'activation digitale)
> - `.planning/REQUIREMENTS.md` (exigences mesurables)
> - Travaux GSD (Get Shit Done) — Phases 1, 2, 3
> - Travaux Superpowers (brainstorming, plans d'exécution)

---

## 1. Synthèse Exécutive

E2I VoIP est un **opérateur de services télécom et intégrateur VoIP** spécialisé dans l'accompagnement des PME et groupes multisites en téléphonie IP, avec une **double implantation Antilles-Guyane / La Réunion / Métropole** et une expertise certifiée 3CX et Yeastar.

La stratégie commerciale s'articule autour de trois leviers :

1. **Différenciation par le Customer Success** — Un Customer Success Manager (CSM) dédié à chaque client, plutôt qu'une logique transactionnelle.
2. **Proximité géographique** — Équipes locales dans les DROM et en Métropole, support technique en interne.
3. **Profondeur technique** — Certification 3CX Silver, maîtrise du Call Flow Designer (CFD), intégrations CRM avancées.

L'objectif business à court terme (milestone *Ship & Measure*) est de **doubler les leads qualifiés** générés par le site web (baseline actuelle < 20 leads/mois) via :
- Le déploiement du redesign Monolithe 2026
- L'ajout de social proof crédible (témoignages réels + badge 3CX)
- L'optimisation des chemins de conversion (1 CTA primaire above-the-fold par page)
- L'instrumentation analytics PostHog pour mesurer avant/après

---

## 2. Positionnement & Promesse de Marque

### 2.1. Slogan officiel

> **« La téléphonie d'entreprise, simple et évolutive. »**

### 2.2. Promesse de valeur

> Chaque visiteur doit comprendre en **10 secondes** qu'E2I VoIP est un **expert local de confiance** en téléphonie d'entreprise, et avoir un **chemin clair pour prendre contact**.

### 2.3. Thèse compétitive

La **proximité combinée à l'expertise locale** bat les solutions universelles (Teams, Zoom Phone) sur le segment PME, particulièrement dans les DROM où la maîtrise des contraintes techniques territoriales est un avantage décisif.

### 2.4. Différenciateur central

Là où la majorité des concurrents considèrent **la signature du contrat comme un aboutissement**, E2I VoIP la considère comme **le début d'une collaboration**. Le Customer Success Manager n'est pas un contact administratif : c'est un partenaire opérationnel engagé dans la réussite du projet client.

### 2.5. Tagline alternative (B2B)

> *« Votre opérateur télécom DOM & Métropole. Certifié 3CX. Hébergé en France. »*

---

## 3. Profil Client Idéal (ICP)

### 3.1. Critères de qualification

| Critère | Cible |
|---|---|
| Taille | TPE (≥ 3 utilisateurs) à PME / groupes (60 à 90+ utilisateurs) |
| Géographie | Guadeloupe, Martinique, Guyane, La Réunion, France métropolitaine |
| Maturité | 5+ ans d'activité (préférence pour relations durables) |
| Multisite | Forte valeur si présence DROM + Métropole simultanée |
| Stack | Migration cuivre→VoIP, remplacement PABX legacy, modernisation |

### 3.2. Verticales prioritaires

1. **Cabinets d'expertise** : avocats, experts-comptables, bureaux d'études (BTP), conseils, assurances
2. **Santé & Médico-social** : cliniques, cabinets médicaux, maisons de santé, EHPAD
3. **Commerce & Distribution** : enseignes locales, bijouteries (ex. Eurogold/Titeca BEAUPORT), franchises
4. **Hôtellerie & Restauration**
5. **Administrations & collectivités**
6. **Sociétés d'infogérance** (revente B2B2B)
7. **Industrie & BTP**

### 3.3. Persona décideur

- **Rôle** : Dirigeant TPE/PME, DSI, responsable IT, office manager
- **Pain points** :
  - Saturation du système téléphonique actuel
  - Coûts opérateur élevés et facturation opaque
  - Obsolescence technique (fin du cuivre, PABX en fin de vie)
  - Manque de centralisation entre agences éloignées (DROM ↔ Métropole)
  - Besoin de sécurité, RGPD, hébergement souverain
- **Critères de décision** :
  1. Réactivité du support (présence locale)
  2. Transparence tarifaire
  3. Expertise technique vérifiable (certifications)
  4. Capacité à porter les numéros existants
  5. Flexibilité financière (location vs achat)

---

## 4. Catalogue des Offres

### 4.1. Trunk SIP (cœur opérateur)

- 4 / 8 / 16 / 24 / 32 / 64+ appels simultanés
- Modes : **au compteur** (recommandé) ou **illimité** (sur étude)
- Compatibilité : 3CX, Yeastar, Grandstream, Avaya, Alcatel, FreePBX
- Sécurité : authentification user/password ou restriction IP
- **Engagement** : 24 mois (E2I) / 36 mois (partenariat SFR Business)
- Création de numéros locaux DOM + portabilité entrante

### 4.2. Solutions IPBX 3CX

| Offre | Cible | Caractéristiques |
|---|---|---|
| **3CX SMB Pro (mutualisé)** | TPE 3-15 utilisateurs | Multisociétés, package clé en main, tarif accessible, limitations volontaires (pas de CRM/M365, pas de musique perso) |
| **3CX Pro / Entreprise (dédié)** | PME 8+ utilisateurs, multisite | Instance isolée AWS/Azure France-UE, intégrations CRM, multi-tenant, ≥ 90 utilisateurs simultanés possibles |

**Certification** : Partenaire 3CX **Silver**, expertise **3CX CFD** (Call Flow Designer).

### 4.3. Yeastar / Grandstream (alternative)

- Déploiement on-premise ou cloud
- Cible : petits cabinets médicaux, structures locales souhaitant garder l'infrastructure en interne
- Compatible Trunk SIP E2I ou SFR

### 4.4. Studio d'enregistrement vocal pro

- Messages d'accueil SVI, prédécroché, musique d'attente
- 1 voix masculine + 2 voix féminines
- Livraison **sous 48h**, formats WAV/MP3/OGG
- Optimisé codecs téléphonie (G.711, G.729)

### 4.5. Assistants vocaux IA (différenciation 2026)

- Plateformes : ElevenLabs, Rounded
- Cas d'usage : accueil 24/7, qualification leads, prise de RDV, transfert intelligent
- Forfaits sans engagement, démo gratuite

### 4.6. Services complémentaires

- Étude de portabilité opérateur
- Audit & conseil téléphonie IP
- Formations utilisateurs et administrateurs
- Déploiement matériel (Fanvil, Yealink, Snom, Patton, Grandstream)
- SBC 3CX pour sites multi-postes

---

## 5. Atouts Différenciants

| Atout | Détail |
|---|---|
| **Réactivité** | Techniciens présents localement (Guyane, Antilles, Métropole). Supervision cloud du parc Fanvil/Yealink, prise en main à distance. |
| **Expertise** | Certifié 3CX/Yeastar, maîtrise CFD & intégrations avancées (HubSpot, Zoho, Salesforce, Organilog, M365, Google Workspace). |
| **Hébergement souverain** | AWS + Azure France/UE, infrastructure redondée, conformité RGPD, monitoring permanent. |
| **Proximité** | Équipes joignables, offres flexibles, documentation accessible. |
| **Réseau partenaires** | Prestataires IT et infogérants présents dans les DOM pour interventions urgentes sur site. |
| **Customer Success** | Accompagnement structuré : implémentation → formation → suivi continu (revues 30j / 90j / annuelles). |

---

## 6. Stratégie Tarifaire & Modèle Économique

### 6.1. Principes

- **Récurrence mensuelle** dominante (Trunk SIP, IPBX cloud, mobile)
- **Tarification ajustée à l'usage** (au compteur recommandé) ou forfait illimité sur étude
- **Acompte 50 %** sur frais de mise en service et coûts ponctuels
- **Mensualités** démarrent le mois suivant la mise en service

### 6.2. Modalités de paiement

- Virement SEPA
- Prélèvement bancaire via **GoCardless**
- Signature électronique via plateforme intégrée HubSpot

### 6.3. Engagements contractuels

| Service | Engagement |
|---|---|
| Trunk SIP E2I VoIP | 24 mois |
| Partenariat SFR Business (Trunk + fibre) | 36 mois |
| Assistants vocaux IA | Sans engagement |

### 6.4. Financement matériel

- **Achat direct**
- **Location simple** (E2I)
- **Location financière** via partenaires **Grenke** et **Cleodis**
  - Loyers déductibles fiscalement
  - Renouvellement, restitution ou prolongation en fin de contrat
  - Démarche RSE (réemploi, valorisation)

---

## 7. Processus de Vente

### 7.1. Funnel téléphonie fixe / IPBX 3CX

#### Étape 1 — Capture du lead

- Sources : téléphone, formulaire web, email, recommandation, apporteur d'affaires
- **Saisie immédiate** dans HubSpot CRM avec coordonnées complètes (mail, fixe, mobile, entreprise) + contexte dans le champ « Notes »
- Renseigner : périmètre décisionnel, particularités utiles

#### Étape 2 — Qualification

- Premier contact téléphone ou Teams
- Objectif : comprendre les pain points (saturation, coût, obsolescence)
- Adapter le discours en conséquence
- **Closing de l'étape** : caler une démo produit Teams immédiatement
- Demander la complétion du **formulaire Tally** (informations détaillées entreprise)

#### Étape 3 — Démonstration produit

- Démo 3CX **sur Teams**, structurée autour des besoins identifiés
- Montrer comment la solution **résout les problèmes** (pas une simple liste de fonctionnalités)
- **Closing de l'étape** : caler immédiatement le RDV de présentation du devis
- Si Tally non rempli → poster le lien dans le chat Teams pour complétion en direct

#### Étape 4 — Présentation du devis

- **Toujours en visioconférence ou en présentiel** (jamais d'envoi mail seul)
- Expliquer chaque ligne en lien avec les enjeux du client
- Anticiper les objections, dissiper les doutes
- Renforcer la perception de valeur

#### Étape 5 — Signature & administratif

- **Signature électronique** (HubSpot, recommandée) ou papier + scan
- Dossier complet requis :
  - Formulaire d'ouverture de compte client
  - KBIS ou avis INSEE < 3 mois
  - RIB officiel
  - CGS signées
  - Mandat de portabilité + dernière facture opérateur (si portabilité)
- Email type avec pièces jointes pré-remplies
- Rappel téléphonique **48h** après envoi pour vérifier l'avancement
- Archivage OneDrive / SharePoint commercial

#### Étape 6 — Activation & Customer Success

- Transmission ADV pour mise en service
- **Suivi à 30 jours** : vérification transition, satisfaction
- **Suivi à 90 jours** : identification besoins complémentaires (formation, extensions)
- **Revue annuelle** stratégique : positionnement E2I comme partenaire, pas fournisseur

### 7.2. Funnel Trunk SIP (court)

1. **Premier contact** : formulaire web ou appel direct (0594 96 35 00)
2. **Recommandation** : Trunk au compteur (par défaut) ou illimité (sur étude)
3. **Devis personnalisé** après collecte d'infos détaillées
4. **Mise en service** + assistance technique de configuration
5. **Compatibilité immédiate** : 3CX, Yeastar, Avaya, Alcatel
6. **Tarification au TJM ingénieur** pour Asterisk / FreePBX (config plus complexe)

### 7.3. Leviers psychologiques activés

| Levier | Point d'application |
|---|---|
| **Réactivité** | Saisie CRM immédiate, rappel 48h |
| **Réciprocité** | Suivi 30j/90j sans demande, démo gratuite |
| **Preuve sociale** | Témoignages, badges 3CX, références (Titeca/Eurogold) |
| **Engagement progressif** | Tally → démo → devis → signature (escalade par micro-engagements) |
| **Cohérence** | RDV de devis pris dès la fin de la démo |

---

## 8. Stratégie Marketing & Acquisition

### 8.1. Canal principal — Site web e2i-voip.com

**Statut actuel** : < 20 leads/mois (sous-performant).

**Hypothèse stratégique** *(révisée après cross-model challenge)* :
> Le SEO est un **outil de crédibilité et de closing**, pas le moteur d'acquisition principal. Le volume de recherche local B2B est trop faible pour porter seul l'acquisition. Le site doit donc primarily **convertir** les visiteurs déjà ciblés (recommandation, mention, recherche directe).

**Conséquences** :
- Investir dans la **conversion** (CTA, social proof, clarté du message)
- Investir dans le **tracking** (PostHog) pour mesurer ce qui marche
- Reporter à v2 les efforts d'acquisition payants (Google Ads, landing pages)

### 8.2. Plan d'activation digitale (3 phases GSD)

#### Phase 1 — PostHog Analytics Baseline ✅ (terminée)

**Objectif** : tracer anonymement chaque visiteur et capturer les events de conversion.

- PostHog JS SDK installé (EU Cloud, GDPR-compliant, persistence: 'memory' = cookieless, **pas de cookie banner requis**)
- 3 events instrumentés : `cta_click`, `phone_click`, `form_submit`
- Session recordings activés
- Try/catch wrapper pour graceful degradation (adblockers)

#### Phase 2 — Redesign + Social Proof + Conversion ✅ (terminée)

**Objectif** : site professionnel avec social proof crédible et chemin de conversion clair.

- **Social proof** : témoignages clients réels + badge **3CX Silver Partner** entre Services et Stats sur la homepage, et sur les pages produits clés (`/telephonie-3cx`, `/3cx-cloud`, `/nos-services`)
- **CTA primaire above-the-fold** sur chaque page produit, wording et destination personnalisés (ex. `/telephonie-3cx` → « Passer à 3CX » → `/devis-en-ligne?service=3cx`)
- **Numéros de téléphone cliquables** (`tel:`) par territoire (Guadeloupe, Martinique, Guyane, La Réunion, France) dans footer + pages contact/devis + pages produits
- **Élimination des dead-ends** : `ContactSectionSimple` déployée en bas de chaque page produit
- **Audit Design System Monolithe 2026** : suppression des violations (font-bold/semibold → font-black uniquement, suppression hover:shadow-lg, refactor CTAButton en Link-only)

#### Phase 3 — Deploy Redesign + SEO Content (en cours)

**Objectif** : redesign Monolithe 2026 et contenu SEO enrichi en production, avec données avant/après dans PostHog.

- Merge PR2 (Redesign + Social Proof + Conversion) après période de baseline (1-3 semaines)
- Merge PR3 (SEO Content) indépendamment
- JSON-LD Service schema sur 7 pages produits (validé)
- Sitemap corrigé (14 pages réelles)

### 8.3. Canaux secondaires

| Canal | Statut | Priorité |
|---|---|---|
| **Recommandation client** | Actif (CSM nourrit la rétention) | HAUTE |
| **Apporteurs d'affaires / Partenariats** | Actif (SFR Business, infogérants DOM) | HAUTE |
| **SEO local** | En déploiement (Phase 3) | MOYENNE |
| **Tally popup conversion** | Actif (déclenchement 3s, ID `mDY1bl`) | MOYENNE |
| **Livechat (`chat-preoverlay.tsx`)** | Actif | MOYENNE |
| **HubSpot forms** | Actif | HAUTE (capture lead structurée) |
| **Google Business Profile** | Hors scope v1 | DIFFÉRÉ |
| **Google Ads** | Hors scope v1 (test manuel possible) | DIFFÉRÉ |
| **LinkedIn / Outbound** | Hors périmètre site web | DIFFÉRÉ |
| **Blog technique VoIP** | Phase ultérieure | DIFFÉRÉ |

### 8.4. Partenariats commerciaux structurants

| Partenaire | Type | Apport business |
|---|---|---|
| **3CX** (Silver Partner) | Vendor | Légitimité technique, support 3CX France direct, accès leads écosystème |
| **Yeastar** | Vendor (depuis 2025) | Alternative économique pour petites structures |
| **Fanvil / Yealink** | Hardware | Console cloud FDMCS, supervision parc à distance |
| **SFR Business Caraïbes** | Opérateur national | Co-commercialisation Fibre + Trunk SIP DOM, légitimation par grand opérateur |
| **Grenke / Cleodis** | Financement | Levée d'objection trésorerie chez le prospect |

---

## 9. Messaging & Tonalité

### 9.1. Piliers de messaging

1. **Du problème à la solution** — Les clients font face à l'arrêt du cuivre, à la pression budgétaire et à la complexité multisite.
2. **Excellence technique + proximité géographique + tarif transparent** — Notre triple promesse.
3. **Adoption rapide, ROI maximisé, partenariat (pas relation fournisseur)** — Le résultat client.

### 9.2. Tonalité

- **Professionnel** et **rassurant** (cible PME averse au risque)
- **Confiance technique sans jargon excessif**
- **Local et présent** — emphase sur les territoires et la réactivité
- **Concret** — exemples chiffrés (« 60 à 90+ utilisateurs », « livraison 48h »)

### 9.3. Vocabulaire à privilégier

✅ Opérateur de service télécom · intégrateur VoIP · Customer Success · proximité · expertise certifiée · souverain · transparent · partenaire

### 9.4. Vocabulaire à éviter

❌ « Solution révolutionnaire » · « Leader incontesté » · jargon marketing creux · promesses non quantifiables

---

## 10. KPIs & Mesure de Performance

### 10.1. KPIs primaires (Phase Ship & Measure)

| KPI | Source | Baseline | Cible 3 mois |
|---|---|---|---|
| Leads qualifiés / mois | HubSpot CRM | < 20 | 35-40 |
| Taux de conversion `cta_click` → `form_submit` | PostHog | À mesurer | +30 % vs baseline |
| Taux de clics sur numéros de téléphone | PostHog `phone_click` | 0 (avant Phase 2) | À établir |
| Taux d'abandon de session avant CTA | PostHog session recordings | À mesurer | -15 % vs baseline |
| Délai de réponse aux leads (1er contact) | HubSpot | Variable | < 4h ouvrées |

### 10.2. KPIs secondaires (suivi commercial)

| KPI | Source |
|---|---|
| Taux de conversion qualification → démo | HubSpot |
| Taux de conversion démo → devis | HubSpot |
| Taux de signature devis → contrat | HubSpot |
| Cycle de vente moyen (jours) | HubSpot |
| Panier moyen (€/mois récurrent) | Facturation |
| Churn rate annuel | Facturation |
| Net Revenue Retention (upsell CSM) | Facturation |
| NPS post-90 jours | Enquête CSM |

### 10.3. Stack analytics

- **PostHog** EU Cloud (cookieless, GDPR-compliant) — comportement site
- **HubSpot** — CRM + marketing automation
- **Tally** — formulaires de qualification approfondie
- **OneDrive / SharePoint** — archivage administratif commercial

---

## 11. Engagements & Garanties

- Données hébergées **France / UE** (AWS, Azure, SFR Cloud)
- **Conformité RGPD** stricte
- Services **supervisés 24/7**
- Infrastructure **redondée** (multi-AZ)
- Support technique **interne** (pas de sous-traitance)
- Documentation et formations vidéo accessibles
- Customer Success Manager **dédié** sur la durée du contrat

---

## 12. Roadmap Stratégique

### v1 (en cours — mai/juin 2026)

- ✅ Tracking comportemental PostHog
- ✅ Social proof homepage + pages produits clés
- ✅ Conversion optimisée (CTA, tel:, dead-ends éliminés)
- 🔄 Déploiement production redesign Monolithe 2026
- 🔄 Contenu SEO enrichi en production
- 🔄 Collecte baseline de données conversion

### v2 (T3-T4 2026)

- A/B testing PostHog feature flags (après 1 mois de baseline)
- Landing pages dédiées par campagne marketing
- Google Business Profile + avis Google intégrés
- Cas clients détaillés avec métriques avant/après
- Blog technique VoIP (acquisition organique long terme)

### v3 (2027)

- Outbound LinkedIn / prospection structurée
- Programme apporteurs d'affaires formalisé
- Marketplace assistants vocaux IA (différenciation marché)
- Programme de certification revendeurs régionaux

---

## 13. Hors Scope (explicite)

| Élément | Raison |
|---|---|
| Refonte complète du contenu éditorial | Déjà fait sur la branche `dev` |
| Backend / API custom | Site statique sur Vercel, pas de besoin |
| Mobile app dédiée | Site responsive suffisant |
| Google Ads campagnes | Optionnel, budget minimal, à tester manuellement |
| Outbound LinkedIn / prospection | Hors périmètre site web (canal séparé v3) |

---

## 14. Annexes

### 14.1. Numéros commerciaux par territoire

| Territoire | Numéro |
|---|---|
| Guyane | 05 94 96 35 00 |
| Guadeloupe | 05 90 17 35 00 |
| Martinique | 05 96 31 35 00 |
| La Réunion | +262 263 08 55 00 |
| France métropolitaine | 01 89 56 35 00 |
| Hotline support technique | 01 89 56 05 00 |

### 14.2. Contacts officiels

- **Site web** : https://www.e2i-voip.com
- **Email commercial** : commerciaux@e2i-voip.com
- **Email support** : assistance@e2i-voip.com
- **Demande de devis en ligne** : https://www.e2i-voip.com/devis
- **Portail support** : https://support.e2i-voip.com

### 14.3. Charte graphique appliquée à ce document

| Rôle | Hex | Usage dans le document |
|---|---|---|
| Rouge Principal | `#E53E3E` | Titres de section H1, CTA, accents |
| Bleu Marine | `#2D3848` | Titres H2/H3, en-têtes de tableaux |
| Gris Foncé | `#1F2937` | Texte courant |
| Gris Secondaire | `#818096` | Texte secondaire, légendes |

---

*Document de spécification — E2I VoIP — Stratégie de Vente & Marketing v1.0 — 2026-04-28*

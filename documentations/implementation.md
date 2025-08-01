# Plan d'implémentation - Site E2I VoIP

## Phase 1 : Préparation et Setup (Semaine 1)

### 1.1 Configuration de l'environnement

- ✅ Audit du code existant
- ✅ Setup des outils de développement
- ✅ Configuration Tailwind + DaisyUI + shadcn/ui
- ✅ Installation des dépendances requises (Lineicons, ReactBits)

### 1.2 Intégrations multiples

- [x] Configuration du compte HubSpot ✅
- [x] Génération des clés API HubSpot ✅
- [x] Setup des formulaires HubSpot natifs ✅
- [x] Configuration du blog HubSpot ✅
- [x] Script de suivi HubSpot configuré (Portail 26878201) ✅
- [ ] **NOUVEAU** : Configuration Tally pour formulaires de devis
- [ ] **NOUVEAU** : Setup webhook Tally → n8n → HubSpot
- [ ] **NOUVEAU** : Configuration n8n pour automatisations

### 1.3 Assets et contenu

- [ ] Optimisation des images existantes (WebP)
- [ ] Collecte des logos clients
- [ ] **NOUVEAU** : Logos des partenaires pour footer
- [ ] Audit du contenu existant
- [ ] Préparation du contenu SEO optimisé
- [ ] **NOUVEAU** : Exemples audio pour studio d'attente

## Phase 2 : Développement Core (Semaines 2-3)

### 2.1 Structure de base améliorée

- [ ] Refactoring du layout principal avec navigation optimisée
- [ ] Header responsive optimisé pour MacBook Pro 13", 14", 15"
- [ ] Footer complet avec :
  - [ ] Logos partenaires
  - [ ] Liens légaux (CGV, Politique de confidentialité)
  - [ ] Mentions RGPD
- [ ] Système de routing Next.js optimisé
- [ ] **NOUVEAU** : Breadcrumbs pour navigation interne

### 2.2 Pages principales restructurées

- [ ] **Page d'accueil modernisée** :
  - [ ] Hero section avec nouveau design
  - [ ] Section services restructurée
  - [ ] Logos clients avec carousel
  - [ ] Témoignages clients
  - [ ] CTA de contact optimisés
  - [ ] Footer avec partenaires
- [ ] **Qui sommes-nous étendue** :
  - [ ] Histoire de l'entreprise
  - [ ] Équipe et expertises
  - [ ] Certifications
  - [ ] **NOUVEAU** : Section partenaires dédiée
- [ ] **Téléphonie d'entreprise restructurée** :
  - [ ] Page principale avec vue d'ensemble
  - [ ] Trunk SIP (au compteur vs illimité)
  - [ ] 3CX PRO instance dédiée
  - [ ] 3CX SMB instance mutualisée multitenant
  - [ ] Mobilité (MVNO, Backup 4G)
  - [ ] **NOUVEAU** : PBX Yeastar (focus PME/cabinets médicaux)

### 2.3 Nouvelles pages services

- [ ] **Studio attente téléphonique** :
  - [ ] Exemples de messages audio SVI
  - [ ] Répondeur de fermeture
  - [ ] Musiques personnalisées libres de droits
  - [ ] Player audio intégré
- [ ] **Assistants vocaux IA** :
  - [ ] Présentation de l'IA dans le routage téléphonique
  - [ ] Cas d'usage concrets
  - [ ] Amélioration expérience client
- [ ] **NOUVELLE** : Page "Devis en ligne" centralisée
  - [ ] Boutons vers formulaires Tally spécialisés
  - [ ] Devis Trunk SIP
  - [ ] Devis portabilité
  - [ ] Devis 3CX
  - [ ] Devis Yeastar

### 2.4 Composants réutilisables avancés

- [ ] Composants DaisyUI + shadcn/ui
- [ ] Animations ReactBits pour texte
- [ ] Icônes Lineicons prioritaires
- [ ] Composants de formulaires hybrides (HubSpot + Tally)

## Phase 3 : Intégrations avancées (Semaine 4)

### 3.1 Intégration HubSpot étendue ✅

- [x] **Formulaires HubSpot natifs** :
  - [x] Formulaire de contact principal
  - [x] Tracking avancé des visiteurs
  - [x] Lead scoring automatique
- [x] **Tracking étendu** :
  - [x] Pixel de suivi HubSpot (Portail 26878201)
  - [x] Events personnalisés
  - [x] Attribution des sources
  - [x] Campagnes marketing
  - [x] Statistiques de visite détaillées

### 3.2 Intégration Tally + n8n

- [x] **Formulaires Tally spécialisés** ✅ :
  - [x] Formulaire devis Trunk SIP
  - [x] Formulaire devis portabilité
  - [x] Formulaire devis 3CX
  - [x] Formulaire devis Yeastar/PBX
- [x] Webhooks Tally configurés
- [x] Clé API Tally intégrée dans env.local
- [x] Intégration prête pour n8n- [ ] **Automatisations n8n** :
  - [ ] Webhook Tally → n8n
  - [ ] Notification email équipe commerciale
  - [ ] Import automatique dans HubSpot CRM
  - [ ] Création de transactions HubSpot
  - [ ] Récupération données essentielles

### 3.3 Blog dynamique HubSpot ✅

- [x] API de récupération des articles HubSpot
- [x] Pages de listing avec pagination
- [x] Pages individuelles d'articles
- [x] Système de catégories et tags
- [x] SEO automatique des articles
- [x] Commentaires désactivés
- [x] Intégration URLR pour raccourcissement automatique

### 3.4 Chatbot intelligent

- [ ] **Développement chatbot** :
  - [ ] Base de connaissances entreprise
  - [ ] Réponses automatiques aux questions fréquentes
  - [ ] Collecte d'informations de contact :
    - [ ] Nom, prénom
    - [ ] Nom de l'entreprise
    - [ ] Numéro de téléphone portable
    - [ ] Adresse email
- [ ] **Intégration chatbot → n8n → HubSpot** :
  - [ ] Export automatique des contacts
  - [ ] Création de leads dans HubSpot
  - [ ] Attribution source "chatbot"

## Phase 4 : Optimisation et Performance (Semaine 5)

### 4.1 Performance optimisée

- [ ] Optimisation images WebP avec lazy loading
- [ ] Code splitting et lazy loading composants
- [ ] Core Web Vitals > 90 (toutes pages)
- [ ] Temps de chargement < 2s
- [ ] **NOUVEAU** : Tests spécifiques MacBook Pro 13", 14", 15"

### 4.2 SEO avancé

- [ ] Meta tags optimisés pour chaque page
- [ ] Structured data (JSON-LD) complète
- [ ] Sitemap XML automatique
- [ ] Robots.txt optimisé
- [ ] Open Graph et Twitter Cards
- [ ] **NOUVEAU** : SEO pages services et chatbot

### 4.3 Responsive design étendu

- [ ] Breakpoints : 320px, 868px, 1024px, 1440px
- [ ] Tests iOS/Android complets
- [ ] **NOUVEAU** : Tests MacBook Pro 13", 14", 15"
- [ ] Navigation tactile optimisée
- [ ] Interface chatbot responsive

### 4.4 Accessibilité et légal

- [ ] Audit WCAG 2.1 niveau AA
- [ ] Contraste des couleurs validé
- [ ] Navigation au clavier
- [ ] **NOUVEAU** : Pages légales (CGV, Confidentialité)
- [ ] **NOUVEAU** : Conformité RGPD chatbot

## Phase 5 : Tests et Déploiement (Semaine 6)

### 5.1 Tests étendus

- [ ] **Tests unitaires** (Vitest + scripts personnalisés)
  - [ ] Composants React
  - [ ] Intégrations HubSpot
  - [ ] Webhooks Tally
  - [ ] Chatbot
- [ ] **Tests d'intégration**
  - [ ] Formulaires HubSpot ↔ Tally
  - [ ] Automatisations n8n
  - [ ] Synchronisation blog HubSpot
  - [ ] Chatbot → CRM
- [ ] **Tests E2E**
  - [ ] Parcours utilisateur complet
  - [ ] Conversion funnel
  - [ ] Tests sur MacBook Pro différentes tailles

### 5.2 Tests de performance

- [ ] Lighthouse CI sur toutes les pages
- [ ] Tests de charge
- [ ] Validation Core Web Vitals
- [ ] **NOUVEAU** : Tests performance chatbot

### 5.3 Déploiement avec CI/CD

- [ ] **Configuration Vercel + GitHub**
  - [ ] Pipeline CI/CD automatisé
  - [ ] Tests automatiques sur PR
  - [ ] Déploiement automatique main branch
- [ ] Variables d'environnement sécurisées
- [ ] Domaine custom (e2i-voip.com)
- [ ] SSL et sécurité renforcée
- [ ] Monitoring et alertes

## Phase 6 : Post-lancement (Semaine 7)

### 6.1 Monitoring étendu

- [ ] Google Analytics 4 avec événements personnalisés
- [ ] Google Search Console
- [x] HubSpot Analytics + campagnes ✅
  - [x] Script de suivi configuré (Portail 26878201)
  - [x] Tracking visiteurs actif
- [ ] Monitoring erreurs (Sentry)
- [ ] **NOUVEAU** : Analytics chatbot
- [ ] **NOUVEAU** : Suivi conversions Tally

### 6.2 Optimisations continues

- [ ] A/B testing des CTA
- [ ] Optimisation chatbot basée sur les données
- [ ] Amélioration continue UX
- [ ] Formation équipe sur nouveaux outils
- [ ] **NOUVEAU** : Optimisation automatisations n8n

## Technologies utilisées

### Frontend étendu

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion + ReactBits
- **Icons** : Lineicons (prioritaire) + Lucide React
- **Forms** : React Hook Form + Zod

### Backend & Intégrations

- **CMS** : HubSpot (blog, CRM, analytics)
- **Forms** : Tally (devis spécialisés)
- **Automation** : n8n (workflows)
- **Chatbot** : Solution à définir (Voiceflow, Botpress, ou custom)
- **API** : HubSpot API + Tally webhooks

### Deployment & CI/CD

- **Hosting** : Vercel
- **Version Control** : GitHub avec Actions
- **CDN** : Vercel Edge Network
- **Images** : Next.js Image Optimization
- **Analytics** : GA4 + HubSpot + Tally

### Testing étendu

- **Unit Tests** : Vitest + scripts personnalisés
- **E2E Tests** : Playwright
- **Performance** : Lighthouse CI
- **Integration** : Tests automatisés HubSpot + Tally + n8n

## Configuration requise étendues

### Variables d'environnement

```env
# HubSpot
HUBSPOT_API_KEY=your_hubspot_api_key
HUBSPOT_PORTAL_ID=your_portal_id

# Tally
TALLY_WEBHOOK_SECRET=your_tally_webhook_secret
TALLY_API_KEY=your_tally_api_key

# n8n
N8N_WEBHOOK_URL=your_n8n_webhook_url
N8N_API_KEY=your_n8n_api_key

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id

# Chatbot
CHATBOT_API_KEY=your_chatbot_api_key
CHATBOT_WIDGET_ID=your_widget_id
```

### Scripts npm étendus

```json
{
  "dev": "next dev --port 3000",
  "build": "next build",
  "start": "next start",
  "test": "vitest",
  "test:e2e": "playwright test",
  "test:integration": "vitest --config vitest.integration.config.ts",
  "lint": "next lint",
  "lint:fix": "next lint --fix",
  "type-check": "tsc --noEmit"
}
```

## Livraisons par phase mises à jour

### Phase 1

- Configuration complète multi-outils
- Documentation technique étendue
- Setup HubSpot + Tally + n8n

### Phase 2

- Pages restructurées avec nouveau contenu
- Navigation optimisée multi-devices
- Design system DaisyUI + shadcn/ui

### Phase 3

- Intégrations complètes (HubSpot + Tally + n8n)
- Blog dynamique HubSpot
- Chatbot opérationnel avec CRM

### Phase 4

- Site optimisé (performance + SEO + légal)
- Tous les audits dans le vert
- Conformité RGPD complète

### Phase 5

- Tests complets tous systèmes
- CI/CD GitHub + Vercel
- Déploiement production sécurisé

### Phase 6

- Analytics multi-plateformes
- Formation équipe complète
- Plan d'optimisation continue automatisé

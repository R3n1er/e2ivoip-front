# Product Requirements Document (PRD)

## Site Web E2I VoIP - Version Moderne

### 1. Vue d'ensemble du projet

**Objectif** : Développer une version moderne et améliorée du site web e2i-voip.com avec un design contemporain, une navigation intuitive et une intégration HubSpot pour le CRM.

**Vision** : Créer une expérience utilisateur exceptionnelle qui convertit les visiteurs en leads qualifiés pour les services VoIP et téléphonie d'entreprise.

### 2. Objectifs métier

- **Conversion** : Augmenter le taux de conversion de 25%
- **Engagement** : Réduire le taux de rebond de 30%
- **SEO** : Améliorer le classement dans les moteurs de recherche
- **Mobile** : Assurer une expérience mobile optimale (Core Web Vitals > 90)
- **CRM** : Intégration complète avec HubSpot pour le suivi des leads, des campagnes marketing et des statistiques de visite

### 3. Public cible

- **Primaire** : Entreprises de 5-500 employés cherchant des solutions VoIP
- **Secondaire** : Chef d'entreprise,Directeurs d'entreprise, Décideurs IT, directeurs techniques, DAF
- **Tertiaire** : Prestataires informatique, Infogerance, Consultants en télécom, revendeurs

### 4. Fonctionnalités requises

#### 4.1 Navigation et Structure

- Menu principal conforme au sitemap fourni
- Navigation mobile responsive avec menu hamburger
- Breadcrumbs pour les pages internes
- Recherche interne
- Bouton d'appel a l'action pour prendre contact -> redirection vers formulaire de contact Hubspot

#### 4.2 Pages principales

- **Accueil** : Hero section, services, témoignages, logos clients, CTA, Footer avec logo des partenaires, informations légales et RGPD. Le footer doit avoir en lien la politique de confidentialité et les conditions générales de vente.
- **Qui sommes-nous** : Histoire, équipe, valeurs, certifications, nos partenaires
- **Telephonie d'entreprise** :
  - Trunk SIP (au compteur, illimité)
  - Téléphonie d'entreprise (Offre 3CX PRO instance dédiée, Offre 3CX SMB instance Mutualisée multitenant)
  - Mobilité (Telephonie mobile MVNO,Backup 45)
  - Intégration PBX Yeastar (Ideale pour les petites entreprises et les cabinets medicaux)
- **Nos services**
  - Studio attente téléphonique (exemple de messages audio SVI et de prédécroché ou répondeur de fermeture avec musique personnalisée libre de droits)
  - Assistants vocaux IA (accompagner les clients à mettre en oeuvre l'intelligence artificielle dans les règles de routage téléphonique des serveurs de téléphonie IP pour améliorer l'expérience client. )
- **Blog** : Articles synchronisés avec articles de blog HubSpot
- **Devis en ligne** : Page regroupant plusieurs bouton de lien vers formulaires de contact Tally (devis Trunk SIP, devis portabilité, devis serveur de téléphonie 3CX, devis projet PBX -- **intégration IPBX Yeastar**)

#### 4.3 Fonctionnalités techniques

- **Responsive Design** : Mobile-first approach
- **Performance** : Core Web Vitals optimisés
- **SEO** : Meta tags, structured data, sitemap XML. Le site doit permettre d'optimiser le référencement naturel.
- **Analytics** : Google Analytics 4, HubSpot tracking
- **Formulaires** : Intégration HubSpot native et Hook depuis formulaire tally avec des automatisme n8n déja mis en place. Ces automatismes permettent de notamment notifier lorsqu'un formulaire a été répondu, de récupérer les informations essentielles et transmettre une notification au groupe des commerciaux par mail et également intégrer les informations de contact dans le CRM HubSpot et également de créer des transactions dans HubSpot.
- **Blog** : Synchronisation automatique avec HubSpot CMS
- **Chatbot** : intégrer un chatbot qui permettrait en fournissant des informations de la société de répondre aux questions qu'il est possible et surtout récupérer les informations de contact du client, c'est-à-dire nom, prénom, nom de l'entreprise, numéro de téléphone portable et adresse mail. et ensuite il y aurait effectivement un automatisation avec n8n qui permettrait d'importer ces informations de contact dans le CRM HubSpot.

### 5. Charte graphique

#### 5.1 Couleurs principales

- **Rouge principal** : #E53E3E (CTA, boutons)
- **Bleu marine** : #2D3848 (texte principal, fond)
- **Gris** : #818096 (texte secondaire)
- **Blanc** : #FFFFFF (fond, cartes)

#### 5.2 Typographie

- **Titres** : Inter Bold
- **Corps de texte** : Inter Regular
- **CTA** : Inter Semi-Bold

#### 5.3 Éléments visuels

- **Animations** : Framer Motion pour les transitions
- **Icons** : Lineicons (Preffered), Lucide React
- **Images** : WebP optimisées, lazy loading
- **Logos clients** : Section dédiée avec carousel
- **Composants** : Utiliser des composants de la librairie Shadcn, optimiser avec DaisyUI

### 6. Intégration HubSpot

#### 6.1 CRM

- Tracking des visiteurs
- Lead scoring automatique
- Attribution des sources
- Formulaires natifs HubSpot
- Articles du blog

#### 6.2 Blog

- Synchronisation automatique des articles
- Catégories et tags
- SEO optimisé
- Commentaires désactivés

#### 6.3 Analytics

- Tableaux de bord personnalisés
- Rapports de conversion
- Suivi du parcours client

### 8. Intégration Tally

- Intégrer des formulaires Tally (Devis Trunk SIP, Devis 3CX, Devis Yeastar, Projet Voip)

### 8. Critères d'acceptation

#### 8.1 Performance

- Page Speed Insights > 90
- Core Web Vitals dans le vert
- Temps de chargement < 2s

#### 8.2 SEO

- Score Lighthouse SEO > 95
- Meta descriptions optimisées
- Structured data implementée

#### 8.3 Responsive

- Tests sur iOS/Android
- Test Macbook Pro 13'', 14'', 15''
- Breakpoints : 320px, 868px, 1024px, 1440px
- Navigation tactile optimisée

#### 8.4 Accessibilité

- WCAG 2.1 niveau AA
- Contraste des couleurs validé
- Navigation au clavier

### 9. Contraintes techniques

- **Framework** : Next.js 15
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion + ReactBits https://www.reactbits.dev/text-animations/split-text
- **CMS** : HubSpot pour le blog, gestion commerciale, devis, base de contact clients et leads prospects
- **Tests unitaires** : Vitest et scripts personnalisés
- **Hosting** : Vercel
- **CI/CD** : Github
- **Domaine** : e2i-voip.com

### 10. Risques et mitigation

| Risque                       | Impact | Probabilité | Mitigation                        |
| ---------------------------- | ------ | ----------- | --------------------------------- |
| Intégration HubSpot complexe | Élevé  | Moyen       | Documentation API, tests          |
| Performance mobile           | Élevé  | Faible      | Optimisation images, lazy loading |
| Migration SEO                | Moyen  | Faible      | Redirections 301, sitemap         |

### 11. Métriques de succès

- **Trafic organique** : +40% en 6 mois
- **Taux de conversion** : +25%
- **Leads qualifiés** : +50%
- **Core Web Vitals** : 100% des pages dans le vert
- **Mobile usability** : Score parfait GSC

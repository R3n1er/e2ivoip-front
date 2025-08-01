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
- **Chatbot** : Intégration Tawk.to avec exclusion des pages contact et devis en ligne. Récupération automatique des informations de contact (nom, prénom, entreprise, téléphone, email) et automatisation n8n pour import dans HubSpot CRM.

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

#### 6.1 CRM ✅

- [x] Tracking des visiteurs (Portail 26878201)
- [x] Lead scoring automatique
- [x] Attribution des sources
- [x] Formulaires natifs HubSpot
- [x] Articles du blog

#### 6.2 Blog ✅

- [x] Synchronisation automatique des articles
- [x] Catégories et tags
- [x] SEO optimisé
- [x] Commentaires désactivés
- [x] Intégration URLR pour raccourcissement automatique

#### 6.3 Analytics ✅

- [x] Tableaux de bord personnalisés
- [x] Rapports de conversion
- [x] Suivi du parcours client
- [x] Script de suivi configuré (Portail 26878201)

### 7. Intégration URLR

#### 7.1 Raccourcissement de liens d'articles

- **Automatisation** : Raccourcissement automatique des liens d'articles du blog HubSpot
- **Format des liens** : Inclusion du préfixe "e2ivoip" dans les URLs raccourcies
- **Exemple** : `urlr.me/e2ivoip-article-123` au lieu de l'URL complète HubSpot
- **API URLR** : Intégration avec l'API URLR v1 pour la création de liens raccourcis
- **Authentification** : Utilisation des access tokens URLR pour l'authentification API

#### 7.2 Fonctionnalités URLR

- **Création automatique** : Génération automatique de liens raccourcis lors de la publication d'articles
- **Métadonnées** : Ajout de métadonnées personnalisées (titre, description, image) pour les partages sociaux
- **Statistiques** : Suivi des clics et performances des liens raccourcis
- **QR Codes** : Génération automatique de QR codes pour les articles (optionnel)
- **Tags** : Organisation des liens avec des tags pour faciliter la gestion

#### 7.3 Workflow d'intégration

1. **Publication article HubSpot** → Déclenchement webhook
2. **Récupération URL article** → Extraction de l'URL complète
3. **Création lien raccourci** → Appel API URLR avec préfixe "e2ivoip"
4. **Mise à jour article** → Ajout du lien raccourci dans les métadonnées HubSpot
5. **Partage automatique** → Utilisation du lien raccourci pour les partages sociaux

#### 7.4 Configuration URLR

- **Access Token** : Configuration des tokens d'accès URLR
- **Team ID** : Configuration de l'espace de travail URLR
- **Format personnalisé** : Préfixe "e2ivoip" pour tous les liens d'articles
- **Métadonnées** : Configuration des métadonnées par défaut pour les partages

### 8. Intégration Tally ✅

- Intégrer des formulaires Tally (Devis Trunk SIP, Devis 3CX, Devis Yeastar, Projet Voip)

### 9. Intégration Tawk.to ✅

#### 9.1 Chatbot intelligent

- **Solution** : Intégration Tawk.to avec widget personnalisé
- **Widget ID** : 688d3cc109ef001928d4773f/1j1jrald3
- **Pages exclues** : /contact et /devis-en-ligne
- **Fonctionnalités** : Chat en direct, réponses automatiques, transfert vers commercial
- **Récupération données** : Nom, prénom, entreprise, téléphone, email

#### 9.2 Intégration n8n

- **Webhook Tawk.to** → n8n → HubSpot CRM
- **Automatisation** : Import automatique des contacts dans HubSpot
- **Notifications** : Alertes email pour nouveaux leads
- **Qualification** : Scoring automatique des leads selon l'activité

#### 9.3 Configuration technique

- **Chargement dynamique** : Script chargé uniquement sur les pages autorisées
- **Gestion d'état** : Affichage/masquage selon la page
- **Performance** : Pas d'impact sur les Core Web Vitals
- **Responsive** : Widget adaptatif mobile/desktop

### 10. Critères d'acceptation

#### 10.1 Performance

- Page Speed Insights > 90
- Core Web Vitals dans le vert
- Temps de chargement < 2s

#### 10.2 SEO

- Score Lighthouse SEO > 95
- Meta descriptions optimisées
- Structured data implementée

#### 10.3 Responsive

- Tests sur iOS/Android
- Test Macbook Pro 13'', 14'', 15''
- Breakpoints : 320px, 868px, 1024px, 1440px
- Navigation tactile optimisée

#### 10.4 Accessibilité

- WCAG 2.1 niveau AA
- Contraste des couleurs validé
- Navigation au clavier

### 11. Contraintes techniques

- **Framework** : Next.js 15
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion + ReactBits https://www.reactbits.dev/text-animations/split-text
- **CMS** : HubSpot pour le blog, gestion commerciale, devis, base de contact clients et leads prospects
- **Raccourcissement de liens** : URLR API v1 pour les liens d'articles du blog
- **Tests unitaires** : Vitest et scripts personnalisés
- **Hosting** : Vercel
- **CI/CD** : Github
- **Domaine** : e2i-voip.com

### 12. Risques et mitigation

| Risque                       | Impact | Probabilité | Mitigation                        |
| ---------------------------- | ------ | ----------- | --------------------------------- |
| Intégration HubSpot complexe | Élevé  | Moyen       | Documentation API, tests          |
| Performance mobile           | Élevé  | Faible      | Optimisation images, lazy loading |
| Migration SEO                | Moyen  | Faible      | Redirections 301, sitemap         |

### 13. Métriques de succès

- **Trafic organique** : +40% en 6 mois
- **Taux de conversion** : +25%
- **Leads qualifiés** : +50%
- **Core Web Vitals** : 100% des pages dans le vert
- **Mobile usability** : Score parfait GSC

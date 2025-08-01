# E2I VoIP - Site Web Moderne

Site web moderne pour E2I VoIP avec Next.js 15, Tailwind CSS, DaisyUI et shadcn/ui.

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS + DaisyUI + shadcn/ui
- **Animations** : Framer Motion
- **Tests** : Vitest + Testing Library
- **CMS** : HubSpot (CRM + Blog + Analytics)
- **Formulaires** : Tally (devis spécialisés)
- **Automatisation** : n8n (workflows)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte HubSpot
- Compte Tally
- Instance n8n

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone https://github.com/alban/e2ivoip-front.git
cd e2ivoip-front
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp env.example .env.local
# Éditer .env.local avec vos clés API
```

4. **Vérifier la configuration**
```bash
node scripts/check-setup.js
```

## 🏃‍♂️ Démarrage Rapide

### Serveur de développement
```bash
npm run dev
```
Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Tests
```bash
# Tests unitaires
npm test

# Tests avec interface
npm run test:ui

# Tests de couverture
npm run test:coverage
```

### Build de production
```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
e2ivoip-front/
├── app/                    # Pages Next.js (App Router)
├── components/             # Composants React réutilisables
│   ├── ui/                # Composants shadcn/ui
│   └── ...
├── lib/                   # Utilitaires et configurations
├── tests/                 # Tests unitaires et d'intégration
├── scripts/               # Scripts utilitaires
├── public/                # Assets statiques
└── documentations/        # PRD, Roadmap, Implémentation
```

## 🔧 Configuration

### Variables d'Environnement

Copiez `env.example` vers `.env.local` et configurez :

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
```

## 🧪 Tests

Le projet utilise Vitest pour les tests unitaires :

```bash
# Exécuter tous les tests
npm test

# Tests en mode watch
npm test -- --watch

# Tests avec couverture
npm run test:coverage
```

## 📚 Documentation

- [PRD](./documentations/PRD.md) - Product Requirements Document
- [Roadmap](./documentations/roadmap.md) - Plan de développement
- [Implémentation](./documentations/implementation.md) - Plan d'implémentation technique

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
# Déployer sur Vercel avec GitHub
```

### Variables d'environnement de production
Configurez les variables d'environnement dans votre plateforme de déploiement.

## 📊 Monitoring

- **Performance** : Core Web Vitals > 90
- **SEO** : Lighthouse SEO > 95
- **Accessibilité** : WCAG 2.1 AA
- **Tests** : 100% de couverture critique

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est propriétaire d'E2I VoIP.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement.

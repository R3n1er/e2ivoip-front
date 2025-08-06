# 🚀 Guide Démarrage Strapi - Migration Blog E2I VoIP

## 📋 **Prérequis**

- Node.js 18+ installé
- npm ou yarn
- Navigateur web moderne
- Terminal/Command Prompt

## 🎯 **Objectif**

Ce guide vous accompagne dans la configuration de Strapi CMS pour gérer le blog E2I VoIP après la migration depuis HubSpot.

## 🏗️ **Architecture du projet**

```
e2ivoip-front/
├── app/                    # Frontend Next.js
├── backend/               # Strapi CMS
├── scripts/               # Scripts de migration
├── components/            # Composants React
└── lib/                   # Services et utilitaires
```

## 🚀 **Étape 1 : Démarrage de Strapi**

### 1.1 Naviguer vers le dossier backend

```bash
cd backend
```

### 1.2 Installer les dépendances (si pas déjà fait)

```bash
npm install
```

### 1.3 Démarrer Strapi en mode développement

```bash
npm run develop
```

**Résultat attendu :**

```
Welcome back!
To manage your project 🚀, go to the administration panel at:
http://localhost:1337/admin

To access the server ⚡️, go to:
http://localhost:1337
```

## ⚙️ **Étape 2 : Configuration initiale**

### 2.1 Accéder à l'interface d'administration

Ouvrez votre navigateur et allez sur : **http://localhost:1337/admin**

### 2.2 Créer le compte administrateur

Remplissez le formulaire avec :

- **First Name** : `Admin`
- **Last Name** : `E2I VoIP`
- **Email** : `admin@e2i-voip.com`
- **Password** : `E2IVoip2025!`
- **Confirm Password** : `E2IVoip2025!`

Cliquez sur **Let's start**

## 🔐 **Étape 3 : Configuration des permissions API**

### 3.1 Accéder aux paramètres

1. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
2. Cliquez sur **Users & Permissions plugin**

### 3.2 Configurer les permissions publiques

1. Cliquez sur **Roles** dans le menu de gauche
2. Cliquez sur **Public** (rôle public)
3. Dans la section **Blog Post**, activer :
   - ✅ **find** (pour lister les articles)
   - ✅ **findOne** (pour voir un article individuel)
4. Cliquez sur **Save**

## 🔑 **Étape 4 : Génération du token API**

### 4.1 Créer un token d'API

1. Dans **Settings**, cliquez sur **API Tokens**
2. Cliquez sur **Create new API Token**
3. Remplissez les informations :
   - **Name** : `E2I Blog Import`
   - **Description** : `Token pour import des articles de blog`
   - **Token type** : `Full access`
4. Cliquez sur **Save**

### 4.2 Copier le token

⚠️ **IMPORTANT** : Copiez le token généré (commence par `...`)

## 🔧 **Étape 5 : Configuration des variables d'environnement**

### 5.1 Modifier le fichier .env.local

```bash
# À la racine du projet
nano .env.local
```

### 5.2 Ajouter les variables Strapi

```bash
# Configuration Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=votre_token_ici
```

**Remplacez `votre_token_ici` par le token copié à l'étape 4.2**

## 📥 **Étape 6 : Import des articles**

### 6.1 Vérifier les articles extraits

```bash
# À la racine du projet
cd scripts
ls -la extracted-blog-content.json
```

### 6.2 Lancer l'import

```bash
npm run import
```

**Résultat attendu :**

```
🚀 Début de l'import des articles dans Strapi...
📖 10 articles trouvés pour l'import
✅ Article importé: [Titre de l'article]
🎉 Import terminé !
```

### 6.3 Vérifier l'import

1. Retourner sur **http://localhost:1337/admin**
2. Aller dans **Content Manager** → **Blog Post**
3. Vérifier que les 10 articles sont présents
4. Vérifier que les images sont uploadées

## 🧪 **Étape 7 : Test d'intégration**

### 7.1 Démarrer le frontend

```bash
# À la racine du projet
npm run dev
```

### 7.2 Tester l'API Strapi

```bash
curl http://localhost:1337/api/blog-posts
```

### 7.3 Vérifier le blog

- Aller sur **http://localhost:3000/blog**
- Vérifier que les articles s'affichent correctement

## 📊 **Vérification finale**

### ✅ Checklist de validation

- [ ] Strapi démarre sur http://localhost:1337
- [ ] Compte admin créé
- [ ] Permissions API configurées
- [ ] Token API généré et configuré
- [ ] 10 articles importés dans Strapi
- [ ] Images uploadées
- [ ] Frontend connecté à Strapi
- [ ] Blog accessible sur http://localhost:3000/blog

## 🚨 **Dépannage**

### Problème : Strapi ne démarre pas

```bash
# Vérifier les dépendances
cd backend
npm install

# Vérifier les logs
npm run develop
```

### Problème : Erreur de permissions

1. Vérifier que les permissions `find` et `findOne` sont activées
2. Redémarrer Strapi après modification des permissions

### Problème : Token API invalide

1. Régénérer un nouveau token
2. Mettre à jour `.env.local`
3. Redémarrer le frontend

### Problème : Import échoue

```bash
# Vérifier la connexion Strapi
curl http://localhost:1337/api/blog-posts

# Vérifier le token
echo $STRAPI_TOKEN
```

## 🎯 **Prochaines étapes**

1. **Adapter les composants** Next.js pour utiliser Strapi
2. **Configurer la production** (Railway/Render pour Strapi)
3. **Optimiser les performances** du blog
4. **Former l'équipe** à l'utilisation de Strapi

## 📞 **Support**

En cas de problème :

1. Vérifier les logs dans le terminal
2. Consulter la documentation Strapi
3. Contacter l'équipe technique E2I VoIP

---

**Guide créé le 5 août 2025 - Migration Strapi E2I VoIP**
**Version** : 1.0
**Statut** : En cours de migration

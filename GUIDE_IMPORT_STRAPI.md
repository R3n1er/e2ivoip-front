# 🚀 Guide Import Strapi - Migration Blog E2I VoIP

## ✅ **Étape 1 : Extraction terminée**

- **10 articles extraits** avec succès
- **40 images téléchargées** (4 par article)
- **Fichier JSON** : `scripts/extracted-blog-content.json`

## 🔧 **Étape 2 : Configuration Strapi**

### 1. Accéder à l'admin Strapi

```
http://localhost:1337/admin
```

### 2. Créer le compte administrateur

- Email : `admin@e2i-voip.com`
- Mot de passe : `E2IVoip2025!`
- Prénom : `Admin`
- Nom : `E2I VoIP`

### 3. Configurer les permissions API

1. Aller dans **Settings** → **Users & Permissions plugin**
2. Cliquer sur **Roles** → **Public**
3. Dans **Blog Post**, activer :
   - ✅ `find` (pour lister les articles)
   - ✅ `findOne` (pour voir un article)

### 4. Générer le token API

1. Aller dans **Settings** → **API Tokens**
2. Cliquer sur **Create new API Token**
3. Nom : `E2I Blog Import`
4. Description : `Token pour import des articles de blog`
5. Token type : `Full access`
6. Cliquer sur **Save**
7. **Copier le token** (commence par `...`)

### 5. Configurer les variables d'environnement

```bash
# Dans .env.local
STRAPI_TOKEN=votre_token_ici
STRAPI_URL=http://localhost:1337
```

## 📥 **Étape 3 : Import des articles**

### 1. Vérifier la configuration

```bash
cd scripts
npm run import
```

### 2. Vérifier l'import

- Aller dans **Content Manager** → **Blog Post**
- Vérifier que les 10 articles sont présents
- Vérifier que les images sont uploadées

## 🧪 **Étape 4 : Test d'intégration**

### 1. Démarrer le frontend

```bash
npm run dev
```

### 2. Tester l'API Strapi

```bash
curl http://localhost:1337/api/blog-posts
```

### 3. Vérifier le blog

- Aller sur `http://localhost:3000/blog`
- Vérifier que les articles s'affichent

## 📊 **Statut actuel**

- ✅ **Extraction** : 10 articles récupérés
- ✅ **Images** : 40 images téléchargées
- 🔄 **Strapi** : En cours de démarrage
- ⏳ **Configuration** : À faire
- ⏳ **Import** : À faire
- ⏳ **Test** : À faire

## 🎯 **Prochaines actions**

1. **Configurer Strapi** (admin + permissions + token)
2. **Importer les articles** dans Strapi
3. **Tester l'intégration** frontend/backend
4. **Adapter les composants** Next.js pour Strapi

---

_Guide créé le 5 août 2025 - Migration Strapi E2I VoIP_

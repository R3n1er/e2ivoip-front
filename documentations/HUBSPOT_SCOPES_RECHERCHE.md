# Recherche des Scopes HubSpot - Guide de Documentation

## Problème identifié

Les scopes `cms.blog.read` et `cms.blog_posts.read` ne sont pas visibles dans l'interface de configuration de l'application HubSpot. Il faut vérifier la documentation officielle pour identifier les bons scopes.

## Ressources de documentation à consulter

### 1. Documentation officielle HubSpot

- **URL principale** : https://developers.hubspot.com/docs/api
- **Section CMS** : https://developers.hubspot.com/docs/api/cms
- **Section Blogs** : https://developers.hubspot.com/docs/api/cms/blogs

### 2. Documentation des scopes OAuth

- **Scopes disponibles** : https://developers.hubspot.com/docs/api/oauth-quickstart-guide
- **Liste complète des scopes** : https://developers.hubspot.com/docs/api/oauth-overview

### 3. API Blogs spécifique

- **Blog Posts API** : https://developers.hubspot.com/docs/api/cms/blogs/blog-posts
- **Blogs API** : https://developers.hubspot.com/docs/api/cms/blogs/blogs

## Scopes potentiels à rechercher

### Scopes liés au contenu

- `content` ✅ (déjà présent)
- `cms.content.read`
- `cms.content.write`
- `cms.blog.read`
- `cms.blog_posts.read`
- `cms.blogs.read`
- `cms.blogs.blog_posts.read`

### Scopes liés au CMS

- `cms.domains.read` ✅ (déjà présent)
- `cms.functions.read` ✅ (déjà présent)
- `cms.knowledge_base.articles.read` ✅ (déjà présent)
- `cms.knowledge_base.settings.read` ✅ (déjà présent)
- `cms.membership.access_groups.read` ✅ (déjà présent)
- `cms.performance.read` ✅ (déjà présent)

### Scopes génériques

- `oauth` ✅ (déjà présent)

## Méthode de recherche

### 1. Recherche dans la documentation

1. Aller sur https://developers.hubspot.com/docs/api
2. Rechercher "blog" dans la barre de recherche
3. Consulter les pages liées aux blogs
4. Chercher les sections "Authentication" ou "Scopes"

### 2. Test des scopes existants

Utiliser l'outil de test créé dans `/admin/hubspot` :

1. Aller sur `/admin/hubspot`
2. Cliquer sur "Tester les scopes"
3. Vérifier si les scopes actuels suffisent

### 3. Recherche dans les exemples

1. Chercher des exemples d'utilisation de l'API blog
2. Identifier les scopes utilisés dans les exemples
3. Vérifier la documentation des endpoints

## Endpoints à tester

### Endpoints de blog

- `GET /cms/v3/blogs/posts` - Liste des articles
- `GET /cms/v3/blogs/posts/{postId}` - Article spécifique
- `GET /cms/v3/blogs` - Liste des blogs
- `GET /cms/v3/blogs/{blogId}` - Blog spécifique

### Endpoints de contenu

- `GET /cms/v3/content` - Contenu général
- `GET /cms/v3/content/{contentId}` - Contenu spécifique

## Scopes alternatifs possibles

### Si `cms.blog.read` n'existe pas

- `cms.blogs.read`
- `cms.content.read`
- `content` (peut être suffisant)

### Si `cms.blog_posts.read` n'existe pas

- `cms.blogs.blog_posts.read`
- `cms.content.read`
- `content` (peut être suffisant)

## Test de l'API avec différents scopes

### Test 1 : Scopes actuels

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     https://api.hubapi.com/cms/v3/blogs/posts
```

### Test 2 : Avec scope content uniquement

```bash
# Tester si le scope "content" suffit
```

### Test 3 : Avec scopes CMS génériques

```bash
# Tester avec les scopes CMS existants
```

## Résolution du problème

### Option 1 : Le scope `content` suffit

Si le scope `content` permet d'accéder aux articles de blog, alors les scopes spécifiques ne sont pas nécessaires.

### Option 2 : Scopes avec noms différents

Les scopes peuvent avoir des noms différents dans l'interface HubSpot :

- `cms.blog.read` → `cms.blogs.read`
- `cms.blog_posts.read` → `cms.blogs.blog_posts.read`

### Option 3 : Scopes inclus dans d'autres

Les permissions de blog peuvent être incluses dans :

- `cms.content.read`
- `cms.domains.read`
- `content`

## Actions à effectuer

1. **Consulter la documentation officielle**

   - Rechercher "blog scopes" dans la documentation
   - Vérifier les exemples d'authentification

2. **Tester avec l'outil créé**

   - Utiliser `/admin/hubspot`
   - Cliquer sur "Tester les scopes"
   - Analyser les résultats

3. **Vérifier les erreurs d'API**

   - Regarder les messages d'erreur détaillés
   - Identifier les scopes manquants

4. **Mettre à jour la configuration**
   - Ajouter les bons scopes dans l'application HubSpot
   - Mettre à jour le code si nécessaire

## Ressources supplémentaires

### Documentation HubSpot

- [OAuth Scopes](https://developers.hubspot.com/docs/api/oauth-overview)
- [Blog Posts API](https://developers.hubspot.com/docs/api/cms/blogs/blog-posts)
- [CMS API](https://developers.hubspot.com/docs/api/cms)

### Outils de test

- [HubSpot API Explorer](https://developers.hubspot.com/docs/api/overview)
- [OAuth Playground](https://developers.hubspot.com/docs/api/oauth-quickstart-guide)

## Prochaines étapes

1. Consulter la documentation officielle
2. Tester avec l'outil `/admin/hubspot`
3. Identifier les bons scopes
4. Mettre à jour la configuration
5. Tester la récupération d'articles

# Spec — Blog HubSpot via ISR (Design System Monolithe 2026)

> **Date** : 2026-03-29
> **Statut** : Proposition
> **Portail HubSpot** : 26878201
> **Audit reference** : Article "Fin du reseau cuivre en 2030" (e2i-voip.com)

---

## 1. Objectif

Remplacer l'integration Contentful (jamais deployee en production) par l'API Blog HubSpot CMS pour afficher les articles existants du portail 26878201. Les pages blog sont rendues en ISR (Incremental Static Regeneration) avec revalidation 10 minutes pour un SEO/GEO optimal.

## 2. Architecture

```
HubSpot CMS Blog API (portail 26878201)
  GET /cms/v3/blogs/posts
  GET /cms/v3/blogs/tags
       |
       v
lib/hubspot-blog.ts          <- Service unique (fetch + types)
       |
       v
app/blog/
  ├── page.tsx                <- Liste articles + recherche + filtres (ISR 10min)
  ├── [slug]/page.tsx         <- Article individuel + SEO metadata (ISR 10min)
  └── categorie/[slug]/
      └── page.tsx            <- Articles par tag/categorie (ISR 10min)
```

**Pas d'API routes** (`app/api/blog/*`) — les Server Components fetchent directement `lib/hubspot-blog.ts`. ISR gere le cache.

## 3. Service `lib/hubspot-blog.ts`

### 3.1 Interface TypeScript

```typescript
interface HubSpotBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;          // metaDescription ou 160 premiers caracteres de postBody
  htmlContent: string;      // postBody (HTML brut HubSpot)
  featuredImageUrl: string; // featuredImage
  featuredImageAlt: string; // featuredImageAltText
  author: string;           // blogAuthor.displayName
  authorAvatar: string;     // blogAuthor.avatar (optionnel)
  publishDate: string;      // publishDate (ISO 8601)
  updatedDate: string;      // updated (ISO 8601)
  tags: BlogTag[];          // tagIds resolus
  metaDescription: string;  // metaDescription
  seoTitle: string;         // htmlTitle ou pageTitle
  readingTime: number;      // calcule : Math.ceil(wordCount / 200)
}

interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

interface BlogListResponse {
  posts: HubSpotBlogPost[];
  total: number;
  hasMore: boolean;
  tags: BlogTag[];       // uniquement sur la page liste
}
```

### 3.2 Fonctions

```typescript
// Liste paginee d'articles publies
getHubSpotBlogPosts(options: {
  page?: number;        // defaut 1
  pageSize?: number;    // defaut 12
  tag?: string;         // filtre par tag slug
  search?: string;      // recherche texte (name__icontains)
}): Promise<BlogListResponse>

// Article unique par slug
getHubSpotBlogPost(slug: string): Promise<HubSpotBlogPost | null>

// Liste des tags disponibles
getHubSpotBlogTags(): Promise<BlogTag[]>
```

### 3.3 Configuration

```typescript
const HUBSPOT_BLOG_CONFIG = {
  BASE_URL: "https://api.hubapi.com",
  POSTS_ENDPOINT: "/cms/v3/blogs/posts",
  TAGS_ENDPOINT: "/cms/v3/blogs/tags",
  ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN,  // deja configure
  PORTAL_ID: "26878201",
};
```

**Variable d'environnement requise** : `HUBSPOT_ACCESS_TOKEN` (deja present dans `.env.local`).

### 3.4 Mapping HubSpot -> Interface

| Champ HubSpot API | Champ Interface | Transformation |
|---|---|---|
| `name` | `title` | Direct |
| `slug` | `slug` | Direct |
| `postBody` | `htmlContent` | Direct (HTML brut) |
| `metaDescription` | `metaDescription`, `excerpt` | Si vide, extraire 160 chars de postBody (strip HTML) |
| `featuredImage` | `featuredImageUrl` | Direct |
| `featuredImageAltText` | `featuredImageAlt` | Direct ou title fallback |
| `blogAuthor.displayName` | `author` | Direct |
| `blogAuthor.avatar` | `authorAvatar` | Direct (optionnel) |
| `publishDate` | `publishDate` | ISO 8601 |
| `updated` | `updatedDate` | ISO 8601 |
| `tagIds` | `tags` | Resoudre via endpoint tags |
| `htmlTitle` ou `pageTitle` | `seoTitle` | htmlTitle prioritaire |
| `postBody` word count | `readingTime` | `Math.ceil(stripHtml(postBody).split(/\s+/).length / 200)` |

## 4. Pages Blog

### 4.1 Liste — `app/blog/page.tsx`

**Type** : Server Component avec ISR

```typescript
export const revalidate = 600; // 10 minutes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | E2I VoIP — Telephonie IP, Trunk SIP, 3CX",
    description: "Actualites, guides et conseils telephonie IP pour les entreprises DOM et metropole.",
    openGraph: { ... },
  };
}
```

**Fonctionnalites** :
- Grille d'articles (3 colonnes desktop, 1 mobile)
- Pagination via `?page=2` (searchParams)
- Filtre par tag via `?tag=trunk-sip`
- Recherche via `?q=cuivre`
- 12 articles par page
- Tags cliquables sur chaque carte

**Composants UI** :
- `BlogPostCard` : Image featured + titre + excerpt + date + tags + reading time
- `BlogSearch` : Input recherche (style Monolithe — `rounded-none bg-gray-50`)
- `BlogTagFilter` : Liste tags cliquables
- `BlogPagination` : Navigation pages

### 4.2 Article — `app/blog/[slug]/page.tsx`

**Type** : Server Component avec ISR

```typescript
export const revalidate = 600;

export async function generateStaticParams() {
  const { posts } = await getHubSpotBlogPosts({ pageSize: 100 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getHubSpotBlogPost(params.slug);
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.featuredImageUrl],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags.map(t => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.featuredImageUrl],
    },
    alternates: {
      canonical: `https://www.e2i-voip.com/blog/${post.slug}`,
    },
  };
}
```

**Structure de la page** :

```
Breadcrumb : Blog > [Tag principal] > Titre article
---
Tag(s) cliquables
H1 titre (font-black tracking-[-0.04em] uppercase)
Meta : Auteur | Date (format FR) | Temps de lecture
---
Image featured (next/image, priority, pleine largeur)
---
<article class="prose prose-monolithe max-w-none">
  {sanitizedHtml}
</article>
---
Boutons partage social (liens statiques)
---
Articles relies (3 articles meme tag)
---
ContactSectionSimple (CTA pre-footer existant)
```

**Schema JSON-LD** (genere cote serveur) :

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Fin du reseau cuivre en 2030...",
  "image": "https://...",
  "author": { "@type": "Person", "name": "Alban" },
  "publisher": {
    "@type": "Organization",
    "name": "E2I VoIP",
    "logo": "https://www.e2i-voip.com/logo.png"
  },
  "datePublished": "2026-03-19",
  "dateModified": "2026-03-19",
  "description": "...",
  "mainEntityOfPage": "https://www.e2i-voip.com/blog/..."
}
```

### 4.3 Categorie — `app/blog/categorie/[slug]/page.tsx`

Meme layout que la liste, avec filtre tag pre-applique. `generateStaticParams()` depuis `getHubSpotBlogTags()`.

## 5. Style Monolithe pour le Contenu HTML

### 5.1 Plugin Tailwind Typography

Ajouter `@tailwindcss/typography` au projet :

```bash
npm install @tailwindcss/typography
```

Ajouter dans `tailwind.config.js` :

```javascript
plugins: [require("daisyui"), require("@tailwindcss/typography")],
```

### 5.2 Overrides Monolithe dans `globals.css`

```css
/* Style Monolithe pour le contenu blog (HTML HubSpot) */
.prose-monolithe {
  --tw-prose-body: #1F2937;
  --tw-prose-headings: #091421;
  --tw-prose-links: #E53E3E;
  --tw-prose-bold: #091421;
}

.prose-monolithe h2 {
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.prose-monolithe h3 {
  font-weight: 700;
  letter-spacing: -0.02em;
}

.prose-monolithe a {
  color: #E53E3E;
  text-decoration: none;
  font-weight: 600;
}

.prose-monolithe a:hover {
  color: #091421;
}

.prose-monolithe img {
  border-radius: 0;
}

.prose-monolithe blockquote {
  border-left-color: #E53E3E;
  border-radius: 0;
}

.prose-monolithe hr {
  border-color: rgba(9, 20, 33, 0.1);
}

.prose-monolithe ul li::marker {
  color: #E53E3E;
}
```

### 5.3 Sanitisation HTML

Utiliser `DOMPurify` (via `isomorphic-dompurify`) pour sanitiser le HTML HubSpot avant injection :

```typescript
import DOMPurify from "isomorphic-dompurify";

const cleanHtml = DOMPurify.sanitize(post.htmlContent, {
  ADD_TAGS: ["iframe"],  // si embeds video necessaires
  ADD_ATTR: ["target", "rel"],
});
```

## 6. Composants Blog (Style Monolithe)

### 6.1 BlogPostCard

```
┌──────────────────────────────┐
│  Image (next/image, aspect-video, rounded-none)  │
├──────────────────────────────┤
│  TAG TAG                     │  <- text-[10px] font-black uppercase tracking-[0.3em] text-red-primary
│  Titre de l'article          │  <- text-xl font-bold text-[#091421]
│  Extrait 2 lignes max...     │  <- text-sm text-gray-500 line-clamp-2
│  Alban · 19 mars 2026 · 3 min│  <- text-xs text-gray-400
└──────────────────────────────┘
```

Pas de shadow, pas de bordure. Separation par espacement (regle Sans-Ligne).

### 6.2 BlogBreadcrumb

```
Blog  >  Trunk SIP  >  Fin du reseau cuivre...
```

Style : `text-[10px] font-black uppercase tracking-[0.2em]`, separateur `>` en `text-gray-400`.

Schema `BreadcrumbList` JSON-LD genere automatiquement.

### 6.3 BlogSocialShare

Boutons partage **statiques** (liens `href` sans SDK JavaScript) :

- LinkedIn : `https://www.linkedin.com/sharing/share-offsite/?url={url}`
- Twitter/X : `https://twitter.com/intent/tweet?url={url}&text={title}`
- Facebook : `https://www.facebook.com/sharer/sharer.php?u={url}`
- Email : `mailto:?subject={title}&body={url}`

Style : Icones Lineicons dans des boutons `rounded-none border border-gray-200 hover:border-red-primary`.

### 6.4 BlogRelatedPosts

Affiche 3 articles avec le meme tag principal. Fetch via `getHubSpotBlogPosts({ tag, pageSize: 3 })` en excluant l'article courant.

## 7. SEO & GEO

### 7.1 Metadata par page

| Page | Title | Description |
|---|---|---|
| `/blog` | "Blog \| E2I VoIP" | Statique |
| `/blog/[slug]` | `post.seoTitle` | `post.metaDescription` |
| `/blog/categorie/[slug]` | "Articles {tag} \| Blog E2I VoIP" | Dynamique |

### 7.2 Sitemap

Etendre `app/sitemap.ts` pour inclure les URLs blog :

```typescript
const { posts } = await getHubSpotBlogPosts({ pageSize: 500 });
const blogUrls = posts.map((post) => ({
  url: `https://www.e2i-voip.com/blog/${post.slug}`,
  lastModified: post.updatedDate,
  changeFrequency: "monthly",
  priority: 0.7,
}));
```

### 7.3 Canonical URLs

Chaque article pointe vers `https://www.e2i-voip.com/blog/{slug}` comme URL canonique (le site NextJS, pas le HubSpot). Ceci signale a Google que la version NextJS est la source de verite.

### 7.4 Schema JSON-LD

- **Liste blog** : `CollectionPage` + `ItemList`
- **Article** : `BlogPosting` + `BreadcrumbList` + `Person` (auteur) + `Organization` (publisher)
- **Categorie** : `CollectionPage` avec filtre

### 7.5 GEO (Generative Engine Optimization)

- **Passages citables** : Le HTML HubSpot contient deja des paragraphes structures. Le `prose-monolithe` les rend proprement.
- **Headings clairs** : H2 en uppercase dense — les crawlers IA extraient facilement les sections.
- **Temps de lecture** : Signal de profondeur de contenu.
- **Schema enrichi** : Les LLMs utilisent le JSON-LD pour contextualiser le contenu.

## 8. Images

Les images HubSpot sont hebergees sur `*.hubfs.net` ou `*.hsforms.net`. Ajouter dans `next.config.js` :

```javascript
images: {
  remotePatterns: [
    // Existants (Contentful — a retirer apres migration)
    { protocol: "https", hostname: "images.ctfassets.net" },
    { protocol: "https", hostname: "assets.ctfassets.net" },
    // HubSpot Blog
    { protocol: "https", hostname: "**.hubfs.net" },
    { protocol: "https", hostname: "**.hsforms.net" },
    { protocol: "https", hostname: "www.e2i-voip.com" },
  ],
},
```

Les images dans le contenu HTML (`<img>` dans `postBody`) restent en `<img>` natif (pas de `next/image` dans le prose). Seule l'image featured utilise `next/image` avec `priority`.

## 9. Nettoyage

### Supprimer

- `lib/contentful-blog.ts` — Service Contentful
- `app/api/blog/list/route.ts` — API route liste (remplace par fetch direct)
- `app/api/blog/[slug]/route.ts` — API route article
- Dependance `contentful` dans `package.json`
- Variables `CONTENTFUL_*` dans `.env.example`
- Patterns `images.ctfassets.net` et `assets.ctfassets.net` dans `next.config.js` (apres verification)

### Conserver

- `components/blog/` — Composants UI (a adapter pour les nouvelles interfaces)
- `scripts/extract-blog-content.js` — Utilitaire (peut servir pour migration future)

### Ajouter

- Dependance `isomorphic-dompurify` (sanitisation HTML)
- Dependance `@tailwindcss/typography` (plugin prose)

## 10. Tests

### Jest

| Fichier | Description |
|---|---|
| `tests/hubspot-blog-service.test.ts` | Tests unitaires `lib/hubspot-blog.ts` (mock fetch, mapping, edge cases) |
| `tests/blog-page.test.tsx` | Rendu liste blog avec mock data |
| `tests/blog-post-page.test.tsx` | Rendu article avec HTML sanitise |

### Playwright

| Fichier | Description |
|---|---|
| `tests/e2e/blog-navigation.spec.ts` | Navigation liste → article → retour, pagination, filtres |
| `tests/e2e/blog-seo.spec.ts` | Verification meta tags, JSON-LD, canonical sur page article |

## 11. Hors Scope

- Commentaires sur les articles (pas de systeme de commentaires)
- Editeur d'articles dans NextJS (tout reste dans HubSpot)
- Recherche full-text avancee (la recherche HubSpot `name__icontains` suffit)
- Newsletter/abonnement blog (gere par HubSpot directement)
- Internationalisation (site FR uniquement)

## 12. Risques

| Risque | Impact | Mitigation |
|---|---|---|
| Quota API HubSpot | ISR reduit les appels a 1 fetch/10min/page | Surveiller usage dans le dashboard HubSpot |
| HTML HubSpot mal formate | Rendu casse dans prose | DOMPurify + tests sur vrais articles |
| Images HubSpot lentes | CWV degrades | CDN Vercel cache les reponses ISR |
| Slug change dans HubSpot | 404 sur NextJS | ISR regenere automatiquement, ajouter redirect si besoin |

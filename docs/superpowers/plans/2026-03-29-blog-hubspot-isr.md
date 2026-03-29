# Blog HubSpot ISR — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Contentful blog integration with HubSpot CMS Blog API, rendered via ISR (10min revalidation) with Monolithe 2026 design system.

**Architecture:** Server Components fetch `lib/hubspot-blog.ts` directly (no API routes). ISR caches pages on Vercel CDN. HTML content sanitized with DOMPurify and styled with `@tailwindcss/typography` + custom prose-monolithe class.

**Tech Stack:** Next.js 15 (App Router, ISR), HubSpot CMS API v3, DOMPurify, @tailwindcss/typography, Tailwind CSS, DaisyUI

**Security Note:** All HTML from HubSpot is sanitized via `isomorphic-dompurify` before rendering to prevent XSS.

---

## File Structure

### Create
- `lib/hubspot-blog.ts` — HubSpot CMS Blog service (types + fetch functions)
- `components/blog/blog-post-card.tsx` — Article card component (Monolithe style)
- `components/blog/blog-breadcrumb.tsx` — Breadcrumb with JSON-LD
- `components/blog/blog-social-share.tsx` — Static social share links
- `components/blog/blog-related-posts.tsx` — Related articles by tag
- `components/blog/blog-tag-filter.tsx` — Tag filter bar
- `components/blog/blog-json-ld.tsx` — JSON-LD schema components
- `tests/hubspot-blog-service.test.ts` — Unit tests for service
- `tests/blog-page.test.tsx` — Blog list page test

### Modify
- `app/blog/page.tsx` — Rewrite: Client Component to Server Component ISR
- `app/blog/[slug]/page.tsx` — Rewrite: Contentful to HubSpot + ISR
- `app/blog/categorie/[slug]/page.tsx` — Rewrite for HubSpot tags
- `app/globals.css` — Add prose-monolithe styles
- `tailwind.config.js` — Add @tailwindcss/typography plugin
- `next.config.js` — Add HubSpot image remotePatterns, remove Contentful
- `app/sitemap.ts` — Add dynamic blog URLs from HubSpot

### Delete
- `lib/contentful-blog.ts`
- `app/api/blog/list/route.ts`
- `app/api/blog/[slug]/route.ts`

---

## Task 1: Install Dependencies + Config

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Modify: `next.config.js`

- [ ] **Step 1: Install dependencies**

```bash
npm install isomorphic-dompurify @tailwindcss/typography
```

- [ ] **Step 2: Add typography plugin to tailwind.config.js**

Update plugins array:
```javascript
plugins: [require("daisyui"), require("@tailwindcss/typography")],
```

- [ ] **Step 3: Update next.config.js remotePatterns**

Replace Contentful patterns with HubSpot:
```javascript
remotePatterns: [
  { protocol: "https", hostname: "www.e2i-voip.com" },
  { protocol: "https", hostname: "**.hubfs.net" },
  { protocol: "https", hostname: "**.hsforms.net" },
],
```

- [ ] **Step 4: Verify build** — `npm run build` — succeeds

- [ ] **Step 5: Commit**
```bash
git add package.json package-lock.json tailwind.config.js next.config.js
git commit -m "chore: add @tailwindcss/typography + isomorphic-dompurify, update image remotePatterns for HubSpot"
```

---

## Task 2: HubSpot Blog Service

**Files:**
- Create: `lib/hubspot-blog.ts`
- Create: `tests/hubspot-blog-service.test.ts`

- [ ] **Step 1: Write failing test** — `tests/hubspot-blog-service.test.ts` with 5 tests (getHubSpotBlogPosts mapping, slug strip, excerpt fallback, getHubSpotBlogPost single+null, getHubSpotBlogTags)

- [ ] **Step 2: Run test** — `npm test -- tests/hubspot-blog-service.test.ts` — FAIL (module not found)

- [ ] **Step 3: Implement** — Create `lib/hubspot-blog.ts` with types (`HubSpotBlogPost`, `BlogTag`, `BlogListResponse`), config, helpers (`stripHtml`, `calculateReadingTime`, `cleanSlug`, `mapHubSpotPost`), and API functions (`getHubSpotBlogPosts`, `getHubSpotBlogPost`, `getHubSpotBlogTags`)

Key implementation details:
- `cleanSlug()` strips `blog/` prefix from HubSpot slugs
- `mapHubSpotPost()` generates excerpt from postBody when metaDescription empty
- `getHubSpotBlogPost()` searches by `blog/{slug}` (full HubSpot slug)
- `hubspotFetch()` sets `next: { revalidate: 600 }` for ISR
- Posts and tags fetched in parallel via `Promise.all`

- [ ] **Step 4: Run tests** — `npm test -- tests/hubspot-blog-service.test.ts` — 5 PASS

- [ ] **Step 5: Commit**
```bash
git add lib/hubspot-blog.ts tests/hubspot-blog-service.test.ts
git commit -m "feat: add HubSpot CMS Blog service with types and tests"
```

---

## Task 3: Prose Monolithe Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add prose-monolithe CSS** after `.monolith-grid-lines` in globals.css

Variables: `--tw-prose-body: #1F2937`, `--tw-prose-headings: #091421`, `--tw-prose-links: #E53E3E`, `--tw-prose-bold: #091421`

Overrides: h2 `font-weight:900 letter-spacing:-0.04em uppercase`, h3 `font-weight:700`, links `color:#E53E3E no-underline`, img `border-radius:0`, blockquote `border-left-color:#E53E3E`, hr `border-color:rgba(9,20,33,0.1)`, list markers `color:#E53E3E`

- [ ] **Step 2: Verify build** — `npm run build` — succeeds

- [ ] **Step 3: Commit**
```bash
git add app/globals.css
git commit -m "style: add prose-monolithe CSS for blog content (Stitch 2026)"
```

---

## Task 4: Blog UI Components

**Files:**
- Create: `components/blog/blog-post-card.tsx`
- Create: `components/blog/blog-breadcrumb.tsx`
- Create: `components/blog/blog-social-share.tsx`
- Create: `components/blog/blog-related-posts.tsx`
- Create: `components/blog/blog-tag-filter.tsx`
- Create: `components/blog/blog-json-ld.tsx`

- [ ] **Step 1: BlogPostCard** — Image (next/image aspect-video) + tags (text-[10px] tracking-[0.3em] red-primary) + title (text-xl font-bold) + excerpt (line-clamp-2) + meta (author, date FR, reading time)

- [ ] **Step 2: BlogBreadcrumb** — nav with ol, text-[10px] font-black uppercase tracking-[0.2em], separator ">", `generateBreadcrumbJsonLd()` function for schema

- [ ] **Step 3: BlogSocialShare** — Static href links (LinkedIn, Twitter, Facebook, Email), icons Lineicons, rounded-none border hover:border-red-primary

- [ ] **Step 4: BlogRelatedPosts** — Async Server Component, fetches 3 posts same tag via `getHubSpotBlogPosts({ tag, pageSize: 4 })`, excludes current post

- [ ] **Step 5: BlogTagFilter** — Links to `/blog/categorie/{slug}`, active state border-red-primary, "Tous" links to /blog

- [ ] **Step 6: BlogJsonLd** — `BlogPostJsonLd` (BlogPosting schema) + `BlogListJsonLd` (CollectionPage + ItemList schema)

- [ ] **Step 7: Commit**
```bash
git add components/blog/
git commit -m "feat: add blog UI components (Monolithe 2026 style)"
```

---

## Task 5: Blog List Page (ISR)

**Files:**
- Rewrite: `app/blog/page.tsx`

- [ ] **Step 1: Rewrite as Server Component** — Remove "use client", import from `@/lib/hubspot-blog`, `export const revalidate = 600`, static metadata, async default function with `searchParams` (page, q, tag)

Layout: H1 "Blog" + red decorative line, search form (native HTML form GET), BlogTagFilter, grid 3 cols, pagination with Link components

- [ ] **Step 2: Verify build** — `npm run build` — /blog listed as static

- [ ] **Step 3: Commit**
```bash
git add app/blog/page.tsx
git commit -m "feat: rewrite blog list page as Server Component with ISR + HubSpot"
```

---

## Task 6: Blog Article Page (ISR)

**Files:**
- Rewrite: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Rewrite article page** — generateStaticParams from HubSpot, generateMetadata (OG, Twitter, canonical), DOMPurify sanitize htmlContent (security: prevents XSS from HubSpot HTML), `prose prose-lg prose-monolithe` container, Breadcrumb, SocialShare, RelatedPosts, ContactSectionSimple, BlogPostJsonLd + BreadcrumbList schema

- [ ] **Step 2: Verify build** — `npm run build` — /blog/[slug] routes generated

- [ ] **Step 3: Commit**
```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: rewrite blog article page with ISR + HubSpot + prose-monolithe"
```

---

## Task 7: Blog Category Page (ISR)

**Files:**
- Rewrite: `app/blog/categorie/[slug]/page.tsx`

- [ ] **Step 1: Rewrite category page** — generateStaticParams from tags, generateMetadata dynamic, same layout as list with tag pre-filtered, BlogTagFilter with activeTag

- [ ] **Step 2: Commit**
```bash
git add app/blog/categorie/[slug]/page.tsx
git commit -m "feat: rewrite blog category page with ISR + HubSpot tags"
```

---

## Task 8: Sitemap + Cleanup

**Files:**
- Modify: `app/sitemap.ts`
- Delete: `lib/contentful-blog.ts`, `app/api/blog/list/route.ts`, `app/api/blog/[slug]/route.ts`

- [ ] **Step 1: Update sitemap** — Make function async, import from hubspot-blog, add blog URLs (posts + tags + /blog index) with try/catch

- [ ] **Step 2: Delete Contentful files** — `rm lib/contentful-blog.ts app/api/blog/list/route.ts app/api/blog/[slug]/route.ts`

- [ ] **Step 3: Remove contentful dependency** — `npm uninstall contentful`

- [ ] **Step 4: Verify no broken imports** — `grep -r "contentful" lib/ app/ components/ --include="*.ts" --include="*.tsx"`

- [ ] **Step 5: Verify build** — `npm run build`

- [ ] **Step 6: Commit**
```bash
git add -A
git commit -m "feat: add blog to sitemap, remove Contentful integration"
```

---

## Task 9: Tests + Validation

**Files:**
- Create: `tests/blog-page.test.tsx`

- [ ] **Step 1: Write blog component tests** — BlogPostCard (renders title, excerpt, tags), BlogTagFilter (renders tags with active state), BlogSocialShare (renders 4 share links with aria-labels)

- [ ] **Step 2: Run all tests** — `npm run test:ci` — all pass (327+)

- [ ] **Step 3: Run build** — `npm run build` — succeeds

- [ ] **Step 4: Commit**
```bash
git add tests/blog-page.test.tsx
git commit -m "test: add blog component tests (BlogPostCard, TagFilter, SocialShare)"
```

---

## Task 10: Documentation Update

**Files:**
- Modify: `docs/implementation.md`
- Modify: `docs/ADR.md`

- [ ] **Step 1: Add Phase 6 Blog to implementation.md** — New section after Phase 5 with all actions checked

- [ ] **Step 2: Add ADR entry** — "Migration Blog Contentful -> HubSpot CMS API (ISR)" with context, decisions, consequences, tests

- [ ] **Step 3: Commit**
```bash
git add docs/implementation.md docs/ADR.md
git commit -m "docs: add Blog HubSpot ISR to implementation.md and ADR.md"
```

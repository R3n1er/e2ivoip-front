# Phase 3: Deploy Redesign + SEO Content - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning
**Source:** Synthesized from PROJECT.md, REQUIREMENTS.md, STATE.md, and git history

<domain>
## Phase Boundary

This phase deploys the completed Monolithe 2026 redesign and SEO content from the `dev` branch to production (`main`). It covers:
- Creating and merging PR2 (Redesign + Social Proof + Conversion) into main
- Creating and merging PR3 (SEO Content) into main
- Verifying PostHog captures before/after metrics
- Confirming all pages render correctly in production

This phase does NOT include new feature work — everything is already built and committed on `dev`.

</domain>

<decisions>
## Implementation Decisions

### Deployment Strategy
- 3-PR split strategy established in PROJECT.md: PR1 (PostHog) done, PR2 (Redesign+Social+Conv), PR3 (SEO Content)
- PR2 merges after PostHog baseline period (1-3 weeks of data collection) — DPLY-02
- PR3 (SEO Content) merges independently — DPLY-03
- The dev branch is 50 commits ahead of main, touching 48 files
- Vercel auto-deploys on merge to main — no manual deploy needed

### PR2 Scope (Redesign + Social Proof + Conversion)
- Phase 1 commits (PostHog SDK, provider, events) — already merged or ready
- Phase 2 commits (design system fixes, CTA refactor, PhoneLink, social proof, ContactSectionSimple)
- Key files: app pages (7 product pages), components (testimonials, contact, CTA, phone-link, footer, header), globals.css
- New components: `components/ui/phone-link.tsx`, `lib/constants/phone-numbers.ts`
- Modified components: `cta-button.tsx`, `testimonials-section-simple.tsx`, `contact-section-simple.tsx`, `footer.tsx`

### PR3 Scope (SEO Content)
- SEO-enriched content already committed on dev across all pages
- JSON-LD Service schema on 7 product pages (already validated)
- Corrected sitemap (14 real pages)
- This content was part of the original redesign branch work

### PostHog Baseline Verification
- PostHog is already running in production (merged in Phase 1 or will be with PR2)
- Need to verify PostHog dashboard shows sessions before AND after the redesign deploy
- Events tracked: cta_click, phone_click, form_submit
- DSGN-02: Monolithe 2026 design visible on ALL production pages after deploy

### Pre-merge Checklist
- All tests must pass (Jest + Playwright) — per CLAUDE.md workflow
- No lint or TypeScript errors
- Build must succeed
- No high/critical npm audit vulnerabilities
- .planning/ directory should NOT be included in PRs (dev-only artifacts)

### Claude's Discretion
- Whether to create PR2 and PR3 as separate PRs or combine into one (roadmap says separate)
- Whether to cherry-pick commits or merge the full dev branch
- Exact PR descriptions and titles
- Whether to run a pre-deploy smoke test locally before merge
- How to handle .planning/ files in the PR (exclude or gitignore)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Strategy
- `.planning/PROJECT.md` — Core value, 3-PR split decision, constraints
- `.planning/REQUIREMENTS.md` — DSGN-02, DPLY-02, DPLY-03 requirement definitions
- `.planning/STATE.md` — Current position (Phase 2 complete, ready for Phase 3)
- `.planning/ROADMAP.md` — Phase 3 success criteria and dependencies

### Phase 2 Artifacts (what was built)
- `.planning/phases/02-redesign-social-proof-conversion/02-01-SUMMARY.md` — Design system audit results
- `.planning/phases/02-redesign-social-proof-conversion/02-02-SUMMARY.md` — CTA refactor + phone links results
- `.planning/phases/02-redesign-social-proof-conversion/02-03-SUMMARY.md` — Social proof + page wiring results

### Project Configuration
- `CLAUDE.md` — Pre-push validation workflow (mandatory)
- `package.json` — Test/build/validate scripts

</canonical_refs>

<specifics>
## Specific Ideas

- The dev branch has 50 commits ahead of main touching 48 files
- Vercel auto-deploys on merge to main — preview deployments available on PR creation
- PostHog baseline data should already be collecting from Phase 1 work
- `.planning/` directory contains dev artifacts (plans, research, summaries) — should be excluded from production PRs or left as-is (they don't affect the build)
- The `.mcp.json` file in the diff is a local dev config — should NOT be committed to main
- `.env.keys` is listed as untracked — must NOT be committed (dotenvx secrets)

</specifics>

<deferred>
## Deferred Ideas

- A/B testing via PostHog feature flags — deferred to v2 (after 1 month of baseline data)
- Landing pages par campagne marketing — deferred to v2
- Google Business Profile integration — out of scope v1
- Blog content creation — future phase

</deferred>

---

*Phase: 03-deploy-redesign-seo-content*
*Context gathered: 2026-04-22 via synthesis from existing project artifacts*

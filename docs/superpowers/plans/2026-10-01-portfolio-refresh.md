# Evidence-Led Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing portfolio into an evidence-led, interactive presentation of Godwin's personal products and AI Automation work while preserving its current visual identity and engineering depth.

**Architecture:** Keep the Next.js application statically generated from one typed local project catalogue. Server Components render collections, metadata, Loom metadata, and case studies; small Client Components own playback, filtering, navigation state, and reduced-motion-aware reveals. Authentic media is preferred, with architecture diagrams as a resilient fallback.

**Tech Stack:** Next.js 16.3.6, React 19, TypeScript, CSS, Lucide React, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-10-01-portfolio-refresh-design.md`

## Global Constraints

- Preserve the existing light theme, teal system accent, typography character, architecture motif, and contact treatment.
- Public product names are Intelligent Invoice Processing, Operations Reporting & Decision Support, ProposalFlow, ContentStudio, LeadLens, RelayDesk, EchoRun, ChatDocs, and SignBridge.
- Use “AI Automation”; do not present the work as a “program” or use “Koya” in primary public titles.
- Feature EchoRun, SignBridge, RelayDesk, ChatDocs, and LeadLens in that order.
- Weeks 1–5 support Loom walkthroughs; RelayDesk uses a “Walkthrough coming soon” state; personal projects have no walkthrough UI.
- Never fabricate deployments, video IDs, credentials, metrics, results, or testimonials.
- Use Server Components by default; keep client boundaries focused.
- Every interaction must work without hover, remain keyboard accessible, and respect `prefers-reduced-motion`.
- Missing media or remote metadata must not fail static rendering or the production build.
- Do not deploy or publish without a separate explicit request.

## Review Focus

- A project with no image and failed Loom metadata must render the architecture fallback and retain accessible actions; covered in Task 2 media tests.
- A visitor using keyboard or touch must reach every project action without depending on hover; covered in Task 3 homepage tests and Task 7 browser verification.
- An unknown filter or disabled JavaScript must not make core projects undiscoverable; covered in Task 3 filtering and server-render tests.
- Renamed projects and any retained legacy slugs must produce correct metadata, sitemap entries, and redirects without duplicate canonical URLs; covered in Task 6 route tests.
- Reduced-motion visitors must receive no reveal/parallax dependency and must see all content immediately; covered in Task 5 motion tests and Task 7 browser verification.

---

## File Structure

### Content and selection

- `lib/project-types.ts` — canonical project, media, link, status, fact, and collection types.
- `content/projects/*.json` — local project records; add RelayDesk and SignBridge, rename existing products, and populate authentic repository/live data.
- `lib/projects.ts` — project lookup and collection selectors.
- `lib/project-validation.ts` — development/test-time catalogue validation without adding a schema dependency.

### Media and proof

- `lib/loom.ts` — cached Loom oEmbed lookup with deterministic fallback.
- `components/project-media.tsx` — server-side media selection.
- `components/loom-facade.tsx` — client-side click-to-play embed and lazy preview behavior.
- `components/project-actions.tsx` — live, walkthrough, and named repository actions.
- `components/project-status.tsx` — accessible live/limited/coming-soon state.
- `components/project-access.tsx` — honest demo notices and intentionally supplied shared credentials.
- `components/project-facts.tsx` — authentic project facts.
- `components/project-flow.tsx` — accessible flow visualization.

### Homepage and case studies

- `components/selected-work.tsx` — evidence-led flagship project presentation.
- `components/project-filter.tsx` — progressively enhanced project collection filter.
- `components/more-projects.tsx` — personal/applied-ML discovery section.
- `components/automation-progression.tsx` — six-project AI Automation progression.
- `components/case-study-layout.tsx` — proof-first project page composition.
- `components/case-study-navigation.tsx` — section and previous/next navigation.
- `components/reveal.tsx` — small reduced-motion-aware reveal boundary.
- `app/page.tsx`, `app/work/[slug]/page.tsx` — route composition.
- `app/styles/base.css`, `app/styles/home.css`, `app/styles/case-study.css` — preserved and evolved design system.

### Metadata and verification

- `lib/metadata.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx` — renamed product metadata and canonical discovery.
- `tests/content/*`, `tests/components/*`, `tests/lib/*`, `tests/smoke/*` — contract, rendering, accessibility, and route coverage.

---

### Task 1: Establish the canonical project catalogue

**Files:**
- Modify: `lib/project-types.ts`
- Create: `lib/project-validation.ts`
- Modify: `lib/projects.ts`
- Modify: `content/projects/part-1.json`
- Modify: `content/projects/part-2.json`
- Modify: `content/projects/part-3.json`
- Create: `content/projects/part-5.json`
- Modify: `content/projects.ts`
- Modify: `tests/content/projects.test.ts`

**Interfaces:**
- Produces: `Project`, `ProjectMedia`, `ProjectLink`, `ProjectFact`, `ProjectFlowStep`, `ProjectCollection`, and `ProjectStatus` types.
- Produces: `validateProjects(projects: Project[]): string[]`.
- Produces: `getFeaturedProjects()`, `getAutomationProjects()`, `getPersonalProjects()`, `getAppliedMlProjects()`, `getAdjacentProjects(slug)`.
- Consumes: existing architecture, decision, reliability, and evidence shapes.

- [ ] **Step 1: Write failing catalogue tests**

Assert the nine named products exist exactly once; selected work is EchoRun, SignBridge, RelayDesk, ChatDocs, LeadLens; AI Automation order contains six products; personal projects have no walkthrough; RelayDesk is `coming-soon`; duplicate slugs, malformed HTTPS links, empty available Loom IDs, fabricated empty facts, and unavailable media combinations produce validation errors.

- [ ] **Step 2: Run the catalogue test and verify RED**

Run: `pnpm test -- tests/content/projects.test.ts`

Expected: FAIL because the richer fields, projects, selectors, and validator do not exist.

- [ ] **Step 3: Define the catalogue interfaces and validator**

Implement exact discriminated media states:

```ts
type ProjectMedia =
  | { kind: "loom"; status: "available"; loomId: string; durationLabel: string; poster?: string }
  | { kind: "loom"; status: "pending-link"; durationLabel?: string; poster?: string }
  | { kind: "loom"; status: "coming-soon"; poster?: string }
  | { kind: "image"; src: string; alt: string }
  | { kind: "architecture" };
```

Define named links as `{ kind: "live" | "repository"; label: string; url: string }`, facts as `{ value: string; label: string }`, and collection membership as `"selected" | "personal" | "ai-automation" | "applied-ml"`.

- [ ] **Step 4: Migrate and complete project content**

Rename the existing records, add RelayDesk and SignBridge from their local repositories, preserve substantive case-study content, add known repository links, and add only the two confirmed live URLs from the spec. Represent unsupplied Loom/live links with absent actions or `pending-link`, not invented URLs.

- [ ] **Step 5: Implement selectors and adjacent navigation**

Use catalogue order for deterministic previous/next navigation. Ensure every valid case study is reachable from at least one homepage collection.

- [ ] **Step 6: Run catalogue tests and full content tests**

Run: `pnpm test -- tests/content`

Expected: PASS.

- [ ] **Step 7: Commit the catalogue migration**

```bash
git add lib/project-types.ts lib/project-validation.ts lib/projects.ts content/projects content/projects.ts tests/content
git commit -m "feat: expand portfolio project catalogue"
```

---

### Task 2: Build resilient project media and proof components

**Files:**
- Create: `lib/loom.ts`
- Create: `components/loom-facade.tsx`
- Create: `components/project-media.tsx`
- Create: `components/project-actions.tsx`
- Create: `components/project-status.tsx`
- Create: `components/project-access.tsx`
- Create: `components/project-facts.tsx`
- Create: `components/project-flow.tsx`
- Modify: `components/project-visual.tsx`
- Create: `tests/lib/loom.test.ts`
- Create: `tests/components/project-media.test.tsx`
- Create: `tests/components/project-proof.test.tsx`

**Interfaces:**
- Consumes: Task 1 project media, links, facts, status, and flow types.
- Produces: `getLoomMeta(loomId: string): Promise<LoomMeta>` where fallback is `{ thumbnailUrl: null, previewUrl: null, width: 16, height: 9 }`.
- Produces: `<ProjectMedia project priority variant />`, `<ProjectActions links />`, `<ProjectStatus status />`, `<ProjectAccess access />`, `<ProjectFacts facts />`, and `<ProjectFlow steps />`.

- [ ] **Step 1: Write failing Loom and media-state tests**

Cover successful oEmbed normalization, HTTP/network/invalid-payload fallback, available walkthrough click-to-play behavior, pending-link and coming-soon copy, personal image rendering, missing-image architecture fallback, meaningful accessible labels, and access notices that never expose absent credentials.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `pnpm test -- tests/lib/loom.test.ts tests/components/project-media.test.tsx tests/components/project-proof.test.tsx`

Expected: FAIL because the helpers and components do not exist.

- [ ] **Step 3: Implement `getLoomMeta` and `LoomFacade`**

Fetch `https://www.loom.com/v1/oembed?url=https://www.loom.com/share/${loomId}` with `cache: "force-cache"`; validate strings and positive dimensions; render no iframe before activation; use a descriptive play button; never autoplay until clicked.

- [ ] **Step 4: Implement media selection and proof components**

`ProjectMedia` chooses available Loom, pending/coming-soon poster, local image, or `ProjectVisual`. Actions render only supplied HTTPS links. `ProjectAccess` renders supplied notices and only intentionally provided demo credentials. Facts render only non-empty authentic entries. Flow remains an ordered list in the accessibility tree even when visually horizontal.

- [ ] **Step 5: Add proof/media styling**

Extend the existing design tokens and CSS. Keep media aspect ratios stable, make actions visible without hover, and include reduced-motion styles.

- [ ] **Step 6: Run focused and existing component tests**

Run: `pnpm test -- tests/lib/loom.test.ts tests/components/project-media.test.tsx tests/components/project-proof.test.tsx tests/components/project-card.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit media infrastructure**

```bash
git add lib/loom.ts components tests/components tests/lib app/styles
git commit -m "feat: add resilient project proof media"
```

---

### Task 3: Rebuild the homepage around selected work and collections

**Files:**
- Modify: `components/hero.tsx`
- Create: `components/selected-work.tsx`
- Create: `components/project-filter.tsx`
- Create: `components/more-projects.tsx`
- Modify: `components/project-card.tsx`
- Modify: `components/automation-progression.tsx`
- Modify: `app/page.tsx`
- Modify: `app/styles/home.css`
- Modify: `tests/components/home-sections.test.tsx`
- Modify: `tests/components/project-card.test.tsx`
- Create: `tests/components/project-filter.test.tsx`

**Interfaces:**
- Consumes: Task 1 selectors and Task 2 proof components.
- Produces: editorial homepage sections with server-rendered project content.
- Produces: `<ProjectFilter groups />` whose default is `"all"` and whose controls use pressed/selected semantics.

- [ ] **Step 1: Write failing homepage hierarchy tests**

Assert the sharper hero copy and primary action, five flagship projects in the approved set, six AI Automation projects with no public “program”/“Koya” labels, discoverable Malaria Detection, direct link actions on cards, and all projects present in server-rendered markup before filtering.

- [ ] **Step 2: Write failing filter interaction tests**

Assert keyboard/click selection for All, Personal, AI Automation, and Applied ML; unknown state resets to All; controls have accessible selected state; filtered cards retain their direct actions.

- [ ] **Step 3: Run homepage tests and verify RED**

Run: `pnpm test -- tests/components/home-sections.test.tsx tests/components/project-card.test.tsx tests/components/project-filter.test.tsx`

Expected: FAIL against the current grid and five-item progression.

- [ ] **Step 4: Implement the evidence-led hero and selected work**

Preserve the system motif but make its active stage respond to hover/focus without hiding information. Build asymmetric/media-led selected work rows using `ProjectMedia`, `ProjectActions`, and concise copy.

- [ ] **Step 5: Implement AI Automation and More Projects collections**

Render all six automation projects and ensure remaining projects are reachable. Use filtering as progressive enhancement: initial HTML contains every card, and the client hides only after hydration and explicit selection.

Tighten the existing Experience and Toolkit spacing without removing content; preserve the About narrative and dark Contact card.

- [ ] **Step 6: Complete responsive editorial styling**

Desktop uses generous alternating rows; mobile collapses to one clear sequence with actions below media. Avoid duplicating full summaries between Selected Work and AI Automation.

- [ ] **Step 7: Run homepage tests**

Run: `pnpm test -- tests/components/home-sections.test.tsx tests/components/project-card.test.tsx tests/components/project-filter.test.tsx`

Expected: PASS.

- [ ] **Step 8: Commit the homepage redesign**

```bash
git add app/page.tsx app/styles/home.css components tests/components
git commit -m "feat: create evidence-led portfolio homepage"
```

---

### Task 4: Restructure case studies around product proof

**Files:**
- Modify: `components/case-study-layout.tsx`
- Create: `components/case-study-navigation.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `app/styles/case-study.css`
- Modify: `tests/components/case-study-layout.test.tsx`
- Create: `tests/components/case-study-navigation.test.tsx`

**Interfaces:**
- Consumes: Task 1 `getAdjacentProjects`, Task 2 proof components.
- Produces: proof-first case study with stable section IDs `overview`, `flow`, `architecture`, `decisions`, `reliability`, `result`, and `evidence`.
- Produces: `<CaseStudyNavigation currentSlug sections previous next />`.

- [ ] **Step 1: Write failing proof-first case-study tests**

Assert title/value proposition, relevant action order, media before engineering sections, facts and flow when present, stable section IDs, preserved technical sections, access notices, and no walkthrough UI for personal projects.

- [ ] **Step 2: Write failing previous/next navigation tests**

Assert first/middle/last boundaries, correct accessible labels, and deterministic links from catalogue order.

- [ ] **Step 3: Run case-study tests and verify RED**

Run: `pnpm test -- tests/components/case-study-layout.test.tsx tests/components/case-study-navigation.test.tsx`

Expected: FAIL against the current seven-section-only layout.

- [ ] **Step 4: Implement the proof-first composition**

Render product hero, actions, media, facts, and flow before the existing problem/system/architecture material. Keep technical prose unchanged unless naming or factual repository analysis requires correction.

- [ ] **Step 5: Implement case-study navigation and responsive styling**

Use a non-obscuring sticky section index only above the chosen desktop breakpoint; render normal inline navigation on small screens; add previous/next projects after evidence.

- [ ] **Step 6: Run case-study tests**

Run: `pnpm test -- tests/components/case-study-layout.test.tsx tests/components/case-study-navigation.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit the case-study redesign**

```bash
git add app/work components/case-study-layout.tsx components/case-study-navigation.tsx app/styles/case-study.css tests/components
git commit -m "feat: lead case studies with product proof"
```

---

### Task 5: Add purposeful motion and navigation feedback

**Files:**
- Create: `components/reveal.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/styles/base.css`
- Modify: `app/styles/home.css`
- Modify: `app/styles/case-study.css`
- Modify: `tests/components/navigation.test.tsx`
- Create: `tests/components/reveal.test.tsx`

**Interfaces:**
- Produces: `<Reveal as="div" className delayMs>` that never hides server content and becomes inert when reduced motion is requested.
- Produces: active-section navigation using `IntersectionObserver` with cleanup and a no-observer fallback.

- [ ] **Step 1: Write failing motion and navigation tests**

Assert content is visible before observer initialization, reveal state changes after intersection, reduced motion bypasses observation, observer cleanup runs, active navigation uses `aria-current="location"`, mobile menu closes on navigation/Escape, and body scrolling is restored on unmount.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `pnpm test -- tests/components/navigation.test.tsx tests/components/reveal.test.tsx`

Expected: FAIL because reveal and active navigation are absent.

- [ ] **Step 3: Implement Reveal without an animation dependency**

Use native `IntersectionObserver`, `matchMedia("(prefers-reduced-motion: reduce)")`, and CSS data attributes. Server output remains readable if JavaScript never runs.

- [ ] **Step 4: Add active navigation and mobile behavior**

Observe homepage landmarks, avoid active-section behavior on case-study routes, close on Escape/link activation, lock body scrolling only while the mobile overlay is open, and restore prior state during cleanup.

- [ ] **Step 5: Apply restrained motion**

Wrap only hero copy, section headings, selected project media, and major case-study blocks. Do not stagger every text fragment. Disable transforms/transitions in the existing reduced-motion media query.

- [ ] **Step 6: Run focused tests**

Run: `pnpm test -- tests/components/navigation.test.tsx tests/components/reveal.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit interaction polish**

```bash
git add components/reveal.tsx components/site-header.tsx app/styles tests/components
git commit -m "feat: add accessible portfolio interactions"
```

---

### Task 6: Update metadata, discovery, and legacy routes

**Files:**
- Modify: `lib/metadata.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/opengraph-image.tsx`
- Create: `app/work/[slug]/opengraph-image.tsx`
- Modify: `tests/lib/metadata.test.ts`
- Modify: `tests/smoke/app-shell.test.tsx`

**Interfaces:**
- Consumes: Task 1 catalogue and renamed product titles.
- Produces: canonical per-project metadata, complete sitemap entries, and any redirects needed for changed slugs.

- [ ] **Step 1: Write failing metadata and discovery tests**

Assert renamed project titles/descriptions, HTTPS canonicals, one sitemap entry per project, project-specific Open Graph copy/image route, no duplicate canonical URLs, and preservation of existing slugs (`proposal-studio`, `content-studio`, `koya-lead-agent`, `voice-agent`, and `rag-app`) despite display-name changes.

- [ ] **Step 2: Run metadata tests and verify RED**

Run: `pnpm test -- tests/lib/metadata.test.ts tests/smoke/app-shell.test.tsx`

Expected: FAIL for new names and catalogue size.

- [ ] **Step 3: Implement metadata and sitemap updates**

Keep all existing slugs when a display-name-only change preserves valid inbound links. Use `relaydesk` and `signbridge` for the two new routes; do not create speculative aliases.

- [ ] **Step 4: Update Open Graph presentation**

Use the refreshed positioning and selected product names while retaining the portfolio design system. Generate static parameters for project images and do not make network calls from image generation.

- [ ] **Step 5: Run metadata and smoke tests**

Run: `pnpm test -- tests/lib/metadata.test.ts tests/smoke/app-shell.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit discovery updates**

```bash
git add lib/metadata.ts app/sitemap.ts app/opengraph-image.tsx app/work tests
git commit -m "feat: refresh portfolio metadata and discovery"
```

---

### Task 7: Integrate supplied URLs, verify the complete experience, and document it

**Files:**
- Modify: `content/projects/*.json`
- Modify: `README.md`
- Modify as discovered: focused components/styles/tests only

**Interfaces:**
- Consumes: supplied live URLs, Loom IDs/durations, authentic screenshots, and Tasks 1–6.
- Produces: release-ready local portfolio with documented content-update workflow.

- [ ] **Step 1: Add supplied links and media without changing the model**

Insert live URLs, Loom IDs/durations, repository links, access notes, and approved screenshots. If any remain unavailable, keep their explicit pending/coming-soon state and report them rather than inventing values.

- [ ] **Step 2: Run the complete automated suite**

Run: `pnpm test && pnpm lint && pnpm typecheck && pnpm build && git diff --check`

Expected: every command exits 0 with no test failures, lint errors, type errors, build errors, or whitespace errors.

- [ ] **Step 3: Perform desktop browser verification**

At 1440×900 verify hero hierarchy, all five selected projects, six AI Automation entries, filtering, every visible action, one Loom facade before/after play, one personal project, one fallback project, case-study navigation, and no console errors.

- [ ] **Step 4: Perform mobile and interaction verification**

At 390×844 verify no horizontal overflow, menu/Escape behavior, touch-visible actions, readable project media, filters, case-study flow, focus order, and no sticky element obscuring content.

- [ ] **Step 5: Verify reduced motion and failure fallbacks**

Emulate reduced motion and confirm content is immediately visible with no required transforms. Stub or temporarily invalidate Loom metadata in the test environment and confirm the architecture/poster fallback retains all actions.

- [ ] **Step 6: Update project documentation**

Document the content model, where screenshots live, how to add/update Loom media, quality commands, and which external links remain pending. Remove obsolete README claims about the old featured set.

- [ ] **Step 7: Commit final integration**

```bash
git add content public README.md components app tests
git commit -m "chore: finalize portfolio content and verification"
```

- [ ] **Step 8: Request final code review**

Use `superpowers:requesting-code-review` against the spec, this plan, and the full branch diff. Fix Critical and Important findings with regression tests, rerun Step 2, and report any Minor findings separately.

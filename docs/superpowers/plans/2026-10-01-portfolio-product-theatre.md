# Portfolio Product Theatre Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the overlong portfolio homepage with a concise, interactive product-theatre experience and dedicated AI Automation and AI Engineering collections, while rebuilding case studies and diagrams for professional visual quality.

**Architecture:** Keep the existing typed project catalogue as the single source of truth, but replace its collection taxonomy and selectors with exclusive `ai-automation` and `ai-engineering` ownership plus an independent featured flag. Compose the homepage from focused server-rendered sections with small client islands for the hero signal, project theatre, pointer-aware gateways, and route scroll behavior; use dedicated static collection routes and retain canonical `/work/[slug]` case studies.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS modules through the existing global stylesheet organization, Lucide React, Vitest, Testing Library, agent-browser visual verification.

**Spec:** `docs/superpowers/specs/2026-10-01-portfolio-product-theatre-design.md`

## Global Constraints

- Preserve the light neutral and teal identity while increasing contrast, depth, and typographic expression.
- Homepage featured order is RelayDesk, EchoRun, LeadLens, ChatDocs and no other project.
- AI Automation owns Intelligent Invoice Processing, Operations Reporting & Decision Support, ProposalFlow, ContentStudio, LeadLens, and RelayDesk in that order.
- AI Engineering owns EchoRun, ChatDocs, and SignBridge in that order.
- Collection ownership is exclusive; featured status does not change ownership.
- Remove Malaria Detection with CNNs from content, routes, metadata, sitemap, and UI.
- Use “AI Automation,” never “AI Automation Program”; do not use “Koya” in public copy.
- Use ContentStudio as the Week 4 public name.
- Personal projects never display walkthrough controls.
- Publish only supplied live links, repositories, Loom videos, credentials, and authentic media.
- Do not add a motion dependency; use React state, CSS transitions, pointer events, IntersectionObserver, and progressive browser APIs.
- Support 320px through large desktop widths with no horizontal page overflow and minimum 44px touch targets.
- Respect reduced motion and preserve server-rendered navigation/content without JavaScript.
- Visual browser review is the primary quality gate; automated tests remain targeted to grouping, routes, project removal, scroll reset, and essential interaction state.

## Review Focus

- Direct navigation from a deeply scrolled homepage to any collection or case study must land at `scrollY === 0`; Task 2 adds a route-reset regression and browser reproduction.
- Project theatre with JavaScript unavailable must expose the default project and direct links to all four case studies; Task 4 adds server-markup coverage.
- Diagram labels at 320px, long labels such as “Operations Reporting & Decision Support,” and six-node systems must not clip or overlap; Task 7 adds structural assertions and width-by-width screenshot inspection.
- Reduced-motion and coarse-pointer environments must not retain cursor tracking, staged transforms, or hidden content; Tasks 3, 4, and 5 include media-query browser checks.
- Static collection routes must not be swallowed by `/work/[slug]`, and removed project paths must not be generated; Task 1 covers route helpers and Task 6 verifies build output and sitemap entries.

---

### Task 1: Establish the final catalogue and collection contracts

**Files:**
- Modify: `lib/project-types.ts`
- Modify: `content/projects.ts`
- Modify: `content/projects/part-4.json`
- Modify: `lib/projects.ts`
- Create: `lib/work-collections.ts`
- Modify: `tests/content/projects.test.ts`
- Modify: `tests/lib/metadata.test.ts`

**Interfaces:**
- Produces: `ProjectCollection = "ai-automation" | "ai-engineering"`; `WorkCollection` with `id`, `title`, `eyebrow`, `description`, `projectSlugs`, and `motif`; `workCollections`; `getWorkCollection(id)`; `getCollectionProjects(id)`; `getProjectCollection(project)`; category-scoped `getAdjacentProjects(slug)`.
- Consumes: existing `Project`, `projects`, `featured`, `featuredOrder`, and `automationOrder` data.

- [ ] **Step 1: Write catalogue regressions** asserting the exact featured order, exact exclusive collection membership, exact collection ordering, absence of `malaria-detection`, and same-collection adjacency.
- [ ] **Step 2: Run `pnpm exec vitest run tests/content/projects.test.ts tests/lib/metadata.test.ts`** and confirm failures show the old taxonomy and malaria record.
- [ ] **Step 3: Replace the collection union and catalogue assignments**, remove the malaria source record and detail override, set the featured order, add `lib/work-collections.ts`, and update selectors/adjacency without changing supplied links or media.
- [ ] **Step 4: Tighten public summaries and category copy** so each description names the input, system behavior, user outcome, or reliability boundary; scan public values for forbidden legacy terms.
- [ ] **Step 5: Re-run the focused tests** and confirm all catalogue assertions pass.
- [ ] **Step 6: Commit** with `feat: organize work into portfolio collections`.

### Task 2: Make route entry and navigation position deterministic

**Files:**
- Create: `components/navigation/route-reset.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/resume/page.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/case-study-layout.tsx`
- Create: `tests/components/route-reset.test.tsx`
- Modify: `tests/components/navigation.test.tsx`

**Interfaces:**
- Produces: `RouteReset()` client component that distinguishes forward route changes from `popstate`; `<main id="main-content" tabIndex={-1}>` contract on home, collection, case-study, and resume pages.
- Consumes: Next.js `usePathname`, native hash behavior, existing navigation links.

- [ ] **Step 1: Add a failing route-reset test** proving a forward pathname change calls `window.scrollTo({ top: 0, left: 0, behavior: "instant" })`, while an unchanged pathname/hash interaction and a `popstate` history restoration do not.
- [ ] **Step 2: Run `pnpm exec vitest run tests/components/route-reset.test.tsx tests/components/navigation.test.tsx`** and confirm `RouteReset` is missing.
- [ ] **Step 3: Implement `RouteReset` and main-landmark contracts**, mark `popstate` before pathname effects so browser history can restore its position, preserve in-page hash navigation, make project/collection links use normal top navigation, and update header anchors for the new homepage IDs.
- [ ] **Step 4: Re-run focused tests**, then reproduce with agent-browser by scrolling below 8,000px on the current home route, opening a project, and asserting the destination `scrollY` and `h1` position.
- [ ] **Step 5: Commit** with `fix: reset portfolio routes to the page top`.

### Task 3: Build the visual foundation and dual-signal hero

**Files:**
- Modify: `content/site.ts`
- Rewrite: `components/hero.tsx`
- Create: `components/hero/dual-signal.tsx`
- Create: `app/styles/product-theatre.css`
- Modify: `app/styles/base.css`
- Modify: `app/globals.css`
- Modify: `tests/components/home-sections.test.tsx`

**Interfaces:**
- Produces: `DualSignal` client island with `activeLane: "automation" | "engineering" | null`; homepage IDs `top`, `work`, `collections`, `experience`, `about`, `contact`; shared motion variables `--ease-expressive`, `--duration-fast`, `--duration-state`, and `--duration-enter`.
- Consumes: site positioning copy, existing button/link styles, reduced-motion and pointer media queries.

- [ ] **Step 1: Update the homepage test** to require the AI Automation + AI Engineering positioning, two keyboard-operable lane controls, production-system convergence, and no unsupported statistics.
- [ ] **Step 2: Run the home-section test** and confirm it fails against the old hero.
- [ ] **Step 3: Implement the hero structure and DualSignal interaction** with semantic buttons, focus/hover parity, one entry sequence, pointer-relative depth, static reduced-motion state, and direct work/résumé actions.
- [ ] **Step 4: Create the new design tokens and hero CSS**, ensuring all labels fit at 320px and coarse pointers receive no cursor-dependent transform.
- [ ] **Step 5: Run the focused test and lint**, then capture 1440×900, 768×1024, and 390×844 screenshots; correct hierarchy, wrapping, contrast, and overflow before proceeding.
- [ ] **Step 6: Commit** with `feat: create dual-signal portfolio hero`.

### Task 4: Replace repeated featured rows with the project theatre

**Files:**
- Delete: `components/selected-work.tsx`
- Create: `components/project-theatre.tsx`
- Create: `components/project-theatre-stage.tsx`
- Modify: `components/project-media.tsx`
- Modify: `components/project-actions.tsx`
- Modify: `app/page.tsx`
- Modify: `app/styles/product-theatre.css`
- Modify: `tests/components/home-sections.test.tsx`
- Create: `tests/components/project-theatre.test.tsx`

**Interfaces:**
- Produces: `ProjectTheatre({ projects }: { projects: Project[] })`; `ProjectTheatreStage({ project, active }: { project: Project; active: boolean })`; button selector using `aria-pressed`; server-visible fallback links for all four projects.
- Consumes: `getFeaturedProjects()`, `ProjectMedia`, `ProjectActions`, project facts and stack.

- [ ] **Step 1: Add failing interaction and server-markup tests** for exact order, default RelayDesk state, selector changes to EchoRun/LeadLens/ChatDocs, updated actions/content, and four case-study links in static markup.
- [ ] **Step 2: Run the theatre tests** and confirm the component does not exist.
- [ ] **Step 3: Implement the client selector and stage** with no autoplay, an accessible state announcement, crossfade/slide state transition, authentic Loom proof for LeadLens, and architecture visuals for projects without screenshots.
- [ ] **Step 4: Implement desktop and mobile layouts**, choosing horizontal snap only if 320px and keyboard inspection remain clear; otherwise use a compact vertical card stack as specified.
- [ ] **Step 5: Run focused tests**, then screenshot every active project at 1440px and the complete section at 390px; inspect action visibility, media crop, text length, and transition continuity.
- [ ] **Step 6: Commit** with `feat: add interactive selected-project theatre`.

### Task 5: Create the collection gateways and finish the concise homepage

**Files:**
- Delete: `components/automation-progression.tsx`
- Delete: `components/more-projects.tsx`
- Delete: `components/project-filter.tsx`
- Delete: `components/toolkit-grid.tsx`
- Create: `components/work-gateways.tsx`
- Create: `components/collection-gateway.tsx`
- Create: `components/engineering-practice.tsx`
- Modify: `components/experience-timeline.tsx`
- Modify: `components/about-section.tsx`
- Modify: `components/contact-section.tsx`
- Modify: `app/page.tsx`
- Modify: `app/styles/product-theatre.css`
- Modify: `tests/components/home-sections.test.tsx`
- Delete: `tests/components/project-filter.test.tsx`

**Interfaces:**
- Produces: `WorkGateways`, `CollectionGateway`, and `EngineeringPractice`; collection links `/work/ai-automation` and `/work/ai-engineering`; homepage chapter order from the spec.
- Consumes: `workCollections`, current experience/education/contact data, pointer coordinates stored as CSS custom properties.

- [ ] **Step 1: Rewrite the homepage structure test** to require only the four featured projects, two category gateways and counts, four named engineering principles, condensed experience/profile/contact, and absence of catalogue/filter/toolkit sections.
- [ ] **Step 2: Run the test** and confirm it fails on the duplicated current homepage.
- [ ] **Step 3: Implement gateway cards** with project previews, collection motifs, pointer-origin reveal on fine pointers, clear focus/press states, and no hidden navigation dependency.
- [ ] **Step 4: Implement the engineering-practice section and compact supporting sections**, integrating technology evidence into specific examples and removing the standalone toolkit grid.
- [ ] **Step 5: Assemble the six-chapter homepage**, remove obsolete components/tests, and run focused tests plus lint.
- [ ] **Step 6: Capture full-page screenshots at 1440px and 390px**; target a materially shorter page, verify rhythm between chapters, and correct any section that reads as filler or repeats project information.
- [ ] **Step 7: Commit** with `feat: focus homepage around work collections`.

### Task 6: Add dedicated AI Automation and AI Engineering pages

**Files:**
- Create: `components/work-collection-layout.tsx`
- Create: `components/collection-project-row.tsx`
- Create: `app/work/ai-automation/page.tsx`
- Create: `app/work/ai-engineering/page.tsx`
- Create: `app/styles/collections.css`
- Modify: `app/globals.css`
- Modify: `app/sitemap.ts`
- Modify: `lib/metadata.ts`
- Create: `tests/components/work-collection-layout.test.tsx`
- Modify: `tests/lib/metadata.test.ts`

**Interfaces:**
- Produces: `WorkCollectionLayout({ collection, projects })`; `CollectionProjectRow({ project, index })`; `buildCollectionMetadata(collection)`; two static routes that take precedence over `/work/[slug]`.
- Consumes: collection helpers from Task 1, `ProjectMedia`, actions, facts, stack, header/footer.

- [ ] **Step 1: Add failing collection-page tests** for exact project membership/order, category-specific introduction, actions/walkthrough states, four-or-fewer stack labels, cross-collection link, collection metadata, sitemap inclusion, and malaria exclusion.
- [ ] **Step 2: Run the focused tests** and confirm collection routes/layout/metadata are absent.
- [ ] **Step 3: Implement the shared collection layout and alternating project rows**, with authentic proof media, concise copy, proof facts, and stable mobile ordering.
- [ ] **Step 4: Add both static routes, metadata, sitemap records, and “also explore” category navigation** without duplicating project records.
- [ ] **Step 5: Run focused tests and `pnpm build`**; confirm static output contains both collection pages, all nine project pages, and no malaria path.
- [ ] **Step 6: Screenshot both pages at 1440px and 390px**, checking alternation, media size, scan speed, action visibility, and category distinction.
- [ ] **Step 7: Commit** with `feat: add focused work collection pages`.

### Task 7: Rebuild preview, flow, and architecture diagrams

**Files:**
- Modify: `lib/project-types.ts`
- Modify: `content/projects.ts`
- Modify: `content/projects/part-1.json`
- Modify: `content/projects/part-2.json`
- Modify: `content/projects/part-3.json`
- Modify: `content/projects/part-4.json`
- Modify: `content/projects/part-5.json`
- Rewrite: `components/project-visual.tsx`
- Rewrite: `components/project-flow.tsx`
- Rewrite: `components/architecture-diagram.tsx`
- Create: `app/styles/diagrams.css`
- Modify: `app/globals.css`
- Create: `tests/components/diagram-system.test.tsx`
- Modify: `tests/components/project-card.test.tsx`

**Interfaces:**
- Produces: optional `architecture.previewNodeIds: string[]`; optional node `layer: string`; `ProjectVisual` showing 3–4 curated stages; `ArchitectureDiagram` with grouped nodes and styled connection paths; `ProjectFlow` capped at five steps.
- Consumes: existing architecture nodes/edges and project flow; no client-side measurement dependency.

- [ ] **Step 1: Add failing structural tests** proving previews use only curated node IDs, all labels remain present rather than clamped/hidden, long labels have no truncation class, connections carry from/to/label semantics, and mobile flow retains every step.
- [ ] **Step 2: Run diagram tests** and confirm current first-five/fixed-node behavior fails.
- [ ] **Step 3: Curate preview nodes, concise details, layers, and flow copy for every project**, checking each edge references an existing node and reflects the actual system.
- [ ] **Step 4: Implement the preview grid and flow component** with independent connector columns on desktop and complete vertical sequencing on narrow screens.
- [ ] **Step 5: Implement the full architecture system** as functional layers plus designed connection paths, a concise screen-reader summary, readable relationship labels, and no visible raw edge dump.
- [ ] **Step 6: Run focused tests and lint**, then capture each project diagram at 1440, 1024, 768, 390, and 320 pixels; correct text wrapping, node balance, connectors, ordering, and overflow project by project.
- [ ] **Step 7: Commit** with `feat: rebuild responsive system diagrams`.

### Task 8: Tighten case-study storytelling and category navigation

**Files:**
- Rewrite: `components/case-study-layout.tsx`
- Modify: `components/case-study-navigation.tsx`
- Modify: `components/evidence-list.tsx`
- Create: `app/styles/case-theatre.css`
- Modify: `app/globals.css`
- Modify: `tests/components/case-study-layout.test.tsx`
- Modify: `tests/components/case-study-navigation.test.tsx`

**Interfaces:**
- Produces: seven-part case-story hierarchy; owning-collection back link; same-collection adjacent navigation; compact snapshot combining problem, role/constraints, facts, and access.
- Consumes: collection helpers/adjacency from Task 1, diagram system from Task 7, existing evidence and reliability content.

- [ ] **Step 1: Rewrite case-study tests** for the exact narrative order, proof-first hero, owning-category return links, category-scoped adjacent projects, and personal-project walkthrough exclusion.
- [ ] **Step 2: Run focused tests** and confirm old overview structure and selected-work return logic fail.
- [ ] **Step 3: Implement the shorter case-study composition**, edit section labels/copy for scan speed, retain only useful sticky navigation, and ensure evidence/action wording is specific.
- [ ] **Step 4: Apply case-study visual styling** with stronger hierarchy, controlled line lengths, compact decision/reliability cards, and a deliberate final navigation moment.
- [ ] **Step 5: Run focused tests and lint**, then screenshot all nine case studies at desktop and mobile; specifically inspect media, facts, flow, architecture, long titles, sticky navigation, and bottom adjacency.
- [ ] **Step 6: Commit** with `feat: sharpen portfolio case-study storytelling`.

### Task 9: Complete motion, metadata, cleanup, and visual acceptance

**Files:**
- Modify: `components/reveal.tsx`
- Modify: `components/site-header.tsx`
- Modify: `app/opengraph-image.tsx`
- Modify: `app/work/[slug]/opengraph-image.tsx`
- Modify: `README.md`
- Modify or delete: obsolete styles under `app/styles/`
- Modify: tests under `tests/components/`, `tests/content/`, and `tests/lib/` only where final contracts changed.

**Interfaces:**
- Consumes: all completed sections, routes, collection/category data, and motion variables.
- Produces: consistent reveal choreography, active navigation, final metadata/social visuals, documented content workflow, and a clean source tree.

- [ ] **Step 1: Add or update only final high-value regressions** for reduced-motion visibility, active navigation, new metadata titles/descriptions, and absence of obsolete public terms/components.
- [ ] **Step 2: Run the affected tests** and confirm failures correspond to unfinished final contracts.
- [ ] **Step 3: Harmonize reveal timing, hover/focus/active states, header behavior, page-transition enhancement, OG imagery, and documentation; remove unused components/styles/imports.**
- [ ] **Step 4: Run `pnpm test && pnpm lint && pnpm typecheck && pnpm build && git diff --check`** and require zero failures, warnings from application code, type errors, build errors, or whitespace errors.
- [ ] **Step 5: Perform browser acceptance at 1440×900, 1024×768, 768×1024, 390×844, and 320×800** across home, both collections, and all project routes; verify no horizontal overflow, no error overlay, correct route-top behavior, keyboard reachability, video click-to-load, reduced motion, and mobile navigation.
- [ ] **Step 6: Capture final full-page home and collection screenshots**, compare against the initial 12,002px homepage audit, and correct any remaining weak hierarchy, repeated content, visual imbalance, cramped diagram, vague copy, or non-functional interaction.
- [ ] **Step 7: Commit** with `chore: complete portfolio product theatre redesign`.

## Completion contract

- Homepage contains six chapters and only four fully presented projects.
- Both collection routes are generated and contain only their specified projects.
- Nine project case studies remain; malaria has no route or sitemap entry.
- Every link to a different route lands at the top.
- All diagrams have been individually inspected at the five required widths.
- All interactive components work by keyboard and honor reduced motion.
- Final browser screenshots show no overflow, clipped text, overlapping arrows, error overlay, or duplicated catalogue section.
- Full automated verification and production build pass.

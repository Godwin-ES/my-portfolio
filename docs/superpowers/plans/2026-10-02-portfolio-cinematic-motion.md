# Portfolio Cinematic Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the approved portfolio into a technical, cinematic, and highly intentional experience with synchronized hero storytelling, restrained inertial scrolling, atmospheric depth, authored project/media transitions, animated system diagrams, and coherent route continuity.

**Architecture:** Mount one client-side motion foundation under the server-rendered root layout. Lenis owns desktop wheel interpolation, GSAP owns complex timelines, CSS owns local states, and React owns semantic state; focused client islands enhance existing server-rendered content without making readability depend on JavaScript. The implementation proceeds from shared infrastructure to the hero and then outward through the homepage, media, diagrams, routes, collections, and case studies.

**Tech Stack:** Next.js 16.3.6 App Router, React/React DOM 19.3, TypeScript 5.9, GSAP 3.15.0, `@gsap/react` 2.1.2, Lenis 1.3.26, native CSS/View Transitions, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-10-02-portfolio-cinematic-motion-design.md`

## Global Constraints

- Preserve the approved neutral, ink, and teal identity and the existing project information architecture.
- AI Automation contains the six automation projects; AI Engineering contains EchoRun, ChatDocs, and SignBridge.
- Keep the homepage featured set to RelayDesk, EchoRun, LeadLens, and ChatDocs.
- Never publish “AI Automation Program,” “Koya,” invented outcomes, or unsupported media.
- Lenis owns wheel interpolation only; native touch, anchors, keyboard scrolling, sticky layout, and browser history must remain predictable.
- Use one GSAP ticker for Lenis and GSAP; do not add another perpetual animation loop.
- Do not add Motion, Three.js, React Three Fiber, OGL, shader canvases, ScrollSmoother, or experimental Next.js route View Transitions.
- Do not animate the same transform property with both CSS and GSAP at the same time.
- Under `prefers-reduced-motion: reduce`, disable Lenis, typing/deleting, scrubbed motion, parallax, connector drawing, ambient drift, and route choreography.
- A clean semantic first frame must remain visible when JavaScript, observers, or animation setup fail.
- Maintain 320px–large-desktop responsiveness, WCAG AA contrast, 44px touch targets, keyboard operation, and no horizontal document overflow.
- Keep Loom playback user-initiated; do not autoplay video or audio before the play control is activated.
- Use `apply_patch` for authored file edits and preserve unrelated working-tree changes, including generated `next-env.d.ts` differences.

## Review Focus

- Reduced-motion or missing `matchMedia`: content is complete, Lenis is not created, and nothing remains hidden.
- Touch/coarse pointer input: native vertical scrolling remains intact and pointer depth/parallax is absent.
- Hero viewport boundary jitter: upward replay happens only after a genuine departure, 60% re-entry, cooldown, and idle state.
- Modified, hash, external, download, and history navigation: route choreography never intercepts native behavior or leaves the veil covering content.
- Late fonts/media and responsive resizing: ScrollTrigger measurements refresh without sticky jumps, clipped diagrams, or stale start positions.

---

### Task 1: Shared Motion Foundation and Ambient Field

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/styles/base.css`
- Modify: `app/styles/motion.css`
- Create: `components/motion/motion-provider.tsx`
- Create: `components/motion/ambient-field.tsx`
- Create: `lib/motion/gsap.ts`

**Interfaces:**
- Produces: `MotionProvider({ children }: { children: ReactNode }): JSX.Element`
- Produces: `useMotionPreferences(): { reducedMotion: boolean; finePointer: boolean; ready: boolean }`
- Produces: `AmbientField(): JSX.Element`
- Produces: registered `gsap`, `ScrollTrigger`, and `useGSAP` exports from `lib/motion/gsap.ts`

- [ ] **Step 1: Add the three motion dependencies**

Run: `pnpm add gsap@^3.15.0 @gsap/react@^2.1.2 lenis@^1.3.26`

Expected: `package.json` and `pnpm-lock.yaml` record only these new runtime dependencies.

- [ ] **Step 2: Implement the client motion provider**

Create a provider that tracks reduced-motion and fine-pointer media queries, exposes stable preference state, creates `<ReactLenis root options={{ autoRaf: false, smoothWheel: true }}>` only for full-motion fine-pointer contexts, synchronizes Lenis through `gsap.ticker`, calls `ScrollTrigger.update` from Lenis scroll events, disables GSAP lag smoothing, pauses on `visibilitychange`, and removes every listener/ticker callback on cleanup.

- [ ] **Step 3: Implement the ambient field without React render churn**

`AmbientField` writes normalized `--pointer-x`, `--pointer-y`, and `--page-progress` values to its own element at most once per animation frame. It uses passive pointer/scroll listeners, ignores coarse pointers, pauses while hidden, and never accepts pointer events.

- [ ] **Step 4: Add global tokens and atmospheric styling**

Expand `motion.css` into readable source with shared durations/easings, fixed atmospheric layers, static reduced-motion fallbacks, and controlled `will-change`. Update `base.css` so native `scroll-behavior: smooth` does not compete with Lenis. Import any new stylesheet through `globals.css` and mount the provider/field in `layout.tsx` without changing the semantic order of the page.

- [ ] **Step 5: Run the existing shell smoke test and typecheck**

Run: `pnpm test -- tests/smoke/app-shell.test.tsx && pnpm typecheck`

Expected: PASS with the server-rendered application shell intact.

- [ ] **Step 6: Commit the foundation**

```bash
git add package.json pnpm-lock.yaml app/layout.tsx app/globals.css app/styles/base.css app/styles/motion.css components/motion lib/motion
git commit -m "feat: add portfolio motion foundation"
```

### Task 2: Synchronized Hero Typing and System Transformation

**Files:**
- Modify: `components/hero.tsx`
- Modify: `components/hero/dual-signal.tsx`
- Modify: `app/styles/product-theatre.css`
- Create: `components/hero/animated-discipline.tsx`
- Create: `components/hero/use-hero-sequence.ts`
- Create: `lib/motion/hero-sequence.ts`
- Modify: `tests/components/home-sections.test.tsx`
- Create: `tests/lib/hero-sequence.test.ts`

**Interfaces:**
- Consumes: `useMotionPreferences()` and registered GSAP helpers from Task 1.
- Produces: `type Discipline = "automation" | "engineering"`
- Produces: `type HeroPhase = "typing" | "holding" | "deleting" | "settled"`
- Produces: `shouldReplayHero(input: { direction: number; visibility: number; hasDeparted: boolean; running: boolean; now: number; lastPlayedAt: number }): boolean`
- Produces: `useHeroSequence(): { discipline: Discipline; displayText: string; phase: HeroPhase; selectDiscipline(mode: Discipline): void }`
- Produces: `DualSignal({ mode, phase, onSelect }: { mode: Discipline; phase: HeroPhase; onSelect(mode: Discipline): void }): JSX.Element`

- [ ] **Step 1: Write failing replay-policy tests**

Test that `shouldReplayHero` returns true only for upward direction, visibility `>= 0.6`, a previously departed hero, an idle sequence, and elapsed cooldown `>= 5000ms`. Cover downward entry, boundary chatter, an active sequence, and reduced visibility.

- [ ] **Step 2: Update the hero component test before implementation**

Assert that the level-one heading always has the complete accessible phrase “AI Automation and AI Engineering. One production mindset.”, the visual typing element is `aria-hidden`, mode buttons use meaningful Automation/Engineering labels rather than `FLOW / A` or `BUILD / B`, and selecting Engineering updates pressed state plus the live caption.

- [ ] **Step 3: Run the focused tests and confirm failure**

Run: `pnpm test -- tests/lib/hero-sequence.test.ts tests/components/home-sections.test.tsx`

Expected: FAIL on the new sequence API and hero markup.

- [ ] **Step 4: Implement the deterministic sequence and hook**

Use a timeout registry for character typing/deleting and GSAP only for the surrounding visual timeline. Sequence: type `AI Automation`, hold, delete, type `AI Engineering`, then settle. Initial entry plays once; ScrollTrigger marks departure and calls replay only on eligible `onEnterBack`. Selecting a lane cancels pending timers and settles immediately on that discipline. Reduced motion returns the complete settled composition without timers.

- [ ] **Step 5: Rebuild the hero headline semantically**

Keep the full positioning in one screen-reader-visible `<h1>`. Render the animated text and caret as `aria-hidden`, reserve width/height so character changes cannot shift the layout, and keep `One production mindset.` as the visual resolution line.

- [ ] **Step 6: Transform the dual signal into two meaningful system modes**

Automation mode shows Intake → Guardrails → Orchestrate → Approval → Outcome. Engineering mode shows Interface → Application → Intelligence → State → Product. Use stable DOM nodes and mode data attributes so GSAP transforms/reveals structure rather than replacing it abruptly. Synchronize active mode and pulses with the typing phase; retain buttons, `aria-pressed`, focus behavior, and an accessible live caption.

- [ ] **Step 7: Author responsive hero motion and still states**

Replace the old lane CSS with desktop, tablet, and mobile compositions; shorten mobile travel; disable tilt on coarse pointers; and ensure every final label is fully readable at 320px. Add static reduced-motion rules that show the converged system.

- [ ] **Step 8: Run tests and verify production compilation**

Run: `pnpm test -- tests/lib/hero-sequence.test.ts tests/components/home-sections.test.tsx && pnpm typecheck`

Expected: PASS; no timer warnings; no duplicate accessible headings.

- [ ] **Step 9: Commit the hero scene**

```bash
git add components/hero.tsx components/hero app/styles/product-theatre.css lib/motion/hero-sequence.ts tests/components/home-sections.test.tsx tests/lib/hero-sequence.test.ts
git commit -m "feat: choreograph the portfolio hero story"
```

### Task 3: Varied Section Choreography and Homepage Visual Rhythm

**Files:**
- Modify: `components/reveal.tsx`
- Modify: `components/section-heading.tsx`
- Modify: `components/work-gateways.tsx`
- Modify: `components/collection-gateway.tsx`
- Modify: `components/engineering-practice.tsx`
- Modify: `components/experience-timeline.tsx`
- Modify: `components/about-section.tsx`
- Modify: `components/contact-section.tsx`
- Modify: `app/styles/home.css`
- Modify: `app/styles/product-theatre.css`
- Modify: `app/styles/motion.css`
- Modify: `tests/components/reveal.test.tsx`

**Interfaces:**
- Consumes: motion preferences and GSAP helpers from Task 1.
- Produces: `type RevealVariant = "rise" | "editorial" | "lateral" | "cascade" | "resolve"`
- Produces: `Reveal` props `variant?: RevealVariant`, `once?: boolean`, and existing `as`, `id`, `className`, `delayMs`, `children`.

- [ ] **Step 1: Add one focused reveal fallback regression**

Extend the existing reveal test to assert content stays visible when IntersectionObserver is unavailable or reduced motion is active. Do not add visual timing assertions to jsdom.

- [ ] **Step 2: Run the reveal tests and confirm failure**

Run: `pnpm test -- tests/components/reveal.test.tsx`

Expected: FAIL because reveal variants are not implemented.

- [ ] **Step 3: Implement the reveal vocabulary**

Keep IntersectionObserver as the cheap activation boundary and use variant-specific CSS/GSAP behavior: masked editorial lines, lateral selector/stage resolution, staggered card cascades, rail activation for experience, and a calm contact resolution. Set enhancement attributes only after the observer exists so SSR content remains visible.

- [ ] **Step 4: Assign one lead action to each homepage chapter**

Use editorial reveal for section headings, cascade for practice items, a continuous rail for experience, origin-aware gateway path drawing, a restrained profile resolve, and a final contact signal. Do not add a long pinned section or automatic project rotation.

- [ ] **Step 5: Refine interaction details**

Give gateways pointer-origin light and diagram path activation, practice blocks a technical index/edge response, timeline items a progressive active rail, and contact actions a clear magnetic-looking but CSS-only focus/hover response. Pointer-only depth remains decorative and disappears on touch.

- [ ] **Step 6: Run focused tests and typecheck**

Run: `pnpm test -- tests/components/reveal.test.tsx && pnpm typecheck`

Expected: PASS with existing content and counts unchanged.

- [ ] **Step 7: Commit homepage choreography**

```bash
git add components/reveal.tsx components/section-heading.tsx components/work-gateways.tsx components/collection-gateway.tsx components/engineering-practice.tsx components/experience-timeline.tsx components/about-section.tsx components/contact-section.tsx app/styles/home.css app/styles/product-theatre.css app/styles/motion.css tests/components/reveal.test.tsx
git commit -m "feat: add cinematic homepage choreography"
```

### Task 4: Authored Project Theatre and Video Walkthroughs

**Files:**
- Modify: `components/project-theatre.tsx`
- Modify: `components/project-theatre-stage.tsx`
- Modify: `components/project-media.tsx`
- Modify: `components/loom-facade.tsx`
- Modify: `app/styles/product-theatre.css`
- Modify: `app/styles/proof.css`
- Modify: `tests/components/project-theatre.test.tsx`
- Modify: `tests/components/project-media.test.tsx`

**Interfaces:**
- Consumes: React 19.3 `ViewTransition`, `startTransition`, and motion preferences.
- Produces: `ProjectTheatreStage({ project }: { project: Project }): JSX.Element`
- Produces: unchanged public `LoomFacade({ loomId, title, durationLabel, meta })` signature.

- [ ] **Step 1: Update the existing theatre regression only where behavior changes**

Adjust the existing assertions for one mounted stage and keep the existing no-autoplay, project switching, link, and iframe checks. Do not test animation frames or CSS timing in jsdom.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `pnpm test -- tests/components/project-theatre.test.tsx tests/components/project-media.test.tsx`

Expected: FAIL on single-stage mounting and the richer facade semantics.

- [ ] **Step 3: Implement coherent project state transitions**

Render one active stage, keep all selector links server-visible, call state changes inside React `startTransition`, and wrap the changing stage in a stable local `ViewTransition`. Add CSS fallback entry/exit behavior for browsers without View Transitions. The previous state yields without a blank frame and controls never lock during animation.

- [ ] **Step 4: Recompose the stage as an exhibit**

Coordinate media crop, title, proof facts, technology labels, status, and actions with a single staged entrance. Add a quiet active-index progress line and project-specific accent variation derived from collection/type—not arbitrary new colors.

- [ ] **Step 5: Redesign the Loom facade**

Build a layered poster with an authentic thumbnail/fallback, top context strip, prominent play control, title, duration, and subtle signal/timeline decoration. Pointer movement may shift the poster by a few pixels on fine pointers. Create the iframe only after explicit activation and remove decorative motion while playing.

- [ ] **Step 6: Run tests and typecheck**

Run: `pnpm test -- tests/components/project-theatre.test.tsx tests/components/project-media.test.tsx && pnpm typecheck`

Expected: PASS with no autoplay and all live/repository/case-study actions reachable.

- [ ] **Step 7: Commit the theatre and media treatment**

```bash
git add components/project-theatre.tsx components/project-theatre-stage.tsx components/project-media.tsx components/loom-facade.tsx app/styles/product-theatre.css app/styles/proof.css tests/components/project-theatre.test.tsx tests/components/project-media.test.tsx
git commit -m "feat: turn selected work into an interactive exhibit"
```

### Task 5: Animated Product Flows and Architecture Diagrams

**Files:**
- Modify: `components/project-flow.tsx`
- Modify: `components/architecture-diagram.tsx`
- Modify: `components/project-visual.tsx`
- Create: `components/motion/use-diagram-sequence.ts`
- Modify: `app/styles/diagrams.css`
- Modify: `app/styles/proof.css`
- Modify: `tests/components/diagram-system.test.tsx`

**Interfaces:**
- Consumes: GSAP/ScrollTrigger and motion preferences from Task 1.
- Produces: `useDiagramSequence(container: RefObject<HTMLElement | null>, options?: { once?: boolean }): void`
- Produces: ordered `data-motion-node`, `data-motion-connector`, and `--motion-order` markers on diagram elements.

- [ ] **Step 1: Add one structural motion-order assertion to the existing diagram test**

Assert flow steps and architecture nodes expose monotonic motion order while the existing tests continue to protect labels, edges, and responsive structure. Do not test animation timing in jsdom.

- [ ] **Step 2: Run diagram tests and confirm failure**

Run: `pnpm test -- tests/components/diagram-system.test.tsx`

Expected: FAIL because sequence metadata and the hook are absent.

- [ ] **Step 3: Implement one reusable diagram sequence hook**

Scope GSAP selectors to the container; reveal group label, nodes, connectors, relationship labels, then one signal pulse. Use `gsap.context`/`useGSAP` cleanup, trigger slightly before viewport centre, refresh after fonts/layout changes, and set the completed state immediately for reduced motion or missing APIs.

- [ ] **Step 4: Apply truthful ordering to all diagram types**

Product flows follow step order. Architecture diagrams follow layer order, then node order within each layer; parallel outbound connections animate together. Preview diagrams follow `previewNodeIds`. Do not infer a false global linear path from DOM order.

- [ ] **Step 5: Refine connector and node visuals**

Use clipping/stroke/scale-X only on connector decoration, never on text. Preserve the responsive vertical mobile grammar, ensure pulses stop after one pass, and keep every label inside its card at 320px.

- [ ] **Step 6: Run tests and typecheck**

Run: `pnpm test -- tests/components/diagram-system.test.tsx && pnpm typecheck`

Expected: PASS with existing node/edge counts and text alternatives intact.

- [ ] **Step 7: Commit diagram choreography**

```bash
git add components/project-flow.tsx components/architecture-diagram.tsx components/project-visual.tsx components/motion/use-diagram-sequence.ts app/styles/diagrams.css app/styles/proof.css tests/components/diagram-system.test.tsx
git commit -m "feat: animate portfolio system diagrams"
```

### Task 6: Safe Internal Route Continuity

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/navigation/route-reset.tsx`
- Create: `components/navigation/route-transition.tsx`
- Modify: `components/case-study-navigation.tsx`
- Modify: `components/work-collection-layout.tsx`
- Modify: `components/collection-gateway.tsx`
- Modify: `components/project-theatre.tsx`
- Modify: `components/project-theatre-stage.tsx`
- Modify: `components/case-study-layout.tsx`
- Modify: `components/collection-project-row.tsx`
- Modify: `app/not-found.tsx`
- Modify: `app/styles/motion.css`
- Modify: `tests/components/route-reset.test.tsx`
- Create: `tests/components/route-transition.test.tsx`

**Interfaces:**
- Produces: `RouteTransitionProvider({ children }: { children: ReactNode }): JSX.Element`
- Produces: `TransitionLink(props: ComponentProps<typeof Link> & { tone?: "default" | "automation" | "engineering" }): JSX.Element`
- Produces: route phases `"idle" | "covering" | "revealing"` exposed only inside the route-transition context.

- [ ] **Step 1: Write failing navigation eligibility tests**

With fake timers and mocked `useRouter`/`usePathname`, assert a plain internal click enters `covering`, calls `router.push` after `180ms`, and reveals on pathname change. Assert Control/Meta/Shift/Alt clicks, non-left clicks, `_blank`, downloads, hashes, external URLs, and reduced motion use native behavior without delay.

- [ ] **Step 2: Extend route reset tests for provider coordination**

Assert forward navigation still lands at `{ top: 0, left: 0, behavior: "instant" }` and focuses `#main-content`, while popstate and same-page hashes preserve browser behavior.

- [ ] **Step 3: Run focused tests and confirm failure**

Run: `pnpm test -- tests/components/route-transition.test.tsx tests/components/route-reset.test.tsx`

Expected: FAIL because transition components do not exist.

- [ ] **Step 4: Implement the persistent route layer**

Create an inert, `aria-hidden` veil with a tonal wash and signal line. Eligible links trigger a maximum 180ms cover before `router.push`; pathname changes trigger the 320ms reveal and then restore `idle`. Add a fail-safe timer that always clears the veil if navigation errors or never resolves.

- [ ] **Step 5: Replace intentional internal Next links**

Use `TransitionLink` in the listed project, collection, case-study, and not-found components. Preserve hrefs, prefetch behavior, accessible names, modifier clicks, and existing anchor links. Do not wrap external application/repository links.

- [ ] **Step 6: Coordinate focus and scroll exactly once**

Keep `RouteReset` authoritative for forward-route scroll/focus and history/hash exceptions. The transition provider only controls visuals; it must not add a second scroll or focus operation.

- [ ] **Step 7: Run the two navigation regressions and typecheck**

Run: `pnpm test -- tests/components/route-transition.test.tsx tests/components/route-reset.test.tsx && pnpm typecheck`

Expected: PASS; no veil persists after fake timers complete.

- [ ] **Step 8: Commit route continuity**

```bash
git add app/layout.tsx app/not-found.tsx app/styles/motion.css components/navigation components/case-study-navigation.tsx components/work-collection-layout.tsx components/collection-gateway.tsx components/project-theatre.tsx components/project-theatre-stage.tsx components/case-study-layout.tsx components/collection-project-row.tsx tests/components/route-reset.test.tsx tests/components/route-transition.test.tsx
git commit -m "feat: add safe cinematic route transitions"
```

### Task 7: Collection and Case-Study Cinematic Refinement

**Files:**
- Modify: `components/work-collection-layout.tsx`
- Modify: `components/collection-project-row.tsx`
- Modify: `components/case-study-layout.tsx`
- Modify: `components/evidence-list.tsx`
- Modify: `components/project-facts.tsx`
- Modify: `app/styles/collections.css`
- Modify: `app/styles/case-study.css`
- Modify: `app/styles/case-refresh.css`
- Modify: `app/styles/case-theatre.css`
- Modify: `app/styles/proof.css`

**Interfaces:**
- Consumes: `Reveal` variants, animated diagrams, Loom facade, and `TransitionLink` from prior tasks.
- Produces: no new public API; applies the shared motion grammar throughout non-home routes.

- [ ] **Step 1: Choreograph collection heroes and project progression**

Give each collection a discipline-specific opening motif, masked title entrance, restrained meta resolution, and rows that alternate media/copy entrance direction without alternating reading order. Connect the six Automation projects with an orchestration/progression rail and the three Engineering projects with a product-layer signal.

- [ ] **Step 2: Choreograph case-study narrative sections**

Sequence hero proof, snapshot, product flow, system design, engineering decisions, reliability, outcome/evidence, and adjacent navigation as one readable progression. The primary proof arrives early; later sections use quieter motion. Preserve sticky navigation behavior and disable lateral travel on narrow screens.

- [ ] **Step 3: Refine proof and evidence microinteractions**

Animate fact dividers/values only when meaningful, give evidence rows clear focus/hover direction, and use project status as a restrained signal rather than a looping beacon. Do not fabricate counters or animate nonnumeric values as numbers.

- [ ] **Step 4: Run the existing collection/case regressions and typecheck**

Run: `pnpm test -- tests/components/work-collection-layout.test.tsx tests/components/case-study-layout.test.tsx tests/components/evidence-list.test.tsx && pnpm typecheck`

Expected: PASS with all project content and navigation preserved.

- [ ] **Step 5: Commit collection and case-study refinement**

```bash
git add components/work-collection-layout.tsx components/collection-project-row.tsx components/case-study-layout.tsx components/evidence-list.tsx components/project-facts.tsx app/styles/collections.css app/styles/case-study.css app/styles/case-refresh.css app/styles/case-theatre.css app/styles/proof.css
git commit -m "feat: extend cinematic storytelling across case studies"
```

### Task 8: Visual Direction, Performance, and Release Gate

**Files:**
- Modify as required by review: motion-related files from Tasks 1–7 only
- Create: `docs/verification/2026-10-02-cinematic-motion-review.md`

**Interfaces:**
- Consumes: the complete motion implementation.
- Produces: a recorded viewport/interaction review and a release-ready build.

- [ ] **Step 1: Run a fast compile check before visual review**

Run: `pnpm typecheck`

Expected: TypeScript exits zero without client/server boundary errors.

- [ ] **Step 2: Start the production-equivalent local app**

Run: `pnpm dev`

Expected: the app loads without error overlays or console exceptions.

- [ ] **Step 3: Review the homepage as a directed sequence**

At 1440, 1024, 768, 390, and 320px capture and inspect: initial Automation typing, deletion, Engineering typing, settled convergence, upward replay, ambient pointer response, all homepage chapter entrances, project selection, Loom play, and contact resolution. Record each viewport and any correction in the review document.

- [ ] **Step 4: Review every non-home route**

Visit both collection pages and all nine project routes at desktop and mobile. Inspect route arrival at `scrollY = 0`, focus transfer, collection progression, Loom facades, product flows, every architecture layer/connection, evidence, adjacent navigation, and browser back behavior.

- [ ] **Step 5: Review capability fallbacks**

Emulate reduced motion, coarse pointer/touch, keyboard-only navigation, missing View Transitions, and a throttled CPU. Confirm static completeness, native touch scrolling, no trapped focus, no invisible content, no persistent veil, and no continuous high-cost animation.

- [ ] **Step 6: Apply only evidence-based polish corrections**

Correct observed overflow, clipping, weak hierarchy, timing conflicts, stale measurements, transform blur, or excessive motion. Do not add new effects during this step unless they resolve a documented visual/storytelling problem.

- [ ] **Step 7: Run the full release gate once after corrections**

Run: `pnpm test && pnpm lint && pnpm typecheck && pnpm build && git diff --check`

Expected: every command passes and the verification document has no unresolved critical or important findings.

- [ ] **Step 8: Commit verified final polish**

```bash
git add app components lib tests docs/verification package.json pnpm-lock.yaml
git commit -m "chore: verify cinematic portfolio experience"
```

## Self-Review Record

- **Spec coverage:** The plan covers the technology boundary, ambient field, hero sequence/replay, dual-system transformation, varied scroll choreography, project theatre, Loom treatment, diagrams, route continuity, accessibility, performance, responsive review, and release criteria.
- **Task independence:** Each task ends in an independently reviewable state; later tasks consume named interfaces from earlier tasks rather than introducing competing animation systems.
- **Type consistency:** `Discipline`, `HeroPhase`, `useMotionPreferences`, `RevealVariant`, `useDiagramSequence`, `TransitionLink`, and route phases have one defined owner and stable signatures.
- **Risk coverage:** Only fragile behavioral boundaries receive new automated coverage; visual timing and aesthetic quality are evaluated in Task 8 through real browser review.
- **Proportion:** Implementation details are limited to architectural decisions, exact APIs, critical timings, and testable behavior; visual tuning remains evidence-driven during browser review.

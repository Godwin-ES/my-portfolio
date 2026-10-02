# Portfolio Cinematic Motion System

## Purpose

Evolve the completed portfolio redesign into a technical, cinematic, and deliberately paced experience without weakening its recruiter-first clarity. Motion should explain the relationship between AI Automation and AI Engineering, create continuity between sections and routes, and make system diagrams feel alive. It must not turn the portfolio into a demo reel that delays access to the work.

This document supplements the approved product-theatre design. The information architecture, project grouping, content rules, and visual identity remain unchanged.

## Experience principles

1. **Motion communicates state.** Animation reveals relationships, sequence, causality, and navigation context. Decorative movement remains ambient and quiet.
2. **One scene has one lead action.** Typography, diagrams, media, and background effects do not all compete at once.
3. **The visitor remains in control.** Scrolling, project selection, video playback, and navigation respond immediately. Nothing auto-rotates or traps the viewport.
4. **Still frames remain excellent.** Every section is fully composed before and after its animation. A screenshot at any resting state must still look intentional.
5. **Capability is progressive.** Reduced-motion, coarse-pointer, low-power, and unsupported-browser paths keep the content complete and polished.

## Technology evaluation and decision

### Selected stack

- **GSAP with ScrollTrigger and `@gsap/react`** for the hero sequence, scroll-directed section choreography, diagram timelines, and route-transition veil. These are the small number of interactions that need explicit sequencing, direction awareness, replay control, or coordinated timelines.
- **Lenis** for restrained inertial wheel scrolling. Lenis remains on the document's native scroll model, is driven from the same GSAP ticker, and notifies ScrollTrigger on every Lenis scroll update. Touch scrolling remains native.
- **Native CSS transitions, keyframes, and scroll-driven animations** for hover feedback, small reveals, progress accents, connector drawing, and ambient layers where declarative CSS is sufficient.
- **React 19.3 `ViewTransition`** only for local component state changes that benefit from shared continuity, such as changing the active project theatre. Route navigation does not depend on it.
- **Pointer-driven CSS custom properties** for the ambient background and surface depth. One request-animation-frame update supplies normalized pointer values to CSS; no canvas or WebGL renderer is required.

### Deliberately excluded

- **Motion for React:** strong for layout, gestures, and native ScrollTimeline-backed animations, but it overlaps with both GSAP and CSS in this design. Adding it would create two animation ownership models without providing a unique required capability. Its View Transition helper is also unnecessary because React 19.3 supplies the underlying stable component.
- **Three.js, React Three Fiber, OGL, and shader canvases:** the requested calm depth can be produced more efficiently with layered gradients, noise, transforms, and masks. A persistent renderer would add download, GPU, battery, and maintenance cost without clarifying the work.
- **Next.js experimental View Transition integration:** Next's deeper router integration is still documented as experimental. Route continuity will therefore use a small persistent transition layer with an immediate no-animation fallback instead of an experimental production dependency.
- **GSAP ScrollSmoother:** Lenis is the lighter and more transparent fit for the chosen native-scroll approach. There will be only one scroll-smoothing owner.

### Ownership boundaries

To prevent competing animation systems:

- Lenis owns wheel interpolation only.
- GSAP owns multi-step timelines and ScrollTrigger lifecycle.
- CSS owns local visual states and simple scroll-linked decoration.
- React owns semantic application state.
- No element is animated by GSAP and CSS on the same transform property at the same time.

## Global motion foundation

### Motion provider

A client-side motion provider is mounted once in the root layout. It:

- creates Lenis only when motion is allowed and the input/device context is appropriate;
- synchronizes Lenis and ScrollTrigger through one GSAP ticker;
- pauses nonessential work when the page is hidden;
- refreshes measured triggers after fonts, media, and responsive layout changes;
- exposes the minimum shared motion state needed by the route layer;
- destroys ticker callbacks, triggers, and observers on cleanup.

Lenis uses a subtle easing profile rather than an exaggerated delay. Anchor links, keyboard navigation, browser history, sticky positioning, and the existing deterministic route reset must continue to work.

### Motion tokens

Durations and easing are centralized as CSS custom properties and matching JavaScript constants:

- immediate feedback: 120–180ms;
- component state: 260–420ms;
- section entrance: 520–760ms;
- cinematic scene: 900–1400ms;
- route veil: approximately 180ms in and 320ms out;
- ambient background cycles: 12–24 seconds, with no abrupt loop seam.

The palette and type system remain the existing neutral, ink, and teal identity. Motion adds depth through opacity, clipping, blur used sparingly, line drawing, and two-dimensional translation—not through elastic bouncing or excessive scaling.

## Ambient background field

A fixed, non-interactive background layer sits behind all content and contains:

- a very subtle grid/noise texture already compatible with the visual system;
- two large blurred color fields derived from the existing teal and warm-neutral palette;
- a soft local glow that trails pointer position with deliberate latency;
- a small vertical drift tied to document progress so the atmosphere evolves across the page.

Pointer input is normalized and written to CSS variables at most once per animation frame. The field never follows the cursor precisely enough to feel like a spotlight. On touch devices it uses a quiet static or autonomous composition. Under reduced motion it becomes fully static. The layer is isolated from layout and hit testing and must not create document overflow.

## Hero scene

### Editorial composition

The hero keeps the current asymmetrical copy-and-system composition but turns it into one synchronized scene. The visual headline shows one discipline at a time:

1. `AI Automation` types in on entry.
2. The automation system lane assembles and sends a signal through its stages.
3. After a readable hold, the text deletes with a natural accelerating rhythm.
4. `AI Engineering` types in.
5. The system visual restructures from an orchestrated workflow into product layers and carries its signal to the interface.
6. Both traces remain visible in a quieter final convergence state beside `One production mindset.`

The real semantic heading contains the complete positioning statement. The animated character string is hidden from assistive technology so a screen reader does not announce partial words repeatedly. The caret is decorative.

### Replay behavior

- The sequence plays once on initial entry.
- It becomes eligible to replay only after the hero has substantially left the viewport.
- It replays when the user scrolls upward and at least roughly 60% of the hero is visible again.
- Direction, visibility threshold, a cooldown, and a running-state guard prevent jitter or repeated restarts near the boundary.
- Hovering, focusing, or selecting a discipline after the sequence has settled changes the headline and system state directly without replaying the complete typing timeline.
- Reduced-motion visitors receive the final complete composition immediately.

### Responsive behavior

On desktop the system occupies the right side and reacts subtly to pointer depth. On tablet it becomes more compact without reducing label size. On mobile the headline leads, the system follows as a wide but fully contained scene, and animation distances are shortened. The sequence never changes document height while typing.

## Interactive dual system

The current static `FLOW / A` and `BUILD / B` labels are removed. The visual becomes a stateful system model with two meaningful modes.

### Automation mode

- event intake;
- validation and guardrails;
- orchestration and tool execution;
- approval or escalation;
- observable completion.

Signals move sequentially and connector labels use plain language. Focus and hover emphasize the active path while the inactive engineering structure remains faintly visible as context.

### Engineering mode

- interface or client;
- application logic;
- intelligence boundary;
- state and infrastructure;
- observable product outcome.

Nodes reposition through transforms rather than disappearing arbitrarily. The transformation conveys that the same production mindset is viewing the system through a different lens.

Buttons remain keyboard-operable, pressed state is exposed, captions update in an accessible live region, and no information is available only through pointer movement.

## Scroll-directed storytelling

### Section entrances

Generic repeated fade-up reveals are replaced by a small vocabulary selected by content type:

- editorial headings reveal by line or masked block;
- project selectors resolve laterally into their stage;
- evidence facts count or draw only when their numeric/structural meaning warrants it;
- collection gateways expose their paths from the interaction origin;
- timeline entries activate along one continuous rail;
- contact content arrives as a calm final resolution rather than another large reveal.

Animations trigger slightly before the content reaches the visual centre so visitors do not wait for it. Most play once; reversible behavior is reserved for diagrams and the hero where state genuinely follows scroll direction.

### Pinned scenes

Pinning is used at most once on the homepage, and only if the selected-project theatre benefits from a short desktop narrative. It must be removed below the measured responsive breakpoint and must not create a long artificial scroll distance. The page must still feel like a portfolio, not a slide deck.

## Project theatre and media

The selected-project theatre behaves like a technical exhibit:

- changing the selected project transitions title, media, proof, and system accents as one state change;
- the previous project yields before the next becomes dominant, without a blank pause;
- selection remains manual and immediate;
- React View Transitions may provide local shared continuity where supported, with a CSS/GSAP fallback;
- thumbnail and stage motion never obscures live, repository, or case-study actions.

Loom walkthroughs use a crafted facade before loading the iframe:

- authentic thumbnail or poster;
- project title and `Video walkthrough` context;
- duration when reliable metadata is available;
- a prominent accessible play control;
- a subtle timeline/signal treatment that responds to hover or focus;
- iframe creation only after explicit playback.

The facade may use a very slow parallax crop on capable pointers, but never auto-plays video or audio.

## Diagrams and system flows

Every architecture and product-flow diagram gains a controlled assembly sequence:

1. group or stage label resolves;
2. nodes appear in execution order;
3. connectors draw from source to destination;
4. relationship labels become legible;
5. the active path emits one restrained signal pulse;
6. the diagram rests in a fully readable state.

Branching diagrams reveal parallel branches together rather than implying a false linear sequence. On mobile the vertical flow uses shorter travel and no lateral parallax. Diagram animations are driven from curated project metadata, not DOM order assumptions. Text is never scaled during a reveal and connectors cannot cross node labels.

The existing accessible text alternative remains authoritative. Reduced motion skips directly to the assembled diagram.

## Route continuity

A persistent, lightweight route veil provides continuity for intentional internal navigation:

- eligible unmodified internal link activation starts a fast signal-line/tonal veil;
- navigation begins after only the short exit beat;
- pathname change resets the destination to its intended top position and reveals the new page;
- modified clicks, new tabs, downloads, external URLs, hash links, browser history, and unsupported conditions retain native behavior;
- the veil never blocks navigation if animation setup fails;
- keyboard focus is transferred to the destination main landmark after navigation.

Native cross-document View Transitions remain a progressive enhancement for actual document navigations. Experimental Next router integration is not enabled.

## Accessibility and user control

- `prefers-reduced-motion: reduce` disables Lenis, typing/deleting, scrubbing, parallax, connector drawing, ambient drift, and route choreography.
- Content is never left transparent because JavaScript failed or was disabled.
- Animated text has a stable semantic equivalent.
- Focus is never moved during in-page decorative animation.
- Smooth scrolling does not replace native touch behavior.
- Hover responses have focus-visible equivalents; pointer-only depth is decorative.
- Animation cannot delay access to navigation or calls to action beyond the brief route exit beat.
- Videos require explicit activation and maintain descriptive titles.

## Performance budgets and safeguards

- No WebGL render loop.
- One shared ticker for Lenis and GSAP; no competing perpetual request-animation-frame loops.
- Pointer work is frame-throttled and writes CSS variables without React re-renders.
- Prefer `transform`, `opacity`, `clip-path`, and SVG stroke properties; avoid continuous layout-affecting animation.
- Use `will-change` only while an element is active, then release it.
- Dynamically load GSAP-heavy scene code when it is not required for the initial semantic render.
- Do not animate large full-screen blur filters continuously; move pre-blurred layers instead.
- Pause ambient and nonessential animation when the document is hidden.
- Maintain a clean server-rendered first frame and avoid layout shift when client motion initializes.

## Responsive review criteria

The experience is visually reviewed at 1440px, 1024px, 768px, 390px, and 320px. Review includes:

- initial hero frame, automation state, engineering state, and settled state;
- upward hero re-entry without boundary jitter;
- background behavior on mouse, touch emulation, and reduced motion;
- every diagram before, during, and after assembly;
- project switching and Loom activation;
- route transitions through direct links, keyboard activation, browser back, and modified clicks;
- no horizontal overflow, text clipping, transform blur, sticky jump, or stale ScrollTrigger measurement;
- stable scroll position and focus on every destination.

## Acceptance criteria

The motion phase is complete when:

- the hero types Automation, transitions to Engineering, and synchronizes the adjacent system model;
- hero replay occurs only on deliberate upward re-entry and cannot chatter near the viewport threshold;
- scrolling has a subtle inertial desktop feel while touch, keyboard, anchors, and reduced motion remain native and predictable;
- the background responds calmly to pointer position without drawing attention away from content;
- major sections use varied but coherent entrances rather than one repeated reveal;
- video facades and project switching feel authored and remain immediately usable;
- diagrams assemble in their true execution structure and rest as fully readable compositions;
- internal route changes feel continuous and always arrive at the correct top/focus state;
- no experimental router feature or unnecessary WebGL dependency is required;
- the production build remains free of client errors and the experience stays responsive across the defined viewport range.

## Out of scope

- redesigning the approved information architecture or changing project categorization;
- inventing new screenshots, metrics, walkthroughs, or project claims;
- autoplaying video or audio;
- a 3D avatar, particle playground, custom cursor replacement, or persistent shader scene;
- scroll-jacking, mandatory snap points, long pinned presentations, or animation that hides content until precisely scrolled;
- enabling experimental Next.js router features solely for visual transitions.

# Portfolio Product Theatre Redesign

## Purpose

Rebuild Godwin Ekanem's portfolio into a concise, recruiter-first product narrative that presents him as an engineer with two complementary strengths: AI Automation and AI Engineering. The experience must feel deliberately designed, technically credible, responsive, and memorable without becoming theatrical at the expense of clarity.

The redesign replaces the current 12,000-pixel catalogue-style homepage with a focused homepage, two dedicated work collection pages, and tighter project case studies. Tolu-Portfolio is a reference for clear project grouping and confident interaction design, not a visual template.

## Audience and success criteria

The primary audience is hiring managers, engineering leaders, technical recruiters, founders, and potential clients. Within the first screen they must understand what Godwin builds. Within two minutes they must be able to identify his strongest projects, distinguish AI Automation from AI Engineering, inspect working products, and understand the quality of his engineering judgment.

The redesign succeeds when:

- the homepage features only RelayDesk, EchoRun, LeadLens, and ChatDocs;
- all AI Automation work is reachable from one dedicated collection page;
- all non-program projects are reachable from one AI Engineering collection page;
- no project is repeated in a generic homepage catalogue;
- Malaria Detection with CNNs is removed from content, routes, navigation, sitemap, and metadata;
- project and category navigation always begins at the top of the destination page;
- diagrams remain readable without clipped, overlapping, or truncated labels at desktop, tablet, and mobile widths;
- motion makes state changes and navigation feel coherent while preserving accessibility and speed;
- descriptions state concrete product behavior and engineering decisions rather than generic AI claims.

## Information architecture

### Homepage

The homepage contains six purposeful chapters:

1. **Introduction** — positioning, immediate actions, and an interactive visual expressing the combination of Automation and Engineering.
2. **Selected systems** — one compact interactive showcase for four standout products.
3. **Work collections** — two large gateways to AI Automation and AI Engineering.
4. **Engineering practice** — four concise principles supported by specific implementation examples.
5. **Experience and profile** — compressed professional timeline, education, and capabilities.
6. **Contact** — a confident closing statement with direct email, GitHub, and résumé actions.

The homepage must not contain the complete project list, a filterable catalogue, a duplicate automation progression, or the removed applied-ML collection.

### AI Automation collection

Route: `/work/ai-automation`

This page presents the six projects completed during AI Automation in chronological order as a progression from deterministic workflow handling to agentic real-time support:

1. Intelligent Invoice Processing
2. Operations Reporting & Decision Support
3. ProposalFlow
4. ContentStudio
5. LeadLens
6. RelayDesk

The introduction explains that these systems combine automation, governed AI decisions, durable state, observable failure paths, and human approval where consequences matter. It does not publicly use “Koya” or “AI Automation Program.”

### AI Engineering collection

Route: `/work/ai-engineering`

This page contains:

1. EchoRun
2. ChatDocs
3. SignBridge

The introduction frames the work as product engineering across real-time voice, grounded document intelligence, computer vision, backend architecture, and accessible user experiences.

### Project case studies

Existing canonical project routes remain `/work/[slug]`. Category routes and project routes must coexist without ambiguity through static routing. Every case study links back to its owning collection and offers adjacent projects from that same collection only.

## Homepage visual and interaction design

### Hero: two disciplines, one outcome

The hero uses the existing light neutral and teal palette, with stronger contrast, more expressive typography, and controlled depth. The core message names both practices directly. Supporting copy describes the result in concrete terms: dependable workflows, intelligent products, real-time systems, and interfaces people can use.

The hero visual is a responsive “dual signal” composition:

- an Automation lane carries events through validation, orchestration, and approval;
- an Engineering lane carries data through application logic, intelligence, and interface;
- both converge on a final “Production system” node;
- hovering or focusing either lane highlights it and changes a short explanatory caption;
- the connecting signal animates once on entry and responds subtly to pointer position;
- reduced-motion users see the completed composition without staged animation.

The visual is semantic supporting content, not a fake dashboard. Labels remain short and readable. The hero contains no decorative statistics that cannot be substantiated.

### Selected systems: interactive project theatre

The four standout projects occupy one bounded showcase rather than four long repeated rows.

Desktop layout:

- a compact vertical selector lists RelayDesk, EchoRun, LeadLens, and ChatDocs;
- the active project occupies a large stage with authentic Loom proof when supplied and a crafted system visual otherwise;
- the copy area states one concrete problem, one product outcome, two proof facts, and the relevant stack;
- live, repository, and case-study actions remain visible without opening a menu;
- switching projects crossfades the visual and copy, moves an active indicator, and updates an accessible live region;
- the first project is server-rendered as active while all four remain discoverable in the document.

Mobile layout:

- each project becomes a self-contained card in a horizontal snap track or compact vertical stack based on verified usability;
- controls are touch-sized and do not rely on hover;
- the active item and scroll position are obvious;
- all project links remain directly reachable.

The section must not auto-rotate. Visitors retain control, and motion never delays access to content.

### Work collection gateways

Two equal-priority gateway cards introduce AI Automation and AI Engineering. Each card contains:

- collection name and concise positioning statement;
- project count;
- a short, deliberately ordered list of included project names;
- a small collection-specific system motif;
- a clear “Explore projects” action;
- a pointer-origin surface reveal on capable devices and a restrained press state on touch devices.

AI Automation uses an orchestrated step-and-approval motif. AI Engineering uses connected product layers. The cards share the site’s design language while remaining visually distinguishable.

### Engineering practice

Four principles replace generic toolkit promotion:

- Make AI boundaries explicit.
- Preserve state and evidence.
- Design failure paths deliberately.
- Build the interface as part of the system.

Each principle includes one short supporting example drawn from an actual project. Technology names appear only where they strengthen the evidence.

### Experience, profile, and contact

Experience becomes a compact timeline that prioritizes role, organization, period, and one meaningful contribution per role. Toolkit information is integrated into the work and practice sections instead of occupying a large standalone grid.

The profile section contains education and a concise personal statement. The contact section closes with a bold but specific invitation to discuss AI products, workflow automation, or software engineering work.

## Collection page design

Each collection page opens with a distinct hero, concise category explanation, project count, and a visual motif derived from its gateway card. Project rows then alternate media and copy alignment on desktop while remaining consistent on mobile.

Every project row includes:

- project name and sequence;
- a concrete one-sentence description;
- working live and repository actions when supplied;
- walkthrough action or explicit unavailable state;
- two proof facts;
- four or fewer high-signal technology labels;
- a clear case-study action.

Rows use authentic screenshots or Loom thumbnails when available. Architecture previews are used only where no authentic product media exists. No full project is duplicated on the homepage.

## Case-study redesign

Case studies use a shorter narrative hierarchy:

1. Hero: name, one-sentence outcome, status, category, actions, and primary proof media.
2. Snapshot: problem, role, constraints, and two or three proof facts.
3. Product flow: the user-visible journey in five or fewer steps.
4. System design: responsive architecture diagram plus a concise explanation.
5. Engineering decisions: the three decisions that materially shaped reliability or usability.
6. Reliability: concrete failure states, boundaries, and recovery behavior.
7. Outcome and evidence: what was delivered and how a reviewer can verify it.

Long prose is edited for specificity and scannability. Sticky section navigation remains only on screens where it helps orientation. The bottom of each page offers adjacent projects within the same category and a route back to that collection.

## Diagram system

The current fixed 108-pixel nodes and raw connection list are replaced with one responsive diagram grammar.

### Preview diagrams

- show three or four essential stages, not an arbitrary first five nodes;
- use curated short labels and one optional detail line;
- allocate node widths with CSS grid `minmax()` rather than fixed widths;
- reserve connector space separately so arrows never overlap cards;
- vertically centre labels only when no detail exists and top-align multi-line content consistently;
- never clamp a system name into an ambiguous fragment;
- switch to a vertical flow below the measured fit threshold instead of hiding later nodes.

### Full architecture diagrams

- arrange nodes by functional layer or execution sequence rather than source-data order;
- support branching and convergence using explicit row/group metadata where needed;
- place relationship labels on connectors with sufficient background contrast;
- provide a readable text alternative for assistive technology without displaying a raw edge dump;
- use compact curated node details, with longer explanation adjacent to the diagram;
- use a vertical grouped layout on narrow screens;
- allow horizontal scrolling only as a final fallback for unusually complex diagrams, with a visible affordance.

Every project diagram is individually reviewed at 1440px, 1024px, 768px, 390px, and 320px widths. Labels, arrows, order, and connection meaning are checked against the project content rather than assumed from a shared layout.

## Motion and interaction language

Motion follows one consistent timing system:

- 140–180ms for button, hover, and focus feedback;
- 260–360ms for component state changes;
- 450–650ms for page and section entrances;
- a shared expressive easing curve for reveals and transitions;
- no looping decorative animation beyond subtle ambient signal movement;
- no scroll-jacking, forced autoplay, or interaction that depends on precise pointer movement.

The site uses progressive-enhancement page transitions where supported. Project and category links explicitly request top-of-page navigation. A route-change scroll manager provides a deterministic fallback and moves focus to the destination main landmark without producing a visible focus ring for pointer users. Browser back retains expected history behavior where appropriate.

Interactive surfaces expose hover, focus-visible, active, and disabled states. Pointer effects are disabled on coarse-pointer devices. Reduced-motion preferences remove transforms, staged reveals, animated connectors, and crossfades while preserving all state changes.

## Content rules

- Use “AI Automation,” never “AI Automation Program.”
- Do not use “Koya” in public project names or portfolio narrative.
- Use ContentStudio as the Week 4 public name.
- Personal projects do not display walkthrough controls.
- Only supplied live apps, repositories, Loom videos, credentials, and screenshots may be published.
- Copy names the actual input, processing boundary, user action, or failure behavior whenever possible.
- Avoid unsupported scale claims, invented business results, and vague phrases such as “leverages cutting-edge AI.”
- Technology lists are evidence, not decoration, and are capped where the interface calls for a concise set.

## Responsive and accessibility requirements

- The complete experience supports 320px through large desktop widths without horizontal page overflow.
- Touch targets are at least 44px in their smallest dimension.
- Keyboard users can reach, operate, and understand every selector, gateway, video facade, menu, and link.
- Selected-project controls use tabs only if the rendered semantics and keyboard model fully follow the ARIA tabs pattern; otherwise they use simpler buttons with explicit state.
- Focus order follows visual order.
- Colour contrast meets WCAG AA for normal text and interactive controls.
- Loom iframes load only after an explicit play action.
- Meaningful diagrams expose a concise accessible name and text alternative; decorative grid and connector elements remain hidden.
- With JavaScript unavailable, the first selected project, both collection gateways, collection pages, and every project route remain navigable.

## Visual quality process

Implementation is reviewed as a designed product, not only as compiling code.

For each major section:

1. render at desktop and mobile widths;
2. capture a screenshot;
3. inspect hierarchy, rhythm, alignment, line length, contrast, empty space, and interaction affordance;
4. correct visible defects before moving to the next section.

Final review covers the complete homepage, both collection pages, every project case study, all diagram variants, keyboard navigation, reduced motion, route scroll position, and browser error overlays. Automated coverage is limited to high-value regressions around content grouping, route generation, project removal, scroll restoration, and essential interaction state; visual browser review is the primary quality gate for this redesign.

## Out of scope

- adding speculative project screenshots or generated product mockups;
- changing supplied project names other than ContentStudio;
- adding a CMS, database, analytics platform, or contact backend;
- deploying or changing production infrastructure;
- copying Tolu-Portfolio’s typography, colour system, copy, or component implementation.

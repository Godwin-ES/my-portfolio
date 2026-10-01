# Portfolio Refresh Design

**Date:** 2026-10-01  
**Status:** Approved design  
**Project:** Godwin Ekanem portfolio

## 1. Purpose

Refresh the existing portfolio into a more captivating, interactive, and evidence-led presentation of Godwin's software engineering and AI systems work. The site must serve technical hiring teams and potential clients equally well: it should communicate value quickly, prove that the products exist, and retain enough engineering depth to demonstrate sound architecture, reliability, and judgment.

This is an evolution of the current portfolio, not a replacement of its identity. Preserve the quiet light theme, teal system accent, typography character, architectural diagrams, and emphasis on dependable AI systems.

## 2. Design direction

Use an **evidence-led editorial** experience:

- products and proof appear before lengthy technical explanation;
- selected work uses generous, media-led project rows rather than a dense dashboard;
- live applications, case studies, and repositories are directly accessible;
- project pages lead with product media and concise facts, then reveal the deeper engineering story;
- interaction helps visitors discover and understand work rather than serving as decoration.

Do not reproduce the reference portfolio's visual identity or exact layout. Transfer only its useful product-proof patterns: Loom previews, explicit access links, concise flows, measurable facts, and selective engineering decisions.

## 3. Audience and success criteria

The site must work equally well for:

1. technical recruiters and hiring managers evaluating engineering range and depth;
2. clients evaluating whether Godwin can deliver useful, reliable AI products and workflows.

The refresh succeeds when a new visitor can, within the first screen or two:

- understand Godwin's positioning;
- identify the strongest projects;
- see authentic product evidence;
- open a live application, case study, or repository without hunting;
- distinguish personal products from AI Automation work;
- understand that reliability, state, validation, and human control are recurring engineering strengths.

## 4. Product naming

Use these public-facing names:

| Project | Portfolio name |
|---|---|
| Week 1 | Intelligent Invoice Processing |
| Week 2 | Operations Reporting & Decision Support |
| Week 3 | ProposalFlow |
| Week 4 | ContentLedger |
| Week 5 | LeadLens |
| Week 6 | RelayDesk |
| Voice agent | EchoRun |
| RAG product | ChatDocs |
| ASL product | SignBridge |

Avoid “Koya,” “program,” and week numbers in primary product titles. Week numbers may remain internal metadata for ordering the AI Automation progression, but should not define the public product identity.

## 5. Information architecture

### Homepage

1. **Hero**
   - Concise positioning around reliable AI products and systems.
   - One interactive evolution of the existing system motif.
   - Primary action to selected work; secondary access to GitHub and résumé.

2. **Selected Work**
   - Feature EchoRun, SignBridge, RelayDesk, ChatDocs, and LeadLens.
   - Use media-led editorial rows or asymmetric features.
   - Expose the relevant live, case-study, walkthrough, and repository actions.

3. **AI Automation**
   - Present Weeks 1–6 as a capability progression without calling it a program.
   - Order: Intelligent Invoice Processing, Operations Reporting & Decision Support, ProposalFlow, ContentLedger, LeadLens, RelayDesk.
   - Show how state, validation, human review, security, and agent autonomy increase across the collection.

4. **More Projects**
   - Surface remaining personal and applied-ML work, including Malaria Detection.
   - Avoid leaving valid case studies discoverable only through the sitemap.

5. **Experience and toolkit**
   - Retain existing content but tighten vertical space and improve scanning.

6. **About and contact**
   - Preserve the current systems-thinking story and dark contact card.

### Navigation

- Maintain Work, Experience, About, Contact, and Résumé.
- Add active-section feedback where it improves orientation.
- Keep mobile navigation keyboard accessible and restore body scrolling correctly.

## 6. Project-page experience

Project pages use a two-layer narrative.

### Product-proof layer

1. Actual product name, category, and concise value proposition.
2. Project context, role, status, and technology stack.
3. Relevant actions: live app, walkthrough, primary repository, and related repositories.
4. Large walkthrough facade, screenshot, or local preview.
5. Three meaningful facts or outcomes where authentic evidence exists.
6. A concise visual product flow.

### Engineering-depth layer

Retain and improve the current case-study material:

- problem;
- system;
- architecture;
- engineering decisions;
- reliability and edge cases;
- result;
- evidence and limitations.

Add previous/next project navigation and a return path to the relevant project collection.

Do not invent quantitative outcomes. When no trustworthy metric exists, use factual system counts or omit the statistic.

## 7. Media behavior

### AI Automation projects

- Weeks 1–5 use Loom walkthroughs.
- Week 1 has no live application; walkthrough is its primary proof action.
- Weeks 2–5 provide both live application and walkthrough actions.
- RelayDesk provides a live application and repository while its video state reads “Walkthrough coming soon.”
- Loom metadata is fetched at build time where possible.
- Show a click-to-play thumbnail facade; load Loom's iframe only after the visitor asks to play.
- Animated Loom previews may load lazily on intentional hover or when centered on coarse-pointer devices.

### Personal projects

- EchoRun, ChatDocs, and SignBridge have no walkthrough UI.
- Use authentic screenshots or lightweight local preview assets.
- Provide live application and repository links.
- EchoRun may expose its frontend and backend repositories separately.

### Fallbacks

- If Loom metadata fails, use a local poster or the existing architecture visualization.
- If a screenshot is missing, use the architecture fallback without breaking the build.
- If a video is planned but unavailable, render an explicit coming-soon state rather than a disabled player.
- If a demo has a cold start, invite-only access, disabled automation, or limited functionality, show an honest access notice.

## 8. Interaction and motion

Use restrained, purposeful interaction:

- scroll-entry reveals;
- small card/media movement on hover and keyboard focus;
- Loom preview activation;
- architecture-stage highlighting;
- active navigation state;
- project filtering;
- smooth project-preview-to-detail transitions where stable and accessible;
- sticky case-study progress or section navigation on sufficiently large screens.

All interactions must work without hover, remain keyboard accessible, and respect `prefers-reduced-motion`. Avoid custom cursors, particle systems, excessive parallax, ornamental 3D, and autoplaying audio/video.

## 9. Project content model

Replace the current limited project shape with a typed model capable of representing:

- slug and public product name;
- short tagline and longer summary;
- collection: selected, personal, AI Automation, applied ML;
- optional automation order and internal week number;
- status: live, in development, private, walkthrough coming soon, or archived;
- stack and category;
- live URL;
- one or more named repository links;
- media kind, local poster/image, alt text, Loom ID, duration, and availability state;
- authentic statistics;
- ordered product-flow stages;
- problem, system, architecture, decisions, reliability, result, and evidence;
- access notices and intentionally shared demo credentials if supplied;
- featured order and display treatment.

The content model is the single source for homepage collections, project pages, metadata, sitemap entries, and navigation.

Missing URLs remain absent or explicitly marked as pending. Never fabricate a deployment, video, credential, metric, or result.

## 10. Component boundaries

Use Server Components by default. Isolate client behavior in small components.

Recommended component responsibilities:

- `ProjectMedia`: selects walkthrough, screenshot, preview, or architecture fallback;
- `LoomFacade`: click-to-load embed and optional lazy preview;
- `ProjectActions`: renders only valid, relevant actions;
- `ProjectStatus`: communicates live, limited, or coming-soon state;
- `ProjectFacts`: renders authentic statistics;
- `ProjectFlow`: accessible product-flow visualization;
- `ProjectFilter`: client-side collection selection;
- `CaseStudyNavigation`: section progress and previous/next work;
- `Reveal`: reduced-motion-aware entrance behavior;
- existing architecture, evidence, header, footer, experience, toolkit, and contact components remain focused and reusable.

Avoid turning the page or case-study layout into one large Client Component.

## 11. Data and rendering flow

1. Typed local project content is loaded during static rendering.
2. Build-time helpers fetch optional Loom oEmbed metadata with a safe fallback.
3. Homepage selectors produce selected work, AI Automation, personal, and applied-ML collections.
4. Static project routes render product media and case-study content from the same project record.
5. Client components handle only local interface state such as filtering, media playback, navigation state, and motion.
6. No CMS, application database, authentication, or runtime portfolio API is required.

## 12. Error handling and resilience

- Invalid or duplicate slugs fail content validation tests.
- Invalid public URLs fail tests before deployment.
- Missing optional links remove their action instead of rendering dead controls.
- Failed Loom metadata never fails the build.
- Remote images define valid dimensions and safe host configuration.
- Missing media receives an accessible fallback with meaningful labeling.
- External links use safe new-tab behavior.
- Video facades preserve a usable aspect ratio before metadata arrives.
- JavaScript-enhanced filtering and motion must not hide core project content from indexing or assistive technology.

## 13. Accessibility and performance

- Preserve semantic headings, landmarks, skip behavior, focus visibility, and descriptive accessible names.
- Every visual requires suitable alt text or must be deliberately decorative.
- Touch targets remain at least 44px where practical.
- Do not encode project state by color alone.
- Respect reduced motion and avoid forced animation.
- Keep walkthrough iframes and animated previews out of the initial payload.
- Use optimized local images and accurate responsive `sizes`.
- Keep above-the-fold client JavaScript small.
- Verify no horizontal overflow at common mobile widths.

## 14. SEO and metadata

- Update project titles, descriptions, canonical URLs, and sitemap entries.
- Generate project-specific social metadata from the renamed projects and their poster media where practical.
- Preserve redirects for any changed public slugs or retain old slugs when renaming alone is sufficient.
- Keep résumé, robots, sitemap, not-found, and Open Graph routes valid.

## 15. Testing and verification

Automated coverage must include:

- required project inventory and unique slugs;
- correct public names and AI Automation order;
- featured-project selection;
- valid link and repository shapes;
- walkthrough, coming-soon, screenshot, and fallback media states;
- action visibility based on available links;
- project filter behavior and keyboard use;
- project-page headings, flow, evidence, and navigation;
- reduced-motion behavior where testable;
- metadata and route generation;
- résumé asset integrity.

Final verification:

1. unit/component tests;
2. ESLint;
3. TypeScript type checking;
4. production build;
5. `git diff --check`;
6. desktop and mobile browser review;
7. keyboard navigation and focus review;
8. representative live-link and walkthrough checks once URLs are supplied.

## 16. Inputs that may be supplied during implementation

Implementation can begin with explicit placeholders and be completed incrementally as Godwin provides:

- live application URLs not already documented;
- Loom share URLs or IDs and duration labels for Weeks 1–5;
- screenshots or approval to capture them from live apps;
- final repository URLs where different from the locally identified remotes;
- demo access instructions or intentionally shared credentials;
- any preferred factual statistics not derivable safely from the repositories.

Known locally documented live URLs:

- Operations Reporting & Decision Support: `https://koya-dashboard.streamlit.app/`
- RelayDesk: `https://koya-support-agent.vercel.app`

## 17. Out of scope

- A CMS or admin dashboard for portfolio editing.
- Authentication or visitor accounts.
- Fabricated testimonials, outcomes, usage numbers, or client claims.
- Walkthroughs for personal projects.
- Rebuilding the underlying project applications solely to match portfolio names.
- Deploying or publishing the portfolio without a separate explicit request.

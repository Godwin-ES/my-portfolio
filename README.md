# Godwin Ekanem — Software Engineering & AI Systems Portfolio

A professional portfolio presenting selected software engineering, AI application, and automation work. The site is organized around engineering evidence rather than a generic project gallery: featured systems link to structured case studies covering the problem, architecture, engineering decisions, reliability boundaries, result, and proof links.

## Stack

- Next.js 16.3.6 with the App Router
- React 19 + TypeScript
- Tailwind CSS 4 and a small project-specific CSS design system
- Lucide React icons
- Vitest + Testing Library
- Vercel-ready static-first deployment

No database, CMS, authentication, analytics service, or contact backend is required for v1.

## Local setup

This repository uses pnpm 10.17.1.

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

Then open `http://localhost:3000`.

`NEXT_PUBLIC_SITE_URL` can be set to an explicit canonical production origin. On Vercel, the site also falls back to Vercel's deployment hostname so canonical and social metadata do not resolve to localhost in production.

## Quality commands

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

Run all four commands before promoting a deployment to production.

## Content structure

```text
app/                     Next.js routes, metadata, sitemap, robots
components/              Shared homepage and case-study UI
content/projects.json    Eight project case studies and architecture data
content/site.ts          Hero, navigation, contact, and about copy
content/experience.ts    Professional experience
content/toolkit.ts       Curated technical toolkit
lib/                     Project selectors, types, metadata helpers
public/resume/           Downloadable résumé
public/og/               Social preview image
tests/                    Content, component, metadata, and smoke tests
```

## Portfolio scope

The homepage emphasizes four high-signal systems:

1. Koya Lead Agent
2. RAG Application
3. Koya Proposal Studio
4. Real-Time Voice AI Agent

A separate automation progression connects Intelligent Invoice Processing, Operations Reporting, Proposal Studio, Content Studio, and the Lead Agent as increasingly complete business systems rather than presenting them as unrelated weekly assignments.

## Project presentation policy

Project cards use authentic application screenshots only when a verified screenshot is available and appropriate to publish. Where one is not available, the site renders a clean architecture visual derived from the project's actual system structure. Generic AI stock artwork, fabricated dashboards, and unverifiable performance metrics are intentionally excluded.

## Deployment

1. Install dependencies and run the quality commands above.
2. Import this repository into Vercel.
3. Deploy the `main` branch.
4. Verify `/`, each `/work/<slug>` route, `/resume/Ekanem_Godwin_Resume.pdf`, `/sitemap.xml`, `/robots.txt`, and `/og/default.png` on the observed production URL.

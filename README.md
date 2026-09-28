# Godwin Ekanem — Software Engineering & AI Systems Portfolio

A static-first professional portfolio presenting selected software engineering, AI application, and automation work. The site is designed around engineering evidence rather than a generic project gallery: each featured system links to a structured case study covering the problem, architecture, engineering decisions, reliability boundaries, result, and proof links.

## Stack

- Next.js 16.3.6 with the App Router
- React 19 + TypeScript
- Tailwind CSS 4 and a small project-specific CSS design system
- Lucide React icons
- Vitest + Testing Library for component/content tests
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

`NEXT_PUBLIC_SITE_URL` should be the canonical deployed origin, for example `https://portfolio.example.com`. It is used for canonical metadata, sitemap entries, and Open Graph URLs.

> This workspace was authored in a restricted runtime that could not reach the npm registry, so a pnpm lockfile could not be generated here. Run `pnpm install` once in a network-enabled environment, commit the resulting `pnpm-lock.yaml`, then use `pnpm install --frozen-lockfile` for subsequent installs.

## Quality commands

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

For the final pre-deployment gate, all four commands should complete successfully from a clean install.

The repository also contains a dependency-free visual verification harness used while the package registry was unavailable:

```bash
python scripts/build_static_preview.py
python scripts/verify_preview.py
```

It renders the same portfolio content and production CSS into a local static fixture and checks responsive overflow, navigation behavior, keyboard focus, reduced-motion behavior, all eight case-study structures, console errors, and the résumé asset in Chromium. This is supplementary QA, not a substitute for the Next.js production build.

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
scripts/                  Static preview and browser-verification helpers
tests/                    Content, component, metadata, and smoke tests
```

## Project presentation policy

Project cards use authentic application screenshots only when a verified screenshot is available and appropriate to publish. When one is not available, the site renders a clean architecture-based visual derived from the project's real system structure. Generic AI stock artwork, fabricated dashboards, and unverifiable performance metrics are intentionally excluded.

## Portfolio scope

The homepage emphasizes four high-signal systems:

1. Koya Lead Agent
2. RAG Application
3. Koya Proposal Studio
4. Real-Time Voice AI Agent

A separate automation progression connects Intelligent Invoice Processing, Operations Reporting, Proposal Studio, Content Studio, and the Lead Agent as increasingly complete business systems rather than presenting them as unrelated weekly assignments.

## Deployment

1. Run the full quality command set above from a clean install.
2. Set `NEXT_PUBLIC_SITE_URL` to the actual production origin.
3. Deploy the repository to Vercel.
4. Re-run a production smoke check for `/` and every `/work/<slug>` route.
5. Confirm the résumé, sitemap, robots file, canonical metadata, and Open Graph image resolve from the observed production URL.

Do not invent or preconfigure a production domain in source control. Use the URL returned by the deployment platform.

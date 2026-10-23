# XPRESS TRANS INC — Website

Marketing website for XPRESS TRANS INC (USDOT 2576898, MC-901483), a for-hire interstate motor
carrier in Hughson, California.

**Stack:** React 19, TypeScript (strict), Tailwind CSS 4, Vite 8, React Router 8, Lucide icons,
Vitest + Testing Library. Every route is **prerendered to static HTML** at build time, so search
engines and visitors without JavaScript get the full content and metadata.

## Commands

```bash
npm install          # install dependencies (Node 20.19+)
npm run dev          # dev server at http://localhost:5173
npm run build        # typecheck, client build, SSR build, prerender -> dist/
npm run preview      # serve dist/ like a static host (404s, clean URLs) at :4173
npm run lint         # ESLint
npm test             # Vitest unit/component tests
npm run check        # lint + test + build
npm run images       # regenerate WebP image variants from assets-src/
```

## Configuration (environment variables)

Copy `.env.example` to `.env.production` or set the variables in your hosting provider.
Every `VITE_*` value is **public** (it ends up in the JavaScript bundle), so never put secrets here.

| Variable | Purpose | Default behaviour if unset |
|---|---|---|
| `VITE_SITE_URL` | Verified production origin, e.g. `https://www.example.com` | No canonical, `og:url`, `og:image` or sitemap; pages are `noindex` |
| `VITE_ALLOW_INDEXING` | `true` only for the production build on the real domain | `noindex, nofollow` on every page; `robots.txt` blocks all crawling |
| `VITE_QUOTE_ENDPOINT` | HTTPS URL that accepts the quote form as a JSON POST | Form shows "Online form not yet active" and **never** reports a false success |

### Connecting the quote form (required before launch)

There is no backend in this repository. The form POSTs JSON (`Content-Type: application/json`,
`Accept: application/json`) to `VITE_QUOTE_ENDPOINT`, and only a 2xx response counts as success.
Options:

1. **Formspree** (or a similar form service): create a form, set
   `VITE_QUOTE_ENDPOINT=https://formspree.io/f/<id>`, and turn on email notifications to the
   owner's approved address. The `_subject` field sets the email subject.
2. **Your own serverless function** (Netlify/Vercel/Cloudflare): accept the JSON, send email
   through a provider (e.g. Resend, Postmark, SES) using a **server-side** API key, and return 2xx.

Payload fields: `fullName, companyName, email, phone, origin, destination, service,
freightDescription, shipmentDate, notes, privacyConsent, submittedFrom, _subject`.
A hidden honeypot field (`website`) is checked client-side and is never sent. Add server-side
spam protection and rate limiting at the endpoint as well.

After connecting it, **submit a real test request and confirm the email arrives** before telling
anyone the form is live. Then update `src/data/privacy.ts` with the provider's name.

## Deployment

`dist/` is a fully static site:

```
index.html  about.html  services.html  contact.html  privacy-policy.html  404.html
robots.txt  sitemap.xml (only when indexing is enabled)  images/  assets/
```

The host must:

- serve `/about` from `about.html` (clean URLs) and redirect `/about.html` and `/about/` to `/about`;
- return `404.html` with an **HTTP 404** status for unknown paths (do **not** enable an SPA
  fallback that serves `index.html` for every route);
- serve over HTTPS.

Netlify and Cloudflare Pages do this by default. Vercel needs `"cleanUrls": true` in
`vercel.json`. On Apache or nginx, add matching rewrite rules.

### GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main` (set
**Settings → Pages → Source** to **GitHub Actions**). It sets the build-only `BASE_PATH` variable
automatically: `/ExpressTransInc` when served from `vaishnavsts.github.io/ExpressTransInc/`, and
nothing once a custom domain is configured, so links, images and assets always resolve.
`VITE_SITE_URL` defaults to the Pages URL unless you set it as a repository variable.
GitHub Pages does not redirect `/about/` to `/about`; it shows the 404 page instead.

Production build example:

```bash
VITE_SITE_URL=https://www.example.com VITE_ALLOW_INDEXING=true \
VITE_QUOTE_ENDPOINT=https://formspree.io/f/xxxx npm run build
```

Preview or staging builds should leave `VITE_ALLOW_INDEXING` unset, so they are never indexed.

## Where things live

```
src/data/company.ts      Single source of truth for company facts (see docs/company-research.md)
src/data/services.ts     Services (limited to the FMCSA cargo classifications)
src/data/faq.ts          FAQ content
src/data/routes.ts       Per-route titles and meta descriptions
src/data/privacy.ts      Privacy policy provider names and retention (needs review)
src/data/images.ts       Image metadata, alt text and photo credits
src/config/site.ts       Env-driven deployment settings
src/lib/head.ts          Head tags shared by the prerender and client navigation
src/lib/structuredData.ts  JSON-LD (Organization, WebSite, BreadcrumbList, Service)
src/lib/validation.ts    Quote form validation
src/lib/quoteSubmission.ts Typed submission client
scripts/prerender.mjs    Static HTML generation + robots/sitemap + SEO sanity checks
docs/company-research.md Verified facts, sources, conflicts, open questions
```

## Images

The four photos are licensed stock images from Unsplash (Unsplash License). They are
illustrative and **do not show XPRESS TRANS INC's trucks, drivers or facilities**; the footer
says so. Credits are recorded in `src/data/images.ts`. Replace them with authentic company
photos when available: put the JPEGs in `assets-src/`, update the job list in
`scripts/optimize-images.mjs` and `src/data/images.ts`, then run `npm run images`.

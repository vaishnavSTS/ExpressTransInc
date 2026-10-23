/**
 * Build-time entry used by scripts/prerender.mjs to generate static HTML for every
 * route, so crawlers and no-JS visitors receive full content and metadata.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { absoluteUrl, siteConfig } from './config/site';
import { indexableRoutes, routes } from './data/routes';
import { buildHead, renderHeadToString } from './lib/head';

export interface PrerenderPage {
  /** URL path rendered. */
  path: string;
  /** Output file relative to dist/. */
  file: string;
  html: string;
  head: string;
}

const outputFile = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`);

export function renderPage(path: string, file: string, route = routes.notFound): PrerenderPage {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { path, file, html, head: renderHeadToString(buildHead(route)) };
}

export function renderAll(): PrerenderPage[] {
  const pages = indexableRoutes.map((r) => renderPage(r.path, outputFile(r.path), r));
  // Rendered from an unmatched URL so the catch-all route produces the 404 page.
  pages.push(renderPage('/__not-found__', '404.html', routes.notFound));
  return pages;
}

export function robotsTxt(): string {
  if (!siteConfig.allowIndexing) {
    return '# Indexing disabled: set VITE_SITE_URL and VITE_ALLOW_INDEXING=true for production.\nUser-agent: *\nDisallow: /\n';
  }
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
}

/** Sitemap of canonical, indexable URLs. Null when indexing is disabled. */
export function sitemapXml(lastmod: string): string | null {
  if (!siteConfig.allowIndexing) return null;
  const urls = indexableRoutes
    .map((r) => `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export { siteConfig };

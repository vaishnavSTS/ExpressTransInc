import { absoluteUrl, siteConfig } from '../config/site';
import { company } from '../data/company';
import { ogImagePath } from '../data/images';
import type { RouteMeta } from '../data/routes';
import { structuredDataFor } from './structuredData';

/**
 * Head tags are described as data so the same definitions drive both the
 * build-time prerender (serialized to HTML) and client-side navigation (applied to
 * the DOM by <SEOHead>).
 */
export type HeadTag =
  | { tag: 'meta'; attrs: Record<string, string> }
  | { tag: 'link'; attrs: Record<string, string> }
  | { tag: 'jsonld'; json: Record<string, unknown> };

export interface HeadData {
  title: string;
  tags: HeadTag[];
}

export const MANAGED_ATTR = 'data-head';

export const buildHead = (route: RouteMeta): HeadData => {
  const tags: HeadTag[] = [];
  const meta = (attrs: Record<string, string>) => tags.push({ tag: 'meta', attrs });

  meta({ name: 'description', content: route.description });

  const indexable = siteConfig.allowIndexing && !route.noindex;
  meta({ name: 'robots', content: indexable ? 'index, follow' : 'noindex, nofollow' });

  const canonical = route.noindex ? null : absoluteUrl(route.path);
  if (canonical) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: canonical } });

  meta({ property: 'og:type', content: 'website' });
  meta({ property: 'og:site_name', content: company.displayName });
  meta({ property: 'og:title', content: route.title });
  meta({ property: 'og:description', content: route.description });
  meta({ property: 'og:locale', content: 'en_US' });
  if (canonical) meta({ property: 'og:url', content: canonical });

  const ogImage = absoluteUrl(ogImagePath);
  if (ogImage) {
    meta({ property: 'og:image', content: ogImage });
    meta({ property: 'og:image:width', content: '1200' });
    meta({ property: 'og:image:height', content: '630' });
    meta({ property: 'og:image:alt', content: 'Tractor-trailers on a highway' });
  }
  meta({ name: 'twitter:card', content: ogImage ? 'summary_large_image' : 'summary' });
  meta({ name: 'twitter:title', content: route.title });
  meta({ name: 'twitter:description', content: route.description });

  const jsonld = structuredDataFor(route);
  if (jsonld) tags.push({ tag: 'jsonld', json: jsonld });

  return { title: route.title, tags };
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON safe for embedding inside a <script> element. */
export const serializeJsonLd = (json: Record<string, unknown>) =>
  JSON.stringify(json).replace(/</g, '\\u003c');

/** Serializes head data to an HTML string for prerendering. */
export const renderHeadToString = ({ title, tags }: HeadData): string => {
  const attrString = (attrs: Record<string, string>) =>
    Object.entries(attrs)
      .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
      .join(' ');
  const lines = [`<title>${escapeHtml(title)}</title>`];
  for (const t of tags) {
    if (t.tag === 'jsonld') {
      lines.push(`<script type="application/ld+json" ${MANAGED_ATTR}>${serializeJsonLd(t.json)}</script>`);
    } else {
      lines.push(`<${t.tag} ${attrString(t.attrs)} ${MANAGED_ATTR}>`);
    }
  }
  return lines.join('\n    ');
};

/** Replaces previously managed head elements with the tags for the current route. */
export const applyHeadToDocument = ({ title, tags }: HeadData, doc: Document = document) => {
  doc.title = title;
  doc.head.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((el) => el.remove());
  for (const t of tags) {
    let el: HTMLElement;
    if (t.tag === 'jsonld') {
      el = doc.createElement('script');
      el.setAttribute('type', 'application/ld+json');
      el.textContent = serializeJsonLd(t.json);
    } else {
      el = doc.createElement(t.tag);
      for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    }
    el.setAttribute(MANAGED_ATTR, '');
    doc.head.appendChild(el);
  }
};

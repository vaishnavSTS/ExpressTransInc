import { afterEach, describe, expect, it, vi } from 'vitest';

// site config is read at module load, so each scenario re-imports with fresh env.
const load = async (env: Record<string, string>) => {
  vi.resetModules();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  const head = await import('./head');
  const { routes } = await import('../data/routes');
  const server = await import('../entry-server');
  return { ...head, routes, server };
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('head and crawl rules without a production domain', () => {
  it('emits noindex, no canonical, no sitemap and a blocking robots.txt', async () => {
    const { buildHead, routes, server } = await load({ VITE_SITE_URL: '', VITE_ALLOW_INDEXING: 'true' });
    const head = buildHead(routes.home);
    expect(head.tags).toContainEqual({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } });
    expect(head.tags.some((t) => t.tag === 'link' && t.attrs.rel === 'canonical')).toBe(false);
    expect(server.sitemapXml('2026-10-23')).toBeNull();
    expect(server.robotsTxt()).toContain('Disallow: /');
  });
});

describe('head and crawl rules on the production domain', () => {
  it('emits canonical, OG URLs, sitemap and an allowing robots.txt', async () => {
    const { buildHead, renderHeadToString, routes, server } = await load({
      VITE_SITE_URL: 'https://www.example.com/',
      VITE_ALLOW_INDEXING: 'true',
    });
    const html = renderHeadToString(buildHead(routes.services));
    expect(html).toContain('<link rel="canonical" href="https://www.example.com/services"');
    expect(html).toContain('content="index, follow"');
    expect(html).toContain('property="og:image" content="https://www.example.com/images/og-image.jpg"');

    const sitemap = server.sitemapXml('2026-10-23')!;
    expect(sitemap).toContain('<loc>https://www.example.com/</loc>');
    expect(sitemap).toContain('<loc>https://www.example.com/privacy-policy</loc>');
    expect(sitemap).not.toContain('404');
    expect(server.robotsTxt()).toContain('Sitemap: https://www.example.com/sitemap.xml');
  });

  it('keeps the 404 page out of the index even in production', async () => {
    const { buildHead, routes } = await load({ VITE_SITE_URL: 'https://www.example.com', VITE_ALLOW_INDEXING: 'true' });
    const head = buildHead(routes.notFound);
    expect(head.tags).toContainEqual({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } });
    expect(head.tags.some((t) => t.tag === 'jsonld')).toBe(false);
  });

  it('requires the explicit indexing flag', async () => {
    const { buildHead, routes } = await load({ VITE_SITE_URL: 'https://www.example.com', VITE_ALLOW_INDEXING: '' });
    expect(buildHead(routes.home).tags).toContainEqual({
      tag: 'meta',
      attrs: { name: 'robots', content: 'noindex, nofollow' },
    });
  });
});

describe('structured data', () => {
  it('contains only verified facts', async () => {
    const { buildHead, routes } = await load({ VITE_SITE_URL: 'https://www.example.com', VITE_ALLOW_INDEXING: 'true' });
    const jsonld = buildHead(routes.services).tags.find((t) => t.tag === 'jsonld');
    const text = JSON.stringify(jsonld);
    expect(text).toContain('"legalName":"XPRESS TRANS INC"');
    expect(text).toContain('"telephone":"+12096221223"');
    expect(text).toContain('"value":"2576898"');
    expect(text).toContain('"@type":"BreadcrumbList"');
    expect(text).toContain('"@type":"Service"');
    for (const forbidden of ['openingHours', 'aggregateRating', 'review', 'areaServed', 'foundingDate', 'email', 'sameAs']) {
      expect(text).not.toContain(forbidden);
    }
  });

  it('escapes "<" so JSON-LD cannot break out of its script tag', async () => {
    const { serializeJsonLd } = await load({});
    expect(serializeJsonLd({ a: '</script><b>' })).not.toContain('</script>');
  });
});

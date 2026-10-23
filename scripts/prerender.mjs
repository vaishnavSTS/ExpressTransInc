// Post-build step: renders every route to static HTML using the SSR bundle, then
// writes robots.txt and (when indexing is enabled) sitemap.xml.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder.');
}

const entry = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const pages = entry.renderAll();
const problems = [];
const titles = new Map();

for (const page of pages) {
  const html = template.replace('<!--app-head-->', page.head).replace('<!--app-html-->', page.html);

  // Basic SEO sanity checks so regressions fail the build.
  const h1Count = (page.html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) problems.push(`${page.file}: expected exactly one <h1>, found ${h1Count}`);
  const title = page.head.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title) problems.push(`${page.file}: missing <title>`);
  else if (titles.has(title)) problems.push(`${page.file}: duplicate title also used by ${titles.get(title)}`);
  else titles.set(title, page.file);
  if (page.file !== '404.html' && !/<meta name="description" content="[^"]{50,}"/.test(page.head)) {
    problems.push(`${page.file}: missing or very short meta description`);
  }

  const outFile = path.join(dist, page.file);
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`prerendered ${page.path.padEnd(16)} -> dist/${page.file}`);
}

await writeFile(path.join(dist, 'robots.txt'), entry.robotsTxt());
const sitemap = entry.sitemapXml(new Date().toISOString().slice(0, 10));
if (sitemap) {
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
  console.log('wrote dist/sitemap.xml');
} else {
  await rm(path.join(dist, 'sitemap.xml'), { force: true });
  console.log('indexing disabled: robots.txt blocks crawlers, no sitemap.xml written');
}

await rm(ssrDir, { recursive: true, force: true });

if (problems.length > 0) {
  console.error(`\nPrerender checks failed:\n - ${problems.join('\n - ')}`);
  process.exit(1);
}
const { siteUrl, allowIndexing, quoteEndpoint } = entry.siteConfig;
console.log(
  `\nsite URL: ${siteUrl ?? '(not set)'} | indexing: ${allowIndexing ? 'ENABLED' : 'disabled'} | quote form: ${
    quoteEndpoint ? 'connected' : 'NOT CONNECTED'
  }`,
);

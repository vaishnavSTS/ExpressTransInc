import { absoluteUrl, siteConfig } from '../config/site';
import { company } from '../data/company';
import type { RouteMeta } from '../data/routes';
import { services } from '../data/services';

type JsonLd = Record<string, unknown>;

const organizationId = () => (siteConfig.siteUrl ? `${siteConfig.siteUrl}/#organization` : '#organization');

/**
 * Organization rather than LocalBusiness: there is no verified storefront or opening
 * hours. Only facts shown on the site and verified against FMCSA are included.
 */
export const organizationSchema = (): JsonLd => {
  const { street, city, region, postalCode, country } = company.address;
  const schema: JsonLd = {
    '@type': 'Organization',
    '@id': organizationId(),
    name: company.displayName,
    legalName: company.legalName,
    telephone: company.phoneE164,
    address: {
      '@type': 'PostalAddress',
      ...(company.showStreetAddress ? { streetAddress: street, postalCode } : {}),
      addressLocality: city,
      addressRegion: region,
      addressCountry: country,
    },
    identifier: [
      { '@type': 'PropertyValue', name: 'USDOT Number', value: company.usdotNumber },
      { '@type': 'PropertyValue', name: 'MC Number', value: company.mcNumber },
    ],
  };
  const url = absoluteUrl('/');
  if (url) schema.url = url;
  if (company.email) schema.email = company.email;
  if (company.socialProfiles.length > 0) schema.sameAs = company.socialProfiles;
  return schema;
};

const websiteSchema = (): JsonLd | null => {
  const url = absoluteUrl('/');
  if (!url) return null;
  return {
    '@type': 'WebSite',
    '@id': `${url}#website`,
    url,
    name: company.displayName,
    publisher: { '@id': organizationId() },
    inLanguage: 'en-US',
  };
};

const breadcrumbSchema = (route: RouteMeta): JsonLd | null => {
  const home = absoluteUrl('/');
  const current = absoluteUrl(route.path);
  if (!home || !current || route.path === '/') return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: home },
      { '@type': 'ListItem', position: 2, name: route.name, item: current },
    ],
  };
};

const serviceSchemas = (): JsonLd[] =>
  services.map((s) => ({
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.summary,
    provider: { '@id': organizationId() },
  }));

/** Builds the JSON-LD graph for a route, or null for routes that get no markup. */
export const structuredDataFor = (route: RouteMeta): JsonLd | null => {
  if (route.noindex) return null;
  const graph: JsonLd[] = [organizationSchema()];
  const website = route.id === 'home' ? websiteSchema() : null;
  if (website) graph.push(website);
  const breadcrumb = breadcrumbSchema(route);
  if (breadcrumb) graph.push(breadcrumb);
  if (route.id === 'services') graph.push(...serviceSchemas());
  return { '@context': 'https://schema.org', '@graph': graph };
};

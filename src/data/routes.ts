export type RouteId = 'home' | 'about' | 'services' | 'contact' | 'privacy' | 'notFound';

export interface RouteMeta {
  id: RouteId;
  path: string;
  /** Short name for breadcrumbs. */
  name: string;
  title: string;
  description: string;
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean;
}

export const routes: Record<RouteId, RouteMeta> = {
  home: {
    id: 'home',
    path: '/',
    name: 'Home',
    title: 'XPRESS TRANS INC | Freight Trucking Company in Hughson, CA',
    description:
      'XPRESS TRANS INC is an FMCSA-registered interstate motor carrier in Hughson, California, transporting general freight and intermodal containers. Request a quote.',
  },
  about: {
    id: 'about',
    path: '/about',
    name: 'About',
    title: 'About XPRESS TRANS INC | Interstate Motor Carrier, Hughson, CA',
    description:
      'Learn about XPRESS TRANS INC, a for-hire interstate motor carrier based in Hughson, California (USDOT 2576898, MC-901483), and how we work with shippers.',
  },
  services: {
    id: 'services',
    path: '/services',
    name: 'Services',
    title: 'General Freight & Intermodal Container Trucking | XPRESS TRANS INC',
    description:
      'General freight and intermodal container transportation from XPRESS TRANS INC in Hughson, CA. See what each service involves and what to share for a quote.',
  },
  contact: {
    id: 'contact',
    path: '/contact',
    name: 'Contact',
    title: 'Contact & Request a Freight Quote | XPRESS TRANS INC',
    description:
      'Call XPRESS TRANS INC at (209) 622-1223 or send your shipment details through our quote request form. Based in Hughson, California.',
  },
  privacy: {
    id: 'privacy',
    path: '/privacy-policy',
    name: 'Privacy Policy',
    title: 'Privacy Policy | XPRESS TRANS INC',
    description:
      'How the XPRESS TRANS INC website collects, uses and protects the information you submit through our quote request form.',
  },
  notFound: {
    id: 'notFound',
    path: '/404',
    name: 'Page not found',
    title: 'Page Not Found | XPRESS TRANS INC',
    description: 'The page you were looking for could not be found.',
    noindex: true,
  },
};

/** Routes that are prerendered to their own HTML file (all except 404). */
export const indexableRoutes: RouteMeta[] = Object.values(routes).filter((r) => !r.noindex);

export const routeForPath = (pathname: string): RouteMeta => {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return indexableRoutes.find((r) => r.path === normalized) ?? routes.notFound;
};

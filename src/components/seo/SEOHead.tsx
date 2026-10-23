import { useEffect } from 'react';
import type { RouteMeta } from '../../data/routes';
import { applyHeadToDocument, buildHead } from '../../lib/head';

interface SEOHeadProps {
  route: RouteMeta;
}

/**
 * Keeps <head> in sync during client-side navigation. The initial HTML for each route
 * already contains the same tags, written at build time by scripts/prerender.mjs.
 */
export function SEOHead({ route }: SEOHeadProps) {
  useEffect(() => {
    applyHeadToDocument(buildHead(route));
  }, [route]);
  return null;
}

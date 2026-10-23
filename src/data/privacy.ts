/**
 * Provider details referenced by the Privacy Policy.
 *
 * OWNER / DEVELOPER REVIEW before launch:
 *  - Set `formProcessor` to the service behind VITE_QUOTE_ENDPOINT (e.g. "Formspree")
 *    with a link to its privacy policy.
 *  - Set `hostingProvider` to the website host.
 *  - Confirm `retention` reflects how long quote requests are actually kept.
 *  - Have the full policy reviewed; it has not been assessed for legal compliance.
 */
export const privacyConfig = {
  lastUpdated: 'October 23, 2026',
  formProcessor: null as { name: string; privacyUrl: string } | null,
  hostingProvider: null as { name: string; privacyUrl: string } | null,
  retention:
    'We keep quote requests only as long as reasonably needed to respond to you and for our ordinary business records, and then delete them.',
};

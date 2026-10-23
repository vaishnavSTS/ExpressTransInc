import { siteConfig } from '../config/site';
import { serviceOptions } from '../data/services';
import type { QuoteFormValues, QuoteRequestPayload, SubmissionResult } from '../types/quote';

export const toPayload = (values: QuoteFormValues, pageUrl: string): QuoteRequestPayload => ({
  fullName: values.fullName.trim(),
  companyName: values.companyName.trim(),
  email: values.email.trim(),
  phone: values.phone.trim(),
  origin: values.origin.trim(),
  destination: values.destination.trim(),
  service: serviceOptions.find((o) => o.value === values.service)?.label ?? values.service,
  freightDescription: values.freightDescription.trim(),
  shipmentDate: values.shipmentDate,
  notes: values.notes.trim(),
  privacyConsent: true,
  submittedFrom: pageUrl,
  _subject: `Quote request: ${values.origin.trim()} to ${values.destination.trim()}`,
});

export interface SubmitOptions {
  endpoint?: string | null;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

/**
 * Sends a quote request to the configured endpoint as JSON.
 *
 * Returns `not-configured` (never a fake success) when no endpoint is set. Only a 2xx
 * response counts as success. Form contents are never logged or stored locally.
 */
export const submitQuoteRequest = async (
  values: QuoteFormValues,
  pageUrl: string,
  { endpoint = siteConfig.quoteEndpoint, fetchImpl = fetch, timeoutMs = 15000 }: SubmitOptions = {},
): Promise<SubmissionResult> => {
  if (!endpoint) return { status: 'not-configured' };

  // Honeypot filled in: almost certainly a bot. Report an error without sending.
  if (values.website.trim()) {
    return { status: 'error', message: 'Your request could not be sent. Please call us instead.' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toPayload(values, pageUrl)),
      signal: controller.signal,
    });
    if (response.ok) return { status: 'success' };
    return {
      status: 'error',
      message: `The server could not accept your request (error ${response.status}). Please try again or call us.`,
    };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === 'AbortError';
    return {
      status: 'error',
      message: aborted
        ? 'The request timed out. Please check your connection and try again, or call us.'
        : 'We could not reach the server. Please check your connection and try again, or call us.',
    };
  } finally {
    clearTimeout(timer);
  }
};

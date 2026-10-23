import { describe, expect, it, vi } from 'vitest';
import type { QuoteFormValues } from '../types/quote';
import { submitQuoteRequest, toPayload } from './quoteSubmission';
import { emptyQuoteForm } from './validation';

const values: QuoteFormValues = {
  ...emptyQuoteForm,
  fullName: ' Jordan Lee ',
  email: 'jordan@example.com',
  phone: '2095550100',
  origin: 'Modesto, CA',
  destination: 'Reno, NV',
  service: 'intermodal-containers',
  freightDescription: '40ft container',
  privacyConsent: true,
};

const endpoint = 'https://forms.example.test/submit';

describe('submitQuoteRequest', () => {
  it('never reports success when no endpoint is configured', async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const result = await submitQuoteRequest(values, 'https://site/contact', { endpoint: null, fetchImpl });
    expect(result).toEqual({ status: 'not-configured' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('posts JSON and reports success on a 2xx response', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    const result = await submitQuoteRequest(values, 'https://site/contact', { endpoint, fetchImpl });
    expect(result).toEqual({ status: 'success' });
    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe(endpoint);
    expect(init?.method).toBe('POST');
    const body = JSON.parse(String(init?.body));
    expect(body.fullName).toBe('Jordan Lee');
    expect(body.service).toBe('Intermodal Container Transportation');
    expect(body).not.toHaveProperty('website');
  });

  it('reports an error for non-2xx responses', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response('nope', { status: 500 }));
    const result = await submitQuoteRequest(values, 'x', { endpoint, fetchImpl });
    expect(result).toMatchObject({ status: 'error' });
    if (result.status === 'error') expect(result.message).toContain('500');
  });

  it('reports an error when the network fails', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch'));
    const result = await submitQuoteRequest(values, 'x', { endpoint, fetchImpl });
    expect(result).toMatchObject({ status: 'error' });
  });

  it('does not send when the honeypot is filled', async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    const result = await submitQuoteRequest({ ...values, website: 'spam' }, 'x', { endpoint, fetchImpl });
    expect(result).toMatchObject({ status: 'error' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('does not log form data to the console', async () => {
    const spies = (['log', 'info', 'warn', 'error', 'debug'] as const).map((m) => vi.spyOn(console, m));
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('x'));
    await submitQuoteRequest(values, 'x', { endpoint, fetchImpl });
    spies.forEach((s) => {
      expect(s).not.toHaveBeenCalled();
      s.mockRestore();
    });
  });
});

describe('toPayload', () => {
  it('builds a subject line from the lane', () => {
    expect(toPayload(values, 'u')._subject).toBe('Quote request: Modesto, CA to Reno, NV');
  });
});

import { describe, expect, it } from 'vitest';
import type { QuoteFormValues } from '../types/quote';
import { emptyQuoteForm, isValidEmail, isValidUSPhone, todayISO, validateQuote } from './validation';

const valid: QuoteFormValues = {
  ...emptyQuoteForm,
  fullName: 'Jordan Lee',
  email: 'jordan@example.com',
  phone: '(209) 555-0100',
  origin: 'Modesto, CA',
  destination: 'Reno, NV',
  service: 'general-freight',
  freightDescription: '12 pallets of packaged goods, about 18,000 lb',
  privacyConsent: true,
};

const now = new Date(2026, 9, 23); // Oct 23, 2026 local time

describe('validateQuote', () => {
  it('accepts a complete, valid request', () => {
    expect(validateQuote(valid, now)).toEqual({});
  });

  it('flags every required field on an empty form', () => {
    const errors = validateQuote(emptyQuoteForm, now);
    expect(Object.keys(errors).sort()).toEqual(
      ['destination', 'email', 'freightDescription', 'fullName', 'origin', 'phone', 'privacyConsent', 'service'].sort(),
    );
  });

  it('treats whitespace-only input as empty', () => {
    expect(validateQuote({ ...valid, fullName: '   ' }, now).fullName).toBeDefined();
  });

  it('rejects past ship dates but allows today and future dates', () => {
    expect(validateQuote({ ...valid, shipmentDate: '2026-10-22' }, now).shipmentDate).toMatch(/today or a future/);
    expect(validateQuote({ ...valid, shipmentDate: '2026-10-23' }, now).shipmentDate).toBeUndefined();
    expect(validateQuote({ ...valid, shipmentDate: '2027-01-05' }, now).shipmentDate).toBeUndefined();
  });

  it('enforces length limits', () => {
    expect(validateQuote({ ...valid, notes: 'x'.repeat(2001) }, now).notes).toMatch(/2000 characters/);
  });
});

describe('field validators', () => {
  it.each(['name@company.com', 'a.b+c@sub.domain.org'])('accepts email %s', (e) => {
    expect(isValidEmail(e)).toBe(true);
  });
  it.each(['name', 'name@', 'name@company', 'na me@company.com', '@company.com'])('rejects email %s', (e) => {
    expect(isValidEmail(e)).toBe(false);
  });
  it.each(['2095550100', '(209) 555-0100', '209.555.0100', '+1 209 555 0100', '1-209-555-0100'])(
    'accepts phone %s',
    (p) => expect(isValidUSPhone(p)).toBe(true),
  );
  it.each(['555-0100', '209555010', '2-209-555-0100', 'call me', '209-555-01000'])('rejects phone %s', (p) => {
    expect(isValidUSPhone(p)).toBe(false);
  });
  it('formats today in local time', () => {
    expect(todayISO(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});

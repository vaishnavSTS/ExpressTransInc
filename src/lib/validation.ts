import type { QuoteErrors, QuoteField, QuoteFormValues } from '../types/quote';

export const emptyQuoteForm: QuoteFormValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  origin: '',
  destination: '',
  service: '',
  freightDescription: '',
  shipmentDate: '',
  notes: '',
  privacyConsent: false,
  website: '',
};

export const LIMITS = {
  name: 100,
  company: 120,
  location: 120,
  description: 1500,
  notes: 2000,
} as const;

// Pragmatic email check: one @, no spaces, a dot in the domain part.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts US numbers (10 digits, optional leading 1) in any common format. */
export const isValidUSPhone = (value: string): boolean => {
  if (!/^[\d\s().+-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};

export const isValidEmail = (value: string): boolean => EMAIL_RE.test(value) && value.length <= 254;

/** Today's date in the visitor's local time zone, as YYYY-MM-DD. */
export const todayISO = (now: Date = new Date()): string => {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const required = (value: string, message: string) => (value.trim() ? undefined : message);

const maxLength = (value: string, max: number, label: string) =>
  value.trim().length > max ? `${label} must be ${max} characters or fewer.` : undefined;

type Validator = (values: QuoteFormValues, now: Date) => string | undefined;

const validators: Record<QuoteField, Validator> = {
  fullName: (v) => required(v.fullName, 'Enter your full name.') ?? maxLength(v.fullName, LIMITS.name, 'Name'),
  companyName: (v) => maxLength(v.companyName, LIMITS.company, 'Company name'),
  email: (v) =>
    required(v.email, 'Enter your email address.') ??
    (isValidEmail(v.email.trim()) ? undefined : 'Enter a valid email address, like name@company.com.'),
  phone: (v) =>
    required(v.phone, 'Enter a phone number so we can reach you.') ??
    (isValidUSPhone(v.phone.trim()) ? undefined : 'Enter a valid 10-digit US phone number.'),
  origin: (v) =>
    required(v.origin, 'Enter the pickup city and state.') ?? maxLength(v.origin, LIMITS.location, 'Pickup location'),
  destination: (v) =>
    required(v.destination, 'Enter the delivery city and state.') ??
    maxLength(v.destination, LIMITS.location, 'Delivery location'),
  service: (v) => (v.service ? undefined : 'Choose the service that best fits your shipment.'),
  freightDescription: (v) =>
    required(v.freightDescription, 'Describe the freight you need to move.') ??
    maxLength(v.freightDescription, LIMITS.description, 'Freight description'),
  shipmentDate: (v, now) => {
    if (!v.shipmentDate) return undefined;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.shipmentDate)) return 'Enter a valid date.';
    return v.shipmentDate < todayISO(now) ? 'Choose today or a future date.' : undefined;
  },
  notes: (v) => maxLength(v.notes, LIMITS.notes, 'Additional notes'),
  privacyConsent: (v) =>
    v.privacyConsent ? undefined : 'Please confirm you have read the privacy policy.',
};

export const quoteFieldOrder = Object.keys(validators) as QuoteField[];

export const validateField = (field: QuoteField, values: QuoteFormValues, now = new Date()) =>
  validators[field](values, now);

export const validateQuote = (values: QuoteFormValues, now = new Date()): QuoteErrors => {
  const errors: QuoteErrors = {};
  for (const field of quoteFieldOrder) {
    const message = validators[field](values, now);
    if (message) errors[field] = message;
  }
  return errors;
};

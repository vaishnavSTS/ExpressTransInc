import type { serviceOptions } from '../data/services';

export type ServiceOptionValue = (typeof serviceOptions)[number]['value'];

export interface QuoteFormValues {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  service: ServiceOptionValue | '';
  freightDescription: string;
  shipmentDate: string;
  notes: string;
  privacyConsent: boolean;
  /** Honeypot field. Real visitors never see or fill it. */
  website: string;
}

export type QuoteField = Exclude<keyof QuoteFormValues, 'website'>;

export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Payload sent to the configured endpoint. */
export interface QuoteRequestPayload {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  service: string;
  freightDescription: string;
  shipmentDate: string;
  notes: string;
  privacyConsent: true;
  submittedFrom: string;
  _subject: string;
}

export type SubmissionResult =
  | { status: 'success' }
  | { status: 'not-configured' }
  | { status: 'error'; message: string };

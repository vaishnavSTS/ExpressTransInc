import { AlertTriangle, CheckCircle2, Info, Loader2, Phone } from 'lucide-react';
import { type ChangeEvent, type FocusEvent, type FormEvent, useRef, useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router';
import { siteConfig } from '../../config/site';
import { company, telHref } from '../../data/company';
import { serviceOptions } from '../../data/services';
import { submitQuoteRequest } from '../../lib/quoteSubmission';
import { emptyQuoteForm, LIMITS, quoteFieldOrder, todayISO, validateField, validateQuote } from '../../lib/validation';
import type { QuoteErrors, QuoteField, QuoteFormValues, SubmissionResult } from '../../types/quote';
import { FieldShell } from './FormField';
import { controlClass, describedBy } from './formHelpers';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'not-configured' }
  | { state: 'error'; message: string };

export interface QuoteRequestFormProps {
  /** Injected for tests; defaults to the real submission client. */
  submit?: (values: QuoteFormValues, pageUrl: string) => Promise<SubmissionResult>;
  /** Defaults to whether VITE_QUOTE_ENDPOINT is set. */
  endpointConfigured?: boolean;
}

const fieldId = (field: QuoteField) => `quote-${field}`;

const noopSubscribe = () => () => {};

export function QuoteRequestForm({
  submit = submitQuoteRequest,
  endpointConfigured = siteConfig.quoteEndpoint !== null,
}: QuoteRequestFormProps) {
  const [values, setValues] = useState<QuoteFormValues>(emptyQuoteForm);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const submittingRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // Only known on the client; omitted from prerendered HTML so the build date never goes stale.
  const minDate = useSyncExternalStore(noopSubscribe, () => todayISO(), () => undefined);

  const update = (field: keyof QuoteFormValues, value: string | boolean) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (field !== 'website' && (touched[field] || errors[field])) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const isCheckbox = event.target instanceof HTMLInputElement && event.target.type === 'checkbox';
    update(name as keyof QuoteFormValues, isCheckbox ? (event.target as HTMLInputElement).checked : value);
  };

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const field = event.target.name as QuoteField;
    if (!quoteFieldOrder.includes(field)) return;
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return; // guard against double submits

    const found = validateQuote(values);
    setErrors(found);
    setTouched(Object.fromEntries(quoteFieldOrder.map((f) => [f, true])));
    if (Object.keys(found).length > 0) {
      setStatus({ state: 'idle' });
      // Move focus to the error summary so screen reader users hear what to fix.
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setStatus({ state: 'submitting' });
    let result: SubmissionResult;
    try {
      result = await submit(values, window.location.href);
    } catch {
      result = { status: 'error', message: 'Something went wrong. Please try again or call us.' };
    }
    submittingRef.current = false;

    if (result.status === 'success') {
      setValues(emptyQuoteForm);
      setTouched({});
      setStatus({ state: 'success' });
    } else if (result.status === 'not-configured') {
      setStatus({ state: 'not-configured' });
    } else {
      setStatus({ state: 'error', message: result.message });
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const errorEntries = quoteFieldOrder.filter((f) => errors[f]);
  const submitting = status.state === 'submitting';

  const textProps = (field: QuoteField) => ({
    id: fieldId(field),
    name: field,
    value: values[field] as string,
    onChange,
    onBlur,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(fieldId(field), undefined, errors[field]),
    className: controlClass(Boolean(errors[field])),
  });

  if (status.state === 'success') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-green-700/30 bg-green-50 p-8 focus:outline-none"
      >
        <CheckCircle2 className="size-10 text-green-700" aria-hidden="true" />
        <h3 className="mt-4 text-2xl">Thank you — your request was sent</h3>
        <p className="mt-3 text-ink">
          We received your shipment details and will follow up using the contact information you provided. If your
          shipment is time-sensitive, please also call us at{' '}
          <a href={telHref} className="font-semibold text-navy-900 underline">
            {company.phoneDisplay}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle' })}
          className="mt-6 font-semibold text-navy-900 underline underline-offset-4 hover:text-accent-ink"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="quote-form-note" className="space-y-6">
      {!endpointConfigured && (
        <div className="flex gap-3 rounded-md border border-amber-600/40 bg-amber-50 p-4 text-ink" role="note">
          <Info className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p>
            <strong>Online form not yet active.</strong> This form is not connected to a delivery service yet, so
            submissions cannot be sent. Please call{' '}
            <a href={telHref} className="font-semibold underline">
              {company.phoneDisplay}
            </a>{' '}
            to request a quote.
          </p>
        </div>
      )}

      <p id="quote-form-note" className="text-sm text-muted">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>

      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border border-red-700/40 bg-red-50 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
        >
          <p className="font-semibold text-red-800">
            Please fix {errorEntries.length === 1 ? 'this problem' : `these ${errorEntries.length} problems`}:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorEntries.map((f) => (
              <li key={f}>
                <a
                  href={`#${fieldId(f)}`}
                  className="text-red-800 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    const field = document.getElementById(fieldId(f));
                    field?.scrollIntoView({ block: 'center' });
                    field?.focus({ preventScroll: true });
                  }}
                >
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-bold text-navy-900">Your contact details</legend>
        <FieldShell id={fieldId('fullName')} label="Full name" required error={errors.fullName}>
          <input type="text" autoComplete="name" maxLength={LIMITS.name} required {...textProps('fullName')} />
        </FieldShell>
        <FieldShell id={fieldId('companyName')} label="Company name" error={errors.companyName}>
          <input type="text" autoComplete="organization" maxLength={LIMITS.company} {...textProps('companyName')} />
        </FieldShell>
        <FieldShell id={fieldId('email')} label="Business email" required error={errors.email}>
          <input type="email" autoComplete="email" inputMode="email" required {...textProps('email')} />
        </FieldShell>
        <FieldShell id={fieldId('phone')} label="Phone number" required error={errors.phone}>
          <input type="tel" autoComplete="tel" inputMode="tel" required {...textProps('phone')} />
        </FieldShell>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-bold text-navy-900">Shipment details</legend>
        <FieldShell id={fieldId('origin')} label="Pickup city and state" required error={errors.origin}>
          <input type="text" placeholder="e.g. Modesto, CA" maxLength={LIMITS.location} required {...textProps('origin')} />
        </FieldShell>
        <FieldShell id={fieldId('destination')} label="Delivery city and state" required error={errors.destination}>
          <input
            type="text"
            placeholder="e.g. Reno, NV"
            maxLength={LIMITS.location}
            required
            {...textProps('destination')}
          />
        </FieldShell>
        <FieldShell id={fieldId('service')} label="Service needed" required error={errors.service}>
          <select required {...textProps('service')}>
            <option value="">Select a service</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </FieldShell>
        <FieldShell id={fieldId('shipmentDate')} label="Estimated ship date" error={errors.shipmentDate}>
          <input type="date" min={minDate} {...textProps('shipmentDate')} />
        </FieldShell>
        <FieldShell
          id={fieldId('freightDescription')}
          label="Freight description"
          required
          hint="What is it, how is it packaged, and the approximate weight or container size."
          error={errors.freightDescription}
          className="sm:col-span-2"
        >
          <textarea
            rows={4}
            maxLength={LIMITS.description}
            required
            {...textProps('freightDescription')}
            aria-describedby={describedBy(fieldId('freightDescription'), 'hint', errors.freightDescription)}
          />
        </FieldShell>
        <FieldShell
          id={fieldId('notes')}
          label="Additional notes"
          hint="Appointments, loading requirements, reference numbers or anything else we should know."
          error={errors.notes}
          className="sm:col-span-2"
        >
          <textarea
            rows={3}
            maxLength={LIMITS.notes}
            {...textProps('notes')}
            aria-describedby={describedBy(fieldId('notes'), 'hint', errors.notes)}
          />
        </FieldShell>
      </fieldset>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={onChange}
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId('privacyConsent')}
            name="privacyConsent"
            type="checkbox"
            checked={values.privacyConsent}
            onChange={onChange}
            onBlur={onBlur}
            required
            aria-invalid={errors.privacyConsent ? true : undefined}
            aria-describedby={describedBy(fieldId('privacyConsent'), undefined, errors.privacyConsent)}
            className="mt-1 size-5 shrink-0 accent-navy-900"
          />
          <label htmlFor={fieldId('privacyConsent')} className="text-ink">
            I have read the{' '}
            <Link to="/privacy-policy" className="font-semibold text-navy-900 underline">
              privacy policy
            </Link>{' '}
            and agree that {company.displayName} may use these details to respond to my request.
            <span className="ml-1 text-red-700" aria-hidden="true">
              *
            </span>
          </label>
        </div>
        {errors.privacyConsent && (
          <p id={`${fieldId('privacyConsent')}-error`} className="mt-2 text-sm font-medium text-red-700">
            {errors.privacyConsent}
          </p>
        )}
      </div>

      {(status.state === 'error' || status.state === 'not-configured') && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 rounded-md border border-red-700/40 bg-red-50 p-4 text-ink focus:outline-none"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-700" aria-hidden="true" />
          <p>
            <strong>Your request was not sent.</strong>{' '}
            {status.state === 'not-configured'
              ? 'The online form is not connected yet. Your details are still in the form, but nothing was submitted.'
              : status.message}{' '}
            You can reach us by phone at{' '}
            <a href={telHref} className="font-semibold underline">
              {company.phoneDisplay}
            </a>
            .
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          aria-disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-8 py-3 text-lg font-semibold text-navy-950 transition-colors hover:bg-accent-600 disabled:cursor-wait disabled:opacity-70"
        >
          {submitting && <Loader2 className="size-5 animate-spin" aria-hidden="true" />}
          {submitting ? 'Sending…' : 'Send quote request'}
        </button>
        <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-accent-ink">
          <Phone className="size-4" aria-hidden="true" />
          Or call {company.phoneDisplay}
        </a>
      </div>
      <p className="sr-only" aria-live="polite">
        {submitting ? 'Sending your quote request.' : ''}
      </p>
    </form>
  );
}

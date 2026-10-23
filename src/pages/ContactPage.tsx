import { ExternalLink, FileText, MapPin, Phone } from 'lucide-react';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';
import { PageHeader } from '../components/layout/PageHeader';
import { SEOHead } from '../components/seo/SEOHead';
import { Container } from '../components/ui/Container';
import { company, formatAddressLine, telHref } from '../data/company';
import { routes } from '../data/routes';

export function ContactPage() {
  return (
    <>
      <SEOHead route={routes.contact} />
      <PageHeader
        title="Contact Us & Request a Quote"
        crumb="Contact"
        intro="Call us or send your shipment details below. We review every request and follow up with you directly."
      />

      <section className="py-16 sm:py-20" aria-label="Contact information and quote form">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <aside aria-labelledby="contact-details-heading" className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="contact-details-heading" className="text-2xl">
              Contact details
            </h2>
            <ul className="mt-6 space-y-6">
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-navy-900 text-accent">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">Phone</p>
                  <a href={telHref} className="text-lg font-semibold text-navy-900 underline-offset-4 hover:underline">
                    {company.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-navy-900 text-accent">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">Registered address</p>
                  <address className="text-ink not-italic">{formatAddressLine()}</address>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-navy-900 text-accent">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-navy-900">Carrier registration</p>
                  <p className="text-ink">
                    USDOT {company.usdotNumber} · {company.mcNumber}
                  </p>
                  <a
                    href={company.fmcsaSnapshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 underline underline-offset-2 hover:text-accent-ink"
                  >
                    View FMCSA record
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-8 rounded-lg bg-surface p-6">
              <h3 className="text-lg">Before you reach out</h3>
              <p className="mt-2 text-muted">
                Have your pickup and delivery locations, a description of the freight, its approximate weight and your
                ready date on hand. It helps us give you a useful answer the first time.
              </p>
            </div>
          </aside>

          <div id="quote" className="rounded-lg bg-white p-6 shadow-lg ring-1 ring-line sm:p-10">
            <h2 className="text-3xl">Request a freight quote</h2>
            <p className="mt-3 mb-8 text-muted">
              Tell us about your shipment. Submitting this form is a request for information, not a booking.
            </p>
            <QuoteRequestForm />
          </div>
        </Container>
      </section>
    </>
  );
}

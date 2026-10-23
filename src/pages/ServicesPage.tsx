import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { CTASection } from '../components/home/CTASection';
import { FAQSection } from '../components/home/FAQSection';
import { PageHeader } from '../components/layout/PageHeader';
import { SEOHead } from '../components/seo/SEOHead';
import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { serviceIcons } from '../components/ui/serviceIcons';
import { faqs } from '../data/faq';
import { quoteHref } from '../data/navigation';
import { routes } from '../data/routes';
import { services } from '../data/services';

const serviceFaqs = faqs.filter((f) =>
  ['What types of freight do you handle?', 'Where do you operate?', 'Can I book a shipment or get an instant price online?'].includes(
    f.question,
  ),
);

export function ServicesPage() {
  return (
    <>
      <SEOHead route={routes.services} />
      <PageHeader
        title="General Freight & Intermodal Container Trucking"
        crumb="Services"
        intro="The two cargo categories listed on our FMCSA carrier record, what each involves, and what to share when you ask for a quote."
      />

      <nav aria-label="Services on this page" className="border-b border-line bg-white">
        <Container className="flex flex-wrap gap-x-8 gap-y-2 py-4">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="font-semibold text-navy-900 hover:text-accent-ink hover:underline">
              {s.name}
            </a>
          ))}
        </Container>
      </nav>

      {services.map((service, index) => {
        const Icon = serviceIcons[service.id];
        const reversed = index % 2 === 1;
        return (
          <section
            key={service.id}
            id={service.id}
            aria-labelledby={`${service.id}-heading`}
            className={`py-20 sm:py-24 ${reversed ? 'bg-surface' : ''}`}
          >
            <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div className={reversed ? 'lg:order-2' : ''}>
                <span className="flex size-12 items-center justify-center rounded-md bg-accent text-navy-950">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h2 id={`${service.id}-heading`} className="mt-5 text-3xl sm:text-4xl">
                  {service.name}
                </h2>
                <div className="mt-5 space-y-4 text-lg text-muted">
                  {service.description.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <h3 className="mt-8 text-xl">What to include in your quote request</h3>
                <ul className="mt-4 space-y-3">
                  {service.detailsToShare.map((d) => (
                    <li key={d} className="flex gap-3">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-accent-ink" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <ButtonLink to={quoteHref} className="mt-8">
                  Request a quote<span className="sr-only"> for {service.name.toLowerCase()}</span>
                  <ArrowRight className="size-5" aria-hidden="true" />
                </ButtonLink>
              </div>
              <ResponsiveImage
                image={service.image}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={`aspect-[4/3] w-full rounded-lg object-cover shadow-lg ${reversed ? 'lg:order-1' : ''}`}
              />
            </Container>
          </section>
        );
      })}

      <section className="bg-navy-900 py-16 text-white" aria-labelledby="other-heading">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="other-heading" className="text-2xl text-white sm:text-3xl">
              Need something not listed here?
            </h2>
            <p className="mt-3 text-slate-200">
              We only list services that match our carrier record. If your shipment needs specialized equipment or
              handling, ask us directly and we will tell you whether we can help.
            </p>
          </div>
          <ButtonLink to={quoteHref} variant="outline-light" className="self-start lg:self-auto">
            Ask about your shipment
          </ButtonLink>
        </Container>
      </section>

      <FAQSection items={serviceFaqs} title="Service questions" />
      <CTASection />
    </>
  );
}

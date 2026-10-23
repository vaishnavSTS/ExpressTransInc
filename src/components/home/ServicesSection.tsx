import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import { quoteHref } from '../../data/navigation';
import { services, type Service } from '../../data/services';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { SectionHeading } from '../ui/SectionHeading';
import { serviceIcons } from '../ui/serviceIcons';

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.id];
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-line transition-shadow hover:shadow-lg">
      <div className="relative">
        <ResponsiveImage
          image={service.image}
          sizes="(min-width: 768px) 33vw, 100vw"
          decorative
          className="aspect-[16/10] w-full object-cover"
        />
        <span className="absolute -bottom-6 left-6 flex size-12 items-center justify-center rounded-md bg-accent text-navy-950 shadow-md">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-10 pb-6">
        <h3 className="text-2xl">{service.name}</h3>
        <p className="mt-3 flex-1 text-muted">{service.summary}</p>
        <Link
          to={`/services#${service.id}`}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-900 underline-offset-4 hover:text-accent-ink hover:underline"
        >
          Learn more<span className="sr-only"> about {service.name}</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-surface py-20 sm:py-28" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="What we haul"
          title="Freight transportation services"
          intro="Our FMCSA carrier record lists two cargo categories. Here is what each one covers."
          align="center"
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
          <article className="flex flex-col justify-between rounded-lg bg-navy-900 p-8 text-white">
            <div>
              <span className="flex size-12 items-center justify-center rounded-md bg-white/10 text-accent">
                <MessageSquareText className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl text-white">Not sure your load fits?</h3>
              <p className="mt-3 text-slate-200">
                Send us the details anyway. We will review your shipment and let you know plainly whether we can
                handle it.
              </p>
            </div>
            <ButtonLink to={quoteHref} className="mt-8 self-start">
              Ask about your shipment
            </ButtonLink>
          </article>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight, Phone } from 'lucide-react';
import { company, telHref } from '../../data/company';
import { images } from '../../data/images';
import { quoteHref } from '../../data/navigation';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { ResponsiveImage } from '../ui/ResponsiveImage';

interface CTASectionProps {
  title?: string;
  body?: string;
}

export function CTASection({
  title = 'Have freight that needs to move?',
  body = 'Send us your shipment details or give us a call to talk through your requirements.',
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 sm:py-24" aria-labelledby="cta-heading">
      <ResponsiveImage
        image={images.hero}
        sizes="100vw"
        decorative
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/70" aria-hidden="true" />
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 id="cta-heading" className="text-3xl text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-200">{body}</p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <ButtonLink to={quoteHref} size="lg">
            Request a Quote
            <ArrowRight className="size-5" aria-hidden="true" />
          </ButtonLink>
          <ButtonAnchor href={telHref} variant="outline-light" size="lg">
            <Phone className="size-5" aria-hidden="true" />
            {company.phoneDisplay}
          </ButtonAnchor>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight, Phone } from 'lucide-react';
import { company, telHref } from '../../data/company';
import { images } from '../../data/images';
import { quoteHref } from '../../data/navigation';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { ResponsiveImage } from '../ui/ResponsiveImage';

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950" aria-labelledby="hero-heading">
      <ResponsiveImage
        image={images.hero}
        sizes="100vw"
        priority
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center]"
      />
      {/* Overlay keeps hero text at AA contrast regardless of the photo underneath. */}
      <div
        className="absolute inset-0 -z-10 bg-navy-950/80 lg:bg-transparent lg:bg-linear-to-r lg:from-navy-950/95 lg:via-navy-950/80 lg:to-navy-950/20"
        aria-hidden="true"
      />
      <Container className="pt-20 pb-32 sm:pt-28 sm:pb-40 lg:pt-36 lg:pb-48">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent!">
            Interstate motor carrier · {company.address.city}, {company.address.regionName}
          </p>
          <h1 id="hero-heading" className="mt-4 text-4xl text-white sm:text-5xl lg:text-6xl">
            General Freight &amp; Intermodal Container Transportation
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-200 sm:text-xl">
            {company.displayName} is a for-hire trucking company registered with FMCSA. Tell us what you need to move
            and we will talk through the details with you directly.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink to={quoteHref} size="lg">
              Request a Quote
              <ArrowRight className="size-5" aria-hidden="true" />
            </ButtonLink>
            <ButtonAnchor href={telHref} variant="outline-light" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              Call {company.phoneDisplay}
            </ButtonAnchor>
          </div>
        </div>
      </Container>
    </section>
  );
}

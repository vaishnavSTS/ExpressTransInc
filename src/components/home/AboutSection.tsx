import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { company } from '../../data/company';
import { images } from '../../data/images';
import { Container } from '../ui/Container';
import { ResponsiveImage } from '../ui/ResponsiveImage';

export function AboutSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="about-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="absolute -bottom-4 -left-4 h-2/3 w-2/3 rounded-lg bg-accent/20" aria-hidden="true" />
          <ResponsiveImage
            image={images.openRoad}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-lg"
          />
        </div>
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 id="about-heading" className="mt-3 text-3xl sm:text-4xl">
            A {company.address.city}-based carrier for general freight and container moves
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted">
            <p>
              {company.displayName} delivers dependable local and interstate freight solutions built on safety,
              precision and compliance. With a dedicated fleet of modern power units, we specialize in drop-and-hook
              trailer services that keep supply chains moving without costly dock delays.
            </p>
            <p>
              We keep the process straightforward: you share your shipment details, we review them, and we talk
              through the requirements with you before anything is scheduled.
            </p>
          </div>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-lg font-semibold text-navy-900 underline-offset-4 hover:text-accent-ink hover:underline"
          >
            More about {company.displayName}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

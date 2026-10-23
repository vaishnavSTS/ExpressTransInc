import { BadgeCheck, ClipboardList, Handshake, MessagesSquare, type LucideIcon } from 'lucide-react';
import { company } from '../../data/company';
import { images } from '../../data/images';
import { Container } from '../ui/Container';
import { ResponsiveImage } from '../ui/ResponsiveImage';
import { SectionHeading } from '../ui/SectionHeading';

interface Benefit {
  icon: LucideIcon;
  title: string;
  body: string;
}

// OWNER REVIEW: these describe how the company works with shippers. They are written as
// an approach, not as guarantees; confirm they reflect actual practice before launch.
const benefits: Benefit[] = [
  {
    icon: MessagesSquare,
    title: 'Direct communication',
    body: 'You deal with our team directly, from the first conversation about your freight through coordinating pickup and delivery.',
  },
  {
    icon: BadgeCheck,
    title: 'Registration you can verify',
    body: `Our USDOT (${company.usdotNumber}) and docket (${company.mcNumber}) numbers are public. Check our current FMCSA record before you tender a load.`,
  },
  {
    icon: ClipboardList,
    title: 'Details settled up front',
    body: 'We ask about your freight, timing and site requirements before a load is scheduled, so both sides know what to expect.',
  },
  {
    icon: Handshake,
    title: 'Straight answers',
    body: 'If a shipment is not a good fit for us, we say so rather than over-promise.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-navy-900 py-20 text-white sm:py-28" aria-labelledby="why-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading
            id="why-heading"
            eyebrow={`Why ${company.displayName}`}
            title="Clear communication and attention to your shipment's requirements"
            inverted
          />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className="flex size-11 items-center justify-center rounded-md bg-accent text-navy-950">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl text-white">{title}</h3>
                <p className="mt-2 text-slate-300">{body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <ResponsiveImage
            image={images.nightHighway}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}

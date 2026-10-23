import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    title: 'Share your shipment details',
    body: 'Send the quote request form or call us with your pickup and delivery locations, freight description and timing.',
  },
  {
    title: 'We review the requirements',
    body: 'We look over your request and contact you if we need more information about the freight, equipment or sites.',
  },
  {
    title: 'Get our response',
    body: 'We follow up with you about whether we can take the shipment, along with pricing and availability.',
  },
  {
    title: 'Coordinate the move',
    body: 'Once you decide to go ahead, we confirm pickup, delivery and any paperwork needed for the load.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="process-heading">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="From inquiry to pickup"
          intro="There is no online booking or instant pricing — every request is reviewed by a person."
          align="center"
        />
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-lg border border-line bg-white p-6 pt-8">
              <span
                className="absolute -top-5 left-6 flex size-10 items-center justify-center rounded-full bg-navy-900 text-lg font-bold text-white ring-4 ring-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-xl">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

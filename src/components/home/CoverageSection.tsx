import { company } from '../../data/company';
import { quoteHref } from '../../data/navigation';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';

/**
 * Service area is not confirmed, so this section states only the registered base and
 * interstate registration — no map, city list or "nationwide" claim.
 */
export function CoverageSection() {
  const facts = [
    { term: 'Home base', detail: `${company.address.city}, Stanislaus County, ${company.address.regionName}` },
    { term: 'Carrier operation', detail: `${company.carrierOperation} (registered with FMCSA)` },
    { term: 'Lanes', detail: 'Confirmed for each shipment based on origin, destination and timing' },
  ];

  return (
    <section className="bg-surface py-20 sm:py-24" aria-labelledby="coverage-heading">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Service area</p>
          <h2 id="coverage-heading" className="mt-3 text-3xl sm:text-4xl">
            Based in California&rsquo;s Central Valley
          </h2>
          <p className="mt-5 text-lg text-muted">
            Our home base is {company.address.city}, in Stanislaus County. We are registered for interstate operation
            and confirm each lane individually. Tell us where your freight starts and where it needs to go, and we will
            let you know whether we can serve it.
          </p>
          <ButtonLink to={quoteHref} variant="secondary" className="mt-8">
            Ask about your lane
          </ButtonLink>
        </div>
        <dl className="divide-y divide-line rounded-lg bg-white shadow-sm ring-1 ring-line">
          {facts.map((f) => (
            <div key={f.term} className="grid gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-semibold text-navy-900">{f.term}</dt>
              <dd className="text-muted">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

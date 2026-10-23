import { ExternalLink } from 'lucide-react';
import { CTASection } from '../components/home/CTASection';
import { PageHeader } from '../components/layout/PageHeader';
import { SEOHead } from '../components/seo/SEOHead';
import { Container } from '../components/ui/Container';
import { ResponsiveImage } from '../components/ui/ResponsiveImage';
import { SectionHeading } from '../components/ui/SectionHeading';
import { company, fmcsaRecordAsOf, formatAddressLine } from '../data/company';
import { images } from '../data/images';
import { routes } from '../data/routes';

const principles = [
  {
    title: 'Understand the freight first',
    body: 'Before we commit to a load, we want to know what it is, how it is packaged, where it is going and what the pickup and delivery sites require.',
  },
  {
    title: 'Keep communication direct',
    body: 'Shippers talk with us, the carrier, about their freight. Questions get answered by the people who coordinate the move.',
  },
  {
    title: 'Be clear about fit',
    body: 'Not every shipment is right for every carrier. If a load is outside what we handle, we tell you so you can plan accordingly.',
  },
];

export function AboutPage() {
  const record = [
    { term: 'Legal name', detail: company.legalName },
    { term: 'USDOT number', detail: company.usdotNumber },
    { term: 'MC number', detail: company.mcNumber },
    { term: 'Carrier operation', detail: company.carrierOperation },
    { term: 'Operation classification', detail: company.operationClassification },
    { term: 'Operating authority status', detail: company.authorityStatus },
    { term: 'Cargo classifications', detail: company.cargoClassifications.join(', ') },
    { term: 'Registered address', detail: formatAddressLine() },
    { term: 'Phone', detail: company.phoneDisplay },
  ];

  return (
    <>
      <SEOHead route={routes.about} />
      <PageHeader
        title={`About ${company.displayName}`}
        crumb="About"
        intro={`A for-hire interstate motor carrier based in ${company.address.city}, ${company.address.regionName}.`}
      />

      <section className="py-20 sm:py-24" aria-labelledby="overview-heading">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="overview-heading" eyebrow="Company overview" title="Who we are" />
            {/* Owner-supplied copy (Oct 2026), adjusted where it went beyond the FMCSA record:
                see docs/company-research.md §5. */}
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                At {company.displayName}, we deliver dependable local and interstate freight solutions built on a
                foundation of safety, precision and compliance. Operating a dedicated fleet of modern power units, we
                specialize in seamless drop-and-hook trailer services designed to keep supply chains moving without
                costly dock delays.
              </p>
              <p>
                Our commitment to operational excellence shows in our safety record. Our roadside vehicle and driver
                inspections over the past 24 months have resulted in zero out-of-service orders, well below the
                national averages published by FMCSA (as of {fmcsaRecordAsOf}). Whether managing standard dry freight
                or time-sensitive loads, we approach every haul with strict adherence to safety standards and total
                accountability.
              </p>
              <p>
                From local and regional runs to interstate lanes, {company.displayName} provides the agility of an
                independent carrier with the reliability and standards of an industry leader.
              </p>
            </div>
          </div>
          <ResponsiveImage
            image={images.intermodal}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-lg"
          />
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-24" aria-labelledby="approach-heading">
        <Container>
          <SectionHeading
            id="approach-heading"
            eyebrow="How we work"
            title="Our approach to service"
            intro="A few principles guide how we handle inquiries and shipments."
          />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="rounded-lg border-t-4 border-accent bg-white p-7 shadow-sm">
                <span className="text-sm font-bold tracking-widest text-accent-ink" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl">{p.title}</h3>
                <p className="mt-3 text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="record-heading">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading
              id="record-heading"
              eyebrow="Carrier record"
              title="Registration at a glance"
              intro={
                <p>
                  Details as shown on the FMCSA SAFER Company Snapshot, information current as of {fmcsaRecordAsOf}.
                  Registration and authority status can change, so always check the live record.
                </p>
              }
            />
            <a
              href={company.fmcsaSnapshotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-900 underline underline-offset-4 hover:text-accent-ink"
            >
              View our live FMCSA record
              <ExternalLink className="size-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <dl className="divide-y divide-line rounded-lg ring-1 ring-line">
            {record.map((r) => (
              <div key={r.term} className="grid gap-1 px-6 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-semibold text-navy-900">{r.term}</dt>
                <dd className="text-ink">{r.detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CTASection
        title="Talk with us about your freight"
        body="Share your shipment details and we will review them and follow up with you."
      />
    </>
  );
}

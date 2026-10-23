import { FileCheck2, MapPin, Route, ShieldCheck, type LucideIcon } from 'lucide-react';
import { company } from '../../data/company';
import { Container } from '../ui/Container';

interface TrustItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

// Overlaps the hero (negative top margin); HeroSection's large bottom padding makes room for it.
// Registration facts only (verified on the FMCSA record) — no fleet or performance statistics.
const items: TrustItem[] = [
  { icon: ShieldCheck, value: `USDOT ${company.usdotNumber}`, label: 'Registered with FMCSA' },
  { icon: FileCheck2, value: company.mcNumber, label: 'Operating authority docket' },
  { icon: Route, value: company.carrierOperation, label: 'For-hire carrier operation' },
  { icon: MapPin, value: `${company.address.city}, ${company.address.region}`, label: 'Home base' },
];

export function TrustSection() {
  return (
    <section aria-label="Carrier registration" className="relative z-10 -mt-16 sm:-mt-20">
      <Container>
        <ul className="grid overflow-hidden rounded-lg bg-white shadow-xl shadow-navy-950/10 ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="flex items-center gap-4 border-line px-6 py-6 not-last:border-b sm:nth-[odd]:border-r lg:border-b-0 lg:not-last:border-r"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xl font-bold text-navy-900">{value}</span>
                <span className="block text-sm text-muted">{label}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-sm text-muted">
          Check our current registration and authority on the{' '}
          <a
            href={company.fmcsaSnapshotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-navy-900 underline underline-offset-2 hover:text-accent-ink"
          >
            FMCSA SAFER website<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Container>
    </section>
  );
}

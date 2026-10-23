import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { company, formatAddressLine, telHref } from '../../data/company';
import { mainNav, quoteHref } from '../../data/navigation';
import { services } from '../../data/services';
import { Container } from '../ui/Container';
import { Wordmark } from './Wordmark';

const linkClass = 'text-slate-300 hover:text-white hover:underline underline-offset-4';

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <Wordmark inverted />
          <p className="mt-5 max-w-xs">
            For-hire interstate motor carrier based in {company.address.city}, {company.address.regionName}.
          </p>
          <dl className="mt-5 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-semibold text-white">USDOT</dt>
              <dd>{company.usdotNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-white">MC</dt>
              <dd>{company.mcNumber.replace('MC-', '')}</dd>
            </div>
          </dl>
        </div>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="text-base font-semibold tracking-wide text-white uppercase">
            Company
          </h2>
          <ul className="mt-4 space-y-2">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={quoteHref} className={linkClass}>
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="text-base font-semibold tracking-wide text-white uppercase">
            Services
          </h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-semibold tracking-wide text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={telHref} className="flex items-start gap-3 font-semibold text-white hover:text-accent">
                <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <address className="not-italic">{formatAddressLine()}</address>
            </li>
            <li>
              <a
                href={company.fmcsaSnapshotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${linkClass}`}
              >
                FMCSA carrier snapshot
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {company.legalName}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <span className="text-slate-400">Photos: Unsplash stock images, for illustration only.</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}

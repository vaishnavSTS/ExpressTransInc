import { Phone } from 'lucide-react';
import { NavLink } from 'react-router';
import { company, telHref } from '../../data/company';
import { mainNav, quoteHref } from '../../data/navigation';
import { ButtonLink } from '../ui/Button';

interface MobileNavigationProps {
  id: string;
  open: boolean;
  onNavigate: () => void;
}

/** Disclosure panel shown below the header on small screens. */
export function MobileNavigation({ id, open, onNavigate }: MobileNavigationProps) {
  return (
    <div id={id} hidden={!open} className="border-t border-line bg-white lg:hidden">
      <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6">
        <ul className="divide-y divide-line">
          {mainNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex min-h-12 items-center text-lg font-semibold ${
                    isActive ? 'text-accent-ink' : 'text-navy-900 hover:text-accent-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ButtonLink to={quoteHref} onClick={onNavigate} size="lg">
            Request a Quote
          </ButtonLink>
          <a
            href={telHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-navy-900 px-6 py-3 text-lg font-semibold text-navy-900"
          >
            <Phone className="size-5" aria-hidden="true" />
            {company.phoneDisplay}
          </a>
        </div>
      </nav>
    </div>
  );
}

import { MapPin, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import { company, telHref } from '../../data/company';
import { mainNav, quoteHref } from '../../data/navigation';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { MobileNavigation } from './MobileNavigation';
import { Wordmark } from './Wordmark';

const MENU_ID = 'mobile-menu';

function TopBar() {
  return (
    <div className="bg-navy-950 text-sm text-slate-200">
      <Container className="flex min-h-10 items-center justify-between gap-4">
        <p className="flex items-center gap-2">
          <MapPin className="size-4 text-accent" aria-hidden="true" />
          <span>
            {company.address.city}, {company.address.regionName}
          </span>
        </p>
        <div className="flex items-center gap-6">
          <p className="hidden items-center gap-2 md:flex">
            <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
            <span>
              USDOT {company.usdotNumber} · {company.mcNumber}
            </span>
          </p>
          <a href={telHref} className="flex items-center gap-2 font-semibold text-white hover:text-accent">
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span>{company.phoneDisplay}</span>
          </a>
        </div>
      </Container>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Close the panel if the viewport grows to the desktop layout.
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener('keydown', onKeyDown);
    mql.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mql.removeEventListener('change', onChange);
    };
  }, [open]);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative rounded-md px-4 py-2 text-[1.05rem] font-semibold transition-colors ${
                        isActive
                          ? 'text-navy-900 after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:bg-accent'
                          : 'text-slate-brand hover:text-navy-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapper controls visibility; the button's own classes set display:inline-flex. */}
            <div className="hidden sm:block">
              <ButtonLink to={quoteHref}>Request a Quote</ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md border border-line text-navy-900 hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </Container>
        <MobileNavigation id={MENU_ID} open={open} onNavigate={close} />
      </header>
    </>
  );
}

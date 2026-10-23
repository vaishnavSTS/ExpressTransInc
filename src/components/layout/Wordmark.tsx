import { Link } from 'react-router';

interface WordmarkProps {
  inverted?: boolean;
}

/**
 * Text-based wordmark. No official logo was found for XPRESS TRANS INC, so this is a
 * typographic treatment of the legal name only — replace with the authentic logo once
 * the owner supplies it.
 */
export function Wordmark({ inverted = false }: WordmarkProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex flex-col leading-none ${inverted ? 'text-white' : 'text-navy-900'}`}
      aria-label="XPRESS TRANS INC — home"
    >
      <span className="text-2xl font-bold tracking-tight whitespace-nowrap sm:text-[1.65rem]">
        XPRESS<span className="text-accent"> </span>TRANS
      </span>
      <span className="mt-1 flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.32em] uppercase">
        <span className="h-0.5 w-6 bg-accent" aria-hidden="true" />
        <span className={inverted ? 'text-slate-300' : 'text-muted'}>Inc</span>
      </span>
    </Link>
  );
}

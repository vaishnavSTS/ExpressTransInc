import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: 'left' | 'center';
  /** Use on dark backgrounds. */
  inverted?: boolean;
  as?: 'h1' | 'h2';
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = 'left',
  inverted = false,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${inverted ? 'text-accent!' : ''}`}>{eyebrow}</p>}
      <Heading id={id} className={`text-3xl sm:text-4xl ${inverted ? 'text-white' : ''}`}>
        {title}
      </Heading>
      {intro && (
        <div className={`mt-4 text-lg ${inverted ? 'text-slate-200' : 'text-muted'}`}>{intro}</div>
      )}
    </div>
  );
}

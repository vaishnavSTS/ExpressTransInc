import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Container } from '../ui/Container';

interface PageHeaderProps {
  title: string;
  /** Breadcrumb label for the current page. */
  crumb: string;
  intro?: ReactNode;
}

export function PageHeader({ title, crumb, intro }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
      <div
        className="absolute inset-y-0 right-0 hidden w-1/3 bg-[repeating-linear-gradient(135deg,transparent_0_22px,rgba(242,140,40,0.08)_22px_24px)] lg:block"
        aria-hidden="true"
      />
      <Container className="relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-slate-300">
            <li>
              <Link to="/" className="hover:text-white hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-semibold text-accent">
              {crumb}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 max-w-3xl text-4xl text-white sm:text-5xl">{title}</h1>
        {intro && <div className="mt-5 max-w-2xl text-lg text-slate-200">{intro}</div>}
      </Container>
    </section>
  );
}

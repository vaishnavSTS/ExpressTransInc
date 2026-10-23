import { Home, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { SEOHead } from '../components/seo/SEOHead';
import { ButtonAnchor, ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { company, telHref } from '../data/company';
import { mainNav } from '../data/navigation';
import { routes } from '../data/routes';

export function NotFoundPage() {
  return (
    <>
      <SEOHead route={routes.notFound} />
      <section className="py-24 sm:py-32">
        <Container className="max-w-3xl text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">We couldn&rsquo;t find that page</h1>
          <p className="mt-5 text-lg text-muted">
            The page may have moved, or the address may be mistyped. Try one of these links instead.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink to="/" size="lg">
              <Home className="size-5" aria-hidden="true" />
              Back to home
            </ButtonLink>
            <ButtonAnchor href={telHref} variant="ghost-dark" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              {company.phoneDisplay}
            </ButtonAnchor>
          </div>
          <nav aria-label="Site pages" className="mt-12">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="font-semibold text-navy-900 underline underline-offset-4 hover:text-accent-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}

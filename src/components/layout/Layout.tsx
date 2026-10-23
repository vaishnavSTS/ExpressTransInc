import { type RefObject, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';

/** Scrolls to the top (or to the #hash target) and moves focus to <main> on navigation. */
function useRouteChangeEffects(mainRef: RefObject<HTMLElement | null>) {
  const { pathname, hash } = useLocation();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const current = pathname + hash;
    if (previous.current === current) return; // StrictMode re-run or no change
    const isInitialLoad = previous.current === null;
    previous.current = current;

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (isInitialLoad) {
      target?.scrollIntoView();
      return;
    }
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
    }
  }, [pathname, hash, mainRef]);
}

export function Layout() {
  const mainRef = useRef<HTMLElement>(null);
  useRouteChangeEffects(mainRef);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-semibold text-navy-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

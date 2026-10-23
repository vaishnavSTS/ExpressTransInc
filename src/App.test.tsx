import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { App } from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('routing', () => {
  it.each([
    ['/', /general freight & intermodal container transportation/i],
    ['/about', /about xpress trans inc/i],
    ['/services', /general freight & intermodal container trucking/i],
    ['/contact', /contact us & request a quote/i],
    ['/privacy-policy', /privacy policy/i],
    ['/no-such-page', /couldn.t find that page/i],
  ])('renders %s with a single matching h1', (path, heading) => {
    renderAt(path);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(heading);
  });

  it('sets a unique document title per page', () => {
    const titles = new Set<string>();
    for (const path of ['/', '/about', '/services', '/contact', '/privacy-policy']) {
      const { unmount } = renderAt(path);
      titles.add(document.title);
      unmount();
    }
    expect(titles.size).toBe(5);
  });

  it('marks pages noindex when no production URL is configured', () => {
    renderAt('/');
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('links the phone number with tel:', () => {
    renderAt('/contact');
    const links = screen.getAllByRole('link', { name: /\(209\) 622-1223/ });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute('href', 'tel:+12096221223'));
  });

  it('navigates via the main menu', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    await user.click(within(nav).getByRole('link', { name: 'Services' }));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/trucking/i);
  });
});

describe('mobile menu', () => {
  it('toggles with the button, closes on Escape and returns focus', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('mobile-menu')).not.toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName(/close menu/i);
    const menu = screen.getByRole('navigation', { name: 'Mobile' });
    expect(menu).toBeVisible();

    await user.click(within(menu).getByRole('link', { name: 'About' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveFocus();
  });
});

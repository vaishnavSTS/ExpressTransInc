export interface NavItem {
  label: string;
  to: string;
}

export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export const quoteHref = '/contact#quote';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';

type Variant = 'primary' | 'secondary' | 'outline-light' | 'ghost-dark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 min-h-11';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-navy-950 hover:bg-accent-600',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800',
  'outline-light': 'border-2 border-white/80 text-white hover:bg-white hover:text-navy-900',
  'ghost-dark': 'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
};

const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${className}`;

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = StyleProps & { to: string } & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className'>;

/** Internal navigation styled as a button. */
export function ButtonLink({ variant, size, className, children, to, ...rest }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonAnchorProps = StyleProps & Omit<ComponentPropsWithoutRef<'a'>, 'className'>;

/** External or protocol links (tel:, https:) styled as a button. */
export function ButtonAnchor({ variant, size, className, children, ...rest }: ButtonAnchorProps) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

import type { ReactNode } from 'react';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | undefined;
  className?: string;
  children: ReactNode;
}

/** Label + hint + error message wrapper shared by all quote form controls. */
export function FieldShell({ id, label, required = false, hint, error, className = '', children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-sm font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

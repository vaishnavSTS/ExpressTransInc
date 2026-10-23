const controlBase =
  'mt-2 block min-h-12 w-full rounded-md border bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-slate-400 focus:border-navy-900 focus:ring-2 focus:ring-accent focus:outline-none';

export const controlClass = (invalid: boolean) =>
  `${controlBase} ${invalid ? 'border-red-700 ring-1 ring-red-700' : 'border-slate-300'}`;

export const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined;

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import type { SubmissionResult } from '../../types/quote';
import { QuoteRequestForm, type QuoteRequestFormProps } from './QuoteRequestForm';

const renderForm = (props: QuoteRequestFormProps = {}) =>
  render(
    <MemoryRouter>
      <QuoteRequestForm {...props} />
    </MemoryRouter>,
  );

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), 'Jordan Lee');
  await user.type(screen.getByLabelText(/business email/i), 'jordan@example.com');
  await user.type(screen.getByLabelText(/phone number/i), '209-555-0100');
  await user.type(screen.getByLabelText(/pickup city/i), 'Modesto, CA');
  await user.type(screen.getByLabelText(/delivery city/i), 'Reno, NV');
  await user.selectOptions(screen.getByLabelText(/service needed/i), 'general-freight');
  await user.type(screen.getByLabelText(/freight description/i), '10 pallets of boxed goods');
  await user.click(screen.getByRole('checkbox', { name: /privacy policy/i }));
}

describe('QuoteRequestForm', () => {
  it('shows accessible errors and does not submit an empty form', async () => {
    const user = userEvent.setup();
    const submit = vi.fn<NonNullable<QuoteRequestFormProps['submit']>>();
    renderForm({ submit, endpointConfigured: true });

    await user.click(screen.getByRole('button', { name: /send quote request/i }));

    expect(submit).not.toHaveBeenCalled();
    const summary = await screen.findByRole('alert');
    expect(summary).toHaveTextContent(/please fix these 8 problems/i);
    const name = screen.getByLabelText(/full name/i);
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Enter your full name.');
  });

  it('validates email format on blur', async () => {
    const user = userEvent.setup();
    renderForm({ endpointConfigured: true });
    const email = screen.getByLabelText(/business email/i);
    await user.type(email, 'not-an-email');
    await user.tab();
    expect(email).toHaveAccessibleDescription(/valid email address/i);
  });

  it('clearly marks the form as not live and never shows success when unconfigured', async () => {
    const user = userEvent.setup();
    renderForm({ endpointConfigured: false, submit: async () => ({ status: 'not-configured' }) });

    expect(screen.getByText(/online form not yet active/i)).toBeInTheDocument();
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send quote request/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/your request was not sent/i);
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
    // Entered details are kept so nothing is lost.
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jordan Lee');
  });

  it('shows a loading state, prevents duplicate submissions, then confirms success', async () => {
    const user = userEvent.setup();
    let resolve!: (r: SubmissionResult) => void;
    const submit = vi.fn(() => new Promise<SubmissionResult>((r) => (resolve = r)));
    renderForm({ submit, endpointConfigured: true });

    await fillValidForm(user);
    const button = screen.getByRole('button', { name: /send quote request/i });
    await user.click(button);
    await user.click(button);

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    expect(submit).toHaveBeenCalledTimes(1);

    resolve({ status: 'success' });
    expect(await screen.findByRole('status')).toHaveTextContent(/your request was sent/i);
  });

  it('shows the failure message from the server and keeps the data', async () => {
    const user = userEvent.setup();
    const submit = vi.fn(async (): Promise<SubmissionResult> => ({ status: 'error', message: 'Server said no (error 500).' }));
    renderForm({ submit, endpointConfigured: true });

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send quote request/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/not sent/i);
    expect(alert).toHaveTextContent(/error 500/);
    await waitFor(() => expect(screen.getByRole('button', { name: /send quote request/i })).toBeEnabled());
    expect(screen.getByLabelText(/pickup city/i)).toHaveValue('Modesto, CA');
  });

  it('does not write form data to localStorage', async () => {
    const user = userEvent.setup();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    renderForm({ endpointConfigured: true, submit: async () => ({ status: 'success' }) });
    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: /send quote request/i }));
    await screen.findByRole('status');
    expect(setItem).not.toHaveBeenCalled();
    setItem.mockRestore();
  });
});

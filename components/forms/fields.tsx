'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Form field primitives.
 *
 * Every field has a real `<label>` bound by id, and every error message is
 * connected to its input through `aria-describedby` with `aria-invalid` set, so
 * a screen reader announces the problem when focus reaches the field.
 */

const CONTROL =
  'w-full rounded-[3px] border bg-white px-3.5 py-3 text-base text-ink ' +
  'placeholder:text-muted/70 min-h-11';

function controlClasses(invalid: boolean, extra?: string) {
  return cn(
    CONTROL,
    invalid ? 'border-[--color-danger] bg-[#fdf6f6]' : 'border-line hover:border-forest/40',
    extra,
  );
}

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

function Wrapper({
  label,
  id,
  error,
  errorId,
  hint,
  hintId,
  required,
  className,
  children,
}: {
  id: string;
  errorId: string;
  hintId: string;
  children: React.ReactNode;
} & BaseProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-heading text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-[--color-danger]" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="mb-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-[--color-danger]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  type = 'text',
  autoComplete,
  ...props
}: BaseProps & {
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(props.error);

  return (
    <Wrapper {...props} id={id} errorId={errorId} hintId={hintId}>
      <input
        id={id}
        name={props.name}
        type={type}
        autoComplete={autoComplete}
        required={props.required}
        aria-invalid={invalid || undefined}
        aria-describedby={
          [props.error ? errorId : null, props.hint ? hintId : null].filter(Boolean).join(' ') ||
          undefined
        }
        className={controlClasses(invalid)}
      />
    </Wrapper>
  );
}

export function SelectField({
  options,
  placeholder = 'Please select',
  onValueChange,
  ...props
}: BaseProps & {
  options: readonly string[];
  placeholder?: string;
  /** Notifies the parent when the selection changes, for dependent fields. */
  onValueChange?: (value: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(props.error);

  return (
    <Wrapper {...props} id={id} errorId={errorId} hintId={hintId}>
      <select
        id={id}
        name={props.name}
        required={props.required}
        defaultValue=""
        onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={
          [props.error ? errorId : null, props.hint ? hintId : null].filter(Boolean).join(' ') ||
          undefined
        }
        className={controlClasses(invalid, 'appearance-none bg-[right_0.9rem_center] bg-no-repeat pr-10')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%234E5C56' d='M6 8 0 2l1.4-1.4L6 5.2 10.6.6 12 2z'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextArea({ rows = 5, ...props }: BaseProps & { rows?: number }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(props.error);

  return (
    <Wrapper {...props} id={id} errorId={errorId} hintId={hintId}>
      <textarea
        id={id}
        name={props.name}
        rows={rows}
        required={props.required}
        aria-invalid={invalid || undefined}
        aria-describedby={
          [props.error ? errorId : null, props.hint ? hintId : null].filter(Boolean).join(' ') ||
          undefined
        }
        className={controlClasses(invalid, 'resize-y')}
      />
    </Wrapper>
  );
}

export function ConsentField({
  name,
  error,
  children,
}: {
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="flex gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          value="true"
          required
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[--color-forest]"
        />
        <label htmlFor={id} className="text-sm text-ink-700">
          {children}
        </label>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-[--color-danger]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot. Hidden from sight and from assistive technology, and excluded from
 * the tab order, so no genuine visitor can fill it. Preferred over a CAPTCHA,
 * which costs every real visitor time and creates an accessibility barrier.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website-url">Leave this field empty</label>
      <input id="website-url" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Announces submission failure at the top of the form and takes focus. */
export function FormError({ message, id }: { message: string; id: string }) {
  return (
    <div
      id={id}
      role="alert"
      tabIndex={-1}
      className="rounded-[3px] border border-[--color-danger] bg-[#fdf6f6] p-4 text-sm text-[--color-danger]"
    >
      {message}
    </div>
  );
}

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leadingIcon, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium font-body text-midnight"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leadingIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              "h-11 w-full rounded-sm bg-white border border-stone px-3",
              "text-sm font-body text-midnight placeholder:text-fg-muted",
              "transition-all duration-200",
              "focus:outline-none focus:border-midnight focus:ring-2 focus:ring-bloom focus:ring-offset-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leadingIcon ? "pl-9" : "",
              error ? "border-red-400 focus:ring-red-200" : "",
              className,
            ].join(" ")}
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="text-xs text-fg-muted font-body">{hint}</p>
        )}
        {error && <p className="text-xs text-red-500 font-body">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

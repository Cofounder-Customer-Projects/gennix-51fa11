import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-midnight text-white hover:opacity-90 hover:-translate-y-px shadow-sm hover:shadow-md",
  secondary:
    "bg-energy text-midnight hover:opacity-90 hover:-translate-y-px shadow-sm hover:shadow-md",
  ghost:
    "bg-transparent border border-midnight border-[1.5px] text-midnight hover:bg-midnight/5",
  icon: "w-10 h-10 rounded-full bg-midnight text-white flex items-center justify-center hover:opacity-90 hover:-translate-y-px shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-body font-medium rounded-md transition-all duration-200 ease-standard select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bloom focus-visible:ring-offset-2";

    const isIcon = variant === "icon";
    const sizeClass = isIcon ? "" : sizeClasses[size];

    return (
      <button
        ref={ref}
        className={`${base} ${variantClasses[variant]} ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

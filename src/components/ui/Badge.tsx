type BadgeVariant = "top-pick" | "validated" | "high-demand" | "neutral";

const badgeConfig: Record<
  BadgeVariant,
  { bg: string; text: string; icon: string }
> = {
  "top-pick": {
    bg: "bg-energy/10",
    text: "text-energy",
    icon: "⚡",
  },
  validated: {
    bg: "bg-mint/10",
    text: "text-mint",
    icon: "✓",
  },
  "high-demand": {
    bg: "bg-bloom/10",
    text: "text-bloom",
    icon: "↑",
  },
  neutral: {
    bg: "bg-stone/40",
    text: "text-midnight",
    icon: "",
  },
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

export function Badge({
  variant = "neutral",
  children,
  showIcon = true,
  className = "",
}: BadgeProps) {
  const { bg, text, icon } = badgeConfig[variant];

  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill",
        "text-xs font-mono tracking-wide font-medium",
        bg,
        text,
        className,
      ].join(" ")}
    >
      {showIcon && icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

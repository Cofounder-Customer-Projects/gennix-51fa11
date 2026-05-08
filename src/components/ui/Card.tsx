interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-stone shadow-md
        ${hover ? "transition-all duration-200 hover:shadow-lg hover:border-midnight/20 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface DashboardTileProps {
  label: string;
  value: string;
  sub?: string;
  accent?: "mint" | "bloom" | "energy";
  className?: string;
}

export function DashboardTile({
  label,
  value,
  sub,
  accent = "mint",
  className = "",
}: DashboardTileProps) {
  const accentColor = {
    mint: "text-mint",
    bloom: "text-bloom",
    energy: "text-energy",
  }[accent];

  return (
    <Card className={`p-5 ${className}`}>
      <p className="font-mono text-xs uppercase tracking-widest text-fg-muted mb-2">
        {label}
      </p>
      <p className={`font-display text-3xl font-black text-midnight leading-none`}>
        {value}
        {sub && (
          <span className={`font-mono text-sm font-normal ml-1 ${accentColor}`}>
            {sub}
          </span>
        )}
      </p>
    </Card>
  );
}

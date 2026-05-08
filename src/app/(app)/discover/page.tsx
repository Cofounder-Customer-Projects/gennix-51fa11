import { Search, TrendingUp, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const FEATURED_NICHES = [
  {
    id: "fat-loss-women",
    title: "Fat Loss for Busy Women",
    score: 92,
    priceRange: "$19–$39",
    demand: "Very High",
    demandVariant: "high-demand" as const,
    tags: ["Fat Loss", "Home Workouts"],
    badge: "top-pick" as const,
    blueprints: 3,
  },
  {
    id: "home-strength",
    title: "Home Strength Training",
    score: 84,
    priceRange: "$14–$29",
    demand: "High",
    demandVariant: "validated" as const,
    tags: ["Strength", "No Equipment"],
    badge: "validated" as const,
    blueprints: 1,
  },
  {
    id: "postpartum-fitness",
    title: "Postpartum Fitness Recovery",
    score: 78,
    priceRange: "$24–$49",
    demand: "Rising",
    demandVariant: "high-demand" as const,
    tags: ["Recovery", "Women"],
    badge: "high-demand" as const,
    blueprints: 0,
  },
  {
    id: "senior-mobility",
    title: "Senior Mobility & Flexibility",
    score: 71,
    priceRange: "$14–$24",
    demand: "Steady",
    demandVariant: "neutral" as const,
    tags: ["Mobility", "Seniors"],
    badge: "neutral" as const,
    blueprints: 0,
  },
];

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 85
      ? "text-mint"
      : score >= 70
        ? "text-energy"
        : "text-fg-muted";

  return (
    <div className="flex flex-col items-end">
      <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-0.5">
        WINNING SCORE
      </p>
      <p className={`font-display font-black text-3xl leading-none ${color}`}>
        {score}
        <span className="text-base font-mono text-fg-muted">/100</span>
      </p>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-fg-muted mb-2">
            01 DISCOVER
          </p>
          <h1 className="font-display font-black text-4xl text-midnight leading-tight">
            Pick a niche you can dominate.
          </h1>
          <p className="mt-2 text-fg-muted font-body text-base max-w-lg">
            Each niche is scored by demand, competition, and your sellable
            price range. Start where the score is highest.
          </p>
        </div>
        <Link
          href="/create"
          className="flex-shrink-0 inline-flex items-center gap-2 h-11 px-5 bg-midnight text-white text-sm font-medium rounded-md hover:opacity-90 hover:-translate-y-px shadow-sm hover:shadow-md transition-all"
        >
          Create blueprint
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted"
          size={15}
        />
        <input
          type="search"
          placeholder="Search niches, topics, or blueprints."
          className="h-11 w-full pl-9 pr-4 bg-white border border-stone rounded-sm text-sm font-body text-midnight placeholder:text-fg-muted focus:outline-none focus:border-midnight focus:ring-2 focus:ring-bloom transition-all"
        />
      </div>

      {/* Niche grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {FEATURED_NICHES.map((niche) => (
          <NicheCard key={niche.id} niche={niche} />
        ))}
      </div>

      {/* Empty state hint */}
      <div className="text-center py-6">
        <p className="text-sm text-fg-muted font-body">
          Don&apos;t see your niche?{" "}
          <Link href="/create" className="text-midnight underline underline-offset-2 hover:text-energy transition-colors">
            Describe it and Gennix will score it.
          </Link>
        </p>
      </div>
    </div>
  );
}

function NicheCard({
  niche,
}: {
  niche: (typeof FEATURED_NICHES)[number];
}) {
  return (
    <Link
      href={`/create?niche=${niche.id}`}
      className="group block bg-white border border-stone rounded-lg p-5 shadow-sm hover:shadow-md hover:border-midnight/20 transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-body font-semibold text-midnight text-base leading-snug group-hover:text-energy transition-colors">
            {niche.title}
          </h2>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {niche.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 bg-surface-muted border border-stone text-xs font-body text-midnight rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ScoreRing score={niche.score} />
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-4 py-3 border-t border-stone/50 mt-1">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted">
            EST. PRICE
          </p>
          <p className="font-mono font-medium text-sm text-midnight">
            {niche.priceRange}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted">
            DEMAND
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <TrendingUp size={12} className="text-energy" />
            <p className="font-mono font-medium text-sm text-midnight">
              {niche.demand}
            </p>
          </div>
        </div>
        <div className="ml-auto">
          {niche.badge !== "neutral" ? (
            <Badge variant={niche.badge}>
              {niche.badge === "top-pick"
                ? "Top Pick"
                : niche.badge === "validated"
                  ? "Validated"
                  : "High Demand"}
            </Badge>
          ) : null}
        </div>
      </div>

      {/* Blueprint count */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-fg-muted font-body">
          {niche.blueprints === 0
            ? "No blueprints yet"
            : `${niche.blueprints} blueprint${niche.blueprints > 1 ? "s" : ""}`}
        </p>
        <span className="flex items-center gap-1 text-xs text-midnight font-medium">
          {niche.blueprints > 0 ? (
            <>
              <CheckCircle2 size={12} className="text-mint" />
              Ready to sell
            </>
          ) : (
            <>
              <Zap size={12} className="text-energy" />
              Create now
            </>
          )}
        </span>
      </div>
    </Link>
  );
}

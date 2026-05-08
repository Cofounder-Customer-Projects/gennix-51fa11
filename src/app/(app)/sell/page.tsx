import {
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
} from "lucide-react";
import Link from "next/link";

const CHANNELS = [
  {
    id: "gumroad",
    name: "Gumroad",
    description: "Fastest to start selling. No storefront needed.",
    status: "available",
    actionLabel: "Create listing",
    recommended: true,
  },
  {
    id: "etsy",
    name: "Etsy",
    description: "Built-in audience for fitness and wellness PDFs.",
    status: "available",
    actionLabel: "List on Etsy",
    recommended: false,
  },
  {
    id: "payhip",
    name: "Payhip",
    description: "Simple checkout with email delivery built in.",
    status: "available",
    actionLabel: "Add to Payhip",
    recommended: false,
  },
];

const CHECKLIST = [
  { label: "Blueprint generated", done: true },
  { label: "Cover design", done: false },
  { label: "Price set", done: false },
  { label: "Payment method connected", done: false },
  { label: "Listing published", done: false },
];

export default function SellPage() {
  const doneCount = CHECKLIST.filter((c) => c.done).length;
  const progress = Math.round((doneCount / CHECKLIST.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-fg-muted mb-2">
          04 SELL
        </p>
        <h1 className="font-display font-black text-4xl text-midnight leading-tight">
          Start first sale.
        </h1>
        <p className="mt-2 text-fg-muted font-body text-base max-w-lg">
          Pick a channel, create your listing, and start collecting payments.
          Most creators get their first sale within 48 hours.
        </p>
      </div>

      {/* Two-column */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-start">
        {/* Channels */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-fg-muted">
            CHOOSE A CHANNEL
          </h2>
          {CHANNELS.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}

          {/* Listing tips */}
          <div className="bg-white border border-stone rounded-lg p-5 shadow-sm mt-2">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
              LISTING TIPS
            </h3>
            <ul className="space-y-2">
              {[
                "Use your niche title as the listing headline.",
                "Lead with the specific result: '7 lbs in 30 days'.",
                "Show the table of contents as social proof.",
                "Price between $19–$39 for new sellers.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-energy font-mono text-xs mt-0.5 flex-shrink-0">
                    →
                  </span>
                  <span className="text-sm font-body text-midnight">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Checklist sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-white border border-stone rounded-lg p-4 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
              FIRST SALE CHECKLIST
            </p>
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-2 bg-stone/40 rounded-pill overflow-hidden">
                <div
                  className="h-full gradient-accent rounded-pill transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-xs text-midnight">{progress}%</span>
            </div>

            <ul className="space-y-2.5">
              {CHECKLIST.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  {item.done ? (
                    <CheckCircle2 size={14} className="text-mint flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone flex-shrink-0" />
                  )}
                  <span
                    className={[
                      "text-sm font-body",
                      item.done ? "text-fg-muted line-through" : "text-midnight",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {doneCount === CHECKLIST.length && (
              <div className="mt-4 p-3 bg-mint/5 border border-mint/20 rounded-lg">
                <p className="text-sm text-midnight font-medium font-body">
                  You&apos;re ready to sell!
                </p>
                <p className="text-xs text-fg-muted font-body mt-0.5">
                  All checklist items complete.
                </p>
              </div>
            )}
          </div>

          {/* Share link placeholder */}
          <div className="bg-white border border-stone rounded-lg p-4 shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-2">
              YOUR LINK
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-fg-muted flex-1 truncate">
                gumroad.com/l/your-product
              </p>
              <button
                className="flex-shrink-0 p-1.5 hover:bg-stone/20 rounded transition-colors"
                aria-label="Copy link"
              >
                <Copy size={13} className="text-fg-muted" />
              </button>
            </div>
            <p className="text-xs text-fg-muted font-body mt-2">
              Connect your store to get a real link.
            </p>
          </div>

          {/* Auth gate notice */}
          <div className="flex items-start gap-2 p-3 bg-energy/5 border border-energy/20 rounded-lg">
            <AlertCircle size={14} className="text-energy flex-shrink-0 mt-0.5" />
            <p className="text-xs font-body text-midnight">
              Sign in required to publish listings. Auth is coming in the next
              sprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  channel,
}: {
  channel: (typeof CHANNELS)[number];
}) {
  return (
    <div
      className={[
        "bg-white border rounded-lg p-5 shadow-sm transition-all duration-200",
        channel.recommended
          ? "border-midnight/30 ring-1 ring-midnight/10"
          : "border-stone hover:shadow-md hover:border-midnight/20",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body font-semibold text-midnight text-sm">
              {channel.name}
            </h2>
            {channel.recommended && (
              <span className="inline-flex items-center px-1.5 py-0.5 bg-energy/10 text-energy text-[10px] font-mono rounded tracking-wide">
                Recommended
              </span>
            )}
          </div>
          <p className="text-xs text-fg-muted font-body">
            {channel.description}
          </p>
        </div>
        <Link
          href="/products"
          className="flex-shrink-0 inline-flex items-center gap-1.5 h-8 px-3 bg-midnight text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          {channel.actionLabel}
          <ExternalLink size={10} />
        </Link>
      </div>
    </div>
  );
}

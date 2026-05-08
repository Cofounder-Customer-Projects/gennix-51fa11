import { Package, Plus, FileText, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    title: "7-Day Fat Loss for Busy Women",
    niche: "Fat Loss",
    status: "ready",
    pages: 28,
    price: "$19",
    downloads: 0,
  },
  {
    id: "2",
    title: "Home Strength Training: 30-Day Plan",
    niche: "Strength",
    status: "draft",
    pages: 34,
    price: "$24",
    downloads: 0,
  },
];

function statusBadge(status: string) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-mint/10 text-mint text-[10px] font-mono rounded-pill tracking-wide">
        ✓ Ready to sell
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone/40 text-fg-muted text-[10px] font-mono rounded-pill tracking-wide">
      Draft
    </span>
  );
}

export default function ProductsPage() {
  const hasProducts = SAMPLE_PRODUCTS.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-fg-muted mb-2">
            03 PRODUCTS
          </p>
          <h1 className="font-display font-black text-4xl text-midnight leading-tight">
            Your blueprints.
          </h1>
          <p className="mt-2 text-fg-muted font-body text-base">
            Manage, edit, and publish your sellable PDF products.
          </p>
        </div>
        <Link
          href="/create"
          className="flex-shrink-0 inline-flex items-center gap-2 h-11 px-5 bg-midnight text-white text-sm font-medium rounded-md hover:opacity-90 hover:-translate-y-px shadow-sm hover:shadow-md transition-all"
        >
          <Plus size={14} />
          New blueprint
        </Link>
      </div>

      {hasProducts ? (
        <div className="space-y-3">
          {SAMPLE_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-stone rounded-lg p-5 shadow-sm hover:shadow-md hover:border-midnight/20 transition-all duration-200 flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-sand rounded-md flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-fg-muted" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-body font-semibold text-midnight text-sm truncate">
                    {product.title}
                  </h2>
                  {statusBadge(product.status)}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-fg-muted font-body">
                    {product.niche}
                  </span>
                  <span className="text-xs text-fg-muted">·</span>
                  <span className="text-xs font-mono text-fg-muted">
                    {product.pages} pages
                  </span>
                  <span className="text-xs text-fg-muted">·</span>
                  <span className="text-xs font-mono text-midnight font-medium">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {product.status === "ready" ? (
                  <Link
                    href="/sell"
                    className="inline-flex items-center gap-1.5 h-8 px-3 bg-midnight text-white text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag size={12} />
                    List to sell
                  </Link>
                ) : (
                  <Link
                    href={`/create?edit=${product.id}`}
                    className="inline-flex items-center h-8 px-3 border border-stone text-midnight text-xs font-medium rounded-md hover:bg-stone/20 transition-colors"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="bg-white border border-stone rounded-xl p-12 text-center shadow-sm">
          <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center mx-auto mb-4">
            <Package size={22} className="text-fg-muted" />
          </div>
          <h2 className="font-display font-bold text-xl text-midnight mb-2">
            No blueprints yet.
          </h2>
          <p className="text-sm text-fg-muted font-body max-w-sm mx-auto mb-6">
            Pick a niche and Gennix will draft your first one in under 10
            minutes.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 h-11 px-6 bg-midnight text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            Create first blueprint
          </Link>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Wand2,
  ChevronRight,
  Loader2,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const STEPS = [
  { id: 1, label: "Niche" },
  { id: 2, label: "Blueprint" },
  { id: 3, label: "Review" },
  { id: 4, label: "Sell" },
];

const SUGGESTED_NICHES = [
  "Fat Loss for Busy Women",
  "Home Strength Training",
  "Postpartum Fitness Recovery",
  "Beginner Running Plans",
  "Kettlebell for Beginners",
];

type Step = 1 | 2 | 3;

export default function CreatePage() {
  const [step, setStep] = useState<Step>(1);
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<BlueprintResult | null>(null);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/blueprint/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche: niche.trim(), audience: audience.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Generation failed");
      }
      const data = await res.json();
      setBlueprint(data);
      setStep(2);
    } catch (err) {
      console.error("Blueprint generation failed:", err);
      // Surface a visible error state without crashing the flow
      alert(
        err instanceof Error
          ? err.message
          : "Failed to generate blueprint. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] font-mono uppercase tracking-widest text-fg-muted mb-2">
          02 CREATE
        </p>
        <h1 className="font-display font-black text-4xl text-midnight leading-tight">
          Generate your blueprint.
        </h1>
        <p className="mt-2 text-fg-muted font-body text-base max-w-lg">
          Describe your niche and audience. Gennix drafts a sellable PDF
          blueprint in under 10 minutes.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator current={step} />

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6 items-start">
        {/* Main flow card */}
        <div className="bg-white border border-stone rounded-xl p-6 shadow-sm">
          {step === 1 && (
            <Step1
              niche={niche}
              setNiche={setNiche}
              audience={audience}
              setAudience={setAudience}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
            />
          )}
          {step === 2 && blueprint && (
            <Step2
              blueprint={blueprint}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3 onBack={() => setStep(2)} />
          )}
        </div>

        {/* Sidebar tiles */}
        <div className="space-y-4">
          <DashboardTile
            label="WINNING SCORE"
            value={blueprint ? "84" : "—"}
            sub="/100"
            highlight={!!blueprint}
          />
          <DashboardTile
            label="EST. PRICE RANGE"
            value={blueprint?.estimatedPrice ?? "—"}
            highlight={!!blueprint}
          />
          <DashboardTile
            label="DEMAND"
            value="Very High"
            icon="↑"
            highlight
          />
        </div>
      </div>
    </div>
  );
}

interface BlueprintResult {
  title: string;
  chapters: string[];
  estimatedPrice: string;
  pageCount: number;
}

function Step1({
  niche,
  setNiche,
  audience,
  setAudience,
  isGenerating,
  onGenerate,
}: {
  niche: string;
  setNiche: (v: string) => void;
  audience: string;
  setAudience: (v: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
          STEP 1 OF 4 — NICHE
        </p>
        <h2 className="font-display font-bold text-2xl text-midnight mb-1">
          What is your niche?
        </h2>
        <p className="text-sm text-fg-muted font-body">
          Be specific. The more focused, the better your blueprint sells.
        </p>
      </div>

      <Input
        label="Niche"
        placeholder="e.g. Fat Loss for Busy Moms"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />

      {/* Suggestions */}
      <div>
        <p className="text-xs text-fg-muted font-body mb-2">Try one of these:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_NICHES.map((s) => (
            <button
              key={s}
              onClick={() => setNiche(s)}
              className="text-xs px-2.5 py-1 bg-surface-muted border border-stone text-midnight rounded-sm hover:border-midnight transition-colors font-body"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Target audience"
        placeholder="e.g. Women 30–45 with limited gym time"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        hint="Who is this for? Be as specific as you can."
      />

      <Button
        onClick={onGenerate}
        disabled={!niche.trim() || isGenerating}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating blueprint...
          </>
        ) : (
          <>
            <Wand2 size={16} />
            Generate blueprint
            <ChevronRight size={14} />
          </>
        )}
      </Button>
    </div>
  );
}

function Step2({
  blueprint,
  onNext,
  onBack,
}: {
  blueprint: BlueprintResult;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
          STEP 2 OF 4 — BLUEPRINT
        </p>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-mint/10 rounded-md flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-mint" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-midnight leading-tight">
              {blueprint.title}
            </h2>
            <p className="text-sm text-fg-muted font-body mt-0.5">
              {blueprint.pageCount} pages · Est. {blueprint.estimatedPrice}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-stone rounded-lg p-4 bg-sand/40">
        <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
          CHAPTERS
        </p>
        <ol className="space-y-2">
          {blueprint.chapters.map((ch, i) => (
            <li key={i} className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-fg-muted flex-shrink-0 w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-body text-midnight">{ch}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1">
          <Sparkles size={14} />
          Looks good — continue
        </Button>
      </div>
    </div>
  );
}

function Step3({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-3">
          STEP 3 OF 4 — REVIEW
        </p>
        <h2 className="font-display font-bold text-2xl text-midnight mb-1">
          Review and save.
        </h2>
        <p className="text-sm text-fg-muted font-body">
          Sign in to save your blueprint and move to listing.
        </p>
      </div>

      <div className="p-4 bg-mint/5 border border-mint/20 rounded-lg">
        <p className="text-sm text-midnight font-body font-medium mb-1">
          Blueprint ready.
        </p>
        <p className="text-xs text-fg-muted font-body">
          Create a free account to save, edit, and sell this blueprint.
          Auth setup is coming in the next sprint.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button className="flex-1" disabled>
          Save blueprint (auth required)
        </Button>
      </div>
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const isActive = step.id === current;
        const isDone = step.id < current;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-1.5">
              <div
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-all",
                  isActive
                    ? "bg-energy text-white"
                    : isDone
                      ? "bg-bloom text-white"
                      : "bg-stone/50 text-fg-muted border border-stone",
                ].join(" ")}
              >
                {isDone ? "✓" : step.id}
              </div>
              <span
                className={[
                  "text-xs font-body hidden sm:block",
                  isActive ? "text-midnight font-medium" : "text-fg-muted",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-8 h-px bg-stone mx-2 hidden sm:block" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function DashboardTile({
  label,
  value,
  sub,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  icon?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white border border-stone rounded-lg p-4 shadow-sm">
      <p className="text-[10px] font-mono uppercase tracking-widest text-fg-muted mb-2">
        {label}
      </p>
      <p
        className={[
          "font-display font-black text-2xl leading-none",
          highlight ? "text-midnight" : "text-fg-muted",
        ].join(" ")}
      >
        {icon && (
          <span className="text-energy mr-1 font-mono text-lg">{icon}</span>
        )}
        {value}
        {sub && (
          <span className="text-sm font-mono text-fg-muted ml-1">{sub}</span>
        )}
      </p>
    </div>
  );
}

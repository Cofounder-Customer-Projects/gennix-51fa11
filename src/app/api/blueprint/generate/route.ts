import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Niche-specific context injected into the prompt so chapters are relevant
const NICHE_CONTEXT: Record<
  string,
  { topics: string[]; tone: string; priceRange: string; pages: number }
> = {
  "fat loss for busy women": {
    topics: [
      "calorie deficit without counting every macro",
      "HIIT and time-efficient workouts",
      "meal prep for the week in under an hour",
      "metabolism-boosting habits",
      "stress and cortisol management",
      "sustainable fat loss vs crash dieting",
    ],
    tone: "practical, empowering, time-conscious",
    priceRange: "$19–$29",
    pages: 28,
  },
  "postpartum fitness recovery": {
    topics: [
      "pelvic floor rehabilitation",
      "diastasis recti assessment and healing",
      "gentle movement in the first 6 weeks",
      "hormonal recovery and nutrition",
      "safe return to exercise milestones",
      "managing energy with a newborn",
    ],
    tone: "compassionate, evidence-based, safety-first",
    priceRange: "$24–$37",
    pages: 32,
  },
  "senior mobility & flexibility": {
    topics: [
      "joint health and lubrication",
      "balance training and fall prevention",
      "low-impact movement patterns",
      "flexibility and range of motion",
      "pain-free daily movement",
      "strength for independence",
    ],
    tone: "encouraging, accessible, medically considerate",
    priceRange: "$17–$27",
    pages: 26,
  },
  "home strength training": {
    topics: [
      "progressive overload without a gym",
      "bodyweight exercise progressions",
      "resistance band workouts",
      "building a home training schedule",
      "tracking strength gains at home",
      "equipment-free full-body programming",
    ],
    tone: "motivating, structured, goal-oriented",
    priceRange: "$19–$29",
    pages: 30,
  },
  "beginner running plans": {
    topics: [
      "run/walk interval programming",
      "proper running form and cadence",
      "injury prevention and footwear",
      "pacing and perceived effort",
      "building aerobic base",
      "first 5K training milestones",
    ],
    tone: "encouraging, step-by-step, beginner-friendly",
    priceRange: "$14–$22",
    pages: 24,
  },
  "kettlebell for beginners": {
    topics: [
      "kettlebell swing mechanics and safety",
      "Turkish get-up progressions",
      "grip strength and callus management",
      "full-body compound movement patterns",
      "choosing the right kettlebell weight",
      "programming swings, cleans, and presses",
    ],
    tone: "technical but accessible, confidence-building",
    priceRange: "$19–$29",
    pages: 28,
  },
};

function getNicheContext(niche: string) {
  const normalized = niche.toLowerCase().trim();
  // Exact or substring match
  for (const [key, ctx] of Object.entries(NICHE_CONTEXT)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return ctx;
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { niche, audience } = await request.json();

    if (!niche?.trim()) {
      return NextResponse.json({ error: "niche is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 },
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const nicheCtx = getNicheContext(niche);
    const audienceStr = audience?.trim() || `people interested in ${niche}`;

    const nicheContextBlock = nicheCtx
      ? `
Key topics this niche demands (you MUST include these themes across your chapters):
${nicheCtx.topics.map((t) => `- ${t}`).join("\n")}

Tone to use: ${nicheCtx.tone}
`
      : `
Generate chapters that are highly specific to the niche "${niche}". Do NOT use generic fitness chapter names.
Each chapter must reflect something a buyer of "${niche}" content specifically needs and cannot get from a generic fitness guide.
`;

    const prompt = `You are an expert fitness content strategist who creates sellable PDF guides for fitness creators.

Create a blueprint outline for a PDF fitness guide with these details:
- Niche: "${niche}"
- Target audience: "${audienceStr}"
${nicheContextBlock}

Return a JSON object with exactly this shape:
{
  "title": "A compelling, specific title for this guide (NOT generic — must reference the niche directly, 6-10 words)",
  "chapters": ["Chapter 1 title", "Chapter 2 title", "Chapter 3 title", "Chapter 4 title", "Chapter 5 title", "Chapter 6 title", "Chapter 7 title"],
  "estimatedPrice": "$19–$29",
  "pageCount": 28
}

Rules:
- Exactly 7 chapter titles
- Each chapter title must be specific to "${niche}" — a reader should immediately understand what this guide is about
- Do NOT use generic titles like "Introduction", "Nutrition Fundamentals", "Recovery", or "Week 1 Workout Schedule" unless they are made niche-specific (e.g. "Pelvic Floor Recovery: Your First 2 Weeks" instead of "Recovery")
- The title must NOT be generic — it must speak directly to the target audience
- estimatedPrice should be a realistic price range for this type of fitness PDF
- pageCount should be between 20 and 40 based on content depth
- Return only valid JSON, no markdown, no explanation`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 600,
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json(
        { error: "No response from OpenAI" },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(raw);

    // Validate shape
    if (
      !parsed.title ||
      !Array.isArray(parsed.chapters) ||
      parsed.chapters.length !== 7
    ) {
      return NextResponse.json(
        { error: "Unexpected OpenAI response shape" },
        { status: 500 },
      );
    }

    // Apply niche-specific defaults for price/pages if OpenAI didn't provide realistic values
    if (nicheCtx) {
      parsed.estimatedPrice = parsed.estimatedPrice || nicheCtx.priceRange;
      parsed.pageCount = parsed.pageCount || nicheCtx.pages;
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Blueprint generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate blueprint" },
      { status: 500 },
    );
  }
}

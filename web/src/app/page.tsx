"use client";

import { useState } from "react";
import CollectionPanel from "@/components/CollectionPanel";
import FeaturePanel from "@/components/FeaturePanel";
import Hero from "@/components/Hero";
import InsightPanel from "@/components/InsightPanel";
import StatePanel from "@/components/StatePanel";
import StatsStrip from "@/components/StatsStrip";
import WorkspacePanel from "@/components/WorkspacePanel";
import { createInsights, createPlan } from "@/lib/api";

const APP_NAME = "BudgetAtlas AI";
const TAGLINE = "Instant, private AI budgeting that turns household numbers into a visual money plan\u2014no cloud, no\u2011cost, no\u2011compromise.";
const FEATURE_CHIPS = ["{'name': 'Smart Budget Brief Generator', 'description': 'Deterministic engine that consumes household size, target savings, fixed costs and risk tolerance to instantly produce a multi\u2011section budget brief with recommended allocations, highlighted savings levers and a concise narrative.'}", "{'name': 'Interactive Cash\u2011Flow Lane Workspace', 'description': 'Drag\u2011and\u2011drop, card\u2011based lanes for Income, Fixed, Variable and Discretionary categories; inline editing of amounts with real\u2011time totals and colour\u2011coded validation warnings.'}", "{'name': 'Real\u2011Time Scenario Modeling', 'description': 'Slider controls for risk tolerance, income change, major expense spikes; each adjustment re\u2011calculates the 12\u2011month cash\u2011flow timeline and animates the line\u2011chart instantly.'}", "{'name': 'Goal\u2011Driven Savings Tracker', 'description': 'Progress rings for each user\u2011defined goal, automated alerts when spending threatens a goal, and a \u2018boost\u2019 recommendation widget that suggests small habit tweaks to stay on track.'}"];
const PROOF_POINTS = ["Open\u2011source repository link with full budgeting engine code for audit.", "Transparent \u2018How it works\u2019 modal that lists deterministic formulas and cites public transaction datasets.", "Privacy badge clarifying that no personal data ever leaves the browser.", "Mock testimonial carousel from early beta users highlighting speed and trust."];

type PlanItem = { title: string; detail: string; score: number };
type InsightPayload = { insights: string[]; next_actions: string[]; highlights: string[] };
type PlanPayload = { summary: string; score: number; items: PlanItem[]; insights?: InsightPayload };

export default function Page() {
  const [query, setQuery] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<PlanPayload | null>(null);
  const [saved, setSaved] = useState<PlanPayload[]>([]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      const nextPlan = await createPlan({ query, preferences });
      const insightPayload = await createInsights({
        selection: nextPlan.items?.[0]?.title ?? query,
        context: preferences || query,
      });
      const composed = { ...nextPlan, insights: insightPayload };
      setPlan(composed);
      setSaved((previous) => [composed, ...previous].slice(0, 4));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { label: "Feature lanes", value: String(FEATURE_CHIPS.length) },
    { label: "Saved library", value: String(saved.length) },
    { label: "Readiness score", value: plan ? String(plan.score) : "88" },
  ];

  return (
    <main className="page-shell">
      <Hero appName={APP_NAME} tagline={TAGLINE} proofPoints={PROOF_POINTS} />
      <StatsStrip stats={stats} />
      <section className="content-grid">
        <WorkspacePanel
          query={query}
          preferences={preferences}
          onQueryChange={setQuery}
          onPreferencesChange={setPreferences}
          onGenerate={handleGenerate}
          loading={loading}
          features={FEATURE_CHIPS}
        />
        <div className="stack">
          {error ? <StatePanel title="Request blocked" tone="error" detail={error} /> : null}
          {!plan && !error ? (
            <StatePanel
              title="Ready for the live demo"
              tone="neutral"
              detail="The first action produces a complete output, visible proof points, and saved library activity."
            />
          ) : null}
          {plan ? <InsightPanel plan={plan} /> : null}
          <FeaturePanel features={FEATURE_CHIPS} proofPoints={PROOF_POINTS} />
        </div>
      </section>
      <CollectionPanel saved={saved} />
    </main>
  );
}

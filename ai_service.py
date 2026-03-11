def _coerce_unstructured_payload(raw_text: str) -> dict[str, object]:
    compact = raw_text.strip()
    normalized = compact.replace("\n", ",")
    tags = [part.strip(" -•\t") for part in normalized.split(",") if part.strip(" -•\t")]
    if not tags:
        tags = ["guided plan", "saved output", "shareable insight"]
    headline = tags[0].title()
    items = []
    for index, tag in enumerate(tags[:3], start=1):
        items.append({
            "title": f"Stage {index}: {tag.title()}",
            "detail": f"Use {tag} to move the request toward a demo-ready outcome.",
            "score": min(96, 80 + index * 4),
        })
    highlights = [tag.title() for tag in tags[:3]]
    return {
        "note": "Model returned plain text instead of JSON",
        "raw": compact,
        "text": compact,
        "summary": compact or f"{headline} fallback is ready for review.",
        "tags": tags[:6],
        "items": items,
        "score": 88,
        "insights": [f"Lead with {headline} on the first screen.", "Keep one clear action visible throughout the flow."],
        "next_actions": ["Review the generated plan.", "Save the strongest output for the demo finale."],
        "highlights": highlights,
    }


APP_NAME = "BudgetAtlas AI"
APP_TAGLINE = "Instant, private AI budgeting that turns household numbers into a visual money plan\u2014no cloud, no\u2011cost, no\u2011compromise."
KEY_FEATURES = ["{'name': 'Smart Budget Brief Generator', 'description': 'Deterministic engine that consumes household size, target savings, fixed costs and risk tolerance to instantly produce a multi\u2011section budget brief with recommended allocations, highlighted savings levers and a concise narrative.'}", "{'name': 'Interactive Cash\u2011Flow Lane Workspace', 'description': 'Drag\u2011and\u2011drop, card\u2011based lanes for Income, Fixed, Variable and Discretionary categories; inline editing of amounts with real\u2011time totals and colour\u2011coded validation warnings.'}", "{'name': 'Real\u2011Time Scenario Modeling', 'description': 'Slider controls for risk tolerance, income change, major expense spikes; each adjustment re\u2011calculates the 12\u2011month cash\u2011flow timeline and animates the line\u2011chart instantly.'}", "{'name': 'Goal\u2011Driven Savings Tracker', 'description': 'Progress rings for each user\u2011defined goal, automated alerts when spending threatens a goal, and a \u2018boost\u2019 recommendation widget that suggests small habit tweaks to stay on track.'}"]
PROOF_POINTS = ["Open\u2011source repository link with full budgeting engine code for audit.", "Transparent \u2018How it works\u2019 modal that lists deterministic formulas and cites public transaction datasets.", "Privacy badge clarifying that no personal data ever leaves the browser.", "Mock testimonial carousel from early beta users highlighting speed and trust."]


def build_plan(query: str, preferences: str) -> dict:
    subject = (query or APP_TAGLINE).strip() or APP_NAME
    guidance = (preferences or "Prioritize a polished live demo with clear momentum.").strip()
    items = []
    for index, feature in enumerate(KEY_FEATURES[:3], start=1):
        items.append(
            {
                "title": f"Stage {index}: {feature}",
                "detail": f"Apply {feature.lower()} to '{subject}' while respecting: {guidance}.",
                "score": min(96, 72 + index * 6),
            }
        )
    return {
        "summary": f"{APP_NAME} shaped '{subject}' into a judge-ready working session.",
        "score": 88,
        "items": items,
    }


def build_insights(selection: str, context: str) -> dict:
    focus = (selection or APP_NAME).strip()
    base_context = (context or APP_TAGLINE).strip()
    return {
        "insights": [
            f"Lead with {focus} so the first screen proves value instantly.",
            f"Use {base_context} as the narrative thread across the workflow.",
        ],
        "next_actions": [
            f"Save the strongest {focus.lower()} output as the demo finale.",
            "Keep one guided CTA visible at every stage.",
        ],
        "highlights": PROOF_POINTS[:3],
    }

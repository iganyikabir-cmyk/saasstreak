import type { Comparison } from "@/lib/types";

export const comparisons: Comparison[] = [
  {
    id: "cmp-hubspot-salesforce",
    slug: "hubspot-vs-salesforce",
    softwareAId: "sw-hubspot",
    softwareBId: "sw-salesforce",
    intro:
      "HubSpot and Salesforce are the two most searched CRM platforms — but they're built for different buyers. HubSpot leans into ease of use and an all-in-one Hub model with a genuinely free CRM; Salesforce leans into near-limitless customization for complex, high-volume sales organizations. Here's how they actually compare.",
    featureRows: [
      { label: "Free plan", aValue: "Yes, unlimited users", bValue: "No (30-day trial only)" },
      { label: "Custom objects", aValue: "Limited (Enterprise tier)", bValue: "Unlimited, fully custom" },
      { label: "Built-in marketing automation", aValue: "Yes (Marketing Hub)", bValue: "Add-on (Marketing Cloud)" },
      { label: "AI features", aValue: "HubSpot AI (Breeze)", bValue: "Einstein AI" },
      { label: "Native CMS", aValue: "Yes", bValue: "No" },
      { label: "Implementation complexity", aValue: "Low to moderate", bValue: "Moderate to high" },
    ],
    pricingRows: [
      { label: "Entry price", aValue: "Free", bValue: "$25/user/mo" },
      { label: "Mid-tier price", aValue: "~$890/mo (Marketing Hub Pro)", bValue: "$100/user/mo (Professional)" },
      { label: "Enterprise price", aValue: "$3,600+/mo per Hub", bValue: "$165+/user/mo" },
      { label: "Typical contract", aValue: "Annual, per Hub", bValue: "Annual, per user" },
    ],
    easeOfUseA: 4.6,
    easeOfUseB: 3.8,
    bestUseCaseA: "SMBs and mid-market teams that want marketing, sales, and service unified with minimal admin overhead.",
    bestUseCaseB: "Large enterprises with complex, non-standard sales processes and dedicated Salesforce admin resources.",
    verdict:
      "Choose HubSpot if you want to be productive fast and your process fits reasonably standard CRM/marketing workflows. Choose Salesforce if your sales process is genuinely complex enough to need custom objects, deep permissioning, or an extensive integration ecosystem — and you have the budget and admin resources to support it.",
    winnerId: null,
  },
  {
    id: "cmp-notion-clickup",
    slug: "notion-vs-clickup",
    softwareAId: "sw-notion",
    softwareBId: "sw-clickup",
    intro:
      "Notion and ClickUp both promise to be your team's single workspace, but they get there differently. Notion is a flexible, document-first canvas that teams shape into their own system. ClickUp is a feature-dense, purpose-built project management tool with far more structure out of the box.",
    featureRows: [
      { label: "Native Gantt charts", aValue: "No (community workarounds)", bValue: "Yes, native" },
      { label: "Task dependencies", aValue: "Basic (via relations)", bValue: "Advanced, native" },
      { label: "Docs & wiki quality", aValue: "Excellent", bValue: "Good" },
      { label: "Views available", aValue: "6 (table, board, calendar, etc.)", bValue: "15+" },
      { label: "AI assistant", aValue: "Notion AI", bValue: "ClickUp Brain" },
      { label: "Time tracking", aValue: "Third-party integration", bValue: "Native" },
    ],
    pricingRows: [
      { label: "Free plan", aValue: "Yes, unlimited pages (individuals)", bValue: "Yes, unlimited tasks" },
      { label: "Team tier", aValue: "$10/user/mo (Plus)", bValue: "$10/user/mo (Unlimited)" },
      { label: "Business tier", aValue: "$20/user/mo", bValue: "$19/user/mo" },
    ],
    easeOfUseA: 4.6,
    easeOfUseB: 4.0,
    bestUseCaseA: "Startups and small teams wanting flexible docs, wikis, and lightweight task tracking in one clean tool.",
    bestUseCaseB: "Teams with complex, multi-stage projects that need native dependencies, time tracking, and deep reporting.",
    verdict:
      "Pick Notion if documentation and flexibility matter more than heavyweight project tracking, and your team is comfortable designing its own workflow. Pick ClickUp if you need native Gantt charts, dependencies, and structured project management out of the box, and don't mind a steeper initial setup.",
    winnerId: null,
  },
  {
    id: "cmp-zendesk-freshdesk",
    slug: "zendesk-vs-freshdesk",
    softwareAId: "sw-zendesk",
    softwareBId: "sw-freshdesk",
    intro:
      "Zendesk and Freshdesk both cover the core helpdesk workflow — ticketing, automation, and a self-service portal — but they target different budgets. Zendesk is built for scale and reporting depth; Freshdesk optimizes for fast setup and friendlier pricing at small-to-mid team sizes.",
    featureRows: [
      { label: "Free plan", aValue: "No", bValue: "Yes (up to 2 agents)" },
      { label: "Advanced analytics", aValue: "Zendesk Explore (deep)", bValue: "Basic on lower tiers" },
      { label: "AI ticket resolution", aValue: "AI agents / Answer Bot", bValue: "Freddy AI" },
      { label: "Workforce management", aValue: "Yes (add-on)", bValue: "No" },
      { label: "Gamification", aValue: "No", bValue: "Yes (Arcade)" },
      { label: "Setup time (typical)", aValue: "1-3 weeks", bValue: "1-3 days" },
    ],
    pricingRows: [
      { label: "Entry price", aValue: "$55/agent/mo", bValue: "Free (2 agents)" },
      { label: "Mid-tier price", aValue: "$89/agent/mo", bValue: "$59/agent/mo" },
      { label: "Top tier price", aValue: "$115/agent/mo", bValue: "$95/agent/mo" },
    ],
    easeOfUseA: 4.1,
    easeOfUseB: 4.5,
    bestUseCaseA: "Mid-market and enterprise support teams with high ticket volume needing deep reporting and workforce management.",
    bestUseCaseB: "Small to mid-size support teams wanting a fast, affordable setup without sacrificing core helpdesk features.",
    verdict:
      "Zendesk wins on reporting depth and enterprise scale features; Freshdesk wins on price, setup speed, and approachability. Most teams under ~30 agents get everything they need from Freshdesk at a fraction of the cost.",
    winnerId: null,
  },
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  {
    id: "rev-17", softwareId: "sw-freshbooks", authorName: "Priya Malhotra", authorRole: "Studio Founder", authorCompanySize: "1-10",
    rating: 5, title: "Everyone on our team recommends this now", date: "2026-09-10", verified: true, helpfulCount: 19,
    body: "It feels like every freelancer group chat I'm in has someone bringing up FreshBooks this quarter. We moved our whole studio over and the client portal alone has cut our payment delays in half.",
    pros: "Word-of-mouth is real — it just works out of the box.", cons: "Wish the Lite plan allowed a few more clients before upgrading.",
  },
  {
    id: "rev-1", softwareId: "sw-hubspot", authorName: "Priya Nair", authorRole: "Marketing Manager", authorCompanySize: "11-50",
    rating: 5, title: "Finally, one place for the whole funnel", date: "2026-07-14", verified: true, helpfulCount: 42,
    body: "We switched from three separate tools to HubSpot's free CRM plus Marketing Starter and haven't looked back. Seeing email opens, deal stage, and support tickets on one contact record changed how our sales and marketing teams talk to each other.",
    pros: "Unified data, easy onboarding, great templates.", cons: "Costs jump a lot once you need Professional tier automation.",
  },
  {
    id: "rev-2", softwareId: "sw-hubspot", authorName: "Marcus Webb", authorRole: "RevOps Lead", authorCompanySize: "201-1000",
    rating: 4, title: "Powerful but pricing scales fast", date: "2026-05-02", verified: true, helpfulCount: 29,
    body: "HubSpot handles our marketing and sales motion well, but between Marketing Hub Professional and Sales Hub Enterprise, our annual spend more than doubled in two years. Worth it for the visibility, but budget for growth.",
    pros: "Reporting across Hubs, solid automation.", cons: "Multi-Hub pricing compounds quickly.",
  },
  {
    id: "rev-3", softwareId: "sw-salesforce", authorName: "Elena Torres", authorRole: "Sales Operations Director", authorCompanySize: "1000+",
    rating: 5, title: "Nothing else handles our complexity", date: "2026-06-20", verified: true, helpfulCount: 58,
    body: "We evaluated three CRMs before staying with Salesforce — the custom object model is the only one that could represent our multi-entity sales process. It took a real implementation project, but it's paid off.",
    pros: "Unmatched customization, AppExchange ecosystem.", cons: "Needed a dedicated admin from day one.",
  },
  {
    id: "rev-4", softwareId: "sw-salesforce", authorName: "Jordan Kim", authorRole: "Sales Rep", authorCompanySize: "201-1000",
    rating: 3, title: "Great for admins, clunky for reps", date: "2026-04-11", verified: true, helpfulCount: 17,
    body: "As an end user, logging activity and updating opportunities feels slower than it should. It's clearly built for the people configuring it more than the people using it daily.",
    pros: "Comprehensive data, reliable.", cons: "Interface feels dated and click-heavy.",
  },
  {
    id: "rev-5", softwareId: "sw-notion", authorName: "Sam Alvarez", authorRole: "Founder", authorCompanySize: "1-10",
    rating: 5, title: "Our entire startup runs on this", date: "2026-08-01", verified: true, helpfulCount: 63,
    body: "Wiki, roadmap, CRM-lite, and meeting notes — all in Notion. The free tier got us through our first year and Plus has been more than enough since. Can't imagine going back to scattered docs.",
    pros: "Flexible, fast, great templates.", cons: "Large databases start to lag.",
  },
  {
    id: "rev-6", softwareId: "sw-notion", authorName: "Aisha Rahman", authorRole: "Engineering Manager", authorCompanySize: "51-200",
    rating: 4, title: "Great docs, not a Jira replacement", date: "2026-03-22", verified: true, helpfulCount: 21,
    body: "We use Notion for specs and team wikis and it's excellent for that. We tried moving sprint tracking here too but ended up going back to a dedicated tool for dependency management.",
    pros: "Beautiful docs, easy for non-engineers.", cons: "No real dependency tracking for engineering sprints.",
  },
  {
    id: "rev-7", softwareId: "sw-clickup", authorName: "Derek Foss", authorRole: "Operations Manager", authorCompanySize: "51-200",
    rating: 5, title: "Replaced four tools with one", date: "2026-07-29", verified: true, helpfulCount: 34,
    body: "We were paying for Asana, a separate docs tool, a time tracker, and a goals dashboard. ClickUp does all of it, and the automations save our PMs hours every week once you invest the time to set them up.",
    pros: "Deep feature set, great automations.", cons: "Took about a month to configure well.",
  },
  {
    id: "rev-8", softwareId: "sw-clickup", authorName: "Nina Petrov", authorRole: "Freelance Designer", authorCompanySize: "1-10",
    rating: 3, title: "Too much for a solo user", date: "2026-02-10", verified: false, helpfulCount: 9,
    body: "As a freelancer I just needed simple task tracking and found myself lost in views and settings I didn't need. Might be great for teams, overkill for me.",
    pros: "Free tier is generous.", cons: "Overwhelming for simple use cases.",
  },
  {
    id: "rev-9", softwareId: "sw-zendesk", authorName: "Tom Bryant", authorRole: "Head of Support", authorCompanySize: "1000+",
    rating: 5, title: "Scales with high ticket volume", date: "2026-06-05", verified: true, helpfulCount: 40,
    body: "We handle over 5,000 tickets a week and Zendesk's routing, SLAs, and Explore reporting keep us on top of it. The AI-suggested replies have measurably cut our average handle time.",
    pros: "Scalable, strong reporting.", cons: "Per-agent cost adds up with a large team.",
  },
  {
    id: "rev-10", softwareId: "sw-freshdesk", authorName: "Lauren Choi", authorRole: "Customer Success Lead", authorCompanySize: "11-50",
    rating: 5, title: "Zendesk features without the price shock", date: "2026-05-18", verified: true, helpfulCount: 25,
    body: "We compared both directly and Freshdesk gave us 90% of what we needed at roughly 60% of the cost. Setup took an afternoon, not weeks.",
    pros: "Fast setup, fair pricing, friendly UI.", cons: "Reporting is a bit basic on lower tiers.",
  },
  {
    id: "rev-11", softwareId: "sw-quickbooks", authorName: "Robert Hayes", authorRole: "Small Business Owner", authorCompanySize: "1-10",
    rating: 4, title: "My accountant already knew it", date: "2026-04-30", verified: true, helpfulCount: 31,
    body: "The biggest win was not having to train my bookkeeper on a new system — she already used QuickBooks with other clients. The bank sync alone saves me hours a month.",
    pros: "Familiar to accountants, reliable bank sync.", cons: "Payroll add-on fees stack up.",
  },
  {
    id: "rev-15", softwareId: "sw-freshbooks", authorName: "Danielle Ruiz", authorRole: "Freelance Consultant", authorCompanySize: "1-10",
    rating: 5, title: "Invoicing finally doesn't feel like a chore", date: "2026-08-03", verified: true, helpfulCount: 22,
    body: "I switched from spreadsheets and a payment link generator to FreshBooks and got paid faster within the first month — clients love the portal, and the automatic reminders mean I've stopped chasing late invoices myself.",
    pros: "Effortless invoicing, great client portal, time tracking built in.", cons: "Client limit on the Lite plan forced an early upgrade.",
  },
  {
    id: "rev-16", softwareId: "sw-freshbooks", authorName: "Marcus Bell", authorRole: "Agency Owner", authorCompanySize: "11-50",
    rating: 4, title: "Great for a small agency, thin on inventory", date: "2026-05-22", verified: true, helpfulCount: 15,
    body: "For a five-person creative agency billing by the project, FreshBooks nails the basics — time tracking rolls straight into invoices and project profitability reports keep us honest about scope creep. We'd need something heavier if we ever sold physical products.",
    pros: "Simple setup, solid project profitability view.", cons: "No real inventory management, no built-in payroll.",
  },
  {
    id: "rev-12", softwareId: "sw-gusto", authorName: "Michelle Ortiz", authorRole: "Office Manager", authorCompanySize: "11-50",
    rating: 5, title: "Payroll finally feels simple", date: "2026-07-09", verified: true, helpfulCount: 27,
    body: "I'm not an HR person by training, but Gusto walks me through everything — new hires, benefits enrollment, tax filings. Support has been genuinely helpful every time I've needed them.",
    pros: "Very approachable, great support.", cons: "Per-employee fees add up as we grow.",
  },
  {
    id: "rev-13", softwareId: "sw-figma", authorName: "Owen Blake", authorRole: "Product Designer", authorCompanySize: "51-200",
    rating: 5, title: "Changed how our design team collaborates", date: "2026-08-12", verified: true, helpfulCount: 71,
    body: "Real-time multiplayer editing sounds like a gimmick until you use it daily. No more 'final_v3_ACTUAL.fig' files. Dev Mode has also cut back-and-forth with engineering significantly.",
    pros: "Real-time collaboration, great component system.", cons: "Large files can get sluggish.",
  },
  {
    id: "rev-14", softwareId: "sw-shopify", authorName: "Grace Liu", authorRole: "E-commerce Founder", authorCompanySize: "1-10",
    rating: 4, title: "Launched in a weekend, scaled over years", date: "2026-06-27", verified: true, helpfulCount: 38,
    body: "Started on Basic with a theme and a handful of apps, now on the Shopify plan doing seven figures a year. The app ecosystem means I've never hit a wall I couldn't solve without a developer.",
    pros: "Fast launch, huge app ecosystem.", cons: "App subscription costs add up over time.",
  },
];

export function getReviewsBySoftwareId(softwareId: string): Review[] {
  return reviews.filter((r) => r.softwareId === softwareId);
}

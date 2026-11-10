import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "cat-crm",
    slug: "crm-software",
    name: "CRM Software",
    shortName: "CRM",
    description:
      "Manage leads, deals, and customer relationships in one place. Compare the top CRM platforms for sales teams of every size.",
    seoDescription:
      "Compare the best CRM software of 2026. Read independent reviews, pricing, and features for top CRM platforms like HubSpot, Salesforce, and Pipedrive.",
    icon: "users",
  },
  {
    id: "cat-marketing",
    slug: "marketing-software",
    name: "Marketing Software",
    shortName: "Marketing",
    description:
      "Email marketing, automation, and campaign tools to grow your audience and convert more customers.",
    seoDescription:
      "Find the best marketing software for email, automation, and campaign management. Compare pricing and features from real user reviews.",
    icon: "megaphone",
  },
  {
    id: "cat-project-management",
    slug: "project-management-software",
    name: "Project Management Software",
    shortName: "Project Mgmt",
    description:
      "Plan, track, and deliver work on time with the leading project and task management platforms.",
    seoDescription:
      "Compare the best project management software including Notion, ClickUp, and Asana. Independent reviews, pricing, and feature comparisons.",
    icon: "kanban-square",
  },
  {
    id: "cat-accounting",
    slug: "accounting-software",
    name: "Accounting Software",
    shortName: "Accounting",
    description:
      "Invoicing, bookkeeping, and financial reporting tools built for small businesses to enterprises.",
    seoDescription:
      "Discover top-rated accounting software for small businesses. Compare pricing, features, and reviews before you buy.",
    icon: "calculator",
  },
  {
    id: "cat-customer-support",
    slug: "customer-support-software",
    name: "Customer Support Software",
    shortName: "Support",
    description:
      "Helpdesk, live chat, and ticketing software to deliver faster, better customer service.",
    seoDescription:
      "Compare the best customer support and helpdesk software like Zendesk and Freshdesk. Real reviews, pricing, and feature breakdowns.",
    icon: "headset",
  },
  {
    id: "cat-hr",
    slug: "hr-software",
    name: "HR Software",
    shortName: "HR",
    description:
      "Hiring, payroll, and people management platforms for modern HR teams.",
    seoDescription:
      "Find the best HR software for payroll, hiring, and people management. Compare top-rated platforms by price and feature set.",
    icon: "briefcase",
  },
  {
    id: "cat-ai-tools",
    slug: "ai-tools",
    name: "AI Tools",
    shortName: "AI Tools",
    description:
      "AI writing, coding, image, and productivity tools reshaping how teams work.",
    seoDescription:
      "Explore the best AI tools of 2026 for writing, coding, design, and productivity. Compare features, pricing, and real user ratings.",
    icon: "sparkles",
  },
  {
    id: "cat-analytics",
    slug: "analytics-software",
    name: "Analytics Software",
    shortName: "Analytics",
    description:
      "Product, web, and business analytics platforms to turn data into decisions.",
    seoDescription:
      "Compare the best analytics software for product and web analytics. Reviews, pricing, and feature comparisons in one place.",
    icon: "bar-chart-3",
  },
  {
    id: "cat-construction",
    slug: "construction-software",
    name: "Construction Software",
    shortName: "Construction",
    description:
      "Project estimating, scheduling, and field management tools built for construction teams.",
    seoDescription:
      "Discover the best construction management software. Compare estimating, scheduling, and field tools with independent reviews.",
    icon: "hard-hat",
  },
  {
    id: "cat-design",
    slug: "design-software",
    name: "Design Software",
    shortName: "Design",
    description:
      "UI/UX, graphic design, and prototyping tools for designers and product teams.",
    seoDescription:
      "Compare the best design software for UI/UX and graphic design. Read reviews and pricing for top creative tools.",
    icon: "palette",
  },
  {
    id: "cat-ecommerce",
    slug: "ecommerce-software",
    name: "E-commerce Software",
    shortName: "E-commerce",
    description:
      "Storefront, checkout, and inventory platforms to launch and scale an online store.",
    seoDescription:
      "Find the best e-commerce software to launch and grow your online store. Compare platforms, pricing, and real reviews.",
    icon: "shopping-cart",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

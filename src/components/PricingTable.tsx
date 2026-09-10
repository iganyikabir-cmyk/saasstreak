import { Check } from "lucide-react";
import type { PricingPlan } from "@/lib/types";

export function PricingTable({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`flex flex-col rounded-2xl border p-5 ${
            plan.highlighted
              ? "border-brand-blue bg-gradient-to-b from-brand-blue/5 to-transparent ring-1 ring-brand-blue/20"
              : "border-border bg-surface"
          }`}
        >
          {plan.highlighted && (
            <span className="mb-3 w-fit rounded-full brand-gradient-bg px-2.5 py-1 text-[11px] font-medium text-white">
              Most popular
            </span>
          )}
          <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
          <p className="mt-2 text-2xl font-bold text-foreground">{plan.price}</p>
          {plan.billingNote && (
            <p className="text-xs text-foreground-muted">{plan.billingNote}</p>
          )}
          <ul className="mt-4 flex-1 space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-foreground-muted">
                <Check size={15} className="mt-0.5 shrink-0 text-brand-blue" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

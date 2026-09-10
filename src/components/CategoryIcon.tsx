import {
  Users,
  Megaphone,
  KanbanSquare,
  Calculator,
  Headset,
  Briefcase,
  Sparkles,
  BarChart3,
  HardHat,
  Palette,
  ShoppingCart,
  LayoutGrid,
  type LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  users: Users,
  megaphone: Megaphone,
  "kanban-square": KanbanSquare,
  calculator: Calculator,
  headset: Headset,
  briefcase: Briefcase,
  sparkles: Sparkles,
  "bar-chart-3": BarChart3,
  "hard-hat": HardHat,
  palette: Palette,
  "shopping-cart": ShoppingCart,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name] ?? LayoutGrid;
  return <Icon {...props} />;
}

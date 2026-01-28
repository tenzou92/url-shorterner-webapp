import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatsCard({ icon: Icon, value, label }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors">
      <Icon className="h-6 w-6 text-accent" />
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

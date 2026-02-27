import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = "from-[#F5C452]/20 to-[#FFD700]/10",
}: StatsCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-[#1B1B23] to-[#14141A] border border-[#F5C452]/30 hover:border-[#F5C452]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#F5C452]/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-white">{value}</h3>
              {trend && (
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
          <div
            className={`p-4 rounded-xl bg-gradient-to-br ${colorClass} border border-[#F5C452]/20`}
          >
            <Icon className="w-8 h-8 text-[#F5C452]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

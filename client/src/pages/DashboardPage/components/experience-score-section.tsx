import {
  AwardIcon,
  PackageIcon,
  TruckIcon,
  ShieldCheckIcon,
  ThumbsUpIcon,
  ClockIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  AlertCircleIcon,
  BarChart3Icon,
  StarIcon,
} from "lucide-react";
import type { IExperienceMetric } from "@shared/types";

const iconMap: Record<string, React.ReactNode> = {
  "宝贝质量": <PackageIcon className="w-4 h-4" />,
  "物流速度": <TruckIcon className="w-4 h-4" />,
  "服务保障": <ShieldCheckIcon className="w-4 h-4" />,
  "商品负反馈率": <AlertCircleIcon className="w-4 h-4" />,
  "商品好评率": <ThumbsUpIcon className="w-4 h-4" />,
  "48小时揽收及时率": <ClockIcon className="w-4 h-4" />,
  "物流到货时长": <TruckIcon className="w-4 h-4" />,
  "3分钟人工响应率": <MessageSquareIcon className="w-4 h-4" />,
  "旺旺满意度": <StarIcon className="w-4 h-4" />,
  "退款处理时长": <RefreshCwIcon className="w-4 h-4" />,
  "平台求助率": <BarChart3Icon className="w-4 h-4" />,
};

function ScoreBadge({ score }: { score: number }) {
  const isPerfect = score >= 5.0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
        isPerfect
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      }`}
    >
      {isPerfect && <AwardIcon className="w-3 h-3" />}
      {score.toFixed(1)}分
    </span>
  );
}

function MetricCard({ metric }: { metric: IExperienceMetric }) {
  const icon = iconMap[metric.name];
  return (
    <div
      className="relative overflow-hidden rounded-xl border backdrop-blur-xl p-3 sm:p-4
                 transition-all duration-300 hover:scale-[1.02] cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        borderColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 bg-white/10 rounded-lg text-white/50 shrink-0">{icon}</span>
        <span className="text-xs font-medium text-white/60 leading-tight">{metric.name}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="text-lg sm:text-xl font-bold tracking-tight text-white">
          {metric.value}
        </div>
        <ScoreBadge score={metric.score} />
      </div>
      <div className="text-[11px] font-medium text-white/40 mt-1">{metric.benchmark}</div>
    </div>
  );
}

export function ExperienceScoreSection({
  data,
}: {
  data: IExperienceMetric[];
}) {
  const overallScore = (
    data.reduce((sum, m) => sum + m.score, 0) / data.length
  ).toFixed(2);

  return (
    <section className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-white">
            真实体验分
          </h2>
          <p className="text-[10px] text-white/40 mt-0.5">
            共 {data.length} 项核心指标
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-xl border backdrop-blur-xl px-3 py-2"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%)",
            borderColor: "rgba(99,102,241,0.25)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div className="text-right">
            <div className="text-[10px] font-medium text-white/50">综合</div>
            <div className="text-lg font-black tracking-tight text-indigo-400 leading-none">
              {overallScore}
            </div>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="text-right">
            <div className="text-[10px] font-medium text-white/50">满分</div>
            <div className="text-sm font-bold text-white/70 leading-none">5.0</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
        {data.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </div>
    </section>
  );
}

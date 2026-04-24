import { motion } from "framer-motion";
import { AlertTriangleIcon } from "lucide-react";
import type { IDayData } from "@shared/types";

export function HeroBanner({ data }: { data: IDayData }) {
  const overallSatisfaction = data.satisfaction.find((s) => s.label === "整体");
  const aiSatisfaction = data.satisfaction.find((s) => s.label === "AI智能组");
  const dailyConversion = data.conversion.daily;
  const monthlyConversion = data.conversion.monthlyAvg;
  const isConvLow = dailyConversion < monthlyConversion;

  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl
                     bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-2.5"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <div className="absolute top-0 right-0 w-10 h-10 bg-indigo-500/15 blur-xl rounded-full -translate-y-3 translate-x-3" />
          <div className="relative">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-medium text-white/50 truncate">整体满意率</span>
              <AlertTriangleIcon className="w-2.5 h-2.5 text-orange-400 shrink-0" />
            </div>
            <div className="text-lg sm:text-3xl font-black tracking-tight text-white tabular-nums leading-none">
              {overallSatisfaction?.rate.toFixed(1)}
              <span className="text-[10px] sm:text-sm font-bold text-white/50">%</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="text-[9px] font-semibold text-orange-400">
                ↓{Math.abs(overallSatisfaction?.change ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl
                     bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-2.5"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <div className="absolute top-0 right-0 w-10 h-10 bg-red-500/15 blur-xl rounded-full -translate-y-3 translate-x-3" />
          <div className="relative">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-medium text-white/50 truncate">AI智能组</span>
              <AlertTriangleIcon className="w-2.5 h-2.5 text-red-400 shrink-0" />
            </div>
            <div className="text-lg sm:text-3xl font-black tracking-tight text-red-400 tabular-nums leading-none">
              {aiSatisfaction?.rate.toFixed(1)}
              <span className="text-[10px] sm:text-sm font-bold text-red-400/50">%</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="text-[9px] font-semibold text-red-400">
                ↓{Math.abs(aiSatisfaction?.change ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl
                     bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-2.5"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)" }}
        >
          <div className="absolute top-0 right-0 w-10 h-10 bg-cyan-500/10 blur-xl rounded-full -translate-y-3 translate-x-3" />
          <div className="relative">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[9px] font-medium text-white/50 truncate">当日转化率</span>
              {isConvLow && <AlertTriangleIcon className="w-2.5 h-2.5 text-orange-400 shrink-0" />}
            </div>
            <div className={`text-lg sm:text-3xl font-black tracking-tight tabular-nums leading-none ${isConvLow ? "text-orange-400" : "text-white"}`}>
              {dailyConversion.toFixed(1)}
              <span className={`text-[10px] sm:text-sm font-bold ${isConvLow ? "text-orange-400/50" : "text-white/50"}`}>%</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="text-[9px] font-semibold text-white/50">
                月均 {monthlyConversion.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

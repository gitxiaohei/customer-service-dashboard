import { useMemo } from "react";
import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { AlertTriangleIcon } from "lucide-react";
import type { ISatisfactionItem } from "@shared/types";

function SatisfactionCard({ item }: { item: ISatisfactionItem }) {
  const isDanger = item.isAbnormal && item.change < -2;
  const isWarning = item.isAbnormal && item.change >= -2;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-xl border backdrop-blur-xl p-3 sm:p-4"
      style={{
        background: isDanger
          ? "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)"
          : isWarning
          ? "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        borderColor: isDanger
          ? "rgba(239,68,68,0.3)"
          : isWarning
          ? "rgba(249,115,22,0.3)"
          : "rgba(255,255,255,0.1)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {isDanger && (
        <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/15 blur-xl rounded-full -translate-y-4 translate-x-4" />
      )}
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-white/50">{item.label}</span>
          {isDanger && <AlertTriangleIcon className="w-3 h-3 text-red-400" />}
        </div>
        <div
          className={`text-xl sm:text-2xl font-bold tracking-tight tabular-nums ${
            isDanger ? "text-red-400" : isWarning ? "text-orange-400" : "text-white"
          }`}
        >
          {item.rate.toFixed(1)}%
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span
            className={`text-[10px] font-medium ${
              item.change < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {item.change > 0 ? "↑" : "↓"}
            {Math.abs(item.change).toFixed(2)}%
          </span>
          <span className="text-[10px] text-white/40">较前日</span>
        </div>
      </div>
    </motion.div>
  );
}

function SatisfactionChart({ data }: { data: ISatisfactionItem[] }) {
  const option = useMemo(
    () => ({
      grid: { left: 60, right: 20, top: 10, bottom: 10 },
      xAxis: {
        type: "value",
        min: 80,
        max: 100,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.08)", type: "dashed" } },
        axisLabel: { formatter: "{value}%", color: "rgba(255,255,255,0.4)", fontSize: 10 },
      },
      yAxis: {
        type: "category",
        data: data.map((d) => d.label).reverse(),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 500 },
      },
      series: [
        {
          type: "bar",
          data: [...data]
            .reverse()
            .map((d) => ({
              value: d.rate,
              itemStyle: {
                color: d.isAbnormal
                  ? {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        { offset: 0, color: "rgba(239,68,68,0.8)" },
                        { offset: 1, color: "rgba(239,68,68,0.4)" },
                      ],
                    }
                  : {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [
                        { offset: 0, color: "rgba(99,102,241,0.8)" },
                        { offset: 1, color: "rgba(99,102,241,0.4)" },
                      ],
                    },
              },
            })),
          barWidth: 18,
          label: {
            show: true,
            position: "right",
            formatter: "{c}%",
            color: "rgba(255,255,255,0.8)",
            fontSize: 10,
            fontWeight: 600,
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(15,23,42,0.9)",
        borderColor: "rgba(255,255,255,0.1)",
        textStyle: { color: "rgba(255,255,255,0.9)", fontSize: 12 },
        extraCssText: "border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);",
      },
    }),
    [data]
  );

  return <ReactECharts option={option} style={{ height: 160 }} />;
}

export function SatisfactionSection({
  data,
}: {
  data: ISatisfactionItem[];
}) {
  return (
    <section className="w-full space-y-3">
      <h2 className="text-sm font-bold tracking-tight text-white">满意率</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {data.map((item) => (
          <SatisfactionCard key={item.label} item={item} />
        ))}
      </div>
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl p-3 sm:p-4"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <h3 className="text-xs font-semibold text-white/70 mb-2">各职场满意率对比</h3>
        <SatisfactionChart data={data} />
      </div>
    </section>
  );
}

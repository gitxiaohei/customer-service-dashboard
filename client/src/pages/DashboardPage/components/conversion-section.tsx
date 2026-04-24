import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { IConversionData } from "@shared/types";

export function ConversionSection({
  data,
}: {
  data: IConversionData;
}) {
  const conversionCards = [
    {
      label: "当日转化率",
      value: data.daily,
      unit: "%",
      isLow: data.daily < data.monthlyAvg,
    },
    { label: "4月月均转化率", value: data.monthlyAvg, unit: "%" },
    { label: "去年同期", value: data.lastYear, unit: "%" },
    {
      label: "同比",
      value: data.yoy,
      unit: "%",
      isPositive: data.yoy > 0,
    },
  ];

  const chartOption = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(15,23,42,0.9)",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 0,
        textStyle: {
          color: "rgba(255,255,255,0.9)",
          fontSize: 12,
          fontWeight: 600,
        },
        extraCssText:
          "border-radius: 12px; box-shadow: 0 8px 12px -3px rgba(0,0,0,0.3); padding: 10px 14px;",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["当日", "4月月均", "去年同期"],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "rgba(255,255,255,0.4)",
          fontSize: 11,
          fontWeight: 500,
        },
      },
      yAxis: {
        type: "value",
        max: 60,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,0.08)",
            width: 1,
          },
        },
      },
      series: [
        {
          type: "bar",
          data: [
            {
              value: data.daily,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "rgba(249,115,22,0.9)" },
                    { offset: 1, color: "rgba(249,115,22,0.3)" },
                  ],
                },
                borderRadius: [6, 6, 0, 0],
              },
            },
            {
              value: data.monthlyAvg,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "rgba(99,102,241,0.9)" },
                    { offset: 1, color: "rgba(99,102,241,0.3)" },
                  ],
                },
                borderRadius: [6, 6, 0, 0],
              },
            },
            {
              value: data.lastYear,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: "rgba(148,163,184,0.8)" },
                    { offset: 1, color: "rgba(148,163,184,0.2)" },
                  ],
                },
                borderRadius: [6, 6, 0, 0],
              },
            },
          ],
          barWidth: "35%",
          label: {
            show: true,
            position: "top",
            formatter: "{c}%",
            color: "rgba(255,255,255,0.8)",
            fontSize: 12,
            fontWeight: 700,
          },
        },
      ],
    }),
    [data]
  );

  return (
    <section className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-tight text-white">转化率</h2>
        {data.daily < data.monthlyAvg && (
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <TrendingDownIcon className="w-3.5 h-3.5 text-orange-400" />
            <span>当日低于月均</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {conversionCards.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border backdrop-blur-xl p-3 sm:p-4"
            style={{
              background: item.isLow
                ? "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 100%)"
                : item.isPositive
                ? "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              borderColor: item.isLow
                ? "rgba(249,115,22,0.25)"
                : item.isPositive
                ? "rgba(34,197,94,0.25)"
                : "rgba(255,255,255,0.1)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[11px] font-medium text-white/50">{item.label}</span>
              {item.isLow && <TrendingDownIcon className="w-3.5 h-3.5 text-orange-400" />}
              {item.isPositive && <TrendingUpIcon className="w-3.5 h-3.5 text-green-400" />}
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-xl sm:text-2xl font-bold tracking-tight ${
                  item.isLow
                    ? "text-orange-400"
                    : item.isPositive
                    ? "text-green-400"
                    : "text-white"
                }`}
              >
                {item.value}
              </span>
              <span
                className={`text-sm font-semibold ${
                  item.isLow
                    ? "text-orange-400/60"
                    : item.isPositive
                    ? "text-green-400/60"
                    : "text-white/40"
                }`}
              >
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl p-3 sm:p-4"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <h3 className="text-xs font-semibold text-white/70 mb-2">转化率对比</h3>
        <ReactECharts
          option={chartOption}
          style={{ height: 180 }}
          opts={{ renderer: "svg" }}
        />
      </div>
    </section>
  );
}

import { useState, useEffect, useCallback } from "react";
import { CalendarIcon, LightbulbIcon, Loader2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { HeroBanner } from "./components/hero-banner";
import { SatisfactionSection } from "./components/satisfaction-section";
import { ConversionSection } from "./components/conversion-section";
import { ExperienceScoreSection } from "./components/experience-score-section";
import type { IDayData } from "@shared/types";

const BUILTIN_DATA: Record<string, IDayData> = {
  "2026-04-16": {
    date: "2026-04-16",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.13%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.24%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "40.42小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.73%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.30%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.34小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.04%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.69, change: 0, isAbnormal: false },
      { label: "好伙伴", rate: 98.56, change: 0 },
      { label: "春客", rate: 97.80, change: 0 },
      { label: "AI智能组", rate: 94.44, change: 0, isAbnormal: false },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月16日数据整体表现平稳，满意率处于正常区间，详细数据参考当日完整报告。",
  },
  "2026-04-17": {
    date: "2026-04-17",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.14%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.20%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "41.00小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.74%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.25%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.40小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.04%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.20, change: -0.49, isAbnormal: true },
      { label: "好伙伴", rate: 98.20, change: -0.36 },
      { label: "春客", rate: 97.62, change: -0.18 },
      { label: "AI智能组", rate: 82.05, change: -12.39, isAbnormal: true },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月17日满意率略有下滑，AI智能组大幅下降12.39个百分点，需关注。",
  },
  "2026-04-18": {
    date: "2026-04-18",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.12%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.18%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "39.80小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.75%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.26%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.30小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.03%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.61, change: 0.41, isAbnormal: false },
      { label: "好伙伴", rate: 98.54, change: 0.34 },
      { label: "春客", rate: 98.30, change: 0.68 },
      { label: "AI智能组", rate: 72.73, change: -9.32, isAbnormal: true },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月18日整体满意率回升，春客表现优异，但AI智能组满意度骤降至72.73%，需重点关注。",
  },
  "2026-04-19": {
    date: "2026-04-19",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.13%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.22%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "40.10小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.73%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.28%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.35小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.04%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.39, change: -0.22, isAbnormal: false },
      { label: "好伙伴", rate: 98.52, change: -0.02 },
      { label: "春客", rate: 97.90, change: -0.40 },
      { label: "AI智能组", rate: 70.00, change: -2.73, isAbnormal: true },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月19日满意率小幅回落，AI智能组满意度持续低迷，人工客服表现稳定。",
  },
  "2026-04-20": {
    date: "2026-04-20",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.12%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.20%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "39.50小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.76%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.31%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.28小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.03%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.66, change: 0.27, isAbnormal: false },
      { label: "好伙伴", rate: 98.79, change: 0.27 },
      { label: "春客", rate: 97.81, change: -0.09 },
      { label: "AI智能组", rate: 90.70, change: 20.70, isAbnormal: false },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月20日满意率明显回升，AI智能组大幅反弹至90.70%，人工客服保持高位，整体趋势向好。",
  },
  "2026-04-21": {
    date: "2026-04-21",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.14%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.17%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "40.80小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.74%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.28%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.38小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.04%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.10, change: -0.56, isAbnormal: true },
      { label: "好伙伴", rate: 98.82, change: 0.03 },
      { label: "春客", rate: 97.22, change: -0.59, isAbnormal: true },
      { label: "AI智能组", rate: 88.24, change: -2.46, isAbnormal: true },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月21日满意率小幅下滑，春客和AI智能组均有下降，好伙伴保持稳定。",
  },
  "2026-04-22": {
    date: "2026-04-22",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.13%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.15%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "40.20小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.74%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.27%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.32小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.04%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 97.21, change: 0.11, isAbnormal: false },
      { label: "好伙伴", rate: 98.51, change: -0.31 },
      { label: "春客", rate: 97.11, change: -0.11 },
      { label: "AI智能组", rate: 92.16, change: 3.92, isAbnormal: false },
    ],
    conversion: { daily: 0, monthlyAvg: 0, lastYear: 0, yoy: 0 },
    summary: "4月22日满意率小幅回升，AI智能组表现改善，春客和好伙伴保持平稳。",
  },
  "2026-04-23": {
    date: "2026-04-23",
    experienceScore: [
      { name: "宝贝质量", value: "4.94分", score: 4.94, benchmark: "超过92%同行" },
      { name: "物流速度", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "服务保障", value: "5.00分", score: 5.00, benchmark: "超过99%同行" },
      { name: "商品负反馈率", value: "0.1436%", score: 5.0, benchmark: "得分5.0分" },
      { name: "商品好评率", value: "97.15%", score: 4.8, benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: "99.99%", score: 5.0, benchmark: "得分5.0分" },
      { name: "物流到货时长", value: "40.42小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "3分钟人工响应率", value: "99.74%", score: 5.0, benchmark: "得分5.0分" },
      { name: "旺旺满意度", value: "97.27%", score: 5.0, benchmark: "得分5.0分" },
      { name: "退款处理时长", value: "1.34小时", score: 5.0, benchmark: "得分5.0分" },
      { name: "平台求助率", value: "0.0363%", score: 5.0, benchmark: "得分5.0分" },
    ],
    satisfaction: [
      { label: "整体", rate: 96.47, change: -0.74, isAbnormal: true },
      { label: "好伙伴", rate: 98.38, change: -0.13 },
      { label: "春客", rate: 97.01, change: -0.10 },
      { label: "AI智能组", rate: 88.00, change: -4.16, isAbnormal: true },
    ],
    conversion: {
      daily: 41.34,
      monthlyAvg: 50.03,
      lastYear: 47.73,
      yoy: 2.30,
    },
    summary: "整体满意率小幅回落至96.47%，主因AI智能组下滑至88%严重拖累整体。人工服务高位稳定，物流与服务保障表现优异，转化率同比提升2.30%趋势向好。AI组服务质量亟待改善。",
  },
};

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function DatePicker({
  value,
  onChange,
  availableDates,
}: {
  value: string;
  onChange: (date: string) => void;
  availableDates: string[];
}) {
  const validInitial = availableDates.includes(value)
    ? value
    : availableDates[availableDates.length - 1] || value;
  const selectedDate = new Date(validInitial + "T00:00:00");
  const [open, setOpen] = useState(false);
  const [tentative, setTentative] = useState<Date | undefined>(selectedDate);

  const disabledDays = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return !availableDates.includes(dateStr);
  };

  const handleConfirm = () => {
    if (!tentative) { setOpen(false); return; }
    const dateStr = tentative.toISOString().split("T")[0];
    if (availableDates.includes(dateStr)) {
      onChange(dateStr);
    } else {
      // fallback to last valid date
      const fallback = availableDates[availableDates.length - 1];
      if (fallback) onChange(fallback);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-1.5 px-2 py-1.5 text-xs bg-white/10 backdrop-blur-md border border-white/20 rounded-lg
                     hover:bg-white/15 transition-colors"
        >
          <CalendarIcon className="w-3.5 h-3.5 text-white/50" />
          <span className="text-white">{formatDateLabel(value)}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[hsl(220_20%_15%)] border-white/10" align="end">
        <div className="flex flex-col">
          <div className="p-2">
            <Calendar
              mode="single"
              selected={tentative}
              onSelect={(date) => setTentative(date)}
              disabled={disabledDays}
              defaultMonth={tentative}
              className="text-white"
            />
          </div>
          <div className="flex justify-end gap-2 px-3 pb-3">
            <button
              onClick={() => { setTentative(selectedDate); setOpen(false); }}
              className="px-3 py-1.5 text-xs text-white/60 hover:text-white border border-white/20 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              disabled={!tentative || disabledDays(tentative)}
              className="px-3 py-1.5 text-xs bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/10 disabled:text-white/30 text-white rounded-lg transition-colors"
            >
              确定
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DailySummarySection({ summary }: { summary: string }) {
  return (
    <section className="w-full">
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl p-4"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.03) 100%)",
          borderColor: "rgba(99,102,241,0.2)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/10 blur-2xl rounded-full -translate-y-6 translate-x-6" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <LightbulbIcon className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold tracking-tight text-white">当日小结</h2>
          </div>
          <p className="text-xs leading-relaxed text-white/70">{summary}</p>
        </div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const availableDates = Object.keys(BUILTIN_DATA);
  const latestDate = availableDates[availableDates.length - 1] || "";
  const [selectedDate, setSelectedDate] = useState<string>(latestDate);
  const [currentData, setCurrentData] = useState<IDayData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = BUILTIN_DATA[selectedDate];
    setTimeout(() => {
      setCurrentData(data || null);
      setLoading(false);
    }, 300);
  }, [selectedDate]);

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="w-8 h-8 text-white/50 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-6 overflow-x-hidden">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold tracking-tight text-white truncate">
              天猫 ubras 客服数据日报
            </h1>
            {availableDates.length > 0 && (
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                availableDates={availableDates}
              />
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-3 space-y-4 w-full">
        {!currentData && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="text-white/50">当日无数据</p>
          </div>
        )}

        {currentData && (
          <>
            <HeroBanner data={currentData} />
            <SatisfactionSection data={currentData.satisfaction} />
            <ConversionSection data={currentData.conversion} />
            <ExperienceScoreSection data={currentData.experienceScore} />
            <DailySummarySection summary={currentData.summary} />
          </>
        )}
      </main>
    </div>
  );
}

// 前后端共享类型定义
// shared 是最底层模块，不依赖 client 或 server

export interface IExperienceMetric {
  name: string;
  value: string;
  score: number;
  benchmark: string;
}

export interface ISatisfactionItem {
  label: string;
  rate: number;
  change: number;
  isAbnormal?: boolean;
}

export interface IConversionItem {
  label: string;
  value: string;
}

export interface IConversionData {
  daily: number;
  monthlyAvg: number;
  lastYear: number;
  yoy: number;
}

export interface IDayData {
  date: string;
  experienceScore: IExperienceMetric[];
  satisfaction: ISatisfactionItem[];
  conversion: IConversionData;
  summary: string;
}

export interface IDashboardData {
  date: string;
  experienceScore: IExperienceMetric[];
  satisfaction: ISatisfactionItem[];
  conversion: IConversionItem[];
}

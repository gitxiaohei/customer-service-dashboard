## 应用概览

天猫 ubras 客服数据日报可视化看板，展示真实体验分、满意率、转化率三大核心板块，异常数据高亮标注，适合日常查看。

## 需求拆解文档

# 天猫 ubras 客服数据日报 - 需求拆解文档

## 产品概述

- **产品类型**: 数据看板/仪表盘
- **场景类型**: dashboard
- **目标用户**: 客服运营管理人员
- **核心价值**: 每日快速掌握客服核心指标表现，及时发现异常
- **界面语言**: 中文
- **主题偏好**: 浅色
- **导航模式**: Dashboard Header（分析标题 + 日期标签）

---

## 页面结构

> **说明**：Dashboard 为单页场景，以下为页面区块结构

**页面文件**: `DashboardPage/DashboardPage.tsx`

| 区块名称 | 区块说明 |
|---------|---------|
| Header | 分析标题「📊 天猫 ubras 客服数据日报」+ 日期标签 |
| 真实体验分板块 | 11项指标卡片+评分展示，网格布局 |
| 满意率板块 | 各职场对比（整体/好伙伴/春客/AI智能组），含前日变化标注，异常高亮 |
| 转化率板块 | 当日转化率 + 4月月均 + 去年同期 + 同比，卡片+图表结合 |

---

## 数据分析

### 数据文件概览
- **文件**: 用户提供的静态数据（客服数据日报）
- **字段**: 指标名称、数值、同比/环比变化
- **数据量**: 11项体验分指标 + 4项满意率指标 + 4项转化率指标
- **维度与指标**: 维度（指标类别/职场分组）/ 数值指标（分数/百分比/时长）

### 指标规划
| 指标名称 | 计算方式 | 数据字段 |
|---------|---------|---------|
| 真实体验分综合 | 11项指标综合展示 | 宝贝质量、物流速度、服务保障等11项 |
| 整体满意率 | 直接展示 | 96.47% |
| 各职场满意率 | 分组对比 | 好伙伴、春客、AI智能组 |
| 当日转化率 | 直接展示 | 41.34% |
| 转化率同比 | 当日-去年同期 | ↑2.30% |

### 图表规划
| 图表名称 | 图表类型 | 使用字段 | 分析目的 |
|---------|---------|---------|---------|
| 体验分指标卡片 | 卡片网格 | 11项指标 | 快速浏览各项得分 |
| 满意率职场对比 | 横向条形图 | 各职场满意率 | 对比各职场表现 |
| 转化率对比 | 柱状图 | 当日/月均/去年同期 | 转化率趋势对比 |

---

## AI 洞察方向

- [异常预警]: AI智能组满意率下降4.16%，远低于其他组 | 数据证据：AI智能组88.00% ↓4.16%，其他组均>96% | 建议行动：排查AI智能组服务流程
- [优秀表现]: 物流速度、服务保障等多项指标满分5.0 | 数据证据：6项指标得分5.0，超过99%同行 | 建议行动：保持当前服务标准
- [转化预警]: 当日转化率低于月均水平 | 数据证据：当日41.34% < 月均50.03% | 建议行动：分析当日转化漏斗，优化话术

---

## 功能列表

- **Dashboard 整体功能**:
  - **页面目标**: 每日客服数据监控与异常预警
  - **功能点**:
    - 真实体验分展示: 11项指标卡片网格，展示得分与同行对比
    - 满意率对比: 各职场满意率横向对比，异常数据红色/橙色高亮
    - 转化率分析: 当日/月均/去年同期对比，同比变化标注
    - 异常高亮: 前日变化超过0.5%的指标用红色/橙色标注
    - 数据卡片交互: hover 有轻微放大效果

## 设计文档 (Design Guidelines)

# UI 设计指南

> **场景类型**: `dashboard`（数据可视化设计）
> **确认检查**: 本指南适用于数据看板、仪表盘、监控中心、BI 报表等场景。

> Section 1-2 为设计意图与决策上下文。Code agent 实现时以 Section 3 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 参考模板
- **模板名称**: slate-minimal.md
- **选择理由**: 专为"极简克制的数据叙事（如 SaaS 仪表盘、产品分析、运营周报）"设计，契合客服数据日报的简洁专业需求
- **调整说明**: 基于模板的灰阶+indigo配色体系，增加异常数据的红色/橙色高亮语义色；圆角体系适度缩小以适应数据密集型看板

### 1.2 内容理解
- **目标用户**: 客服运营管理人员，每日查看数据日报，需要快速扫描关键指标
- **核心目的**: 监控客服指标，及时发现异常，辅助决策
- **期望情绪**: 清晰、可控、专业、高效
- **数据特性**: 19项核心指标，分3大板块，需要卡片+图表结合展示

### 1.3 设计语言
- **Aesthetic Direction**: 极简克制的数据叙事风格，大量留白，清晰的视觉层级
- **Visual Signature**: 超大圆角卡片、slate灰阶体系、indigo强调色、异常数据红色高亮
- **Emotional Tone**: 冷静专业（数据驱动的理性感）+ 适度温暖（通过圆角和留白软化）
- **Design Style**: Slate Minimal 风格，杂志式排版，呼吸感留白

## 2. Design Principles (设计理念)

1. **数据优先**: 数值突出显示，标签使用 muted 色，让数据成为视觉焦点
2. **异常醒目**: 异常数据使用红色/橙色高亮，确保一眼识别问题
3. **层次清晰**: 三大板块用标题分隔，卡片网格保持视觉节奏一致
4. **克制装饰**: 无多余装饰线，用留白和圆角构建视觉层次
5. **响应式适配**: 桌面端多列布局，移动端单列堆叠

## 3. Color System (色彩系统)

**配色设计理由**: 基于 slate-minimal 模板的灰阶+indigo体系，专业冷静适合数据看板；增加红色/橙色用于异常数据高亮

### 3.1 主题颜色

| 角色 | HSL 值 | 用途说明 |
|-----|--------|---------|
| bg | hsl(210 20% 98%) | 页面背景色（slate-50） |
| surface | hsl(0 0% 100%) | 卡片/容器背景色（white） |
| header | hsl(210 20% 98%) | Header 区域背景色（同页面背景） |
| text | hsl(222 84% 5%) | 主文本颜色（slate-900） |
| textMuted | hsl(215 16% 65%) | 次要/辅助文本颜色（slate-400） |
| primary | hsl(243 75% 59%) | 主交互行动色（indigo-600） |
| accent | hsl(244 75% 65%) | 次级交互反馈/装饰色（indigo-500） |
| border | hsl(210 20% 94%) | 边框颜色（slate-100） |
| warning | hsl(24 94% 50%) | 警告/异常高亮色（orange-500） |
| danger | hsl(0 72% 51%) | 严重异常色（red-500） |
| success | hsl(142 71% 45%) | 正向变化色（green-500） |

### 3.2 图表配色

| 用途 | 颜色 | 说明 |
|-----|-----|-----|
| 系列色 1 | hsl(243 75% 59%) | indigo-600，主要数据系列 |
| 系列色 2 | hsl(215 20% 35%) | slate-600，次要数据系列 |
| 系列色 3 | hsl(210 20% 80%) | slate-300，第三数据系列 |
| 系列色 4 | hsl(244 75% 75%) | indigo-300，第四数据系列 |
| 上升/正向 | hsl(142 71% 45%) | 固定语义色 |
| 下降/负向 | hsl(0 72% 51%) | 固定语义色 |
| 警告/异常 | hsl(24 94% 50%) | 异常高亮色 |

## 4. Typography (字体排版)
- **Heading**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif
- **Body**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif
- **数字专用**: 'Inter', tabular-nums（用于指标卡片数值）
- **字体导入**: @import url('https://miaoda.feishu.cn/fonts/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700;900&display=swap');

## 5. Page Structure (页面结构)

> Dashboard 是单页场景，不需要 Layout 组件、Sidebar 或 Topbar。

### 5.1 页面骨架

```tsx
<div className="min-h-screen bg-[hsl(210_20%_98%)]">
  {/* Header */}
  <header className="w-full bg-[hsl(210_20%_98%)] py-6 px-4">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-black tracking-tight text-[hsl(222_84%_5%)]">
        📊 天猫 ubras 客服数据日报
      </h1>
      <p className="text-sm text-[hsl(215_16%_65%)] mt-1">{date}</p>
    </div>
  </header>

  {/* Main Content */}
  <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
    {/* 真实体验分板块 */}
    <section>
      <h2 className="text-xl font-black tracking-tight mb-4">真实体验分</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* 11项指标卡片 */}
      </div>
    </section>

    {/* 满意率板块 */}
    <section>
      <h2 className="text-xl font-black tracking-tight mb-4">满意率</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 4个职场满意率卡片 */}
      </div>
      {/* 满意率对比图表 */}
    </section>

    {/* 转化率板块 */}
    <section>
      <h2 className="text-xl font-black tracking-tight mb-4">转化率</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 4项转化率指标 */}
      </div>
      {/* 转化率对比图表 */}
    </section>
  </main>
</div>
```

### 5.2 关键样式参数

| 元素 | 样式 | 说明 |
|-----|-----|-----|
| 页面背景 | `background: hsl(210 20% 98%)` | slate-50 极浅灰蓝 |
| 内容容器 | `max-width: 80rem; margin: 0 auto; padding: 2rem 1rem` | 居中对齐 |
| Header 区域 | 通栏全宽，无背景 | 与页面背景一致 |
| 卡片圆角 | `rounded-2xl` (1rem) | 适度圆角，专业感 |
| 卡片间距 | `gap: 1rem` ~ `gap: 1.5rem` | 保持呼吸感 |
| 区块间距 | `space-y-10` (40px) | 板块间留白 |

### 5.3 导航规则
- 禁止添加 Sidebar
- 禁止添加 Topbar 导航
- 禁止使用 `sticky` 或 `fixed` 定位 Header

## 6. Components (组件指南)

### Dashboard Header
- 通栏布局，`width: 100%`
- 标题：`text-3xl font-black tracking-tight`
- 日期：`text-sm text-muted`
- 内边距：`py-6 px-4`

### 指标卡片 (KPI Card)
- 背景：`bg-white border border-slate-100 shadow-sm`
- 圆角：`rounded-2xl`
- 内边距：`p-6`
- 数值：`text-3xl font-bold tracking-tight`
- 标签：`text-sm text-muted`
- hover：`hover:scale-[1.02] transition-all duration-300`
- 异常态：`border-orange-200 bg-orange-50` + 红色/橙色文字

### 图表容器 (Chart Card)
- 背景：`bg-white border border-slate-100 shadow-sm`
- 圆角：`rounded-2xl`
- 内边距：`p-6`
- 标题：`text-lg font-bold`，位于左上角
- 图表高度：`h-64` (256px)

### 异常高亮标注
- 警告色：`text-orange-500 bg-orange-50 border-orange-200`
- 危险色：`text-red-500 bg-red-50 border-red-200`
- 图标：⚠️ 或 AlertTriangleIcon
- 适用条件：前日变化超过0.5%的指标

## 7. Visual Effects (视觉效果)
- **圆角**: `rounded-2xl` (1rem) 卡片，`rounded-xl` (0.75rem) 小组件
- **阴影**: `shadow-sm` 普通卡片，`shadow-md` hover 态
- **间距**: 卡片内 `p-6`，卡片间 `gap-4`，区块间 `space-y-10`
- **装饰手法**: 无多余装饰，用留白和圆角构建层次

## 8. Flexibility Note (灵活性说明)
- 允许：卡片圆角在 `rounded-xl` ~ `rounded-3xl` 范围内微调
- 允许：间距在 0.75rem ~ 1.5rem 范围内调整
- 禁止：替换主色/强调色，改变整体灰阶体系
- 禁止：添加装饰性元素破坏极简风格

## 9. Constraints (禁止事项)
- 未经用户要求添加 Sidebar / Topbar
- 禁止添加筛选/刷新/导出/分享按钮
- 禁止使用透明背景或渐变背景（保持简洁）
- 禁止使用表情符号作为主要视觉元素（除标题外）

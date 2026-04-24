# 客服数据日报看板 - 数据推送方案

## 问题
当前平台为静态托管（client-side only），不支持后端 API 路由，数据库无法从浏览器端直接访问。

## 新方案
定时任务跑完后，将当天数据以 JSON 形式写入静态文件，看板页面从静态 JSON 文件读取数据并展示。

## 数据文件
文件路径：`/home/gem/workspace/agent/workspace/public/dashboard_data.json`

字段结构：
```json
{
  "report_date": "2026-04-23",
  "dates": ["2026-04-16", "2026-04-17", ..., "2026-04-23"],
  "data": {
    "report_date": "2026-04-23",
    "overall_satisfaction": 96.47,
    "hao_huo_ban_satisfaction": 98.38,
    "chun_ke_satisfaction": 97.01,
    "ai_satisfaction": 88.00,
    "satisfaction_change": -0.53,
    "daily_conversion_rate": 41.34,
    "monthly_conversion_rate": 50.03,
    "last_year_conversion_rate": 47.73,
    "conversion_change": 2.30,
    "product_quality_score": 4.94,
    "logistics_speed_score": 5.00,
    "service_security_score": 5.00,
    "product_negative_rate": 0.001436,
    "product_good_rate": 97.15,
    "pickup_timely_rate": 99.99,
    "logistics_duration_hours": 40.42,
    "response_rate": 99.74,
    "wangwang_satisfaction": 97.27,
    "refund_duration_hours": 1.34,
    "platform_help_rate": 0.000363,
    "summary": "今日小结内容..."
  }
}
```

## 改造要求
1. 修改看板，从 `/dashboard_data.json` 读取数据
2. 日期选择器动态从 `data.dates` 数组读取
3. 切换日期时根据 `data.report_date` 匹配显示
4. 保持现有 UI 不变
# 客服数据日报看板 - 数据源改造

## 背景
已建立 PostgreSQL 数据库表 `customer_service_daily`，用于存储每日结构化数据。

## 数据表字段
- report_date: 日期 (DATE, PK)
- overall_satisfaction: 整体满意率 (DECIMAL)
- hao_huo_ban_satisfaction: 好伙伴满意率 (DECIMAL)
- chun_ke_satisfaction: 春客满意率 (DECIMAL)
- ai_satisfaction: AI智能组满意率 (DECIMAL)
- satisfaction_change: 满意率较前日变化 (DECIMAL)
- daily_conversion_rate: 当日转化率 (DECIMAL)
- monthly_conversion_rate: 月均转化率 (DECIMAL)
- last_year_conversion_rate: 去年同期转化率 (DECIMAL)
- conversion_change: 转化率同比变化 (DECIMAL)
- product_quality_score: 宝贝质量分
- logistics_speed_score: 物流速度分
- service_security_score: 服务保障分
- product_negative_rate: 商品负反馈率
- product_good_rate: 商品好评率
- pickup_timely_rate: 揽收及时率
- logistics_duration_hours: 物流到货时长
- response_rate: 3分钟响应率
- wangwang_satisfaction: 旺旺满意度
- refund_duration_hours: 退款处理时长
- platform_help_rate: 平台求助率
- summary: 当日小结 (TEXT)

## 改造要求
看板数据改为从数据库实时读取：
1. 用户选择日期后，查询该日期的数据并展示
2. 读取命令：`npx -y @lark-apaas/miaoda-data-cli db sql --json "SELECT * FROM customer_service_daily WHERE report_date = 'YYYY-MM-DD'"`
3. 日期范围根据数据库中实际有数据的日期动态决定（查询 DISTINCT report_date 排序）
4. 保持现有 UI 不变（双列卡片、展开收起、底部小结等）
5. 选择无数据的日期时显示"当日无数据"
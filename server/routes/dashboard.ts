import { Router } from "express";
import { db } from "@lark-apaas/express-core";
import { sql } from "drizzle-orm";

const router = Router();

// GET /api/dashboard/dates - 返回所有可用日期列表
router.get("/dates", async (_req, res) => {
  try {
    const result = await db.execute(
      sql`SELECT DISTINCT report_date FROM customer_service_daily ORDER BY report_date`
    );
    const dates = (result as unknown as Array<{ report_date: string | Date }>).map(
      (row) => {
        const d =
          row.report_date instanceof Date
            ? row.report_date
            : new Date(row.report_date);
        return d.toISOString().split("T")[0];
      }
    );
    res.json({ dates });
  } catch (error) {
    console.error("Failed to fetch dates:", error);
    res.status(500).json({ error: "Failed to fetch dates" });
  }
});

// GET /api/dashboard/:date - 返回指定日期的数据
router.get("/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const result = await db.execute(
      sql`SELECT * FROM customer_service_daily WHERE report_date = ${date}`
    );
    const rows = result as unknown as Array<Record<string, unknown>>;

    if (rows.length === 0) {
      res.status(404).json({ error: "No data found for this date" });
      return;
    }

    const row = rows[0];

    const data = {
      date,
      experienceScore: [
        {
          name: "宝贝质量",
          value: `${row.product_quality_score}分`,
          score: Number(row.product_quality_score),
          benchmark: getBenchmark(Number(row.product_quality_score)),
        },
        {
          name: "物流速度",
          value: `${row.logistics_speed_score}分`,
          score: Number(row.logistics_speed_score),
          benchmark: getBenchmark(Number(row.logistics_speed_score)),
        },
        {
          name: "服务保障",
          value: `${row.service_security_score}分`,
          score: Number(row.service_security_score),
          benchmark: getBenchmark(Number(row.service_security_score)),
        },
        {
          name: "商品负反馈率",
          value: `${(Number(row.product_negative_rate) * 100).toFixed(4)}%`,
          score: 5.0,
          benchmark: "得分5.0分",
        },
        {
          name: "商品好评率",
          value: `${row.product_good_rate}%`,
          score: Number(row.product_good_rate) >= 97 ? 5.0 : Number(row.product_good_rate) >= 95 ? 4.5 : 4.0,
          benchmark: "得分4.8分",
        },
        {
          name: "48小时揽收及时率",
          value: `${row.pickup_timely_rate}%`,
          score: 5.0,
          benchmark: "得分5.0分",
        },
        {
          name: "物流到货时长",
          value: `${row.logistics_duration_hours}小时`,
          score: Number(row.logistics_duration_hours) <= 42 ? 5.0 : Number(row.logistics_duration_hours) <= 46 ? 4.9 : 4.8,
          benchmark: "得分5.0分",
        },
        {
          name: "3分钟人工响应率",
          value: `${row.response_rate}%`,
          score: 5.0,
          benchmark: "得分5.0分",
        },
        {
          name: "旺旺满意度",
          value: `${row.wangwang_satisfaction}%`,
          score: 5.0,
          benchmark: "得分5.0分",
        },
        {
          name: "退款处理时长",
          value: `${row.refund_duration_hours}小时`,
          score: Number(row.refund_duration_hours) <= 1.5 ? 5.0 : Number(row.refund_duration_hours) <= 2.0 ? 4.9 : 4.8,
          benchmark: "得分5.0分",
        },
        {
          name: "平台求助率",
          value: `${(Number(row.platform_help_rate) * 100).toFixed(4)}%`,
          score: 5.0,
          benchmark: "得分5.0分",
        },
      ],
      satisfaction: [
        {
          label: "整体",
          rate: Number(row.overall_satisfaction),
          change: Number(row.satisfaction_change),
          isAbnormal: Math.abs(Number(row.satisfaction_change)) >= 0.3,
        },
        {
          label: "好伙伴",
          rate: Number(row.hao_huo_ban_satisfaction),
          change: 0,
        },
        {
          label: "春客",
          rate: Number(row.chun_ke_satisfaction),
          change: 0,
        },
        {
          label: "AI智能组",
          rate: Number(row.ai_satisfaction),
          change: 0,
          isAbnormal: Number(row.ai_satisfaction) < 92,
        },
      ],
      conversion: {
        daily: Number(row.daily_conversion_rate),
        monthlyAvg: Number(row.monthly_conversion_rate),
        lastYear: Number(row.last_year_conversion_rate),
        yoy: Number(row.conversion_change),
      },
      summary: String(row.summary || ""),
    };

    res.json(data);
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

function getBenchmark(score: number): string {
  if (score >= 5.0) return "超过99%同行";
  if (score >= 4.9) return "超过95%同行";
  if (score >= 4.8) return "超过90%同行";
  if (score >= 4.5) return "超过85%同行";
  return "超过80%同行";
}

export default router;

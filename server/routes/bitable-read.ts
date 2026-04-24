import { Router } from "express";

const APP_ID = "cli_a94a7a5d75e2dcc4";
const APP_SECRET = "Th5MWqGVQsnnGvmyfxboaeR7QXmTSqE5";
const BITABLE_APP = "Hk8VbMKc4aCLDeswemRcpUtens8";
const TABLE_ID = "tblSFCm9VrFeZyd9";

async function getAppToken(): Promise<string> {
  const res = await fetch("https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET }),
  });
  const data = await res.json() as { app_access_token?: string };
  return data.app_access_token || "";
}

async function fetchBitable(path: string, token: string): Promise<unknown> {
  const res = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP}/tables/${TABLE_ID}${path}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.json();
}

const router = Router();

function tsToDateStr(ts: number | string): string {
  const ms = typeof ts === "string" ? parseInt(ts) : ts;
  const d = new Date(ms);
  const offset = d.getTimezoneOffset() / 60;
  const beijing = new Date(ms + (8 + offset) * 3600000);
  return beijing.toISOString().split("T")[0];
}

function dateStrToTs(dateStr: string): number {
  const d = new Date(dateStr + "T00:00:00");
  return d.getTime();
}

function calcScore(val: number, type: "high" | "fixed5"): { score: number; benchmark: string } {
  if (type === "fixed5") return { score: 5.0, benchmark: "得分5.0分" };
  if (val >= 5.0) return { score: val, benchmark: "超过99%同行" };
  if (val >= 4.9) return { score: val, benchmark: "超过95%同行" };
  if (val >= 4.8) return { score: val, benchmark: "超过90%同行" };
  return { score: val, benchmark: "超过85%同行" };
}

function transformRecord(f: Record<string, unknown>, date: string) {
  const overall = Number(f["整体满意率"]) || 0;
  const change = Number(f["满意率变化"]) || 0;
  const ai = Number(f["AI满意率"]) || 0;
  const dailyConv = Number(f["当日转化率"]) || 0;
  const monthlyConv = Number(f["月均转化率"]) || 0;
  const pgr = Number(f["商品好评率"]) || 0;
  const ptr = Number(f["揽收及时率"]) || 0;
  const ldh = Number(f["物流到货时长"]) || 0;
  const rr = Number(f["3分钟响应率"]) || 0;
  const wws = Number(f["旺旺满意度"]) || 0;
  const rdh = Number(f["退款处理时长"]) || 0;
  const phr = Number(f["平台求助率"]) || 0;

  return {
    date,
    experienceScore: [
      { name: "宝贝质量", ...calcScore(Number(f["宝贝质量分"]), "high"), value: `${f["宝贝质量分"]}分` },
      { name: "物流速度", ...calcScore(Number(f["物流速度分"]), "high"), value: `${f["物流速度分"]}分` },
      { name: "服务保障", ...calcScore(Number(f["服务保障分"]), "high"), value: `${f["服务保障分"]}分` },
      { name: "商品负反馈率", value: `${f["商品负反馈率"]}%`, ...calcScore(5, "fixed5") },
      { name: "商品好评率", value: `${pgr}%`, ...calcScore(pgr, "high"), benchmark: "得分4.8分" },
      { name: "48小时揽收及时率", value: `${ptr}%`, ...calcScore(5, "fixed5") },
      { name: "物流到货时长", value: `${ldh}小时`, ...calcScore(5, "fixed5") },
      { name: "3分钟人工响应率", value: `${rr}%`, ...calcScore(5, "fixed5") },
      { name: "旺旺满意度", value: `${wws}%`, ...calcScore(5, "fixed5") },
      { name: "退款处理时长", value: `${rdh}小时`, ...calcScore(5, "fixed5") },
      { name: "平台求助率", value: `${phr}%`, ...calcScore(5, "fixed5") },
    ],
    satisfaction: [
      { label: "整体", rate: overall, change, isAbnormal: Math.abs(change) >= 0.5 },
      { label: "好伙伴", rate: Number(f["好伙伴满意率"]), change: 0 },
      { label: "春客", rate: Number(f["春客满意率"]), change: 0 },
      { label: "AI智能组", rate: ai, change: 0, isAbnormal: ai < 92 },
    ],
    conversion: {
      daily: dailyConv,
      monthlyAvg: monthlyConv,
      lastYear: Number(f["去年同期转化率"]) || 0,
      yoy: Number(f["转化率同比变化"]) || 0,
    },
    summary: String(f["当日小结"] || ""),
  };
}

// GET /api/bitable/dates — 返回所有可用日期列表（最新在前）
router.get("/dates", async (_req, res) => {
  try {
    const token = await getAppToken();
    const data = await fetchBitable("/records?page_size=500", token) as {
      data: { records: Array<{ fields: Record<string, unknown> }> };
    };
    const dates = data.data.records
      .map((r) => tsToDateStr(r.fields["报告日期"] as number))
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort()
      .reverse();
    res.json({ dates });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed" });
  }
});

// GET /api/bitable/:date — 返回指定日期数据
router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const ts = dateStrToTs(date);
    const token = await getAppToken();

    // 用 bitable filter 按日期过滤
    const filter = encodeURIComponent(`AND(CurrentValue.[报告日期]=${ts})`);
    const data = await fetchBitable(
      `/records?page_size=500&filter=${filter}`,
      token
    ) as { data: { records: Array<{ fields: Record<string, unknown> }> } };

    const records = data.data.records.filter(
      (r) => tsToDateStr(r.fields["报告日期"] as number) === date
    );

    if (records.length === 0) {
      res.status(404).json({ error: "no data" });
      return;
    }

    res.json(transformRecord(records[0].fields, date));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed" });
  }
});

export default router;

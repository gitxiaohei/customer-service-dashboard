import { axiosForBackend } from "@lark-apaas/client-toolkit-lite";
import type { IDayData } from "@shared/types";

const BITABLE_APP_TOKEN = "Hk8VbMKc4aCLDeswemRcpUtens8";
const BITABLE_TABLE_ID = "tblSFCm9VrFeZyd9";

export async function fetchAvailableDates(): Promise<string[]> {
  const response = await axiosForBackend({
    url: "/api/bitable/dates",
    method: "GET",
  });
  return ((response.data as { dates?: string[] }).dates || []) as string[];
}

export async function fetchDashboardData(date: string): Promise<IDayData | null> {
  const response = await axiosForBackend({
    url: `/api/bitable/${date}`,
    method: "GET",
  });
  return (response.data || null) as IDayData | null;
}

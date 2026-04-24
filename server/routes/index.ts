import type { Router } from "express";
import { registerViewRoute } from "./view";
import dashboardRouter from "./dashboard";
import bitableReadRouter from "./bitable-read";

export function registerRoutes(router: Router) {
  router.use("/api/dashboard", dashboardRouter);
  router.use("/api/bitable", bitableReadRouter);

  // HTML 页面渲染（catch-all，必须放在最后）
  registerViewRoute(router);
}

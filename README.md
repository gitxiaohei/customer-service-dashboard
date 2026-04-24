# 项目技术规范

## 技术栈

- 前端: React 19 + TypeScript
- 后端: Express 5 + TypeScript
- 数据库: Drizzle ORM + PostgreSQL
- 样式: Tailwind CSS v4
- UI 组件: shadcn/ui `import { Button } from "@/components/ui/button";`
- 图标: lucide-react `import { SearchIcon } from "lucide-react";`
- 图表: echarts-for-react `import ReactECharts from "echarts-for-react";`
- 动画: framer-motion `import { motion } from "framer-motion";`
- 路由: react-router-dom `import { Link, useNavigate } from "react-router-dom";`
- 校验: zod `import { z } from "zod";`

---

## 目录结构

```
├── client/src/                # 前端代码
│   ├── index.tsx              # 入口（勿修改）
│   ├── app.tsx                # 路由配置（仅在 <Routes> 内增删 <Route>）
│   ├── index.css              # 全局样式 + 主题变量
│   ├── api/                   # API 请求封装
│   │   └── index.ts
│   ├── components/            # 基础 UI 组件（禁止存放业务组件）
│   │   ├── layout.tsx         # 全局布局容器（含 <Outlet />）
│   │   └── ui/                # shadcn/ui 内置组件（勿修改）
│   ├── pages/                 # 页面模块（每个页面一个目录）
│   │   ├── <PageName>/        # 页面目录示例
│   │   │   ├── PageName.tsx          # 页面入口文件与目录同名
│   │   │   └── components/           # 页面专属组件
│   │   └── NotFoundPage/
│   │       └── NotFoundPage.tsx
│   ├── hooks/                 # 自定义 Hooks
│   └── lib/                   # 工具函数（cn() 等）
├── server/                    # 后端代码
│   ├── index.ts               # Express 入口
│   ├── routes/                # 路由
│   │   ├── index.ts           # 路由注册
│   │   └── view.ts            # 页面渲染（勿修改）
│   └── db/                    # 数据库层
│       └── schema.ts          # Drizzle schema（自动生成，勿修改）
├── shared/                    # 前后端共享（不依赖 client 或 server）
│   ├── types.ts               # 数据模型类型
│   ├── api.interface.ts       # zod schema + API 入参/出参类型
│   └── static/                # 静态资源
│       ├── data/              # 数据文件（JSON）
│       └── images/            # 图片资源
```

---

## 模板初始状态

- `app.tsx` 首页路由指向平台内置的 `<Welcome />` 组件
- 开发时需将 `index` 路由替换为业务首页，并在 `pages/` 下创建对应页面目录
- `layout.tsx` 为空壳容器（仅 `<Outlet />`），需根据需求实现导航和布局

---

## 禁止修改的文件

| 文件 | 原因 |
|------|------|
| `client/src/index.tsx` | Provider 层级 + 样式引入，由模板管理 |
| `client/src/components/ui/*` | shadcn/ui 内置组件，版本锁定 |
| `server/routes/view.ts` | 页面渲染 catch-all，由模板管理 |
| `server/db/schema.ts` | 由 `npm run gen:db-schema` 自动生成 |

---

## 文件放置规则

| 内容类型 | 放置位置 |
|---------|---------|
| 数据模型类型 | `shared/types.ts` |
| zod schema + API 类型 | `shared/api.interface.ts` |
| 新页面 | `client/src/pages/<PageName>/PageName.tsx` |
| 页面专属组件 | `client/src/pages/<PageName>/components/` |
| API 请求封装 | `client/src/api/index.ts` |
| 后端路由 | `server/routes/<resource>.ts` |
| 路由注册 | `server/routes/index.ts` |
| 静态数据文件 | `shared/static/data/` |
| 静态图片 | `shared/static/images/` |

---

## 导入路径

```typescript
// @/ 别名 → client/src/
import { cn } from "@/lib/utils";

// @shared/ 别名 → shared/
import type { Post } from "@shared/types";
import { createPostSchema } from "@shared/api.interface";
import heroImage from "@shared/static/images/hero.png";

// 后端导入 db 实例（唯一方式）
import { db } from "@lark-apaas/express-core";

// 后端导入表定义
import { posts } from "../db/schema";
```

---

## 路由配置

- 新增页面需在 `client/src/app.tsx` 的 `<Routes>` 内注册 `<Route>`
- `BrowserRouter` 已在 `index.tsx` 中配置，`app.tsx` 中**禁止**再包裹 Router

---

## 主题变量

主题色定义在 `client/src/index.css`，通过 `:root` CSS 变量 + `@theme inline` 注册到 Tailwind。

| 用途 | Tailwind 类 | CSS 变量 |
|------|------------|----------|
| 页面背景 | `bg-background` | `--background` |
| 主文本 | `text-foreground` | `--foreground` |
| 卡片背景 | `bg-card` | `--card` |
| 次要文本 | `text-muted-foreground` | `--muted-foreground` |
| 主色 | `bg-primary` / `text-primary` | `--primary` |
| 强调色 | `bg-accent` | `--accent` |
| 边框 | `border-border` | `--border` |
| 危险色 | `text-destructive` | `--destructive` |
| 图表色 | `bg-chart-1` ~ `bg-chart-5` | `--chart-1` ~ `--chart-5` |

HSL 格式使用**空格分隔**：`--primary: hsl(150 60% 40%);`

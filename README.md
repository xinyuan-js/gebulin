# 哥布林巢穴

哥布林巢穴是一个以“负能量、黑色幽默、混乱聚集地”为气质的 Web 项目。它不是单一页面，而是一个可以长期扩展的巢穴型平台：入口可以很多，功能可以分叉，模块可以逐步接入，未来可以演化成社区、内容、工具、小游戏、经济系统或其他子系统。

项目早期的核心目标不是马上堆功能，而是先建立稳定的规则：

- 项目定位清晰：所有功能都服务于“哥布林聚集地”的体验。
- 架构可扩展：新模块可以像新洞穴一样接入，而不是改动全局。
- 规范可执行：开发、命名、文档、提交、测试都有明确边界。
- 内容有底线：负能量是风格，不是失控；允许讽刺、荒诞和阴暗气质，但不鼓励现实伤害、骚扰或违法内容。

## 文档入口

- [项目章程](./docs/project-charter.md)：项目目的、产品气质、边界和长期方向。
- [技术栈](./docs/tech-stack.md)：前端、后端、数据层和部署基础设施选型。
- [系统边界](./docs/system-boundaries.md)：独立 OAuth 服务和哥布林主业务服务的职责划分。
- [主业务体验](./docs/goblin-business-experience.md)：像素 RPG 基地首页和可点击模块入口的产品规则。
- [架构原则](./docs/architecture-principles.md)：未来扩展时应遵守的技术组织方式。
- [开发规范](./docs/development-standards.md)：代码、命名、提交、测试和配置规范。
- [目录约定](./docs/directory-conventions.md)：推荐的仓库结构和模块边界。
- [路线图](./docs/roadmap.md)：从空仓库到可运行产品的阶段计划。

## 当前阶段

当前仓库处于项目初始化阶段，基础技术栈已确定：

- 前端：Vue + Nuxt。
- 后端：Go + Gin + Gorm，分为独立 OAuth 服务和哥布林主业务服务。
- 数据层：PostgreSQL + Redis + Kafka。
- 网关和部署：Nginx + Docker。

开发环境必须运行在开发容器中。打开仓库后应优先使用 Dev Container 启动统一环境，确保 Node、Go、PostgreSQL、Redis、Kafka、Nginx 等依赖通过容器编排提供。

下一步应按这些技术栈建立最小可运行工程，包括 Web 应用、OAuth 服务、哥布林主业务服务、数据库迁移和基础健康检查。

## 本地开发

本项目默认通过 Dev Container 开发。

启动方式：

1. 用支持 Dev Container 的编辑器打开仓库根目录。
2. 执行 `Dev Containers: Reopen in Container`。
3. 容器创建后会执行 `npm install` 安装前端依赖。
4. 在容器终端运行：

```bash
npm run dev:web
```

前端开发服务监听 `3000`，Nginx 开发网关监听 `18080`。

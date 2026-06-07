# 目录约定

当前项目技术栈已确定为 Nuxt + Go/Gin/Gorm + PostgreSQL + Redis + Kafka + Nginx + Docker。下面是推荐结构，具体落地时可以按框架细节调整，但职责边界应保持一致。

## 推荐结构

```text
.
├── README.md
├── .devcontainer/
│   ├── devcontainer.json
│   └── docker-compose.yml
├── docs/
│   ├── project-charter.md
│   ├── tech-stack.md
│   ├── architecture-principles.md
│   ├── development-standards.md
│   ├── directory-conventions.md
│   └── roadmap.md
├── apps/
│   └── web/
├── packages/
│   ├── config/
│   ├── shared/
│   └── ui/
├── services/
│   ├── oauth/
│   └── goblin/
├── deploy/
│   ├── nginx/
│   └── docker/
├── scripts/
└── .env.example
```

## 目录职责

- `apps/web`：Nuxt 主 Web 应用。
- `.devcontainer`：开发容器配置，是本地开发的标准入口。
- `services/oauth`：独立 OAuth 和身份认证服务。
- `services/goblin`：哥布林巢穴主业务服务。
- `packages/ui`：跨页面复用的 UI 组件。
- `packages/shared`：跨端共享的类型、常量、业务工具。
- `packages/config`：Lint、格式化、构建等共享配置。
- `deploy/nginx`：Nginx 配置。
- `deploy/docker`：Docker 镜像、入口脚本或环境配置。
- `scripts`：开发、构建、迁移、数据处理脚本。
- `docs`：产品、架构、开发和运维文档。

## 模块内部结构

功能模块可以采用类似结构：

```text
modules/lair-map/
├── components/
├── model/
├── services/
├── routes/
├── tests/
└── index.ts
```

职责说明：

- `components`：只负责展示和局部交互。
- `model`：领域类型和业务规则。
- `services`：数据获取、提交、副作用。
- `routes`：模块入口。
- `tests`：模块测试。
- `index.ts`：模块公开出口。

Go 服务推荐结构：

```text
services/oauth/
├── cmd/api/
├── internal/
│   ├── config/
│   ├── http/
│   ├── module/
│   ├── repository/
│   ├── service/
│   └── platform/
├── migrations/
├── go.mod
└── go.sum
```

职责说明：

- `cmd/api`：API 服务启动入口。
- `internal/config`：配置读取和校验。
- `internal/http`：Gin router、中间件、handler。
- `internal/module`：按业务模块组织的领域代码。
- `internal/repository`：PostgreSQL/Gorm 数据访问。
- `internal/service`：业务用例和应用服务。
- `internal/platform`：Redis、Kafka、日志等基础设施适配。
- `migrations`：数据库迁移文件。

`services/goblin` 使用同样的内部结构。两个服务可以复用结构，但不共享内部包；需要共享的协议、事件定义或客户端类型应放到 `packages/shared` 或后续专门的共享 Go package 中。

## 禁止事项

- 禁止跨模块引用 `components`、`model`、`services` 内部深层路径。
- 禁止把所有共享逻辑放进一个巨大的 `helpers` 文件。
- 禁止把环境变量读取散落到业务代码各处。
- 禁止在没有文档说明的情况下新增顶层目录。

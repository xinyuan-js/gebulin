# 系统边界

## 总览

项目后端从一开始拆成两个一等子系统：

- `oauth`：独立 OAuth 和身份认证服务。
- `goblin`：哥布林巢穴主业务服务。

这两个服务都使用 Go + Gin + Gorm，但职责和数据所有权必须分开。OAuth 服务解决“你是谁、你能不能登录、令牌是否合法”；哥布林主业务解决“你在巢穴里是什么身份、能做什么、产生了什么内容”。

## OAuth 服务

服务目录：`services/oauth`。

核心职责：

- 用户账号注册、登录、退出。
- OAuth2/OIDC 相关能力，具体协议范围按实现阶段确定。
- Access Token、Refresh Token、授权码等凭证签发和校验。
- 第三方登录扩展预留。
- 密码、MFA、设备、登录审计等身份安全能力。
- 向其他服务提供 token introspection、JWKS 或用户身份查询能力。

数据所有权：

- 账号基础信息。
- 登录凭证。
- OAuth client。
- 授权记录。
- 登录和安全审计。

OAuth 服务不负责：

- 哥布林资料。
- 哥布林头像、哥布林名、金币和哥布林 UID。
- 巢穴内容。
- 帖子、评论、称号、积分、背包。
- 主业务权限细节。

## 哥布林主业务服务

服务目录：`services/goblin`。

核心职责：

- 哥布林资料。
- 巢穴分区和入口。
- 内容、评论、标签、收藏。
- 称号、成就、声望、库存等业务身份。
- 内容治理、举报、审核。
- 未来活动、任务、小游戏和后台业务。

数据所有权：

- 业务用户档案，例如 `GoblinProfile`。
- 对用户展示的哥布林 UID，默认从 `10001` 起。
- 哥布林头像、哥布林名、金币和业务身份等级。
- 内容和互动数据。
- 分区、权限映射和业务配置。
- 业务审计和运营数据。

哥布林主业务服务不负责：

- 密码校验。
- OAuth client 管理。
- Token 签发。
- 第三方登录协议细节。

## 用户身份关系

两个服务之间用稳定的身份 ID 连接：

- OAuth 服务拥有全局账号 ID，建议命名为 `account_id`。
- 哥布林主业务服务通过 `account_id` 绑定业务档案。
- 主业务内部可以有自己的 `profile_id` 和对用户展示的 `uid`，但不得替代 `account_id` 作为跨服务身份。
- `uid` 是哥布林身份证号，默认从 `10001` 起，只用于展示、查询和业务识别，不用于登录。

基本关系：

```text
oauth.accounts.id  ->  goblin.goblin_profiles.account_id
```

详细字段和注册流程见 `docs/auth-and-goblin-identity.md`。

## 调用关系

推荐调用方式：

- Web 前端先通过 OAuth 服务完成登录。
- Web 前端携带 Access Token 访问哥布林主业务服务。
- 哥布林主业务服务通过本地公钥校验 JWT，或调用 OAuth introspection 接口校验 token。
- 哥布林主业务服务只信任 OAuth 服务签发或确认有效的身份。

禁止：

- 哥布林主业务服务直接读取 OAuth 数据库来判断密码、会话或授权。
- OAuth 服务读取哥布林主业务数据库来决定业务权限。
- Web 前端绕过后端权限校验。

## 数据库边界

早期可以共用同一个 PostgreSQL 实例，但必须使用独立数据库或独立 schema：

- OAuth：`oauth` database/schema。
- 哥布林主业务：`goblin` database/schema。

原则：

- 迁移文件按服务分别维护。
- 服务只能迁移和写入自己拥有的数据结构。
- 跨服务查询通过 API 或事件同步，不通过跨 schema join 作为业务依赖。

## Redis 边界

Redis 可以共用实例，但 key 前缀必须隔离：

- OAuth：`oauth:*`。
- 哥布林主业务：`goblin:*`。

敏感 token、验证码、登录限流等身份安全数据归 OAuth 服务管理。

## Kafka 边界

Kafka 用于两个服务之间的异步扩展，不用于替代登录时的强校验。

建议事件：

- `oauth.account.created`
- `oauth.account.disabled`
- `oauth.login.succeeded`
- `goblin.profile.created`
- `goblin.content.published`
- `goblin.content.reported`

事件必须考虑版本化和重复消费。

## Nginx 路由边界

建议本地和生产保持一致的路径前缀：

- `/`：Nuxt Web。
- `/oauth/`：OAuth 服务。
- `/api/`：哥布林主业务服务。

具体路由可以在实现阶段调整，但身份服务和业务服务必须有明确入口边界。

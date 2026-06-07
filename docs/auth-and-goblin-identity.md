# OAuth 与哥布林身份设计

## 目标

v0 需要先打通身份和哥布林资料的最小闭环：

- 用户能注册和登录。
- 系统能为每个账号创建一个哥布林档案。
- 哥布林档案包含头像、名字、邮箱展示、金币和稳定 UID。
- UID 不能从 `1` 这种过于临时的编号开始，默认从 `10001` 起。

## 服务边界

身份数据拆成两层：

- OAuth 服务：负责账号、邮箱、密码、登录、Token、安全审计。
- 哥布林主业务服务：负责哥布林档案、头像、名字、金币、UID、业务身份。

OAuth 不直接持有金币、头像、称号、库存等主业务数据。主业务也不直接校验密码或签发 Token。

## OAuth 账号模型

建议表名：`oauth.accounts`。

核心字段：

| 字段 | 类型建议 | 说明 |
| --- | --- | --- |
| `id` | UUID 或 BIGINT | OAuth 内部账号 ID，跨服务身份锚点。 |
| `email` | VARCHAR | 登录邮箱，必须唯一。 |
| `password_hash` | VARCHAR | 密码哈希，不保存明文密码。 |
| `status` | VARCHAR | `active`、`disabled`、`pending` 等。 |
| `created_at` | TIMESTAMP | 创建时间。 |
| `updated_at` | TIMESTAMP | 更新时间。 |

约束：

- `email` 必须唯一。
- 密码只允许保存哈希。
- OAuth 返回给前端的用户信息不包含 `password_hash`。

## 哥布林档案模型

建议表名：`goblin.goblin_profiles`。

核心字段：

| 字段 | 类型建议 | 说明 |
| --- | --- | --- |
| `id` | UUID 或 BIGINT | 主业务内部档案主键。 |
| `account_id` | OAuth account ID 类型 | 绑定 OAuth 账号。 |
| `uid` | BIGINT | 对用户展示的哥布林身份证号，从 `10001` 起。 |
| `display_name` | VARCHAR | 哥布林名字。 |
| `avatar_url` | TEXT | 哥布林帅照地址。 |
| `email_snapshot` | VARCHAR | 邮箱展示快照，来源于 OAuth。 |
| `coins` | BIGINT | 哥布林金币，默认 `0`。 |
| `rank` | VARCHAR | 默认 `weak_goblin`，首个 UID `10001` 固定为 `goblin_god`。 |
| `created_at` | TIMESTAMP | 创建时间。 |
| `updated_at` | TIMESTAMP | 更新时间。 |

约束：

- `account_id` 必须唯一，一个账号默认只绑定一个哥布林档案。
- `uid` 必须唯一。
- `uid` 使用数据库 sequence 或等价机制生成，起始值为 `10001`。
- `coins` 不允许为负数，默认 `0`。
- `display_name` v0 可以默认生成，例如 `羸弱哥布林10001`，后续允许用户修改。
- `avatar_url` v0 可以使用默认头像，后续接上传或对象存储。
- `uid = 10001` 的档案必须自动设置为 `rank = goblin_god`，即“哥布林之神”。

## UID 规则

哥布林 UID 是对用户展示的身份证号，不等同于数据库主键。

规则：

- 起始值：`10001`。
- 只递增，不复用。
- 不因账号注销而回收。
- 不承载权限含义。
- 不作为登录凭证。
- `10001` 是系统首个哥布林，固定拥有“哥布林之神”身份。

PostgreSQL 示例：

```sql
CREATE SEQUENCE goblin.goblin_uid_seq START WITH 10001;
```

## 初始超级管理员

系统必须在第一个哥布林档案创建时自动授予 `哥布林之神` 身份。

规则：

- 条件：`uid = 10001`。
- `rank`：`goblin_god`。
- 展示名称：如果用户未填写名字，默认可生成为 `哥布林之神`。
- 权限能力：v0 阶段可以与 `goblin_elder` 保持一致。
- 语义保留：即使权限能力暂时相同，也必须保留 `goblin_god` 这个独立身份，用于展示、审计和未来扩展。
- 唯一性：系统中默认只应存在一个 `goblin_god`。

推荐 rank 枚举：

| rank | 展示名 | 说明 |
| --- | --- | --- |
| `goblin_god` | 哥布林之神 | UID `10001` 的内置超级管理员。 |
| `goblin_chief` | 哥布林族长 | 最高管理者。 |
| `goblin_elder` | 哥布林长老 | 高级管理员。 |
| `goblin_warrior` | 哥布林勇士 | 普通管理或审核角色。 |
| `weak_goblin` | 羸弱哥布林 | 普通用户。 |

## 注册流程

v0 推荐流程：

1. Web 提交邮箱、密码和可选哥布林名到 OAuth 服务。
2. OAuth 服务创建 `oauth.accounts`。
3. OAuth 服务发布 `oauth.account.created` 事件，或同步调用哥布林主业务服务。
4. 哥布林主业务服务创建 `goblin.goblin_profiles`。
5. Web 登录后通过主业务接口读取哥布林档案。

默认档案：

- `uid`：从 `10001` sequence 获取。
- `display_name`：用户填写则使用用户填写；否则生成 `羸弱哥布林{uid}`。
- `avatar_url`：默认哥布林头像。
- `email_snapshot`：注册邮箱。
- `coins`：`0`。
- `rank`：普通档案为 `weak_goblin`；若 `uid = 10001`，则为 `goblin_god`。

## 邮箱同步

邮箱的真实所有权属于 OAuth。

主业务中的 `email_snapshot` 只用于展示和降低跨服务查询成本。若 OAuth 邮箱变更，应通过事件同步：

- `oauth.account.email_changed`

主业务收到后更新 `goblin_profiles.email_snapshot`。

## 金币边界

金币是主业务资产，不属于 OAuth。

后续金币变化应有独立流水表，例如 `goblin.coin_transactions`，避免只改 `coins` 字段无法审计。

v0 可以先保留：

- `goblin_profiles.coins`

后续扩展：

- `coin_transactions.id`
- `profile_id`
- `delta`
- `reason`
- `source_module`
- `created_at`

## API 草案

OAuth 服务：

- `POST /oauth/api/v1/register`
- `POST /oauth/api/v1/login`
- `POST /oauth/api/v1/logout`
- `POST /oauth/api/v1/refresh`
- `GET /oauth/api/v1/me`

哥布林主业务服务：

- `GET /api/v1/me/profile`
- `PATCH /api/v1/me/profile`
- `GET /api/v1/goblins/:uid`

## v0 完成标准

- 注册账号后自动拥有哥布林档案。
- 哥布林 UID 从 `10001` 开始。
- UID `10001` 自动成为 `哥布林之神`。
- 登录后能拿到：头像、哥布林名、邮箱、金币、UID、身份等级。
- OAuth 和主业务数据表不混写。
- 后续可在不重构账号体系的前提下增加金币流水、头像上传、称号和权限。

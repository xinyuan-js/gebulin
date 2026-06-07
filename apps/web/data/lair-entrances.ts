import type { LairEntrance } from "~/types/lair";

export const lairEntrances: LairEntrance[] = [
  {
    id: "notice-board",
    name: "公告板",
    kind: "notice-board",
    route: "/notices",
    status: "open",
    description: "贴着破纸和脏钉子的木板，记录巢穴最近发生的坏事。",
    position: { x: 31, y: 34 },
    tone: "gold"
  },
  {
    id: "bonfire",
    name: "篝火",
    kind: "bonfire",
    route: "/campfire",
    status: "open",
    description: "发黑的火堆旁总有人低声闲聊。",
    position: { x: 50, y: 52 },
    tone: "ember"
  },
  {
    id: "deep-cave",
    name: "洞穴深处",
    kind: "cave",
    route: "/caves",
    status: "coming_soon",
    description: "通向帖子、分区和主题讨论的深处入口。",
    position: { x: 80, y: 30 },
    tone: "moss"
  },
  {
    id: "warehouse",
    name: "仓库",
    kind: "warehouse",
    route: "/inventory",
    status: "coming_soon",
    description: "存放收藏、道具和以后可能派上用场的破烂。",
    position: { x: 21, y: 53 },
    tone: "stone"
  },
  {
    id: "bedroll",
    name: "铺盖卷",
    kind: "bedroll",
    route: "/profile",
    status: "open",
    description: "你自己的破铺盖、身份牌和随身破烂，个人管理中心都塞在这里。",
    position: { x: 28, y: 75 },
    tone: "cloth"
  },
  {
    id: "stone-tablet",
    name: "石碑",
    kind: "tablet",
    route: "/badges",
    status: "locked",
    description: "刻着称号、成就和排名，但现在被泥封住了。",
    position: { x: 64, y: 77 },
    tone: "ash"
  },
  {
    id: "goblin-tent",
    name: "哥布林帐篷",
    kind: "tent",
    route: "/admin",
    status: "locked",
    description: "族长、长老和勇士商量坏主意的地方，普通羸弱哥布林只能在外面偷听。",
    position: { x: 78, y: 55 },
    tone: "hide",
    requiredRank: "goblin_warrior"
  },
  {
    id: "guard-gate",
    name: "哥布林守卫",
    kind: "guard",
    route: "/auth/login",
    status: "open",
    description: "守在北侧入口的保安，想进更深的地方，先证明你是谁。",
    position: { x: 50, y: 20 },
    tone: "violet"
  }
];

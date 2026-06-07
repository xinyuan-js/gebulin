import type { LairEntrance } from "~/types/lair";

export const homeLairEntrances: LairEntrance[] = [
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
    status: "open",
    description: "通向洞穴第一层，里面已经堆进了铺盖卷、仓库和帐篷。",
    position: { x: 78, y: 31 },
    tone: "moss"
  },
  {
    id: "guard-gate",
    name: "哥布林守卫",
    kind: "guard",
    route: "/auth/login",
    status: "open",
    description: "守在洞穴入口旁边的保安，想进更深的地方，先证明你是谁。",
    position: { x: 88, y: 31 },
    tone: "violet"
  },
  {
    id: "stone-tablet",
    name: "石碑",
    kind: "tablet",
    route: "/badges",
    status: "open",
    description: "刻着称号、成就和排名，但现在被泥封住了。",
    position: { x: 64, y: 77 },
    tone: "ash"
  }
];

export const caveFirstLayerEntrances: LairEntrance[] = [
  {
    id: "cave-bonfire",
    name: "大篝火",
    kind: "bonfire",
    route: "/campfire",
    status: "open",
    description: "洞穴第一层中央的大火堆，照亮了附近所有破烂。",
    position: { x: 50, y: 52 },
    tone: "ember"
  },
  {
    id: "goddess-statue",
    name: "女神石像",
    kind: "goddess-statue",
    route: "/goddess",
    status: "open",
    description: "传说中伟大女神的石像，未来会按哥布林身份赐下不同神力。",
    position: { x: 50, y: 29 },
    tone: "violet"
  },
  {
    id: "warehouse",
    name: "仓库",
    kind: "warehouse",
    route: "/inventory",
    status: "open",
    description: "存放收藏、道具和以后可能派上用场的破烂。",
    position: { x: 25, y: 48 },
    tone: "stone"
  },
  {
    id: "bedroll",
    name: "铺盖卷",
    kind: "bedroll",
    route: "/profile",
    status: "open",
    description: "你自己的破铺盖、身份牌和随身破烂，个人管理中心都塞在这里。",
    position: { x: 28, y: 72 },
    tone: "cloth"
  },
  {
    id: "goblin-tent",
    name: "哥布林帐篷",
    kind: "tent",
    route: "/admin",
    status: "open",
    description: "族长、长老和勇士商量坏主意的地方，普通羸弱哥布林只能在外面偷听。",
    position: { x: 74, y: 47 },
    tone: "hide",
    requiredRank: "goblin_warrior"
  }
];

export type LairEntranceStatus = "open" | "locked" | "hidden" | "coming_soon";
export type LairEntranceKind =
  | "notice-board"
  | "bonfire"
  | "cave"
  | "warehouse"
  | "tablet"
  | "gate"
  | "bedroll"
  | "tent";

export type GoblinRank =
  | "goblin_chief"
  | "goblin_elder"
  | "goblin_warrior"
  | "weak_goblin";

export interface LairEntrance {
  id: string;
  name: string;
  kind: LairEntranceKind;
  route: string;
  status: LairEntranceStatus;
  description: string;
  position: {
    x: number;
    y: number;
  };
  tone: "ember" | "moss" | "stone" | "violet" | "gold" | "ash" | "cloth" | "hide";
  requiredRank?: GoblinRank;
}

export type KanbanCardTone = 'neutral' | 'accent';

export interface KanbanCardRecord {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  tone?: KanbanCardTone;
}

export interface KanbanColumnRecord {
  id: string;
  title: string;
  cards: KanbanCardRecord[];
}

export interface KanbanBoardModel {
  columns: Array<{
    id: string;
    title: string;
    cardCount: number;
    cards: Array<KanbanCardRecord & { tone: KanbanCardTone }>;
  }>;
}

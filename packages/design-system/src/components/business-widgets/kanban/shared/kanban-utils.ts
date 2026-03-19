import type { KanbanBoardModel, KanbanCardRecord, KanbanColumnRecord } from './kanban-types';
export type { KanbanCardRecord, KanbanColumnRecord } from './kanban-types';

function normalizeCard(card: KanbanCardRecord): KanbanCardRecord & { tone: 'neutral' | 'accent' } {
  return {
    ...card,
    tone: card.tone ?? 'neutral',
  };
}

export function buildKanbanBoardModel(columns: KanbanColumnRecord[]): KanbanBoardModel {
  return {
    columns: columns.map((column) => ({
      id: column.id,
      title: column.title,
      cardCount: column.cards.length,
      cards: column.cards.map(normalizeCard),
    })),
  };
}

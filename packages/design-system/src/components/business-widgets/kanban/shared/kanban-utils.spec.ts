import { buildKanbanBoardModel } from './kanban-utils';

describe('kanban-utils', () => {
  it('normalizes card tone and preserves card counts by column', () => {
    const board = buildKanbanBoardModel([
      {
        id: 'todo',
        title: 'To do',
        cards: [
          { id: 'a', title: 'Define migration boundary' },
          { id: 'b', title: 'Review widget API', tone: 'accent' },
        ],
      },
    ]);

    expect(board.columns).toHaveLength(1);
    expect(board.columns[0]?.cardCount).toBe(2);
    expect(board.columns[0]?.cards[0]?.tone).toBe('neutral');
    expect(board.columns[0]?.cards[1]?.tone).toBe('accent');
  });
});

import { buildTaskListModel } from './task-list-utils';

describe('task-list-utils', () => {
  it('normalizes item tone and preserves item count', () => {
    const list = buildTaskListModel([
      {
        id: 'a',
        title: 'Review hierarchy',
      },
      {
        id: 'b',
        title: 'Confirm app wiring',
        tone: 'accent',
      },
    ]);

    expect(list.itemCount).toBe(2);
    expect(list.items[0]?.tone).toBe('neutral');
    expect(list.items[1]?.tone).toBe('accent');
  });
});

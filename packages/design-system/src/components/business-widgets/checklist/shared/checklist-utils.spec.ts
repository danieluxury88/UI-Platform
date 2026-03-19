import { buildChecklistModel } from './checklist-utils';

describe('checklist-utils', () => {
  it('normalizes completion state and counts completed items', () => {
    const checklist = buildChecklistModel([
      { id: 'a', title: 'Capture request title' },
      { id: 'b', title: 'Review owner handoff', completed: true, tone: 'accent' },
    ]);

    expect(checklist.itemCount).toBe(2);
    expect(checklist.completedCount).toBe(1);
    expect(checklist.items[0]?.completed).toBe(false);
    expect(checklist.items[1]?.tone).toBe('accent');
  });
});

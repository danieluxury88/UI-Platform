import type { ChecklistItemRecord, ChecklistModel } from './checklist-types';
export type { ChecklistItemRecord } from './checklist-types';

function normalizeItem(item: ChecklistItemRecord): ChecklistItemRecord & { completed: boolean; tone: 'neutral' | 'accent' } {
  return {
    ...item,
    completed: item.completed ?? false,
    tone: item.tone ?? 'neutral',
  };
}

export function buildChecklistModel(items: ChecklistItemRecord[]): ChecklistModel {
  const normalizedItems = items.map(normalizeItem);

  return {
    itemCount: normalizedItems.length,
    completedCount: normalizedItems.filter((item) => item.completed).length,
    items: normalizedItems,
  };
}

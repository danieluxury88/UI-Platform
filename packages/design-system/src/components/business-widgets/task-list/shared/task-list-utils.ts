import type { TaskListItemRecord, TaskListModel } from './task-list-types';
export type { TaskListItemRecord } from './task-list-types';

function normalizeItem(item: TaskListItemRecord): TaskListItemRecord & { tone: 'neutral' | 'accent' } {
  return {
    ...item,
    tone: item.tone ?? 'neutral',
  };
}

export function buildTaskListModel(items: TaskListItemRecord[]): TaskListModel {
  return {
    itemCount: items.length,
    items: items.map(normalizeItem),
  };
}

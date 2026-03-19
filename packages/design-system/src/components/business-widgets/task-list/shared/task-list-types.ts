export type TaskListItemTone = 'neutral' | 'accent';

export interface TaskListItemRecord {
  id: string;
  title: string;
  description?: string;
  meta?: string;
  statusLabel?: string;
  tone?: TaskListItemTone;
}

export interface TaskListModel {
  itemCount: number;
  items: Array<TaskListItemRecord & { tone: TaskListItemTone }>;
}

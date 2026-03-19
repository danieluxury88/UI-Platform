export type ChecklistItemTone = 'neutral' | 'accent';

export interface ChecklistItemRecord {
  id: string;
  title: string;
  note?: string;
  meta?: string;
  completed?: boolean;
  tone?: ChecklistItemTone;
}

export interface ChecklistModel {
  itemCount: number;
  completedCount: number;
  items: Array<ChecklistItemRecord & { completed: boolean; tone: ChecklistItemTone }>;
}

export type ActivityTimelineEventTone = 'neutral' | 'accent';

export interface ActivityTimelineEventRecord {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  meta?: string;
  tone?: ActivityTimelineEventTone;
}

export interface ActivityTimelineModel {
  eventCount: number;
  events: Array<ActivityTimelineEventRecord & { tone: ActivityTimelineEventTone }>;
}

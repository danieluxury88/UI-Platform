import type { ActivityTimelineEventRecord, ActivityTimelineModel } from './activity-timeline-types';
export type { ActivityTimelineEventRecord } from './activity-timeline-types';

function normalizeEvent(
  event: ActivityTimelineEventRecord,
): ActivityTimelineEventRecord & { tone: 'neutral' | 'accent' } {
  return {
    ...event,
    tone: event.tone ?? 'neutral',
  };
}

export function buildActivityTimelineModel(events: ActivityTimelineEventRecord[]): ActivityTimelineModel {
  return {
    eventCount: events.length,
    events: events.map(normalizeEvent),
  };
}

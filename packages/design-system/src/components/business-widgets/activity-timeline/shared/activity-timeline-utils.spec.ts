import { buildActivityTimelineModel } from './activity-timeline-utils';

describe('activity-timeline-utils', () => {
  it('normalizes event tone and preserves event count', () => {
    const timeline = buildActivityTimelineModel([
      {
        id: 'a',
        title: 'Created workspace request',
        timestamp: '09:10',
      },
      {
        id: 'b',
        title: 'Moved review item forward',
        timestamp: '10:25',
        tone: 'accent',
      },
    ]);

    expect(timeline.eventCount).toBe(2);
    expect(timeline.events[0]?.tone).toBe('neutral');
    expect(timeline.events[1]?.tone).toBe('accent');
  });
});

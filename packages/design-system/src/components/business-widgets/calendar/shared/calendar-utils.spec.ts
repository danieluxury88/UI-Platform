import { buildMonthGrid, buildWeekViewModel, formatCalendarWeekLabel } from './calendar-utils';

describe('calendar-utils', () => {
  it('builds a month grid with multi-day events spanning each matching day', () => {
    const grid = buildMonthGrid(
      '2026-03-19',
      [
        {
          id: 'release-window',
          title: 'Release window',
          startDate: '2026-03-20',
          endDate: '2026-03-22',
        },
      ],
      '2026-03-21',
      'en-US',
      1,
    );

    const eventDays = grid.weeks
      .flat()
      .filter((day) => day.events.some((event) => event.id === 'release-window'))
      .map((day) => day.date);

    expect(eventDays).toEqual(['2026-03-20', '2026-03-21', '2026-03-22']);
  });

  it('builds a Monday-first week range and marks the selected day', () => {
    const week = buildWeekViewModel(
      '2026-03-19',
      [],
      '2026-03-19',
      'en-US',
      1,
    );

    expect(week.rangeLabel).toBe(formatCalendarWeekLabel('2026-03-19', 'en-US', 1));
    expect(week.days).toHaveLength(7);
    expect(week.days[0]?.date).toBe('2026-03-16');
    expect(week.days[3]?.isSelected).toBe(true);
  });
});

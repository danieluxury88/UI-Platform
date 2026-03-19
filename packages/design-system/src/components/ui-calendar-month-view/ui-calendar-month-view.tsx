import { Component, Host, Prop, h } from '@stencil/core';
import {
  buildMonthGrid,
  type CalendarEventRecord,
  type CalendarWeekday,
} from '../calendar/calendar-utils';

@Component({
  tag: 'ui-calendar-month-view',
  styleUrl: 'ui-calendar-month-view.css',
  shadow: true,
})
export class UiCalendarMonthView {
  @Prop() anchorDate = new Date().toISOString().slice(0, 10);

  @Prop() selectedDate?: string;

  @Prop() events: CalendarEventRecord[] = [];

  @Prop() locale = 'en-US';

  @Prop() firstDayOfWeek: CalendarWeekday = 0;

  render() {
    const grid = buildMonthGrid(
      this.anchorDate,
      this.events,
      this.selectedDate,
      this.locale,
      this.firstDayOfWeek,
    );

    return (
      <Host>
        <section class="ui-calendar-month-view" aria-label={grid.monthLabel}>
          <div class="ui-calendar-month-view__weekdays" aria-hidden="true">
            {grid.weekdayLabels.map((label) => (
              <span key={label} class="ui-calendar-month-view__weekday">
                {label}
              </span>
            ))}
          </div>

          <div class="ui-calendar-month-view__weeks" role="grid" aria-label={grid.monthLabel}>
            {grid.weeks.map((week, weekIndex) => (
              <div key={weekIndex} class="ui-calendar-month-view__week" role="row">
                {week.map((day) => {
                  const visibleEvents = day.events.slice(0, 3);
                  const overflowCount = day.events.length - visibleEvents.length;

                  return (
                    <ui-calendar-day-cell
                      key={day.date}
                      date={day.date}
                      dayNumber={day.dayNumber}
                      label={day.label}
                      outsideMonth={day.isOutsideMonth}
                      selected={day.isSelected}
                      today={day.isToday}
                    >
                      {visibleEvents.map((event) => (
                        <ui-calendar-event-chip
                          key={event.id}
                          date={day.date}
                          event={event}
                          tone={event.tone ?? 'neutral'}
                        />
                      ))}
                      {overflowCount > 0 ? <ui-badge tone="neutral">+{overflowCount} more</ui-badge> : null}
                    </ui-calendar-day-cell>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      </Host>
    );
  }
}

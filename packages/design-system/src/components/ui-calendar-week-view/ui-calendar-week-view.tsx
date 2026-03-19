import { Component, Host, Prop, h } from '@stencil/core';
import {
  buildWeekViewModel,
  type CalendarEventRecord,
  type CalendarWeekday,
} from '../calendar/calendar-utils';

@Component({
  tag: 'ui-calendar-week-view',
  styleUrl: 'ui-calendar-week-view.css',
  shadow: true,
})
export class UiCalendarWeekView {
  @Prop() anchorDate = new Date().toISOString().slice(0, 10);

  @Prop() selectedDate?: string;

  @Prop() events: CalendarEventRecord[] = [];

  @Prop() locale = 'en-US';

  @Prop() firstDayOfWeek: CalendarWeekday = 0;

  render() {
    const week = buildWeekViewModel(
      this.anchorDate,
      this.events,
      this.selectedDate,
      this.locale,
      this.firstDayOfWeek,
    );

    return (
      <Host>
        <section class="ui-calendar-week-view" aria-label={week.rangeLabel}>
          <div class="ui-calendar-week-view__weekdays" aria-hidden="true">
            {week.weekdayLabels.map((label) => (
              <span key={label} class="ui-calendar-week-view__weekday">
                {label}
              </span>
            ))}
          </div>

          <div class="ui-calendar-week-view__grid" role="grid" aria-label={week.rangeLabel}>
            {week.days.map((day) => {
              const visibleEvents = day.events.slice(0, 3);
              const overflowCount = day.events.length - visibleEvents.length;

              return (
                <ui-calendar-day-cell
                  key={day.date}
                  date={day.date}
                  dayNumber={day.dayNumber}
                  label={day.dayLabel}
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
        </section>
      </Host>
    );
  }
}

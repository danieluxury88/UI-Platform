import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import {
  buildDayViewModel,
  type CalendarEventRecord,
} from '../shared/calendar-utils';

@Component({
  tag: 'ui-calendar-day-view',
  styleUrl: 'ui-calendar-day-view.css',
  shadow: true,
})
export class UiCalendarDayView {
  @Prop() anchorDate = new Date().toISOString().slice(0, 10);

  @Prop() selectedDate?: string;

  @Prop() events: CalendarEventRecord[] = [];

  @Prop() locale = 'en-US';

  @Event({ eventName: 'uiCalendarDateSelect', bubbles: true, composed: true })
  dateSelect!: EventEmitter<{ date: string }>;

  private handleSelectDay = () => {
    this.dateSelect.emit({ date: this.anchorDate });
  };

  render() {
    const day = buildDayViewModel(this.anchorDate, this.events, this.selectedDate, this.locale);

    return (
      <Host>
        <section class="ui-calendar-day-view" aria-label={day.dayLabel}>
          <div class="ui-calendar-day-view__header">
            <div class="ui-calendar-day-view__title-block">
              <p class="ui-calendar-day-view__eyebrow">Day view</p>
              <h3 class="ui-calendar-day-view__title">{day.dayLabel}</h3>
              <p class="ui-calendar-day-view__copy">
                {day.events.length > 0
                  ? `${day.events.length} event${day.events.length === 1 ? '' : 's'} on this day.`
                  : 'No events are scheduled for this day.'}
              </p>
            </div>

            <ui-button
              variant={day.isSelected ? 'primary' : 'secondary'}
              type="button"
              onClick={this.handleSelectDay}
            >
              {day.isSelected ? 'Selected day' : 'Select day'}
            </ui-button>
          </div>

          <div class="ui-calendar-day-view__surface">
            <ui-stack space="sm">
              <div class="ui-calendar-day-view__status-row">
                <ui-badge tone={day.isToday ? 'accent' : 'neutral'}>
                  {day.isToday ? 'Today' : 'Scheduled'}
                </ui-badge>
                <ui-badge tone="neutral">
                  {day.events.length} event{day.events.length === 1 ? '' : 's'}
                </ui-badge>
              </div>

              <div class="ui-calendar-day-view__events">
                {day.events.length > 0 ? (
                  day.events.map((event) => (
                    <ui-calendar-event-chip
                      key={event.id}
                      date={this.anchorDate}
                      event={event}
                      tone={event.tone ?? 'neutral'}
                    />
                  ))
                ) : (
                  <p class="ui-calendar-day-view__empty">The day is clear.</p>
                )}
              </div>
            </ui-stack>
          </div>
        </section>
      </Host>
    );
  }
}

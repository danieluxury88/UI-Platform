import { Component, Host, Prop, h } from '@stencil/core';
import {
  formatCalendarDayLabel,
  formatCalendarMonthLabel,
  type CalendarEventRecord,
  type CalendarView,
  type CalendarWeekday,
} from '../calendar/calendar-utils';

@Component({
  tag: 'ui-calendar',
  styleUrl: 'ui-calendar.css',
  shadow: true,
})
export class UiCalendar {
  @Prop() view: CalendarView = 'month';

  @Prop() anchorDate = new Date().toISOString().slice(0, 10);

  @Prop() selectedDate?: string;

  @Prop() events: CalendarEventRecord[] = [];

  @Prop() locale = 'en-US';

  @Prop() firstDayOfWeek: CalendarWeekday = 0;

  render() {
    const rangeLabel =
      this.view === 'day'
        ? formatCalendarDayLabel(this.anchorDate, this.locale)
        : formatCalendarMonthLabel(this.anchorDate, this.locale);
    const monthViewProps = {
      anchorDate: this.anchorDate,
      events: this.events,
      firstDayOfWeek: this.firstDayOfWeek,
      locale: this.locale,
      ...(this.selectedDate ? { selectedDate: this.selectedDate } : {}),
    };
    const dayViewProps = {
      anchorDate: this.anchorDate,
      events: this.events,
      locale: this.locale,
      ...(this.selectedDate ? { selectedDate: this.selectedDate } : {}),
    };

    return (
      <Host>
        <section class="ui-calendar">
          {this.view === 'month' ? (
            <ui-stack space="lg">
              <ui-calendar-toolbar rangeLabel={rangeLabel} />
              <ui-calendar-month-view {...monthViewProps} />
            </ui-stack>
          ) : this.view === 'day' ? (
            <ui-stack space="lg">
              <ui-calendar-toolbar rangeLabel={rangeLabel} />
              <ui-calendar-day-view {...dayViewProps} />
            </ui-stack>
          ) : (
            <div class="ui-calendar__unsupported">
              <p class="ui-calendar__eyebrow">Calendar</p>
              <p class="ui-calendar__message">Only month and day views are supported in this milestone.</p>
            </div>
          )}
        </section>
      </Host>
    );
  }
}

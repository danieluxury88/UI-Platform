import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { CalendarEventRecord, CalendarTone } from '../shared/calendar-utils';

@Component({
  tag: 'ui-calendar-event-chip',
  styleUrl: 'ui-calendar-event-chip.css',
  shadow: true,
})
export class UiCalendarEventChip {
  @Prop() event!: CalendarEventRecord;

  @Prop() date = '';

  @Prop({ reflect: true }) tone: CalendarTone = 'neutral';

  @Event({ eventName: 'uiCalendarEventActivate', bubbles: true, composed: true })
  eventActivate!: EventEmitter<{ event: CalendarEventRecord; date: string }>;

  private handleActivate = () => {
    this.eventActivate.emit({ event: this.event, date: this.date });
  };

  render() {
    const label = `${this.event.title} on ${this.date}`;

    return (
      <Host>
        <button class="ui-calendar-event-chip__button" aria-label={label} onClick={this.handleActivate} type="button">
          <span class="ui-calendar-event-chip__dot" aria-hidden="true" />
          <span class="ui-calendar-event-chip__label">
            <slot>{this.event.title}</slot>
          </span>
        </button>
      </Host>
    );
  }
}

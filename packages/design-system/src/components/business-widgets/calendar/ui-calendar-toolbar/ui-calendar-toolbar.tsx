import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { CalendarNavigateAction } from '../shared/calendar-utils';

@Component({
  tag: 'ui-calendar-toolbar',
  styleUrl: 'ui-calendar-toolbar.css',
  shadow: true,
})
export class UiCalendarToolbar {
  @Event({ eventName: 'uiCalendarNavigate', bubbles: true, composed: true })
  navigate!: EventEmitter<{ direction: CalendarNavigateAction }>;

  @Prop() rangeLabel = '';

  private emit(direction: CalendarNavigateAction) {
    this.navigate.emit({ direction });
  }

  render() {
    return (
      <Host>
        <ui-toolbar justify="between">
          <div class="ui-calendar-toolbar__actions">
            <ui-button variant="secondary" type="button" onClick={() => this.emit('previous')}>
              Previous
            </ui-button>
            <ui-button variant="secondary" type="button" onClick={() => this.emit('today')}>
              Today
            </ui-button>
            <ui-button variant="secondary" type="button" onClick={() => this.emit('next')}>
              Next
            </ui-button>
          </div>

          <div class="ui-calendar-toolbar__label">{this.rangeLabel}</div>
        </ui-toolbar>
      </Host>
    );
  }
}

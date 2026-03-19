import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-calendar-day-cell',
  styleUrl: 'ui-calendar-day-cell.css',
  shadow: true,
})
export class UiCalendarDayCell {
  @Prop() date = '';

  @Prop() dayNumber = 0;

  @Prop() label = '';

  @Prop({ reflect: true }) today = false;

  @Prop({ reflect: true }) selected = false;

  @Prop({ reflect: true }) outsideMonth = false;

  @Event({ eventName: 'uiCalendarDateSelect', bubbles: true, composed: true })
  dateSelect!: EventEmitter<{ date: string }>;

  private handleSelect = () => {
    this.dateSelect.emit({ date: this.date });
  };

  render() {
    return (
      <Host>
        <div class="ui-calendar-day-cell">
          <button
            class="ui-calendar-day-cell__button"
            aria-label={this.label}
            aria-current={this.today ? 'date' : undefined}
            aria-pressed={String(this.selected)}
            onClick={this.handleSelect}
            type="button"
          >
            <span class="ui-calendar-day-cell__day-number">{this.dayNumber}</span>
          </button>

          <div class="ui-calendar-day-cell__events">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}

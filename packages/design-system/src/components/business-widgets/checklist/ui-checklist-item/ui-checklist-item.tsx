import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { ChecklistItemRecord, ChecklistItemTone } from '../shared/checklist-types';

@Component({
  tag: 'ui-checklist-item',
  styleUrl: 'ui-checklist-item.css',
  shadow: true,
})
export class UiChecklistItem {
  @Prop() item!: ChecklistItemRecord;

  @Prop({ reflect: true }) tone: ChecklistItemTone = 'neutral';

  @Prop({ reflect: true }) completed = false;

  @Event({ eventName: 'uiChecklistItemToggle', bubbles: true, composed: true })
  itemToggle!: EventEmitter<{ item: ChecklistItemRecord; nextCompleted: boolean }>;

  private handleToggle = () => {
    this.itemToggle.emit({
      item: this.item,
      nextCompleted: !this.completed,
    });
  };

  render() {
    return (
      <Host>
        <button
          class="ui-checklist-item"
          type="button"
          role="checkbox"
          aria-checked={this.completed ? 'true' : 'false'}
          onClick={this.handleToggle}
        >
          <span class="ui-checklist-item__mark" aria-hidden="true">
            <span class="ui-checklist-item__mark-icon"></span>
          </span>

          <ui-stack space="sm">
            <div class="ui-checklist-item__head">
              <div class="ui-checklist-item__summary">
                <h4 class="ui-checklist-item__title">{this.item.title}</h4>
                {this.item.meta ? <ui-badge tone={this.tone}>{this.item.meta}</ui-badge> : null}
              </div>
            </div>

            {this.item.note ? <p class="ui-checklist-item__note">{this.item.note}</p> : null}
          </ui-stack>
        </button>
      </Host>
    );
  }
}

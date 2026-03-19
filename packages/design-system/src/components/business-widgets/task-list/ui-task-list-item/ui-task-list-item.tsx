import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { TaskListItemRecord, TaskListItemTone } from '../shared/task-list-types';

@Component({
  tag: 'ui-task-list-item',
  styleUrl: 'ui-task-list-item.css',
  shadow: true,
})
export class UiTaskListItem {
  @Prop() item!: TaskListItemRecord;

  @Prop({ reflect: true }) tone: TaskListItemTone = 'neutral';

  @Event({ eventName: 'uiTaskListItemActivate', bubbles: true, composed: true })
  itemActivate!: EventEmitter<{ item: TaskListItemRecord }>;

  private handleActivate = () => {
    this.itemActivate.emit({ item: this.item });
  };

  render() {
    return (
      <Host>
        <button class="ui-task-list-item" type="button" onClick={this.handleActivate}>
          <ui-stack space="sm">
            <div class="ui-task-list-item__head">
              <div class="ui-task-list-item__summary">
                <h4 class="ui-task-list-item__title">{this.item.title}</h4>
                {this.item.statusLabel ? <ui-badge tone={this.tone}>{this.item.statusLabel}</ui-badge> : null}
              </div>
              {this.item.meta ? <span class="ui-task-list-item__meta">{this.item.meta}</span> : null}
            </div>

            {this.item.description ? <p class="ui-task-list-item__description">{this.item.description}</p> : null}
          </ui-stack>
        </button>
      </Host>
    );
  }
}

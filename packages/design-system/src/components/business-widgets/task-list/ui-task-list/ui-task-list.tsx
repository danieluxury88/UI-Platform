import { Component, Host, Prop, h } from '@stencil/core';
import { buildTaskListModel, type TaskListItemRecord } from '../shared/task-list-utils';

@Component({
  tag: 'ui-task-list',
  styleUrl: 'ui-task-list.css',
  shadow: true,
})
export class UiTaskList {
  @Prop() label = 'Task list';

  @Prop() items: TaskListItemRecord[] = [];

  render() {
    const list = buildTaskListModel(this.items);

    return (
      <Host>
        <section class="ui-task-list" aria-label={this.label}>
          <ui-stack space="md">
            <div class="ui-task-list__head">
              <h3 class="ui-task-list__title">{this.label}</h3>
              <ui-badge tone="neutral">{list.itemCount} items</ui-badge>
            </div>

            <div class="ui-task-list__items">
              {list.items.map((item) => (
                <ui-task-list-item key={item.id} item={item} tone={item.tone} />
              ))}
            </div>
          </ui-stack>
        </section>
      </Host>
    );
  }
}

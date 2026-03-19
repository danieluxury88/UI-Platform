import { Component, Host, Prop, h } from '@stencil/core';
import { buildChecklistModel, type ChecklistItemRecord } from '../shared/checklist-utils';

@Component({
  tag: 'ui-checklist',
  styleUrl: 'ui-checklist.css',
  shadow: true,
})
export class UiChecklist {
  @Prop() label = 'Checklist';

  @Prop() items: ChecklistItemRecord[] = [];

  render() {
    const checklist = buildChecklistModel(this.items);

    return (
      <Host>
        <section class="ui-checklist" aria-label={this.label}>
          <ui-stack space="md">
            <div class="ui-checklist__head">
              <h3 class="ui-checklist__title">{this.label}</h3>
              <ui-badge tone={checklist.completedCount === checklist.itemCount && checklist.itemCount > 0 ? 'accent' : 'neutral'}>
                {checklist.completedCount}/{checklist.itemCount} done
              </ui-badge>
            </div>

            <div class="ui-checklist__items">
              {checklist.items.map((item) => (
                <ui-checklist-item key={item.id} item={item} tone={item.tone} completed={item.completed} />
              ))}
            </div>
          </ui-stack>
        </section>
      </Host>
    );
  }
}

import { Component, Host, Prop, h } from '@stencil/core';
import type { KanbanCardRecord } from '../shared/kanban-types';

@Component({
  tag: 'ui-kanban-column',
  styleUrl: 'ui-kanban-column.css',
  shadow: true,
})
export class UiKanbanColumn {
  @Prop() columnId = '';

  @Prop() columnTitle = '';

  @Prop() cardCount = 0;

  @Prop() cards: KanbanCardRecord[] = [];

  render() {
    return (
      <Host>
        <section class="ui-kanban-column" aria-label={this.columnTitle}>
          <ui-stack space="md">
            <div class="ui-kanban-column__head">
              <h3 class="ui-kanban-column__title">{this.columnTitle}</h3>
              <ui-badge tone="neutral">{this.cardCount} cards</ui-badge>
            </div>

            <div class="ui-kanban-column__cards">
              {this.cards.map((card) => (
                <ui-kanban-card key={card.id} columnId={this.columnId} card={card} tone={card.tone ?? 'neutral'} />
              ))}
            </div>
          </ui-stack>
        </section>
      </Host>
    );
  }
}

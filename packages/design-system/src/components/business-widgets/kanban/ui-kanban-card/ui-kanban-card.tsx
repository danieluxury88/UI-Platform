import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { KanbanCardRecord, KanbanCardTone } from '../shared/kanban-types';

@Component({
  tag: 'ui-kanban-card',
  styleUrl: 'ui-kanban-card.css',
  shadow: true,
})
export class UiKanbanCard {
  @Prop() card!: KanbanCardRecord;

  @Prop() columnId = '';

  @Prop({ reflect: true }) tone: KanbanCardTone = 'neutral';

  @Event({ eventName: 'uiKanbanCardActivate', bubbles: true, composed: true })
  cardActivate!: EventEmitter<{ columnId: string; card: KanbanCardRecord }>;

  private handleActivate = () => {
    this.cardActivate.emit({ columnId: this.columnId, card: this.card });
  };

  render() {
    return (
      <Host>
        <button class="ui-kanban-card" type="button" onClick={this.handleActivate}>
          <ui-stack space="sm">
            <div class="ui-kanban-card__head">
              <h4 class="ui-kanban-card__title">{this.card.title}</h4>
              {this.card.meta ? <span class="ui-kanban-card__meta">{this.card.meta}</span> : null}
            </div>

            {this.card.description ? <p class="ui-kanban-card__description">{this.card.description}</p> : null}
          </ui-stack>
        </button>
      </Host>
    );
  }
}

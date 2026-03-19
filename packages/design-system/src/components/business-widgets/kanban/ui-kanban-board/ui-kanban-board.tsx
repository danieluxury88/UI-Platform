import { Component, Host, Prop, h } from '@stencil/core';
import { buildKanbanBoardModel, type KanbanColumnRecord } from '../shared/kanban-utils';

@Component({
  tag: 'ui-kanban-board',
  styleUrl: 'ui-kanban-board.css',
  shadow: true,
})
export class UiKanbanBoard {
  @Prop() columns: KanbanColumnRecord[] = [];

  render() {
    const board = buildKanbanBoardModel(this.columns);

    return (
      <Host>
        <section class="ui-kanban-board" aria-label="Kanban board">
          {board.columns.map((column) => (
            <ui-kanban-column
              key={column.id}
              columnId={column.id}
              columnTitle={column.title}
              cardCount={column.cardCount}
              cards={column.cards}
            />
          ))}
        </section>
      </Host>
    );
  }
}

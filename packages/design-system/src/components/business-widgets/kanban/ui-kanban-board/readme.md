# ui-kanban-board



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                   | Default |
| --------- | --------- | ----------- | ---------------------- | ------- |
| `columns` | --        |             | `KanbanColumnRecord[]` | `[]`    |


## Dependencies

### Depends on

- [ui-kanban-column](../ui-kanban-column)

### Graph
```mermaid
graph TD;
  ui-kanban-board --> ui-kanban-column
  ui-kanban-column --> ui-stack
  ui-kanban-column --> ui-badge
  ui-kanban-column --> ui-kanban-card
  ui-kanban-card --> ui-stack
  style ui-kanban-board fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
